<!-- 90d8502f-6bf8-403e-ac1d-55114afe41d8 2946444f-0da5-4506-84fb-729ca9c1c915 -->
# User Registration & Management System Implementation

## Overview

This implementation creates a comprehensive dual-user registration and management system for the Tayran Hotels platform. The system supports three distinct user types with different access levels and payment mechanisms:

**1. Members (Public Users):**

- Pay a one-time 10 SAR registration fee to create an account
- Registration requires payment completion followed by super admin approval before activation
- Once active, members receive 5% discount on all bookings (flights & hotels)
- Earn loyalty points based on custom rules (e.g., points per mile traveled on flights)
- Points are tracked for future prize redemption (redemption system out of current scope)
- Can view their authenticated order history (excludes pre-registration guest orders)
- Anyone can search and book as a guest without registration, but members must login to access discounts

**2. B2B Admins (Agency/Company Users):**

- Created by super admin with pre-loaded wallet balance
- Multiple admins can belong to the same company and share order visibility
- All bookings are paid from wallet balance (no external payment gateway)
- System checks wallet balance before allowing bookings
- Wallet is debited only after successful booking confirmation
- Failed bookings release the held amount back to wallet
- Can view complete order history for their entire company
- Orders are stored in a separate B2BBooking collection for reporting

**3. Super Admin:**

- Single account with full system access
- Manages member approvals (approve/suspend membership status)
- Creates B2B admin accounts with company details and initial wallet balance
- Can add/deduct credits from B2B admin wallets
- Views all members, B2B admins, and their respective orders
- Access to super admin dashboard (backend API only, UI out of scope)

**Guest Orders:**

- Tracked by email only without user account
- Saved to FinalBooking collection with no userId link
- Members do NOT see their pre-registration guest orders in order history

**Key Features:**

- Secure authentication with JWT tokens and bcrypt password hashing
- Role-based access control for all protected routes
- Integration with existing MyFatoorah payment gateway for member registration
- Atomic wallet transactions for B2B admins to prevent race conditions
- Points calculation system based on flight miles and booking details
- Comprehensive order tracking linked to user accounts
- Multi-admin company support with shared order visibility

## Database Schema Changes

### 1. Update User Model (`backend/models/User.model.js`)

- Modify `role` enum to: `['member', 'b2b_admin', 'super_admin']`
- Add fields for members:
  - `membershipStatus`: enum `['pending', 'active', 'suspended']` (pending until 10 SAR paid & approved)
  - `registrationPaymentId`: String (invoice/payment ID from registration)
  - `discountPercentage`: Number (default: 5)
  - `points`: Number (default: 0)
  - `pointsHistory`: Array of objects `[{ miles, points, date, bookingId }]`
- Add fields for B2B admins:
  - `walletBalance`: Number (default: 0, for b2b_admin only)
  - `walletHistory`: Array of objects `[{ amount, type: 'debit'|'credit', date, description, bookingId }]`
- Keep existing: `company` object, `isApproved` boolean
- Add: `guestEmail`: String (for guest order tracking before registration)

### 2. Create B2B Booking Model (`backend/models/B2BBooking.js`)

```javascript
{
  userId: ObjectId (ref: 'User'),
  company: { name, vatNumber }, // denormalized for queries
  invoiceId: String,
  paymentId: String,
  status: enum ['CONFIRMED', 'FAILED'],
  bookingType: enum ['flight', 'hotel'],
  orderData: Object,
  bookingPayload: Object,
  amountCharged: Number,
  walletBalanceBefore: Number,
  walletBalanceAfter: Number,
  createdAt: Date
}
```

### 3. Update FinalBooking Model (`backend/models/FinalBooking.js`)

- Add `userId`: ObjectId (ref: 'User', optional for guest orders)
- Add `guestEmail`: String (for guest tracking)
- Add `userType`: enum `['guest', 'member', 'b2b_admin']`
- Add `pointsEarned`: Number (for member orders)
- Add `discountApplied`: Number (for member orders)

## Backend API Endpoints

### Auth Routes (`backend/routes/auth/auth.route.js`)

#### Member Routes

- `POST /api/auth/member/register` - Register member (returns payment URL for 10 SAR)
  - Body: `{ name, email, password, phone }`
  - Creates user with `membershipStatus: 'pending'`
  - Calls MyFatoorah for 10 SAR payment
  - Returns `{ paymentUrl, tempUserId }`

- `POST /api/auth/member/verify-payment` - Verify registration payment & activate
  - Body: `{ invoiceId, paymentId }`
  - Checks payment status via MyFatoorah
  - Updates user `registrationPaymentId`, keeps `membershipStatus: 'pending'` until admin approves

- `POST /api/auth/member/login` - Member login
  - Body: `{ email, password }`
  - Returns JWT token + user data (only if `membershipStatus: 'active'`)

- `GET /api/auth/member/profile` - Get member profile (protected)
  - Returns user data + points + discount percentage

- `GET /api/auth/member/orders` - Get member order history (protected)
  - Queries `FinalBooking` where `userId` matches
  - Excludes guest orders (even if same email)

- `GET /api/auth/member/points-history` - Get points earning history (protected)

#### B2B Admin Routes

- `POST /api/auth/b2b/login` - B2B admin login
  - Body: `{ email, password }`
  - Returns JWT token (only if `isApproved: true`)

- `GET /api/auth/b2b/profile` - Get B2B admin profile (protected)
  - Returns user data + wallet balance

- `GET /api/auth/b2b/wallet-history` - Get wallet transaction history (protected)

- `GET /api/auth/b2b/orders` - Get B2B order history (protected)
  - Queries `B2BBooking` where `company.name` matches current user's company
  - Returns all orders from same company (shared across admins)

#### Super Admin Routes

- `POST /api/auth/super-admin/login` - Super admin login

- `GET /api/auth/super-admin/members` - List all members (protected, super admin only)
  - Query params: `{ status: 'pending'|'active'|'suspended', page, limit }`

- `PATCH /api/auth/super-admin/members/:id/approve` - Approve member (protected)
  - Updates `membershipStatus` to 'active'

- `PATCH /api/auth/super-admin/members/:id/suspend` - Suspend member (protected)

- `POST /api/auth/super-admin/b2b/create` - Create B2B admin account (protected)
  - Body: `{ name, email, password, company: { name, vatNumber, address, phone }, initialBalance }`
  - Creates user with `role: 'b2b_admin'`, `isApproved: true`, sets `walletBalance`

- `GET /api/auth/super-admin/b2b` - List all B2B admins (protected)

- `PATCH /api/auth/super-admin/b2b/:id/wallet` - Add/deduct wallet balance (protected)
  - Body: `{ amount, type: 'credit'|'debit', description }`
  - Updates wallet and adds to `walletHistory`

- `GET /api/auth/super-admin/b2b/:id/orders` - View specific B2B admin orders

### Payment Routes Updates (`backend/routes/payment/payment.route.js`)

- Update `POST /payment/execute-payment` in `payment.controller.js`:
  - Add `userId` and `userType` to request body
  - If `userType === 'member'`: calculate discount, points
  - If `userType === 'b2b_admin'`: check wallet balance first, hold amount
  - Store user info in `TempBooking`

- Update webhook `POST /payment/webhook` in `payment.controller.js`:
  - For member bookings: save to `FinalBooking` with userId, award points
  - For B2B bookings: save to `B2BBooking`, deduct from wallet, update `walletHistory`
  - For guest bookings: save to `FinalBooking` with only email

## Key Implementation Files

### Controllers to Create/Update

- `backend/controllers/auth/member.controller.js` (new)
- `backend/controllers/auth/b2b.controller.js` (new)
- `backend/controllers/auth/superadmin.controller.js` (new)
- `backend/controllers/payment/payment.controller.js` (update `ExecutePayment`, `PaymentWebhook`)

### Middleware to Create

- `backend/middleware/auth.middleware.js` - JWT verification
- `backend/middleware/role.middleware.js` - Role-based access control
- `backend/middleware/walletCheck.middleware.js` - Check B2B wallet balance before booking

### Utilities to Create

- `backend/utils/points.calculator.js` - Calculate points based on miles/booking
- `backend/utils/discount.calculator.js` - Apply member discount to invoice

## Workflow Examples

### Member Registration Flow

1. User fills registration form → `POST /api/auth/member/register`
2. Backend creates user (status: pending) → calls MyFatoorah for 10 SAR
3. User pays → MyFatoorah redirects back
4. Frontend calls `POST /api/auth/member/verify-payment`
5. Backend verifies payment, updates user record (still pending until admin approval)
6. Super admin approves → `membershipStatus: 'active'`
7. Member can now login and book with discount

### Member Booking with Discount

1. Member logs in → gets JWT token
2. Searches flights/hotels (public, no auth needed)
3. On checkout: sends `userId`, `userType: 'member'` with booking
4. Backend applies discount (e.g., 5%), calculates points by miles
5. Payment processed via MyFatoorah
6. Webhook saves to `FinalBooking` with `userId`, adds points to user

### B2B Admin Booking Flow

1. B2B admin logs in → gets JWT token
2. Searches and selects flight/hotel
3. On checkout: middleware checks `walletBalance >= invoiceValue`
4. If sufficient: hold amount in wallet (optimistic lock)
5. Call Amadeus/TBO booking API
6. If booking succeeds: deduct from wallet, save to `B2BBooking`
7. If booking fails: release held amount

### Super Admin Creates B2B Account

1. Super admin logs in
2. `POST /api/auth/super-admin/b2b/create` with company details + initial balance
3. Backend creates user, sets wallet balance, sends credentials email (optional)
4. B2B admin can login immediately (pre-approved)

## Security Considerations

- Hash passwords with bcrypt (salt rounds: 10)
- JWT tokens with 7-day expiry
- Protect super admin routes with role check
- Validate wallet balance atomically (use MongoDB transactions for deductions)
- Rate limit registration endpoint (prevent spam accounts)
- Verify MyFatoorah signatures on webhooks

## Points Calculation Logic

- Define in `backend/utils/points.calculator.js`:
  - Example: 1 point per 100 miles traveled
  - Extract miles from flight segments (origin → destination distance)
  - For hotels: custom logic (e.g., 10 points per night)
- Points are stored in user's `points` field and detailed history in `pointsHistory`
- Prizes/redemption system to be implemented later (out of scope for this plan)

### To-dos

- [ ] Update User model with new fields for members (membershipStatus, points, discountPercentage), B2B admins (walletBalance, walletHistory), and shared fields (guestEmail, registrationPaymentId)
- [ ] Create B2BBooking model for tracking B2B admin orders separately from regular FinalBooking
- [ ] Update FinalBooking model to add userId, guestEmail, userType, pointsEarned, and discountApplied fields
- [ ] Create authentication middleware (JWT verification) and role-based access control middleware
- [ ] Create wallet check middleware to verify B2B admin has sufficient balance before booking
- [ ] Create member controller with register, verify-payment, login, profile, orders, and points-history endpoints
- [ ] Create B2B admin controller with login, profile, wallet-history, and orders endpoints
- [ ] Create super admin controller for managing members (approve/suspend), creating B2B accounts, managing wallets, and viewing all orders
- [ ] Create utility functions for points calculation (based on miles) and discount calculation
- [ ] Update ExecutePayment to handle userId/userType, apply discounts for members, check wallet for B2B admins, and update PaymentWebhook to route to appropriate booking collection based on user type
- [ ] Activate and update auth routes with new member, B2B, and super admin endpoints
- [ ] Update TempBooking model/usage to store userId and userType for webhook processing
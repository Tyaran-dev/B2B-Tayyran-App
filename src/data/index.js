import {
  BoxCubeIcon,
  CalenderIcon,
  GridIcon,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "@/icons/index";

import {
  BookX,
  Calendar,
  CalendarCheck,
  CircleDollarSign,
  Ticket,
} from "lucide-react";

export const navItems = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <CalenderIcon />,
    name: "Pending Requests",
    path: "/pendingRequests",
  },
  {
    icon: <UserCircleIcon />,
    name: "Bookings",
    path: "/bookings",
  },

  {
    name: "Settings",
    icon: <ListIcon />,
    path: "/settings",
  },
  {
    name: "Users",
    icon: <TableIcon />,
    path: "/users",
  },
  {
    name: "Billing",
    icon: <UserCircleIcon />,
    path: "/billings",
  },
  {
    name: "Company",
    icon: <PageIcon />,
    subItems: [
      { name: "Blank Page", path: "/blank", pro: false },
      { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
];

export const othersItems = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

// ✅ Data array for cards
export const statsData = [
  {
    title: "Total Spent",
    value: "$10,000",
    change: "+715%",
    badgeClass: "bg-secondry-light text-secondry",
    icon: (
      <CircleDollarSign className="bg-secondry rounded-lg w-12 h-10 p-2 text-slate-200" />
    ), // ✅ Works with Tailwind color
  },
  {
    title: "Total Bookings",
    value: "55",
    change: "+715%",
    badgeClass: "bg-primary/10 text-primary",
    icon: (
      <CalendarCheck className="bg-secondry rounded-lg w-12 h-10 p-2 text-slate-200" />
    ),
  },
  {
    title: "Cancelled Bookings",
    value: "10",
    change: "+715%",
    badgeClass: "bg-red-100 text-red-600",
    icon: (
      <BookX className="bg-secondry rounded-lg w-12 h-10 p-2 text-slate-200" />
    ),
  },
  {
    title: "Avg Ticket Price",
    value: "$10,000",
    change: "+15%",
    badgeClass: "bg-green-100 text-green-600",
    icon: (
      <Ticket className="bg-secondry rounded-lg w-12 h-10 p-2 text-slate-200" />
    ),
  },
];

export const MonthTableData = [
  {
    id: "INV001",
    status: "Paid",
    value: [20, 80],
    amount: 250.0,
  },
  {
    id: "INV002",
    status: "Pending",
    value: [40, 60],
    amount: 180.0,
  },
  {
    id: "INV003",
    status: "Overdue",
    value: [10, 90],
    amount: 320.0,
  },
  {
    id: "INV004",
    status: "Pending",
    value: [30, 60],
    amount: 180.0,
  },
  {
    id: "INV005",
    status: "Overdue",
    value: [10, 80],
    amount: 320.0,
  },
  {
    id: "INV006",
    status: "Paid",
    value: [20, 80],
    amount: 250.0,
  },
  {
    id: "INV007",
    status: "Pending",
    value: [40, 60],
    amount: 180.0,
  },
  {
    id: "INV008",
    status: "Overdue",
    value: [10, 90],
    amount: 320.0,
  },
  {
    id: "INV009",
    status: "Overdue",
    value: [10, 90],
    amount: 320.0,
  },
];

export const DayTableData = [
  {
    id: 1,
    airline: "CloudNine Airline",
    code: "QW-MN9087",
    value: [20, 80],
    logo: "/assets/airlines/cloudnine.svg",
    from: "Paris",
    to: "New York",
    depTime: "9:00 AM",
    arrTime: "12:00 PM",
    date: "July 15, 2024",
    duration: "9 hours",
    status: "Confirmed",
    avatars: [
      "/assets/users/u1.jpg",
      "/assets/users/u2.jpg",
      "/assets/users/u3.jpg",
    ],
    extra: "+144",
  },
  {
    id: 2,
    airline: "Qantas Airline",
    code: "QW-MN9087",
    value: [20, 80],
    logo: "/assets/airlines/qantas.svg",
    from: "Paris",
    to: "New York",
    depTime: "9:00 AM",
    arrTime: "12:00 PM",
    date: "July 15, 2024",
    duration: "9 hours",
    status: "Confirmed",
    avatars: [
      "/assets/users/u1.jpg",
      "/assets/users/u2.jpg",
      "/assets/users/u3.jpg",
    ],
    extra: "+144",
  },
  {
    id: 3,
    airline: "CloudNine Airline",
    code: "QW-MN9087",
    value: [20, 80],
    logo: "/assets/airlines/cloudnine.svg",
    from: "Paris",
    to: "New York",
    depTime: "9:00 AM",
    arrTime: "12:00 PM",
    date: "July 15, 2024",
    duration: "9 hours",
    status: "Confirmed",
    avatars: [
      "/assets/users/u1.jpg",
      "/assets/users/u2.jpg",
      "/assets/users/u3.jpg",
    ],
    extra: "+144",
  },
  {
    id: 4,
    airline: "Qantas Airline",
    code: "QW-MN9087",
    value: [20, 80],
    logo: "/assets/airlines/qantas.svg",
    from: "Paris",
    to: "New York",
    depTime: "9:00 AM",
    arrTime: "12:00 PM",
    date: "July 15, 2024",
    duration: "9 hours",
    status: "Confirmed",
    avatars: [
      "/assets/users/u1.jpg",
      "/assets/users/u2.jpg",
      "/assets/users/u3.jpg",
    ],
    extra: "+144",
  },
  {
    id: 5,
    airline: "CloudNine Airline",
    code: "QW-MN9087",
    value: [20, 80],
    logo: "/assets/airlines/cloudnine.svg",
    from: "Paris",
    to: "New York",
    depTime: "9:00 AM",
    arrTime: "12:00 PM",
    date: "July 15, 2024",
    duration: "9 hours",
    status: "Confirmed",
    avatars: [
      "/assets/users/u1.jpg",
      "/assets/users/u2.jpg",
      "/assets/users/u3.jpg",
    ],
    extra: "+144",
  },
  {
    id: 6,
    airline: "Qantas Airline",
    code: "QW-MN9087",
    value: [20, 80],
    logo: "/assets/airlines/qantas.svg",
    from: "Paris",
    to: "New York",
    depTime: "9:00 AM",
    arrTime: "12:00 PM",
    date: "July 15, 2024",
    duration: "9 hours",
    status: "Confirmed",
    avatars: [
      "/assets/users/u1.jpg",
      "/assets/users/u2.jpg",
      "/assets/users/u3.jpg",
    ],
    extra: "+144",
  },
];


export const travelClasses = ["Economy", "Premium Economy", "Business", "First Class"];

export const purposOfTravel = ["Education", "Business", "Tourism", "Leisure", "Student", "Visiting"];

export const employees = [
  { name: "Sarah Johnson", company: "Tech Innovations Inc", role: "Software Engineer", status: "active" },
  { name: "Marcus Chen", company: "Global Finance Corp", role: "Financial Analyst", status: "inactive" },
  { name: "Elena Rodriguez", company: "Creative Solutions Ltd", role: "UX Designer" },
  { name: "David Kim", company: "HealthCare Partners", role: "Medical Consultant" },
  { name: "Priya Patel", company: "EduTech Solutions", role: "Education Specialist" },
  { name: "James Wilson", company: "Green Energy Co", role: "Environmental Engineer" },
  { name: "Aisha Mohammed", company: "Legal Associates LLP", role: "Corporate Lawyer" },
  { name: "Thomas Baker", company: "Retail Dynamics", role: "Supply Chain Manager" },
  { name: "Lisa Wang", company: "Digital Marketing Pro", role: "Marketing Director" },
  { name: "Robert Garcia", company: "Construction Masters", role: "Project Manager" }
]


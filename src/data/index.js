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

import Card1 from "@/icons/card1.svg";
import Card2 from "@/icons/card2.svg";
import Card3 from "@/icons/card3.svg";
import Card4 from "@/icons/card4.svg";
import { BookX, Calendar, CalendarCheck, CircleDollarSign, Ticket, } from "lucide-react";

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
    icon: <CircleDollarSign className="bg-secondry rounded-lg w-12 h-10 p-2 text-slate-200"/>, // ✅ Works with Tailwind color
  },
  {
    title: "Total Bookings",
    value: "55",
    change: "+715%",
    badgeClass: "bg-primary/10 text-primary",
    icon: <CalendarCheck className="bg-secondry rounded-lg w-12 h-10 p-2 text-slate-200"/>,
  },
  {
    title: "Cancelled Bookings",
    value: "10",
    change: "+715%",
    badgeClass: "bg-red-100 text-red-600",
    icon: <BookX className="bg-secondry rounded-lg w-12 h-10 p-2 text-slate-200"/>,
  },
  {
    title: "Avg Ticket Price",
    value: "$10,000",
    change: "+15%",
    badgeClass: "bg-green-100 text-green-600",
    icon: <Ticket className="bg-secondry rounded-lg w-12 h-10 p-2 text-slate-200"/>,
  },
];

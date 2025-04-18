import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const caseActionList = [
  {
    id: 1,
    action: "Actions",
    icon: <MaterialIcons name="show-chart" />,
    admin: true,
  },
  {
    id: 2,
    action: "Description",
    icon: <MaterialIcons name="receipt-long" />,
    admin: false,
  },
  {
    id: 3,
    action: "Donate",
    icon: <MaterialIcons name="volunteer-activist" />,
    admin: false,
  },
  {
    id: 4,
    action: "Transactions",
    icon: <MaterialIcons name="show-chart" />,
    admin: true,
  },
  {
    id: 5,
    action: "Manual Donation",
    icon: <MaterialIcons name="receipt-long" />,
    admin: true,
  },
];

export const dataListActionList = [
  {
    id: 2,
    action: "",
    icon: <MaterialIcons name="add" />,
    uzman: <MaterialIcons name="add" />,
  },
  {
    id: 1,
    action: "View All",
    icon: <MaterialIcons name="list" />,
    uzman: "View All",
  },
];

export const sidebarData = [
  {
    id: "dashboard",
    title: "DASHBOARD",
    icon: <MaterialIcons name="dashboard" />,
    path: "/dashboard",
  },
  {
    id: "cases",
    title: "CASES",
    path: "/cases",
    icon: <MaterialIcons name="next-week" />,
  },
  {
    id: "members",
    title: "MEMBERS",
    path: "/members",
    icon: <MaterialIcons name="groups" />,
  },
  {
    id: "profile",
    title: "PROFILE",
    path: "/profile",
    icon: <MaterialIcons name="account-box" />,
  },
];

export const statsCardData = [
  {
    id: 3,
    name: "MEMBERS",
    iconName: "people",
    icon: (
      <MaterialIcons
        name="people"
        size={24}
        color="green"
      />
    ),
    path: "/members",
    nativePath: "Members",
  },
  {
    id: 4,
    name: "CASES",
    iconName: "file-copy",
    icon: (
      <MaterialIcons
        name="file-copy"
        size={24}
        color="green"
      />
    ),
    path: "/cases",
    nativePath: "Cases",
  },
  {
    id: 5,
    name: "PROFILE",
    iconName: "account-circle",
    icon: (
      <MaterialIcons
        name="account-circle"
        size={24}
        color="green"
      />
    ),
    path: "/profile",
    nativePath: "Profile",
  },
];

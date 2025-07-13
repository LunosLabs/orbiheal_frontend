// FEATURES
export const Features = [
  {
    badge: "AI Quality",
    title: "AI-Powered Accuracy",
    description:
      "Every medicine result is checked by advanced AI and verified by medical experts, ensuring you always get accurate, up-to-date information.",
  },
  {
    badge: "Safety First",
    title: "Safe & Secure",
    description:
      "Your health and privacy are protected with end-to-end encryption and strict data security standards. We never share your data.",
  },
  {
    badge: "Premium Experience",
    title: "Premium User Experience",
    description:
      "Enjoy a seamless, ad-free interface designed for clarity and ease. Fast, reliable, and always available—so you can focus on your health.",
  },
  {
    badge: "Comprehensive",
    title: "All Brands, All Details",
    description:
      "Access verified details on medicines, including brands, prices, and manufacturers. Our database is updated daily from trusted sources.",
  },
  {
    badge: "Trusted",
    title: "Verified Sources",
    description:
      "All data is sourced from licensed pharmacy partners and official databases, ensuring accuracy and reliability you can count on.",
  },
  {
    badge: "Smart Search",
    title: "Intelligent Search",
    description:
      "Find medicines quickly by name, brand, or manufacturer. Our smart search tool helps you discover the right medicine in seconds.",
  },
];


// Common links accessible by all logged-in roles
const commonLinks = [
  {
    name: "Notifications",
    href: "/dashboard/notifications",
    nested: ["/dashboard/notifications"]
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    nested: ["/dashboard/profile"]
  }
];

export const roleBasedLinks = {
  admin: [
    { 
      name: "Dashboard", 
      href: "/dashboard", 
      nested: ["/admin"] 
    },
    {
      name: "Admin Management",
      href: "/admin",
      nested: [
        "/admin/users",
        "/admin/users/add",
        "/admin/doctors",
        "/admin/doctors/add",
        "/admin/sellers",
        "/admin/sellers/add"
      ],
      dropdown: [
        { name: "Add Medicines", href: "/admin/medicine/add" },
        { name: "Add Generics", href: "/admin/generics/add" },
        { name: "Add Manufacturers", href: "/admin/manufacturer/add" },
        { name: "Add Forms", href: "/admin/forms/add" },
        { name: "View Entity", href: "/admin" }
      ],
    },
    ...commonLinks
  ],

  consumer: [
    { 
      name: "Dashboard", 
      href: "/dashboard", 
      nested: ["/consumer"] 
    },
    { 
      name: "My Prescriptions", 
      href: "/consumer/prescription", 
      nested: ["/consumer/prescription"] 
    },
    ...commonLinks
  ]
};


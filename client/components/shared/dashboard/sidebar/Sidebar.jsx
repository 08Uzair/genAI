"use client";
import { ProductIcon, UsersIcon } from "@/assets/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Products",
      path: "/dashboard/products",
      icon: <ProductIcon/>
    },
    {
      label: "Users",
      path: "/dashboard/users",
      icon: <UsersIcon/>,
      badge: 3,
    }
  ];

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {navItems.map(({ label, path, icon, badge }) => {
            const isActive = pathname === path;
            return (
              <li key={label}>
                <Link
                  href={path}
                  className={`flex items-center p-2 rounded-lg group transition-colors ${
                    isActive
                      ? "text-blue-600 bg-gray-100 dark:text-white dark:bg-gray-700"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {icon}
                  <span className="ms-3 flex-1 whitespace-nowrap">{label}</span>
                  {badge && (
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      {badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

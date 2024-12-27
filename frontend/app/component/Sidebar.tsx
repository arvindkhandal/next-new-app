"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaFolder } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";

interface NavItemProps {
  label: string;
  href: string;
  active: boolean;
  Icon: React.ReactNode;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, href, active, Icon, onClick }) => (
  <button
    type="button"
    className={`
      flex items-center w-full px-3 py-2 rounded-lg text-sm
      ${active ? "bg-[#96F556] text-black" : "hover:bg-white/10"}
    `}
    onClick={onClick}
  >
    <div className="h-5 w-5 mr-3">{Icon}</div>
    {label}
  </button>
);

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Systems", href: "/systems", Icon: <FaFolder /> },
    { label: "System Code", href: "/system-code", Icon: <RiDashboardFill /> },
    { label: "Properties", href: "/properties", Icon: <RiDashboardFill /> },
    { label: "Menus", href: "/menus", Icon: <RiDashboardFill /> },
    { label: "API List", href: "/api-list", Icon: <RiDashboardFill /> },
    { label: "Users & Group", href: "/users-group", Icon: <FaFolder /> },
    { label: "Competition", href: "/competition", Icon: <FaFolder /> },
  ];

  const handleNavigation = (href: string) => {
    if (pathname !== href) {
      router.push(href);
      setIsOpen(false); // Close sidebar after navigation on mobile
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          className="fixed top-0 left-4 z-20 text-black p-2 rounded-md lg:hidden"
          onClick={() => setIsOpen(true)}
        >
          <IoReorderThreeOutline className="h-6 w-6" />
        </button>
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#0A0B1A] text-white p-4 z-10 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0
        `}
      >
        <div className="flex items-center mb-8">
          <span className="text-xl font-bold">CLOIT</span>
          <button
            type="button"
            className="ml-auto lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <IoReorderThreeOutline className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              label={item.label}
              href={item.href}
              active={pathname === item.href}
              Icon={item.Icon}
              onClick={() => handleNavigation(item.href)}
            />
          ))}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-0 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Dashboard", href: "/" },
  { name: "Posts", href: "/posts" },
  { name: "Users", href: "/users" },
  { name: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* ===== Mobile Top Bar: Logo + Menu Button ===== */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-gray-800 text-white px-4 py-3 z-50 flex justify-between items-center">
        <div className="text-lg font-semibold">MyApp</div>
        <button onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* ===== Overlay Background ===== */}
      {open && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 text-gray-900 shadow-md z-50 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen pt-14 md:pt-0`}
      >
        {/* Logo & Close Button (Mobile Only) */}
        <div className="flex items-center justify-between px-4 py-4 md:hidden border-b">
          <div className="text-xl font-bold">MyApp</div>
          <button onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 flex flex-col gap-2 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded hover:bg-gray-200 ${
                pathname === link.href ? "bg-gray-300 font-medium" : ""
              }`}
              onClick={closeSidebar}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}

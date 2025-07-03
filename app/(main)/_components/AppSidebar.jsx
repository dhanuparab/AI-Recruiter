"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SideBarOptions } from "@/services/Constants";
import { Plus, LogOut, HelpCircle, Menu, X } from "lucide-react";
import { useUser } from "@/app/provider";

export function AppSidebar({ children }) {
  const router = useRouter();
  const path = usePathname();
  const { user } = useUser?.() || { user: null };
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Hamburger icon for all screens */}
      <button
        className="fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
        type="button"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed z-40 top-0 left-0 h-full w-64 bg-white border-r border-gray-100 shadow-lg flex flex-col transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close icon */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        {/* Logo */}
        <SidebarHeader className="flex items-center justify-center py-6 px-4 border-b border-gray-100">
          <span className="text-2xl font-bold select-none tracking-tight">
            <span className="text-black">Great</span>
            <span className="text-[#2563eb]">Hire</span>
          </span>
        </SidebarHeader>
        {/* User Profile */}
        <div className="flex flex-col items-center py-2 border-b border-gray-100">
          <div className="font-semibold text-gray-800">
            {user?.name || "Candidate Name"}
          </div>
          <div className="text-xs text-gray-400">
            {user?.email || "candidate@email.com"}
          </div>
        </div>
        {/* Main Navigation */}
        <SidebarContent className="flex-1 flex flex-col justify-between">
          <div>
            <div className="px-4 py-4">
              <Button
                className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition"
                onClick={() => router.push("/dashboard/create-interview")}
              >
                <Plus className="w-5 h-5" />
                Create New Interview
              </Button>
            </div>
            <SidebarGroup>
              <SidebarMenu>
                {SideBarOptions.map((option, index) => (
                  <SidebarMenuItem key={index} className="p-1">
                    <SidebarMenuButton
                      asChild
                      className={`p-3 rounded-lg transition ${path === option.path
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "hover:bg-gray-100"
                        }`}
                    >
                      <Link href={option.path} className="flex items-center gap-3">
                        <option.icon className="w-5 h-5" />
                        <span
                          className={`text-base ${path === option.path ? "text-blue-700" : "text-gray-700"
                            }`}
                        >
                          {option.name}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                {/* Extra navigation */}
                <SidebarMenuItem className="p-1 mt-2">
                  <SidebarMenuButton
                    asChild
                    className={`p-3 rounded-lg transition ${path === "/dashboard/help"
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "hover:bg-gray-100"
                      }`}
                  >
                    <Link href="/dashboard/help" className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5" />
                      <span
                        className={`text-base ${path === "/dashboard/help" ? "text-blue-700" : "text-gray-700"
                          }`}
                      >
                        Help
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </div>
        </SidebarContent>
        {/* Footer with Logout */}
        <SidebarFooter className="border-t border-gray-100 py-4 px-4 flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 justify-start text-gray-700 hover:bg-gray-100"
            onClick={() => {
              // Add your logout logic here
              router.push("/login");
            }}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </SidebarFooter>
      </aside>

      {/* Overlay when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Main content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default AppSidebar;
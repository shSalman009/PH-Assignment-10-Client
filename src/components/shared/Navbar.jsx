"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, LogOut, Crown, Sun } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "./Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Nav Links
const navLinks = [
  { name: "Home", href: "/", private: false },
  { name: "Browse Recipes", href: "/recipes", private: false },
  { name: "Dashboard", href: "/dashboard", private: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [user, setUser] = useState({
    name: "Chef Gourmet",
    email: "chef@recipehub.com",
    role: "user", // "user" or "admin"
    isPremium: true, // Toggles the premium indicator badge
  });
  //   const user = null;

  const handleLogout = () => {
    setUser(null);
  };

  const filteredLinks = navLinks.filter((link) => !link.private || user);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo iconSize={36} showText={true} />
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex items-center gap-6">
              {filteredLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        isActive ? "text-primary font-semibold" : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Dark/Light Toggle Button */}
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
              <Sun className="w-5 h-5" />
            </button>

            {user ? (
              /* Authenticated Dropdown */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-1.5 px-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors focus:outline-none">
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image}
                        alt={user?.name}
                      />
                      <AvatarFallback>
                        {user?.name ? user.name.charAt(0) : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold max-w-32 truncate flex items-center gap-1">
                        {user.name}
                        {user.isPremium && (
                          <span className="text-[10px] bg-warning/10 text-amber-500 font-extrabold px-1 rounded flex items-center gap-0.5">
                            <Crown className="w-2.5 h-2.5 fill-amber-500" /> PRO
                          </span>
                        )}
                      </span>
                    </div>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 p-1 mt-1">
                  <DropdownMenuLabel className="font-normal px-2 py-1.5 flex flex-col">
                    <span className="text-sm font-semibold">{user.name}</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </span>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    asChild
                    className="rounded-lg cursor-pointer"
                  >
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-2 w-full"
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="rounded-lg text-destructive focus:text-destructive-foreground focus:bg-destructive/10 cursor-pointer flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Unauthenticated Layout Buttons */
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-sm font-medium px-4 py-2 hover:bg-accent rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow hover:bg-primary/95 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE RESPONSIVE SECTION: Triggering Shadcn Sheet */}
          <div className="flex md:hidden items-center gap-2">
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-accent transition-colors">
              <Sun className="w-5 h-5" />
            </button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2 rounded-lg text-muted-foreground hover:bg-accent transition-colors">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-75 sm:w-100 flex flex-col justify-between p-4 sm:p-6"
              >
                <div className="space-y-6">
                  <SheetHeader className="text-left">
                    <SheetTitle>
                      <Logo iconSize={32} showText={true} />
                    </SheetTitle>
                  </SheetHeader>

                  {/* Navigation Links inside Sheet */}
                  <ul className="space-y-2">
                    {filteredLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-3 py-2 rounded-lg font-medium transition-all ${
                              isActive
                                ? "bg-primary/10 text-primary font-semibold"
                                : "hover:bg-accent"
                            }`}
                          >
                            {link.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Auth Controls at Bottom of Mobile Drawer */}
                <div className="border-t pt-4">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 px-2 pb-2">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                          {user.name[0]}
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-semibold flex items-center gap-1">
                            {user.name}
                            {user.isPremium && (
                              <span className="text-[9px] bg-warning/10 text-amber-500 px-1 rounded font-black">
                                PRO
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent"
                      >
                        <User className="w-4 h-4" /> My Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 text-left"
                      >
                        <LogOut className="w-4 h-4" /> Log Out
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-center py-2.5 border rounded-lg text-sm font-medium hover:bg-accent"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-center py-2.5 bg-primary text-primary-foreground text-sm rounded-lg font-medium shadow"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

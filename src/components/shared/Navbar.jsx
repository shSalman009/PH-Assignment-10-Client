"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, User, LogOut, Crown, Sun } from "lucide-react";
import toast from "react-hot-toast";

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
import { authClient } from "@/lib/auth-client";

// Nav Links Configuration
const navLinks = [
  { name: "Home", href: "/", private: false },
  { name: "Browse Recipes", href: "/recipes", private: false },
  { name: "Dashboard", href: "/dashboard", private: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Real Asynchronous Logout Trigger Pipeline
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        onSuccess: () => {
          toast.success("Logged out successfully");
          setIsMobileMenuOpen(false);
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to sign out.");
        },
      });
    } catch (err) {
      toast.error("An unexpected error occurred during logout.");
    }
  };

  // Filter links based on authentic verification
  const filteredLinks = navLinks
    .filter((link) => !link.private || user)
    .map((link) => {
      if (user?.role === "admin" && link.name === "Dashboard") {
        return { ...link, href: "/dashboard/admin" };
      }
      return link;
    });

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md h-16">
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

            {isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
                <div className="w-20 h-4 rounded bg-gray-300 animate-pulse" />
              </div>
            ) : user ? (
              /* Authenticated User Dropdown Menu layout */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-1.5 px-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors focus:outline-none">
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image || ""}
                        alt={user?.name || "User profile photo"}
                      />
                      <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold max-w-30 truncate flex items-center gap-1">
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
              /* Unauthenticated Buttons */
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

          {/* MOBILE RESPONSIVE DRAWER SECTION */}
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

                {/* Mobile Drawer Auth Area */}
                <div className="border-t pt-4">
                  {isPending ? (
                    <div className="flex items-center gap-3 px-2 pb-2">
                      <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse" />
                      <div className="truncate grow">
                        <div className="w-20 h-4 rounded bg-gray-300 animate-pulse mb-1" />
                        <div className="w-full h-3 rounded bg-gray-300 animate-pulse" />
                      </div>
                    </div>
                  ) : user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 px-2 pb-2">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={user?.image || ""}
                            alt={user?.name || ""}
                          />
                          <AvatarFallback className="text-sm font-bold bg-primary/10 text-primary">
                            {user?.name
                              ? user.name.charAt(0).toUpperCase()
                              : "U"}
                          </AvatarFallback>
                        </Avatar>
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

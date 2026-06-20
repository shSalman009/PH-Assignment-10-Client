"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  ChefHat,
  ShoppingBag,
  Heart,
  Users,
  FileText,
  AlertTriangle,
  CreditCard,
  User,
  ShieldCheck,
  ChevronRight,
  Crown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const userRoutes = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Add Recipe", href: "/dashboard/add-recipe", icon: PlusCircle },
  { name: "My Recipes", href: "/dashboard/my-recipes", icon: ChefHat },
  {
    name: "Purchased Recipes",
    href: "/dashboard/purchased",
    icon: ShoppingBag,
  },
  { name: "Favorites", href: "/dashboard/favorites", icon: Heart },
  { name: "My Profile", href: "/dashboard/profile", icon: User },
];

const adminRoutes = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
  { name: "Manage Recipes", href: "/dashboard/admin/recipes", icon: FileText },
  {
    name: "Recipe Reports",
    href: "/dashboard/admin/reports",
    icon: AlertTriangle,
  },
  {
    name: "Transactions",
    href: "/dashboard/admin/transactions",
    icon: CreditCard,
  },
  { name: "My Profile", href: "/dashboard/profile", icon: User },
];

export function DashboardSidebar({ user, ...props }) {
  const pathname = usePathname();
  const isAdmin = user?.role === "admin";
  const isPremium = user?.isPremium || false;

  // Determine which set of routes to display based on user role
  const currentRoutes = isAdmin ? adminRoutes : userRoutes;

  return (
    <Sidebar border="right" {...props}>
      {/* Brand Header */}
      {/* <SidebarHeader className="p-4 border-b h-16 flex items-center justify-center shrink-0">
        <Logo />
      </SidebarHeader> */}

      {/* Navigation Content Matrix */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-bold tracking-wider text-muted-foreground uppercase">
            {isAdmin ? "Admin Workspace" : "Chef Dashboard"}
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="gap-1 px-1">
              {currentRoutes.map((item, index) => {
                const Icon = item.icon;

                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={`${item.href}-${index}`}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`w-full justify-between h-11 px-3 rounded-xl text-sm transition-all group
                        data-[active=true]:bg-primary! data-[active=true]:text-primary-foreground! data-[active=true]:shadow-sm
                        text-muted-foreground hover:bg-accent hover:text-foreground`}
                    >
                      <Link href={item.href}>
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        <ChevronRight
                          className={`w-3.5 h-3.5 ml-auto opacity-0 transition-all ${isActive ? "opacity-100 translate-x-0" : "group-hover:opacity-40 group-hover:translate-x-0.5"}`}
                        />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Profile Footer */}
      <SidebarFooter className="p-4 border-t bg-muted/20 shrink-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border">
            <AvatarImage src={user?.image || ""} alt={user?.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                {user?.name}
              </p>
              {isPremium && !isAdmin && (
                <Crown
                  className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0"
                  title="Premium Member"
                />
              )}
            </div>
            <span className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
              {isAdmin ? (
                <span className="text-destructive font-bold bg-destructive/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <ShieldCheck className="w-2.5 h-2.5" /> Admin Space
                </span>
              ) : isPremium ? (
                <span className="bg-amber-500/10 text-amber-600 font-bold px-1.5 py-0.5 rounded">
                  Premium Chef
                </span>
              ) : (
                <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                  Standard Chef
                </span>
              )}
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

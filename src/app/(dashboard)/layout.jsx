"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center bg-background gap-2">
        <Spinner className="h-6 w-6 animate-spin text-primary" />
        <p className="text-xs text-muted-foreground font-medium animate-pulse">
          Verifying security privileges...
        </p>
      </div>
    );
  }

  if (!user) {
    router.replace("/login");
    return null;
  }

  return (
    <SidebarProvider className="h-[calc(100vh-4rem)] items-stretch">
      <div className="min-h-[calc(100vh-4rem)] w-full flex bg-background">
        <DashboardSidebar
          user={user}
          className="top-16 h-[calc(100vh-4rem)] z-30"
        />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Sidebar Header */}
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm sticky top-16 z-40 flex items-center px-4 gap-4 md:px-6">
            <SidebarTrigger className="p-2 border rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" />
            <div className="w-px h-5 bg-border hidden sm:block" />
            <span className="text-xs font-semibold text-muted-foreground hidden sm:inline-block">
              Welcome back, {user.name.split(" ")[0]}!
            </span>
          </header>

          {/* Dashboard Pages*/}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="mx-auto space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

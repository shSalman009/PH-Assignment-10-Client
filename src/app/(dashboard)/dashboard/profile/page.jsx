import React from "react";
import { Mail, Crown, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import ProfileUpdateForm from "@/components/dashboard/profile/ProfileUpdateForm";
import { getUserSession } from "@/lib/services/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "My Profile | Dashboard",
};

export default async function ProfilePage() {
  const user = await getUserSession();

  console.log(user);

  return (
    <div className="space-y-6 w-full max-w-none">
      {/* Header */}

      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal information and subscription preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Details & Update */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-zinc-100 rounded-xl p-6 shadow-sm">
            {/* Identity Header */}
            <div className="flex items-center gap-5 border-b border-zinc-100 pb-6">
              <Avatar className="h-20 w-20 border-2 border-white shadow-md overflow-hidden shrink-0">
                <AvatarImage
                  referrerPolicy="no-referrer"
                  src={user?.image}
                  alt={user?.name}
                />
                <AvatarFallback>
                  {user?.name ? user.name.charAt(0) : "U"}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-zinc-900">
                    {user.name || "Chef"}
                  </h2>
                  {/* PREMIUM BADGE */}
                  {user.isPremium && (
                    <span className="bg-linear-to-r from-amber-200 to-yellow-400 text-yellow-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <Crown className="h-3 w-3" /> PRO
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-zinc-500 mt-1">
                  <Mail className="h-3.5 w-3.5" />
                  {user.email}
                </div>
              </div>
            </div>

            {/* Update Form Component */}
            <ProfileUpdateForm user={user} />
          </div>
        </div>

        {/* Premium Upgrade */}
        <div className="lg:col-span-1">
          {user.isPremium ? (
            <div className="bg-linear-to-br from-zinc-900 to-black text-white rounded-xl p-6 border border-zinc-800 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-6 w-6 text-emerald-400" />
                <h3 className="font-black tracking-tight text-lg">
                  Premium Active
                </h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                You have unrestricted access to the marketplace. You can add
                unlimited recipes and display your Pro badge proudly.
              </p>
            </div>
          ) : (
            <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100 shadow-sm relative overflow-hidden">
              <Crown className="absolute -right-4 -top-4 h-24 w-24 text-orange-500/10 rotate-12" />

              <h3 className="font-black text-orange-900 text-lg mb-2 relative z-10">
                Unlock Premium
              </h3>
              <p className="text-orange-700/80 text-sm mb-6 relative z-10 leading-relaxed">
                Take your culinary profile to the next level. Upgrade your
                account to bypass standard limits.
              </p>

              <ul className="space-y-3 mb-8 relative z-10">
                <li className="flex items-start gap-2 text-sm text-orange-900 font-medium">
                  <Zap className="h-4 w-4 text-orange-600 mt-0.5 shrink-0" />
                  Unlimited Recipe Publishing
                </li>
                <li className="flex items-start gap-2 text-sm text-orange-900 font-medium">
                  <Crown className="h-4 w-4 text-orange-600 mt-0.5 shrink-0" />
                  Exclusive Gold Profile Badge
                </li>
              </ul>

              <Button
                variant="primary"
                className="w-full h-11 rounded-lg bg-primary text-white font-bold text-sm tracking-wide shadow-sm transition-all flex items-center justify-center relative z-10"
              >
                Upgrade Account Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

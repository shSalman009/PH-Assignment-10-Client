"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, Unlock } from "lucide-react";
import toast from "react-hot-toast";
import { toggleUserStatus } from "@/lib/actions/users";

export function UserActionCell({ userId, isBlocked }) {
  const [status, setStatus] = useState(isBlocked ? "blocked" : "active");
  const [isPending, startTransition] = useTransition();

  // Toggle Block/Unblock User
  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleUserStatus(userId, status);

      if (result.success) {
        setStatus(status === "blocked" ? "active" : "blocked");
        toast.success(
          `User ${status === "blocked" ? "unblocked" : "blocked"} successfully.`,
        );
      } else {
        toast.error("Failed to update status.");
      }
    });
  };

  return (
    <Button
      onClick={handleToggle}
      disabled={isPending}
      size="sm"
      variant={status === "blocked" ? "secondary" : "destructive"}
      className={`min-w-28 gap-2 transition-all cursor-pointer ${
        status === "blocked"
          ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
          : ""
      }`}
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : status === "blocked" ? (
        <>
          <Unlock className="h-4 w-4" />
          Unblock
        </>
      ) : (
        <>
          <Lock className="h-4 w-4" />
          Block
        </>
      )}
    </Button>
  );
}

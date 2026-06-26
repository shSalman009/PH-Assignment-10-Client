"use client";

import React, { useState, useTransition } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileUpdateForm({ user }) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    photoURL: user?.image || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPending) return;
    console.log(formData);
    startTransition(async () => {
      try {
        await authClient.updateUser(
          {
            name: formData.name,
            image: formData.photoURL,
          },
          {
            onSuccess: () => {
              toast.success("Profile updated successfully!");
            },
            onError: (error) => {
              toast.error(`Failed to update profile: ${error?.message}`);
            },
          },
        );
      } catch (error) {
        toast.error(`Failed to update profile: ${error?.message}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 mt-6">
      <div className="space-y-2">
        <label className="text-sm font-bold text-zinc-700">Display Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full h-11 px-4 rounded-lg border border-zinc-200 bg-zinc-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          placeholder="e.g. Gordon Ramsay"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-zinc-700">
          Profile Photo URL
        </label>
        <input
          type="url"
          name="photoURL"
          value={formData.photoURL}
          onChange={handleChange}
          className="w-full h-11 px-4 rounded-lg border border-zinc-200 bg-zinc-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          placeholder="https://example.com/my-photo.jpg"
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-11 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-bold"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Save className="h-4 w-4 mr-2" />
        )}
        {isPending ? "Saving Changes..." : "Save Profile Changes"}
      </Button>
    </form>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { authClient } from "@/lib/auth-client";
import { registerFormSchema } from "@/lib/schemas";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize form validation via React Hook Form and Zod
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      photoUrl: "",
      password: "",
    },
  });

  // Email/Password Sign Up Handler
  const onSubmit = async (data) => {
    setLoading(true);
    const { name, email, photoUrl, password } = data;

    await authClient.signUp.email(
      {
        name,
        email,
        password,
        image: photoUrl,
        callbackURL: "/",
      },
      {
        onError: (ctx) => {
          toast.error(
            ctx.error.message || "Registration failed. Please try again.",
          );
        },
        onSuccess: () => {
          toast.success("Account created successfully!");
          router.replace("/");
        },
      },
    );
    setLoading(false);
  };

  // Google OAuth Social Handler
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      toast.error("Google authentication failed.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-2 bg-background">
      {/* LEFT COLUMN: Form Container */}
      <div className="flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-2">
            <Link href="/" className="mb-2 block">
              <Logo iconSize={32} showText={true} />
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Create your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Join the club! Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>

          {/* Social Login Actions */}
          <Button
            variant="outline"
            className="w-full py-5 text-sm font-medium border shadow-sm rounded-xl"
            type="button"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="mr-2 h-5 w-5 shrink-0" />
            Sign up with Google
          </Button>

          {/* Separation Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground font-medium">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Validated Form Component */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup className="space-y-4">
              {/* Full Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1.5"
                  >
                    <FieldLabel className="text-xs font-semibold text-foreground uppercase tracking-wide">
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      className="rounded-xl bg-card py-5 shadow-sm"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs text-destructive mt-1"
                      />
                    )}
                  </Field>
                )}
              />

              {/* Email Address */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1.5"
                  >
                    <FieldLabel className="text-xs font-semibold text-foreground uppercase tracking-wide">
                      Email Address
                    </FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="m@example.com"
                      className="rounded-xl bg-card py-5 shadow-sm"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs text-destructive mt-1"
                      />
                    )}
                  </Field>
                )}
              />

              {/* Photo URL */}
              <Controller
                name="photoUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1.5"
                  >
                    <FieldLabel className="text-xs font-semibold text-foreground uppercase tracking-wide">
                      Photo URL
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder="https://example.com/photo.jpg"
                      className="rounded-xl bg-card py-5 shadow-sm"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs text-destructive mt-1"
                      />
                    )}
                  </Field>
                )}
              />

              {/* Password Input with eye toggles */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1.5"
                  >
                    <FieldLabel className="text-xs font-semibold text-foreground uppercase tracking-wide">
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="rounded-xl bg-card py-5 pr-12 shadow-sm"
                        aria-invalid={fieldState.invalid}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3.5 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {fieldState.invalid ? (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs text-destructive mt-1"
                      />
                    ) : (
                      <ul className="text-[11px] text-muted-foreground/80 mt-1.5 space-y-0.5 pl-1">
                        <li>• Min. 6 characters</li>
                        <li>• Must have Upper & Lowercase</li>
                      </ul>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Action Submit Registration Button */}
            <Button
              disabled={loading}
              className="w-full mt-4 py-6 text-sm font-semibold rounded-xl bg-primary text-primary-foreground shadow hover:bg-primary/95 transition-all"
              type="submit"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner className="h-4 w-4 animate-spin text-current" />
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* RIGHT COLUMN: (Hidden on Mobile) */}
      <div className="hidden lg:flex relative items-center justify-center bg-muted/40 border-l p-12 overflow-hidden">
        {/* Decorative Blur Backgrounds */}
        <div className="absolute top-[-10%] right-[-10%] w-100 h-100 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-5%] w-100 h-100 rounded-full bg-warning/5 blur-3xl" />

        <div className="relative max-w-md text-center space-y-6 z-10">
          <div className="rounded-2xl border bg-background/60 p-6 backdrop-blur-md shadow-xl text-left space-y-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-foreground flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />{" "}
                Unlock Premium Perks
              </h3>
              <p className="text-sm text-muted-foreground">
                Upgrade to our premium plan and enjoy exclusive benefits like a
                profile badge, unlimited recipe submissions, and priority
                support.
              </p>
            </div>
            <div className="pt-2 border-t flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <span className="flex text-amber-500">★★★★★</span>
              <span>Trusted by 10k+ culinary creators</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

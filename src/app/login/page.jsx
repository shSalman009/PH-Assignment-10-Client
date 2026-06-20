import LoginForm from "@/components/auth/LoginForm";
import React from "react";

export const metadata = {
  title: "Login",
  description: "Sign in to your RecipeHub account",
};

export default function LoginPage() {
  return <LoginForm />;
}

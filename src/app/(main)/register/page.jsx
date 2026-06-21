import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

export const metadata = {
  title: "Register",
  description: "Create a new RecipeHub account",
};

export default function RegisterPage() {
  return <RegisterForm />;
}

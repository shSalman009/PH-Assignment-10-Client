"use client";

import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Mail, Phone, MapPin, Heart } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Recipes", href: "/recipes" },
  ];

  return (
    <footer className="w-full border-t bg-card text-card-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Info & Social Links */}

          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 xl:col-span-1">
            <Link href="/" className="inline-block">
              <Logo iconSize={34} showText={true} />
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Discover, share, and explore a world of culinary delights. Connect
              with a vibrant community of food enthusiasts and elevate your
              cooking journey.
            </p>
            {/* Social Links centered on mobile */}
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Content Split Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center md:text-left">
              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-bold text-foreground tracking-wider uppercase">
                  Quick Links
                </h3>
                <ul className="mt-4 space-y-3">
                  {exploreLinks.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-bold text-foreground tracking-wider uppercase">
                  Contact
                </h3>

                <ul className="mt-4 space-y-3 text-sm text-muted-foreground flex flex-col items-center md:items-start">
                  <li className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <a
                      href="mailto:support@recipehub.com"
                      className="hover:underline"
                    >
                      support@recipehub.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <a href="tel:+8801700000000" className="hover:underline">
                      +880 1700-000000
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="leading-tight">Sylhet, Bangladesh</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter Box */}

            <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-sm font-bold text-foreground tracking-wider uppercase">
                Stay Inspired
              </h3>
              <p className="mt-4 text-sm text-muted-foreground max-w-md">
                Subscribe to our culinary newsletter for fresh weekly recipes
                right in your inbox.
              </p>
              <form
                className="mt-4 flex flex-col sm:flex-row w-full max-w-md gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-lg border bg-background px-4 py-2 text-sm text-foreground shadow-inner focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/95 transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright Requirement */}
        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} RecipeHub. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Crafted with{" "}
            <Heart className="w-3 h-3 fill-destructive text-destructive" /> for
            food enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
}

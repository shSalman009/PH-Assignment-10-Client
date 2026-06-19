import React from "react";

export default function Logo({
  className = "",
  showText = true,
  iconSize = 40,
}) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Culinary Tech SVG Icon */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Custom Food-Tech Gradient mapping to generic warm culinary hues */}
          <linearGradient
            id="recipeHubGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#F97316" /> {/* Tailwind Orange */}
            <stop offset="100%" stopColor="#EF4444" /> {/* Tailwind Red */}
          </linearGradient>
          {/* Subtle Glow Filter */}
          <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="2"
              floodColor="#F97316"
              floodOpacity="0.2"
            />
          </filter>
        </defs>

        {/* The "Hub" Connected Steam Network Nodes */}
        <g filter="url(#subtleGlow)">
          <circle cx="35" cy="30" r="6" fill="url(#recipeHubGradient)" />
          <circle cx="50" cy="18" r="8" fill="url(#recipeHubGradient)" />
          <circle cx="65" cy="32" r="5" fill="url(#recipeHubGradient)" />

          {/* Connected Network Lines */}
          <path
            d="M35 30C42 22 45 22 50 18"
            stroke="url(#recipeHubGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M50 18C55 25 60 25 65 32"
            stroke="url(#recipeHubGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M35 30C45 35 45 42 50 50"
            stroke="url(#recipeHubGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="3 3"
          />
          <path
            d="M65 32C60 38 55 42 50 50"
            stroke="url(#recipeHubGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="3 3"
          />
        </g>

        {/* The "Recipe" Mixing Bowl/Pot Base */}
        <path
          d="M20 50H80C80 68.78 66.57 82 50 82C33.43 82 20 68.78 20 50Z"
          fill="url(#recipeHubGradient)"
        />

        {/* Sleek Minimalist Pot Handles */}
        <path
          d="M12 54C12 50 15 48 20 48"
          stroke="url(#recipeHubGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M88 54C88 50 85 48 80 48"
          stroke="url(#recipeHubGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Internal Geometric Accent Line */}
        <path
          d="M32 58H68"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>

      {showText && (
        <span className="font-bold text-xl tracking-tight flex items-center">
          <span className="text-foreground">Recipe</span>
          <span className="text-primary pl-1 font-semibold">Hub</span>
        </span>
      )}
    </div>
  );
}

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "breatheIn": {
          "0%": {
            transform: "scale(0.9)",
            opacity: "0.7",
          },
          "100%": {
            transform: "scale(1.2)",
            opacity: "0.9",
          },
        },
        "breatheOut": {
          "0%": {
            transform: "scale(1.2)",
            opacity: "0.9",
          },
          "100%": {
            transform: "scale(0.9)",
            opacity: "0.7",
          },
        },
        "hueShift": {
          "0%": {
            filter: "hue-rotate(0deg)",
          },
          "50%": {
            filter: "hue-rotate(45deg)",
          },
          "100%": {
            filter: "hue-rotate(0deg)",
          },
        },
        "expand": {
          "0%": {
            padding: "0px",
            margin: "0px",
          },
          "100%": {
            padding: "4px",
            margin: "4px 0",
          },
        },
        "ping-slow": {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0.8"
          },
          "50%": {
            transform: "scale(1.2)",
            opacity: "0.3"
          }
        },
        "ping-slower": {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0.4"
          },
          "50%": {
            transform: "scale(1.5)",
            opacity: "0.1"
          }
        },
        "bounce-subtle": {
          "0%, 100%": {
            transform: "translateY(-10%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)"
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)"
          }
        },
        "shimmer": {
          "0%": {
            backgroundPosition: "-200% 0"
          },
          "100%": {
            backgroundPosition: "200% 0"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "breatheIn": "breatheIn 4s ease-in-out infinite",
        "breatheOut": "breatheOut 4s ease-in-out infinite",
        "hueShift": "hueShift 10s infinite",
        "expand": "expand 0.5s ease-out forwards",
        "ping-slow": "ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "ping-slower": "ping-slower 5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "bounce-subtle": "bounce-subtle 1.5s infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

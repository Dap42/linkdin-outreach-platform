import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Network, Target, Users, Zap } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // Import useAuth hook

export const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth(); // Destructure isAuthenticated and logout from useAuth

  const navItems = [
    { href: "/", label: "Home", icon: Network },
    { href: "/outreach", label: "Outreach", icon: Target },
    { href: "/results", label: "Results", icon: Users },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold"
          >
            <div className="p-2 rounded-lg gradient-primary">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="gradient-text">LinkReach Pro</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="gradient-primary shadow-primary">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => logout()}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

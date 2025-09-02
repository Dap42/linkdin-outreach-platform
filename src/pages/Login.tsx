import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Navbar } from "@/components/ui/navbar";
import { Zap, Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Hardcoded demo credentials
  const credentials = [
    {
      email: "anoops@analytx4t.com",
      password: "1234567890",
      webhookUrl: "https://n8n.srv982383.hstgr.cloud/webhook/3c7ae4bd-ae76-4f27-a024-56db25ad31df",
      sheetName: "Anoop"
    },
    {
      email: "analytx4tlab@gmail.com",
      password: "1234567890",
      webhookUrl: "https://n8n.srv982383.hstgr.cloud/webhook/db65919b-629d-42fa-9441-b2112f040ab3",
      sheetName: "Testers"
    },
    {
      email: "saurabh@allabovedesignstudio.com",
      password: "1234567890",
      webhookUrl: "https://n8n.srv982383.hstgr.cloud/webhook/457d54dc-7f8a-40b1-b213-959c2226beff",
      sheetName: "Saurabh_Client"
    },
    {
      email: "kkguruamit@gmail.com",
      password: "1234567890",
      webhookUrl: "https://n8n.srv982383.hstgr.cloud/webhook/10c8282b-3379-4953-95da-bde8a6e076e9",
      sheetName: "Amit"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Find matching credentials
    const user = credentials.find(
      cred => cred.email === email && cred.password === password
    );

    if (user) {
      login({
        email: user.email,
        webhookUrl: user.webhookUrl,
        sheetName: user.sheetName
      });
      navigate("/outreach");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <AnimatedBackground>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="gradient-card shadow-glow border-border/50">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg gradient-primary">
                  <Zap className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your LinkReach Pro account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="flex items-center space-x-2"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="enter your email"
                    className="bg-input border-border focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="flex items-center space-x-2"
                  >
                    <Lock className="h-4 w-4" />
                    <span>Password</span>
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="enter your password"
                    className="bg-input border-border focus:ring-primary"
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-primary hover:text-primary/80 transition-smooth"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary shadow-primary hover:shadow-glow transition-smooth"
                  size="lg"
                >
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary hover:text-primary/80 transition-smooth font-medium"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default Login;

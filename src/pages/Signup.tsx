import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Navbar } from "@/components/ui/navbar";
import { Zap, Mail, Lock, User, ArrowRight, CheckCircle } from "lucide-react";

const Signup = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup form submitted");
  };

  const features = [
    "Unlimited AI-powered outreach",
    "Advanced targeting algorithms", 
    "Real-time analytics dashboard",
    "Priority customer support"
  ];

  return (
    <AnimatedBackground>
      <Navbar />
      
      <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Features */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl font-bold mb-4">
                  Join{" "}
                  <span className="gradient-text">
                    LinkReach Pro
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Transform your LinkedIn outreach with AI-powered automation 
                  and start generating qualified leads today.
                </p>
              </div>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right side - Signup Form */}
            <Card className="gradient-card shadow-glow border-border/50">
              <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg gradient-primary">
                    <Zap className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                <CardDescription>
                  Start your free trial - no credit card required
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        className="bg-input border-border focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        className="bg-input border-border focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      className="bg-input border-border focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>Password</span>
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="create a strong password"
                      className="bg-input border-border focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Your Company"
                      className="bg-input border-border focus:ring-primary"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="rounded border-border"
                      required 
                    />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:text-primary/80">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:text-primary/80">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full gradient-primary shadow-primary hover:shadow-glow transition-smooth"
                    size="lg"
                  >
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground">
                    Already have an account?{" "}
                    <Link 
                      to="/login" 
                      className="text-primary hover:text-primary/80 transition-smooth font-medium"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default Signup;
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
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Navbar } from "@/components/ui/navbar";
import {
  Target,
  Users,
  TrendingUp,
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

const Home = () => {
  const { isAuthenticated } = useAuth(); // Get authentication status

  const features = [
    {
      icon: Target,
      title: "AI-Powered Targeting",
      description:
        "Advanced algorithms identify your ideal prospects with precision",
    },
    {
      icon: Users,
      title: "Smart Personalization",
      description: "Craft personalized outreach messages that drive engagement",
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description:
        "Track and optimize your outreach campaigns with detailed insights",
    },
    {
      icon: Shield,
      title: "Compliance First",
      description:
        "Stay within LinkedIn's guidelines with our smart automation",
    },
  ];

  const benefits = [
    "Increase response rates by 300%",
    "Save 10+ hours per week on outreach",
    "Generate qualified leads consistently",
    "Scale your networking efforts",
  ];

  return (
    <AnimatedBackground>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Transform Your{" "}
                <span className="gradient-text">LinkedIn Outreach</span> with AI
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Stop wasting time on manual prospecting. Our AI-powered platform
                identifies, targets, and engages your ideal prospects
                automatically.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {!isAuthenticated ? (
                  <Link to="/signup">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto gradient-primary shadow-primary hover:shadow-glow transition-smooth"
                    >
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/outreach">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto gradient-primary shadow-primary hover:shadow-glow transition-smooth text-lg"
                    >
                      <Target className="mr-2 h-6 w-6" />
                      Outreach
                    </Button>
                  </Link>
                )}
                {!isAuthenticated && ( // Conditionally render "See Demo" button
                  <Link to="/outreach">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-border hover:bg-muted/50"
                    >
                      See Demo
                    </Button>
                  </Link>
                )}
              </div>

              <div className="flex flex-col space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-card">
                <img
                  src={heroImage}
                  alt="LinkedIn Outreach Platform Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Powered by <span className="gradient-text">Advanced AI</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our intelligent system learns from your preferences and optimizes
              every aspect of your LinkedIn outreach strategy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="gradient-card shadow-card border-border/50 hover:shadow-glow transition-smooth h-full">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Card className="gradient-card shadow-glow border-border/50 max-w-4xl mx-auto">
              <CardContent className="pt-12 pb-12">
                <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Ready to <span className="gradient-text">Transform</span> Your
                  Outreach?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of professionals who have revolutionized their
                  LinkedIn networking with our AI-powered platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {!isAuthenticated ? (
                    <Link to="/signup">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto gradient-primary shadow-primary hover:shadow-glow transition-smooth"
                      >
                        Start Your Free Trial
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/outreach">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto gradient-primary shadow-primary hover:shadow-glow transition-smooth text-lg"
                      >
                        <Target className="mr-2 h-6 w-6" />
                        Outreach
                      </Button>
                    </Link>
                  )}
                  {!isAuthenticated && ( // Conditionally render "See Demo" button
                    <Link to="/outreach">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto border-border hover:bg-muted/50"
                      >
                        See Demo
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </AnimatedBackground>
  );
};

export default Home;

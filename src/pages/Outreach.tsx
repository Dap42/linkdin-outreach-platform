import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Navbar } from "@/components/ui/navbar";
import {
  Target,
  Send,
  Users,
  MapPin,
  Building,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../context/AuthContext";

const Outreach = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    designation: "",
    industry: "",
    location: "",
    organizationType: "",
    startIndex: "0",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const webhookUrl = user?.webhookUrl || "";

    try {
      // Convert 0-based startIndex to 1-based for n8n (0->1, 10->11, etc.)
      const startIndexToSend = Number(formData.startIndex) + 1;

      // Prepare form data as URL-encoded payload
      const payload = {
        designation: formData.designation.trim(),
        industry: formData.industry.trim(),
        location: formData.location.trim(),
        organizationType: formData.organizationType.trim(),
        startIndex: String(startIndexToSend),
      };

      // Send as JSON
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      toast({
        title: "Success!",
        description:
          "Your outreach campaign has been initiated. Redirecting to results...",
      });

      // Navigate to results page with the form data
      navigate("/results", { state: { formData } });
    } catch (error) {
      toast({
        title: "Request Sent",
        description:
          "Your request has been submitted. Redirecting to results...",
      });
      // Navigate anyway since no-cors mode doesn't return response status
      navigate("/results", { state: { formData } });
    } finally {
      setIsSubmitting(false);
    }
  };

  const startIndexOptions = [
    { label: "Show 1–10", value: "0" },
    { label: "Show 11–20", value: "10" },
    { label: "Show 21–30", value: "20" },
    { label: "Show 31–40", value: "30" },
    { label: "Show 41–50", value: "40" },
  ];

  return (
    <AnimatedBackground>
      <Navbar />

      <div className="min-h-screen px-6 pt-28 pb-12">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-lg gradient-primary">
                <Target className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              AI LinkedIn <span className="gradient-text">Outreach</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Define your target audience and let our AI find the perfect
              prospects for your LinkedIn outreach campaign.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="gradient-card shadow-glow border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <Users className="h-6 w-6 text-primary" />
                  <span>Target Audience</span>
                </CardTitle>
                <CardDescription>
                  Specify your ideal prospect criteria to generate targeted
                  leads
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                      <Label
                        htmlFor="designation"
                        className="flex items-center space-x-2"
                      >
                        <Target className="h-4 w-4" />
                        <span>Job Title / Designation</span>
                      </Label>
                      <Select
                        value={formData.designation}
                        onValueChange={(value) =>
                          handleInputChange("designation", value)
                        }
                      >
                        <SelectTrigger className="bg-input border-border focus:ring-primary">
                          <SelectValue placeholder="Select designation" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border max-h-60 overflow-y-auto">
                          <SelectItem value="CEO">CEO</SelectItem>
                          <SelectItem value="CTO">CTO</SelectItem>
                          <SelectItem value="Founders">Founders</SelectItem>
                          <SelectItem value="Co-founder">Co-founder</SelectItem>
                          <SelectItem value="AI Engineers">AI Engineers</SelectItem>
                          <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                          <SelectItem value="Freelancers">Freelancers</SelectItem>
                          <SelectItem value="Event Planners">Event Planners</SelectItem>
                          <SelectItem value="Marketing Manager">Marketing Manager</SelectItem>
                          <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                          <SelectItem value="Product Manager">Product Manager</SelectItem>
                          <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                          <SelectItem value="HR Manager">HR Manager</SelectItem>
                          <SelectItem value="Business Development">Business Development</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                     <div className="space-y-2">
                      <Label
                        htmlFor="industry"
                        className="flex items-center space-x-2"
                      >
                        <Building className="h-4 w-4" />
                        <span>Industry</span>
                      </Label>
                      <Select
                        value={formData.industry}
                        onValueChange={(value) =>
                          handleInputChange("industry", value)
                        }
                      >
                        <SelectTrigger className="bg-input border-border focus:ring-primary">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border max-h-60 overflow-y-auto">
                          <SelectItem value="Information Technology">Information Technology</SelectItem>
                          <SelectItem value="Travel">Travel</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Automobile">Automobile</SelectItem>
                          <SelectItem value="Malls">Malls</SelectItem>
                          <SelectItem value="E-commerce">E-commerce</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Real Estate">Real Estate</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="Consulting">Consulting</SelectItem>
                          <SelectItem value="Media & Entertainment">Media & Entertainment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                      <Label
                        htmlFor="location"
                        className="flex items-center space-x-2"
                      >
                        <MapPin className="h-4 w-4" />
                        <span>Location</span>
                      </Label>
                      <Select
                        value={formData.location}
                        onValueChange={(value) =>
                          handleInputChange("location", value)
                        }
                      >
                        <SelectTrigger className="bg-input border-border focus:ring-primary">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border max-h-60 overflow-y-auto">
                          <SelectItem value="Mumbai">Mumbai</SelectItem>
                          <SelectItem value="Delhi">Delhi</SelectItem>
                          <SelectItem value="Bangalore">Bangalore</SelectItem>
                          <SelectItem value="Chennai">Chennai</SelectItem>
                          <SelectItem value="Kolkata">Kolkata</SelectItem>
                          <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                          <SelectItem value="Pune">Pune</SelectItem>
                          <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                          <SelectItem value="Jaipur">Jaipur</SelectItem>
                          <SelectItem value="Surat">Surat</SelectItem>
                          <SelectItem value="Lucknow">Lucknow</SelectItem>
                          <SelectItem value="Kanpur">Kanpur</SelectItem>
                          <SelectItem value="Nagpur">Nagpur</SelectItem>
                          <SelectItem value="UAE">UAE</SelectItem>
                          <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                          <SelectItem value="Kuwait">Kuwait</SelectItem>
                          <SelectItem value="Qatar">Qatar</SelectItem>
                          <SelectItem value="Bahrain">Bahrain</SelectItem>
                          <SelectItem value="Oman">Oman</SelectItem>
                          <SelectItem value="Remote">Remote</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                     <div className="space-y-2">
                      <Label
                        htmlFor="organizationType"
                        className="flex items-center space-x-2"
                      >
                        <Building className="h-4 w-4" />
                        <span>Organization Type</span>
                      </Label>
                      <Select
                        value={formData.organizationType}
                        onValueChange={(value) =>
                          handleInputChange("organizationType", value)
                        }
                      >
                        <SelectTrigger className="bg-input border-border focus:ring-primary">
                          <SelectValue placeholder="Select organization type" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border max-h-60 overflow-y-auto">
                          <SelectItem value="SME's">SME's</SelectItem>
                          <SelectItem value="Mid Size Company">Mid Size Company</SelectItem>
                          <SelectItem value="Enterprise">Enterprise</SelectItem>
                          <SelectItem value="MNC's">MNC's</SelectItem>
                          <SelectItem value="Startup's">Startup's</SelectItem>
                          <SelectItem value="Non-profit">Non-profit</SelectItem>
                          <SelectItem value="Government">Government</SelectItem>
                          <SelectItem value="Educational Institution">Educational Institution</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="startIndex"
                      className="flex items-center space-x-2"
                    >
                      <Users className="h-4 w-4" />
                      <span>Results Range</span>
                    </Label>
                    <Select
                      value={formData.startIndex}
                      onValueChange={(value) =>
                        handleInputChange("startIndex", value)
                      }
                    >
                      <SelectTrigger className="bg-input border-border focus:ring-primary">
                        <SelectValue placeholder="Select results range" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {startIndexOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gradient-primary shadow-primary hover:shadow-glow transition-smooth"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2" />
                        Generating Leads...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Find My Prospects
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <Card className="gradient-card shadow-card border-border/50">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-3">
                      <Target className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Smart Targeting</h3>
                    <p className="text-sm text-muted-foreground">
                      AI algorithms find prospects matching your exact criteria
                    </p>
                  </div>
                  <div>
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Quality Leads</h3>
                    <p className="text-sm text-muted-foreground">
                      Get verified profiles with complete professional
                      information
                    </p>
                  </div>
                  <div>
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-3">
                      <Send className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Instant Results</h3>
                    <p className="text-sm text-muted-foreground">
                      Get your prospect list ready for outreach in seconds
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default Outreach;

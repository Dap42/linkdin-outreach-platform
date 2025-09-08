import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Users,
  ExternalLink,
  RefreshCw,
  Download,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowUpDown,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DelayedResultsLoader } from "@/components/DelayedResultsLoader"; // Import the new loader

interface Prospect {
  Name: string;
  Title: string;
  Linked_url: string;
  About: string;
  Image: string;
}

const Results = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [sortOrder, setSortOrder] = useState<'endFirst' | 'startFirst'>(() => {
    return (localStorage.getItem('resultsSortOrder') as 'endFirst' | 'startFirst') || 'endFirst';
  });

  const formData = location.state?.formData || {};

  // Save sort preference to localStorage
  useEffect(() => {
    localStorage.setItem('resultsSortOrder', sortOrder);
  }, [sortOrder]);

  const toggleExpand = (prospectId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(prospectId)) {
      newExpanded.delete(prospectId);
    } else {
      newExpanded.add(prospectId);
    }
    setExpandedCards(newExpanded);
  };

  const truncateText = (text: string, limit: number = 150) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  return (
    <AnimatedBackground>
      <Navbar />

      <div className="min-h-screen px-6 pt-28 pb-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <Link to="/outreach">
                    <Button variant="outline" size="sm">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Search
                    </Button>
                  </Link>
                  <div className="p-3 rounded-lg gradient-primary">
                    <Users className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold mb-2">
                  Your <span className="gradient-text">Prospects</span>
                </h1>
                <p className="text-muted-foreground">
                  {formData.designation && `${formData.designation} • `}
                  {formData.industry && `${formData.industry} • `}
                  {formData.location && formData.location}
                </p>
              </div>
            </div>
          </motion.div>

          <DelayedResultsLoader formData={formData}>
            {(prospects, isLoading, refetch) => {
              // Create displayed prospects based on sort order
              const displayedProspects = sortOrder === 'endFirst' 
                ? [...prospects].reverse() 
                : prospects;

              return (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={refetch}
                      disabled={isLoading}
                    >
                      <RefreshCw
                        className={`h-4 w-4 mr-2 ${
                          isLoading ? "animate-spin" : ""
                        }`}
                      />
                      Refresh
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const csvData = displayedProspects.map((p) => ({
                          Name: p.Name || '',
                          Title: p.Title || '',
                          LinkedIn: p.Linked_url || '',
                          About: (p.About || '').replace(/,/g, ";"),
                        }));

                        const csvContent =
                          "data:text/csv;charset=utf-8," +
                          "Name,Title,LinkedIn,About\n" +
                          csvData
                            .map(
                              (row) =>
                                `"${row.Name}","${row.Title}","${row.LinkedIn}","${row.About}"`
                            )
                            .join("\n");

                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", "prospects.csv");
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      disabled={prospects.length === 0}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {prospects.length} results
                    </span>
                    <Select value={sortOrder} onValueChange={(value: 'endFirst' | 'startFirst') => setSortOrder(value)}>
                      <SelectTrigger className="w-[140px]">
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="endFirst">Newest first</SelectItem>
                        <SelectItem value="startFirst">Oldest first</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {prospects.length === 0 && !isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <Card className="gradient-card shadow-card border-border/50 max-w-md mx-auto">
                      <CardContent className="pt-6">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                          No Prospects Found
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Try adjusting your search criteria or expanding your
                          target parameters.
                        </p>
                        <Link to="/outreach">
                          <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Try Different Search
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedProspects.map((prospect, index) => {
                      const prospectId = prospect.Linked_url || prospect.Name || `prospect-${index}`;
                      return (
                        <motion.div
                          key={prospectId}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                        <Card className="gradient-card shadow-card border-border/50 hover:shadow-glow transition-smooth h-full min-h-[350px]">
                          {" "}
                          {/* Added min-h for consistent card height */}
                          <CardHeader className="pb-3">
                            <div className="flex items-start space-x-4">
                              <img
                                src={prospect.Image}
                                alt={prospect.Name}
                                className="w-16 h-16 rounded-lg object-cover shadow-primary"
                                onError={(e) => {
                                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    prospect.Name
                                  )}&background=217d91&color=fff&size=64`;
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-lg leading-tight">
                                  {prospect.Name}
                                </CardTitle>
                                <CardDescription className="text-sm text-primary">
                                  {prospect.Title}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {expandedCards.has(prospectId)
                                  ? (prospect.About || 'No description available.')
                                  : truncateText(prospect.About || 'No description available.')}
                              </p>
                              {(prospect.About || '').length > 150 && (
                                <button
                                  onClick={() => toggleExpand(prospectId)}
                                  className="text-primary hover:text-primary/80 text-sm mt-2 flex items-center space-x-1 transition-smooth"
                                >
                                  {expandedCards.has(prospectId) ? (
                                    <>
                                      <EyeOff className="h-3 w-3" />
                                      <span>Show less</span>
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="h-3 w-3" />
                                      <span>Read more</span>
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                            <div className="pt-2">
                              <a
                                href={prospect.Linked_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full"
                              >
                                <Button
                                  size="sm"
                                  className="w-full gradient-primary shadow-primary hover:shadow-glow transition-smooth"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View LinkedIn
                                </Button>
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                      );
                    })}
                  </div>
                )}
              </>
              );
            }}
          </DelayedResultsLoader>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default Results;

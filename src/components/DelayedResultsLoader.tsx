import React, { useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Target, Users, Zap } from "lucide-react"; // Added Target, Users, Zap
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence for animations

interface Prospect {
  Name: string;
  Title: string;
  Linked_url: string;
  About: string;
  Image: string;
}

interface DelayedResultsLoaderProps {
  formData: any;
  children: (
    prospects: Prospect[],
    isLoading: boolean,
    refetch: () => void
  ) => ReactNode;
}

export const DelayedResultsLoader: React.FC<DelayedResultsLoaderProps> = ({
  formData,
  children,
}) => {
  const { toast } = useToast();
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  const funFacts = [
    "Did you know? AI can score leads automatically, helping you focus only on high-quality prospects.",
    "Fact: Using AI for follow-up reminders increases the chances of closing deals by 42%.",
    "Insight: AI-powered sentiment analysis can detect prospect interest levels from their replies.",
    "Tip: Scheduling outreach at optimal times with AI can double your message open rates.",
    "Stat: Businesses using AI-driven LinkedIn campaigns report a 35% faster sales cycle.",
    "Did you know? AI can personalize connection requests at scale without sounding generic.",
    "Fact: AI-driven A/B testing for LinkedIn messages improves conversion rates by up to 60%.",
    "Insight: Companies that leverage AI in sales prospecting reduce manual research time by 70%.",
    "Tip: AI can identify job changes or promotions instantly, giving you the perfect moment to reach out.",
    "Stat: Sales teams using AI-assisted outreach see 2.3x higher pipeline growth than traditional methods.",
  ];

  const animatedIcons = [Target, Users, Zap];

  const fetchGoogleSheetData = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching from Google Sheets with formData:', formData);
      
      // Fetch directly from Google Sheets using gviz API
      const sheetUrl = 'https://docs.google.com/spreadsheets/d/19JeOWJL2oqyyrGjKn5bZodkaiNup8rDkKxdOEa2r4u8/gviz/tq?sheet=Client_Data';
      
      const response = await fetch(sheetUrl);
      if (!response.ok) {
        throw new Error(`Google Sheets request failed with status: ${response.status}`);
      }

      const textData = await response.text();
      
      // Parse gviz response (it's wrapped in a function call)
      const jsonStart = textData.indexOf('(') + 1;
      const jsonEnd = textData.lastIndexOf(')');
      const jsonStr = textData.substring(jsonStart, jsonEnd);
      const gvizData = JSON.parse(jsonStr);
      
      // Extract and map data to Prospect format
      const rows = gvizData.table.rows || [];
      const allProspects: Prospect[] = rows.map((row: any) => ({
        Name: row.c[0]?.v || '',
        Title: row.c[1]?.v || '',
        Linked_url: row.c[2]?.v || '',
        About: row.c[3]?.v || '',
        Image: row.c[4]?.v || ''
      }));

      // Apply startIndex slicing (convert 1-based to 0-based for array slicing)
      const startIndex = Number(formData.startIndex) || 0;
      const slicedProspects = allProspects.slice(startIndex, startIndex + 10);
      
      setProspects(slicedProspects);
      toast({
        title: "Success!",
        description: `Found ${slicedProspects.length} prospects matching your criteria.`,
      });
    } catch (error) {
      console.error("Failed to fetch prospect data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch data from Google Sheets. Please check if the sheet is publicly accessible.",
        variant: "destructive",
      });
      setProspects([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Expose refetch function
  const refetch = () => {
    fetchGoogleSheetData();
  };

  useEffect(() => {
    const delay = 12700; // 10 seconds delay as per user request

    const timer = setTimeout(() => {
      fetchGoogleSheetData();
    }, delay);

    // Cycle through fun facts and icons
    const factInterval = setInterval(() => {
      setCurrentFactIndex(Math.floor(Math.random() * funFacts.length));
    }, 2000); // Change fact every 2 seconds

    const iconInterval = setInterval(() => {
      setCurrentIconIndex(
        (prevIndex) => (prevIndex + 1) % animatedIcons.length
      );
    }, 1500); // Change icon every 1.5 seconds

    return () => {
      clearTimeout(timer); // Cleanup the data fetch timer
      clearInterval(factInterval); // Cleanup fact interval
      clearInterval(iconInterval); // Cleanup icon interval
    };
  }, [formData.startIndex]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Card className="gradient-card shadow-card border-border/50 max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIconIndex}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                {React.createElement(animatedIcons[currentIconIndex], {
                  className: "h-12 w-12 animate-pulse text-primary mx-auto",
                })}
              </motion.div>
            </AnimatePresence>
            <h3 className="text-xl font-semibold mb-2">
              Preparing Your Prospects
            </h3>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentFactIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="text-muted-foreground text-center max-w-sm mx-auto"
              >
                {funFacts[currentFactIndex]}
              </motion.p>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children(prospects, isLoading, refetch)}</>;
};

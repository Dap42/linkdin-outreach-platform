import React, { useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Prospect {
  Name: string;
  Title: string;
  Linked_url: string;
  About: string;
  Image: string;
}

interface OptimisticResultsLoaderProps {
  formData: any;
  children: (
    prospects: Prospect[],
    isLoading: boolean,
    refetch: () => void
  ) => ReactNode;
}

export const OptimisticResultsLoader: React.FC<
  OptimisticResultsLoaderProps
> = ({ formData, children }) => {
  const { toast } = useToast();
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false); // For background refresh

  const fetchGoogleSheetData = async (
    showToast: boolean = true,
    isBackgroundRefresh: boolean = false
  ) => {
    if (!isBackgroundRefresh) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }

    try {
      const queryParams = new URLSearchParams(formData).toString();
      const response = await fetch(
        `http://localhost:3001/api/prospects?${queryParams}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch prospects");
      }

      const newData: Prospect[] = await response.json();

      const existingUrls = new Set(prospects.map((p) => p.Linked_url));
      const uniqueNewProspects = newData.filter(
        (p) => !existingUrls.has(p.Linked_url)
      );

      setProspects((prevProspects) => [
        ...prevProspects,
        ...uniqueNewProspects,
      ]);

      if (showToast) {
        toast({
          title: "Success!",
          description: `Found ${newData.length} prospects. Added ${uniqueNewProspects.length} new ones.`,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (showToast) {
        toast({
          title: "Error",
          description: "Failed to fetch prospect data. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      if (!isBackgroundRefresh) {
        setIsLoading(false);
      } else {
        setIsRefreshing(false);
      }
    }
  };

  // Expose refetch function
  const refetch = () => {
    fetchGoogleSheetData(true, false);
  };

  useEffect(() => {
    // Initial quick load
    const initialDelay = 1000; // 1 second for optimistic display
    const initialTimer = setTimeout(() => {
      fetchGoogleSheetData(true, false);
    }, initialDelay);

    // Background refresh after Google Sheet update time
    const refreshDelay = 10000; // 10 seconds for Google Sheet update
    const refreshTimer = setTimeout(() => {
      fetchGoogleSheetData(false, true); // No toast for background refresh
    }, initialDelay + refreshDelay); // Start refresh after initial load + sheet update time

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(refreshTimer);
    };
  }, [formData.startIndex]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Card className="gradient-card shadow-card border-border/50 max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Finding Your Prospects
            </h3>
            <p className="text-muted-foreground">
              Our AI is searching through LinkedIn profiles to find the perfect
              matches...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {isRefreshing && (
        <div className="fixed top-0 left-0 right-0 z-50 p-2 bg-primary text-primary-foreground text-center text-sm">
          Refreshing data in the background...
        </div>
      )}
      {children(prospects, isLoading, refetch)}
    </>
  );
};

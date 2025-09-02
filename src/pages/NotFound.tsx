import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AnimatedBackground>
      <div className="min-h-screen flex items-center justify-center px-6">
        <Card className="gradient-card shadow-glow border-border/50 max-w-md w-full">
          <CardContent className="pt-12 pb-12 text-center">
            <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/">
              <Button className="gradient-primary shadow-primary hover:shadow-glow transition-smooth">
                <HomeIcon className="h-4 w-4 mr-2" />
                Return to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AnimatedBackground>
  );
};

export default NotFound;

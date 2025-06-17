
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProgressTracker from '@/components/ProgressTracker';
import PhotoTracker from '@/components/PhotoTracker';

const Progress = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData;

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No user data found</h1>
          <Button onClick={() => navigate('/onboarding')} className="bg-primary hover:bg-primary/80">
            Complete Your Setup
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6 animate-slide-left">
          <Button
            onClick={() => navigate('/dashboard', { state: { userData } })}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground mr-4 transition-all-smooth"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-primary">Progress Tracking</h1>
        </div>

        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary mb-6">
            <TabsTrigger value="stats" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Statistics
            </TabsTrigger>
            <TabsTrigger value="photos" className="text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Photo Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <ProgressTracker 
              initialWeight={parseFloat(userData.weight)}
              goal={userData.goal}
              dailyCalories={userData.dailyCalories}
            />
          </TabsContent>

          <TabsContent value="photos">
            <PhotoTracker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Progress;

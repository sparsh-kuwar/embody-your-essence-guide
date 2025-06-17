
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MealDatabase from '@/components/MealDatabase';
import NutritionTracker from '@/components/NutritionTracker';

const Meals = () => {
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
          <h1 className="text-3xl font-bold text-primary">Nutrition Center</h1>
        </div>

        <Tabs defaultValue="tracker" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary mb-6">
            <TabsTrigger value="tracker" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Nutrition Tracker
            </TabsTrigger>
            <TabsTrigger value="recipes" className="text-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Recipe Database
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tracker">
            <NutritionTracker 
              dailyCalories={userData.dailyCalories}
              goal={userData.goal}
            />
          </TabsContent>

          <TabsContent value="recipes">
            <MealDatabase 
              dietType={userData.dietType} 
              dailyCalories={userData.dailyCalories} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Meals;

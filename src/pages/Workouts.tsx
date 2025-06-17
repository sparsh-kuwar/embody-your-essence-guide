
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import WorkoutTracker from '@/components/WorkoutTracker';

const Workouts = () => {
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
          <h1 className="text-3xl font-bold text-primary">Workout Training</h1>
        </div>

        <WorkoutTracker fitnessLevel={userData.fitnessLevel} />
      </div>
    </div>
  );
};

export default Workouts;

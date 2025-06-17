
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import MealDatabase from '@/components/MealDatabase';

const Meals = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData;

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-orange-800 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">No warrior data found</h1>
          <Button onClick={() => navigate('/onboarding')} className="bg-gradient-to-r from-red-600 to-orange-600 border-2 border-orange-400">
            Complete Your Setup
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-orange-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button
            onClick={() => navigate('/dashboard', { state: { userData } })}
            variant="outline"
            className="border-orange-400 border-2 text-orange-400 hover:bg-orange-400 hover:text-black bg-transparent mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-white">Nutrition Arsenal</h1>
        </div>

        <MealDatabase 
          dietType={userData.dietType} 
          dailyCalories={userData.dailyCalories} 
        />
      </div>
    </div>
  );
};

export default Meals;

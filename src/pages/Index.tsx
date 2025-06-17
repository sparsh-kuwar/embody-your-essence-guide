
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Utensils, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            FitLife Pro
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Transform your fitness journey with personalized workout plans and nutrition guidance tailored just for you
          </p>
          <Button 
            onClick={() => navigate('/onboarding')}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full w-16 h-16 flex items-center justify-center">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Smart Workouts</CardTitle>
              <CardDescription className="text-blue-100">
                Personalized workout plans for Explorer, Warrior, and Champion levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>✓ Adaptive difficulty levels</li>
                <li>✓ Progress tracking</li>
                <li>✓ Video demonstrations</li>
                <li>✓ Custom routines</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full w-16 h-16 flex items-center justify-center">
                <Utensils className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Nutrition AI</CardTitle>
              <CardDescription className="text-blue-100">
                Calculated meal plans based on your metabolic needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>✓ Calorie calculation</li>
                <li>✓ Veg & Non-veg options</li>
                <li>✓ Macro tracking</li>
                <li>✓ Recipe suggestions</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Daily Planning</CardTitle>
              <CardDescription className="text-blue-100">
                Structured daily schedules for optimal results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>✓ Daily meal schedules</li>
                <li>✓ Workout timing</li>
                <li>✓ Progress reminders</li>
                <li>✓ Goal tracking</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Life?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Join thousands of users who have already started their fitness journey with FitLife Pro
          </p>
          <Button 
            onClick={() => navigate('/onboarding')}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300"
          >
            Get Started Free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;

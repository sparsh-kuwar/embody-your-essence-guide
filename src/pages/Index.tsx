
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Utensils, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-orange-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            MetaFit
          </h1>
          <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
            Forge your ultimate fitness journey with battle-tested workout plans and warrior nutrition strategies
          </p>
          <Button 
            onClick={() => navigate('/onboarding')}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-orange-400"
          >
            Begin Your Quest
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 text-white hover:bg-black/30 transition-all duration-300 transform hover:scale-105 border-2">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center border-2 border-orange-400">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-orange-400">Combat Training</CardTitle>
              <CardDescription className="text-orange-100">
                Battle-forged workout plans for Explorer, Warrior, and Champion ranks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-orange-100">
                <li>⚔️ Adaptive combat levels</li>
                <li>🛡️ Victory tracking</li>
                <li>📹 Battle demonstrations</li>
                <li>🎯 Custom campaigns</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 text-white hover:bg-black/30 transition-all duration-300 transform hover:scale-105 border-2">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-16 h-16 flex items-center justify-center border-2 border-orange-400">
                <Utensils className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-orange-400">Warrior Nutrition</CardTitle>
              <CardDescription className="text-orange-100">
                Calculated fuel plans based on your metabolic warfare needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-orange-100">
                <li>🔥 Calorie calculation</li>
                <li>🥗 Veg & Non-veg arsenal</li>
                <li>📊 Macro domination</li>
                <li>🍽️ Battle recipes</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 text-white hover:bg-black/30 transition-all duration-300 transform hover:scale-105 border-2">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center border-2 border-orange-400">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-orange-400">Battle Planning</CardTitle>
              <CardDescription className="text-orange-100">
                Strategic daily schedules for maximum conquest
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-orange-100">
                <li>⏰ Daily meal strategy</li>
                <li>💪 Training timing</li>
                <li>🎯 Victory reminders</li>
                <li>🏆 Quest tracking</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Conquer Your Limits?</h2>
          <p className="text-orange-100 mb-8 max-w-xl mx-auto">
            Join the legion of warriors who have already begun their transformation with MetaFit
          </p>
          <Button 
            onClick={() => navigate('/onboarding')}
            variant="outline"
            className="border-orange-400 border-2 text-orange-400 hover:bg-orange-400 hover:text-black px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent"
          >
            Join the Alliance
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;

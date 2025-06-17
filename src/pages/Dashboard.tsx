
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Utensils, Calendar, Book } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData;

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 text-center">
          <CardTitle className="text-white mb-4">No Data Found</CardTitle>
          <Button onClick={() => navigate('/onboarding')} className="bg-gradient-to-r from-orange-500 to-pink-500">
            Complete Setup
          </Button>
        </Card>
      </div>
    );
  }

  const getFitnessLevelInfo = (level: string) => {
    switch (level) {
      case 'explorer':
        return { title: '🌟 Explorer', color: 'bg-green-500', description: 'Building foundations' };
      case 'warrior':
        return { title: '⚔️ Warrior', color: 'bg-orange-500', description: 'Growing stronger' };
      case 'champion':
        return { title: '🏆 Champion', color: 'bg-red-500', description: 'Peak performance' };
      default:
        return { title: 'Fitness Enthusiast', color: 'bg-blue-500', description: 'On the journey' };
    }
  };

  const fitnessInfo = getFitnessLevelInfo(userData.fitnessLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {userData.name}!</h1>
          <p className="text-blue-100">Your personalized fitness journey starts here</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-100">Fitness Level</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={`${fitnessInfo.color} text-white`}>
                {fitnessInfo.title}
              </Badge>
              <p className="text-xs text-blue-100 mt-1">{fitnessInfo.description}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-100">Daily Calories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.dailyCalories}</div>
              <p className="text-xs text-blue-100">kcal/day</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-100">BMR</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(userData.bmr)}</div>
              <p className="text-xs text-blue-100">Base metabolic rate</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-100">Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-semibold capitalize">{userData.goal?.replace('-', ' ')}</div>
              <p className="text-xs text-blue-100">Primary focus</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Workout Plan */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="h-6 w-6 text-orange-400" />
                  <CardTitle className="text-white">Your Workout Plan</CardTitle>
                </div>
                <Badge className="bg-orange-500 text-white">{fitnessInfo.title}</Badge>
              </div>
              <CardDescription className="text-blue-100">
                Personalized workout routine for your fitness level
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white font-medium">Push-ups</span>
                  <span className="text-blue-100">3 sets × {userData.fitnessLevel === 'explorer' ? '5-8' : userData.fitnessLevel === 'warrior' ? '10-15' : '15-20'} reps</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white font-medium">Squats</span>
                  <span className="text-blue-100">3 sets × {userData.fitnessLevel === 'explorer' ? '8-12' : userData.fitnessLevel === 'warrior' ? '15-20' : '20-25'} reps</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white font-medium">Plank</span>
                  <span className="text-blue-100">{userData.fitnessLevel === 'explorer' ? '20-30s' : userData.fitnessLevel === 'warrior' ? '45-60s' : '60-90s'}</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                <Book className="w-4 h-4 mr-2" />
                View Full Workout Plan
              </Button>
            </CardContent>
          </Card>

          {/* Meal Plan */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Utensils className="h-6 w-6 text-green-400" />
                  <CardTitle className="text-white">Your Meal Plan</CardTitle>
                </div>
                <Badge className="bg-green-500 text-white capitalize">{userData.dietType}</Badge>
              </div>
              <CardDescription className="text-blue-100">
                Balanced nutrition plan for {userData.dailyCalories} calories/day
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white font-medium">Breakfast</span>
                  <span className="text-blue-100">{Math.round(userData.dailyCalories * 0.25)} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white font-medium">Lunch</span>
                  <span className="text-blue-100">{Math.round(userData.dailyCalories * 0.35)} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white font-medium">Dinner</span>
                  <span className="text-blue-100">{Math.round(userData.dailyCalories * 0.3)} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-white font-medium">Snacks</span>
                  <span className="text-blue-100">{Math.round(userData.dailyCalories * 0.1)} kcal</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                <Calendar className="w-4 h-4 mr-2" />
                View Detailed Meal Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Your Progress</CardTitle>
            <CardDescription className="text-blue-100">
              Track your fitness journey and celebrate your achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">0 / 7</div>
                <div className="text-sm text-blue-100 mb-2">Workouts This Week</div>
                <Progress value={0} className="h-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">0 / {userData.dailyCalories}</div>
                <div className="text-sm text-blue-100 mb-2">Calories Today</div>
                <Progress value={0} className="h-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">0 / 30</div>
                <div className="text-sm text-blue-100 mb-2">Days Streak</div>
                <Progress value={0} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

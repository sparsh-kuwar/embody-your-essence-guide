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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-orange-800 flex items-center justify-center">
        <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2 p-8 text-center">
          <CardTitle className="text-white mb-4">No Battle Data Found</CardTitle>
          <Button onClick={() => navigate('/onboarding')} className="bg-gradient-to-r from-red-600 to-orange-600 border-2 border-orange-400">
            Complete Setup
          </Button>
        </Card>
      </div>
    );
  }

  const getFitnessLevelInfo = (level: string) => {
    switch (level) {
      case 'explorer':
        return { title: '🌟 Explorer', color: 'bg-green-600 border-green-400', description: 'Building foundations' };
      case 'warrior':
        return { title: '⚔️ Warrior', color: 'bg-orange-600 border-orange-400', description: 'Growing stronger' };
      case 'champion':
        return { title: '🏆 Champion', color: 'bg-red-600 border-red-400', description: 'Peak performance' };
      default:
        return { title: 'Fitness Enthusiast', color: 'bg-blue-600 border-blue-400', description: 'On the journey' };
    }
  };

  const fitnessInfo = getFitnessLevelInfo(userData.fitnessLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-orange-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {userData.name}!</h1>
          <p className="text-orange-100">Your warrior dashboard awaits your conquest</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-orange-100">Warrior Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={`${fitnessInfo.color} text-white border-2`}>
                {fitnessInfo.title}
              </Badge>
              <p className="text-xs text-orange-100 mt-1">{fitnessInfo.description}</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-orange-100">Daily Fuel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-400">{userData.dailyCalories}</div>
              <p className="text-xs text-orange-100">kcal/day</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-orange-100">Base Power</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-400">{Math.round(userData.bmr)}</div>
              <p className="text-xs text-orange-100">Metabolic rate</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-orange-100">Quest</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-semibold capitalize text-orange-400">{userData.goal?.replace('-', ' ')}</div>
              <p className="text-xs text-orange-100">Primary mission</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Workout Plan */}
          <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="h-6 w-6 text-red-400" />
                  <CardTitle className="text-white">Combat Training</CardTitle>
                </div>
                <Badge className={`${fitnessInfo.color} text-white border-2`}>{fitnessInfo.title}</Badge>
              </div>
              <CardDescription className="text-orange-100">
                Your personalized battle routine for maximum warrior gains
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-black/10 rounded-lg border border-orange-500/20">
                  <span className="text-white font-medium">Battle Push-ups</span>
                  <span className="text-orange-100">3 sets × {userData.fitnessLevel === 'explorer' ? '5-8' : userData.fitnessLevel === 'warrior' ? '10-15' : '15-20'} reps</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/10 rounded-lg border border-orange-500/20">
                  <span className="text-white font-medium">Warrior Squats</span>
                  <span className="text-orange-100">3 sets × {userData.fitnessLevel === 'explorer' ? '8-12' : userData.fitnessLevel === 'warrior' ? '15-20' : '20-25'} reps</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/10 rounded-lg border border-orange-500/20">
                  <span className="text-white font-medium">Guardian Plank</span>
                  <span className="text-orange-100">{userData.fitnessLevel === 'explorer' ? '20-30s' : userData.fitnessLevel === 'warrior' ? '45-60s' : '60-90s'}</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/workouts', { state: { userData } })}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 border-2 border-orange-400"
              >
                <Book className="w-4 h-4 mr-2" />
                View Complete Battle Plan
              </Button>
            </CardContent>
          </Card>

          {/* Meal Plan */}
          <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Utensils className="h-6 w-6 text-orange-400" />
                  <CardTitle className="text-white">Nutrition Arsenal</CardTitle>
                </div>
                <Badge className="bg-orange-600 border-orange-400 border-2 text-white capitalize">{userData.dietType?.replace('-', ' ')}</Badge>
              </div>
              <CardDescription className="text-orange-100">
                Strategic fuel plan for {userData.dailyCalories} calories/day
                {userData.mealTypes && userData.mealTypes.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm">Preferences: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {userData.mealTypes.map((type: string) => (
                        <Badge key={type} variant="outline" className="text-xs border-orange-400 text-orange-400">
                          {type.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-black/10 rounded-lg border border-orange-500/20">
                  <span className="text-white font-medium">Morning Fuel</span>
                  <span className="text-orange-100">{Math.round(userData.dailyCalories * 0.25)} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/10 rounded-lg border border-orange-500/20">
                  <span className="text-white font-medium">Midday Power</span>
                  <span className="text-orange-100">{Math.round(userData.dailyCalories * 0.35)} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/10 rounded-lg border border-orange-500/20">
                  <span className="text-white font-medium">Evening Recovery</span>
                  <span className="text-orange-100">{Math.round(userData.dailyCalories * 0.3)} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/10 rounded-lg border border-orange-500/20">
                  <span className="text-white font-medium">Battle Snacks</span>
                  <span className="text-orange-100">{Math.round(userData.dailyCalories * 0.1)} kcal</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/meals', { state: { userData } })}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 border-2 border-orange-400"
              >
                <Calendar className="w-4 h-4 mr-2" />
                View Complete Meal Strategy
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2 mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Victory Progress</CardTitle>
                <CardDescription className="text-orange-100">
                  Track your conquests and celebrate your warrior achievements
                </CardDescription>
              </div>
              <Button
                onClick={() => navigate('/progress', { state: { userData } })}
                variant="outline"
                className="border-orange-400 border-2 text-orange-400 hover:bg-orange-400 hover:text-black bg-transparent"
              >
                View Details
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">0 / 7</div>
                <div className="text-sm text-orange-100 mb-2">Battles This Week</div>
                <Progress value={0} className="h-3 bg-black/30 border border-orange-500/50" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">0 / {userData.dailyCalories}</div>
                <div className="text-sm text-orange-100 mb-2">Fuel Consumed Today</div>
                <Progress value={0} className="h-3 bg-black/30 border border-orange-500/50" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">0 / 30</div>
                <div className="text-sm text-orange-100 mb-2">Victory Streak</div>
                <Progress value={0} className="h-3 bg-black/30 border border-orange-500/50" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

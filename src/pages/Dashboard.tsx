
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Utensils, Calendar, Book, Target, TrendingUp } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData;

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="bg-card border-2 border-primary/20 p-8 text-center animate-fade-scale">
          <CardTitle className="text-foreground mb-4">No User Data Found</CardTitle>
          <Button onClick={() => navigate('/onboarding')} className="bg-primary hover:bg-primary/80">
            Complete Setup
          </Button>
        </Card>
      </div>
    );
  }

  const getFitnessLevelInfo = (level: string) => {
    switch (level) {
      case 'explorer':
        return { title: '🌟 Explorer', color: 'bg-accent border-accent', description: 'Building foundations' };
      case 'warrior':
        return { title: '⚔️ Warrior', color: 'bg-primary border-primary', description: 'Growing stronger' };
      case 'champion':
        return { title: '🏆 Champion', color: 'bg-destructive border-destructive', description: 'Peak performance' };
      default:
        return { title: 'Fitness Enthusiast', color: 'bg-secondary border-secondary', description: 'On the journey' };
    }
  };

  const fitnessInfo = getFitnessLevelInfo(userData.fitnessLevel);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-primary mb-2">Welcome back, {userData.name}!</h1>
          <p className="text-muted-foreground">Your fitness dashboard awaits your progress</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-2 border-primary/20 hover-lift animate-slide-left">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Fitness Level</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={`${fitnessInfo.color} text-white border-2`}>
                {fitnessInfo.title}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">{fitnessInfo.description}</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-2 border-accent/20 hover-lift animate-slide-left" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Daily Calories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{userData.dailyCalories}</div>
              <p className="text-xs text-muted-foreground">kcal/day</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-2 border-blue-400/20 hover-lift animate-slide-left" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Base Metabolic Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{Math.round(userData.bmr)}</div>
              <p className="text-xs text-muted-foreground">BMR</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-2 border-yellow-400/20 hover-lift animate-slide-left" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-semibold capitalize text-yellow-400">{userData.goal?.replace('-', ' ')}</div>
              <p className="text-xs text-muted-foreground">Primary objective</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Workout Plan */}
          <Card className="bg-card border-2 border-primary/20 hover-lift animate-slide-right">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="h-6 w-6 text-primary" />
                  <CardTitle className="text-foreground">Training Program</CardTitle>
                </div>
                <Badge className={`${fitnessInfo.color} text-white border-2`}>{fitnessInfo.title}</Badge>
              </div>
              <CardDescription className="text-muted-foreground">
                Your personalized 30-day transformation program
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg border border-border">
                  <span className="text-foreground font-medium">Push-ups</span>
                  <span className="text-muted-foreground">{userData.fitnessLevel === 'explorer' ? '3 × 8-12' : userData.fitnessLevel === 'warrior' ? '4 × 10-15' : '5 × 15-20'} reps</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg border border-border">
                  <span className="text-foreground font-medium">Squats</span>
                  <span className="text-muted-foreground">{userData.fitnessLevel === 'explorer' ? '3 × 10-15' : userData.fitnessLevel === 'warrior' ? '4 × 15-20' : '5 × 20-25'} reps</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg border border-border">
                  <span className="text-foreground font-medium">Plank Hold</span>
                  <span className="text-muted-foreground">{userData.fitnessLevel === 'explorer' ? '30s' : userData.fitnessLevel === 'warrior' ? '60s' : '90s'}</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/workouts', { state: { userData } })}
                className="w-full bg-primary hover:bg-primary/80 transition-all-smooth"
              >
                <Book className="w-4 h-4 mr-2" />
                Start Today's Workout
              </Button>
            </CardContent>
          </Card>

          {/* Meal Plan */}
          <Card className="bg-card border-2 border-accent/20 hover-lift animate-slide-left">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Utensils className="h-6 w-6 text-accent" />
                  <CardTitle className="text-foreground">Nutrition Plan</CardTitle>
                </div>
                <Badge className="bg-accent border-accent border-2 text-accent-foreground capitalize">{userData.dietType?.replace('-', ' ')}</Badge>
              </div>
              <CardDescription className="text-muted-foreground">
                Strategic nutrition for {userData.dailyCalories} calories/day
                {userData.mealTypes && userData.mealTypes.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm">Preferences: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {userData.mealTypes.map((type: string) => (
                        <Badge key={type} variant="outline" className="text-xs border-accent text-accent">
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
                <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg border border-border">
                  <span className="text-foreground font-medium">Breakfast</span>
                  <span className="text-muted-foreground">{Math.round(userData.dailyCalories * 0.25)} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg border border-border">
                  <span className="text-foreground font-medium">Lunch</span>
                  <span className="text-muted-foreground">{Math.round(userData.dailyCalories * 0.35)} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg border border-border">
                  <span className="text-foreground font-medium">Dinner</span>
                  <span className="text-muted-foreground">{Math.round(userData.dailyCalories * 0.3)} kcal</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg border border-border">
                  <span className="text-foreground font-medium">Snacks</span>
                  <span className="text-muted-foreground">{Math.round(userData.dailyCalories * 0.1)} kcal</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/meals', { state: { userData } })}
                className="w-full bg-accent hover:bg-accent/80 text-accent-foreground transition-all-smooth"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Track Nutrition Today
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card className="bg-card border-2 border-border mt-8 hover-lift animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Progress Overview
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Track your achievements and monitor your transformation
                </CardDescription>
              </div>
              <Button
                onClick={() => navigate('/progress', { state: { userData } })}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all-smooth"
              >
                <Target className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">0 / 7</div>
                <div className="text-sm text-muted-foreground mb-2">Workouts This Week</div>
                <Progress value={0} className="h-3 bg-secondary" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-2">0 / {userData.dailyCalories}</div>
                <div className="text-sm text-muted-foreground mb-2">Calories Consumed Today</div>
                <Progress value={0} className="h-3 bg-secondary" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">0 / 30</div>
                <div className="text-sm text-muted-foreground mb-2">Day Streak</div>
                <Progress value={0} className="h-3 bg-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

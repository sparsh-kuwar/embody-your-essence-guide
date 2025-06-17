
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, TrendingUp, Target, Award, Scale, Ruler } from 'lucide-react';

interface ProgressEntry {
  date: string;
  weight?: number;
  workoutsCompleted?: number;
  caloriesConsumed?: number;
  notes?: string;
}

interface ProgressTrackerProps {
  initialWeight: number;
  goal: string;
  dailyCalories: number;
}

const ProgressTracker = ({ initialWeight, goal, dailyCalories }: ProgressTrackerProps) => {
  const [currentWeight, setCurrentWeight] = useState(initialWeight);
  const [weeklyWorkouts, setWeeklyWorkouts] = useState(0);
  const [dailyCaloriesConsumed, setDailyCaloriesConsumed] = useState(0);
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([]);
  const [newEntry, setNewEntry] = useState<Partial<ProgressEntry>>({});

  const calculateWeightProgress = () => {
    const targetChange = goal === 'weight-loss' ? -5 : goal === 'muscle-gain' ? 3 : 0;
    const currentChange = currentWeight - initialWeight;
    if (targetChange === 0) return 100; // Maintenance goal
    return Math.min(100, Math.max(0, (currentChange / targetChange) * 100));
  };

  const calculateWorkoutProgress = () => {
    return Math.min(100, (weeklyWorkouts / 3) * 100); // Target: 3 workouts per week
  };

  const calculateCalorieProgress = () => {
    return Math.min(100, (dailyCaloriesConsumed / dailyCalories) * 100);
  };

  const addProgressEntry = () => {
    if (newEntry.weight || newEntry.workoutsCompleted || newEntry.caloriesConsumed) {
      const entry: ProgressEntry = {
        date: new Date().toISOString().split('T')[0],
        ...newEntry
      };
      setProgressEntries([entry, ...progressEntries]);
      setNewEntry({});
      
      // Update current stats
      if (newEntry.weight) setCurrentWeight(newEntry.weight);
      if (newEntry.workoutsCompleted) setWeeklyWorkouts(newEntry.workoutsCompleted);
      if (newEntry.caloriesConsumed) setDailyCaloriesConsumed(newEntry.caloriesConsumed);
    }
  };

  const getGoalText = () => {
    switch (goal) {
      case 'weight-loss': return 'Fat Destruction';
      case 'muscle-gain': return 'Muscle Conquest';
      case 'maintenance': return 'Power Maintenance';
      case 'strength': return 'Strength Domination';
      case 'endurance': return 'Endurance Mastery';
      default: return 'Fitness Quest';
    }
  };

  const achievements = [
    { name: 'First Victory', description: 'Complete your first workout', unlocked: weeklyWorkouts > 0 },
    { name: 'Nutrition Warrior', description: 'Track calories for 3 days', unlocked: progressEntries.filter(e => e.caloriesConsumed).length >= 3 },
    { name: 'Consistent Champion', description: 'Complete 5 workouts', unlocked: weeklyWorkouts >= 5 },
    { name: 'Progress Pioneer', description: 'Log weight 5 times', unlocked: progressEntries.filter(e => e.weight).length >= 5 }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Victory Progress Tracker</h2>
        <p className="text-orange-100">Monitor your conquest towards {getGoalText()}</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/20 border border-orange-500/30">
          <TabsTrigger value="overview" className="text-white data-[state=active]:bg-orange-600">
            Overview
          </TabsTrigger>
          <TabsTrigger value="log" className="text-white data-[state=active]:bg-orange-600">
            Log Progress
          </TabsTrigger>
          <TabsTrigger value="achievements" className="text-white data-[state=active]:bg-orange-600">
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Progress Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Scale className="w-5 h-5 text-orange-400" />
                  <CardTitle className="text-white">Weight Progress</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400 mb-2">{currentWeight}kg</div>
                <Progress value={calculateWeightProgress()} className="h-3 bg-black/30 border border-orange-500/50 mb-2" />
                <p className="text-xs text-orange-100">
                  {goal === 'weight-loss' ? 'Target: -5kg' : goal === 'muscle-gain' ? 'Target: +3kg' : 'Maintaining'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-orange-400" />
                  <CardTitle className="text-white">Weekly Battles</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400 mb-2">{weeklyWorkouts} / 3</div>
                <Progress value={calculateWorkoutProgress()} className="h-3 bg-black/30 border border-orange-500/50 mb-2" />
                <p className="text-xs text-orange-100">Workouts completed this week</p>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                  <CardTitle className="text-white">Daily Fuel</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400 mb-2">{dailyCaloriesConsumed}</div>
                <Progress value={calculateCalorieProgress()} className="h-3 bg-black/30 border border-orange-500/50 mb-2" />
                <p className="text-xs text-orange-100">Target: {dailyCalories} kcal</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Progress */}
          <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2">
            <CardHeader>
              <CardTitle className="text-white">Recent Battle Logs</CardTitle>
              <CardDescription className="text-orange-100">Your latest progress entries</CardDescription>
            </CardHeader>
            <CardContent>
              {progressEntries.length > 0 ? (
                <div className="space-y-3">
                  {progressEntries.slice(0, 5).map((entry, index) => (
                    <div key={index} className="p-3 bg-black/20 rounded-lg border border-orange-500/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-orange-400" />
                          <span className="text-white font-medium">{entry.date}</span>
                        </div>
                        <div className="flex space-x-4 text-sm text-orange-100">
                          {entry.weight && <span>Weight: {entry.weight}kg</span>}
                          {entry.workoutsCompleted && <span>Workouts: {entry.workoutsCompleted}</span>}
                          {entry.caloriesConsumed && <span>Calories: {entry.caloriesConsumed}</span>}
                        </div>
                      </div>
                      {entry.notes && (
                        <p className="text-sm text-orange-100 mt-2">{entry.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-orange-100 text-center py-4">
                  No progress entries yet. Start logging your victories!
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="log" className="space-y-4">
          <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2">
            <CardHeader>
              <CardTitle className="text-white">Log Your Victory</CardTitle>
              <CardDescription className="text-orange-100">
                Record your daily progress and celebrate your achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight" className="text-white">Current Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={newEntry.weight || ''}
                    onChange={(e) => setNewEntry({...newEntry, weight: parseFloat(e.target.value)})}
                    className="bg-black/20 border-orange-500/30 text-white"
                    placeholder="Enter weight"
                  />
                </div>
                <div>
                  <Label htmlFor="workouts" className="text-white">Workouts This Week</Label>
                  <Input
                    id="workouts"
                    type="number"
                    value={newEntry.workoutsCompleted || ''}
                    onChange={(e) => setNewEntry({...newEntry, workoutsCompleted: parseInt(e.target.value)})}
                    className="bg-black/20 border-orange-500/30 text-white"
                    placeholder="Number of workouts"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="calories" className="text-white">Calories Consumed Today</Label>
                <Input
                  id="calories"
                  type="number"
                  value={newEntry.caloriesConsumed || ''}
                  onChange={(e) => setNewEntry({...newEntry, caloriesConsumed: parseInt(e.target.value)})}
                  className="bg-black/20 border-orange-500/30 text-white"
                  placeholder="Total calories consumed"
                />
              </div>
              <div>
                <Label htmlFor="notes" className="text-white">Battle Notes (Optional)</Label>
                <Input
                  id="notes"
                  value={newEntry.notes || ''}
                  onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                  className="bg-black/20 border-orange-500/30 text-white"
                  placeholder="How did today's battle go?"
                />
              </div>
              <Button 
                onClick={addProgressEntry}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 border-2 border-orange-400"
              >
                Record Victory
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2">
            <CardHeader>
              <CardTitle className="text-white">Battle Achievements</CardTitle>
              <CardDescription className="text-orange-100">
                Unlock warrior badges as you progress on your fitness journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border ${
                      achievement.unlocked 
                        ? 'bg-orange-600/20 border-orange-400 text-orange-400' 
                        : 'bg-black/20 border-orange-500/20 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Award className={`w-6 h-6 ${achievement.unlocked ? 'text-orange-400' : 'text-gray-500'}`} />
                      <div>
                        <h4 className="font-semibold">{achievement.name}</h4>
                        <p className="text-sm opacity-80">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressTracker;

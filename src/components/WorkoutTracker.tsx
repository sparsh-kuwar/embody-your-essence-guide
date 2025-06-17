
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Play, Pause, RotateCcw, CheckCircle, Timer } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  type: 'reps' | 'time' | 'distance';
  target: number;
  unit: string;
  equipment: string[];
  muscleGroups: string[];
  instructions: string[];
  completed: boolean;
}

interface WorkoutDay {
  day: number;
  title: string;
  focus: string;
  exercises: Exercise[];
  completed: boolean;
}

interface WorkoutTrackerProps {
  fitnessLevel: string;
}

const WorkoutTracker = ({ fitnessLevel }: WorkoutTrackerProps) => {
  const [currentDay, setCurrentDay] = useState(1);
  const [workoutData, setWorkoutData] = useState<WorkoutDay[]>([]);
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem(`metafit-workout-${fitnessLevel}`);
    if (storedData) {
      setWorkoutData(JSON.parse(storedData));
    } else {
      setWorkoutData(generateWorkoutPlan(fitnessLevel));
    }
  }, [fitnessLevel]);

  useEffect(() => {
    localStorage.setItem(`metafit-workout-${fitnessLevel}`, JSON.stringify(workoutData));
  }, [workoutData, fitnessLevel]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setActiveTimer(null);
            // Auto-complete the exercise
            handleExerciseComplete(activeTimer!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining, activeTimer]);

  const generateWorkoutPlan = (level: string): WorkoutDay[] => {
    const baseWorkouts = {
      explorer: [
        {
          day: 1,
          title: "Foundation Upper Body",
          focus: "Building Strength",
          exercises: [
            {
              id: "1-1",
              name: "Push-ups (Modified)",
              type: "reps" as const,
              target: 10,
              unit: "reps",
              equipment: ["Yoga Mat"],
              muscleGroups: ["Chest", "Triceps", "Shoulders"],
              instructions: ["Start in plank position", "Lower chest to ground", "Push back up"],
              completed: false
            },
            {
              id: "1-2",
              name: "Plank Hold",
              type: "time" as const,
              target: 30,
              unit: "seconds",
              equipment: ["Yoga Mat"],
              muscleGroups: ["Core", "Shoulders"],
              instructions: ["Hold plank position", "Keep core tight", "Breathe steadily"],
              completed: false
            }
          ],
          completed: false
        }
      ],
      warrior: [
        {
          day: 1,
          title: "Power Upper Body",
          focus: "Strength & Endurance",
          exercises: [
            {
              id: "1-1",
              name: "Standard Push-ups",
              type: "reps" as const,
              target: 15,
              unit: "reps",
              equipment: ["Yoga Mat"],
              muscleGroups: ["Chest", "Triceps", "Shoulders"],
              instructions: ["Maintain proper form", "Full range of motion", "Control the movement"],
              completed: false
            },
            {
              id: "1-2",
              name: "Plank Hold",
              type: "time" as const,
              target: 60,
              unit: "seconds",
              equipment: ["Yoga Mat"],
              muscleGroups: ["Core", "Shoulders"],
              instructions: ["Hold stable plank", "Engage entire core", "Keep body straight"],
              completed: false
            }
          ],
          completed: false
        }
      ],
      champion: [
        {
          day: 1,
          title: "Elite Upper Power",
          focus: "Advanced Training",
          exercises: [
            {
              id: "1-1",
              name: "Diamond Push-ups",
              type: "reps" as const,
              target: 20,
              unit: "reps",
              equipment: ["Yoga Mat"],
              muscleGroups: ["Triceps", "Chest", "Shoulders"],
              instructions: ["Form diamond with hands", "Maintain strict form", "Control tempo"],
              completed: false
            },
            {
              id: "1-2",
              name: "Plank Hold",
              type: "time" as const,
              target: 90,
              unit: "seconds",
              equipment: ["Yoga Mat"],
              muscleGroups: ["Core", "Shoulders"],
              instructions: ["Maximum stability", "Perfect form", "Mental focus"],
              completed: false
            }
          ],
          completed: false
        }
      ]
    };

    return Array.from({ length: 30 }, (_, index) => ({
      ...baseWorkouts[level as keyof typeof baseWorkouts][0],
      day: index + 1,
      exercises: baseWorkouts[level as keyof typeof baseWorkouts][0].exercises.map(ex => ({
        ...ex,
        id: `${index + 1}-${ex.id.split('-')[1]}`,
        completed: false
      }))
    }));
  };

  const startTimer = (exerciseId: string, duration: number) => {
    setActiveTimer(exerciseId);
    setTimeRemaining(duration);
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = (duration: number) => {
    setTimeRemaining(duration);
    setIsTimerRunning(false);
  };

  const handleExerciseComplete = (exerciseId: string) => {
    setWorkoutData(prev => prev.map(day => {
      if (day.day === currentDay) {
        const updatedExercises = day.exercises.map(ex => 
          ex.id === exerciseId ? { ...ex, completed: true } : ex
        );
        const allCompleted = updatedExercises.every(ex => ex.completed);
        return { ...day, exercises: updatedExercises, completed: allCompleted };
      }
      return day;
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentWorkout = workoutData.find(day => day.day === currentDay);
  const completedDays = workoutData.filter(day => day.completed).length;
  const progress = (completedDays / 30) * 100;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Progress Overview */}
      <Card className="bg-card border-2 border-primary/20 hover-lift">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Timer className="w-5 h-5" />
            30-Day Transformation Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Day {currentDay} of 30</span>
              <Badge variant="outline" className="border-accent text-accent">
                {completedDays} Days Completed
              </Badge>
            </div>
            <Progress value={progress} className="h-3 bg-secondary" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{completedDays}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">{30 - completedDays}</div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{Math.round(progress)}%</div>
                <div className="text-sm text-muted-foreground">Progress</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {workoutData.slice(0, 7).map((day) => (
          <Button
            key={day.day}
            variant={currentDay === day.day ? "default" : "outline"}
            className={`min-w-[60px] transition-all-smooth ${
              day.completed ? 'bg-accent hover:bg-accent/80' : ''
            }`}
            onClick={() => setCurrentDay(day.day)}
          >
            {day.completed && <CheckCircle className="w-4 h-4 mr-1" />}
            Day {day.day}
          </Button>
        ))}
      </div>

      {/* Current Workout */}
      {currentWorkout && (
        <Card className="bg-card border-2 border-primary/20 animate-fade-scale">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-primary text-xl">
                  Day {currentWorkout.day}: {currentWorkout.title}
                </CardTitle>
                <Badge variant="secondary" className="mt-2">
                  {currentWorkout.focus}
                </Badge>
              </div>
              {currentWorkout.completed && (
                <Badge className="bg-accent text-accent-foreground">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentWorkout.exercises.map((exercise, index) => (
              <div key={exercise.id} className="p-4 bg-secondary/50 rounded-lg border border-border animate-slide-left">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Checkbox
                        checked={exercise.completed}
                        onCheckedChange={() => handleExerciseComplete(exercise.id)}
                        className="border-primary data-[state=checked]:bg-primary"
                      />
                      {exercise.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Target: {exercise.target} {exercise.unit}
                    </p>
                  </div>
                  <Badge variant="outline" className="border-accent text-accent">
                    {exercise.equipment.join(', ')}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Muscle Groups</p>
                    <p className="text-sm font-medium">{exercise.muscleGroups.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Equipment</p>
                    <p className="text-sm font-medium">{exercise.equipment.join(', ')}</p>
                  </div>
                </div>

                {exercise.type === 'time' && (
                  <div className="bg-background p-4 rounded-lg border border-border">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {activeTimer === exercise.id ? formatTime(timeRemaining) : formatTime(exercise.target)}
                      </div>
                      <div className="flex justify-center gap-2">
                        {activeTimer === exercise.id ? (
                          <>
                            <Button
                              onClick={pauseTimer}
                              size="sm"
                              variant="outline"
                              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                            >
                              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                            <Button
                              onClick={() => resetTimer(exercise.target)}
                              size="sm"
                              variant="outline"
                              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            onClick={() => startTimer(exercise.id, exercise.target)}
                            size="sm"
                            className="bg-primary hover:bg-primary/80"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Start Timer
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-1">Instructions:</p>
                  <ul className="text-sm space-y-1">
                    {exercise.instructions.map((instruction, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
                variant="outline"
                disabled={currentDay === 1}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Previous Day
              </Button>
              <Button
                onClick={() => setCurrentDay(Math.min(30, currentDay + 1))}
                variant="outline"
                disabled={currentDay === 30}
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                Next Day
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkoutTracker;

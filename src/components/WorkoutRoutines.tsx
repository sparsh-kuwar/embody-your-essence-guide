
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, Zap } from 'lucide-react';

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  description: string;
}

interface WorkoutRoutine {
  day: string;
  focus: string;
  duration: string;
  exercises: Exercise[];
}

interface WorkoutRoutinesProps {
  fitnessLevel: string;
}

const WorkoutRoutines = ({ fitnessLevel }: WorkoutRoutinesProps) => {
  const getWorkoutPlan = (level: string): WorkoutRoutine[] => {
    switch (level) {
      case 'explorer':
        return [
          {
            day: 'Day 1',
            focus: 'Foundation Building',
            duration: '30 min',
            exercises: [
              { name: 'Bodyweight Squats', sets: '3', reps: '8-12', rest: '60s', description: 'Focus on proper form and depth' },
              { name: 'Wall Push-ups', sets: '3', reps: '5-10', rest: '60s', description: 'Build upper body strength gradually' },
              { name: 'Plank Hold', sets: '3', reps: '20-30s', rest: '60s', description: 'Core stability foundation' },
              { name: 'Marching in Place', sets: '1', reps: '5 min', rest: '-', description: 'Light cardio warm-up' }
            ]
          },
          {
            day: 'Day 2',
            focus: 'Active Recovery',
            duration: '20 min',
            exercises: [
              { name: 'Gentle Stretching', sets: '1', reps: '10 min', rest: '-', description: 'Focus on major muscle groups' },
              { name: 'Walking', sets: '1', reps: '10 min', rest: '-', description: 'Light movement for recovery' }
            ]
          },
          {
            day: 'Day 3',
            focus: 'Movement Patterns',
            duration: '30 min',
            exercises: [
              { name: 'Assisted Lunges', sets: '3', reps: '6-10 each leg', rest: '60s', description: 'Use chair for support if needed' },
              { name: 'Incline Push-ups', sets: '3', reps: '5-8', rest: '60s', description: 'Using bench or stairs' },
              { name: 'Dead Bug', sets: '3', reps: '8-10 each side', rest: '45s', description: 'Core coordination exercise' },
              { name: 'Arm Circles', sets: '2', reps: '10 each direction', rest: '30s', description: 'Shoulder mobility' }
            ]
          }
        ];
      
      case 'warrior':
        return [
          {
            day: 'Day 1',
            focus: 'Upper Body Power',
            duration: '45 min',
            exercises: [
              { name: 'Push-ups', sets: '4', reps: '10-15', rest: '90s', description: 'Standard form, modify as needed' },
              { name: 'Pike Push-ups', sets: '3', reps: '8-12', rest: '90s', description: 'Target shoulders and upper chest' },
              { name: 'Tricep Dips', sets: '3', reps: '10-15', rest: '60s', description: 'Using chair or bench' },
              { name: 'Plank to Downward Dog', sets: '3', reps: '10-12', rest: '60s', description: 'Dynamic core and shoulder work' },
              { name: 'Mountain Climbers', sets: '3', reps: '20-30', rest: '60s', description: 'Cardio and core combination' }
            ]
          },
          {
            day: 'Day 2',
            focus: 'Lower Body Strength',
            duration: '45 min',
            exercises: [
              { name: 'Goblet Squats', sets: '4', reps: '12-15', rest: '90s', description: 'Use water jug or backpack for weight' },
              { name: 'Bulgarian Split Squats', sets: '3', reps: '10-12 each leg', rest: '90s', description: 'Single leg strength builder' },
              { name: 'Glute Bridges', sets: '4', reps: '15-20', rest: '60s', description: 'Hip strength and glute activation' },
              { name: 'Walking Lunges', sets: '3', reps: '10-12 each leg', rest: '60s', description: 'Dynamic lower body exercise' },
              { name: 'Calf Raises', sets: '3', reps: '15-20', rest: '45s', description: 'Lower leg strength' }
            ]
          },
          {
            day: 'Day 3',
            focus: 'Full Body Circuit',
            duration: '45 min',
            exercises: [
              { name: 'Burpees', sets: '4', reps: '8-12', rest: '2 min', description: 'Full body explosive movement' },
              { name: 'Jump Squats', sets: '3', reps: '10-15', rest: '90s', description: 'Plyometric lower body power' },
              { name: 'Bear Crawl', sets: '3', reps: '20-30s', rest: '90s', description: 'Full body coordination' },
              { name: 'Russian Twists', sets: '3', reps: '20-25', rest: '60s', description: 'Rotational core strength' },
              { name: 'High Knees', sets: '3', reps: '30s', rest: '60s', description: 'Cardio and leg drive' }
            ]
          }
        ];
      
      case 'champion':
        return [
          {
            day: 'Day 1',
            focus: 'Power & Strength',
            duration: '60 min',
            exercises: [
              { name: 'One-Arm Push-ups (Progression)', sets: '5', reps: '5-8 each arm', rest: '3 min', description: 'Advanced unilateral strength' },
              { name: 'Handstand Push-ups', sets: '4', reps: '5-10', rest: '3 min', description: 'Ultimate shoulder strength' },
              { name: 'Pistol Squats', sets: '4', reps: '6-10 each leg', rest: '2 min', description: 'Single leg squat mastery' },
              { name: 'Muscle-up Progression', sets: '4', reps: '3-6', rest: '3 min', description: 'Advanced pull-up variation' },
              { name: 'Dragon Flag', sets: '3', reps: '5-8', rest: '2 min', description: 'Extreme core strength' }
            ]
          },
          {
            day: 'Day 2',
            focus: 'Plyometric Dominance',
            duration: '60 min',
            exercises: [
              { name: 'Clapping Push-ups', sets: '5', reps: '8-12', rest: '2 min', description: 'Explosive upper body power' },
              { name: 'Box Jump Variations', sets: '4', reps: '10-15', rest: '2 min', description: 'Maximum vertical power' },
              { name: 'Broad Jumps', sets: '4', reps: '8-10', rest: '2 min', description: 'Horizontal power development' },
              { name: 'Plyometric Lunges', sets: '4', reps: '10-12 each leg', rest: '90s', description: 'Single leg explosive power' },
              { name: 'Burpee Box Jump', sets: '3', reps: '8-10', rest: '2 min', description: 'Complex power movement' }
            ]
          },
          {
            day: 'Day 3',
            focus: 'Elite Conditioning',
            duration: '60 min',
            exercises: [
              { name: 'Spartan Race Circuit', sets: '3', reps: '5 rounds', rest: '3 min', description: 'Mixed movement complex' },
              { name: 'Turkish Get-ups', sets: '3', reps: '5-8 each side', rest: '2 min', description: 'Full body coordination' },
              { name: 'Human Flag Progression', sets: '4', reps: '10-20s hold', rest: '2 min', description: 'Advanced core and grip' },
              { name: 'Archer Push-ups', sets: '3', reps: '6-10 each side', rest: '90s', description: 'Unilateral pushing strength' },
              { name: 'Single Leg Deadlift', sets: '4', reps: '10-12 each leg', rest: '90s', description: 'Balance and posterior chain' }
            ]
          }
        ];
      
      default:
        return [];
    }
  };

  const workoutPlan = getWorkoutPlan(fitnessLevel);
  const getFitnessInfo = (level: string) => {
    switch (level) {
      case 'explorer':
        return { title: '🌟 Explorer', color: 'bg-green-600 border-green-400' };
      case 'warrior':
        return { title: '⚔️ Warrior', color: 'bg-orange-600 border-orange-400' };
      case 'champion':
        return { title: '🏆 Champion', color: 'bg-red-600 border-red-400' };
      default:
        return { title: 'Warrior', color: 'bg-blue-600 border-blue-400' };
    }
  };

  const fitnessInfo = getFitnessInfo(fitnessLevel);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge className={`${fitnessInfo.color} text-white border-2 mb-4 text-lg px-4 py-2`}>
          {fitnessInfo.title} Battle Plan
        </Badge>
        <p className="text-orange-100">Your personalized combat training regimen</p>
      </div>

      {workoutPlan.map((day, index) => (
        <Card key={index} className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-xl">{day.day}: {day.focus}</CardTitle>
              <div className="flex items-center space-x-2 text-orange-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{day.duration}</span>
              </div>
            </div>
            <CardDescription className="text-orange-100">
              Targeted training for maximum warrior gains
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {day.exercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} className="p-4 bg-black/20 rounded-lg border border-orange-500/20">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white">{exercise.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-orange-400">
                      <div className="flex items-center space-x-1">
                        <Target className="w-3 h-3" />
                        <span>{exercise.sets} sets</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>{exercise.reps}</span>
                      </div>
                      {exercise.rest !== '-' && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{exercise.rest} rest</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-orange-100">{exercise.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WorkoutRoutines;

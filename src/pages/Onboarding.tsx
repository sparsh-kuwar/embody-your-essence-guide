
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fitnessLevel: '',
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    dietType: '',
    mealTypes: [] as string[],
    goal: ''
  });

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleMealType = (mealType: string) => {
    const currentMealTypes = formData.mealTypes;
    if (currentMealTypes.includes(mealType)) {
      updateFormData('mealTypes', currentMealTypes.filter(type => type !== mealType));
    } else {
      updateFormData('mealTypes', [...currentMealTypes, mealType]);
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    const bmr = calculateBMR();
    const dailyCalories = calculateDailyCalories(bmr);
    
    navigate('/dashboard', { 
      state: { 
        userData: { ...formData, dailyCalories, bmr }
      }
    });
  };

  const calculateBMR = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = parseFloat(formData.age);
    
    if (formData.gender === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  };

  const calculateDailyCalories = (bmr: number) => {
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    
    const multiplier = activityMultipliers[formData.activityLevel as keyof typeof activityMultipliers] || 1.2;
    return Math.round(bmr * multiplier);
  };

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-orange-800 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Forge Your Path, Warrior</h1>
          <p className="text-orange-100">Tell us about yourself to craft your perfect battle plan</p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-3 bg-black/30 border border-orange-500/50" />
          <p className="text-center text-white mt-2 font-semibold">Quest {step} of 4</p>
        </div>

        <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl text-center">
              {step === 1 && "Choose Your Warrior Class"}
              {step === 2 && "Warrior Identity"}
              {step === 3 && "Battle Readiness & Goals"}
              {step === 4 && "Nutrition Arsenal"}
            </CardTitle>
            <CardDescription className="text-orange-100 text-center">
              {step === 1 && "Select the rank that matches your current combat experience"}
              {step === 2 && "Help us understand your physical profile"}
              {step === 3 && "Tell us about your lifestyle and conquest goals"}
              {step === 4 && "Choose your dietary weapons and meal preferences"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <RadioGroup value={formData.fitnessLevel} onValueChange={(value) => updateFormData('fitnessLevel', value)}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-black/20 border border-orange-500/30 hover:bg-black/30 transition-colors cursor-pointer">
                    <RadioGroupItem value="explorer" id="explorer" className="border-orange-400" />
                    <Label htmlFor="explorer" className="text-white cursor-pointer flex-1">
                      <div className="font-semibold text-lg text-orange-400">🌟 Explorer</div>
                      <div className="text-sm text-orange-100">Beginning your fitness quest</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-black/20 border border-orange-500/30 hover:bg-black/30 transition-colors cursor-pointer">
                    <RadioGroupItem value="warrior" id="warrior" className="border-orange-400" />
                    <Label htmlFor="warrior" className="text-white cursor-pointer flex-1">
                      <div className="font-semibold text-lg text-orange-400">⚔️ Warrior</div>
                      <div className="text-sm text-orange-100">Battle-tested and growing stronger</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-black/20 border border-orange-500/30 hover:bg-black/30 transition-colors cursor-pointer">
                    <RadioGroupItem value="champion" id="champion" className="border-orange-400" />
                    <Label htmlFor="champion" className="text-white cursor-pointer flex-1">
                      <div className="font-semibold text-lg text-orange-400">🏆 Champion</div>
                      <div className="text-sm text-orange-100">Elite warrior seeking ultimate mastery</div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Warrior Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="bg-black/20 border-orange-500/30 text-white placeholder:text-gray-400"
                    placeholder="Enter your warrior name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age" className="text-white">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => updateFormData('age', e.target.value)}
                      className="bg-black/20 border-orange-500/30 text-white placeholder:text-gray-400"
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender" className="text-white">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                      <SelectTrigger className="bg-black/20 border-orange-500/30 text-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-orange-500/30">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height" className="text-white">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={formData.height}
                      onChange={(e) => updateFormData('height', e.target.value)}
                      className="bg-black/20 border-orange-500/30 text-white placeholder:text-gray-400"
                      placeholder="170"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-white">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => updateFormData('weight', e.target.value)}
                      className="bg-black/20 border-orange-500/30 text-white placeholder:text-gray-400"
                      placeholder="70"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="activity" className="text-white">Daily Battle Activity</Label>
                  <Select value={formData.activityLevel} onValueChange={(value) => updateFormData('activityLevel', value)}>
                    <SelectTrigger className="bg-black/20 border-orange-500/30 text-white">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-orange-500/30">
                      <SelectItem value="sedentary">Desk Warrior (minimal exercise)</SelectItem>
                      <SelectItem value="light">Light Skirmisher (1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Active Fighter (3-5 days/week)</SelectItem>
                      <SelectItem value="active">Battle Veteran (6-7 days/week)</SelectItem>
                      <SelectItem value="veryActive">Elite Gladiator (intense daily training)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="goal" className="text-white">Primary Quest</Label>
                  <Select value={formData.goal} onValueChange={(value) => updateFormData('goal', value)}>
                    <SelectTrigger className="bg-black/20 border-orange-500/30 text-white">
                      <SelectValue placeholder="Select your quest" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-orange-500/30">
                      <SelectItem value="weight-loss">Fat Destruction</SelectItem>
                      <SelectItem value="muscle-gain">Muscle Conquest</SelectItem>
                      <SelectItem value="maintenance">Power Maintenance</SelectItem>
                      <SelectItem value="strength">Strength Domination</SelectItem>
                      <SelectItem value="endurance">Endurance Mastery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-white text-lg mb-4 block">Dietary Arsenal</Label>
                  <RadioGroup value={formData.dietType} onValueChange={(value) => updateFormData('dietType', value)}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-black/20 border border-orange-500/30 cursor-pointer hover:bg-black/30">
                        <RadioGroupItem value="vegetarian" id="vegetarian" className="border-orange-400" />
                        <Label htmlFor="vegetarian" className="text-white cursor-pointer">
                          🥗 Plant Warrior
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-black/20 border border-orange-500/30 cursor-pointer hover:bg-black/30">
                        <RadioGroupItem value="non-vegetarian" id="non-vegetarian" className="border-orange-400" />
                        <Label htmlFor="non-vegetarian" className="text-white cursor-pointer">
                          🍖 Omnivore Champion
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-black/20 border border-orange-500/30 cursor-pointer hover:bg-black/30">
                        <RadioGroupItem value="vegan" id="vegan" className="border-orange-400" />
                        <Label htmlFor="vegan" className="text-white cursor-pointer">
                          🌱 Pure Plant Fighter
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-white text-lg mb-4 block">Meal Preferences (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'high-protein', label: '💪 High Protein', desc: 'Muscle building focus' },
                      { id: 'low-carb', label: '🥑 Low Carb', desc: 'Fat burning mode' },
                      { id: 'balanced', label: '⚖️ Balanced', desc: 'All macros equal' },
                      { id: 'high-fiber', label: '🌾 High Fiber', desc: 'Digestive health' },
                      { id: 'quick-meals', label: '⚡ Quick Meals', desc: '15 min or less' },
                      { id: 'meal-prep', label: '📦 Meal Prep', desc: 'Batch cooking' }
                    ].map((meal) => (
                      <div
                        key={meal.id}
                        onClick={() => toggleMealType(meal.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          formData.mealTypes.includes(meal.id)
                            ? 'bg-orange-500/20 border-orange-400 text-orange-400'
                            : 'bg-black/20 border-orange-500/30 text-white hover:bg-black/30'
                        }`}
                      >
                        <div className="font-semibold text-sm">{meal.label}</div>
                        <div className="text-xs opacity-80">{meal.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button
                onClick={prevStep}
                disabled={step === 1}
                variant="outline"
                className="border-orange-500/30 text-orange-400 hover:bg-orange-400 hover:text-black bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              {step < 4 ? (
                <Button
                  onClick={nextStep}
                  disabled={!formData.fitnessLevel && step === 1}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 border-2 border-orange-400"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 border-2 border-orange-400"
                >
                  Begin Campaign
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;

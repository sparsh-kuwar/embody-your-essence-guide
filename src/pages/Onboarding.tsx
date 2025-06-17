
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
    goal: ''
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    // Calculate calories and navigate to dashboard
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Let's Get You Started</h1>
          <p className="text-blue-100">Tell us about yourself to create your perfect plan</p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-center text-white mt-2">Step {step} of 4</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-2xl">
              {step === 1 && "Choose Your Fitness Journey"}
              {step === 2 && "Personal Information"}
              {step === 3 && "Activity & Goals"}
              {step === 4 && "Diet Preferences"}
            </CardTitle>
            <CardDescription className="text-blue-100">
              {step === 1 && "Select the level that best describes your current fitness experience"}
              {step === 2 && "Help us understand your physical profile"}
              {step === 3 && "Tell us about your lifestyle and goals"}
              {step === 4 && "Choose your dietary preferences"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <RadioGroup value={formData.fitnessLevel} onValueChange={(value) => updateFormData('fitnessLevel', value)}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <RadioGroupItem value="explorer" id="explorer" />
                    <Label htmlFor="explorer" className="text-white cursor-pointer flex-1">
                      <div className="font-semibold text-lg">🌟 Explorer</div>
                      <div className="text-sm text-blue-100">Just starting your fitness adventure</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <RadioGroupItem value="warrior" id="warrior" />
                    <Label htmlFor="warrior" className="text-white cursor-pointer flex-1">
                      <div className="font-semibold text-lg">⚔️ Warrior</div>
                      <div className="text-sm text-blue-100">Building strength and endurance</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <RadioGroupItem value="champion" id="champion" />
                    <Label htmlFor="champion" className="text-white cursor-pointer flex-1">
                      <div className="font-semibold text-lg">🏆 Champion</div>
                      <div className="text-sm text-blue-100">Pushing limits and achieving excellence</div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                    placeholder="Enter your name"
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
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender" className="text-white">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
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
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
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
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                      placeholder="70"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="activity" className="text-white">Daily Activity Level</Label>
                  <Select value={formData.activityLevel} onValueChange={(value) => updateFormData('activityLevel', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (desk job, little exercise)</SelectItem>
                      <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="veryActive">Very Active (very hard exercise, physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="goal" className="text-white">Primary Goal</Label>
                  <Select value={formData.goal} onValueChange={(value) => updateFormData('goal', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight-loss">Weight Loss</SelectItem>
                      <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="strength">Build Strength</SelectItem>
                      <SelectItem value="endurance">Improve Endurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-white">Diet Type</Label>
                  <RadioGroup value={formData.dietType} onValueChange={(value) => updateFormData('dietType', value)}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                        <RadioGroupItem value="vegetarian" id="vegetarian" />
                        <Label htmlFor="vegetarian" className="text-white cursor-pointer">
                          🥗 Vegetarian
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                        <RadioGroupItem value="non-vegetarian" id="non-vegetarian" />
                        <Label htmlFor="non-vegetarian" className="text-white cursor-pointer">
                          🍖 Non-Vegetarian
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                        <RadioGroupItem value="vegan" id="vegan" />
                        <Label htmlFor="vegan" className="text-white cursor-pointer">
                          🌱 Vegan
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button
                onClick={prevStep}
                disabled={step === 1}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              {step < 4 ? (
                <Button
                  onClick={nextStep}
                  disabled={!formData.fitnessLevel && step === 1}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  Complete Setup
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

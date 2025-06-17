
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, Utensils, Target } from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  serving: string;
}

interface ConsumedFood extends FoodItem {
  quantity: number;
  timestamp: Date;
}

interface NutritionTrackerProps {
  dailyCalories: number;
  goal: string;
}

const NutritionTracker = ({ dailyCalories, goal }: NutritionTrackerProps) => {
  const [consumedFoods, setConsumedFoods] = useState<ConsumedFood[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  const foodDatabase: FoodItem[] = [
    {
      id: '1',
      name: 'Chicken Breast (100g)',
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
      sugar: 0,
      serving: '100g'
    },
    {
      id: '2',
      name: 'Brown Rice (1 cup cooked)',
      calories: 216,
      protein: 5,
      carbs: 45,
      fat: 1.8,
      fiber: 3.5,
      sugar: 0.7,
      serving: '1 cup'
    },
    {
      id: '3',
      name: 'Banana (1 medium)',
      calories: 105,
      protein: 1.3,
      carbs: 27,
      fat: 0.3,
      fiber: 3.1,
      sugar: 14,
      serving: '1 medium'
    },
    {
      id: '4',
      name: 'Greek Yogurt (1 cup)',
      calories: 130,
      protein: 23,
      carbs: 9,
      fat: 0,
      fiber: 0,
      sugar: 9,
      serving: '1 cup'
    },
    {
      id: '5',
      name: 'Almonds (28g)',
      calories: 164,
      protein: 6,
      carbs: 6,
      fat: 14,
      fiber: 3.5,
      sugar: 1.2,
      serving: '28g (about 23 nuts)'
    },
    {
      id: '6',
      name: 'Broccoli (1 cup)',
      calories: 25,
      protein: 3,
      carbs: 5,
      fat: 0.3,
      fiber: 2.3,
      sugar: 1.5,
      serving: '1 cup'
    },
    {
      id: '7',
      name: 'Whole Wheat Bread (1 slice)',
      calories: 81,
      protein: 4,
      carbs: 14,
      fat: 1.1,
      fiber: 2,
      sugar: 1.4,
      serving: '1 slice'
    },
    {
      id: '8',
      name: 'Salmon (100g)',
      calories: 208,
      protein: 25,
      carbs: 0,
      fat: 12,
      fiber: 0,
      sugar: 0,
      serving: '100g'
    }
  ];

  useEffect(() => {
    const today = new Date().toDateString();
    const storedData = localStorage.getItem(`metafit-nutrition-${today}`);
    if (storedData) {
      setConsumedFoods(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem(`metafit-nutrition-${today}`, JSON.stringify(consumedFoods));
  }, [consumedFoods]);

  const addFood = () => {
    if (selectedFood) {
      const newFood: ConsumedFood = {
        ...selectedFood,
        quantity,
        timestamp: new Date(),
        calories: selectedFood.calories * quantity,
        protein: selectedFood.protein * quantity,
        carbs: selectedFood.carbs * quantity,
        fat: selectedFood.fat * quantity,
        fiber: selectedFood.fiber * quantity,
        sugar: selectedFood.sugar * quantity,
      };
      setConsumedFoods(prev => [...prev, newFood]);
      setSelectedFood(null);
      setQuantity(1);
      setSearchTerm('');
    }
  };

  const removeFood = (index: number) => {
    setConsumedFoods(prev => prev.filter((_, i) => i !== index));
  };

  const getTotals = () => {
    return consumedFoods.reduce(
      (totals, food) => ({
        calories: totals.calories + food.calories,
        protein: totals.protein + food.protein,
        carbs: totals.carbs + food.carbs,
        fat: totals.fat + food.fat,
        fiber: totals.fiber + food.fiber,
        sugar: totals.sugar + food.sugar,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
    );
  };

  const getMacroTargets = () => {
    let proteinRatio = 0.25;
    let carbRatio = 0.45;
    let fatRatio = 0.30;

    if (goal === 'muscle-gain') {
      proteinRatio = 0.30;
      carbRatio = 0.40;
      fatRatio = 0.30;
    } else if (goal === 'weight-loss') {
      proteinRatio = 0.35;
      carbRatio = 0.35;
      fatRatio = 0.30;
    }

    const proteinCalories = dailyCalories * proteinRatio;
    const carbCalories = dailyCalories * carbRatio;
    const fatCalories = dailyCalories * fatRatio;

    return {
      protein: proteinCalories / 4, // 4 calories per gram
      carbs: carbCalories / 4,
      fat: fatCalories / 9, // 9 calories per gram
    };
  };

  const totals = getTotals();
  const targets = getMacroTargets();
  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const caloriesProgress = (totals.calories / dailyCalories) * 100;
  const proteinProgress = (totals.protein / targets.protein) * 100;
  const carbsProgress = (totals.carbs / targets.carbs) * 100;
  const fatProgress = (totals.fat / targets.fat) * 100;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Nutrition Overview */}
      <Card className="bg-card border-2 border-primary/20 hover-lift">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Target className="w-5 h-5" />
            Daily Nutrition Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{Math.round(totals.calories)}</div>
              <div className="text-sm text-muted-foreground">/ {dailyCalories} kcal</div>
              <Progress value={Math.min(caloriesProgress, 100)} className="h-2 mt-2 bg-secondary" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{Math.round(totals.protein)}g</div>
              <div className="text-sm text-muted-foreground">/ {Math.round(targets.protein)}g protein</div>
              <Progress value={Math.min(proteinProgress, 100)} className="h-2 mt-2 bg-secondary" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{Math.round(totals.carbs)}g</div>
              <div className="text-sm text-muted-foreground">/ {Math.round(targets.carbs)}g carbs</div>
              <Progress value={Math.min(carbsProgress, 100)} className="h-2 mt-2 bg-secondary" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{Math.round(totals.fat)}g</div>
              <div className="text-sm text-muted-foreground">/ {Math.round(targets.fat)}g fat</div>
              <Progress value={Math.min(fatProgress, 100)} className="h-2 mt-2 bg-secondary" />
            </div>
          </div>
          <div className="mt-4 text-center">
            <Badge variant={caloriesProgress > 100 ? "destructive" : caloriesProgress > 80 ? "default" : "secondary"}>
              {dailyCalories - totals.calories > 0 
                ? `${Math.round(dailyCalories - totals.calories)} calories remaining`
                : `${Math.round(totals.calories - dailyCalories)} calories over`
              }
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Add Food */}
      <Card className="bg-card border-2 border-accent/20 animate-fade-scale">
        <CardHeader>
          <CardTitle className="text-accent flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Food
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search for food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-border focus:border-primary"
            />
          </div>

          {searchTerm && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredFoods.map((food) => (
                <div
                  key={food.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all-smooth ${
                    selectedFood?.id === food.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-accent'
                  }`}
                  onClick={() => setSelectedFood(food)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{food.name}</h4>
                      <p className="text-sm text-muted-foreground">{food.serving}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">{food.calories} kcal</div>
                      <div className="text-xs text-muted-foreground">
                        P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedFood && (
            <div className="p-4 bg-secondary/50 rounded-lg border border-border">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h4 className="font-medium">{selectedFood.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedFood.serving}</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Quantity:</label>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
                    className="w-20 border-border"
                  />
                </div>
                <Button
                  onClick={addFood}
                  className="bg-accent hover:bg-accent/80 text-accent-foreground"
                >
                  Add
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Consumed Foods */}
      <Card className="bg-card border-2 border-border animate-slide-left">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-5 h-5" />
            Today's Food Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          {consumedFoods.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Utensils className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No foods logged today. Start tracking your nutrition!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {consumedFoods.map((food, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg border border-border">
                  <div>
                    <h4 className="font-medium">{food.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {food.quantity} | {Math.round(food.calories)} kcal
                    </p>
                  </div>
                  <Button
                    onClick={() => removeFood(index)}
                    variant="outline"
                    size="sm"
                    className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionTracker;

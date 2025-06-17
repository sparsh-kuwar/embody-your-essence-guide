
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, Flame } from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface MealDatabaseProps {
  dietType: string;
  dailyCalories: number;
}

const MealDatabase = ({ dietType, dailyCalories }: MealDatabaseProps) => {
  const [selectedMealType, setSelectedMealType] = useState<string>('breakfast');

  const vegetarianRecipes: Recipe[] = [
    {
      id: 'veg-1',
      name: 'Warrior Protein Smoothie Bowl',
      calories: 380,
      protein: 25,
      carbs: 45,
      fat: 12,
      cookTime: '10 min',
      servings: 1,
      difficulty: 'Easy',
      mealType: 'breakfast',
      ingredients: [
        '1 banana',
        '1 cup Greek yogurt',
        '1 tbsp almond butter',
        '1 tbsp chia seeds',
        '1/2 cup berries',
        '1 tbsp honey'
      ],
      instructions: [
        'Blend banana, yogurt, and almond butter until smooth',
        'Pour into bowl and top with chia seeds',
        'Arrange berries on top',
        'Drizzle with honey and serve immediately'
      ]
    },
    {
      id: 'veg-2',
      name: 'Champion Quinoa Power Bowl',
      calories: 520,
      protein: 22,
      carbs: 68,
      fat: 18,
      cookTime: '25 min',
      servings: 2,
      difficulty: 'Medium',
      mealType: 'lunch',
      ingredients: [
        '1 cup quinoa',
        '1 can black beans',
        '1 avocado',
        '2 cups mixed vegetables',
        '2 tbsp olive oil',
        'Lime juice and spices'
      ],
      instructions: [
        'Cook quinoa according to package instructions',
        'Sauté mixed vegetables in olive oil',
        'Drain and rinse black beans',
        'Combine quinoa, beans, and vegetables',
        'Top with sliced avocado and lime juice'
      ]
    },
    {
      id: 'veg-3',
      name: 'Explorer Veggie Stir-fry',
      calories: 340,
      protein: 18,
      carbs: 42,
      fat: 14,
      cookTime: '15 min',
      servings: 2,
      difficulty: 'Easy',
      mealType: 'dinner',
      ingredients: [
        '2 cups mixed vegetables',
        '1 cup tofu, cubed',
        '2 tbsp soy sauce',
        '1 tbsp sesame oil',
        '1 cup brown rice',
        'Ginger and garlic'
      ],
      instructions: [
        'Cook brown rice separately',
        'Heat sesame oil in pan',
        'Add tofu and cook until golden',
        'Add vegetables and stir-fry',
        'Season with soy sauce, ginger, and garlic'
      ]
    }
  ];

  const nonVegetarianRecipes: Recipe[] = [
    {
      id: 'nonveg-1',
      name: 'Gladiator Protein Scramble',
      calories: 420,
      protein: 32,
      carbs: 15,
      fat: 26,
      cookTime: '12 min',
      servings: 1,
      difficulty: 'Easy',
      mealType: 'breakfast',
      ingredients: [
        '3 eggs',
        '100g chicken breast, diced',
        '1/2 bell pepper',
        '1/4 onion',
        '1 tbsp olive oil',
        'Spinach leaves'
      ],
      instructions: [
        'Heat olive oil in pan',
        'Cook diced chicken until done',
        'Add vegetables and sauté',
        'Beat eggs and add to pan',
        'Scramble everything together until eggs are cooked'
      ]
    },
    {
      id: 'nonveg-2',
      name: 'Warrior Grilled Salmon',
      calories: 480,
      protein: 35,
      carbs: 32,
      fat: 24,
      cookTime: '20 min',
      servings: 1,
      difficulty: 'Medium',
      mealType: 'lunch',
      ingredients: [
        '150g salmon fillet',
        '1 cup sweet potato, cubed',
        '2 cups broccoli',
        '1 tbsp olive oil',
        'Lemon and herbs',
        'Salt and pepper'
      ],
      instructions: [
        'Preheat oven to 400°F',
        'Season salmon with herbs and lemon',
        'Roast sweet potato cubes for 15 min',
        'Steam broccoli until tender',
        'Grill salmon for 6-8 min per side'
      ]
    },
    {
      id: 'nonveg-3',
      name: 'Champion Lean Beef Bowl',
      calories: 560,
      protein: 42,
      carbs: 38,
      fat: 22,
      cookTime: '18 min',
      servings: 2,
      difficulty: 'Medium',
      mealType: 'dinner',
      ingredients: [
        '200g lean ground beef',
        '1 cup brown rice',
        '2 cups mixed vegetables',
        '1 tbsp coconut oil',
        'Spices and herbs',
        '1/4 avocado'
      ],
      instructions: [
        'Cook brown rice according to instructions',
        'Brown ground beef in coconut oil',
        'Add vegetables and cook until tender',
        'Season with spices and herbs',
        'Serve over rice topped with avocado'
      ]
    }
  ];

  const getRecipes = () => {
    return dietType === 'vegetarian' || dietType === 'vegan' ? vegetarianRecipes : nonVegetarianRecipes;
  };

  const filterRecipesByMealType = (mealType: string) => {
    return getRecipes().filter(recipe => recipe.mealType === mealType);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-600 border-green-400';
      case 'Medium': return 'bg-orange-600 border-orange-400';
      case 'Hard': return 'bg-red-600 border-red-400';
      default: return 'bg-gray-600 border-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Battle Nutrition Arsenal</h2>
        <p className="text-orange-100">Strategic meal plans for {dailyCalories} calories/day</p>
        <Badge className="bg-orange-600 border-orange-400 border-2 text-white capitalize mt-2">
          {dietType?.replace('-', ' ')} Warrior
        </Badge>
      </div>

      <Tabs value={selectedMealType} onValueChange={setSelectedMealType} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/20 border border-orange-500/30">
          <TabsTrigger value="breakfast" className="text-white data-[state=active]:bg-orange-600">
            Morning Fuel
          </TabsTrigger>
          <TabsTrigger value="lunch" className="text-white data-[state=active]:bg-orange-600">
            Midday Power
          </TabsTrigger>
          <TabsTrigger value="dinner" className="text-white data-[state=active]:bg-orange-600">
            Evening Recovery
          </TabsTrigger>
          <TabsTrigger value="snack" className="text-white data-[state=active]:bg-orange-600">
            Battle Snacks
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedMealType} className="space-y-4">
          {filterRecipesByMealType(selectedMealType).map((recipe) => (
            <Card key={recipe.id} className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-xl">{recipe.name}</CardTitle>
                    <CardDescription className="text-orange-100 mt-1">
                      Perfect for your {selectedMealType} conquest
                    </CardDescription>
                  </div>
                  <Badge className={`${getDifficultyColor(recipe.difficulty)} text-white border-2`}>
                    {recipe.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Nutrition Info */}
                <div className="grid grid-cols-4 gap-4 p-3 bg-black/20 rounded-lg border border-orange-500/20">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-orange-400 mb-1">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div className="text-white font-semibold">{recipe.calories}</div>
                    <div className="text-xs text-orange-100">kcal</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-400 font-semibold">{recipe.protein}g</div>
                    <div className="text-xs text-orange-100">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-400 font-semibold">{recipe.carbs}g</div>
                    <div className="text-xs text-orange-100">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-400 font-semibold">{recipe.fat}g</div>
                    <div className="text-xs text-orange-100">Fat</div>
                  </div>
                </div>

                {/* Cook Info */}
                <div className="flex items-center justify-between text-sm text-orange-100">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.cookTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <h4 className="font-semibold text-white mb-2">Battle Ingredients:</h4>
                  <ul className="space-y-1">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-sm text-orange-100">• {ingredient}</li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="font-semibold text-white mb-2">Combat Instructions:</h4>
                  <ol className="space-y-1">
                    {recipe.instructions.map((step, index) => (
                      <li key={index} className="text-sm text-orange-100">
                        {index + 1}. {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 border-2 border-orange-400">
                  Add to Battle Plan
                </Button>
              </CardContent>
            </Card>
          ))}
          
          {filterRecipesByMealType(selectedMealType).length === 0 && (
            <Card className="bg-black/20 backdrop-blur-sm border-orange-500/30 border-2">
              <CardContent className="text-center py-8">
                <p className="text-orange-100">No recipes available for this meal type yet.</p>
                <p className="text-sm text-orange-100 mt-2">More battle-tested recipes coming soon!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MealDatabase;

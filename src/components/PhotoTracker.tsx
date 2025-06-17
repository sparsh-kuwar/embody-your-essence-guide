
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Calendar, Trash2, Eye } from 'lucide-react';

interface ProgressPhoto {
  id: string;
  url: string;
  date: Date;
  weight?: number;
  notes?: string;
  day: number;
}

const PhotoTracker = () => {
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<ProgressPhoto | null>(null);
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const storedPhotos = localStorage.getItem('metafit-progress-photos');
    if (storedPhotos) {
      const parsedPhotos = JSON.parse(storedPhotos);
      setPhotos(parsedPhotos.map((photo: any) => ({
        ...photo,
        date: new Date(photo.date)
      })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('metafit-progress-photos', JSON.stringify(photos));
  }, [photos]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        const newPhoto: ProgressPhoto = {
          id: Date.now().toString(),
          url,
          date: new Date(),
          weight: weight ? parseFloat(weight) : undefined,
          notes: notes || undefined,
          day: photos.length + 1
        };
        setPhotos(prev => [...prev, newPhoto]);
        setWeight('');
        setNotes('');
      };
      reader.readAsDataURL(file);
    }
  };

  const deletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
    if (selectedPhoto?.id === id) {
      setSelectedPhoto(null);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysBetween = (date1: Date, date2: Date) => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const sortedPhotos = [...photos].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Upload Section */}
      <Card className="bg-card border-2 border-primary/20 hover-lift">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Capture Your Transformation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Weight (optional)</label>
              <Input
                type="number"
                placeholder="Enter weight in kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="border-border focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Notes (optional)</label>
              <Input
                placeholder="How are you feeling today?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border-border focus:border-accent"
              />
            </div>
          </div>
          
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-primary/50 rounded-lg hover:border-primary transition-all-smooth cursor-pointer bg-primary/5 hover:bg-primary/10"
            >
              <Upload className="w-6 h-6 text-primary" />
              <span className="text-primary font-medium">Upload Progress Photo</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Photos Grid */}
      <Card className="bg-card border-2 border-border animate-fade-scale">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Progress Gallery ({photos.length} photos)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {photos.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No progress photos yet</h3>
              <p>Start documenting your transformation journey by uploading your first photo!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedPhotos.map((photo) => (
                <div key={photo.id} className="group relative animate-slide-right">
                  <div className="aspect-square overflow-hidden rounded-lg border-2 border-border hover:border-primary transition-all-smooth">
                    <img
                      src={photo.url}
                      alt={`Progress photo from ${formatDate(photo.date)}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setSelectedPhoto(photo)}
                        className="bg-primary hover:bg-primary/80"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deletePhoto(photo.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="border-primary text-primary">
                        Day {photo.day}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(photo.date)}
                      </span>
                    </div>
                    
                    {photo.weight && (
                      <div className="text-sm font-medium text-accent">
                        Weight: {photo.weight} kg
                      </div>
                    )}
                    
                    {photo.notes && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {photo.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-scale">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Day {selectedPhoto.day} Progress</h3>
                  <p className="text-muted-foreground">{formatDate(selectedPhoto.date)}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedPhoto(null)}
                  className="border-border"
                >
                  Close
                </Button>
              </div>
              
              <div className="aspect-square overflow-hidden rounded-lg border-2 border-border mb-4">
                <img
                  src={selectedPhoto.url}
                  alt={`Progress photo from ${formatDate(selectedPhoto.date)}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-3">
                {selectedPhoto.weight && (
                  <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                    <span className="font-medium">Weight</span>
                    <span className="text-accent font-bold">{selectedPhoto.weight} kg</span>
                  </div>
                )}
                
                {selectedPhoto.notes && (
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <span className="font-medium block mb-1">Notes</span>
                    <p className="text-muted-foreground">{selectedPhoto.notes}</p>
                  </div>
                )}
                
                {photos.length > 1 && (
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <span className="font-medium block mb-1">Progress Timeline</span>
                    <p className="text-muted-foreground">
                      {photos.findIndex(p => p.id === selectedPhoto.id) === 0 
                        ? "Your most recent photo"
                        : `${getDaysBetween(selectedPhoto.date, photos[0].date)} days ago`
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoTracker;

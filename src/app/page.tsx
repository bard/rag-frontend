"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { apiClient } from "@/lib/api";

const Home: React.FC = () => {
  const [newTopic, setNewTopic] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: topics = [], refetch } = useQuery({
    queryKey: ["topics"],
    queryFn: () => apiClient.listTopics(),
  });

  const handleCreateTopic = async (): Promise<void> => {
    if (newTopic.trim() === "") return;

    try {
      await apiClient.createTopic({ topicCreate: { name: newTopic } });

      setNewTopic("");
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to create destination",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTopic = async (id: string): Promise<void> => {
    try {
      await apiClient.deleteTopic({ topicId: id });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete destination",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Travel Planner</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Destination
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Destination</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Enter destination name"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreateTopic();
                  }
                }}
              />
              <Button onClick={handleCreateTopic}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <Card key={topic.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                {topic.name}
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteTopic(topic.id)}
                >
                  Delete
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Link href={`/topic?id=${topic.id}`}>
                <Button variant="secondary" className="w-full">
                  View
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {topics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No destinations yet. Add one to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;

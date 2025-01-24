"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";
import Link from "next/link";

const TopicPage: React.FC = () => {
  const searchParams = useSearchParams();
  const topicId = searchParams.get("id");

  if (topicId === null || topicId === "") {
    return (
      <div className="container mx-auto px-4 py-8">
        No destination ID provided
      </div>
    );
  }

  return <TopicPageContent id={topicId} />;
};

export default TopicPage;

const TopicPageContent: React.FC<{ id: string }> = ({ id: topicId }) => {
  const { data: topic } = useQuery({
    queryKey: ["topic", topicId],
    queryFn: () => apiClient.getTopic({ topicId }),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Destinations
          </Button>
        </Link>
        {topic && <h1 className="text-2xl font-bold">{topic.name}</h1>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <QuestionSection topicId={topicId} />
        </div>
        <div className="space-y-6">
          <NotesSection topicId={topicId} />
        </div>
      </div>
    </div>
  );
};

const QuestionSection: React.FC<{ topicId: string }> = ({ topicId }) => {
  const { toast } = useToast();
  const [question, setQuestion] = useState("");

  const askQuestionMutation = useMutation({
    mutationFn: (q: string) => apiClient.query({ q, topicId: topicId }),
    onSuccess: () => {
      setQuestion("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to get answer",
        variant: "destructive",
      });
    },
  });

  const handleAskQuestion = (): void => {
    if (question.trim() === "") return;
    askQuestionMutation.mutate(question);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask a Question</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask anything about this destination..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAskQuestion();
                }
              }}
            />
            <Button onClick={handleAskQuestion}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {askQuestionMutation.isPending && (
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground animate-pulse">
                  Loading answer...
                </p>
              </CardContent>
            </Card>
          )}

          {askQuestionMutation.data?.answer && (
            <Card>
              <CardContent className="pt-4">
                <p>{askQuestionMutation.data.answer}</p>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-xs text-muted-foreground font-medium">
                      Sources:
                    </span>

                    {askQuestionMutation.data.sources.length > 0 ? (
                      askQuestionMutation.data.sources.map((source, index) => (
                        <span
                          key={index}
                          className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded"
                        >
                          {source}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        language model
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const NotesSection: React.FC<{ topicId: string }> = ({ topicId }) => {
  const { toast } = useToast();
  const [newNote, setNewNote] = useState<string>("");

  const { data: notes = [], refetch: refetchNotes } = useQuery({
    queryKey: ["notes", topicId],
    queryFn: () => apiClient.listNotes({ topicId: topicId }),
  });

  const createNoteMutation = useMutation({
    mutationFn: (content: string) =>
      apiClient.createNote({
        noteCreate: {
          topicId: topicId,
          content,
          contentType: "text/plain",
        },
      }),

    onSuccess: () => {
      toast({
        title: "Success",
        description: "Note added successfully",
      });
      setNewNote("");
      refetchNotes();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to add note",
        variant: "destructive",
      });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: string) => apiClient.deleteNote({ noteId }),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Note deleted successfully",
        duration: 1500,
      });
      refetchNotes();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete note",
        variant: "destructive",
      });
    },
  });

  const handleAddNote = (): void => {
    if (!newNote.trim()) return;
    createNoteMutation.mutate(newNote);
  };

  const handleDeleteNote = (noteId: string): void => {
    deleteNoteMutation.mutate(noteId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Textarea
              placeholder="Add a note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <Button onClick={handleAddNote}>Add</Button>
          </div>
          <div className="space-y-4">
            {notes.map((note) => (
              <Card key={note.id}>
                <CardContent className="pt-4">
                  <div className="flex justify-end items-start mb-2">
                    <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {note.id}
                    </span>
                  </div>
                  <p className="text-sm line-clamp-4">{note.content}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">
                      {new Date(note.created_at).toLocaleDateString()}
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {notes.length === 0 && (
              <p className="text-gray-500 text-center py-4">No notes yet</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

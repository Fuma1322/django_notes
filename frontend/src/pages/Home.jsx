import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "../components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((err) => {
        alert(err);
      });
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
      })
      .catch((err) => alert(err));
    getNotes();
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to create note.");
      })
      .catch((err) => alert(err));
    getNotes();
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
  <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 py-12 lg:px-8 gap-20">
  {/* Notes List - Left */}
  <div className="w-full lg:w-1/2 space-y-4">
    <h2 className="text-3xl font-semibold text-gray-950 mb-4 text-center lg:text-left">
      Notes
    </h2>
    {notes.length > 0 ? (
      notes.map((note) => (
        <Note note={note} onDelete={deleteNote} key={note.id} />
      ))
    ) : (
      <p className="text-center lg:text-left text-neutral-500">No notes to display</p>
    )}
  </div>

  {/* Create Note Form - Right */}
  <Card className="w-full lg:w-1/3">
    <CardHeader>
      <CardTitle>Create a Note</CardTitle>
      <CardDescription>
        Fill in the details below to create a new note.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={createNote} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            name="content"
            required
            rows={4}
            placeholder="Type your content here."
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full">
          Create
        </Button>
      </form>
    </CardContent>
    <CardFooter>
      <p className="text-sm text-gray-500">
        You can create, view, and delete notes here.
      </p>
    </CardFooter>
  </Card>
</div>

);
}
import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";

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
    <div className="flex flex-col gap-10 px-6 py-12 lg:px-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Notes</h2>
        <div className="space-y-4">
          {notes.map((note) => (
            <Note note={note} onDelete={deleteNote} key={note.id} />
          ))}
        </div>
      </div>

      {/* Create Note Form */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-6">
          Create a Note
        </h2>
        <form onSubmit={createNote} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-1.5 
                           text-base text-gray-900 placeholder:text-gray-900 
                           focus:border-indigo-500 focus:ring-red-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <div className="mt-2">
              <textarea
                id="content"
                name="content"
                required
                rows={4}
                onChange={(e) => setContent(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-1.5 
                           text-base text-gray-900 placeholder:text-gray-400 
                           focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 
                         text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
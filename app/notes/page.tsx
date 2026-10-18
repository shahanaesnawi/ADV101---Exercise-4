"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Window from "../components/Window";
import NoteItem, { Note } from "../components/NoteItem";

export default function NotesPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);            
  const [notes, setNotes] = useState<Note[]>([]);       
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null); 
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [loaded, setLoaded] = useState(false);          

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn") !== "true") {
      router.replace("/");
      return;
    }
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
    setLoaded(true);
    setReady(true);
  }, [router]);

  useEffect(() => {
    if (loaded) localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes, loaded]);

  useEffect(() => {
    const name = title.trim().toLowerCase();
    const exists = notes.some((n) => n.title.trim().toLowerCase() === name && n.id !== editingId);
    setIsDuplicate(name !== "" && exists);
  }, [title, notes, editingId]);

  function resetForm() {
    setTitle("");
    setDescription("");
    setEditingId(null);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || isDuplicate) return;
    if (editingId !== null) {
      setNotes(notes.map((n) => (n.id === editingId ? { ...n, title, description } : n)));
    } else {
      setNotes([...notes, { id: Date.now(), title, description }]);
    }
    resetForm();
  }

  function handleEdit(note: Note) {
    setEditingId(note.id);
    setTitle(note.title);
    setDescription(note.description);
  }

  function handleDelete(id: number) {
    setNotes(notes.filter((n) => n.id !== id));
    if (editingId === id) resetForm();
  }

  function handleLogout() {
    sessionStorage.removeItem("loggedIn");
    router.push("/");
  }

  if (!ready) return null; 

  return (
    <Window title={`${notes.length} ${notes.length === 1 ? "note" : "notes"} saved`} pills={["write", "view", "edit"]} onClose={handleLogout}>
      <h1 className="big">my<span>notes</span></h1>

      <form onSubmit={handleSubmit} className="form">
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        {isDuplicate && <p className="error">A note with this title already exists.</p>}
        <div className="row">
          <button className="btn float" type="submit" disabled={!title.trim() || isDuplicate}>
            {editingId !== null ? "Save changes" : "Add note"}
          </button>
          {editingId !== null && (
            <button className="btn ghost float" type="button" onClick={resetForm}>Cancel</button>
          )}
        </div>
      </form>

      {notes.length === 0 ? (
        <p className="tagline">No notes yet. Write your first one!</p>
      ) : (
        <ul className="notes">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </ul>
      )}

      <button className="btn ghost float logout" onClick={handleLogout}>Log out</button>
    </Window>
  );
}
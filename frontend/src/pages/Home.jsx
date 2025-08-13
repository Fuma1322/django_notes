import {useEffect, useState} from 'react'
import api from '../api'


function Home() {
   const [notes, setNotes] = useState([]);
   const [content, setContent] = useState('');
   const [title, setTitle] = useState('');

    useEffect(() => {
      getNotes();
    }, []);

   const getNotes = () => {
    api
    .get("/api/notes/")
    .then((res) => res.data)
    .then((data) => {setNotes(data); console.log(data)})
    .catch((err) => alert(err));
   };

   const deleteNote = (id) => {
    api
    .delete(`/api/notes/delete/${id}/`)
    .then((res) => {
      if (res.status) alert("Note deleted successfully");
      else alert("Failed to delete note");
    })
    .catch((error) => alert(error))
    getNotes();
   };

   const createNote = (e) => {
    e.preventDefault();
    api
    .post("/api/notes/", {title, content})
    .then((res) => {
      if (res.status === 201) alert("Note created successfully");
      else alert("Failed to create note");
    })
    .catch((err) => alert(err));
    getNotes();
    };

  return (
    <div>Home</div>
  )
}

export default Home
import { useState, useEffect } from 'react';
import './App.css'
import { encryptNote, decryptNote } from "./utils/crypto";
import { getAllNotes, saveNote, deleteNote } from "./utils/db";

function App() {
  
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState('');

  const [content, setContent] = useState('');

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [showArchived, setShowArchived] = useState(false);

async function handleSave() {
    if (title.trim() === "" && content.trim() === "") {
        return;
    }

    if (editingId === null) {
      const note = {
        id: Date.now(),
        title: encryptNote(title),
        content: encryptNote(content),
        pinned: false,
        archived: false,
        createdAt: new Date().toLocaleString(),
};      
        await saveNote(note);
        setNotes([...notes, note]);
    } else {
        const updatedNotes = notes.map((note) => {
            if (note.id === editingId) {
              return {
                  ...note,
                  title: encryptNote(title),
                  content: encryptNote(content)
              };
            }

            return note;
        });
        
        setNotes(updatedNotes);

        const updatedNote = updatedNotes.find(
        (note) => note.id === editingId
        );

      await saveNote(updatedNote);
        setEditingId(null);
        setTitle("");
        setContent("");
    }

    setTitle("");
    setContent("");
}

 async function handlePin(id) {
    const updatedNotes = notes.map((note) => {
        if (note.id === id) {
            return {
                ...note,
                pinned: !note.pinned
            };
        }

        return note;
    });

    setNotes(updatedNotes);

const updatedNote = updatedNotes.find(
    (note) => note.id === id
);

await saveNote(updatedNote); 
}

async function handleArchive(id) {
    const updatedNotes = notes.map((note) => {
        if (note.id === id) {
            return {
                ...note,
                archived: !note.archived
            };
        }

        return note;
    });

    setNotes(updatedNotes);

const updatedNote = updatedNotes.find(
    (note) => note.id === id
);

await saveNote(updatedNote);
}


  async function handleDelete(id){
    const newNotes = notes.filter((note) => {
    return note.id !== id;
    });
    setNotes(newNotes);
    await deleteNote(id);
      }
  
function handleEdit(note) {
    setTitle(decryptNote(note.title));
    setContent(decryptNote(note.content));
    setEditingId(note.id);
}

useEffect(() => {
    async function loadNotes() {
        const storedNotes = await getAllNotes();
        setNotes(storedNotes);
    }

    loadNotes();
}, []);

  return (
    <div className="app">

    <h1>Privacy Notes</h1>
    <div className="form-container">
    <input
    type="text"
    placeholder="Enter title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    />
    <textarea
     placeholder="Enter your note"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
    
    <button onClick={handleSave}>
    {editingId === null ? "Save" : "Update"}
    </button>


    </div>

    <div className="toolbar">
    <input
    type="text"
    placeholder="Search notes..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    />

    <button onClick={() => setShowArchived(false)}>
    My Notes
</button>

<button onClick={() => setShowArchived(true)}>
    Archived
</button>



    </div>

    <div className="notes-grid">

    {
      notes
    .filter((note) => {
    return showArchived ? note.archived : !note.archived;
})

.filter((note) => {
    return (
        decryptNote(note.title).toLowerCase().includes(search.toLowerCase()) ||
        decryptNote(note.content).toLowerCase().includes(search.toLowerCase())
    );
})
    .sort((a, b) => Number(b.pinned) - Number(a.pinned))
      .map((note) => {
        return (


        <div className="note-card" key={note.id}>
      <h3>{decryptNote(note.title)}</h3>
<p>{decryptNote(note.content)}</p>
<small>{note.createdAt}</small>
     <div className="card-footer">
    <div className="buttons">
        <button onClick={() => handleEdit(note)}>
            Edit
        </button>

        <button onClick={() => handleDelete(note.id)}>
            Delete
        </button>

        <button onClick={() => handlePin(note.id)}>
          {note.pinned ? "Unpin" : "Pin"}
        </button>

        <button onClick={() => handleArchive(note.id)}>
    {note.archived ? "Unarchive" : "Archive"}
</button>
</div>
    </div>
</div>
        );
      })
}



    </div>





    </div>
  );
}

export default App;
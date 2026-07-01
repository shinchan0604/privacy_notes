import { useState, useEffect } from 'react';
import './App.css'
import { encryptNote, decryptNote } from "./utils/crypto";

function App() {
  
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
});

  const [title, setTitle] = useState('');

  const [content, setContent] = useState('');

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]);


function handleSave() {
    if (title.trim() === "" && content.trim() === "") {
        return;
    }

    if (editingId === null) {
      const note = {
        id: Date.now(),
        title: encryptNote(title),
        content: encryptNote(content),
        pinned: false,
        archived: false
};      

        setNotes([...notes, note]);
    } else {
        const updatedNotes = notes.map((note) => {
            if (note.id === editingId) {
                return {
                    ...note,
                    title,
                    content
                };
            }

            return note;
        });

        setNotes(updatedNotes);
        setEditingId(null);
    }

    setTitle("");
    setContent("");
}

  function handlePin(id) {
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
}

function handleArchive(id) {
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
}


  function handleDelete(id){
    const newNotes = notes.filter((note) => {
    return note.id !== id;
    });
    setNotes(newNotes);
      }
  
function handleEdit(note) {
    setTitle(decryptNote(note.title));
    setContent(decryptNote(note.content));
    setEditingId(note.id);
}

  return (
    <>
    <h1>Privacy Notes</h1>

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
        );
      })
}

    </>
  );
}

export default App;
import { openDB } from "idb";

export const dbPromise = openDB("privacy-notes-db", 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains("notes")) {
            db.createObjectStore("notes", {
                keyPath: "id",
            });
        }
    },
});

export async function getAllNotes() {
    const db = await dbPromise;
    return db.getAll("notes");
}

export async function saveNote(note) {
    const db = await dbPromise;
    return db.put("notes", note);
}

export async function deleteNote(id) {
    const db = await dbPromise;
    return db.delete("notes", id);
}
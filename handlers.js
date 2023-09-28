const path = require("path");
const fs = require("fs/promises");

const notesPath = path.join(__dirname, "./db.json");

const addNote = async (title) => {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));

  console.log("Note was added");
};

const getNotes = async () => {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });

  return JSON.parse(notes) || [];
};

const removeNote = async (id) => {
  const notes = await getNotes();

  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex !== -1) {
    console.log(`Note by id "${id}" was removed`);

    notes.splice(noteIndex, 1);

    await fs.writeFile(notesPath, JSON.stringify(notes));
  } else {
    console.log(`Note not found`);
  }
};

const printNotes = async () => {
  const notes = await getNotes();

  notes.forEach(({ id, title }) => {
    console.log(`Here is the list of notes:\n${id} ${title}`);
  });
};

module.exports = {
  addNote,
  removeNote,
  printNotes,
};

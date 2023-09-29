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

  const filteredNotes = notes.filter((note) => note.id !== id);

  if (filteredNotes.length === notes.length) {
    console.log(`Note not found`);
    return;
  }

  await fs.writeFile(notesPath, JSON.stringify(filteredNotes));

  console.log(`Note was removed`);
};

const printNotes = async () => {
  const notes = await getNotes();

  console.log("Here is the list of notes:");

  notes.forEach(({ id, title }) => {
    console.log(`${id} ${title}`);
  });
};

module.exports = {
  addNote,
  removeNote,
  printNotes,
};

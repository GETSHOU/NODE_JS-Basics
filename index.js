const yargs = require("yargs");
const { addNote, removeNote, printNotes } = require("./handlers");

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note",
  builder: {
    id: {
      type: "string",
      describe: "Remove note by id",
      demandOption: true,
    },
  },
  async handler({ id }) {
    await removeNote(id);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    await printNotes();
  },
});

yargs.parse();

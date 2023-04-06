const express = require("express");
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Route 1. to fetch all notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    return res.json(notes);
  } catch (error) {
    res.status(500).send("Internal server error while fetching notes..");
  }
});

// Route 2. Add notes using POST //login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title.").isLength({ min: 3 }),
    body("description", "Description must be of 5 characters.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // destructuring
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      res.status(500).send("Internal server error while adding note..");
    }
  }
);

// Route 3. Update an exisiting note using put //login required  put request

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }

    if (description) {
      newNote.description = description;
    }

    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Authorized");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    res.status(500).send("Internal server error while updating note..");
  }
});

// Route 4. Delete Note of the specified user exisiting note //login required
// delete request

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Authorized");
    }

    // to delete
    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ Succes: "Note has been deleted.", note: note });
  } catch (error) {
    res.status(500).send("Internal server error while deleting note..");
  }
});

module.exports = router;

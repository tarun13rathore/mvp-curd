const express = require("express");
require("../db/conn");
const router = express.Router();
const Note = require("../model/courseSchema");

//Async---await insert data---------------ok
router.post("/course", async (req, res) => {
  const { course, notes } = req.body;

  if (!course) {
    return res.status(422).json({ error: "plaese fill all property" });
  }

  try {
    const courseExist = await Note.findOne({ course: course });
    if (courseExist) {
      return res.status(422).json({ error: "Course Allready Exist.." });
    } else {
      const note = new Note({ course, notes });
      await note.save();
      res.status(201).json({ message: "New Course Resgister Sucessfully.." });
    }
  } catch (err) {
    console.log(err);
  }
});

//read data by id using async and await..---------------ok
router.get("/course/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await Note.findById(_id, req.body);
    console.log(data);
    res.status(201).send(data);
  } catch (e) {
    res.status(400).send(e);
  }
});

//read All course data using async and await..---------------ok
router.get("/course", async (req, res) => {
  try {
    const allData = await Note.find();
    res.status(201).send(allData);
  } catch (e) {
    res.status(400).send(e);
  }
});

//update course data by id using async and await..------------------ok
router.put("/course/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateData = await Note.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(201).send(updateData);
  } catch (e) {
    res.status(400).send(e);
  }
});

//add note data by course id using async and await..----------ok
router.put("/course/add/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = await Note.update(
      { _id: id },
      {
        $push: {
          notes: {
            note: req.body.note,
          },
        },
      }
    );
    res.status(201).send(updateData);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//Delete course by id using async and await..-----------ok
router.delete("/course/:id", async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(404).send();
    } else {
      res.status(410).send(deleteNote);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//note update by id----------------------ok
router.put("/course/note/:id", async (req, res) => {
  console.log(req);
  try {
    const id = req.params.id;
    const updateData = await Note.update(
      { "notes._id": id },
      {
        $set: {
          "notes.$.note": req.body.note,
        },
      }
    );
    res.status(201).send(updateData);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//Delete note by id using async and await..
// router.delete("/course/note/:id", async (req, res) => {
//   console.log(req);
//   try {
//     const id = req.params.id;
//     const delNote = await Note.updateOne(
//       { "notes._id": id },
//       {
//         $unset: {
//           "notes.$": req.params.id,
//         },
//       }
//     );
//     res.status(201).send(delNote);
//   } catch (e) {
//     console.log(e);
//     res.status(400).send(e);
//   }
// });
router.delete("/course/note/:id", async (req, res) => {
  console.log(req);
  try {
    const id = req.params.id;
    const delNote = await Note.updateOne(
      { "notes._id": id },
      {
        $unset: {
          "notes.$": req.params.id,
        },
      }
    );
    res.status(201).send(delNote);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;

const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// api/comments/

// GET all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single comment
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);

    if (!commentData) {
      res.status(404).json({ message: "No comment found with that id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a comment
router.post("/:id", withAuth, async (req, res) => {
  // Expected Input:
  /* 
  {
		"content": "Same, bud."
	}
  */

  const now = Date(Date.now()).split(" ");
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.params.id,
      dateCreated: `${now[1]} ${now[2]}, ${now[3]}`,
    });

    console.log(newComment);

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

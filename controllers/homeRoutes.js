const router = require("express").Router();
const { Post } = require("../models");

router.get("/", async (req, res) => {
  try {
    // Get all users, sorted by name
    const postData = await Post.findAll({
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });

    // Serialize user data so templates can read it
    const posts = postData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data into Handlebars.js template
    res.render("homepage", { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

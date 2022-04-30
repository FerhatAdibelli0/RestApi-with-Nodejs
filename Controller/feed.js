const { validationResult } = require("express-validator");

exports.getFeed = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "Ferhats Design",
        content: "This is good practise ",
        imageUrl: "images/indir.jpg",
        creator: { name: "Ferhat" },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: "Validation failed,check your inputs",
      errors: errors.array(),
    });
  }
  // post data in Databasee
  res.status(201).json({
    message: "Post is successfully",
    post: {
      _id: new Date().toDateString(),
      title: title,
      content: content,
      creator: "Ferhat",
      createdAt: new Date(),
    },
  });
};

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
  // post data in Databasee
  res.status(201).json({
    message: "Post is successfully",
    id: new Date().toDateString(),
    title: title,
    content: content,
  });
};

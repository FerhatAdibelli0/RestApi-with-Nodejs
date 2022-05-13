const { expect } = require("chai");
const feedController = require("../Controller/feed");
const User = require("../Model/user");
const mongoose = require("mongoose");

describe("feedController-createPost", function () {
  before(function (done) {
    mongoose
      .connect(
        "mongodb+srv://maxpayne35:qGBr7naSXYmEYnw@cluster0.sp51h.mongodb.net/test-messages?retryWrites=true&w=majority"
      )
      .then((result) => {
        const user = new User({
          email: "ferhat@gmail.com",
          password: "abcd",
          name: "ferhat",
          _id: "627ea8bf4503101258ea5d50",
          posts: [],
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  // It works before or after every each test
  //   beforeEach(function () {});
  //   afterEach(function () {});

  it("should return newUser if post created is successfully posted", (done) => {
    const req = {
      body: {
        title: "Testing",
        content: "You re really good",
      },
      file: {
        path: "abcd",
      },
      userId: "627ea8bf4503101258ea5d50",
    };

    const res = {
      status: function () {
        return this;
      },
      json: function () {},
    };

    feedController
      .createPost(req, res, () => {})
      .then((newUser) => {
        expect(newUser).to.have.property("posts");
        expect(newUser.posts).to.have.length(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  after(function (done) {
    User.deleteMany({}) // All users re deleted
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});

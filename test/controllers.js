const { expect } = require("chai");
const authController = require("../Controller/auth");
const User = require("../Model/user");
const sinon = require("sinon");
const mongoose = require("mongoose");

describe("authController-login", function () {
  it("should throw error with code 500 if accessing database fails", (done) => {
    const req = {
      body: {
        email: "test@hotmail.com",
        password: "test",
      },
    };
    sinon.stub(User, "findOne");
    User.findOne.throws(); // throw an error
    authController
      .login(req, {}, () => {})
      .then((result) => {
        expect(result).to.be.an("error");
        expect(result).to.have.property("statusCode", 500);
        done();
      })
      .catch((err) => {
        done(err);
      });
    User.findOne.restore();
  });

  it("should send response with user status for existing user", function () {
    mongoose
      .connect(
        "mongodb+srv://maxpayne35:qGBr7naSXYmEYnw@cluster0.sp51h.mongodb.net/test-messages?retryWrites=true&w=majority"
      )
      .then((result) => {
        const user = new User({
          email: "ferhat@gmail.com",
          password: "abcd",
          name: "ferhat",
          posts: [],
        });
      })
      .catch((err) => console.log(err));
  });
});

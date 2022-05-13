const { expect } = require("chai");
const authController = require("../Controller/auth");
const User = require("../Model/user");
const sinon = require("sinon");
const mongoose = require("mongoose");

describe("authController", function () {
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

  it("should send response with user status for existing user", function (done) {
    const req = { userId: "627ea8bf4503101258ea5d50" };
    const res = {
      userStatus: null,
      statusCode: 500,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      },
    };

    authController
      .getStatus(req, res, () => {})
      .then((data) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.userStatus).to.be.equal("I am a user");
        done();
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

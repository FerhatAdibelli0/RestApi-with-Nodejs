const authMiddleware = require("../middleware/is-auth");
const expect = require("chai").expect;
const jwt = require("jsonwebtoken");

describe("authMiddleware", function () {
  it("should throw an error if no authorization header is present", function () {
    const req = {
      get: function (header) {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated"
    );
  });

    
  it("should throw an error if token cant be splitted", function () {
    const req = {
      get: function (header) {
        return "ferhat";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should yield userId after decoding", function () {
    const req = {
      get: function (header) {
        return "token fefwefewrfwerferf";
      },
    };

    jwt.verify = function () {
      return {
        userId: "abc",
      };
    };
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
  });

});

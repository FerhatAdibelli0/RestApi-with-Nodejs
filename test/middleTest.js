const authMiddleware = require("../middleware/is-auth");
const expect = require("chai").expect;
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

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

  it("should yield userId after decoding", function () {
    const req = {
      get: function (header) {
        return "token ferhat";
      },
    };
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "abc" });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });

  it("should throw an error if token cant be splitted", function () {
    const req = {
      get: function (header) {
        return "ferhat";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});

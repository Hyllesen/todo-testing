const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const Mongoose = require("mongoose").Mongoose;
const Mockgoose = require("mockgoose-fix").Mockgoose;
const mongoose = new Mongoose();
const mockgoose = new Mockgoose(mongoose);

mongoose.Promise = global.Promise;
mockgoose.helper.setDbVersion("3.4.3");

const mockMongoDBURL = "mongodb://localhost:32768/mockCustomerDB";

before(done => {
  mockgoose.prepareStorage().then(() => {
    mongoose.connect(mockMongoDBURL, { useNewUrlParser: true }, err => {
      done(err);
    });
  });
});

const newTodo = require("../mock-data/new-todo.json");
const app = require("../../app");

describe("TodoRoutes", () => {
  it("should create a a new todo", done => {
    request(app)
      .post("/todos")
      .send(newTodo)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        done();
      });
  });
});

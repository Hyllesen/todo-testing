"use strict";
const chai = require("chai");
const sinon = require("sinon");
const bluebird = require("bluebird");
const httpMocks = require("node-mocks-http");
const mongoose = require("mongoose");
const TodoModel = require("../../modules/todo/todo.model");
const TodoController = require("../../modules/todo/todo.controller");
const newTodo = require("../mock-data/new-todo.json");
const createdTodo = require("../mock-data/created-todo.json");
const expect = chai.expect;
const Promise = bluebird.Promise;

let TodoModelMock, req, res, next;

describe("createTodo", () => {
  beforeEach(() => {
    TodoModelMock = sinon.mock(TodoModel);
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    req.body = newTodo;
  });

  afterEach(() => {
    TodoModelMock.restore();
    mongoose.models = {};
    mongoose.modelSchemas = {};
    return mongoose.connection.close();
  });

  it("has a createTodo function", () => {
    expect(TodoController.createTodo).to.be.a("function");
  });
  it("calls TodoModel with passed parameters", () => {
    TodoModelMock.expects("create")
      .withArgs(newTodo)
      .once();
    TodoController.createTodo(req, res, next);
    TodoModelMock.verify();
  });
  it("returns TodoModel that was created", async () => {
    const createdTodoPromiseResolved = Promise.resolve(createdTodo);
    TodoModelMock.expects("create")
      .withArgs(newTodo)
      .returns(createdTodoPromiseResolved)
      .once();
    const response = TodoController.createTodo(req, res, next);
    return response.then(() => {
      console.log(response);
      console.log(res.json());
      expect(response).to.be.a("object");
      expect(response).to.deep.equal(createdTodo);
    });
  });
});

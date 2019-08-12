"use strict";
const chai = require("chai");
const sinon = require("sinon");
const httpMocks = require("node-mocks-http");
const mongoose = require("mongoose");
const TodoModel = require("../../modules/todo/todo.model");
const TodoController = require("../../modules/todo/todo.controller");
const newTodo = require("../mock-data/new-todo.json");
const expect = chai.expect;

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
});

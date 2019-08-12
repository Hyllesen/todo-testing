"use strict";
const chai = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");
const TodoModel = require("../../modules/todo/todo.model");
const TodoController = require("../../modules/todo/todo.controller");
const expect = chai.expect;

let TodoModelMock;

describe("createTodo", () => {
  beforeEach(() => {
    TodoModelMock = sinon.mock(TodoModel);
  });

  afterEach(() => {
    TodoModelMock.restore();
    mongoose.models = {};
    mongoose.modelSchemas = {};
  });
  it("has a createTodo function", () => {
    expect(TodoController.createTodo).to.be.a("function");
  });
  it("calls TodoModel with passed parameters", () => {
    TodoController.createTodo();
    TodoModelMock.expects("create").once();
    TodoModelMock.verify();
  });
});

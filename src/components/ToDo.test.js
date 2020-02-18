import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ToDo from "./ToDo";

describe("<ToDo/>", () => {
  it("Renders without crashing", () => {
    const { getByText } = render(<ToDo />);
    expect(getByText("React To Do")).toBeInTheDocument();
  });

  describe("The default UI", () => {
    it("Renders two default todo items", () => {
      const { getByText } = render(<ToDo />);
      expect(getByText("clean the house")).toBeInTheDocument();
      expect(getByText("buy milk")).toBeInTheDocument();
    });

    it("Has an input field", () => {
      const { getByTestId } = render(<ToDo />);
      expect(getByTestId("todo-input")).toBeInTheDocument();
    });

    it("Has an add button", () => {
      const { getByTestId } = render(<ToDo />);
      expect(getByTestId("add").textContent).toBe("+");
    });
  });

  describe("Adding items", () => {
    it("When the add button is pressed, if the input field is empty, prevent item from being added", () => {
      const { getByTestId } = render(<ToDo />);
      window.alert = jest.fn();
      fireEvent.click(getByTestId("add"));
      expect(window.alert).toHaveBeenCalled();
    });

    it("When the add button is pressed, if the input field has text, it creates a new todo item", () => {
      const { getByTestId, getByText } = render(<ToDo />);
      const event = { target: { value: "Create more tests" } };
      fireEvent.change(getByTestId("todo-input"), event);
      expect(getByTestId("todo-input").value).toBe("Create more tests");
      fireEvent.click(getByTestId("add"));
      expect(getByText("Create more tests")).toBeInTheDocument();
    });
  });

  describe("Deleting items", () => {
    it("When the delete button is pressed for the first todo item, it removes the entire item", () => {
      const { queryAllByTestId } = render(<ToDo />);
      const deleteButtons = queryAllByTestId("delete");
      expect(queryAllByTestId("todo-item").length).toBe(2);
      fireEvent.click(deleteButtons[0]);
      expect(queryAllByTestId("todo-item").length).toBe(1);
    });
    it("means that because the first toDoItem was deleted, the first toDoItem should now be buy milk", () => {
      const { queryAllByTestId, queryByTestId } = render(<ToDo />);
      const deleteButtons = queryAllByTestId("delete");
      fireEvent.click(deleteButtons[0]);
      const todoText = queryByTestId("todo-text");
      expect(todoText.textContent).toEqual("buy milk");
    });
  });
});

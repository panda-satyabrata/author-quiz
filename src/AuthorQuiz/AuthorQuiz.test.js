import React from "react";
import ReactDOM from "react-dom";
import AuthorQuiz from "./AuthorQuiz/AuthorQuiz";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: [
      "The Shining",
      "IT",
      "Heart of Darkness",
      "The Adventures of Huckleberry Finn",
    ],
    author: {
      name: "Joseph Conrad",
      imageUrl: "images/author/josephconrad.jpeg",
      imageSource: "Wikimedia Commons",
      books: ["Heart of Darkness"],
    },
  },
  highlight: "none",
};

describe("Aurthoe Quiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}} />, div);
  });

  describe("When no answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}} />);
    });

    it("should have no background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
        ""
      );
    });
  });

  describe("When wrong answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz
          {...Object.assign({}, state, { highlight: "wrong" })}
          onAnswerSelected={() => {}}
        />
      );
    });

    it("should have red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
        "red"
      );
    });
  });

  describe("When correct answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz
          {...Object.assign({}, state, { highlight: "correct" })}
          onAnswerSelected={() => {}}
        />
      );
    });

    it("should have green background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
        "green"
      );
    });
  });

  describe("When first answer is selected", () => {
    let wrapper;
    const handleAnswerSelected = jest.fn();
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} />
      );
      wrapper.find(".answer").first().simulate("click");
    });

    it("onAnswerSelected should be called", () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it("should receive The Shining", () => {
      expect(handleAnswerSelected).toHaveBeenCalledWith("The Shining");
    });
  });
});

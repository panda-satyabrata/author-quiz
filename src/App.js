import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AddAuthorForm from "./AddAuthorForm/AddAuthorForm";
import { shuffle, sample } from "underscore";
// import { func } from "prop-types";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import AuthorQuiz from "./AuthorQuiz/AuthorQuiz";

const authors = [
  {
    name: "Mark Twain",
    imageUrl: "images/author/marktwain.jpeg",
    imageSource: "Wikimedia Commons",
    books: ["The Adventures of Huckleberry Finn"],
  },
  {
    name: "J.K. Rowling",
    imageUrl: "images/author/jkrowling.jpeg",
    imageSource: "Wikimedia Commons",
    imageAttribution: "Daniel Ogren",
    books: ["Harry Potter and the Sorcerers Stone"],
  },
  {
    name: "Stephen King",
    imageUrl: "images/author/stephenking.jpeg",
    imageSource: "Wikimedia Commons",
    imageAttribution: "Pinguino",
    books: ["The Shining", "IT"],
  },
  {
    name: "Charles Dickens",
    imageUrl: "images/author/charlesdickens.jpeg",
    imageSource: "Wikimedia Commons",
    books: ["David Copperfield", "A Tale of Two Cities"],
  },
  {
    name: "William Shakespeare",
    imageUrl: "images/author/williamshakespeare.jpeg",
    imageSource: "Wikimedia Commons",
    books: ["Hamlet", "Macbeth", "Romeo and Juliet"],
  },
];

function reducer(
  state = { authors, turnData: getTurnData(authors), highlight: "" },
  action
) {
  switch (action.type) {
    case "ANSWER_SELECTED":
      const isCorrect = state.turnData.author.books.some(
        (book) => book === action.answer
      );
      return Object.assign({}, state, {
        highlight: isCorrect ? "correct" : "wrong",
      });
    case "CONTINUE":
      return Object.assign({}, state, {
        highlight: "",
        turnData: getTurnData(state.authors),
      });
    case "ADD_AUTHOR":
      return Object.assign({}, state, {
        authors: state.authors.concat([action.author]),
      });
    default:
      return state;
  }
}

let store = Redux.createStore(reducer);

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) =>
      author.books.some((title) => title === answer)
    ),
  };
}

function App() {
  return (
    <BrowserRouter>
      <ReactRedux.Provider store={store}>
        <React.Fragment>
          <Route exact path="/" component={AuthorQuiz} />
          <Route exact path="/add" component={AddAuthorForm} />
        </React.Fragment>
      </ReactRedux.Provider>
    </BrowserRouter>
  );
}

export default App;

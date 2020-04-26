import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AuthorQuiz from "./AuthorQuiz";
import * as serviceWorker from "./serviceWorker";
import { shuffle, sample } from "underscore";

const authors = [
  {
    name: "Mark Twain",
    imageUrl: "images/author/marktwain.jpeg",
    imageSource: "Wikimedia Commons",
    books: ["The Adventures of Huckleberry Finn"],
  },
  {
    name: "Joseph Conrad",
    imageUrl: "images/author/josephconrad.jpeg",
    imageSource: "Wikimedia Commons",
    books: ["Heart of Darkness"],
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

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? "correct" : "wrong";
  render();
}

const state = {
  turnData: getTurnData(authors),
  highlight: "",
};

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

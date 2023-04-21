import { useState, useEffect } from "react";

const BookList = (props) => {
  const [retrievedBookList, setRetrievedBookList] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        "https://literaryoasis-6ffb0-default-rtdb.firebaseio.com/Books.json"
      );
      const responseData = await response.json();

      const loadedBooks = [];

      for (const key in responseData) {
        loadedBooks.push({
          Author: responseData[key].Author,
          ISBN: responseData[key].ISBN,
          Price: responseData[key].Price,
          Title: responseData[key].Title,
          Status: responseData[key].Status,
          Location: responseData[key].Location,
          key: key,
        });
      }
      setRetrievedBookList(loadedBooks);
    };
    fetchBooks();
  }, []);

  return (
    <>
      {props.retrievedBookList(retrievedBookList)}
    </>
  );
};

export default BookList;

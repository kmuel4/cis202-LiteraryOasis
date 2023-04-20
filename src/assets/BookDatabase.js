import { useState, useEffect } from "react";

const BookDatabase = (props) => {
  const [bookList, setBookList] = useState([]);
  const [selectedBook, setSelectedBook] = useState({
    Author: "",
    ISBN: "",
    Price: "",
    Title: "",
    Status: "",
    Location: "",
    key: "",
  });

  //get all books
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        "https://literaryoasis-6ffb0-default-rtdb.firebaseio.com/Books.json"
      );
      const responseData = await response.json();

      //array to hold all books
      const loadedBooks = [];

      //populate books object array
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
      setBookList(loadedBooks);

      // find books by isbn
      const index = bookList.findIndex((book) => book.ISBN === props.bookIsbn);
      if (index !== -1) {
        setSelectedBook(bookList[index]);
      }
    };
    fetchBooks();
  }, [props.bookIsbn, bookList]);

  // set book title when selectedBook changes
  useEffect(() => {
    if (selectedBook) {
        props.setBook({
            title: selectedBook.Title,
            author: selectedBook.Author,
            isbn: selectedBook.ISBN,
            price: selectedBook.Price,
            status: selectedBook.Status,
            location: selectedBook.Location,
        })
    }
  }, [selectedBook, props]);

  //return nothing
  return null;
};

export default BookDatabase;

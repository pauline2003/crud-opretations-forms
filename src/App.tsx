// src/App.tsx

import React, { useState, useReducer, useRef, useEffect, useCallback, ChangeEvent } from 'react';
import axios from 'axios';
import { bookReducer, Book, initialBooks } from './assets/bookReduce';
import './App.css';

const fetchBooks = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

const App: React.FC = () => {
  const [books, dispatch] = useReducer(bookReducer, initialBooks);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editBookId, setEditBookId] = useState<number | null>(null);
  const booksPerPage = 5;

  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadBooks = async () => {
      const booksData = await fetchBooks('http://localhost:8000/api/books');
      dispatch({ type: 'SET_BOOKS', payload: booksData });
    };

    loadBooks();
  }, []);

  const handleAddOrUpdateBook = () => {
    if (titleRef.current && authorRef.current && yearRef.current) {
      const book: Book = {
        id: editBookId ?? Date.now(),
        title: titleRef.current.value,
        author: authorRef.current.value,
        publication_year: parseInt(yearRef.current.value),
      };

      if (editBookId === null) {
        dispatch({ type: 'ADD_BOOK', payload: book });
        const lastPage = Math.ceil((books.length + 1) / booksPerPage);
        setCurrentPage(lastPage);
      } else {
        dispatch({ type: 'UPDATE_BOOK', payload: book });
        setEditBookId(null);
      }

      titleRef.current.value = '';
      authorRef.current.value = '';
      yearRef.current.value = '';
    }
  };

  const handleEditBook = (book: Book) => {
    setEditBookId(book.id);
    if (titleRef.current && authorRef.current && yearRef.current) {
      titleRef.current.value = book.title;
      authorRef.current.value = book.author;
      yearRef.current.value = book.publication_year.toString();
    }
  };

  const handleDeleteBook = (id: number) => {
    dispatch({ type: 'DELETE_BOOK', payload: { id } });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') setSearchTitle(value);
    if (name === 'author') setSearchAuthor(value);
    if (name === 'year') setSearchYear(value);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
    book.author.toLowerCase().includes(searchAuthor.toLowerCase()) &&
    (searchYear === '' || book.publication_year === parseInt(searchYear))
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = useCallback((pageNumber: number) => setCurrentPage(pageNumber), []);

  return (
    <div className="App">
      <h1>Book Repository</h1>
      <div>
        <input type="text" placeholder="Title" ref={titleRef} />
        <input type="text" placeholder="Author" ref={authorRef} />
        <input type="number" placeholder="Publication Year" ref={yearRef} />
        <button onClick={handleAddOrUpdateBook} className="add-button">
          {editBookId ? 'Update Book' : 'Add Book'}
        </button>
      </div>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Search by title"
          value={searchTitle}
          onChange={handleSearch}
        />
        <input
          type="text"
          name="author"
          placeholder="Search by author"
          value={searchAuthor}
          onChange={handleSearch}
        />
        <input
          type="number"
          name="year"
          placeholder="Search by year"
          value={searchYear}
          onChange={handleSearch}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publication_year}</td>
              <td>
                <button onClick={() => handleEditBook(book)}>Edit</button>
                <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastBook >= filteredBooks.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;

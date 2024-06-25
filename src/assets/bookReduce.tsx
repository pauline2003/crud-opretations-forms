// src/reducers/bookReducer.tsx
export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
  }
  
  export const initialBooks: Book[] = [
    { id: 1, title: '1984', author: 'George Orwell', year: 1949 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
    { id: 4, title: 'Moby-Dick', author: 'Herman Melville', year: 1851 },
    { id: 5, title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813 },
  ];
  
  type BookAction =
    | { type: 'ADD_BOOK'; payload: Book }
    | { type: 'UPDATE_BOOK'; payload: Book }
    | { type: 'DELETE_BOOK'; payload: { id: number } };
  
  export const bookReducer = (state: Book[], action: BookAction): Book[] => {
    switch (action.type) {
      case 'ADD_BOOK':
        return [...state, action.payload];
      case 'UPDATE_BOOK':
        return state.map(book => book.id === action.payload.id ? action.payload : book);
      case 'DELETE_BOOK':
        return state.filter(book => book.id !== action.payload.id);
      default:
        return state;
    }
  };
  
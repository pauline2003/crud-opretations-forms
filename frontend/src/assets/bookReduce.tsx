// assets/bookReduce.ts

export interface Book {
  id: number;
  title: string;
  author: string;
  publication_year: string;
}

export const initialBooks: Book[] = [];

export const bookReducer = (state: Book[], action: { type: string, payload: any }): Book[] => {
  switch (action.type) {
    case 'SET_BOOKS':
      return action.payload;
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

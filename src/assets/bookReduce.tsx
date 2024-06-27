export interface Book {
  id: number;
  title: string;
  author: string;
  publication_year: string;
}

export const initialBooks: Book[] = [];

type BookAction =
  | { type: 'ADD_BOOK'; payload: Book }
  | { type: 'UPDATE_BOOK'; payload: Book }
  | { type: 'DELETE_BOOK'; payload: { id: number } }
  | { type: 'SET_BOOKS'; payload: Book[] };  // Add this line

export const bookReducer = (state: Book[], action: BookAction): Book[] => {
  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, action.payload];
    case 'UPDATE_BOOK':
      return state.map(book => book.id === action.payload.id ? action.payload : book);
    case 'DELETE_BOOK':
      return state.filter(book => book.id !== action.payload.id);
    case 'SET_BOOKS':  // Add this case
      return action.payload;
    default:
      return state;
  }
};

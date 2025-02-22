import React, {createContext, useReducer, ReactNode, Dispatch} from 'react';
import {View, Text} from 'react-native';

// Define types for state
interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  [key: string]: any; // To allow additional properties
}

interface State {
  repositories: Repository[];
  favorites: Repository[];
  loading: boolean;
  error: string | null;
}

// Define action types
type Action =
  | {type: 'SET_LOADING'; payload: boolean}
  | {type: 'SET_REPOSITORIES'; payload: Repository[]}
  | {type: 'SET_ERROR'; payload: string}
  | {type: 'ADD_FAVORITES'; payload: Repository}
  | {type: 'REMOVE_ADD_FAVORITES'; payload: number};

// Create context type
interface AppContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

// Create context
export const AppContext = createContext<AppContextType | null>(null);

const initialState: State = {
  repositories: [],
  favorites: [],
  loading: false,
  error: null,
};

// Reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    case 'SET_REPOSITORIES':
      return {...state, repositories: action.payload, loading: false};
    case 'SET_ERROR':
      return {...state, error: action.payload, loading: false};
    case 'ADD_FAVORITES':
      return {...state, favorites: [...state.favorites, action.payload]};
    case 'REMOVE_ADD_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

// Define props for AppProvider
interface AppProviderProps {
  children: ReactNode;
}

// Context Provider Component
export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

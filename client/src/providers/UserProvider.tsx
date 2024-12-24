import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStrorage } from '../hooks/useLocalStrorage';

interface User {
    email: string
    password: string
    username: string
    terms: boolean
}

interface UserContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { storedValue: currentUserFromStorage, setValue: setCurrentUserFromStorage } = useLocalStrorage('currentUser', {});
  const [currentUser, setCurrentUser] = useState(currentUserFromStorage);


  useEffect(() => {
    setCurrentUserFromStorage(currentUser);
  }, [currentUser, setCurrentUserFromStorage]);


  const value: UserContextType = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};


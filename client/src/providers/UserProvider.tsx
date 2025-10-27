import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axiosInstance';

interface User {
    email: string
    password: string
    name: string
    image: string | null
}

interface UserContextType {
  currentUser: User | false | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | false | null>>;
  isLoadingUser: boolean;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | false | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const fetchUser = async () => {
    setIsLoadingUser(true);
    try {
      const res = await api.get("/api/user", { withCredentials: true });
      setCurrentUser(res.data.data || false);
    } catch (e) {
      setCurrentUser(false);
    } finally {
      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoadingUser, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};


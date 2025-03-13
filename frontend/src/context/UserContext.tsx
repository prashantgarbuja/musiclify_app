// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the shape of userData
interface UserData {
  isAuthenticated: boolean;
  accessToken?: string;
//   userName?: string;
  currentPlaying?: any; // Replace with a more specific type if known
  display?: number;
  user?: {
    display_name: string;
    id: string;
    email?: string;
    country?: string;
    images?: { url: string }[];
    followers?: { href: string | null; total: number };
    [key: string]: any; // For additional fields like explicit_content
  };
  [key: string]: any; // Allows for future expansion (e.g., topArtists)
}

// Context type
interface UserContextType {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_MUSICLIFY_API_URL?.replace(/\/+$/, ''); // Remove trailing slash;
  import.meta.env.MU
  console.log("URL:"+apiUrl); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/user-data`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.isAuthenticated) {
          navigate('/'); // Redirect to landing if not authenticated
        } else {
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/'); // Redirect to landing on error
      }
    };
    fetchUserData();
  }, [navigate]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
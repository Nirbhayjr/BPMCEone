import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserData {
  name: string;
  rollNumber: string;
  branch: string;
  gender: string;
  hometown: string;
  password: string;
  routineFile?: string;
}

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoaded: boolean;
  signUp: (userData: UserData) => void;
  signIn: (rollNumber: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check localStorage for existing user data and session flag
    const storedUser = localStorage.getItem('campusone_user');
    const storedSession = localStorage.getItem('campusone_session');
    if (storedUser && storedSession === 'active') {
      try {
        const userData = JSON.parse(storedUser);
        if (!userData?.password) {
          localStorage.removeItem('campusone_user');
          localStorage.removeItem('campusone_session');
          setIsLoaded(true);
          return;
        }
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('campusone_user');
        localStorage.removeItem('campusone_session');
      }
    }
    setIsLoaded(true);
  }, []);

  const signUp = (userData: UserData) => {
    const normalizedUser = {
      ...userData,
      rollNumber: userData.rollNumber.trim(),
    };
    setUser(normalizedUser);
    setIsAuthenticated(true);
    localStorage.setItem('campusone_user', JSON.stringify(normalizedUser));
    localStorage.setItem('campusone_session', 'active');
  };

  const signIn = (rollNumber: string, password: string) => {
    const normalizedRoll = rollNumber.trim();

    // Demo account credentials
    if (normalizedRoll === '24118128006' && password === '7488754178') {
      const demoUser: UserData = {
        name: 'Nirbhay Kumar',
        rollNumber: '24118128006',
        branch: '3D A&G',
        gender: 'Male',
        hometown: 'Motihari',
        password: '7488754178',
      };
      setUser(demoUser);
      setIsAuthenticated(true);
      localStorage.setItem('campusone_user', JSON.stringify(demoUser));
      localStorage.setItem('campusone_session', 'active');
      return true;
    }

    const storedUser = localStorage.getItem('campusone_user');
    if (!storedUser) {
      return false;
    }

    try {
      const userData = JSON.parse(storedUser) as UserData;
      if (userData.rollNumber === normalizedRoll && userData.password === password) {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('campusone_session', 'active');
        return true;
      }
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      localStorage.removeItem('campusone_user');
      localStorage.removeItem('campusone_session');
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('campusone_session');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoaded, signUp, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

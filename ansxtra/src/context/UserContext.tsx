'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Application } from '@/types';
import { sampleUser } from '@/data/mockData';

interface UserContextType {
  user: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  addApplication: (application: Omit<Application, 'id' | 'appliedAt' | 'status'>) => void;
  updateApplicationStatus: (applicationId: string, status: Application['status']) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('ansxtra_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string): boolean => {
    if (email.endsWith('@student.amnuaysilpa.ac.th')) {
      const newUser = {
        ...sampleUser,
        email,
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      };
      setUser(newUser);
      localStorage.setItem('ansxtra_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ansxtra_user');
  };

  const addApplication = (applicationData: Omit<Application, 'id' | 'appliedAt' | 'status'>) => {
    if (!user) return;

    const newApplication: Application = {
      ...applicationData,
      id: Date.now().toString(),
      appliedAt: new Date().toISOString().split('T')[0],
      status: 'In Review'
    };

    const updatedUser = {
      ...user,
      applications: [...user.applications, newApplication]
    };

    setUser(updatedUser);
    localStorage.setItem('ansxtra_user', JSON.stringify(updatedUser));
  };

  const updateApplicationStatus = (applicationId: string, status: Application['status']) => {
    if (!user) return;

    const updatedApplications = user.applications.map(app =>
      app.id === applicationId ? { ...app, status } : app
    );

    const updatedUser = {
      ...user,
      applications: updatedApplications
    };

    setUser(updatedUser);
    localStorage.setItem('ansxtra_user', JSON.stringify(updatedUser));
  };

  const value: UserContextType = {
    user,
    login,
    logout,
    addApplication,
    updateApplicationStatus
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
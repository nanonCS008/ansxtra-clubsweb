'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthSession } from '@/types';
import { getStudentByEmail } from '@/lib/data';

interface AuthContextType {
  session: AuthSession | null;
  login: (email: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedSession = localStorage.getItem('ansxtra-session');
    if (savedSession) {
      try {
        const parsedSession = JSON.parse(savedSession);
        setSession(parsedSession);
      } catch (error) {
        localStorage.removeItem('ansxtra-session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string): Promise<{ success: boolean; message: string }> => {
    // Validate email domain
    if (!email.endsWith('@student.amnuaysilpa.ac.th')) {
      return {
        success: false,
        message: 'Please use your school email address (@student.amnuaysilpa.ac.th)'
      };
    }

    // Extract student ID from email
    const studentId = email.split('@')[0];
    
    // Find student in mock data
    const student = getStudentByEmail(email);
    if (!student) {
      return {
        success: false,
        message: 'Student not found. Please check your email address.'
      };
    }

    // Create session
    const newSession: AuthSession = {
      studentId,
      email,
      fullName: student.fullName,
      isAuthenticated: true,
    };

    // Save session
    setSession(newSession);
    localStorage.setItem('ansxtra-session', JSON.stringify(newSession));

    return {
      success: true,
      message: 'Login successful!'
    };
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem('ansxtra-session');
  };

  const value: AuthContextType = {
    session,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
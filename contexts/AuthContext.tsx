import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthUser, LoginCredentials, RegisterData } from '@/types/user';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth data on mount
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const authData: AuthUser = JSON.parse(storedAuth);
        setUser(authData.user);
      } catch (error) {
        localStorage.removeItem('auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call - in real app, this would be an actual API request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation
      if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
        const mockUser: User = {
          id: '1',
          email: credentials.email,
          firstName: 'Demo',
          lastName: 'User',
          phone: '+1234567890',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        const authData: AuthUser = {
          user: mockUser,
          token: 'mock-jwt-token'
        };

        localStorage.setItem('auth', JSON.stringify(authData));
        setUser(mockUser);

        toast({
          title: "Success!",
          description: "You have been logged in successfully."
        });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user creation
      const mockUser: User = {
        id: Date.now().toString(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const authData: AuthUser = {
        user: mockUser,
        token: 'mock-jwt-token'
      };

      localStorage.setItem('auth', JSON.stringify(authData));
      setUser(mockUser);

      toast({
        title: "Welcome!",
        description: "Your account has been created successfully."
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully."
    });
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser = { ...user, ...data, updatedAt: new Date().toISOString() };
      const authData: AuthUser = {
        user: updatedUser,
        token: 'mock-jwt-token'
      };

      localStorage.setItem('auth', JSON.stringify(authData));
      setUser(updatedUser);

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = !!user;

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://192.168.1.5:8000'; // Replace with your PC's IP

  // LOGIN
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        await AsyncStorage.setItem('token', data.access_token);
        setToken(data.access_token);

        // Fetch user profile
        const profileRes = await fetch(`${API_BASE}/profile`, {
          headers: { Authorization: `Bearer ${data.access_token}` },
        });

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setUser(profileData);
        }

        return { success: true };
      }

      // Handle FastAPI array or string error messages
      const errorMsg = Array.isArray(data.detail)
        ? data.detail.map(d => d.msg).join(', ')
        : data.detail || 'Login failed';

      return { success: false, error: errorMsg };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // SIGNUP
  const signup = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Auto-login after signup
        return await login(email, password);
      }

      const errorMsg = Array.isArray(data.detail)
        ? data.detail.map(d => d.msg).join(', ')
        : data.detail || 'Signup failed';

      return { success: false, error: errorMsg };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // LOGOUT
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // LOAD TOKEN FROM STORAGE
  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);

      const profileRes = await fetch(`${API_BASE}/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setUser(profileData);
      } else {
        // Invalid token
        await logout();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

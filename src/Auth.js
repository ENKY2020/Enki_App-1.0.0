import { createClient } from '@supabase/supabase-js';

// Initialize Supabase using environment variables
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const Auth = {
  // Sign in with email and password
  login: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Login error:', err);
      throw new Error(err.message || 'Unable to log in.');
    }
  },

  // Sign out the user
  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      return true;
    } catch (err) {
      console.error('Logout error:', err);
      throw new Error(err.message || 'Unable to log out.');
    }
  },

  // Register a new user
  register: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Registration error:', err);
      throw new Error(err.message || 'Unable to register.');
    }
  },

  // Fetch the current user
  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  // Reset password
  resetPassword: async (email) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Password reset error:', err);
      throw new Error(err.message || 'Unable to send password reset email.');
    }
  },
};

export default Auth;

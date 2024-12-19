// supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with your project URL and anon key
export const supabase = createClient(
  'https://zzxklgvghkqtzksokica.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6eGtsZ3ZnaGtxdHprc29raWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxODg3MjMsImV4cCI6MjA0OTc2NDcyM30.bue77wpDgJM3_j8y_77mOKp9mg9FcILJ0s0FR7VVuAs'
);

import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fuonftfozfptfbzxrbhc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1b25mdGZvemZwdGZienhyYmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5NDEzMjYsImV4cCI6MjAyMjUxNzMyNn0.2q1tmhHCqFNjx3RqfXE74IeEarTNd_-tB5feE-G2yQo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

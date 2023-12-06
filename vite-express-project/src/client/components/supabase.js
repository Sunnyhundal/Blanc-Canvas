import { createClient } from "@supabase/supabase-js";

// require("dotenv").config({
//   path: "./.env.local",
// });

const VITE_SUPABASE_URL="https://iwxsgpjsqhbnsvoepczn.supabase.co"
const VITE_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eHNncGpzcWhibnN2b2VwY3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMTEzNDYsImV4cCI6MjAxNTU4NzM0Nn0.fpfSwbGJgXpvTnkYkBFloBRH_sn1vkAXJC2OI5pAgt4"

const supabaseUrl = VITE_SUPABASE_URL;
const supabaseKey = VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase }; // Ensure you're exporting 'supabase'

import { createClient } from "@supabase/supabase-js";

require("dotenv").config({
  path: "./.env.local",
});

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase }; // Ensure you're exporting 'supabase'

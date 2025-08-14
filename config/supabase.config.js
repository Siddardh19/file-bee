const  { createClient } = require ('@supabase/supabase-js');

const supabaseUrl = 'https://mqjmavgmgdvjlkklfsrz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xam1hdmdtZ2R2amxra2xmc3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NTcxNzEsImV4cCI6MjA3MDAzMzE3MX0.F4nj_8FmreCrpl7cNH0v_GP-9xUyhNn48Kl588oDKwU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;

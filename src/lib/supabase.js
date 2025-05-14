import { createClient } from '@supabase/supabase-js';

// Utilizăm variabilele de mediu pentru credențialele Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funcții de bază pentru interacțiunea cu Supabase

export async function getSections() {
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .order('order');
  
  if (error) throw error;
  return data || [];
}

export async function getQuestionsForSection(sectionId) {
  const { data, error } = await supabase
    .from('questions')
    .select(`
      *,
      answers (*)
    `)
    .eq('section_id', sectionId);
  
  if (error) throw error;
  return data || [];
}

export async function createSection(section) {
  const { data, error } = await supabase
    .from('sections')
    .insert([section])
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function updateSection(id, updates) {
  const { data, error } = await supabase
    .from('sections')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function createQuestion(question) {
  const { data, error } = await supabase
    .from('questions')
    .insert([question])
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function createAnswer(answer) {
  const { data, error } = await supabase
    .from('answers')
    .insert([answer])
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function updateSectionOrder(sections) {
  const updates = sections.map((section, index) => ({
    id: section.id,
    order: index
  }));
  
  for (const update of updates) {
    await supabase
      .from('sections')
      .update({ order: update.order })
      .eq('id', update.id);
  }
}

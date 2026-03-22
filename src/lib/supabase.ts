import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUp(email: string, password: string, userData: any) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Database helpers
export async function fetchPatients(branchId?: string) {
  let query = supabase.from('patients').select('*');
  if (branchId) {
    query = query.eq('branch_id', branchId);
  }
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function fetchAppointments(date?: string, branchId?: string) {
  let query = supabase.from('appointments').select(`
    *,
    patient:patients(*),
    doctor:users(*),
    service:services(*)
  `);
  if (date) {
    query = query.eq('appointment_date', date);
  }
  if (branchId) {
    query = query.eq('branch_id', branchId);
  }
  const { data, error } = await query.order('start_time');
  if (error) throw error;
  return data;
}

export async function createAppointment(appointment: any) {
  const { data, error } = await supabase
    .from('appointments')
    .insert(appointment)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateAppointment(id: string, updates: any) {
  const { data, error } = await supabase
    .from('appointments')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fetchInvoices(branchId?: string) {
  let query = supabase.from('invoices').select(`
    *,
    patient:patients(*)
  `).order('created_at', { ascending: false });
  if (branchId) {
    query = query.eq('branch_id', branchId);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function fetchServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('name');
  if (error) throw error;
  return data;
}

export async function fetchInventory(branchId?: string) {
  let query = supabase.from('inventory').select('*');
  if (branchId) {
    query = query.eq('branch_id', branchId);
  }
  const { data, error } = await query.order('name');
  if (error) throw error;
  return data;
}

// Real-time subscriptions
export function subscribeToAppointments(callback: (payload: any) => void, branchId?: string) {
  let channel = supabase
    .channel('appointments')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'appointments' },
      callback
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export function subscribeToPatients(callback: (payload: any) => void) {
  const channel = supabase
    .channel('patients')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'patients' },
      callback
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import SettingsForm from './SettingsForm';

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const { data: settings } = await supabase
    .from('company_settings')
    .select('*')
    .limit(1)
    .single();

  return <SettingsForm initialSettings={settings || null} />;
}
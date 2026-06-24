'use server';

import { createClient } from '@/lib/supabase/server';
import { CompanySettings } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getCompanySettings(): Promise<CompanySettings | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('company_settings')
    .select('*')
    .limit(1)
    .single();

  if (error || !data) {
    console.error('Error fetching company settings:', error);
    return null;
  }

  return data as CompanySettings;
}

export async function getPublicCompanySettings(): Promise<CompanySettings | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('company_settings')
    .select('*')
    .limit(1)
    .single();

  if (error || !data) {
    return null;
  }

  return data as CompanySettings;
}

export async function updateCompanySettings(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Unauthorized. Please log in.' };
  }

  // Get existing settings row
  const { data: existing } = await supabase
    .from('company_settings')
    .select('id')
    .limit(1)
    .single();

  const settingsData = {
    company_name: formData.get('company_name') as string,
    tagline: formData.get('tagline') as string,
    support_email: formData.get('support_email') as string,
    support_phone: formData.get('support_phone') as string,
    office_address: formData.get('office_address') as string,
    business_hours: formData.get('business_hours') as string,
    logo_url: (formData.get('logo_url') as string) || null,
    brand_color: formData.get('brand_color') as string,
    company_description: formData.get('company_description') as string,
    default_origin_country: formData.get('default_origin_country') as string,
    default_origin_city: formData.get('default_origin_city') as string,
    default_support_response: formData.get('default_support_response') as string,
    default_tracking_help: formData.get('default_tracking_help') as string,
  };

  // Validation
  if (!settingsData.company_name.trim()) {
    return { success: false, error: 'Company name is required.' };
  }
  if (!settingsData.support_email.trim()) {
    return { success: false, error: 'Support email is required.' };
  }

  let result;
  if (existing) {
    result = await supabase
      .from('company_settings')
      .update(settingsData)
      .eq('id', existing.id);
  } else {
    result = await supabase
      .from('company_settings')
      .insert(settingsData);
  }

  if (result.error) {
    console.error('Error updating settings:', result.error);
    return { success: false, error: 'Failed to save settings. Please try again.' };
  }

  revalidatePath('/admin/settings');
  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/contact');

  return { success: true };
}
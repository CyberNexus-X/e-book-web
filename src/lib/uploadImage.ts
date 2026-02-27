import { supabase } from './supabase';

export async function uploadAvatar(userId: string, file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const path = `${userId}/avatar.${ext}`;

  const { error } = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true });

  if (error) throw error;
  return path;
}

export async function uploadMessageImage(conversationId: string, file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const path = `${conversationId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from('message-images')
    .upload(path, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from('message-images')
    .getPublicUrl(path);

  return data.publicUrl;
}

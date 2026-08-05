import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(relativeTime);
dayjs.extend(isToday);

export function formatMessageTime(dateStr: string): string {
  const date = dayjs(dateStr);
  if (date.isToday()) {
    return date.format('HH:mm');
  }
  return date.format('DD/MM/YY');
}

export function formatLastSeen(dateStr: string): string {
  return dayjs(dateStr).fromNow();
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '…';
}

export function generateUsernameSuggestions(base: string): string[] {
  const clean = base.toLowerCase().replace(/[^a-z0-9_]/g, '');
  const num = Math.floor(Math.random() * 9000) + 1000;
  return [
    `${clean}${num}`,
    `${clean}_${Math.floor(Math.random() * 999)}`,
    `the_${clean}`,
  ];
}

export function validateUsername(username: string): string | null {
  if (!username) return 'Username is required';
  if (username.length < 3) return 'At least 3 characters required';
  if (username.length > 20) return 'Maximum 20 characters allowed';
  if (!/^[a-z0-9_]+$/.test(username)) return 'Only lowercase letters, numbers, and _ allowed';
  return null;
}

export function getAvatarUrl(avatarPath: string | null | undefined, supabaseUrl: string): string {
  if (!avatarPath) return '';
  if (avatarPath.startsWith('http')) return avatarPath;
  return `${supabaseUrl}/storage/v1/object/public/avatars/${avatarPath}`;
}

export function getMessageImageUrl(imagePath: string, supabaseUrl: string): string {
  if (imagePath.startsWith('http')) return imagePath;
  return `${supabaseUrl}/storage/v1/object/public/message-images/${imagePath}`;
}

export function getInitials(name: string): string {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

export function canChangeUsername(usernameChangedAt: string | null): { can: boolean; daysLeft: number } {
  if (!usernameChangedAt) return { can: true, daysLeft: 0 };
  const daysSince = dayjs().diff(dayjs(usernameChangedAt), 'day');
  if (daysSince >= 5) return { can: true, daysLeft: 0 };
  return { can: false, daysLeft: 5 - daysSince };
}

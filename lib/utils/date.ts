export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getRelativeTime(date: string | Date): string {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const now = new Date();
  const then = new Date(date);
  const diffInDays = Math.floor((then.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (Math.abs(diffInDays) < 1) {
    const diffInHours = Math.floor((then.getTime() - now.getTime()) / (1000 * 60 * 60));
    return rtf.format(diffInHours, 'hour');
  }

  if (Math.abs(diffInDays) < 30) {
    return rtf.format(diffInDays, 'day');
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  return rtf.format(diffInMonths, 'month');
}
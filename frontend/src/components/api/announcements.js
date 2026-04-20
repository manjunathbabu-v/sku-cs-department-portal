// API helper for announcements
// Base URL points to your Spring Boot backend
const BASE_URL = 'http://localhost:8080';

export async function fetchAnnouncements() {
  const res = await fetch(`${BASE_URL}/api/announcements`);
  if (!res.ok) throw new Error('Failed to fetch announcements');
  return res.json();
}

export async function postAnnouncement(data) {
  const res = await fetch(`${BASE_URL}/api/announcements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to post announcement');
  return res.json();
}

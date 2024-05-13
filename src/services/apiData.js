const API_URL = 'http://localhost:8000';

export async function getMenu() {
  const res = await fetch(`${API_URL}/data`);

  if (!res.ok) throw new Error('Failed getting items from menu.');

  const data = await res.json();

  return data;
}

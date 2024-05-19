const API_URL = 'http://localhost:8000';

export async function getMenu() {
  const res = await fetch(`${API_URL}/data`);

  if (!res.ok) throw new Error('Failed getting items from menu.');

  const data = await res.json();

  return data;
}

export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw new Error(`Couldn't find order #${id}`);

  const data = await res.json();
  return data;
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(res);

    if (!res.ok) throw Error();
    // const { data } = await res.json();
    const data = await res.json();
    // console.log(data);
    return data;
  } catch {
    throw Error('Failed creating your order');
  }
}

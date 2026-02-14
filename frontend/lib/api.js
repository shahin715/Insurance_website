export async function api(path, options = {}) {
  const res = await fetch(
    `http://127.0.0.1:5000/api${path}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    }
  );

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
}

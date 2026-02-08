const BASE = "http://127.0.0.1:5000/api";

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  return res.json();
}

// existing
export function getPages() {
  return request("/pages");
}

// generic helper
export function api(path, options) {
  return request(path, options);
}

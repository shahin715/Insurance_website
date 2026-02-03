export async function getPages() {
  const res = await fetch("http://127.0.0.1:5000/api/pages", {
    cache: "no-store"
  })
  return res.json()
}

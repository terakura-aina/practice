export default async function data() {
  const res: any = await fetch("http://localhost:8000/api", {cache: "no-store"});
  return res.json()
}
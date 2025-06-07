export default async function handler(req, res) {
  const { q } = req.query;
  try {
    const response = await fetch(`http://localhost:5000/api/products/search?q=${q}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

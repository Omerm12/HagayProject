const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProductsByCategory(category) {
  try {
    const res = await fetch(`${API_URL}/api/products?category=${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

export async function fetchSettlements() {
  const res = await fetch(`${API_URL}/api/settlements`);
  if (!res.ok) throw new Error("Failed to fetch settlements");
  return await res.json();
}
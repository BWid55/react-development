export async function storefront(query, variables = {}) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": `${process.env.REACT_APP_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

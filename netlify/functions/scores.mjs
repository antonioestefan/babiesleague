const API_KEY = "3548dfd54a7f4b82b32311306cbb2676";
const BASE_URL = "https://api.football-data.org/v4";

export default async (req) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  const url = new URL(req.url);
  const status = url.searchParams.get("status") || "LIVE";

  try {
    const response = await fetch(
      `${BASE_URL}/competitions/WC/matches?status=${status}`,
      { headers: { "X-Auth-Token": API_KEY } }
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `API error: ${response.status}` }),
        { status: response.status, headers }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200, headers });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers }
    );
  }
};

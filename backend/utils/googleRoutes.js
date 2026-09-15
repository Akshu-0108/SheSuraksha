const GOOGLE_ROUTES_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";

const toMinutes = (duration) => Math.max(1, Math.round(Number.parseFloat(duration) / 60));

/**
 * Retrieves Google Maps route durations when a server-side Routes API key is
 * configured. The key is intentionally never exposed to the frontend.
 * Returns an empty array if Maps is not configured or temporarily unavailable,
 * allowing the route planner's existing safety estimates to continue working.
 */
async function getGoogleRouteEstimates(origin, destination) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) return [];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(GOOGLE_ROUTES_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "routes.duration,routes.distanceMeters",
      },
      body: JSON.stringify({
        origin: { address: origin },
        destination: { address: destination },
        travelMode: "WALK",
        computeAlternativeRoutes: true,
        languageCode: "en-IN",
        units: "METRIC",
      }),
    });

    if (!response.ok) {
      console.warn(`Google Routes API unavailable: ${response.status}`);
      return [];
    }

    const payload = await response.json();
    return (payload.routes || [])
      .filter((route) => route.duration && Number.isFinite(route.distanceMeters))
      .map((route) => ({
        estimatedTimeMinutes: toMinutes(route.duration),
        distanceKm: Number((route.distanceMeters / 1000).toFixed(1)),
        durationSource: "google_maps",
      }));
  } catch (error) {
    console.warn(`Google Routes lookup skipped: ${error.name}`);
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = { getGoogleRouteEstimates };

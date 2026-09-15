const asyncHandler = require("../middleware/asyncHandler");

// Curated records are kept server-side until an operational partner directory is available.
const HAVENS = [
  { id: "hauz-khas-police", name: "Hauz Khas Police Station", locality: "Hauz Khas", category: "Police assistance", hours: "24 hours", phone: "112", location: { lat: 28.5494, lng: 77.2001 } },
  { id: "saket-metro-security", name: "Saket Metro Security Desk", locality: "Saket", category: "Transit safe point", hours: "05:00–23:30", phone: "155370", location: { lat: 28.5245, lng: 77.2066 } },
  { id: "lajpat-help-desk", name: "Lajpat Nagar Women Help Desk", locality: "Lajpat Nagar", category: "Women support desk", hours: "09:00–18:00", phone: "1091", location: { lat: 28.5677, lng: 77.2434 } },
  { id: "cp-police-booth", name: "Connaught Place Police Booth", locality: "Connaught Place", category: "Police assistance", hours: "24 hours", phone: "112", location: { lat: 28.6315, lng: 77.2167 } },
  { id: "cyber-hub-security", name: "Cyber Hub Security Office", locality: "Cyber Hub Gurgaon", category: "Verified public safe point", hours: "08:00–23:00", phone: "112", location: { lat: 28.4949, lng: 77.0888 } },
  { id: "mayur-vihar-police", name: "Mayur Vihar Police Station", locality: "Mayur Vihar", category: "Police assistance", hours: "24 hours", phone: "112", location: { lat: 28.6096, lng: 77.2953 } },
];

const toRadians = (value) => (value * Math.PI) / 180;
const distanceKm = (a, b) => {
  const dLat = toRadians(b.lat - a.lat); const dLng = toRadians(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};

const getSafeHavens = asyncHandler(async (req, res) => {
  const locality = req.query.locality?.trim().toLowerCase();
  const lat = Number(req.query.lat); const lng = Number(req.query.lng);
  let havens = HAVENS.filter((haven) => !locality || haven.locality.toLowerCase() === locality);
  if (Number.isFinite(lat) && Number.isFinite(lng)) havens = havens.map((haven) => ({ ...haven, distanceKm: Number(distanceKm({ lat, lng }, haven.location).toFixed(1)) })).sort((a, b) => a.distanceKm - b.distanceKm);
  res.json({ havens });
});

module.exports = { getSafeHavens };

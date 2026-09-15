/**
 * Simple keyword-matching chatbot. No real AI/LLM call — good enough
 * for a hackathon demo. Swap this out later for an actual LLM API call
 * (e.g. the Anthropic API) without changing the route's request/response shape.
 */
const RULES = [
  {
    test: (message) => /\b(sos|emergency|danger|harass(?:ed|ment)?|attack|immediate help|police)\b/.test(message),
    intent: "emergency_guidance",
    reply: "If you are in immediate danger, open Emergency SOS or call 112. If it is safe, share your live location with a trusted contact.",
  },
  {
    test: (message) => /\b(area|locality|neighbou?rhood|place|location|current area|current location|safety score)\b/.test(message) || /\b(is|check|know)\b.{0,35}\bsafe\b/.test(message),
    intent: "area_audit_help",
    reply: "I can help assess an area. Open Safety Check and select a locality to view its safety score, lighting, nearby incidents, and safe havens.",
  },
  {
    test: (message) => /\b(connect|connection|friend|friends|trusted circle|companion|buddy|group)\b/.test(message),
    intent: "travel_circle_help",
    reply: "Open Connect Here to search for people you know, send a connection request, and coordinate journeys only with your trusted circle.",
  },
  {
    test: (message) => /\b(route|directions|path|way|destination|origin|journey|travel)\b/.test(message),
    intent: "route_help",
    reply: "I can help plan a safer route. Open Safety Map, enter your starting point and destination, then compare the Safest, Middle ground, and Fastest options.",
  },
  {
    test: (message) => /\b(hi|hello|hey|namaste)\b/.test(message),
    intent: "greeting",
    reply: "Hi, I’m your SheSuraksha safety companion. Ask about an area, a route, SOS support, or connecting with friends.",
  },
];

const DEFAULT_REPLY =
  "I'm not sure I understood that yet, but I can help with safety routes, area safety scores, emergency SOS, or travel circles. What do you need?";

function getChatbotReply(message) {
  const lower = message.toLowerCase();

  for (const rule of RULES) {
    if (rule.test(lower)) {
      return { reply: rule.reply, intent: rule.intent };
    }
  }

  return { reply: DEFAULT_REPLY, intent: "unknown" };
}

module.exports = { getChatbotReply };

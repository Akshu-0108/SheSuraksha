function escapeHtml(value) {
  return String(value ?? 'Not available')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function routeFileName(routeName) {
  const safeName = String(routeName || 'safe-route')
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-|-$/g, '')
  return `${safeName || 'safe-route'}-summary.html`
}

export function downloadRouteSummary({ routeName, origin, destination, distance, duration, safetyScore, risk }) {
  const downloadedAt = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())
  const score = String(safetyScore ?? 'Not available').includes('/100') ? safetyScore : `${safetyScore ?? 'Not available'}/100`
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(routeName)} — SheSuraksha route summary</title><style>
:root { color: #3f1625; background: #f6f1e8; font-family: Inter, Arial, sans-serif; } * { box-sizing: border-box; } body { margin: 0; padding: 32px 16px; } main { max-width: 720px; margin: auto; overflow: hidden; border: 1px solid #eadcc5; border-radius: 24px; background: #fffdf8; box-shadow: 0 12px 34px rgba(63, 22, 37, .12); } header { padding: 32px; color: #fff8e9; background: linear-gradient(135deg, #4c1728, #260712); } .brand { color: #e1b34f; font-size: 13px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; } h1 { margin: 10px 0 0; font-family: Georgia, serif; font-size: clamp(28px, 6vw, 42px); } .journey { padding: 28px 32px 10px; } .place-label { margin: 0 0 5px; color: #8d6672; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; } .place { margin: 0; font-size: 18px; font-weight: 700; line-height: 1.45; } .arrow { display: inline-block; margin: 12px 0; color: #c88c2e; font-size: 24px; } .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 22px 32px 30px; } .stat { min-width: 0; padding: 16px; border-radius: 16px; background: #f7f0e5; } .stat-label { display: block; color: #876675; font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; } .stat-value { display: block; margin-top: 7px; font-size: 19px; font-weight: 800; overflow-wrap: anywhere; } .notice { margin: 0 32px 28px; padding: 16px; border-left: 4px solid #c88c2e; border-radius: 0 12px 12px 0; background: #fff7df; color: #5d4523; font-size: 13px; line-height: 1.55; } footer { padding: 18px 32px; border-top: 1px solid #eee2d1; color: #866d75; font-size: 12px; } @media (max-width: 500px) { .stats { grid-template-columns: 1fr; } header, .journey, .stats, footer { padding-left: 22px; padding-right: 22px; } .notice { margin-left: 22px; margin-right: 22px; } } @media print { body { padding: 0; background: #fff; } main { border: 0; box-shadow: none; } }
</style></head><body><main><header><div class="brand">SheSuraksha · Safe navigation</div><h1>${escapeHtml(routeName)}</h1></header><section class="journey"><p class="place-label">From</p><p class="place">${escapeHtml(origin)}</p><div class="arrow" aria-hidden="true">↓</div><p class="place-label">To</p><p class="place">${escapeHtml(destination)}</p></section><section class="stats" aria-label="Route details"><div class="stat"><span class="stat-label">Distance</span><span class="stat-value">${escapeHtml(distance)}</span></div><div class="stat"><span class="stat-label">Estimated time</span><span class="stat-value">${escapeHtml(duration)}</span></div><div class="stat"><span class="stat-label">Safety score</span><span class="stat-value">${escapeHtml(score)}</span></div></section><p class="notice"><strong>${escapeHtml(risk)}</strong><br>Use this route summary as a planning aid. Stay alert, share your journey with a trusted contact, and call local emergency services if you feel unsafe.</p><footer>Route summary downloaded ${escapeHtml(downloadedAt)}. You can print this page or save it as a PDF from your browser.</footer></main></body></html>`
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = routeFileName(routeName)
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Camera, Clock, MapPin, Moon, ShieldCheck, Sun, Users } from 'lucide-react'
import faceIcon from '../assets/face-icon.png'
import AmbientDots from '../components/AmbientDots'
import { DATASET_SUMMARY, DELHI_LOCALITIES, getLocalitySafety } from '../data/localitySafety'
import { api } from '../services/api'

function Stat({ icon: Icon, label, value, note }) {
  return <div className="rounded-2xl border border-gold/20 bg-black/20 p-4"><div className="flex items-center gap-2 text-xs uppercase tracking-wide text-gold/75"><Icon size={14} />{label}</div><strong className="mt-2 block text-2xl text-cream">{value}</strong><span className="mt-1 block text-xs text-cream/55">{note}</span></div>
}

function AreaAudit() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('locality') || 'Hauz Khas'
  const [period, setPeriod] = useState('day')
  const [audit, setAudit] = useState(null)
  const [error, setError] = useState('')
  const data = useMemo(() => getLocalitySafety(requested), [requested])
  const crimeRate = ((data.reports / DATASET_SUMMARY.totalReports) * 100).toFixed(1)
  const illumination = Math.min(98, 64 + data.score / 2)
  const safeHavens = Math.max(4, Math.round(data.score / 6))
  const policeTime = Math.max(2, +(10 - data.score / 12).toFixed(1))
  const selectLocality = (name) => setSearchParams({ locality: name })

  useEffect(() => {
    let ignore = false
    api(`/area-audit?locality=${encodeURIComponent(requested)}`)
      .then((result) => { if (!ignore) { setAudit(result); setError('') } })
      .catch((requestError) => { if (!ignore) setError(requestError.message) })
    return () => { ignore = true }
  }, [requested])

  const liveScore = audit?.safetyScore ?? data.score
  const liveIllumination = audit?.illuminationPercent ?? illumination
  const liveHavens = audit?.safeHavenCount ?? safeHavens
  const livePoliceTime = audit?.policeResponseTimeMinutes ?? policeTime

  return <main className="area-audit-page min-h-screen px-4 py-10"><AmbientDots /><div className="mx-auto max-w-5xl rounded-[2rem] bg-gradient-to-br from-[#4c1728] to-[#16030a] p-6 shadow-2xl md:p-10"><div className="flex items-center justify-between gap-4"><img src={faceIcon} alt="SheSuraksha" className="w-10" /><span className="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold">Dataset-based locality audit</span></div><div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-semibold uppercase tracking-[.16em] text-gold">Area safety audit</p><h1 className="mt-2 font-display text-4xl font-bold text-cream md:text-5xl">{data.name}</h1><p className="mt-2 max-w-xl text-sm leading-6 text-cream/65">Crime, lighting, day/night context, and local support information from the current locality reference.</p></div><div className="flex rounded-full border border-gold/30 p-1"><button onClick={() => setPeriod('day')} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm ${period === 'day' ? 'bg-gold text-burgundy-dark' : 'text-cream/70'}`}><Sun size={15} />Day</button><button onClick={() => setPeriod('night')} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm ${period === 'night' ? 'bg-gold text-burgundy-dark' : 'text-cream/70'}`}><Moon size={15} />Night</button></div></div>
    <div className="mt-7 flex flex-wrap gap-2">{DELHI_LOCALITIES.map((locality) => <button key={locality.name} onClick={() => selectLocality(locality.name)} className={`rounded-full border px-3 py-1.5 text-xs transition ${data.name === locality.name ? 'border-gold bg-gold text-burgundy-dark font-semibold' : 'border-gold/25 text-cream/75 hover:border-gold/60'}`}>{locality.name}</button>)}</div>
    <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4"><Stat icon={ShieldCheck} label={`${period} safety`} value={`${period === 'day' ? Math.min(98, liveScore + 7) : Math.max(40, liveScore - 9)}/100`} note={period === 'day' ? 'Daylight rating' : 'After-dark rating'} /><Stat icon={MapPin} label="Nearby incidents" value={audit ? audit.nearbyIncidentCount : `${crimeRate}%`} note={audit ? 'Within the selected search radius' : `${data.reports} of ${DATASET_SUMMARY.totalReports} supplied reports`} /><Stat icon={Sun} label="Illumination" value={`${Math.round(liveIllumination)}%`} note="Estimated visible-route coverage" /><Stat icon={Users} label="Safe havens" value={liveHavens} note="Nearby verified reference points" /></div>
    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4"><Stat icon={Camera} label="CCTV coverage" value={`${Math.min(96, Math.round(liveScore + 5))}%`} note="Reference coverage estimate" /><Stat icon={Clock} label="Police response" value={`${livePoliceTime} min`} note="Estimated support arrival" /><Stat icon={Moon} label="Night risk" value={liveScore >= 74 ? 'Low' : liveScore >= 65 ? 'Moderate' : 'Elevated'} note="Lighting and report pattern" /><Stat icon={Sun} label="Day risk" value={liveScore >= 75 ? 'Low' : 'Moderate'} note="Daytime reference rating" /></div>
    {error && <p className="mt-4 text-sm text-red-200">Live audit unavailable: {error}</p>}
    <section className="mt-7 rounded-2xl border border-gold/20 bg-black/20 p-5"><h2 className="font-display text-2xl font-bold text-cream">Safety guidance for {period === 'day' ? 'daytime' : 'after dark'}</h2><ul className="mt-3 space-y-2 text-sm leading-6 text-cream/70"><li>• Use well-lit main roads and confirmed public-transport exits.</li><li>• Keep a trusted contact aware of your route, especially when the night rating is lower.</li><li>• If the area feels unsafe, open the emergency tools or choose another marked locality route.</li></ul><p className="mt-4 text-xs leading-5 text-cream/40">{DATASET_SUMMARY.note}</p></section>
  </div></main>
}

export default AreaAudit

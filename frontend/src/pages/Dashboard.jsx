import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BatteryCharging, Bot, BusFront, Compass, Map, MapPin, Navigation, Radio, ShieldAlert, UserRound, Users, WifiOff } from 'lucide-react'
import faceIcon from '../assets/face-icon.png'
import { api, auth } from '../services/api'
import { useBatterySaver } from '../contexts/BatterySaverContext'

const TOOLS = [
  { title: 'Emergency SOS', detail: 'Trigger a silent alert, siren, or guardian broadcast.', action: 'Open SOS', to: '/community', icon: ShieldAlert, tone: 'bg-red-700 text-white' },
  { title: 'Safety Check', detail: 'Check lighting, crowd presence, safe havens, and local scores.', action: 'Audit area', to: '/area-audit', icon: MapPin, tone: 'bg-burgundy-dark text-cream' },
  { title: 'Safe Havens', detail: 'Find verified support points, transit desks, and police assistance near you.', action: 'View safe havens', to: '/safe-havens', icon: ShieldAlert, tone: 'bg-[#3c7652] text-white' },
  { title: 'Safe Routes', detail: 'Compare routes based on lighting, crowd activity, and safety risk markers.', action: 'Plan route', to: '/safety-map', icon: Navigation, tone: 'bg-[#273b88] text-white' },
  { title: 'Offline Safety', detail: 'Keep key guidance and emergency contacts ready without data.', action: 'View offline mode', to: '/offline-safety', icon: WifiOff, tone: 'bg-burgundy-dark text-cream' },
  { title: 'Connect Here', detail: 'Coordinate safer journeys with people you know and trust.', action: 'Connect here', to: '/connect', icon: Users, tone: 'bg-burgundy-dark text-cream' },
  { title: 'Safety Companion', detail: 'Ask for guidance on routes, areas, emergencies, or travel plans.', action: 'Start chat', to: '/chatbot', icon: Bot, tone: 'bg-burgundy-dark text-cream' },
]

function Dashboard() {
  const { batterySaver, setBatterySaver } = useBatterySaver()
  const [name, setName] = useState(auth.getUser()?.name || 'there')

  useEffect(() => {
    if (!auth.getToken()) return
    api('/auth/profile').then((profile) => setName(profile.name)).catch(() => auth.clearSession())
  }, [])

  return (
    <main className={`dashboard-enter dashboard-floral-border motion-page min-h-screen px-5 py-7 text-burgundy-dark md:px-10 ${batterySaver ? 'battery-saver bg-[#11040a]' : 'bg-[linear-gradient(180deg,#5b2439_0%,#713347_8%,#d3aab2_17%,#f8f4ec_31%)]'}`}>
      <header className="mx-auto flex max-w-7xl items-center justify-between border-b border-cream/20 pb-5">
        <Link to="/" className="flex items-center gap-3 text-cream"><img src={faceIcon} alt="SheSuraksha" className="w-11" /><span className="font-display text-2xl font-bold">SheSuraksha</span><span className="rounded-full bg-cream/15 px-3 py-1 text-xs font-semibold tracking-widest text-cream">DASHBOARD</span></Link>
        <div className="flex items-center gap-2"><div className={`battery-saver-nav-pill ${batterySaver ? 'battery-saver-nav-pill--active' : ''}`}><button type="button" onClick={() => setBatterySaver((enabled) => !enabled)} aria-pressed={batterySaver} className="battery-saver-toggle flex items-center gap-2 text-xs font-semibold sm:text-sm"><BatteryCharging size={16} />Battery saver <span className={`battery-saver-track ${batterySaver ? 'bg-gold' : 'bg-cream/35'}`}><span className={`battery-saver-thumb ${batterySaver ? 'translate-x-4' : 'translate-x-0'}`} /></span></button></div><Link to="/profile" aria-label="Open your profile" title="Your profile" className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-cream/10 text-gold hover:bg-cream/20"><UserRound size={19} /></Link><div className="hidden items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm text-emerald-800 lg:flex"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />Guardian protection active</div></div>
      </header>
      <div className="mx-auto max-w-7xl py-10">
        <section className="rounded-[2rem] border border-burgundy/10 bg-gradient-to-r from-white via-[#fffafa] to-[#fae9ed] p-7 shadow-sm md:p-10 motion-panel">
          <span className="rounded-full bg-[#f9e5e9] px-3 py-1 text-sm font-medium text-burgundy">• Welcome back</span>
          <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><h1 className="font-display text-5xl font-bold leading-none md:text-6xl">Hello, {name}! <span aria-hidden="true">👋</span></h1><p className="mt-4 text-xl text-burgundy-dark/70">Stay aware. <span className="mx-1">•</span> Stay connected. <span className="mx-1">•</span> <strong className="text-burgundy">Stay safe.</strong></p></div><div className="flex gap-3 text-sm"><Link to="/saved-routes" className="dashboard-quick-link rounded-2xl bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><strong className="block">Saved routes</strong><span className="text-burgundy-dark/60">ready to use</span></Link><Link to="/safe-havens" className="dashboard-quick-link rounded-2xl bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><strong className="block">Safe havens</strong><span className="text-burgundy-dark/60">nearby support points</span></Link></div></div>
        </section>

        <section className="mt-9 grid gap-7 lg:grid-cols-[0.8fr_1.2fr] motion-stagger">
          <div className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-burgundy/10"><p className="text-sm font-bold uppercase tracking-[0.14em] text-burgundy">Transit assist</p><h2 className="mt-2 flex items-center gap-3 font-display text-4xl font-bold">Public Transport <BusFront size={30} className="text-burgundy" /></h2><p className="mt-5 leading-7 text-burgundy-dark/70">Locate illuminated boarding points, police assistance booths, well-lit interchanges, and nearby bus routes before you travel.</p><div className="mt-6 rounded-2xl bg-[#4b0611] p-5 text-cream"><strong className="text-2xl">METRO + BUS</strong><span className="ml-3 rounded-full border border-emerald-400/50 px-2 py-1 text-xs text-emerald-300">CCTV MONITORED</span><p className="mt-2 text-sm text-cream/70">Dedicated women coach · Safe station security</p></div><Link to="/public-transport" className="mt-6 inline-flex items-center gap-2 font-semibold text-burgundy hover:underline">Explore metro and buses <Compass size={17} /></Link></div>

          <Link to="/safety-map" className="group rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-burgundy/10 transition hover:-translate-y-1 hover:shadow-lg"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-burgundy">Live spatial view</p><h2 className="mt-2 font-display text-4xl font-bold">Safety map</h2></div><span className="rounded-full bg-[#f8e6e9] px-3 py-1 text-sm text-burgundy">Open map</span></div><div className="dashboard-map-preview relative mt-6 h-64 overflow-hidden rounded-2xl"><div className="absolute left-[-5%] top-[48%] h-7 w-[112%] rotate-6 border-y-4 border-white/70 bg-[#d7cdb9]" /><div className="absolute left-[48%] top-[-10%] h-[120%] w-8 -rotate-6 border-x-4 border-white/70 bg-[#d7cdb9]" /><div className="absolute left-[7%] top-[22%] h-4 w-[92%] -rotate-[17deg] border-y-2 border-white/65 bg-[#cec3ad]" /><div className="absolute left-[25%] top-[-18%] h-[145%] w-4 rotate-[29deg] border-x-2 border-white/65 bg-[#cec3ad]" /><div className="absolute left-[42%] top-[28%] h-28 w-28 rounded-full border-2 border-dashed border-emerald-400 bg-emerald-200/30" /><i aria-hidden="true" className="dashboard-map-pin left-[19%] top-[30%]" /><i aria-hidden="true" className="dashboard-map-pin dashboard-map-pin--gold left-[69%] top-[26%]" /><i aria-hidden="true" className="dashboard-map-pin dashboard-map-pin--rose left-[30%] top-[68%]" /><i aria-hidden="true" className="dashboard-map-pin left-[72%] top-[67%]" /><span className="absolute left-[48%] top-[44%] rounded-full bg-emerald-700 px-3 py-1 text-sm font-semibold text-white">● Safe haven</span><span className="absolute bottom-5 right-5 rounded-full bg-burgundy px-3 py-1 text-sm font-semibold text-cream">Current location</span></div><p className="mt-4 flex items-center gap-2 text-sm text-burgundy-dark/70"><Map size={16} className="text-burgundy" />Tap to explore safe routes, nearby safe havens, and transit points.</p></Link>
        </section>

        <section className="mt-12"><div className="mb-6 flex items-end justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-burgundy">Your safety tools</p><h2 className="mt-1 font-display text-4xl font-bold">Ready when you need them</h2></div><Radio className="text-burgundy" /></div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 motion-stagger">{TOOLS.map(({ title, detail, action, to, icon: Icon, tone }) => <Link key={title} to={to} className={`rounded-3xl ${title === 'Safety Companion' ? 'bg-cream' : 'bg-white'} p-6 shadow-sm ring-1 ring-burgundy/10 transition hover:-translate-y-1 hover:shadow-md motion-card`}><div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tone} ${title === 'Emergency SOS' ? 'motion-safety-indicator' : ''} ${title === 'Connect Here' ? 'dashboard-connect-icon' : ''}`}><Icon size={21} /></div><h3 className="mt-5 font-display text-2xl font-bold">{title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-burgundy-dark/70">{detail}</p><span className="mt-5 inline-block rounded-full bg-burgundy px-4 py-2 text-sm font-semibold text-cream">{action}</span></Link>)}</div></section>
      </div>
    </main>
  )
}

export default Dashboard

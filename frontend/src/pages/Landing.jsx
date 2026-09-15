import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Siren, MessageCircle, ShieldCheck, Users, Globe, ChevronDown, ArrowRight, Sun, Moon } from 'lucide-react'
import faceIcon from '../assets/face-icon.png'

function Diamond({ size, top, left, right, bottom, filled, dashed, opacity = 1 }) {
  return (
    <div
      className={`absolute border landing-diamond ${filled ? 'bg-gold border-gold/60' : 'border-gold/40'} ${
        dashed ? 'border-dashed' : 'border-solid'
      }`}
      style={{ width: size, height: size, top, left, right, bottom, opacity }}
    />
  )
}

function AmbientParticles() {
  const particles = [
    [8, 84, 1, 0], [15, 64, 2, 1], [24, 92, 1, 2], [31, 72, 2, 3],
    [39, 86, 1, 4], [48, 78, 2, 5], [57, 93, 1, 6], [64, 66, 1, 7],
    [73, 85, 2, 8], [81, 75, 1, 9], [89, 90, 2, 10], [94, 58, 1, 11],
  ]

  return <div className="landing-particles" aria-hidden="true">{particles.map(([left, bottom, size, delay]) => <i key={`${left}-${bottom}`} className={`landing-particle landing-particle--${size}`} style={{ left: `${left}%`, bottom: `${bottom}%`, '--particle-delay': `${delay * -0.62}s` }} />)}</div>
}

function BackgroundDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AmbientParticles />
      <Diamond size={55} top={-10} left={-10} dashed />
      <Diamond size={30} top={40} left={10} filled opacity={0.25} />
      <Diamond size={16} top={85} left={65} />
      <Diamond size={22} top={5} left={95} opacity={0.6} />

      <Diamond size={70} bottom={-20} left={-15} filled opacity={0.2} />
      <Diamond size={45} bottom={30} left={20} dashed />
      <Diamond size={90} bottom={-30} left={60} filled opacity={0.15} />
      <Diamond size={28} bottom={90} left={100} />
      <Diamond size={20} bottom={130} left={40} filled opacity={0.3} />
      <Diamond size={14} bottom={180} left={140} />

      <Diamond size={70} bottom={-20} right={-15} filled opacity={0.2} />
      <Diamond size={45} bottom={30} right={20} dashed />
      <Diamond size={90} bottom={-30} right={60} filled opacity={0.15} />
      <Diamond size={28} bottom={90} right={100} />
      <Diamond size={20} bottom={130} right={40} filled opacity={0.3} />
      <Diamond size={14} bottom={180} right={140} />

      <Diamond size={14} top="60%" left={20} />
      <Diamond size={14} top="63%" right={30} />
      <Diamond size={18} top="80%" right={110} filled opacity={0.2} />
    </div>
  )
}

function NavPill({ icon: Icon, label, to, motionClass }) {
  return (
    <Link to={to} className={`landing-feature flex items-center gap-3 bg-cream border border-gold/30 rounded-full pl-2 pr-5 py-2 hover:brightness-95 transition ${motionClass}`}>
      <div className="landing-feature-icon w-9 h-9 rounded-full flex items-center justify-center bg-burgundy/10">
        <Icon size={16} className={`text-burgundy ${motionClass === 'landing-feature--connect' ? 'landing-connect-users-icon' : ''}`} />
      </div>
      <span className="text-burgundy font-medium text-sm">{label}</span>
      <ArrowRight size={14} className="text-burgundy/60" />
    </Link>
  )
}

function Landing() {
  const [isDark, setIsDark] = useState(true)

  const navPills = [
    { label: 'Emergency SOS', icon: Siren, to: '/community', motionClass: 'landing-feature--sos' },
    { label: 'Safety Check', icon: ShieldCheck, to: '/area-audit', motionClass: 'landing-feature--safety' },
    { label: 'Chatbot', icon: MessageCircle, to: '/chatbot', motionClass: 'landing-feature--chatbot' },
    { label: 'Connect Here', icon: Users, to: '/connect', motionClass: 'landing-feature--connect' },
  ]

  return (
    <div className="landing-page min-h-screen bg-gradient-to-b from-burgundy-dark via-[#3a0d0d] to-burgundy-dark relative overflow-hidden flex flex-col motion-page">
      <BackgroundDecoration />

      {/* Top bar: language + day/night toggle */}
      <div className="landing-topbar flex justify-end items-center gap-3 p-6 relative z-10">
        <div className="landing-language flex items-center gap-2 border border-gold/30 text-cream rounded-full px-4 py-2 text-sm cursor-pointer">
          <Globe size={14} />
          English
          <ChevronDown size={14} />
        </div>
        <button
          onClick={() => setIsDark((prev) => !prev)}
          className="landing-theme-toggle relative w-14 h-8 rounded-full bg-cream shadow-inner flex items-center shrink-0"
          aria-label="Toggle day/night mode"
        >
          <span
            className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300 ${
              isDark ? 'translate-x-6' : 'translate-x-0'
            }`}
          >
            {isDark ? (
              <Moon size={12} className="text-burgundy" />
            ) : (
              <Sun size={12} className="text-burgundy" />
            )}
          </span>
        </button>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-4 relative z-10">
        <img src={faceIcon} alt="SheSuraksha" className="w-28 h-auto mx-auto motion-hero-logo motion-float" />
        <h1 className="landing-title font-display text-cream text-5xl md:text-7xl font-bold flex items-center gap-2 -mt-2 motion-hero-title">
          SheSuraksha
          <span className="text-gold text-4xl">✦</span>
        </h1>
        <p className="font-display italic text-cream/90 text-lg md:text-xl motion-hero-tagline">
          Not just where to go—but which journey fits the moment
        </p>

        <div className="landing-feature-row flex flex-wrap justify-center gap-4 mt-6 motion-hero-actions">
          {navPills.map((pill) => (
            <NavPill key={pill.label} {...pill} />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <Link to="/dashboard" aria-label="Open the safety dashboard" className="landing-scroll-indicator group flex flex-col items-center gap-2 pb-10 text-cream/60 text-xs tracking-widest uppercase relative z-10 transition hover:text-gold">
        Scroll to begin your journey
        <ChevronDown size={16} className="animate-bounce transition group-hover:translate-y-1" />
      </Link>
    </div>
  )
}
export default Landing

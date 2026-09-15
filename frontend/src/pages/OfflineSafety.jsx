import { WifiOff, Phone, Eye, Footprints, ShieldAlert } from 'lucide-react'
import faceIcon from '../assets/face-icon.png'

function TipList({ icon: Icon, title, tips }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-burgundy-dark font-semibold text-sm">
        <Icon size={16} className="text-burgundy" />
        {title}
      </div>
      <ul className="flex flex-col gap-1.5">
        {tips.map((tip, i) => (
          <li key={i} className="text-burgundy-dark/70 text-sm flex gap-2">
            <span className="text-gold">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  )
}

function OfflineSafety() {
  return (
    <div className="abstract-background min-h-screen px-4 py-10 flex justify-center">
      <div className="max-w-3xl w-full">
        <div className="flex items-center justify-between mb-6">
          <img src={faceIcon} alt="SheSuraksha" className="w-9 h-auto" />
          <span className="flex items-center gap-1.5 bg-burgundy/10 text-burgundy text-[10px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full">
            <WifiOff size={12} />
            Low Connectivity Mode Ready
          </span>
        </div>

        <h1 className="font-display text-burgundy-dark text-3xl md:text-4xl font-bold mb-2">
          Stay Safe Even Offline
        </h1>
        <p className="font-display italic text-burgundy-dark/60 text-lg mb-8">
          "When the connection gets crowded, your safety shouldn't."
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 text-burgundy-dark font-semibold text-sm mb-2">
                <ShieldAlert size={16} className="text-burgundy" />
                Emergency Basics
              </div>
              <p className="text-burgundy-dark/60 text-sm mb-3">
                Pre-cached emergency cache. No network required — cellular
                emergency calls and SMS alerts to your circle still connect.
              </p>
              <button className="flex items-center gap-2 bg-burgundy text-cream font-semibold text-sm px-4 py-2.5 rounded-full hover:bg-burgundy-light transition">
                <Phone size={15} />
                Call Women Helpline (1091)
              </button>
            </div>

            <TipList
              icon={Eye}
              title="Stay Visible"
              tips={[
                'Anchor your movement around illuminated storefronts.',
                'Stay near verified safe havens (24x7 shops, guarded lobby, CCTV).',
              ]}
            />
          </div>

          <div className="flex flex-col gap-6">
            <TipList
              icon={Footprints}
              title="Safe Movement"
              tips={[
                'Stay near low-traffic-avoiding walking paths.',
                'Avoid poorly lit or unconfirmed shortcuts.',
                'Share your live location before you set off.',
              ]}
            />

            <div className="bg-burgundy-dark rounded-2xl p-5">
              <div className="text-gold text-xs font-semibold uppercase tracking-wide mb-2">
                Offline Safeguard
              </div>
              <p className="text-cream/80 text-sm">
                Essential guidance, emergency contacts, and safe-haven maps
                remain accessible without cellular data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfflineSafety

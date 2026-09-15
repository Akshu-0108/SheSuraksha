import { useState } from 'react'
import { Siren, ShieldAlert, CheckCircle2 } from 'lucide-react'
import faceIcon from '../assets/face-icon.png'

function EmergencySOS() {
  const [alert, setAlert] = useState(null)

  const handleBroadcast = () => {
    // Matches POST /sos response shape exactly
    setAlert({
      sosId: 'sos_' + Math.random().toString(36).slice(2, 10),
      location: { lat: 28.5494, lng: 77.2001 },
      message: 'One-tap SOS broadcast triggered',
      status: 'active',
      createdAt: new Date().toISOString(),
    })
  }

  const handleSilentAlert = () => {
    setAlert({
      sosId: 'sos_' + Math.random().toString(36).slice(2, 10),
      location: { lat: 28.5494, lng: 77.2001 },
      message: 'Silent police alert triggered',
      status: 'active',
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-10 flex justify-center items-center">
      <div className="max-w-lg w-full bg-gradient-to-br from-burgundy-dark to-[#3a0d10] rounded-3xl shadow-2xl p-8 text-center">
        <img src={faceIcon} alt="SheSuraksha" className="w-9 h-auto mx-auto mb-4" />

        <h1 className="font-display text-cream text-3xl font-bold mb-6">
          Emergency SOS Hub
        </h1>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleBroadcast}
            className="flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-4 rounded-full hover:bg-red-700 transition text-lg"
          >
            <Siren size={20} />
            One-Tap SOS Broadcast
          </button>
          <button
            onClick={handleSilentAlert}
            className="flex items-center justify-center gap-2 border border-gold/40 text-cream font-medium py-3 rounded-full hover:bg-black/20 transition"
          >
            <ShieldAlert size={18} className="text-gold" />
            Silent Police Alert
          </button>
        </div>

        {alert && (
          <div className="mt-6 bg-black/30 border border-green-500/30 rounded-2xl p-4 text-left flex gap-3 items-start">
            <CheckCircle2 size={20} className="text-green-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-cream text-sm font-semibold mb-1">
                Alert dispatched — status: {alert.status}
              </p>
              <p className="text-cream/60 text-xs">
                {alert.message} · Live GPS shared with your emergency circle
                and nearby verified responders.
              </p>
              <p className="text-cream/40 text-[11px] mt-1">
                ID: {alert.sosId}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmergencySOS
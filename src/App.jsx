import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import config from './config'
import { Sky, Reasons, Memories, Cake, Letter } from './scenes'

const scenes = [Sky, Reasons, Memories, Cake, Letter]
const EMOJI = ['💖', '✨', '🌸', '💫', '💕', '🦋']

export default function App() {
  const [i, setI] = useState(0)
  const [bursts, setBursts] = useState([])
  const next = useCallback(() => setI(v => Math.min(v + 1, scenes.length - 1)), [])
  const Scene = scenes[i]

  // tap/click anywhere → little hearts
  useEffect(() => {
    const onTap = e => {
      const id = Math.random()
      setBursts(b => [...b.slice(-12), { id, x: e.clientX, y: e.clientY, e: EMOJI[Math.floor(Math.random() * EMOJI.length)] }])
      setTimeout(() => setBursts(b => b.filter(x => x.id !== id)), 1200)
    }
    window.addEventListener('pointerdown', onTap)
    return () => window.removeEventListener('pointerdown', onTap)
  }, [])

  return (
    <div className="app">
      <div className="stars" aria-hidden />
      <div className="moon" aria-hidden />
      <AnimatePresence mode="wait">
        <motion.main key={i} className="scene"
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
          transition={{ duration: 0.5 }}>
          <Scene config={config} next={next} last={i === scenes.length - 1} restart={() => setI(0)} />
        </motion.main>
      </AnimatePresence>
      <nav className="dots" aria-label="progress">
        {scenes.map((_, k) => <span key={k} className={k === i ? 'on' : k < i ? 'done' : ''} />)}
      </nav>
      {bursts.map(b => <span key={b.id} className="tap" style={{ left: b.x, top: b.y }}>{b.e}</span>)}
    </div>
  )
}

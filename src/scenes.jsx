import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const url = s => (s && s.startsWith('/') ? import.meta.env.BASE_URL + s.slice(1) : s)
const pop = (o = {}) => confetti({ particleCount: 70, spread: 80, origin: { y: 0.7 }, colors: ['#ff7aa8', '#ffc58a', '#fdf1c9', '#b79cff'], ...o })
const Next = ({ onClick, children }) => (
  <motion.button className="btn" onClick={onClick} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} whileTap={{ scale: 0.94 }}>{children}</motion.button>
)

/* 1 — Two stars, far apart, brought together */
export function Sky({ config: { sky, her, me, age }, next }) {
  const [n, setN] = useState(0)
  const steps = 5, gap = (1 - n / steps)
  const arrived = n >= steps
  const go = () => { if (!arrived) { setN(n + 1); pop({ particleCount: 25, spread: 50 }); if (n + 1 === steps) setTimeout(() => pop({ particleCount: 160, spread: 120 }), 400) } }
  return (
    <section className="center">
      <AnimatePresence mode="wait">
        {!arrived ? (
          <motion.div key="a" className="center" exit={{ opacity: 0 }}>
            <h1 className="display">{sky.intro}</h1>
            <p className="soft">{sky.tapHint}</p>
          </motion.div>
        ) : (
          <motion.div key="b" className="center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="age">{age}</div>
            <h1 className="display">{sky.arrived}</h1>
            <p className="soft">{sky.arrivedSub}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="duo">
        <motion.div className="star" animate={{ x: `${-gap * 38}vw` }} transition={{ type: 'spring', stiffness: 60, damping: 12 }}><i />{her}</motion.div>
        <motion.div className="star" animate={{ x: `${gap * 38}vw` }} transition={{ type: 'spring', stiffness: 60, damping: 12 }}><i />{me}</motion.div>
        {arrived && <motion.div className="bigheart" initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }}>💖</motion.div>}
      </div>
      {arrived ? <Next onClick={next}>Open your surprise 🎁</Next>
        : <motion.button className="btn" whileTap={{ scale: 0.92 }} onClick={go}>{sky.buttonLabels[n]}</motion.button>}
    </section>
  )
}

/* 2 — swipeable / tappable card stack */
export function Reasons({ config: { reasons, reasonsTitle }, next }) {
  const [k, setK] = useState(0)
  const done = k >= reasons.length
  const advance = () => { if (!done) { setK(k + 1); if ((k + 1) % 5 === 0) pop({ particleCount: 40 }) } }
  return (
    <section className="center">
      <h2 className="display sm">{reasonsTitle}</h2>
      <div className="deck">
        {reasons.slice(k, k + 3).reverse().map((r, idx, arr) => {
          const top = idx === arr.length - 1
          return (
            <motion.div key={r} className="card"
              animate={{ scale: 1 - (arr.length - 1 - idx) * 0.05, y: (arr.length - 1 - idx) * 14, rotate: top ? 0 : (idx % 2 ? 2 : -2) }}
              onPointerDown={top ? e => { e.currentTarget._x = e.clientX } : undefined}
              onPointerUp={top ? e => { if (Math.abs(e.clientX - (e.currentTarget._x ?? e.clientX)) > 60) { e.currentTarget._swiped = true; advance() } } : undefined}
              onClick={top ? e => { if (e.currentTarget._swiped) { e.currentTarget._swiped = false; return } advance() } : undefined}
              style={{ zIndex: idx, touchAction: 'pan-y' }}>
              <span className="count">{reasons.indexOf(r) + 1} / {reasons.length}</span>
              <p>{r}</p>
            </motion.div>
          )
        })}
        {done && <motion.p className="soft" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>…and a thousand more I couldn't fit. 💞</motion.p>}
      </div>
      {done ? <Next onClick={next}>See our moments 📸</Next> : <p className="soft">Tap or swipe the card</p>}
    </section>
  )
}

/* 3 — polaroids that flip */
export function Memories({ config: { photos, memoriesTitle }, next }) {
  const [flip, setFlip] = useState({})
  return (
    <section className="center">
      <h2 className="display sm">{memoriesTitle}</h2>
      <p className="soft">Tap a photo to flip it</p>
      <div className="strip">
        {photos.map((p, i) => (
          <motion.div key={i} className="polaroid" style={{ rotate: (i % 2 ? 2 : -2) }} whileHover={{ y: -6, rotate: 0 }}
            onClick={() => setFlip(f => ({ ...f, [i]: !f[i] }))}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <motion.div className="flipper" animate={{ rotateY: flip[i] ? 180 : 0 }} transition={{ duration: 0.6 }}>
              <div className="face">
                {p.src ? <img src={url(p.src)} alt={p.caption} /> : <div className="ph"><span>📷</span>Your photo {i + 1}</div>}
                <small>{p?.date}</small>
              </div>
              <div className="face back"><p>{p.caption}</p></div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <Next onClick={next}>Light the candles 🎂</Next>
    </section>
  )
}

/* 4 — 22 candles to blow out */
export function Cake({ config: { cake, age }, next }) {
  const [out, setOut] = useState(() => Array(age).fill(false))
  const left = out.filter(o => !o).length
  const done = left === 0
  const fired = useRef(false)
  useEffect(() => { if (done && !fired.current) { fired.current = true; pop({ particleCount: 200, spread: 140 }); setTimeout(() => pop({ origin: { x: 0.1, y: 0.8 } }), 300); setTimeout(() => pop({ origin: { x: 0.9, y: 0.8 } }), 500) } }, [done])
  const blow = () => out.forEach((_, i) => setTimeout(() => setOut(o => { const c = [...o]; c[i] = true; return c }), i * 70))
  return (
    <section className="center">
      <h2 className="display sm">{done ? cake.done : cake.title}</h2>
      <div className="cake">
        <div className="candles">
          {out.map((o, i) => (
            <button key={i} className="candle" aria-label={`candle ${i + 1}`} onClick={() => setOut(v => v.map((x, j) => (j === i ? true : x)))}>
              <motion.i className="flame" animate={o ? { scale: 0, opacity: 0 } : { scale: [1, 1.2, 0.95, 1], rotate: [-4, 4, -2, 0] }} transition={o ? { duration: 0.2 } : { repeat: Infinity, duration: 0.9 + (i % 5) * 0.12 }} />
              {o && <motion.b className="smoke" initial={{ opacity: 0.7, y: 0 }} animate={{ opacity: 0, y: -26 }} transition={{ duration: 1.2 }} />}
            </button>
          ))}
        </div>
        <div className="tier t1" /><div className="tier t2" />
      </div>
      {done ? <Next onClick={next}>Read your letter 💌</Next>
        : <><p className="soft">{cake.hint} ({left} left)</p><motion.button className="btn" whileTap={{ scale: 0.92 }} onClick={blow}>Blow 💨</motion.button></>}
    </section>
  )
}

/* 5 — envelope, letter, "open when" notes, finale */
export function Letter({ config: { letter, openWhen, finale, her, me }, restart }) {
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(0)
  const [note, setNote] = useState(null)
  useEffect(() => {
    if (!open) return
    const t = setInterval(() => setShown(s => { if (s >= letter.paragraphs.length + 1) { clearInterval(t); return s } return s + 1 }), 1600)
    return () => clearInterval(t)
  }, [open, letter.paragraphs.length])
  const finished = shown > letter.paragraphs.length
  useEffect(() => { if (finished) pop({ particleCount: 150, spread: 120 }) }, [finished])
  return (
    <section className="center scroll">
      {!open ? (
        <motion.button className="envelope" onClick={() => { setOpen(true); setShown(1) }} whileTap={{ scale: 0.95 }} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}>
          <span>💌</span><b>{letter.envelope}</b><small>{letter.openHint}</small>
        </motion.button>
      ) : (
        <motion.div className="paper" initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
          {letter.paragraphs.slice(0, shown).map((p, i) => <motion.p key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{p}</motion.p>)}
          {shown > letter.paragraphs.length && <motion.p className="sign" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{letter.signoff}<br />{`— ${me}`}</motion.p>}
        </motion.div>
      )}
      {finished && (
        <motion.div className="center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <div className="notes">
            {openWhen.map((o, i) => (
              <button key={i} className={'note' + (note === i ? ' on' : '')} onClick={() => setNote(note === i ? null : i)}>
                <b>✉️ {o.label}</b>
                <AnimatePresence>{note === i && <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{o.text}</motion.span>}</AnimatePresence>
              </button>
            ))}
          </div>
          <h2 className="display">{finale.title}, {her} 💖</h2>
          <p className="soft">{finale.text}</p>
          <button className="btn ghost" onClick={restart}>{finale.replay}</button>
        </motion.div>
      )}
    </section>
  )
}

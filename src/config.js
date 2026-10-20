// ✏️ EDIT EVERYTHING HERE — all text, names and photos live in this one file.
// Photos: drop images into /public/photos and set src to e.g. '/photos/1.jpg' (works in sub-folders too).
// Leave src: '' and a soft "add photo" placeholder shows instead.

const config = {
  her: 'Miree',
  me: 'Anurag',
  age: 22,

  // Scene 1 – "Same sky"
  sky: {
    intro: 'Different cities. Same sky.',
    tapHint: 'Tap the button to bring us closer',
    buttonLabels: ['Bring us closer', 'A little more…', 'Almost there…', 'Closer…', 'One last time'],
    arrived: 'Happy Birthday, Miree',
    arrivedSub: 'The distance can wait today. This one is all yours.',
  },

  // Scene 2 – cards (tap or swipe). Add / remove / rewrite freely.
  reasonsTitle: '22 things I love about you',
  reasons: [
    'Your laugh. I can pick it out of any noise, even through a phone speaker.',
    'You make a bad day feel small just by showing up in my chat.',
    'The way you get excited about little things.',
    'You are kind to people who can never repay it.',
    'Your snaps. I replay them more than I admit.',
    'How you treat me.',
    'You believe in me on days I don\'t.',
    'Your smile when the video call finally connects.',
    'You are brave in quiet ways.',
    'You remember the tiny things I say.',
    'Your sense of humour (yes, even the terrible jokes).',
    'You make waiting feel worth it.',
    'The way you care so loudly and so gently at once.',
    'You make ordinary plans sound like adventures.',
    'Your good-morning texts.',
    'You are the same person in every room.',
    'You make me want to be better, never smaller.',
    'You make me feel like a baby around you.',
    'Your patience with me and with the distance.',
    'You feel like home, even from far away.',
    'You are growing into someone amazing, and I get to watch.',
    'You are you. That\'s the whole reason. 💖',
  ],

  // Scene 3 – photos. Add as many as you like.
  memoriesTitle: 'Our little moments',
  photos: [
    { src: 'photos/1.jpeg', caption: 'The day we first talked. I was nervous. You weren\'t.', date: '25th January 2026' },
    { src: 'photos/2.jpeg', caption: 'My favourite photo of you.', date: ':)' },
    { src: 'photos/3.jpeg', caption: 'Our first video call that lasted for hours.', date: '18th March 2026' },
    { src: 'photos/4.jpeg', caption: 'You, being you.', date: 'Add a date' },
    { src: 'photos/5.jpeg', caption: 'Us, one day soon, in the same frame.', date: ':)' },
    { src: 'photos/6.jpeg', caption: 'First time where I heard I love you too in person.', date: '11th March 2026' },
  ],

  // Scene 4 – cake
  cake: {
    title: 'Make a wish',
    hint: 'Tap the candles or press blow',
    done: 'Whatever you just wished for, I\'m already working on it.',
  },

  // Scene 5 – letter
  letter: {
    envelope: 'A letter for Miree',
    openHint: 'Tap to open',
    paragraphs: [
      'Miree,',
      'Loving you from a distance has taught me that love is not about being in the same room. It\'s about being the first person I want to tell everything to.',
      'Every call, every late-night text, every “reach home?” is me choosing you again. I\'d choose you every time.',
      'You are turning 22, and I hope this year is gentle with you and generous to you. I hope you get everything you\'ve been quietly wishing for.',
      'Until I can hug you properly, keep this little corner of the internet. It\'s the closest I could get to a hug today.',
    ],
    signoff: 'Forever yours,',
  },
  // "Open when…" notes in the letter scene
  openWhen: [
    { label: 'Open when you miss me', text: 'Look up. I\'m under the same sky, thinking about you. Send me a hug emoji and I\'ll send one back instantly.' },
    { label: 'Open when you can\'t sleep', text: 'Close your eyes. Imagine my hand in yours. Count to 22, then do it again. I\'m right here.' },
    { label: 'Open when you doubt yourself', text: 'You are smart, kind, and far more loved than you know. Read that again.' },
  ],

  finale: {
    title: 'Happy 22nd, my love',
    text: 'Next time, no screens. Just us.',
    replay: 'Watch it again',
  },
}
export default config

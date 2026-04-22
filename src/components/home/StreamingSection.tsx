import Link from 'next/link';

const MEDIA_TYPES = [
  { icon: '🎬', label: 'Shows' },
  { icon: '🍿', label: 'Movies' },
  { icon: '📚', label: 'eBooks' },
  { icon: '🎧', label: 'Audiobooks' },
  { icon: '🎵', label: 'Music' },
  { icon: '🎮', label: 'Games' },
];

const MEDIA_PLACEHOLDERS = [
  { gradient: 'from-purple-600 to-indigo-800', icon: '🎬', label: 'Shows' },
  { gradient: 'from-red-600 to-orange-700', icon: '🍿', label: 'Movies' },
  { gradient: 'from-emerald-600 to-teal-800', icon: '📚', label: 'eBooks' },
  { gradient: 'from-amber-500 to-orange-600', icon: '🎧', label: 'Audiobooks' },
  { gradient: 'from-pink-600 to-rose-800', icon: '🎵', label: 'Music' },
  { gradient: 'from-blue-600 to-cyan-700', icon: '🎮', label: 'Games' },
];

export default function StreamingSection() {
  return (
    <section className="py-12 md:py-16 bg-[#1a1a2e]">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left side — 60% */}
          <div className="w-full lg:w-[60%]">
            <span className="inline-block text-sky-400 text-xs font-semibold tracking-wider uppercase mb-3">
              Included with ValueBox+
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
              Stream, Read &amp; Play
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
              Your membership includes access to thousands of shows, movies, eBooks, audiobooks, music, and games. All included&nbsp;&mdash; no extra cost.
            </p>

            {/* Media type pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {MEDIA_TYPES.map((m) => (
                <span
                  key={m.label}
                  className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm font-medium px-3.5 py-1.5 rounded-full"
                >
                  <span>{m.icon}</span>
                  {m.label}
                </span>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/premium"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-200 shadow-lg text-sm"
            >
              Learn more about ValueBox+
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Disclaimer */}
            <p className="text-[11px] text-gray-500 mt-4">
              Streaming availability varies by region. Content library is updated regularly.
            </p>
          </div>

          {/* Right side — 40% — Placeholder media thumbnails */}
          <div className="w-full lg:w-[40%]">
            <div className="grid grid-cols-2 min-[420px]:grid-cols-3 gap-x-3 gap-y-6 max-w-sm mx-auto lg:mx-0">
              {MEDIA_PLACEHOLDERS.map((item, idx) => (
                <div
                  key={item.label}
                  className={`relative bg-gradient-to-br ${item.gradient} rounded-xl aspect-[3/4] flex flex-col items-center justify-center shadow-lg ${
                    idx % 3 === 1 ? 'translate-y-4' : ''
                  }`}
                >
                  <span className="text-3xl md:text-4xl mb-1.5 drop-shadow-lg">
                    {item.icon}
                  </span>
                  <span className="text-white/80 text-[11px] font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}

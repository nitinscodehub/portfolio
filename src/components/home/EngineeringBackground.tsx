export default function EngineeringBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="eng-grid absolute inset-0" />
      <div className="orb -left-52 top-10 size-[32rem] bg-violet/15" />
      <div className="orb -right-40 top-32 size-[30rem] bg-cyan/10" />
      <div className="orb bottom-0 left-1/3 size-[24rem] bg-gold/[0.06]" />

      <svg className="absolute inset-0 h-full w-full opacity-[0.28]" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
        <path d="M-40 620C220 470 380 700 620 530S1050 260 1500 410" stroke="url(#lineA)" strokeWidth="1" />
        <path d="M-40 700C260 560 420 780 700 610S1120 360 1500 500" stroke="url(#lineB)" strokeWidth="1" />
        <path d="M120 -20C260 240 180 430 340 620S620 880 760 960" stroke="url(#lineA)" strokeWidth="1" />
        <circle cx="620" cy="530" r="4" fill="#00D9FF" />
        <circle cx="700" cy="610" r="3" fill="#865DFF" />
        <circle cx="340" cy="620" r="3" fill="#E8B95B" />
        <defs>
          <linearGradient id="lineA" x1="0" y1="0" x2="1440" y2="0">
            <stop stopColor="#00D9FF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#00D9FF" stopOpacity="0.7" />
            <stop offset="1" stopColor="#865DFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineB" x1="0" y1="0" x2="1440" y2="0">
            <stop stopColor="#865DFF" stopOpacity="0" />
            <stop offset="0.6" stopColor="#865DFF" stopOpacity="0.6" />
            <stop offset="1" stopColor="#00D9FF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

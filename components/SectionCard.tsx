import { FadeIn } from '@/components/FadeIn';

export const SectionCard = () => {
        const cards = [
    {
      num: '01',
      title: 'Providers carry the denial.',
      desc: 'Billing teams spend weeks auditing, correcting, and resubmitting claims that could have been paid on day one if validated upstream.',
      numColorCode: '#0A1B33'
    },
    {
      num: '02',
      title: 'Payers carry the appeal.',
      desc: 'Administrative overhead compounds as multi-thousand page records are manually scanned, appealed, and reviewed through backlogs.',
      numColorCode: '#16376D'
    },
    {
      num: '03',
      title: 'Patients carry the friction.',
      desc: 'Delayed treatments, unexpected letters, and clinical confusion multiply. The clinical care bond is broken at the point of sale.',
      numColorCode: '#2563EB'
    },
  ]
    return(
         <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <FadeIn>
                    <p className="text-[#2563EB] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                      Our Mission
                    </p>
                  </FadeIn>
                  <FadeIn delay={0.1}>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1530] tracking-tight">
                      Validate every claim before it reaches the payer.
                    </h2>
                  </FadeIn>
                </div>
        
                <div className="grid md:grid-cols-3 gap-6">
                  {cards.map((card, index) => (
                    <FadeIn key={card.num} delay={0.2 + index * 0.1}>
                      <div className="bg-[#EEF2FA] rounded-xl p-8 h-full relative overflow-hidden group hover:shadow-md transition-shadow">
                        {/* Left accent line */}
                        <div className="absolute opacity-50 group-hover:opacity-100 transition-opacity" />
        
                        <div className="text-white text-xs font-bold w-8 h-8 rounded flex items-center justify-center mb-6"
                        style={{backgroundColor: card.numColorCode}}
                        >
                          {card.num}
                        </div>
        
                        <h3 className="text-xl font-bold text-[#0A1530] mb-3">
                          {card.title}
                        </h3>
        
                        <p className="text-slate-600 leading-relaxed text-sm">
                          {card.desc}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </section>
    )
}
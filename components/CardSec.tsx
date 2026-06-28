import { ChevronRight } from "lucide-react";

  export const PrecisionSection = () => {
    const cards = [
      {
        title: 'Real-time Claims Monitoring',
        desc: 'Proactive revenue monitoring to catch failures before they happen.'
      },
      {
        title: 'Global Registry',
        desc: 'Proactive revenue monitoring to catch failures before they happen.'
      },
      {
        title: 'Real-time Claims Monitoring',
        desc: 'Proactive revenue monitoring to catch failures before they happen.'
      },
      {
        title: 'Real-time Claims Monitoring',
        desc: 'Proactive revenue monitoring to catch failures before they happen.'
      }];

    return (
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 py-24 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-blue-300 text-sm font-bold tracking-widest uppercase mb-2">
                The Grelin Loop
              </p>
              <h2 className="text-5xl font-bold text-white">
                Precision Intelligence.
              </h2>
            </div>
            <button className="hidden md:flex bg-white text-[#0B1C30] px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#354151] transition-colors items-center gap-2">
              Explore All Features <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
            {cards.map((card, idx) =>
              <div
                key={idx}
                className="min-w-[300px] md:min-w-[350px] bg-white rounded-2xl p-6 snap-start shadow-xl">

                <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-6"></div>
                <h4 className="text-lg font-bold text-[#0B1C30] mb-2">
                  {card.title}
                </h4>
                <p className="text-[#354151] text-sm">{card.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>);

  };
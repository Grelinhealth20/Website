import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Link2, FileText, Lock, Stethoscope } from "lucide-react";
import { useRouter } from "next/navigation";

type Article = {
  category: string;
  title: string;
  readTime: string;
  gradient: string;
  badge: string;
  badgeText: string;
  imageBg: string;
  icon: React.ReactNode;
  centerIcon: React.ReactNode;
  link: string;
};

const articles: Article[] = [
  {
    category: "REVENUE INTEGRITY",
    title: "The Difference Between a Correctly Coded Claim and a Payable One",
    readTime: "5 min read",
    gradient: "from-[#4a6fa5] to-[#3a5a8a]",
    badge: "bg-[#1a2942] text-[#5b9bd5] border border-[#2d4a73]",
    badgeText: "REVENUE INTEGRITY",
    imageBg: "bg-gradient-to-br from-[#5b7eb5] to-[#3a5a8a]",
    icon: <Link2 className="w-3 h-3" />,
    centerIcon: <FileText className="w-12 h-12 text-white/90" strokeWidth={1.5} />,
    link: "https://www.healthcareittoday.com/2026/05/26/the-difference-between-a-correctly-coded-claim-and-a-payable-one/",

  }
];

export function NewsCard() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#C0E1FF] px-6 py-16 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-[#1e3a5f]" />
              <span className="text-xs font-semibold tracking-widest text-[#1e3a5f]">GRELIN PRESS</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#2B4470] tracking-tight mb-4">
              Insights & news
            </h1>
            <p className="text-base md:text-lg text-[#4D5A73] max-w-md">
              Practical perspectives on revenue integrity, denial prevention, and healthcare billing operations.
            </p>
          </motion.div>

          <motion.button
          onClick={() => router.push("/resources/news")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center cursor-pointer gap-2 bg-[#0a1628] text-white px-6 py-3.5 rounded-lg font-medium text-sm self-start lg:self-auto hover:bg-[#1a2942] transition-colors"
          >
            View all news
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-[#0f1b2d] rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => router.push(article.link)}
            >
              {/* Image area */}
              <div className={`relative h-56 ${article.imageBg} overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    {article.centerIcon}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
              </div>

              {/* Content */}
              <div className="p-6 pt-7">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider mb-5 ${article.badge}`}>
                  {article.icon}
                  {article.badgeText}
                </div>

                <h2 className="text-xl font-bold text-white leading-snug mb-8 min-h-[5rem] group-hover:text-white/90 transition-colors">
                  {article.title}
                </h2>

                <div className="pt-5 border-t border-white/10 flex items-center gap-2 text-xs text-[#6b7a8f]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';
import grelinLogo from '../public/logo.svg';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";

const footerLinks = [
  {
    title: 'Platform',
    href: '/platform',
  },
  {
    title: 'Company',
    href: '/company',
  },
  {
    title: 'Solutions',
    href: '/solutions',
  },
  {
    title: 'Industries',
    href: '/industries',
  },
  {
    title: 'Resources',
    href: '/resources',
  },
  {
    title: 'Partners',
    href: '/partners',
  },
];


const socialLinks = [
  {
    icon: FaYoutube,
    href: 'https://www.youtube.com/@GrelinHealth',
    label: 'Youtube',
  },

  {
    icon: FaLinkedin,
    href: '',
    label: 'LinkedIn',
  },
  {
       icon: FaTwitter,
    href: 'https://x.com/GrelinHealth',
    label: 'Twitter', 
  },

  //     {
  //   icon: FaReddit ,
  //   href: 'https://grelinhealthinc.slack.com/archives/D0AU14Z6NTC/p1781018838666669',
  //   label: 'Reddit',
  // },
];

/* ─── Link data ──────────────────────────────────────────────────────────── */
const navLinks = [
	{
		label: "Privacy Policy", href: "/privacy-policy"
	},
		{
		label: "Terms of Service", href: "/terms-of-service"
	},

]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Footer() {
  return (
    <footer className="w-full bg-[#0B1C30] text-white">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto"
      >
        {/* Top Section */}
        <div className="flex flex-col gap-12 px-4 py-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
          {/* Left */}
          <motion.div
            variants={item}
            className="max-w-sm"
          >
            <img src={grelinLogo.src} alt="Grelin Logo" className="mb-4 h-6 w-18" />

            <p className="mb-4 text-[#94A3B8] text-[16px] font-normal leading-relaxed text-white/60">
              Revenue intelligence for healthcare
              <br />
              claims. Precision moving upstream.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="
                    mb-2
                      flex h-8 w-8 items-center justify-center
                      rounded-lg border border-white/10
                      text-white/80
                      transition-all duration-300
                      hover:border-white/30
                      hover:bg-white/5
                      hover:text-white
                    "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right Navigation */}
          <motion.div
            variants={item}
            className="
              grid
              grid-cols-2
              gap-x-20
              gap-y-6
              sm:gap-x-32
              mt-4
            "
          >
            {footerLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="
                  text-[14px]
                  text-white/90
                  transition-colors
                  duration-200
                  hover:text-white
                "
              >
                {link.title}
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10" />

        {/* Bottom Section */}
        <div
          className="
            flex flex-col gap-6
            px-6 py-6
            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:px-8
          "
        >
          <motion.p
            variants={item}
            className="
              text-sm
              text-[#C5C6CD]
            "
          >
            © {new Date().getFullYear()} Grelin Revenue Intelligence.
            Precision moving upstream.
          </motion.p>

          <motion.div
            variants={item}
            className="
              flex flex-wrap
              gap-x-8
              gap-y-3
            "
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="
                  text-sm
                  text-[#C5C6CD]
                  transition-colors
                  duration-200
                  hover:text-white
                "
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}

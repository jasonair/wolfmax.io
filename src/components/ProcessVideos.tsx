'use client';

import { motion } from 'framer-motion';

const videos = [
  {
    title: 'Essay Writing Process',
    duration: '3:42',
    tag: 'Student project',
    color: 'var(--brand-blue)',
    gradient: 'from-[#5384ED]/20 via-[#8C1BF6]/10 to-transparent',
  },
  {
    title: 'Logo Design Timelapse',
    duration: '2:18',
    tag: 'Creative project',
    color: 'var(--brand-purple)',
    gradient: 'from-[#8C1BF6]/20 via-[#FF265E]/10 to-transparent',
  },
  {
    title: 'Code Development Session',
    duration: '5:10',
    tag: 'Software project',
    color: 'var(--brand-green)',
    gradient: 'from-[#7EFCD8]/20 via-[#5384ED]/10 to-transparent',
  },
];

function VideoCard({
  video,
  index,
}: {
  video: (typeof videos)[number];
  index: number;
}) {
  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: 'easeOut' }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] transition-all duration-500 group-hover:bg-white/[0.05] group-hover:border-white/[0.12]">
        {/* Thumbnail area */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {/* Background gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${video.gradient}`}
          />

          {/* Decorative elements to simulate content */}
          <div className="absolute inset-0">
            {/* Faint grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            {/* Decorative shapes */}
            <div
              className="absolute top-6 left-6 w-16 h-2 rounded-full opacity-10"
              style={{ background: video.color }}
            />
            <div
              className="absolute top-6 right-6 w-8 h-2 rounded-full opacity-10"
              style={{ background: video.color }}
            />
            <div
              className="absolute bottom-16 left-6 right-6 h-px opacity-10"
              style={{ background: video.color }}
            />
          </div>

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: video.color }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.25, 0, 0.25],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.4,
                }}
              />
              <div
                className="relative w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm border"
                style={{
                  background: `color-mix(in srgb, ${video.color} 20%, transparent)`,
                  borderColor: `color-mix(in srgb, ${video.color} 40%, transparent)`,
                }}
              >
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  className="ml-0.5"
                >
                  <path
                    d="M16 8.268a2 2 0 0 1 0 3.464L4 18.66a2 2 0 0 1-3-1.732V3.072a2 2 0 0 1 3-1.732L16 8.268Z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Duration badge */}
          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/10">
            <span className="text-xs font-medium text-white/80">
              {video.duration}
            </span>
          </div>

          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at center, color-mix(in srgb, ${video.color} 8%, transparent), transparent 70%)`,
            }}
          />
        </div>

        {/* Info bar */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white mb-1">
                {video.title}
              </h3>
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: video.color }}
                />
                <span className="text-sm text-gray-500">{video.tag}</span>
              </div>
            </div>
            {/* Arrow icon */}
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: video.color }}
              initial={false}
              animate={{ x: 0 }}
              whileHover={{ x: 3 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-5 right-5 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${video.color}, transparent)`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
}

export function ProcessVideos() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
        <motion.p
          className="text-sm font-medium tracking-widest uppercase mb-4"
          style={{ color: 'var(--brand-purple)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Real examples
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Process Videos
        </motion.h2>
        <motion.p
          className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Watch real process recordings from Wolfmax users
        </motion.p>
      </div>

      {/* Video cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, i) => (
          <VideoCard key={video.title} video={video} index={i} />
        ))}
      </div>
    </section>
  );
}

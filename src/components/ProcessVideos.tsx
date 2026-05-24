'use client';

import { motion } from 'framer-motion';
import { Section } from './Section';
import { Wave } from './Wave';

const videos = [
  { title: 'Essay writing process', duration: '3:42', tag: 'Student project' },
  { title: 'Logo design timelapse', duration: '2:18', tag: 'Creative project' },
  { title: 'Code development session', duration: '5:10', tag: 'Software project' },
];

function VideoCard({ video, index }: { video: (typeof videos)[number]; index: number }) {
  return (
    <motion.div
      className="card-on-navy overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-800">
        <Wave className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-20 text-blue/25" strokeWidth={5} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-blue"
              animate={{ scale: [1, 1.5, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
            />
            <div className="relative w-14 h-14 rounded-full flex items-center justify-center bg-blue/20 border border-blue/40 backdrop-blur-sm transition-transform group-hover:scale-110">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" className="ml-0.5">
                <path d="M16 8.268a2 2 0 0 1 0 3.464L4 18.66a2 2 0 0 1-3-1.732V3.072a2 2 0 0 1 3-1.732L16 8.268Z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-navy/70 backdrop-blur-sm border border-cream/10">
          <span className="text-xs font-medium text-cream/80">{video.duration}</span>
        </div>
      </div>

      {/* Info bar */}
      <div className="p-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-cream mb-1">{video.title}</h3>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            <span className="text-sm text-cream/55">{video.tag}</span>
          </div>
        </div>
        <span className="text-blue opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </div>
    </motion.div>
  );
}

export function ProcessVideos() {
  return (
    <Section
      surface="navy"
      eyebrow="Real examples"
      title="Process videos"
      intro="Watch real process recordings from Workings users."
    >
      <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, i) => (
          <VideoCard key={video.title} video={video} index={i} />
        ))}
      </div>
    </Section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  IconPin,
  IconArchive,
  IconHeart,
  IconTag,
  IconColorSwatch,
  IconLock,
  IconCloud,
  IconMessageCircle,
} from '@tabler/icons-react';

const showcaseFeatures = [
  {
    icon: IconPin,
    title: 'Pin Important Notes',
    description: 'Keep your most important notes at the top',
  },
  {
    icon: IconArchive,
    title: 'Archive Old Notes',
    description: 'Hide notes without deleting them',
  },
  {
    icon: IconHeart,
    title: 'Mark Favorites',
    description: 'Quick access to your favorite notes',
  },
  {
    icon: IconTag,
    title: 'Unlimited Tags',
    description: 'Organize with custom tags',
  },
  {
    icon: IconColorSwatch,
    title: '13 Color Options',
    description: 'Visual organization with colors',
  },
  {
    icon: IconLock,
    title: 'Local-Only Mode',
    description: 'Keep sensitive notes on device',
  },
  {
    icon: IconCloud,
    title: 'Cloud Sync',
    description: 'Access from any device',
  },
  {
    icon: IconMessageCircle,
    title: 'Comments',
    description: 'Discuss notes with collaborators',
  },
];

export default function Showcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="showcase" className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need,
            <span className="gradient-text"> Nothing You Don't</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Designed for productivity, built for simplicity
          </p>
        </motion.div>

        {/* Main Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass p-8 md:p-12 rounded-3xl mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-white">
                Guest Mode Available
              </h3>
              <p className="text-gray-400 mb-6">
                Start using CollabNotes immediately without any sign-up. Your notes are saved locally 
                and you can sign in later to enable cloud sync without losing any data.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="glass px-4 py-2 rounded-full text-sm">
                  <span className="text-green-400">✓</span> No Sign-up Required
                </div>
                <div className="glass px-4 py-2 rounded-full text-sm">
                  <span className="text-green-400">✓</span> Instant Access
                </div>
                <div className="glass px-4 py-2 rounded-full text-sm">
                  <span className="text-green-400">✓</span> Data Preserved
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {showcaseFeatures.slice(0, 4).map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="glass p-4 rounded-xl text-center"
                >
                  <feature.icon size={32} className="mx-auto mb-2 text-indigo-400" />
                  <p className="text-sm font-medium text-white">{feature.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {showcaseFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass p-6 rounded-xl text-center group cursor-pointer"
            >
              <feature.icon size={32} className="mx-auto mb-3 text-indigo-400 group-hover:text-purple-400 transition-colors" />
              <h4 className="text-sm font-bold mb-1 text-white">{feature.title}</h4>
              <p className="text-xs text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { value: '25+', label: 'Features' },
            { value: '13', label: 'Color Options' },
            { value: '100%', label: 'Offline Support' },
            { value: '0', label: 'Tracking' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

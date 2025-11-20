'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  IconCloudLock,
  IconDeviceMobile,
  IconUsers,
  IconPalette,
  IconBolt,
  IconShieldCheck,
  IconTextSize,
  IconTags,
  IconSearch,
} from '@tabler/icons-react';

const features = [
  {
    icon: IconDeviceMobile,
    title: 'Offline First',
    description: 'Works perfectly without internet. All notes stored locally with instant access.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: IconCloudLock,
    title: 'Selective Cloud Sync',
    description: 'Choose which notes to sync. Keep sensitive data local, sync what you need.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: IconTextSize,
    title: 'Rich Text Editor',
    description: 'Full formatting support with bold, italic, lists, code blocks, and more.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: IconUsers,
    title: 'Real-time Collaboration',
    description: 'Share notes with team members and see changes instantly with comments.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: IconPalette,
    title: 'Color & Tags',
    description: 'Organize with 13 colors and unlimited tags. Visual organization made easy.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: IconBolt,
    title: 'Lightning Fast',
    description: 'Optimized performance with instant search and smooth animations.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: IconShieldCheck,
    title: 'Privacy First',
    description: 'Your data, your control. No tracking, no analytics, complete privacy.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: IconSearch,
    title: 'Powerful Search',
    description: 'Find anything instantly. Search by title, content, tags, or color.',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: IconTags,
    title: 'Smart Organization',
    description: 'Pin, archive, favorite, and organize notes exactly how you want.',
    color: 'from-violet-500 to-purple-500',
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for
            <span className="gradient-text"> Modern Note-Taking</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to capture, organize, and collaborate on your ideas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass p-6 rounded-2xl group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

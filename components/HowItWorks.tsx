'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { IconDownload, IconEdit, IconCloudUpload, IconUsers } from '@tabler/icons-react';

const steps = [
  {
    icon: IconDownload,
    title: 'Download & Install',
    description: 'Get CollabNotes from Google Play Store. No sign-up required to start.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: IconEdit,
    title: 'Create Notes',
    description: 'Start writing immediately. Rich text formatting, colors, and tags at your fingertips.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: IconCloudUpload,
    title: 'Sync to Cloud',
    description: 'Sign in with Google to enable cloud sync. Choose which notes to sync.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: IconUsers,
    title: 'Collaborate',
    description: 'Share notes with team members. Real-time updates and comments included.',
    color: 'from-green-500 to-emerald-500',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get Started in
            <span className="gradient-text"> 4 Simple Steps</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From download to collaboration in minutes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent -z-10" />
              )}

              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 glow`}
                >
                  <step.icon size={40} className="text-white" />
                </motion.div>
                
                <div className="glass p-6 rounded-2xl">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { IconBrandGooglePlay, IconSparkles, IconCloud, IconDeviceMobile } from '@tabler/icons-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full">
            <IconSparkles size={20} className="text-yellow-400" />
            <span className="text-sm text-gray-300">Now Available on Android</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Your Notes,
          <br />
          <span className="gradient-text">Everywhere You Go</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          A modern note-taking app with offline-first architecture, cloud sync, and real-time collaboration. 
          Start creating without limits.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="/login"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-8 py-4 gradient-bg rounded-full text-white font-medium glow"
          >
            <IconCloud size={24} />
            <span>Try Web App</span>
          </motion.a>
          <motion.a
            href="#download"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-8 py-4 glass rounded-full text-white font-medium"
          >
            <IconBrandGooglePlay size={24} />
            <span>Download on Google Play</span>
          </motion.a>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-8 py-4 glass rounded-full text-white font-medium"
          >
            <span>Explore Features</span>
          </motion.a>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-16"
        >
          {[
            { icon: IconDeviceMobile, text: 'Offline First' },
            { icon: IconCloud, text: 'Cloud Sync' },
            { icon: IconSparkles, text: 'Rich Text Editor' },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex items-center space-x-2 glass px-4 py-2 rounded-full"
            >
              <item.icon size={20} className="text-indigo-400" />
              <span className="text-sm text-gray-300">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

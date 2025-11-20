'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { IconBrandGooglePlay, IconBrandAndroid, IconDeviceMobile } from '@tabler/icons-react';

export default function Download() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="download" className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass p-12 md:p-16 rounded-3xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center glow"
            >
              <IconBrandAndroid size={48} className="text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Download CollabNotes now and experience the future of note-taking
            </p>

            <motion.a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-3 px-10 py-5 gradient-bg rounded-full text-white font-medium text-lg glow"
            >
              <IconBrandGooglePlay size={32} />
              <div className="text-left">
                <div className="text-xs opacity-80">GET IT ON</div>
                <div className="font-bold">Google Play</div>
              </div>
            </motion.a>

            {/* App Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: IconDeviceMobile, label: 'Android 5.0+', value: 'Compatible' },
                { icon: IconBrandAndroid, label: 'App Size', value: '57.5 MB' },
                { icon: IconBrandGooglePlay, label: 'Version', value: '1.0.0' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="glass p-6 rounded-xl"
                >
                  <item.icon size={32} className="mx-auto mb-3 text-indigo-400" />
                  <div className="text-sm text-gray-400 mb-1">{item.label}</div>
                  <div className="font-bold text-white">{item.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Coming Soon */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <p className="text-gray-400 mb-4">Coming Soon</p>
              <div className="flex flex-wrap justify-center gap-4">
                {['iOS', 'Web', 'Desktop'].map((platform, index) => (
                  <div
                    key={index}
                    className="glass px-6 py-3 rounded-full text-sm text-gray-400"
                  >
                    {platform}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

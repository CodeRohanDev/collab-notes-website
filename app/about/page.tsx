'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconArrowLeft, IconTarget, IconHeart, IconUsers, IconRocket } from '@tabler/icons-react';

export default function About() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] relative">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <IconArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center">
            <IconHeart size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">CollabNotes</span>
          </h1>
          <p className="text-gray-400">Building the future of note-taking</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="glass p-8 md:p-12 rounded-3xl space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              CollabNotes was born from a simple idea: note-taking should be effortless, private, and accessible anywhere. 
              We noticed that existing solutions forced users to choose between privacy and convenience, between offline access and cloud sync.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We built CollabNotes to eliminate these compromises. With our offline-first architecture and selective cloud sync, 
              you get the best of both worlds—complete control over your data with the flexibility to collaborate when you need it.
            </p>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4">
              <IconTarget size={24} className="text-indigo-400" />
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              To empower individuals and teams with a note-taking tool that respects their privacy, works seamlessly offline, 
              and enables effortless collaboration—all while maintaining the highest standards of security and user experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Core Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3">
                  <IconHeart size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Privacy First</h3>
                <p className="text-gray-400">Your data belongs to you. We never sell or share your information.</p>
              </div>

              <div className="glass p-6 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3">
                  <IconUsers size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">User-Centric</h3>
                <p className="text-gray-400">Every feature is designed with your needs and feedback in mind.</p>
              </div>

              <div className="glass p-6 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-3">
                  <IconRocket size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Innovation</h3>
                <p className="text-gray-400">Constantly improving and adding features that matter.</p>
              </div>

              <div className="glass p-6 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-3">
                  <IconTarget size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Simplicity</h3>
                <p className="text-gray-400">Powerful features wrapped in an intuitive, clean interface.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Why CollabNotes?</h2>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-gray-300"><strong className="text-white">Offline-First:</strong> Works perfectly without internet connection</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-gray-300"><strong className="text-white">Selective Sync:</strong> You choose what goes to the cloud</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-gray-300"><strong className="text-white">No Tracking:</strong> Zero analytics or data collection</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-gray-300"><strong className="text-white">Guest Mode:</strong> Start using immediately without sign-up</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-gray-300"><strong className="text-white">Open Development:</strong> Built with user feedback</span>
              </li>
            </ul>
          </section>

          <section className="border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Get Started Today</h2>
            <p className="text-gray-300 mb-6">
              Join thousands of users who trust CollabNotes for their note-taking needs.
            </p>
            <Link href="/#download" className="inline-flex items-center space-x-2 px-8 py-4 gradient-bg rounded-full text-white font-medium glow">
              <span>Download Now</span>
            </Link>
          </section>
        </motion.div>
      </div>
    </main>
  );
}

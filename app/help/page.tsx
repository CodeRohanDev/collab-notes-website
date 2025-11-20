'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  IconArrowLeft, 
  IconHelp, 
  IconBook, 
  IconQuestionMark, 
  IconMail,
  IconDownload,
  IconCloud,
  IconUsers,
  IconShieldCheck
} from '@tabler/icons-react';

const helpTopics = [
  {
    icon: IconDownload,
    title: 'Getting Started',
    description: 'Learn how to download, install, and set up CollabNotes',
    link: '/faq#getting-started',
  },
  {
    icon: IconBook,
    title: 'Features Guide',
    description: 'Explore all features and how to use them effectively',
    link: '/faq#features',
  },
  {
    icon: IconCloud,
    title: 'Cloud Sync',
    description: 'Understand how cloud sync works and how to enable it',
    link: '/faq#technical',
  },
  {
    icon: IconUsers,
    title: 'Collaboration',
    description: 'Share notes and collaborate with your team',
    link: '/faq#collaboration',
  },
  {
    icon: IconShieldCheck,
    title: 'Privacy & Security',
    description: 'Learn about data protection and privacy features',
    link: '/faq#privacy',
  },
  {
    icon: IconQuestionMark,
    title: 'Troubleshooting',
    description: 'Fix common issues and problems',
    link: '/faq#troubleshooting',
  },
];

export default function Help() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] relative">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <IconArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center">
            <IconHelp size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Help <span className="gradient-text">Center</span>
          </h1>
          <p className="text-gray-400">Find guides, tutorials, and answers to your questions</p>
        </motion.div>

        {/* Help Topics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {helpTopics.map((topic, index) => (
            <Link
              key={index}
              href={topic.link}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-6 rounded-2xl h-full cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <topic.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
                <p className="text-gray-400">{topic.description}</p>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass p-8 md:p-12 rounded-3xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Links</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/faq" className="flex items-center space-x-4 p-4 glass rounded-xl hover:bg-white/5 transition-colors">
              <IconQuestionMark size={24} className="text-indigo-400" />
              <div>
                <h3 className="font-bold text-white">FAQ</h3>
                <p className="text-sm text-gray-400">Frequently asked questions</p>
              </div>
            </Link>

            <Link href="/contact" className="flex items-center space-x-4 p-4 glass rounded-xl hover:bg-white/5 transition-colors">
              <IconMail size={24} className="text-indigo-400" />
              <div>
                <h3 className="font-bold text-white">Contact Support</h3>
                <p className="text-sm text-gray-400">Get help from our team</p>
              </div>
            </Link>

            <Link href="/privacy" className="flex items-center space-x-4 p-4 glass rounded-xl hover:bg-white/5 transition-colors">
              <IconShieldCheck size={24} className="text-indigo-400" />
              <div>
                <h3 className="font-bold text-white">Privacy Policy</h3>
                <p className="text-sm text-gray-400">How we protect your data</p>
              </div>
            </Link>

            <Link href="/terms" className="flex items-center space-x-4 p-4 glass rounded-xl hover:bg-white/5 transition-colors">
              <IconBook size={24} className="text-indigo-400" />
              <div>
                <h3 className="font-bold text-white">Terms of Service</h3>
                <p className="text-sm text-gray-400">Usage terms and conditions</p>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-4">Can't find what you're looking for?</h3>
          <p className="text-gray-400 mb-6">Our support team is ready to help you</p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 gradient-bg rounded-full text-white font-medium glow"
          >
            <IconMail size={20} />
            <span>Contact Support</span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

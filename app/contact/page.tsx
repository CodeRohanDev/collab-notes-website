'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconArrowLeft, IconMail, IconBrandGithub, IconBrandTwitter, IconMessageCircle } from '@tabler/icons-react';

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <IconArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center">
            <IconMessageCircle size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-gray-400">We'd love to hear from you</p>
        </motion.div>

        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {/* Email Support */}
          <motion.a
            href="mailto:support@collabnotes.com"
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass p-8 rounded-2xl group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <IconMail size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
            <p className="text-gray-400 mb-4">Get help with any issues or questions</p>
            <p className="text-indigo-400 font-medium">support@collabnotes.com</p>
          </motion.a>

          {/* General Inquiries */}
          <motion.a
            href="mailto:hello@collabnotes.com"
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass p-8 rounded-2xl group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <IconMessageCircle size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">General Inquiries</h3>
            <p className="text-gray-400 mb-4">Questions about CollabNotes</p>
            <p className="text-indigo-400 font-medium">hello@collabnotes.com</p>
          </motion.a>
        </motion.div>

        {/* Additional Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass p-8 md:p-12 rounded-3xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Other Ways to Reach Us</h2>
          
          <div className="space-y-6">
            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="flex items-center space-x-3 glass px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <IconBrandGithub size={24} className="text-gray-400" />
                  <span className="text-gray-300">GitHub</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 glass px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <IconBrandTwitter size={24} className="text-gray-400" />
                  <span className="text-gray-300">Twitter</span>
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">How do I enable cloud sync?</h4>
                  <p className="text-gray-400">Sign in with Google, then toggle sync for individual notes in the note options menu.</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Is my data secure?</h4>
                  <p className="text-gray-400">Yes! All data is encrypted in transit and at rest. Local notes never leave your device unless you enable sync.</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Can I use CollabNotes offline?</h4>
                  <p className="text-gray-400">Absolutely! CollabNotes works perfectly offline. All notes are stored locally on your device.</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">How do I delete my account?</h4>
                  <p className="text-gray-400">Go to Settings → Account → Delete Account. This will permanently remove all your data.</p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Response Time</h3>
              <p className="text-gray-400">
                We typically respond to all inquiries within 24-48 hours during business days. 
                For urgent issues, please mark your email as "Urgent" in the subject line.
              </p>
            </div>

            {/* Business Hours */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Support Hours</h3>
              <p className="text-gray-400">
                Monday - Friday: 9:00 AM - 6:00 PM (Your Local Time)
              </p>
              <p className="text-gray-400 mt-2">
                Weekend inquiries will be addressed on the next business day.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Legal Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 mb-4">For legal matters, please refer to:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/terms" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

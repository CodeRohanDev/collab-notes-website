'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconArrowLeft, IconShieldCheck, IconLock, IconDatabase } from '@tabler/icons-react';

export default function PrivacyPolicy() {
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
            <IconShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-gray-400">Last Updated: November 19, 2024</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass p-8 md:p-12 rounded-3xl space-y-8"
        >
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              CollabNotes ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <IconDatabase size={24} className="text-indigo-400" />
              <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Personal Information</h3>
                <p className="text-gray-300 leading-relaxed mb-2">
                  When you sign in with Google, we collect:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Email address</li>
                  <li>Display name</li>
                  <li>Profile picture (optional)</li>
                  <li>Google account ID</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Note Data</h3>
                <p className="text-gray-300 leading-relaxed mb-2">
                  We store the following information about your notes:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Note content (text, formatting)</li>
                  <li>Note metadata (title, creation date, tags, colors)</li>
                  <li>Collaboration data (shared users, comments)</li>
                  <li>Sync preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Guest Mode</h3>
                <p className="text-gray-300 leading-relaxed">
                  When using Guest Mode, we only store a randomly generated unique identifier on your device. No personal information is collected.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>To provide and maintain our service</li>
              <li>To sync your notes across devices</li>
              <li>To enable collaboration features</li>
              <li>To authenticate your account</li>
              <li>To improve our application</li>
              <li>To respond to your requests and support needs</li>
            </ul>
          </section>

          {/* Data Storage */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <IconLock size={24} className="text-indigo-400" />
              <h2 className="text-2xl font-bold text-white">Data Storage and Security</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Local Storage</h3>
                <p className="text-gray-300 leading-relaxed">
                  All notes are stored locally on your device using Hive database. This data remains on your device unless you enable cloud sync.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Cloud Storage</h3>
                <p className="text-gray-300 leading-relaxed">
                  When you enable cloud sync, your notes are stored in Firebase Firestore with industry-standard encryption. You control which notes are synced.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Security Measures</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>HTTPS encryption for all data transmission</li>
                  <li>Firebase Authentication for secure sign-in</li>
                  <li>Firestore security rules to protect your data</li>
                  <li>Local encryption support via Hive</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Sharing and Disclosure</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>With Your Consent:</strong> When you share notes with collaborators</li>
              <li><strong>Service Providers:</strong> Firebase/Google Cloud for hosting and authentication</li>
              <li><strong>Legal Requirements:</strong> If required by law or to protect our rights</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Your Privacy Rights</h2>
            <p className="text-gray-300 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Access:</strong> Request a copy of your data</li>
              <li><strong>Correction:</strong> Update or correct your information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Export:</strong> Download your notes data</li>
              <li><strong>Opt-out:</strong> Disable cloud sync at any time</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              CollabNotes uses the following third-party services:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Google Sign-In:</strong> For authentication (Google Privacy Policy applies)</li>
              <li><strong>Firebase:</strong> For cloud storage and authentication (Firebase Privacy Policy applies)</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              CollabNotes is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
            <p className="text-gray-300 leading-relaxed">
              We retain your information for as long as your account is active or as needed to provide services. You can delete your account and all associated data at any time through the app settings.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="glass p-6 rounded-xl">
              <p className="text-gray-300">
                <strong className="text-white">Email:</strong> privacy@collabnotes.com
              </p>
              <p className="text-gray-300 mt-2">
                <strong className="text-white">Support:</strong> <Link href="/contact" className="text-indigo-400 hover:text-indigo-300">Contact Form</Link>
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}

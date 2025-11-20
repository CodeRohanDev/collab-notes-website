'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconArrowLeft, IconFileText, IconAlertCircle } from '@tabler/icons-react';

export default function TermsOfService() {
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
            <IconFileText size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of <span className="gradient-text">Service</span>
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
            <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing or using CollabNotes mobile application, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the application.
            </p>
          </section>

          {/* License */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">License to Use</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              CollabNotes grants you a personal, non-exclusive, non-transferable, limited license to use the application for your personal or internal business purposes, subject to these Terms.
            </p>
            <div className="glass p-6 rounded-xl">
              <div className="flex items-start space-x-3">
                <IconAlertCircle size={24} className="text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">You May Not:</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                    <li>Modify, copy, or create derivative works</li>
                    <li>Reverse engineer or decompile the application</li>
                    <li>Remove any copyright or proprietary notices</li>
                    <li>Transfer, sell, or sublicense the application</li>
                    <li>Use the application for illegal purposes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">User Accounts</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Account Creation</h3>
                <p className="text-gray-300 leading-relaxed">
                  You may use CollabNotes as a guest or create an account using Google Sign-In. You are responsible for maintaining the confidentiality of your account credentials.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Account Responsibilities</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for all activities under your account</li>
                  <li>You must notify us immediately of any unauthorized access</li>
                  <li>You must not share your account with others</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Content */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">User Content</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Your Content</h3>
                <p className="text-gray-300 leading-relaxed">
                  You retain all rights to the notes and content you create in CollabNotes. By using our cloud sync feature, you grant us a license to store, process, and transmit your content solely to provide the service.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Content Restrictions</h3>
                <p className="text-gray-300 leading-relaxed mb-2">You agree not to create or share content that:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Violates any laws or regulations</li>
                  <li>Infringes on intellectual property rights</li>
                  <li>Contains malware or harmful code</li>
                  <li>Is abusive, threatening, or harassing</li>
                  <li>Contains spam or unauthorized advertising</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Service Availability */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Service Availability</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We strive to provide reliable service, but we do not guarantee that:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>The service will be uninterrupted or error-free</li>
              <li>Defects will be corrected immediately</li>
              <li>The service will be available at all times</li>
              <li>Data loss will never occur (we recommend regular backups)</li>
            </ul>
          </section>

          {/* Cloud Sync */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Cloud Sync Service</h2>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Cloud sync is an optional feature. When enabled:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Your selected notes are stored on Firebase servers</li>
                <li>You can access synced notes from multiple devices</li>
                <li>You control which notes are synced</li>
                <li>You can disable sync at any time</li>
              </ul>
              <div className="glass p-6 rounded-xl">
                <p className="text-gray-300">
                  <strong className="text-white">Note:</strong> Local-only notes remain on your device and are never transmitted to our servers.
                </p>
              </div>
            </div>
          </section>

          {/* Collaboration */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Collaboration Features</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              When you share notes with collaborators:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Collaborators can view and edit shared notes</li>
              <li>You are responsible for managing access permissions</li>
              <li>You should only share with trusted individuals</li>
              <li>Comments and changes are visible to all collaborators</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The CollabNotes application, including its design, code, features, and branding, is owned by us and protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our trademarks and trade dress may not be used without our prior written permission.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">By You</h3>
                <p className="text-gray-300 leading-relaxed">
                  You may stop using CollabNotes at any time. You can delete your account and all associated data through the app settings.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">By Us</h3>
                <p className="text-gray-300 leading-relaxed">
                  We may suspend or terminate your access if you violate these Terms or engage in conduct that we deem harmful to other users or our service.
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Disclaimers</h2>
            <div className="glass p-6 rounded-xl border-l-4 border-yellow-400">
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong className="text-white">THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.</strong>
              </p>
              <p className="text-gray-300 leading-relaxed">
                We disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the service will meet your requirements or be error-free.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              To the maximum extent permitted by law, CollabNotes shall not be liable for:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Any indirect, incidental, special, or consequential damages</li>
              <li>Loss of data, profits, or business opportunities</li>
              <li>Service interruptions or data breaches</li>
              <li>Actions of third parties or collaborators</li>
            </ul>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Indemnification</h2>
            <p className="text-gray-300 leading-relaxed">
              You agree to indemnify and hold harmless CollabNotes from any claims, damages, losses, or expenses arising from your use of the service, violation of these Terms, or infringement of any rights of another party.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of material changes through the app or via email. Your continued use of the service after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="glass p-6 rounded-xl">
              <p className="text-gray-300">
                <strong className="text-white">Email:</strong> legal@collabnotes.com
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

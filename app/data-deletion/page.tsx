'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconArrowLeft, IconTrash, IconAlertTriangle } from '@tabler/icons-react';

export default function DataDeletion() {
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
            <IconTrash size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Data <span className="gradient-text">Deletion</span>
          </h1>
          <p className="text-gray-400">How to delete your account and data</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="glass p-8 md:p-12 rounded-3xl space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Your Right to Delete Data</h2>
            <p className="text-gray-300 leading-relaxed">
              At CollabNotes, we respect your right to control your data. You can delete your account and all associated data at any time, 
              directly from the app or by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How to Delete Your Account</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Method 1: In-App Deletion</h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-2 ml-4">
                  <li>Open CollabNotes app</li>
                  <li>Go to <strong className="text-white">Settings</strong></li>
                  <li>Tap on <strong className="text-white">Account</strong></li>
                  <li>Scroll down and tap <strong className="text-white">Delete Account</strong></li>
                  <li>Confirm your decision</li>
                  <li>Your account and all cloud data will be permanently deleted</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Method 2: Email Request</h3>
                <p className="text-gray-300 mb-3">
                  If you cannot access the app, send an email to:
                </p>
                <div className="glass p-6 rounded-xl">
                  <p className="text-white font-medium mb-2">Email: privacy@collabnotes.com</p>
                  <p className="text-gray-400 text-sm mb-3">Subject: Account Deletion Request</p>
                  <p className="text-gray-300 text-sm">
                    Include your registered email address and we'll process your request within 48 hours.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start space-x-3 mb-4">
              <IconAlertTriangle size={24} className="text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">What Gets Deleted</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Immediately Deleted:</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Your account information (email, display name, profile picture)</li>
                  <li>All cloud-synced notes and their content</li>
                  <li>Shared notes where you are the owner</li>
                  <li>Your comments on shared notes</li>
                  <li>All tags, colors, and note metadata</li>
                  <li>Collaboration history</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Local Device Data:</h3>
                <p className="text-gray-300 mb-2">
                  Notes stored locally on your device will remain until you:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Uninstall the CollabNotes app</li>
                  <li>Clear app data from device settings</li>
                  <li>Manually delete local notes before account deletion</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Important Notes</h2>
            <div className="glass p-6 rounded-xl border-l-4 border-red-400">
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 mt-1">⚠</span>
                  <span><strong className="text-white">This action is permanent</strong> and cannot be undone</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 mt-1">⚠</span>
                  <span>Shared notes you own will be deleted for all collaborators</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 mt-1">⚠</span>
                  <span>You will lose access to notes shared with you by others</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 mt-1">⚠</span>
                  <span>There is no way to recover deleted data</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              After account deletion:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>All personal data is immediately removed from active systems</li>
              <li>Backup systems are purged within 30 days</li>
              <li>Some anonymized usage statistics may be retained for service improvement</li>
              <li>Legal or regulatory requirements may require retention of certain data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Alternative: Export Your Data</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Before deleting your account, you may want to export your notes:
            </p>
            <div className="glass p-6 rounded-xl">
              <p className="text-gray-300 mb-3">
                Currently, you can manually copy your note content. We're working on an automated export feature.
              </p>
              <p className="text-gray-400 text-sm">
                For bulk export assistance, contact support@collabnotes.com
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Guest Mode Users</h2>
            <p className="text-gray-300 leading-relaxed">
              If you're using Guest Mode (not signed in), your notes are only stored locally on your device. 
              Simply uninstall the app to remove all data. No account deletion is necessary.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Need Help?</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              If you have questions about data deletion or need assistance, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 gradient-bg rounded-full text-white font-medium glow"
              >
                <span>Contact Support</span>
              </Link>
              <Link
                href="/privacy"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 glass rounded-full text-white font-medium"
              >
                <span>Privacy Policy</span>
              </Link>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}

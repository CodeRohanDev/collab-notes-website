'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconArrowLeft, IconCookie } from '@tabler/icons-react';

export default function CookiesPolicy() {
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
            <IconCookie size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cookies <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-gray-400">Last Updated: November 19, 2024</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="glass p-8 md:p-12 rounded-3xl space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              This Cookies Policy explains how CollabNotes uses cookies and similar technologies in our mobile application and website. 
              By using our services, you agree to the use of cookies as described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Cookies are small text files that are stored on your device when you use an application or visit a website. 
              They help us provide you with a better experience by remembering your preferences and settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Mobile App - No Cookies</h2>
            <div className="glass p-6 rounded-xl border-l-4 border-green-400">
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">Good news!</strong> The CollabNotes mobile application does not use cookies. 
                Instead, we use local storage mechanisms provided by your device's operating system to store your preferences and data.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Website Cookies</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our website (collabnotes.com) uses minimal cookies for essential functionality:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Essential Cookies</h3>
                <p className="text-gray-300 leading-relaxed mb-2">
                  These cookies are necessary for the website to function properly:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Session management</li>
                  <li>Security features</li>
                  <li>Load balancing</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Analytics Cookies (Optional)</h3>
                <p className="text-gray-300 leading-relaxed">
                  We do not currently use analytics cookies. If we implement them in the future, you will be notified and given the option to opt-out.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Local Storage in Mobile App</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Instead of cookies, the CollabNotes app uses local storage to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Store your notes locally on your device</li>
              <li>Remember your app preferences and settings</li>
              <li>Cache data for offline access</li>
              <li>Maintain your session when signed in</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              This data is stored securely on your device and is not transmitted to our servers unless you enable cloud sync.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use the following third-party services that may use their own cookies or similar technologies:
            </p>
            <div className="space-y-3">
              <div className="glass p-4 rounded-xl">
                <h4 className="font-semibold text-white mb-2">Google Sign-In</h4>
                <p className="text-gray-300 text-sm">
                  When you sign in with Google, Google's cookies and privacy policy apply. 
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 ml-1">
                    Learn more
                  </a>
                </p>
              </div>
              <div className="glass p-4 rounded-xl">
                <h4 className="font-semibold text-white mb-2">Firebase</h4>
                <p className="text-gray-300 text-sm">
                  Firebase services may use cookies for authentication and analytics. 
                  <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 ml-1">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Managing Cookies</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Website</h3>
                <p className="text-gray-300 leading-relaxed">
                  You can control and delete cookies through your browser settings. Note that disabling essential cookies may affect website functionality.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Mobile App</h3>
                <p className="text-gray-300 leading-relaxed">
                  To clear app data, go to your device settings → Apps → CollabNotes → Clear Data. 
                  Note that this will delete all local notes and settings.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Your Choices</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Use Guest Mode to avoid any account-related data storage</li>
              <li>Disable cloud sync to keep all data local</li>
              <li>Clear app data at any time from device settings</li>
              <li>Delete your account to remove all cloud data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Updates to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Cookies Policy from time to time. We will notify you of any changes by updating the "Last Updated" date 
              at the top of this policy.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have questions about our use of cookies, please contact us:
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

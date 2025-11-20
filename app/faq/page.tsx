'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconArrowLeft, IconQuestionMark, IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'Do I need to create an account to use CollabNotes?',
        a: 'No! You can start using CollabNotes immediately in Guest Mode without any sign-up. Your notes will be saved locally on your device. You can sign in later with Google if you want to enable cloud sync.'
      },
      {
        q: 'How do I enable cloud sync?',
        a: 'Sign in with your Google account, then open any note and tap the options menu. Toggle "Enable Sync" for that specific note. You can choose which notes to sync and which to keep local-only.'
      },
      {
        q: 'Is CollabNotes free?',
        a: 'Yes! CollabNotes is completely free to download and use with all features included. There are no premium tiers or hidden costs.'
      },
    ]
  },
  {
    category: 'Features & Usage',
    questions: [
      {
        q: 'Can I use CollabNotes offline?',
        a: 'Absolutely! CollabNotes is built with an offline-first architecture. All your notes are stored locally on your device, so you can create, edit, and view notes without any internet connection.'
      },
      {
        q: 'How do I format text in my notes?',
        a: 'CollabNotes includes a rich text editor with formatting options like bold, italic, underline, lists, code blocks, and more. Simply select text and use the formatting toolbar that appears.'
      },
      {
        q: 'Can I organize notes with colors and tags?',
        a: 'Yes! You can assign one of 13 colors to each note and add unlimited tags. Use the note options menu to set colors and manage tags for better organization.'
      },
      {
        q: 'What is the difference between pinning and favoriting?',
        a: 'Pinned notes stay at the top of your notes list for quick access. Favorites are marked with a heart icon and can be filtered separately. You can use both features together!'
      },
    ]
  },
  {
    category: 'Collaboration',
    questions: [
      {
        q: 'How do I share notes with others?',
        a: 'Open a note, tap the share icon, and enter the email addresses of people you want to collaborate with. They\'ll need to have CollabNotes installed and be signed in to access shared notes.'
      },
      {
        q: 'Can collaborators edit my notes?',
        a: 'Yes, collaborators have full edit access to shared notes. Changes sync in real-time, and you can see who made what changes. You can remove collaborators at any time.'
      },
      {
        q: 'How do comments work?',
        a: 'In shared notes, you and your collaborators can add comments to discuss the content. Comments appear in a separate section and update in real-time.'
      },
    ]
  },
  {
    category: 'Privacy & Security',
    questions: [
      {
        q: 'Is my data secure?',
        a: 'Yes! All data transmission uses HTTPS encryption. Cloud-synced notes are stored in Firebase with industry-standard security. Local notes never leave your device unless you enable sync.'
      },
      {
        q: 'Can I keep some notes private?',
        a: 'Absolutely! By default, notes are local-only. You choose which notes to sync to the cloud. Local-only notes remain on your device and are never transmitted anywhere.'
      },
      {
        q: 'Do you track my usage or sell my data?',
        a: 'No! We do not track your usage, collect analytics, or sell your data to anyone. Your privacy is our top priority.'
      },
      {
        q: 'How do I delete my account and data?',
        a: 'Go to Settings → Account → Delete Account. This will permanently delete your account and all cloud-synced data. Local notes will remain on your device until you uninstall the app.'
      },
    ]
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'What devices are supported?',
        a: 'Currently, CollabNotes is available for Android devices running Android 5.0 (Lollipop) or higher. iOS, web, and desktop versions are planned for future releases.'
      },
      {
        q: 'How much storage does the app use?',
        a: 'The app itself is about 57.5 MB. Your notes are stored locally and take minimal space—typically a few KB per note depending on content length.'
      },
      {
        q: 'What happens if I lose my device?',
        a: 'If you\'ve enabled cloud sync and signed in with Google, your synced notes are safe and can be accessed from any device. Local-only notes will be lost unless you have a device backup.'
      },
      {
        q: 'Can I export my notes?',
        a: 'Export functionality is planned for a future update. Currently, you can copy note content manually or share notes with collaborators.'
      },
    ]
  },
  {
    category: 'Troubleshooting',
    questions: [
      {
        q: 'My notes aren\'t syncing. What should I do?',
        a: 'First, check your internet connection. Ensure you\'re signed in and that sync is enabled for the specific note. If issues persist, try signing out and back in, or contact support.'
      },
      {
        q: 'The app is running slowly. How can I fix this?',
        a: 'Try clearing the app cache in your device settings. If you have many notes, consider archiving old ones. Ensure you\'re running the latest version of the app.'
      },
      {
        q: 'I can\'t sign in with Google. What\'s wrong?',
        a: 'Make sure you have Google Play Services installed and updated. Check your internet connection. If the problem persists, try clearing the app data and reinstalling.'
      },
    ]
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-medium text-white pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <IconChevronDown size={20} className="text-gray-400 flex-shrink-0" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-4 text-gray-300 leading-relaxed">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
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
            <IconQuestionMark size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-gray-400">Find answers to common questions about CollabNotes</p>
        </motion.div>

        <div className="space-y-12">
          {faqs.map((category, catIndex) => (
            <motion.section
              key={catIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => (
                  <FAQItem
                    key={qIndex}
                    question={faq.q}
                    answer={faq.a}
                    index={qIndex}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 glass p-8 rounded-2xl text-center"
        >
          <h3 className="text-xl font-bold text-white mb-4">Still have questions?</h3>
          <p className="text-gray-400 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 gradient-bg rounded-full text-white font-medium glow"
          >
            <span>Contact Support</span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

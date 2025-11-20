export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CollabNotes",
    "url": "https://collabnotes.com",
    "logo": "https://collabnotes.com/logo.png",
    "description": "Modern note-taking application with offline-first architecture and cloud sync",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@collabnotes.com",
      "contactType": "Customer Support",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://twitter.com/collabnotes",
      "https://github.com/collabnotes",
      "https://linkedin.com/company/collabnotes"
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CollabNotes",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "ratingCount": "100"
    },
    "description": "A modern note-taking app with offline-first architecture, cloud sync, and real-time collaboration",
    "featureList": [
      "Offline-first architecture",
      "Cloud sync",
      "Rich text editor",
      "Real-time collaboration",
      "Tags and colors",
      "Guest mode",
      "Privacy-focused"
    ],
    "screenshot": "https://collabnotes.com/screenshot.png",
    "downloadUrl": "https://play.google.com/store/apps/details?id=com.collabnotes"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CollabNotes",
    "url": "https://collabnotes.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://collabnotes.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I need to create an account to use CollabNotes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No! You can start using CollabNotes immediately in Guest Mode without any sign-up. Your notes will be saved locally on your device."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use CollabNotes offline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! CollabNotes is built with an offline-first architecture. All your notes are stored locally on your device."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! All data transmission uses HTTPS encryption. Cloud-synced notes are stored in Firebase with industry-standard security."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

import { InstitutionalLocale } from '../../types.ts';

const institutionalEn: InstitutionalLocale = {
  about: {
    badge: 'E-E-A-T • Transparency & Editorial Rigor',
    title: 'About CodeCompare & Eduardo Lessa',
    subtitle:
      'A software engineering platform designed to turn technical learning into an exercise in contrast, critical thinking, and pragmatic measurement.',
    founderBadge: 'Founding Engineer & Author',
    role: 'Full-Stack Software Engineer & Distributed Architecture Specialist',
    locationLine: 'devedulessa.com.br • eduardolessa2011@gmail.com • Rio de Janeiro, Brazil',
    paragraphs: [
      'With over a decade of experience building mission-critical software, I have architected resilient microservices, event-driven architectures (EDA), high-throughput data pipelines, and modern web applications across finance, e-commerce, and logistics.',
      'Over years leading engineering teams and mentoring dozens of developers, I noticed a widespread habit in tech: learning through rote repetition or shallow "To-Do List" tutorials. Engineers often learn how to copy code without understanding the architectural reasons beneath the surface.',
      'CodeCompare was born as a deliberate answer to that gap: a living engineering repository where the exact same engineering problem is dissected side by side across leading modern languages, frameworks, and databases.'
    ],
    contactBtn: 'Contact the Author',
    methodTitle: 'Our Benchmark & Verification Methodology',
    methodSubtitle:
      'No figure published on CodeCompare comes from guesswork or social media hype. Our comparisons follow strict engineering criteria:',
    cards: [
      {
        step: '01. Isolated Environment',
        title: 'Dedicated Containers',
        desc: 'All load tests and memory footprint measurements run inside isolated Docker Linux instances with capped vCPU and RAM to mirror real production constraints.'
      },
      {
        step: '02. Real Metrics',
        title: 'p95 & p99 Percentiles',
        desc: 'We never stop at simple latency averages. We inspect tail latency across requests using industry-standard tools such as k6 and Apache Bench.'
      },
      {
        step: '03. Canonical Code',
        title: 'Idiomatic per Stack',
        desc: 'We never force C# patterns into Go or React idioms into Angular. Every snippet strictly adheres to the official recommendations of its own ecosystem.'
      }
    ],
    commitmentTitle: 'Commitment to Original, Authored Content',
    commitmentBody:
      'CodeCompare actively rejects mass-generated filler articles produced by automated scraping pipelines. Every benchmark table, trade-off analysis, and architectural diagram is written, verified, and maintained by hand to provide tangible career value for software engineers.'
  },
  editorial: {
    badge: 'Ethics & Editorial Governance',
    title: 'CodeCompare Editorial Guidelines',
    subtitle:
      'Our formal statement on transparency, technical impartiality, peer review methodology, and errata correction standards.',
    principles: [
      {
        num: '1',
        title: 'Editorial Independence',
        desc: 'CodeCompare never accepts undisclosed sponsorships, paid placements, or commercial favors to promote or criticize any framework, cloud provider, or vendor. All comparisons remain strictly agnostic and driven by engineering metrics.'
      },
      {
        num: '2',
        title: 'Real, Testable Code',
        desc: 'Every code snippet published on this platform is compiled and verified against current stable releases of its language and runtime (.NET 8, Node.js 20+, Python 3.12, Go 1.22+, etc.).'
      },
      {
        num: '3',
        title: 'Continuous Update Cycle',
        desc: 'Software evolves fast. Whenever a new LTS or major version introduces structural syntax changes (such as Angular Signals or .NET Minimal APIs), we update our guides and snippets to reflect contemporary best practices.'
      },
      {
        num: '4',
        title: 'Clear Errata Policy',
        desc: 'If any community engineer identifies a technical inaccuracy, snippet bug, or flawed assumption, the issue is investigated and corrected transparently with an explicit revision note on the article.'
      }
    ],
    errataTitle: 'Spotted an improvement in a technical analysis?',
    errataBodyBefore:
      'We welcome continuous peer review. You can submit suggestions or propose new technologies to compare directly through our Contact page or via email at'
  },
  contact: {
    badge: 'Direct Communication Channel',
    title: 'Contact Us & Send Suggestions',
    subtitle:
      'Have a technical question, framework comparison request, or editorial partnership inquiry? Reach out directly to the author.',
    directTitle: 'Direct Contact',
    locationLabel: 'Location:',
    locationValue: 'Brazil (Global Remote Support)',
    responseLabel: 'Average Response Time:',
    responseValue: 'Within 24 to 48 business hours',
    devTipTitle: 'Tip for Devs:',
    devTipBody:
      'When suggesting a new comparison, let us know the exact real-world business problem you want to see implemented side by side.',
    successTitle: 'Message Sent Successfully!',
    successBody:
      'Thank you for reaching out. Your message has been delivered and our engineering team will reply to the email address provided.',
    sendAnotherBtn: 'Send another message',
    nameLabel: 'Your Name *',
    namePlaceholder: 'e.g. Alex Morgan',
    emailLabel: 'Your Email *',
    emailPlaceholder: 'e.g. alex@company.com',
    subjectLabel: 'Primary Subject',
    subjects: [
      { value: 'sugestao', label: 'New Comparison / Article Suggestion' },
      { value: 'errata', label: 'Report Errata or Code Bug' },
      { value: 'duvida', label: 'Software Architecture Question' },
      { value: 'parceria', label: 'Editorial or Institutional Partnership' }
    ],
    messageLabel: 'Your Message *',
    messagePlaceholder: 'Describe your technical question or suggestion in detail...',
    errorDelivery:
      'Unable to deliver your message right now. Please try again or reach out via direct email.',
    errorNetwork:
      'Network error while sending message. Check your connection or contact us directly via email.',
    sendingBtn: 'Sending...',
    sendBtn: 'Send Message'
  },
  terms: {
    badge: 'Terms of Use & Legal Conditions',
    title: 'CodeCompare Platform Terms of Use',
    subtitle:
      'Last updated: September 2024. By browsing and using CodeCompare resources, you expressly agree to the terms described below.',
    sections: [
      {
        title: '1. License for Code Snippets',
        paragraphs: [
          'All practical source code examples provided across CodeCompare comparison pages are made available under a permissive open-source license (MIT style).',
          'You are completely free to study, copy, adapt, and embed these snippets into your personal, educational, or commercial software projects without royalties or runtime attribution requirements.'
        ]
      },
      {
        title: '2. Intellectual Property of Articles & Prose',
        paragraphs: [
          'Unlike code snippets, all critical engineering prose, original benchmarks, comparison tables, and visual design on CodeCompare remain the exclusive intellectual property of the author and publication.',
          'Automated full-site scraping, unauthorized republication, or commercial redistribution of our articles without prior written consent is strictly prohibited.'
        ]
      },
      {
        title: '3. Limitation of Liability',
        paragraphs: [
          'While every snippet and benchmark is thoroughly tested in controlled environments, CodeCompare assumes no liability for instability, data loss, performance bottlenecks, or infrastructure costs resulting from direct deployment into third-party production systems.',
          'Each software engineer remains solely responsible for auditing, testing, and validating any solution within their specific corporate architecture before promoting changes to production.'
        ]
      },
      {
        title: '4. Advertising & Analytics Tracking',
        paragraphs: [
          'CodeCompare uses programmatic advertising provided by Google AdSense to keep all educational content free to access.',
          'Details on ad personalization cookies and compliance with LGPD and GDPR regulations are outlined in our Privacy Policy.'
        ]
      }
    ]
  }
};

export default institutionalEn;

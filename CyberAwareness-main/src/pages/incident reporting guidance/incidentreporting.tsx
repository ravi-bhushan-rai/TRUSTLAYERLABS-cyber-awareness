import { useState, type CSSProperties, type ReactNode } from 'react';
import { useTheme } from '../../ai-assistant/ThemeContext';

// ─── Color System ────────────────────────────────────────────────────────────

const darkColors = {
  bg950: '#020617',
  bg900: '#0f172a',
  bg800: '#1e293b',
  cyan400: '#22d3ee',
  cyan500: '#06b6d4',
  teal400: '#2dd4bf',
  teal500: '#14b8a6',
  blue400: '#60a5fa',
  blue500: '#3b82f6',
  green400: '#4ade80',
  green500: '#22c55e',
  yellow500: '#eab308',
  orange500: '#f97316',
  red400: '#f87171',
  red500: '#ef4444',
  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#475569',
  border: '#1e293b',
  borderAccent: '#0e7490',
} as const;

const lightColors = {
  bg950: '#f0f4ff',
  bg900: '#ffffff',
  bg800: '#e2e8f0',
  cyan400: '#0891b2',
  cyan500: '#0e7490',
  teal400: '#0d9488',
  teal500: '#0f766e',
  blue400: '#2563eb',
  blue500: '#1d4ed8',
  green400: '#16a34a',
  green500: '#15803d',
  yellow500: '#b45309',
  orange500: '#c2410c',
  red400: '#dc2626',
  red500: '#b91c1c',
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
  border: '#e2e8f0',
  borderAccent: '#0e7490',
} as const;

type Colors = {
  bg950: string;
  bg900: string;
  bg800: string;
  cyan400: string;
  cyan500: string;
  teal400: string;
  teal500: string;
  blue400: string;
  blue500: string;
  green400: string;
  green500: string;
  yellow500: string;
  orange500: string;
  red400: string;
  red500: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderAccent: string;
};

function getColors(isDark: boolean): Colors {
  return isDark ? darkColors : lightColors;
}

// ─── Custom hook to combine theme with colors ────────────────────────────────

function useIncidentTheme() {
  const { isDark } = useTheme();
  const colors = getColors(isDark);
  return { colors, isDark };
}

// ─── Constants ───────────────────────────────────────────────────────────────

const font = "'DM Sans', sans-serif";

const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0f172a; }
  ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 3px; }
`;

type PageId = 'home' | 'steps' | 'helpline' | 'portal' | 'evidence';

// ─── Shared Components ────────────────────────────────────────────────────────

type BadgeProps = { children: ReactNode; color?: string };

function Badge({ children, color }: BadgeProps) {
  const { colors } = useIncidentTheme();
  const c = color ?? colors.cyan400;
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: c,
        border: `1px solid ${c}44`,
        background: `${c}15`,
      }}
    >
      {children}
    </span>
  );
}

type CardProps = { children: ReactNode; style?: CSSProperties; glowColor?: string };

function Card({ children, style = {}, glowColor }: CardProps) {
  const { colors, isDark } = useIncidentTheme();
  const gc = glowColor ?? colors.cyan400;
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.bg900,
        border: `1px solid ${hovered ? `${gc}55` : colors.border}`,
        borderRadius: 16,
        padding: '24px',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        boxShadow: hovered
          ? `0 0 20px ${gc}22`
          : !isDark
          ? '0 1px 4px rgba(0,0,0,0.06)'
          : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  const { colors } = useIncidentTheme();
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'none',
        border: `1px solid ${hov ? `${colors.cyan400}55` : colors.border}`,
        borderRadius: 10,
        padding: '8px 16px',
        color: hov ? colors.cyan400 : colors.textSecondary,
        fontFamily: font,
        fontSize: 14,
        cursor: 'pointer',
        marginBottom: 32,
        transition: 'color 0.2s, border-color 0.2s',
      }}
    >
      ← Back to Overview
    </button>
  );
}

type SectionTitleProps = { icon: string; title: string; subtitle?: string; color?: string };

function SectionTitle({ icon, title, subtitle, color }: SectionTitleProps) {
  const { colors } = useIncidentTheme();
  const c = color ?? colors.cyan400;
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div
          style={{
            width: 44, height: 44, borderRadius: 12,
            background: `${c}18`, border: `1px solid ${c}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
          }}
        >
          {icon}
        </div>
        <h1 style={{ fontFamily: font, fontWeight: 600, fontSize: 28, color: colors.textPrimary }}>{title}</h1>
      </div>
      {subtitle && (
        <p style={{ fontFamily: font, fontSize: 15, color: colors.textSecondary, lineHeight: 1.6, maxWidth: 640 }}>{subtitle}</p>
      )}
    </div>
  );
}

function StepBadge({ number, color }: { number: number; color?: string }) {
  const { colors } = useIncidentTheme();
  const c = color ?? colors.cyan400;
  return (
    <div
      style={{
        width: 32, height: 32, borderRadius: '50%',
        background: `${c}22`, border: `2px solid ${c}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: font, fontWeight: 700, fontSize: 14, color: c, flexShrink: 0,
      }}
    >
      {number}
    </div>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function StepByStepPage({ onBack }: { onBack: () => void }) {
  const { colors } = useIncidentTheme();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1, title: 'Stay Calm & Document Everything', color: colors.blue400, icon: '📋',
      summary: 'Do not panic. Your first action is to preserve all evidence before anything is deleted or altered.',
      details: [
        'Take screenshots of suspicious messages, emails, transactions, or websites',
        'Note down the date, time, and platform where the incident occurred',
        'Save chat logs, email threads, and SMS messages',
        'Record any transaction IDs, account numbers, or reference numbers involved',
        'Do not delete any messages or evidence — even if they are offensive or distressing',
      ],
    },
    {
      id: 2, title: 'Secure Your Accounts Immediately', color: colors.teal400, icon: '🔒',
      summary: 'Protect yourself from further damage by locking down your digital accounts.',
      details: [
        'Change passwords on all affected accounts immediately',
        'Enable Two-Factor Authentication (2FA / MFA) on email, banking, and social media',
        "If banking fraud occurred, call your bank's 24/7 helpline to freeze your account",
        'Revoke access to any suspicious third-party apps linked to your accounts',
        "Check your email's 'connected apps' and 'active sessions' for unknown devices",
      ],
    },
    {
      id: 3, title: 'Identify the Type of Cybercrime', color: colors.cyan400, icon: '🔍',
      summary: 'Identifying the correct category helps authorities act faster and ensures proper IPC/BNS sections are applied.',
      details: [
        'Financial fraud (UPI, banking, investment scams)',
        'Identity theft or unauthorized account access',
        'Online harassment, stalking, or cyberbullying',
        'Phishing, vishing, or smishing attacks',
        'Ransomware, malware, or data breach',
        'Child sexual abuse material (CSAM) or online exploitation',
        'Fake news, deepfakes, or defamation',
      ],
    },
    {
      id: 4, title: 'File a Report on Cybercrime Portal', color: colors.green400, icon: '🖥️',
      summary: "The National Cyber Crime Reporting Portal is India's official platform for lodging cybercrime complaints.",
      details: [
        'Visit: www.cybercrime.gov.in (official National Cyber Crime Reporting Portal)',
        "Click 'Report Other Cyber Crime' or 'Report Women/Child Related Crimes'",
        'Register with your mobile number and verify via OTP',
        'Fill in incident details: date, type of crime, suspect info, evidence',
        'Upload screenshots and supporting documents',
        'Note your Complaint Reference Number (CRN) for follow-up',
      ],
    },
    {
      id: 5, title: 'Visit Your Nearest Police Station', color: colors.yellow500, icon: '🚔',
      summary: 'For serious crimes or if the online portal is unclear, file a First Information Report (FIR) at your local police station.',
      details: [
        'Carry printouts of all evidence (screenshots, transaction records)',
        'Request the Cyber Crime Cell specifically — most districts have dedicated units',
        'Ask for a copy of your FIR acknowledgment receipt',
        'If refused, file a complaint with the SP (Superintendent of Police)',
        'You can also send a written complaint via registered post to the Cyber Crime Cell',
      ],
    },
    {
      id: 6, title: 'Follow Up & Track Your Complaint', color: colors.orange500, icon: '📡',
      summary: 'Your case needs monitoring — cybercrime investigations can take time.',
      details: [
        'Log in to cybercrime.gov.in using your CRN to track complaint status',
        'Follow up with the assigned investigation officer regularly',
        'Save all communication with authorities (emails, call recordings if legal)',
        'If no action taken in 30 days, escalate to the SP or file a complaint with NHRC',
        'Seek legal advice from a cyber lawyer if needed for compensation or urgent relief',
      ],
    },
  ];

  return (
    <div>
      <BackButton onClick={onBack} />
      <SectionTitle icon="📋" title="Step-by-Step Reporting Process"
        subtitle="Follow these six clear steps to report a cybercrime effectively. Click on any step to expand the full guidance."
        color={colors.cyan400} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {steps.map((step) => {
          const isOpen = activeStep === step.id;
          return (
            <div
              key={step.id}
              onClick={() => setActiveStep(isOpen ? null : step.id)}
              style={{
                background: colors.bg900,
                border: `1px solid ${isOpen ? `${step.color}55` : colors.border}`,
                borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
                transition: 'border-color 0.2s',
                boxShadow: isOpen ? `0 0 18px ${step.color}15` : 'none',
              }}
            >
              <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <StepBadge number={step.id} color={step.color} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{step.icon}</span>
                    <span style={{ fontFamily: font, fontWeight: 600, fontSize: 16, color: colors.textPrimary }}>{step.title}</span>
                  </div>
                  <p style={{ fontFamily: font, fontSize: 13, color: colors.textSecondary, marginTop: 4 }}>{step.summary}</p>
                </div>
                <span style={{ color: step.color, fontSize: 18, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>▾</span>
              </div>
              {isOpen && (
                <div style={{ padding: '0 22px 20px 70px', borderTop: `1px solid ${colors.border}` }}>
                  <ul style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {step.details.map((detail, i) => (
                      <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: step.color, flexShrink: 0, marginTop: 2 }}>▸</span>
                        <span style={{ fontFamily: font, fontSize: 14, color: colors.textSecondary, lineHeight: 1.6 }}>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Card style={{ marginTop: 28, background: `${colors.cyan400}09`, border: `1px solid ${colors.cyan400}30` }}>
        <p style={{ fontFamily: font, fontSize: 13, color: colors.cyan400, fontWeight: 500 }}>
          ⚡ Quick Tip: Time is critical in cybercrime cases. Report within the first 24–48 hours for the best chance of financial recovery and evidence preservation.
        </p>
      </Card>
    </div>
  );
}

function HelplinePage({ onBack }: { onBack: () => void }) {
  const { colors } = useIncidentTheme();

  const helplines = [
    { name: 'National Cybercrime Helpline', number: '1930', hours: '24/7', desc: "India's dedicated helpline for cybercrime complaints. Call immediately for financial fraud, identity theft, or any online crime.", color: colors.cyan400, icon: '📞', type: 'Primary' },
    { name: 'Police Emergency', number: '100', hours: '24/7', desc: 'For urgent threats, physical danger, or when cybercrime has escalated to real-world harm.', color: colors.red400, icon: '🚨', type: 'Emergency' },
    { name: "Women's Helpline", number: '181', hours: '24/7', desc: 'For women victims of online harassment, cyberstalking, deepfake abuse, or image-based crimes.', color: colors.teal400, icon: '🛡️', type: 'Women Safety' },
    { name: 'Child Helpline (CHILDLINE)', number: '1098', hours: '24/7', desc: 'For children who are victims of online exploitation, grooming, CSAM, or cyberbullying.', color: colors.green400, icon: '👶', type: 'Child Safety' },
    { name: 'RBI Banking Fraud Helpline', number: '14448', hours: '9AM – 6PM', desc: 'For unauthorized banking transactions, UPI fraud, debit/credit card fraud, and financial scams.', color: colors.yellow500, icon: '🏦', type: 'Financial Fraud' },
    { name: 'TRAI Do Not Disturb', number: '1909', hours: '9AM – 9PM', desc: 'To block spam calls, report unsolicited commercial calls, and register on the DND registry.', color: colors.blue400, icon: '🔕', type: 'Spam' },
    { name: 'Cyber Crime Cell (Delhi)', number: '011-26944575', hours: 'Mon–Fri, 10AM–6PM', desc: 'Delhi Police Cyber Crime Cell for detailed investigation and in-person reporting.', color: colors.orange500, icon: '🏛️', type: 'State Cell' },
    { name: 'CERT-In Incident Response', number: '1800-11-4949', hours: '24/7', desc: 'Indian Computer Emergency Response Team for critical infrastructure attacks, ransomware, and large-scale breaches.', color: colors.teal500, icon: '💻', type: 'Technical' },
  ];

  return (
    <div>
      <BackButton onClick={onBack} />
      <SectionTitle icon="📞" title="Cybercrime Helpline Information"
        subtitle="Key helplines for cybercrime victims in India. Save these numbers — every second counts when you're under attack."
        color={colors.teal400} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {helplines.map((h, i) => (
          <Card key={i} glowColor={h.color}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 24 }}>{h.icon}</span>
                <div>
                  <div style={{ fontFamily: font, fontWeight: 600, fontSize: 15, color: colors.textPrimary }}>{h.name}</div>
                  <Badge color={h.color}>{h.type}</Badge>
                </div>
              </div>
            </div>
            <div style={{
              background: `${h.color}12`, border: `1px solid ${h.color}30`,
              borderRadius: 10, padding: '10px 16px', marginBottom: 12,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontFamily: font, fontWeight: 700, fontSize: 22, color: h.color, letterSpacing: '0.02em' }}>{h.number}</span>
              <span style={{ fontFamily: font, fontSize: 11, color: colors.textMuted, textAlign: 'right' }}>{h.hours}</span>
            </div>
            <p style={{ fontFamily: font, fontSize: 13, color: colors.textSecondary, lineHeight: 1.6 }}>{h.desc}</p>
          </Card>
        ))}
      </div>

      <Card style={{ marginTop: 24, background: `${colors.red400}09`, border: `1px solid ${colors.red400}30` }}>
        <div style={{ fontFamily: font, fontWeight: 600, fontSize: 14, color: colors.red400, marginBottom: 6 }}>⚠️ Important Notice</div>
        <p style={{ fontFamily: font, fontSize: 13, color: colors.textSecondary, lineHeight: 1.6 }}>
          Never share your OTP, password, Aadhaar number, or banking credentials with anyone claiming to be from these helplines. Official helpline agents will NEVER ask for such information.
        </p>
      </Card>
    </div>
  );
}

function PortalGuidancePage({ onBack }: { onBack: () => void }) {
  const { colors } = useIncidentTheme();
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      title: 'About the Portal', icon: '🌐', color: colors.cyan400,
      content: [
        { heading: 'What is it?', body: 'The National Cyber Crime Reporting Portal (cybercrime.gov.in) is the official online platform launched by the Ministry of Home Affairs, Government of India, to allow citizens to report cybercrime complaints online from anywhere in India.' },
        { heading: 'Who can use it?', body: 'Any Indian citizen, resident, or organization that has been a victim of cybercrime can file a complaint. You do not need to visit a police station first.' },
        { heading: 'Languages available', body: 'The portal is available in English and Hindi. Regional language support is being expanded progressively.' },
        { heading: 'Is it free?', body: 'Yes, filing a complaint on the portal is completely free of charge.' },
      ],
    },
    {
      title: 'How to File a Complaint', icon: '📝', color: colors.teal400,
      content: [
        { heading: 'Step 1 — Visit the Portal', body: 'Go to www.cybercrime.gov.in on any browser. Use a secure, trusted network.' },
        { heading: 'Step 2 — Choose Report Type', body: "Select 'Report Women/Child Related Crime' for gender-based cybercrimes, or 'Report Other Cyber Crime' for all other offenses." },
        { heading: 'Step 3 — Register / Login', body: 'Enter your mobile number and verify with OTP. No email is required. Your identity is protected.' },
        { heading: 'Step 4 — Fill Incident Details', body: 'Provide date, time, type of offense, platform/website, suspect details (if known), and a description of what happened.' },
        { heading: 'Step 5 — Upload Evidence', body: 'Attach screenshots, videos, call recordings, transaction proofs, or any other digital evidence (max 5MB per file, PDF/JPG/PNG).' },
        { heading: 'Step 6 — Submit & Save CRN', body: 'Submit the complaint and note your Complaint Reference Number (CRN). Use this to track your case.' },
      ],
    },
    {
      title: 'Complaint Categories', icon: '📂', color: colors.blue400,
      content: [
        { heading: 'Financial Crimes', body: 'UPI fraud, banking fraud, investment scams, cryptocurrency fraud, lottery fraud, online shopping fraud.' },
        { heading: 'Social Media Crimes', body: 'Fake profiles, cyberbullying, morphed images, online defamation, identity theft on social platforms.' },
        { heading: 'Ransomware & Hacking', body: 'Unauthorized access to accounts/devices, ransomware attacks, email hacking, data theft.' },
        { heading: 'Child-related Crimes', body: 'Child sexual abuse material (CSAM), grooming, online exploitation — reported confidentially.' },
        { heading: 'Other Cyber Crimes', body: 'Phishing, vishing, smishing, fake customer care, SIM swap fraud, fake job offers.' },
      ],
    },
    {
      title: 'After Filing — What Happens?', icon: '⚙️', color: colors.green400,
      content: [
        { heading: 'Acknowledgment', body: 'You will receive an automated acknowledgment with your CRN immediately after submission.' },
        { heading: 'Assignment to State', body: 'The complaint is automatically routed to the Cyber Crime Cell of the state/UT where the crime occurred or where you reside.' },
        { heading: 'Investigation', body: 'A police officer will be assigned to investigate. You may be contacted for additional information or to appear at the station.' },
        { heading: 'Tracking Status', body: 'Login to cybercrime.gov.in with your mobile number and CRN to check the current status of your complaint.' },
        { heading: 'Closure or FIR', body: 'The case may be closed (if evidence is insufficient), or converted into a formal FIR and taken up for criminal prosecution.' },
      ],
    },
  ];

  return (
    <div>
      <BackButton onClick={onBack} />
      <SectionTitle icon="🌐" title="National Cyber Crime Portal Guidance"
        subtitle="Everything you need to know about India's official cybercrime reporting platform — from registration to case resolution."
        color={colors.blue400} />

      <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
        {sections.map((section, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveSection(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 18px', borderRadius: 10,
              border: `1px solid ${activeSection === i ? `${section.color}55` : colors.border}`,
              background: activeSection === i ? `${section.color}15` : colors.bg900,
              color: activeSection === i ? section.color : colors.textSecondary,
              fontFamily: font, fontWeight: activeSection === i ? 600 : 400,
              fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {section.icon} {section.title}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {sections[activeSection].content.map((item, i) => (
          <Card key={i} glowColor={sections[activeSection].color} style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', gap: 14 }}>
              <StepBadge number={i + 1} color={sections[activeSection].color} />
              <div>
                <div style={{ fontFamily: font, fontWeight: 600, fontSize: 15, color: colors.textPrimary, marginBottom: 6 }}>{item.heading}</div>
                <p style={{ fontFamily: font, fontSize: 14, color: colors.textSecondary, lineHeight: 1.65 }}>{item.body}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <a
          href="https://www.cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 24px', borderRadius: 10,
            background: colors.cyan500, color: '#ffffff',
            fontFamily: font, fontWeight: 700, fontSize: 14, textDecoration: 'none',
          }}
        >
          🌐 Open Portal — cybercrime.gov.in
        </a>
      </div>
    </div>
  );
}

function EvidencePage({ onBack }: { onBack: () => void }) {
  const { colors } = useIncidentTheme();

  const categories = [
    {
      title: 'Screenshots & Screen Recordings', color: colors.cyan400, icon: '📸',
      tips: [
        'Capture the full screen including the browser URL bar — do not crop it',
        'Record screen videos for ongoing fraud or scam calls',
        'Save screenshots with original metadata (do not edit or filter)',
        'For WhatsApp/Telegram scams: screenshot both the message and the contact profile',
        'On Windows: use Snipping Tool or Win+Shift+S. On Android: Power+Volume Down',
        'On iPhone: Side Button + Volume Up (saves to Photos with timestamp)',
      ],
    },
    {
      title: 'Financial Transaction Records', color: colors.green400, icon: '💳',
      tips: [
        'Download and save your bank statement for the fraud period',
        'Screenshot UPI payment confirmations showing Transaction ID, amount, time',
        'Save SMS alerts from your bank immediately — they may disappear',
        'Note the recipient UPI ID, bank account number, or wallet ID',
        'Collect purchase receipts, order IDs, and delivery tracking details if applicable',
        'Request a formal debit statement from your bank — often needed for investigation',
      ],
    },
    {
      title: 'Communication Evidence', color: colors.teal400, icon: '💬',
      tips: [
        'Export full chat logs from WhatsApp (Settings → Chat → Export Chat)',
        "Save fraudulent emails — use 'Download Email' or 'Print to PDF' to preserve headers",
        'Record suspicious phone calls if legally permitted in your state',
        'Do not block the suspect number until you have saved all evidence',
        'For social media: save public post URLs and screenshot private messages',
        'Archive the full email thread including reply chains and forward history',
      ],
    },
    {
      title: 'Website & URL Evidence', color: colors.blue400, icon: '🔗',
      tips: [
        'Copy and save the full URL of phishing or fake websites',
        'Use web.archive.org to archive a live fraudulent page before it disappears',
        "Screenshot the entire website (use browser extensions like 'GoFullPage')",
        "Save WHOIS data for the suspicious domain: search 'WHOIS [domain]' on Google",
        'Note any SSL/HTTPS information shown in the browser address bar',
        'Screenshot fake ads, product listings, or investment scheme pages with URLs visible',
      ],
    },
    {
      title: 'Device & Technical Evidence', color: colors.orange500, icon: '💻',
      tips: [
        'Do not reset or format your device after an attack — it destroys evidence',
        'If malware is suspected, do not connect the device to other networks',
        'Export device logs if you have technical knowledge (Android: ADB logs)',
        'Note any suspicious apps installed around the time of the incident',
        'For ransomware: photograph the ransom note and do not pay without police advice',
        'Keep the original device safe — investigators may need to forensically examine it',
      ],
    },
    {
      title: 'Identity & Profile Evidence', color: colors.yellow500, icon: '🪪',
      tips: [
        "Save the suspect's fake profile screenshots including profile picture and bio",
        'Note their display name, username, phone number, and email if visible',
        'Screenshot follower/following counts before they delete the account',
        'Save any ID documents or photos the suspect sent you — they may be evidence',
        'Record all promises made (job offers, loans, relationships) with timestamps',
        'If impersonation is involved, screenshot your own legitimate profile alongside the fake',
      ],
    },
  ];

  const doList = [
    'Act quickly — evidence can be deleted or expire within hours',
    'Organize evidence by date and incident type in a dedicated folder',
    'Back up all evidence to a secure cloud drive (Google Drive, iCloud, OneDrive)',
    'Make multiple copies on different devices or storage media',
    'Document when and how you collected each piece of evidence',
    'Hand over original devices only if explicitly requested by investigating officer',
  ];

  const dontList = [
    'Do NOT edit, filter, or enhance any screenshots — it affects authenticity',
    'Do NOT delete your own messages even if the conversation is upsetting',
    "Do NOT transfer money to 'recover' funds — it's always a second scam",
    'Do NOT share evidence publicly on social media before filing a report',
    'Do NOT format or factory reset a compromised device without forensic advice',
    'Do NOT confront the suspect online — it may destroy evidence or escalate danger',
  ];

  return (
    <div>
      <BackButton onClick={onBack} />
      <SectionTitle icon="🔬" title="Evidence Collection Recommendations"
        subtitle="Proper evidence collection is the backbone of any successful cybercrime investigation. Here's what to collect and how."
        color={colors.orange500} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginBottom: 28 }}>
        {categories.map((cat, i) => (
          <Card key={i} glowColor={cat.color}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: `${cat.color}18`, border: `1px solid ${cat.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
              }}>
                {cat.icon}
              </div>
              <span style={{ fontFamily: font, fontWeight: 600, fontSize: 15, color: colors.textPrimary }}>{cat.title}</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {cat.tips.map((tip, j) => (
                <li key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: cat.color, flexShrink: 0, marginTop: 3, fontSize: 10 }}>●</span>
                  <span style={{ fontFamily: font, fontSize: 13, color: colors.textSecondary, lineHeight: 1.6 }}>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card glowColor={colors.green400} style={{ background: `${colors.green400}09`, border: `1px solid ${colors.green400}30` }}>
          <div style={{ fontFamily: font, fontWeight: 700, fontSize: 15, color: colors.green400, marginBottom: 14 }}>✅ DO — Best Practices</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {doList.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: colors.green400, flexShrink: 0 }}>✓</span>
                <span style={{ fontFamily: font, fontSize: 13, color: colors.textSecondary, lineHeight: 1.6 }}>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card glowColor={colors.red400} style={{ background: `${colors.red400}09`, border: `1px solid ${colors.red400}30` }}>
          <div style={{ fontFamily: font, fontWeight: 700, fontSize: 15, color: colors.red400, marginBottom: 14 }}>❌ DON'T — Critical Mistakes</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {dontList.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: colors.red400, flexShrink: 0 }}>✗</span>
                <span style={{ fontFamily: font, fontSize: 13, color: colors.textSecondary, lineHeight: 1.6 }}>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function MainPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  const { colors, isDark } = useIncidentTheme();

  const cards = [
    { id: 'steps' as PageId, title: 'Step-by-Step Reporting Process', desc: 'A clear 6-step guide from documenting evidence to tracking your complaint — everything you need to report a cybercrime properly.', icon: '📋', color: colors.cyan400, tags: ['6 Steps', 'Guided Process'] },
    { id: 'helpline' as PageId, title: 'Cybercrime Helpline Information', desc: 'All the key helpline numbers you need — national cybercrime helpline, banking fraud, women & child safety, and more.', icon: '📞', color: colors.teal400, tags: ['8 Helplines', '24/7 Support'] },
    { id: 'portal' as PageId, title: 'National Cyber Crime Portal Guidance', desc: 'Detailed walkthrough of cybercrime.gov.in — how to file, what to fill, what happens after, and how to track your complaint.', icon: '🌐', color: colors.blue400, tags: ['Official Portal', 'Step-by-Step'] },
    { id: 'evidence' as PageId, title: 'Evidence Collection Recommendations', desc: "What to collect, how to preserve it, and critical mistakes to avoid — comprehensive guidance to strengthen your cybercrime case.", icon: '🔬', color: colors.orange500, tags: ['6 Categories', "Do's & Don'ts"] },
  ];

  const stats = [
    { number: '1930', label: 'National Helpline', color: colors.cyan400 },
    { number: '6', label: 'Reporting Steps', color: colors.teal400 },
    { number: '24/7', label: 'Support Available', color: colors.blue400 },
    { number: '100%', label: 'Free to File', color: colors.green400 },
  ];

  return (
    <div>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', padding: '60px 0 50px', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 300,
          background: `radial-gradient(ellipse at center, ${colors.cyan400}18 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <Badge color={colors.cyan400}>Cybershield India</Badge>
        <h1 style={{
          fontFamily: font, fontWeight: 700, fontSize: 52, color: colors.textPrimary,
          marginTop: 20, marginBottom: 16, lineHeight: 1.15, letterSpacing: '-0.02em',
        }}>
          Incident <span style={{ color: colors.cyan400 }}>Reporting</span> Guidance
        </h1>
        <p style={{
          fontFamily: font, fontSize: 17, color: colors.textSecondary,
          maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7,
        }}>
          Your complete guide to reporting cybercrimes in India — from the first step to final resolution. Know your rights, know the process.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <button
            type="button"
            onClick={() => onNavigate('steps')}
            style={{
              padding: '13px 28px', borderRadius: 10,
              background: colors.cyan500, color: '#ffffff',
              fontFamily: font, fontWeight: 700, fontSize: 15,
              border: 'none', cursor: 'pointer',
            }}
          >
            Start Reporting Guide →
          </button>
          <a
            href="https://www.cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '13px 28px', borderRadius: 10,
              background: 'transparent', color: colors.textPrimary,
              fontFamily: font, fontWeight: 500, fontSize: 15,
              border: `1px solid ${colors.border}`, textDecoration: 'none',
            }}
          >
            🌐 File a Report Now
          </a>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 48 }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: colors.bg900,
              border: `1px solid ${colors.border}`,
              borderRadius: 14, padding: '18px 20px', textAlign: 'center',
              boxShadow: !isDark ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            <div style={{ fontFamily: font, fontWeight: 700, fontSize: 28, color: stat.color, marginBottom: 4 }}>{stat.number}</div>
            <div style={{ fontFamily: font, fontSize: 13, color: colors.textMuted }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: font, fontWeight: 600, fontSize: 22, color: colors.textPrimary, marginBottom: 6 }}>Choose a Section</h2>
        <p style={{ fontFamily: font, fontSize: 14, color: colors.textSecondary }}>Each section covers a key part of the incident reporting process. Click to explore.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, marginBottom: 40 }}>
        {cards.map((card) => {
          const [hov, setHov] = useState(false);
          return (
            <div
              key={card.id}
              onClick={() => onNavigate(card.id)}
              onMouseEnter={() => setHov(true)}
              onMouseLeave={() => setHov(false)}
              style={{
                background: colors.bg900,
                border: `1px solid ${hov ? `${card.color}55` : colors.border}`,
                borderRadius: 18, padding: '28px', cursor: 'pointer',
                transition: 'all 0.25s',
                boxShadow: hov
                  ? `0 0 28px ${card.color}18`
                  : !isDark ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                transform: hov ? 'translateY(-2px)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `${card.color}18`, border: `1px solid ${card.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, flexShrink: 0,
                }}>
                  {card.icon}
                </div>
                <div>
                  <div style={{ fontFamily: font, fontWeight: 700, fontSize: 17, color: colors.textPrimary, marginBottom: 8, lineHeight: 1.3 }}>{card.title}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {card.tags.map((tag, i) => <Badge key={i} color={card.color}>{tag}</Badge>)}
                  </div>
                </div>
              </div>
              <p style={{ fontFamily: font, fontSize: 14, color: colors.textSecondary, lineHeight: 1.65, marginBottom: 16 }}>{card.desc}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: font, fontWeight: 600, fontSize: 13, color: card.color }}>
                Explore Section →
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function IncidentReportingPage() {
  const [page, setPage] = useState<PageId>('home');
  const { isDark } = useIncidentTheme();
  const colors = isDark ? darkColors : lightColors;

  const pageMap: Record<PageId, ReactNode> = {
    home: <MainPage onNavigate={setPage} />,
    steps: <StepByStepPage onBack={() => setPage('home')} />,
    helpline: <HelplinePage onBack={() => setPage('home')} />,
    portal: <PortalGuidancePage onBack={() => setPage('home')} />,
    evidence: <EvidencePage onBack={() => setPage('home')} />,
  };

  return (
    <>
      <style>{globalStyle}</style>
      <div style={{
        minHeight: '100vh',
        background: colors.bg950,
        fontFamily: font,
        transition: 'background 0.25s',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 80px' }}>
          {pageMap[page] ?? pageMap.home}
        </div>
      </div>
    </>
  );
}
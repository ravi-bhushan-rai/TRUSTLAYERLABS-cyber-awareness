import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, Scale, Search, ShieldAlert } from 'lucide-react';
import { jsPDF } from 'jspdf';
import Footer from '../../components/Footer';

type LawEntry = {
  title: string;
  aliases: string[];
  sections: string[];
  punishment: string;
  penalty: string;
  evidence: string[];
};

const searchPlaceholders = [
  'phishing attack',
  'UPI scam',
  'identity theft',
  'data privacy',
  'personal data',
  'ransomware',
  'cyber stalking',
  'fake job scam',
];

const lawEntries: LawEntry[] = [
  // ── Original entries ──────────────────────────────────────────────────────
  {
    title: 'Digital Personal Data Protection Act, 2023',
    aliases: ['data privacy', 'personal data', 'privacy law', 'data breach', 'consent', 'dpdp act'],
    sections: ['Digital Personal Data Protection Act, 2023'],
    punishment:
      'The DPDP Act is primarily enforced through monetary penalties rather than jail terms for routine violations. The Data Protection Board can impose penalties depending on the nature and seriousness of the breach.',
    penalty:
      'For serious failures such as not taking reasonable security safeguards, penalties can go up to INR 250 crore. Other violations can attract separate penalty slabs under the Act, including breaches involving children or consent-related obligations.',
    evidence: ['Preserve breach emails, screenshots, and notice letters', 'Document which personal data was exposed or misused', 'Report the issue to the data fiduciary and keep copies of your complaint'],
  },
  {
    title: 'Phishing attack, fake payment link, or UPI scam',
    aliases: ['phishing', 'upi scam', 'upi fraud', 'qr scam', 'fake payment link', 'otp scam'],
    sections: ['IT Act Section 66D', 'IT Act Section 66C', 'IT Act Section 43'],
    punishment:
      'Section 66D covers cheating by personation through computer resources and can lead to imprisonment up to 3 years and a fine.',
    penalty:
      'Section 66C covers identity theft and can lead to imprisonment up to 3 years plus a fine up to INR 1 lakh. Section 43 can also support compensation for unauthorized access, data damage, or financial loss.',
    evidence: ['Save screenshots of the scam message, link, or QR code', 'Keep UPI transaction ID, phone number, and bank reference', 'Report immediately through the cybercrime portal and your bank'],
  },
  {
    title: 'Identity theft or OTP theft',
    aliases: ['identity theft', 'otp theft', 'sim swap', 'aadhar misuse', 'pan misuse'],
    sections: ['IT Act Section 66C', 'IT Act Section 66D'],
    punishment:
      'Identity theft under Section 66C can attract imprisonment up to 3 years and a fine.',
    penalty:
      'If the same conduct is used to impersonate a victim or obtain money, Section 66D may also apply with imprisonment up to 3 years and fine.',
    evidence: ['Change passwords and freeze linked accounts', 'Preserve call logs, SMS, and email alerts', 'Inform telecom provider and bank quickly'],
  },
  {
    title: 'Unauthorized access, hacking, or data theft',
    aliases: ['hacking', 'data theft', 'unauthorized access', 'system breach', 'database leak'],
    sections: ['IT Act Section 43', 'IT Act Section 66', 'IT Act Section 66B'],
    punishment:
      'Section 66 can apply where dishonest or fraudulent intent is proved; it can lead to imprisonment up to 3 years and a fine.',
    penalty:
      'Section 43 provides civil compensation for unauthorized access, copying, disruption, or damage to computer systems or data.',
    evidence: ['Preserve logs, emails, and access alerts', 'Do not wipe devices before forensic backup', 'Get incident details from your service provider'],
  },
  {
    title: 'Disclosure of information in breach of lawful contract',
    aliases: ['section 72a', 'confidentiality breach', 'privacy breach', 'employee data leak', 'misuse of information'],
    sections: ['IT Act Section 72A'],
    punishment:
      'Section 72A can apply when a person discloses personal information knowing it was collected under a lawful contract and without consent. It can lead to imprisonment up to 3 years and a fine.',
    penalty:
      'This provision is often used for confidential data leaks by service providers, employees, contractors, or vendors who misuse personal information.',
    evidence: ['Keep copies of the leaked material and where it appeared', 'Preserve employment, vendor, or service-contract records', 'Record who accessed the data and when the disclosure happened'],
  },
  {
    title: 'Cyber stalking or online harassment',
    aliases: ['cyber stalking', 'online harassment', 'abusive messages', 'fake profiles'],
    sections: ['IT Act Section 66E', 'IT Act Section 67', 'Relevant criminal law provisions'],
    punishment:
      'Depending on the facts, publication or transmission of private images and obscene content can lead to imprisonment and fine under the IT Act.',
    penalty:
      'Victims may also rely on other criminal-law provisions if threats, stalking, intimidation, or repeat harassment are involved.',
    evidence: ['Keep URLs, profile links, and chat exports', 'Report and block accounts immediately', 'Request platform takedown and police help if threats continue'],
  },
  {
    title: 'Obscene content or child sexual abuse material',
    aliases: ['obscene content', 'csam', 'child sexual abuse material', 'explicit content'],
    sections: ['IT Act Section 67', 'IT Act Section 67B'],
    punishment:
      'Section 67 and Section 67B can lead to imprisonment and fine for publishing or transmitting obscene or child sexual abuse material.',
    penalty:
      'The severity increases significantly when material involves minors or repeated distribution.',
    evidence: ['Report the content without re-sharing it', 'Collect the URL and platform details', 'Use emergency reporting channels if a child is involved'],
  },
  {
    title: 'Ransomware, extortion, or locked-device fraud',
    aliases: ['ransomware', 'extortion', 'device locked', 'file encryption', 'data hostage'],
    sections: ['IT Act Section 43', 'IT Act Section 66', 'Indian criminal law provisions'],
    punishment:
      'Unauthorized disruption and extortion-based cyber activity can attract imprisonment and fine, depending on the conduct and intent proved.',
    penalty:
      'Victims may seek compensation for loss of access, business interruption, and data damage.',
    evidence: ['Disconnect the affected device from the network', 'Preserve ransom notes and file hashes', 'Use backups and report the incident immediately'],
  },

  // ── IPC – Cyber Crime Related Sections ────────────────────────────────────
  {
    title: 'IPC 120B – Criminal Conspiracy',
    aliases: ['ipc 120b', 'criminal conspiracy', 'conspiracy online', 'coordinated cybercrime'],
    sections: ['IPC Section 120B'],
    punishment:
      'Where two or more persons agree to commit a cyber offence, all parties can be prosecuted for criminal conspiracy. Punishment mirrors the substantive offence they conspired to commit.',
    penalty:
      'If the conspiracy is to commit an offence punishable with death, life imprisonment, or rigorous imprisonment of two years or more, each conspirator is liable to the same punishment as if they committed the offence themselves.',
    evidence: ['Preserve chat logs, emails, and call records showing coordination', 'Document all parties involved and their roles', 'Keep any financial transaction records linked to the conspiracy'],
  },
  {
    title: 'IPC 153A – Promoting Enmity Through Social Media',
    aliases: ['ipc 153a', 'promoting enmity', 'communal hatred online', 'religious hatred social media', 'hate speech online'],
    sections: ['IPC Section 153A'],
    punishment:
      'Publishing or sharing content online that promotes enmity between groups on grounds of religion, race, place of birth, residence, language, caste, or community can lead to imprisonment up to 3 years, or fine, or both.',
    penalty:
      'If the offence is committed at a place of worship or during religious assembly, the imprisonment can extend up to 5 years along with a fine.',
    evidence: ['Screenshot and archive the post with URL and timestamp', 'Note the platform and the account that published the content', 'Report to the platform and file a complaint with the cybercrime portal'],
  },
  {
    title: 'IPC 292 – Obscene Online Content',
    aliases: ['ipc 292', 'obscene content online', 'pornographic material', 'obscene publication online'],
    sections: ['IPC Section 292'],
    punishment:
      'Selling, distributing, exhibiting, or circulating obscene content through electronic means is an offence. First conviction can lead to imprisonment up to 2 years and a fine up to INR 2,000.',
    penalty:
      'Subsequent convictions can attract imprisonment up to 5 years and a fine up to INR 5,000. The IT Act provisions on obscene electronic content may also apply concurrently.',
    evidence: ['Preserve URLs, screenshots, and download records of the content', 'Note account identifiers, timestamps, and platform details', 'Report to the platform and the cybercrime portal without re-sharing the material'],
  },
  {
    title: 'IPC 295A – Religious Hate Content Online',
    aliases: ['ipc 295a', 'religious hate content', 'deliberate insult religion', 'blasphemy online', 'hurting religious feelings'],
    sections: ['IPC Section 295A'],
    punishment:
      'Deliberate and malicious acts intended to outrage religious feelings of any class by insulting its religion or religious beliefs, when done online, can lead to imprisonment up to 3 years, or fine, or both.',
    penalty:
      'Courts weigh whether the act was deliberate and malicious. The severity of the content and its reach on social media are relevant factors during sentencing.',
    evidence: ['Archive the offending post with URL, date, and account details', 'Collect evidence of widespread publication or viral reach', 'File a complaint with the cybercrime portal and report to the platform'],
  },
  {
    title: 'IPC 354A – Sexual Harassment',
    aliases: ['ipc 354a', 'sexual harassment online', 'unwelcome sexual advances', 'sexual favour demand'],
    sections: ['IPC Section 354A'],
    punishment:
      'Making sexually coloured remarks, demanding sexual favours, or showing pornography online without consent can lead to rigorous imprisonment up to 3 years, or fine, or both.',
    penalty:
      'Physical contact-based harassment commands a higher sentence of up to 3 years. Online variants involving unwelcome communication or pornographic content can attract up to 1 year imprisonment, or fine, or both depending on the specific sub-section.',
    evidence: ['Save all messages, images, and conversation threads', 'Document the platform and account details of the accused', 'Report to the platform, workplace authority if applicable, and the cybercrime portal'],
  },
  {
    title: 'IPC 354C – Voyeurism',
    aliases: ['ipc 354c', 'voyeurism', 'secretly recorded video', 'hidden camera', 'non-consensual recording'],
    sections: ['IPC Section 354C'],
    punishment:
      'Watching or capturing images of a woman engaging in a private act without her consent, or disseminating such content, can lead to imprisonment of 1 to 3 years on first conviction and 3 to 7 years on subsequent convictions, along with a fine.',
    penalty:
      'Disseminating the captured content separately compounds the offence. The IT Act provisions on violation of privacy under Section 66E may also be invoked alongside.',
    evidence: ['Preserve any links, file names, or platforms where the content appeared', 'Note device details if a hidden recording device was found', 'Report to police and request emergency takedown from the platform'],
  },
  {
    title: 'IPC 354D – Cyber Stalking',
    aliases: ['ipc 354d', 'cyber stalking ipc', 'online stalking woman', 'repeated unwanted contact', 'following online'],
    sections: ['IPC Section 354D'],
    punishment:
      'A man who repeatedly follows, contacts, or monitors a woman online despite her clear disinterest, or who monitors her internet use, email, or electronic communications, commits stalking. First conviction: imprisonment up to 3 years and a fine.',
    penalty:
      'Second and subsequent convictions can lead to imprisonment up to 5 years and a fine. Stalking for a hidden purpose or by concealing identity is treated as a more serious form.',
    evidence: ['Export all messages, follow requests, and contact attempts with timestamps', 'Keep a log of dates and platforms where contact was made', 'Report to the platform and file an FIR or cybercrime complaint promptly'],
  },
  {
    title: 'IPC 379 – Theft of Digital Devices or Data',
    aliases: ['ipc 379', 'theft digital device', 'stolen laptop', 'stolen phone', 'data theft ipc', 'device theft'],
    sections: ['IPC Section 379'],
    punishment:
      'Dishonestly taking a digital device such as a laptop, phone, or storage drive, or stealing data stored thereon, can be prosecuted as theft. Punishment can be imprisonment up to 3 years, or fine, or both.',
    penalty:
      'Courts may consider the value of the device and data when determining the penalty. IT Act provisions for data theft may be invoked alongside IPC 379 for a comprehensive charge.',
    evidence: ['File an FIR with device details, IMEI numbers, and serial numbers', 'Check cloud account access logs for unauthorized sign-ins after the theft', 'Report to your telecom provider to block the stolen SIM or device'],
  },
  {
    title: 'IPC 403 – Dishonest Misappropriation',
    aliases: ['ipc 403', 'dishonest misappropriation', 'misappropriation of funds online', 'wrongful conversion'],
    sections: ['IPC Section 403'],
    punishment:
      'Dishonestly misappropriating or converting to one\'s own use another person\'s property, including digital assets or funds transferred online, can lead to imprisonment up to 2 years, or fine, or both.',
    penalty:
      'Where misappropriation involves breach of trust or a fiduciary relationship, the stronger provisions under IPC 406 may be invoked instead.',
    evidence: ['Preserve transaction records, screenshots, and bank statements', 'Document communications where the accused received or retained funds', 'Report to the bank for a charge-back and file a police complaint'],
  },
  {
    title: 'IPC 406 – Criminal Breach of Trust',
    aliases: ['ipc 406', 'criminal breach of trust', 'misuse of entrusted funds', 'fraud by trusted person'],
    sections: ['IPC Section 406'],
    punishment:
      'When a person entrusted with property or funds dishonestly misappropriates or uses them contrary to the trust, it is criminal breach of trust. Punishment can be imprisonment up to 3 years, or fine, or both.',
    penalty:
      'Online contexts include investment fraud, misuse of client funds by online platforms, or misappropriation by employees handling digital accounts.',
    evidence: ['Keep all agreements, transfer receipts, and communication showing entrustment', 'Document the demand for return of funds and its refusal', 'File a complaint with the economic offences wing and the cybercrime portal'],
  },
  {
    title: 'IPC 409 – Breach of Trust by Public Servant',
    aliases: ['ipc 409', 'breach of trust public servant', 'government employee fraud', 'banker breach of trust', 'agent misuse'],
    sections: ['IPC Section 409'],
    punishment:
      'A public servant, banker, merchant, factor, broker, attorney, or agent who commits criminal breach of trust faces enhanced punishment: imprisonment up to 10 years and a fine.',
    penalty:
      'The elevated punishment reflects the higher duty of care owed by these individuals. Online misuse of government credentials, banking access, or client accounts falls within this provision.',
    evidence: ['Preserve official communications, account access logs, and transaction records', 'Document the accused\'s role and their authority over the entrusted property', 'Report to the relevant authority or vigilance department alongside a police complaint'],
  },
  {
    title: 'IPC 415 – Cheating',
    aliases: ['ipc 415', 'cheating ipc', 'online cheating', 'inducement by deception', 'fraudulent misrepresentation'],
    sections: ['IPC Section 415'],
    punishment:
      'Deceiving any person fraudulently or dishonestly to induce them to deliver property or to do or omit an act causing damage or harm, including through online platforms, constitutes cheating. Imprisonment up to 1 year, or fine, or both.',
    penalty:
      'IPC 415 forms the foundation for more specific cheating offences under IPC 419 and IPC 420, which carry heavier penalties for online impersonation and serious cheating.',
    evidence: ['Document the false representation made and how it induced you to act', 'Preserve all communications, advertisements, or websites used to deceive', 'File a police complaint supported by transaction and communication records'],
  },
  {
    title: 'IPC 416 – Cheating by Personation',
    aliases: ['ipc 416', 'cheating by personation', 'impersonation fraud', 'fake identity cheating'],
    sections: ['IPC Section 416'],
    punishment:
      'Cheating by pretending to be some other person, or by knowingly substituting one person for another, is an offence. Punishment can be imprisonment up to 3 years, or fine, or both.',
    penalty:
      'Online contexts include creating fake profiles, impersonating officials, or using someone else\'s identity to gain financial or other benefits from victims.',
    evidence: ['Archive the fake profile or impersonated account with screenshots', 'Document communications where the accused claimed to be someone else', 'Report to the platform and file a complaint with the cybercrime portal'],
  },
  {
    title: 'IPC 419 – Online Impersonation Fraud',
    aliases: ['ipc 419', 'online impersonation', 'fake profile fraud', 'impersonation punishment'],
    sections: ['IPC Section 419'],
    punishment:
      'Cheating by personation is penalised separately under IPC 419. Punishment can be imprisonment up to 3 years, or fine, or both — mirroring Section 416 but providing a standalone charge for impersonation-based cheating.',
    penalty:
      'This section is commonly invoked alongside IT Act Section 66D for online impersonation fraud involving financial loss.',
    evidence: ['Save proof of the fake identity used and the financial or other loss caused', 'Document how the accused represented themselves as another person', 'File complaints with both the cybercrime portal and the relevant platform'],
  },
  {
    title: 'IPC 420 – Online Cheating and Fraud',
    aliases: ['ipc 420', 'online fraud ipc', 'cheating and fraud', 'fraudulent delivery of property', 'e-commerce fraud'],
    sections: ['IPC Section 420'],
    punishment:
      'Cheating that induces the deceived person to deliver property or alter or destroy a valuable security can lead to imprisonment up to 7 years and a fine.',
    penalty:
      'IPC 420 is one of the most commonly invoked provisions in online fraud, covering e-commerce scams, fake investment schemes, online job frauds, and similar financial deceptions.',
    evidence: ['Preserve all transaction proofs, receipts, and promises made by the accused', 'Document the misrepresentation and the resulting financial loss', 'Report to the cybercrime portal and your bank for possible charge-back'],
  },
  {
    title: 'IPC 463 – Forgery',
    aliases: ['ipc 463', 'forgery ipc', 'false document making', 'electronic forgery'],
    sections: ['IPC Section 463'],
    punishment:
      'Making a false document or false electronic record with intent to cause damage, support a claim, commit fraud, or harm a person\'s reputation is forgery. Punishment under IPC 465 can be imprisonment up to 2 years, or fine, or both.',
    penalty:
      'IPC 463 defines the offence while IPC 465 prescribes the punishment. Electronic records, doctored PDFs, and fabricated screenshots are covered by this provision.',
    evidence: ['Preserve the original document and the alleged forgery side by side', 'Seek forensic examination to establish the document is forged', 'File a police complaint attaching the forged document as evidence'],
  },
  {
    title: 'IPC 464 – False Electronic Records',
    aliases: ['ipc 464', 'false electronic records', 'making false document', 'fabricated electronic document'],
    sections: ['IPC Section 464'],
    punishment:
      'A person makes a false document who dishonestly or fraudulently makes, signs, seals, or executes a document or electronic record, or causes it to be made, with knowledge that it will be used as genuine.',
    penalty:
      'Punishment is prescribed under IPC 465 at imprisonment up to 2 years, or fine, or both. Fabricated electronic contracts, forged digital signatures, and altered records fall within this definition.',
    evidence: ['Collect the false electronic record and original version for comparison', 'Seek digital forensic analysis of metadata to establish tampering', 'Document how the false record was presented as genuine and what harm resulted'],
  },
  {
    title: 'IPC 465 – Punishment for Forgery',
    aliases: ['ipc 465', 'punishment for forgery', 'forgery penalty', 'two year forgery'],
    sections: ['IPC Section 465'],
    punishment:
      'Whoever commits forgery as defined in IPC 463 and 464 shall be punished with imprisonment up to 2 years, or fine, or both.',
    penalty:
      'This is the base punishment for forgery. Aggravated forms—forgery for cheating under IPC 468 and forgery to harm reputation under IPC 469—carry heavier sentences.',
    evidence: ['Establish what was forged, who forged it, and for what purpose', 'Preserve the forged document alongside authentic comparators', 'Engage a forensic document examiner and file a formal police complaint'],
  },
  {
    title: 'IPC 468 – Forgery for Cheating',
    aliases: ['ipc 468', 'forgery for cheating', 'forged document fraud', 'fake contract cheating'],
    sections: ['IPC Section 468'],
    punishment:
      'Committing forgery with the intent that the forged document will be used for cheating can lead to imprisonment up to 7 years and a fine.',
    penalty:
      'The elevated sentence reflects the combined harm of forgery and cheating. Common online examples include forged contracts, fake receipts, and fabricated screenshots used to extract money.',
    evidence: ['Document the forged item and how it was used to deceive and cause loss', 'Preserve financial transaction records linked to the forged document', 'File a police complaint and approach the cybercrime portal with the forged evidence'],
  },
  {
    title: 'IPC 469 – Forgery for Reputation Harm',
    aliases: ['ipc 469', 'forgery reputation harm', 'fake screenshot defamation', 'forged document to harm reputation'],
    sections: ['IPC Section 469'],
    punishment:
      'Committing forgery with intent to harm the reputation of any party, including through fabricated screenshots, edited posts, or doctored records shared online, can lead to imprisonment up to 3 years and a fine.',
    penalty:
      'This provision is especially relevant in cases where fake conversations, doctored images, or false records are circulated online to damage a person\'s standing.',
    evidence: ['Archive the forged content and all platforms where it was shared', 'Seek forensic confirmation that the content was fabricated or altered', 'File a police complaint and request platform takedown of the forged material'],
  },
  {
    title: 'IPC 471 – Using Forged Electronic Documents',
    aliases: ['ipc 471', 'using forged document', 'using fake electronic record', 'fraudulent use forged document'],
    sections: ['IPC Section 471'],
    punishment:
      'Whoever fraudulently or dishonestly uses as genuine any document which they know or have reason to believe is forged faces the same punishment as the forger under the applicable forgery provision.',
    penalty:
      'If the underlying forgery was for cheating, the user of the document can be punished with up to 7 years imprisonment and a fine. Using forged electronic records in online transactions is a common application.',
    evidence: ['Establish that the accused knew the document was forged when they used it', 'Preserve the forged document and the transaction or context in which it was used', 'Collect communications showing the accused was aware of the falsity'],
  },
  {
    title: 'IPC 499 – Online Defamation',
    aliases: ['ipc 499', 'online defamation', 'defamation ipc', 'false statement reputation harm', 'social media defamation'],
    sections: ['IPC Section 499'],
    punishment:
      'Making or publishing an imputation intending to harm the reputation of a person through words, signs, or visible representations—including online posts, videos, or messages—constitutes defamation. Punishment under IPC 500 is imprisonment up to 2 years, or fine, or both.',
    penalty:
      'Certain exceptions apply, including truth published for public good, fair comments on public conduct of public servants, and privileged communications. The court evaluates each case on its facts.',
    evidence: ['Archive the defamatory post with URL, date, and account details', 'Document the reputation harm and identify the target and the audience reached', 'Send a legal notice and report to the platform before filing a criminal complaint'],
  },
  {
    title: 'IPC 500 – Punishment for Defamation',
    aliases: ['ipc 500', 'defamation punishment', 'two year defamation', 'reputation harm penalty'],
    sections: ['IPC Section 500'],
    punishment:
      'Whoever defames another person as defined under IPC 499 shall be punished with simple imprisonment up to 2 years, or fine, or both.',
    penalty:
      'Defamation under the IPC is a non-cognisable, bailable, compoundable offence, meaning it can be settled between parties. Civil defamation suits may also be filed independently for damages.',
    evidence: ['Preserve the defamatory content in its original published form', 'Document evidence of publication to a third party and the resulting reputational harm', 'Consult a lawyer about both criminal complaint and civil suit options'],
  },
  {
    title: 'IPC 503 – Criminal Intimidation',
    aliases: ['ipc 503', 'criminal intimidation', 'online threats ipc', 'threat to property', 'threatening message'],
    sections: ['IPC Section 503'],
    punishment:
      'Threatening another person with injury to their person, reputation, or property, or to the person or reputation of anyone in whom they are interested, with intent to cause alarm or compel an action, is criminal intimidation.',
    penalty:
      'Punishment under IPC 506 for criminal intimidation can be imprisonment up to 2 years, or fine, or both. Threats of death or grievous hurt or involving property destruction can attract up to 7 years imprisonment.',
    evidence: ['Export all threatening messages with timestamps and sender details', 'Document the medium used—email, social media, messaging apps', 'File an FIR or approach the cybercrime portal with the threat evidence'],
  },
  {
    title: 'IPC 505 – Fake News and Rumour Circulation',
    aliases: ['ipc 505', 'fake news ipc', 'rumor circulation', 'false statement fear', 'misinformation online', 'panic inducing content'],
    sections: ['IPC Section 505'],
    punishment:
      'Making, publishing, or circulating statements, rumours, or reports in print or online that may cause fear or alarm to the public, or incite any class to commit an offence against another class, can lead to imprisonment up to 3 years, or fine, or both.',
    penalty:
      'If committed at a place of worship or in an assembly, enhanced punishment applies. Online viral misinformation designed to cause public disorder falls squarely within this provision.',
    evidence: ['Archive the false statement with its source account and publication timestamp', 'Document the spread and any real-world panic or harm caused', 'Report to the platform and the cybercrime portal with evidence of the false nature of the statement'],
  },
  {
    title: 'IPC 506 – Online Threats',
    aliases: ['ipc 506', 'online threats', 'threat message punishment', 'intimidation online'],
    sections: ['IPC Section 506'],
    punishment:
      'Criminal intimidation as defined in IPC 503 is punishable under IPC 506. Basic criminal intimidation online can lead to imprisonment up to 2 years, or fine, or both.',
    penalty:
      'If the threat is to cause death or grievous hurt, to destroy property by fire, or to commit an unnatural offence, the punishment extends to imprisonment up to 7 years and a fine.',
    evidence: ['Preserve all threat communications with account details and timestamps', 'Document how the threat was received and its effect on the victim', 'File an FIR and approach the cybercrime portal promptly'],
  },
  {
    title: 'IPC 507 – Anonymous Threats',
    aliases: ['ipc 507', 'anonymous threats', 'hidden identity threat', 'untraceable threat', 'anonymous intimidation'],
    sections: ['IPC Section 507'],
    punishment:
      'Criminal intimidation by anonymous communication—such as threats sent through burner accounts, unregistered numbers, or masked emails—can lead to imprisonment up to 2 years in addition to punishment under IPC 506.',
    penalty:
      'The additional punishment for concealment of identity reflects the aggravated harm of untraceable threats. Law enforcement can seek platform data to identify perpetrators.',
    evidence: ['Preserve the anonymous message with metadata if available', 'Note the platform, email header details, or number from which the threat was sent', 'File a complaint citing both IPC 506 and IPC 507 and request police to trace the sender'],
  },
  {
    title: 'IPC 509 – Insulting Modesty of Woman Online',
    aliases: ['ipc 509', 'insult modesty woman', 'obscene gesture online', 'word gesture insult woman', 'online sexual insult woman'],
    sections: ['IPC Section 509'],
    punishment:
      'Uttering words, making gestures, or exhibiting any object intending to insult the modesty of a woman, including through online messages, social media, or video calls, can lead to simple imprisonment up to 3 years and a fine.',
    penalty:
      'The provision covers a wide range of online conduct including sending obscene images, making lewd comments, or using gestures in video communication targeting women.',
    evidence: ['Export the offensive messages, images, or videos with timestamps and account details', 'Document the platform and how the material was delivered to the victim', 'Report to the platform for account action and file a complaint with the cybercrime portal'],
  },

  // ── BNS – Cyber Crime Related Sections ────────────────────────────────────
  {
    title: 'BNS 61 – Criminal Conspiracy',
    aliases: ['bns 61', 'bns criminal conspiracy', 'bharatiya nyaya sanhita conspiracy', 'organised cyber planning'],
    sections: ['BNS Section 61'],
    punishment:
      'Under the Bharatiya Nyaya Sanhita, criminal conspiracy among two or more persons to commit a cyber offence is punishable. Punishment mirrors the substantive offence they conspired to commit.',
    penalty:
      'For conspiracies involving serious offences punishable with imprisonment of two years or more, each conspirator is liable to the same sentence. Minor conspiracies attract imprisonment of up to 6 months, or fine, or both.',
    evidence: ['Preserve all communications, group chats, and plans shared digitally', 'Document each person\'s role and the offence they planned to execute', 'Collect financial records showing funding or coordination of the cyber plan'],
  },
  {
    title: 'BNS 75 – Sexual Harassment',
    aliases: ['bns 75', 'bns sexual harassment', 'unwelcome sexual contact bns', 'digital sexual harassment'],
    sections: ['BNS Section 75'],
    punishment:
      'Under the BNS, sexual harassment including unwelcome sexual advances, demands for sexual favours, and making sexually coloured remarks online is an offence. Imprisonment up to 3 years, or fine, or both, depending on the sub-section.',
    penalty:
      'Online sexual harassment through messages, video calls, or social media falls within this provision. The BNS updates and consolidates the earlier IPC 354A framework.',
    evidence: ['Save all offensive communications with platform account details and timestamps', 'Document the pattern of behaviour if the harassment was repeated', 'Report to the platform and file a complaint with the cybercrime cell or police'],
  },
  {
    title: 'BNS 77 – Voyeurism',
    aliases: ['bns 77', 'bns voyeurism', 'hidden recording bns', 'non-consensual filming bns'],
    sections: ['BNS Section 77'],
    punishment:
      'Watching or capturing images of a woman in a private act without consent, or disseminating such material, is a serious offence under the BNS. First conviction: imprisonment of 1 to 3 years and a fine.',
    penalty:
      'Subsequent convictions attract imprisonment of 3 to 7 years and a fine. Dissemination of the captured material is treated as an aggravating factor.',
    evidence: ['Preserve links, filenames, and platform information where the content appeared', 'Report to police and request emergency content removal from the platform', 'Note any device, camera, or recording equipment found at the scene'],
  },
  {
    title: 'BNS 78 – Cyber Stalking',
    aliases: ['bns 78', 'bns cyber stalking', 'online stalking bns', 'repeated digital contact woman'],
    sections: ['BNS Section 78'],
    punishment:
      'Repeatedly following or contacting a woman online despite her disinterest, or monitoring her digital communications, constitutes stalking under the BNS. First conviction: imprisonment up to 3 years and a fine.',
    penalty:
      'Second and subsequent convictions attract imprisonment up to 5 years and a fine. The BNS updates and replaces the IPC 354D framework for stalking.',
    evidence: ['Export all messages, follow requests, and contact attempts with timestamps', 'Document the platforms used and the frequency of unwanted contact', 'File an FIR and report to the platform for account suspension'],
  },
  {
    title: 'BNS 79 – Insulting Modesty of Woman',
    aliases: ['bns 79', 'insult modesty woman bns', 'obscene message woman bns', 'online insult modesty'],
    sections: ['BNS Section 79'],
    punishment:
      'Uttering words, making gestures, or exhibiting objects intending to insult the modesty of a woman, whether online or offline, is punishable. The BNS consolidates and updates the former IPC 509 framework.',
    penalty:
      'Imprisonment up to 3 years and a fine. Online conduct such as sending obscene messages, images, or making explicit remarks targeting women falls within this section.',
    evidence: ['Preserve the offensive communication in its original form', 'Note account identifiers, timestamps, and the platform used', 'Report to the platform and file a complaint with the cybercrime portal or police'],
  },
  {
    title: 'BNS 111 – Organised Cyber Crime',
    aliases: ['bns 111', 'organised cyber crime', 'criminal syndicate online', 'bns organised crime', 'cybercrime gang'],
    sections: ['BNS Section 111'],
    punishment:
      'Membership or participation in an organised crime syndicate engaged in serious cyber offences is a grave offence under the BNS. Punishment can include imprisonment up to 10 years or more and substantial fines, depending on the conduct proved.',
    penalty:
      'The BNS treats organised cyber crime as a category that warrants significantly enhanced punishment compared to individual offences, reflecting the scale of harm caused by criminal networks.',
    evidence: ['Document the network structure, hierarchy, and communication channels used', 'Preserve financial records showing proceeds or funding of organised cyber activity', 'Report to specialised law-enforcement units such as the cybercrime wing or state CID'],
  },
  {
    title: 'BNS 112 – Petty Organised Crime',
    aliases: ['bns 112', 'petty organised crime', 'small scale organised cyber fraud', 'group cyber fraud'],
    sections: ['BNS Section 112'],
    punishment:
      'Groups or gangs engaged in smaller-scale but systematic cyber frauds, such as coordinated phishing campaigns or SIM swap rings, fall under petty organised crime. Imprisonment up to 7 years and a fine.',
    penalty:
      'The BNS distinguishes between full organised crime networks and smaller criminal groups. Both attract enhanced punishment compared to individual offenders to deter systematic wrongdoing.',
    evidence: ['Map the roles of each member of the group with supporting evidence', 'Preserve communications showing the coordinated nature of the fraud', 'File a complaint with the cybercrime wing and request coordination with the bank\'s fraud department'],
  },
  {
    title: 'BNS 113 – Cyber Terrorism',
    aliases: ['bns 113', 'cyber terrorism bns', 'digital terrorism india', 'attack on critical infrastructure', 'terror act online'],
    sections: ['BNS Section 113'],
    punishment:
      'Committing or conspiring to commit a terrorist act through electronic means—including attacks on critical information infrastructure, spreading terror online, or using cyberspace to fund or plan terror—can lead to rigorous imprisonment for life or the death penalty in extreme cases.',
    penalty:
      'Even preparation or conspiracy attracts rigorous imprisonment up to 10 years and a fine. The BNS replaces and expands the earlier UAPA and IT Act cyber-terrorism framework.',
    evidence: ['Report immediately to the CERT-In and law enforcement cyber wing', 'Preserve logs, attack signatures, and forensic data without alteration', 'Do not negotiate with perpetrators; escalate to federal authorities immediately'],
  },
  {
    title: 'BNS 152 – Endangering Sovereignty Through Digital Means',
    aliases: ['bns 152', 'endangering sovereignty', 'national security cyber', 'digital sedition', 'anti-national content online'],
    sections: ['BNS Section 152'],
    punishment:
      'Acts committed through digital means that endanger the sovereignty, unity, or integrity of India—including spreading secessionist content or content inciting violent overthrow of the state—attract serious punishment.',
    penalty:
      'Punishment can include imprisonment up to 7 years and a fine, or life imprisonment for the most serious cases. The BNS updates the former sedition provisions with a focus on the nature of the act rather than mere speech.',
    evidence: ['Archive the digital content with URLs, timestamps, and account identifiers', 'Document how the content was distributed and the audience it reached', 'Report to the CERT-In, the platform, and the nearest police station simultaneously'],
  },
  {
    title: 'BNS 196 – Promoting Enmity Online',
    aliases: ['bns 196', 'promoting enmity bns', 'communal hatred bns', 'religious enmity online bns', 'hate content social media bns'],
    sections: ['BNS Section 196'],
    punishment:
      'Publishing or sharing content online that promotes enmity between groups based on religion, race, language, caste, or community is an offence under the BNS. Imprisonment up to 3 years, or fine, or both.',
    penalty:
      'If the offence is committed at a place of worship or in an assembly, punishment can extend to 5 years and a fine. The BNS updates and replaces the former IPC 153A framework.',
    evidence: ['Screenshot and archive the post with its URL and the account details', 'Document the reach and engagement of the post to show its public impact', 'Report to the platform and file a complaint with the cybercrime portal'],
  },
  {
    title: 'BNS 204 – False Digital Evidence',
    aliases: ['bns 204', 'false digital evidence bns', 'fabricated electronic evidence', 'fake evidence bns', 'false record court'],
    sections: ['BNS Section 204'],
    punishment:
      'Fabricating false electronic evidence or records intended for use in legal proceedings or official processes is a serious offence under the BNS. Punishment can include imprisonment up to 7 years and a fine.',
    penalty:
      'The provision is invoked when forged screenshots, doctored emails, or fabricated digital records are submitted in court or during official investigations.',
    evidence: ['Identify the evidence submitted and seek forensic analysis to prove fabrication', 'Preserve the metadata and hash values of the original authentic records', 'Report to the relevant court or authority and file a police complaint for fabrication'],
  },
  {
    title: 'BNS 217 – Fake Electronic Evidence',
    aliases: ['bns 217', 'fake electronic evidence bns', 'false evidence bns', 'forged digital submission'],
    sections: ['BNS Section 217'],
    punishment:
      'Giving or fabricating false electronic evidence with intent to cause another person to be convicted of an offence attracts enhanced punishment. If the offence for which the false evidence is created is capital in nature, the fabricator can be sentenced to life imprisonment.',
    penalty:
      'For offences punishable by 7 or more years, the fabricator can be imprisoned for up to 10 years. The BNS treats fabrication of evidence very seriously regardless of the digital or physical medium.',
    evidence: ['Establish the false nature of the electronic record through forensic examination', 'Document who submitted the fabricated evidence and in what forum', 'Report immediately to the presiding authority and file a separate complaint for fabrication'],
  },
  {
    title: 'BNS 237 – Fabricating False Records',
    aliases: ['bns 237', 'fabricating false records bns', 'false document creation bns', 'fake government record'],
    sections: ['BNS Section 237'],
    punishment:
      'Making or using false electronic records or documents for official, governmental, or judicial purposes is an offence. Punishment under BNS Section 237 can include imprisonment and fine commensurate with the harm caused.',
    penalty:
      'Fabrication of digital government records, tampered-with official certificates, and forged regulatory filings all fall within this provision.',
    evidence: ['Preserve the original authentic record alongside the fabricated version for comparison', 'Seek forensic document examination to confirm the record was tampered with', 'Report to the relevant government authority and file a police complaint'],
  },
  {
    title: 'BNS 294 – Obscene Electronic Content',
    aliases: ['bns 294', 'obscene electronic content bns', 'online pornography bns', 'obscene material online bns'],
    sections: ['BNS Section 294'],
    punishment:
      'Selling, distributing, exhibiting, or circulating obscene content through electronic means is an offence under the BNS. The provision updates and replaces the IPC 292 framework for the digital age.',
    penalty:
      'First conviction: imprisonment up to 2 years and a fine. Subsequent convictions: imprisonment up to 5 years and a fine. IT Act Sections 67 and 67A may also apply concurrently.',
    evidence: ['Archive the URL and platform where the content was found', 'Report to the platform and the cybercrime portal without re-sharing the material', 'Note the account details and any financial transactions if the content was sold'],
  },
  {
    title: 'BNS 299 – Religious Hate Content Online',
    aliases: ['bns 299', 'religious hate content bns', 'online religious insult bns', 'blasphemy bns'],
    sections: ['BNS Section 299'],
    punishment:
      'Deliberate and malicious acts intended to outrage religious feelings online, including through social media posts, videos, or messages, is an offence under the BNS. Imprisonment up to 3 years, or fine, or both.',
    penalty:
      'The BNS replaces the former IPC 295A framework. Courts assess whether the act was deliberate and whether it targeted religious feelings of a particular class.',
    evidence: ['Preserve the offending content with its URL, date, and account identifiers', 'Document the distribution reach and any real-world impact', 'Report to the platform and file a complaint with the cybercrime portal'],
  },
  {
    title: 'BNS 303 – Theft of Digital Devices or Data',
    aliases: ['bns 303', 'digital theft bns', 'stolen device bns', 'theft data bns'],
    sections: ['BNS Section 303'],
    punishment:
      'Dishonestly taking digital devices, storage media, or data stored thereon is treated as theft under the BNS. Punishment can be imprisonment up to 3 years, or fine, or both.',
    penalty:
      'The BNS updates the former IPC 379 framework. IT Act provisions for data theft may be applied alongside BNS 303 for a comprehensive charge when digital data is specifically targeted.',
    evidence: ['File an FIR with device IMEI, serial numbers, and a description of the data taken', 'Check cloud and email account access logs for unauthorized activity after the theft', 'Contact your telecom provider to block the stolen SIM and flag the stolen device'],
  },
  {
    title: 'BNS 308 – Online Extortion',
    aliases: ['bns 308', 'online extortion bns', 'digital extortion bns', 'cyber blackmail bns', 'demand ransom bns'],
    sections: ['BNS Section 308'],
    punishment:
      'Putting any person in fear of injury in order to commit extortion through electronic means is an offence under the BNS. Imprisonment up to 3 years, or fine, or both for basic extortion.',
    penalty:
      'Aggravated forms—such as threatening to harm reputation, exposing private content, or threatening violence—attract higher sentences. The BNS updates and consolidates extortion provisions from the IPC for digital contexts.',
    evidence: ['Preserve all extortion communications with account details and threat content', 'Do not pay any ransom without consulting law enforcement first', 'Report immediately to the cybercrime portal and your nearest police station'],
  },
  {
    title: 'BNS 316 – Criminal Breach of Trust',
    aliases: ['bns 316', 'bns breach of trust', 'online breach of trust', 'misappropriation bns', 'digital funds misuse bns'],
    sections: ['BNS Section 316'],
    punishment:
      'Dishonest misappropriation or conversion of entrusted property, including digital assets or online funds, is criminal breach of trust under the BNS. Punishment up to 3 years imprisonment and a fine.',
    penalty:
      'Enhanced punishment applies for breach by public servants, bankers, merchants, and agents under BNS Section 316(2). The BNS updates the former IPC 406 and 409 framework.',
    evidence: ['Document all agreements and transactions showing the entrustment relationship', 'Preserve digital records of how the accused handled the entrusted funds', 'Report to the economic offences wing and file a complaint with the cybercrime portal'],
  },
  {
    title: 'BNS 318 – Online Cheating and Fraud',
    aliases: ['bns 318', 'online cheating bns', 'digital fraud bns', 'bns cheating', 'e-commerce fraud bns'],
    sections: ['BNS Section 318'],
    punishment:
      'Dishonestly inducing a person to deliver property or alter valuable securities through deception online is cheating under the BNS. Punishment can be imprisonment up to 7 years and a fine for cases involving property delivery.',
    penalty:
      'The BNS updates and replaces IPC 415 and IPC 420. Online investment frauds, e-commerce scams, fake job offers, and similar schemes fall squarely within this provision.',
    evidence: ['Preserve transaction records, screenshots of the fraudulent offer, and all communications', 'Document the loss suffered and the false representation made', 'Report to the cybercrime portal and your bank for possible charge-back or freeze of funds'],
  },
  {
    title: 'BNS 319 – Cheating by Personation or Fake Profile',
    aliases: ['bns 319', 'cheating by personation bns', 'fake profile bns', 'online impersonation bns', 'identity fraud bns'],
    sections: ['BNS Section 319'],
    punishment:
      'Cheating by impersonating another person or creating a fake profile to deceive victims is an offence under the BNS. Imprisonment up to 3 years, or fine, or both.',
    penalty:
      'The BNS updates the former IPC 416 and IPC 419 framework. Online impersonation of officials, celebrities, or private individuals to extract money or benefits is a primary application.',
    evidence: ['Archive the fake profile or impersonated account with screenshots', 'Document all communications where the accused posed as another person', 'Report to the platform for account removal and file a cybercrime complaint'],
  },
  {
    title: 'BNS 335 – Forgery',
    aliases: ['bns 335', 'forgery bns', 'false document bns', 'electronic forgery bns'],
    sections: ['BNS Section 335'],
    punishment:
      'Making a false document or false electronic record with fraudulent intent is forgery under the BNS. Punishment up to 2 years imprisonment, or fine, or both.',
    penalty:
      'The BNS updates and consolidates the IPC 463–465 forgery framework. Electronic records, doctored PDFs, fabricated screenshots, and forged digital contracts are all covered.',
    evidence: ['Preserve both the original and the alleged forged version for forensic comparison', 'Seek digital forensic examination to confirm tampering of the electronic record', 'File a police complaint with the forged material attached as evidence'],
  },
  {
    title: 'BNS 336 – Forged Electronic Records',
    aliases: ['bns 336', 'forged electronic records bns', 'fake digital document bns', 'fabricated record bns'],
    sections: ['BNS Section 336'],
    punishment:
      'Defining and targeting the making of false electronic documents, BNS 336 complements the broader forgery provision. It specifically covers the creation of fabricated digital records intended to be used as genuine.',
    penalty:
      'Punishment under the related provisions can extend up to 7 years imprisonment and a fine when forgery is committed for the purpose of cheating.',
    evidence: ['Collect metadata and hash values of the authentic record to compare with the forged version', 'Document how the false electronic record was presented and to whom', 'Engage a digital forensic expert and file a police complaint for forgery'],
  },
  {
    title: 'BNS 338 – Forgery of Valuable Security or Documents',
    aliases: ['bns 338', 'forgery valuable security bns', 'forged cheque bns', 'fake certificate bns', 'forged legal document bns'],
    sections: ['BNS Section 338'],
    punishment:
      'Forgery of valuable securities, wills, authorities, or documents that create, transfer, or extinguish valuable rights—including digital versions—attracts enhanced punishment of imprisonment up to 7 years and a fine.',
    penalty:
      'Online forgery of share certificates, digital contracts, government-issued documents, and similar valuable instruments falls within this provision.',
    evidence: ['Preserve the forged security or document and the authentic comparator', 'Document the financial or legal rights affected by the forgery', 'Report to the issuing authority and file a police complaint immediately'],
  },
  {
    title: 'BNS 340 – Using Forged Electronic Documents',
    aliases: ['bns 340', 'using forged document bns', 'fraudulent use electronic record bns', 'submitting forged document bns'],
    sections: ['BNS Section 340'],
    punishment:
      'Whoever fraudulently or dishonestly uses a document or electronic record known to be forged faces the same punishment as if they had committed the forgery themselves.',
    penalty:
      'If the underlying forgery was for cheating, the user of the forged electronic record can be imprisoned for up to 7 years and fined. The BNS updates the former IPC 471 framework.',
    evidence: ['Establish that the accused knew the record was forged at the time of use', 'Preserve the forged document and the transaction or proceeding in which it was used', 'Document any loss caused by reliance on the forged electronic record'],
  },
  {
    title: 'BNS 351 – Criminal Intimidation',
    aliases: ['bns 351', 'criminal intimidation bns', 'online threat bns', 'threatening message bns'],
    sections: ['BNS Section 351'],
    punishment:
      'Threatening a person with injury to their person, reputation, or property through electronic communication to cause alarm or compel an act is criminal intimidation. Imprisonment up to 2 years, or fine, or both.',
    penalty:
      'Threats involving death, grievous hurt, or property destruction can attract imprisonment up to 7 years. Anonymous threats carry additional punishment. The BNS updates the IPC 503 and 506 framework.',
    evidence: ['Save all threatening messages with timestamps, account identifiers, and platform details', 'Document the impact of the threat on the victim\'s behaviour or wellbeing', 'File an FIR citing BNS 351 and approach the cybercrime portal with evidence'],
  },
  {
    title: 'BNS 352 – Intentional Online Insult',
    aliases: ['bns 352', 'intentional insult bns', 'provocation online bns', 'deliberate insult bns'],
    sections: ['BNS Section 352'],
    punishment:
      'Intentionally insulting a person through online communication with intent to provoke a breach of peace is an offence. Imprisonment up to 2 years, or fine, or both.',
    penalty:
      'The provision targets deliberate online provocations designed to incite a violent or unlawful response. The BNS updates the former IPC 504 framework.',
    evidence: ['Preserve the insulting communication with account details and timestamps', 'Document the provocative intent if evidenced through prior communications', 'Report to the platform and file a complaint with the police or cybercrime portal'],
  },
  {
    title: 'BNS 356 – Defamation',
    aliases: ['bns 356', 'defamation bns', 'online defamation bns', 'digital reputation harm bns'],
    sections: ['BNS Section 356'],
    punishment:
      'Making or publishing an imputation intended to harm the reputation of a person through online posts, videos, or messages constitutes defamation under the BNS. Punishment up to 2 years imprisonment, or fine, or both.',
    penalty:
      'The BNS updates and replaces the former IPC 499 and IPC 500 framework. The same exceptions for truth in public interest, fair comment, and privilege apply under the BNS.',
    evidence: ['Archive the defamatory content with its URL, date, and the publishing account details', 'Document evidence of harm to reputation and publication to a third party', 'Send a legal notice and report to the platform before filing a formal complaint'],
  },
  {
    title: 'BNS 357 – Publishing Defamatory Content',
    aliases: ['bns 357', 'publishing defamation bns', 'online defamatory publication bns', 'defamatory article bns'],
    sections: ['BNS Section 357'],
    punishment:
      'Printing or engraving—and by extension publishing online—matter known to be defamatory is an offence under the BNS. Punishment up to 2 years imprisonment, or fine, or both.',
    penalty:
      'Persons who sell or offer for sale printed or electronic material containing defamatory content knowing its nature are also liable under this provision.',
    evidence: ['Preserve the published content, its URL, and the publisher\'s account or website details', 'Document the audience reached and the reputation harm suffered', 'Consult a lawyer about both criminal complaint and civil suit for damages'],
  },

  // ── IT Act – Full Sections ─────────────────────────────────────────────────
  {
    title: 'IT Act 43 – Unauthorized Access and Damage',
    aliases: ['it act 43', 'unauthorized access it act', 'computer damage', 'civil penalty it act', 'compensation hacking'],
    sections: ['IT Act Section 43'],
    punishment:
      'Section 43 is a civil provision that entitles a person whose computer system or network is accessed without permission, or whose data is damaged, deleted, or disrupted, to claim compensation. There is no direct imprisonment under Section 43 itself.',
    penalty:
      'The adjudicating officer can award compensation up to INR 5 crore. Cases above this limit are referred to civil courts. Unauthorized access, data downloading, virus introduction, and denial-of-service attacks are all covered.',
    evidence: ['Preserve system logs, intrusion detection alerts, and access records', 'Quantify the financial loss or damage caused to support the compensation claim', 'File a complaint with the IT Act adjudicating authority or approach the cybercrime cell'],
  },
  {
    title: 'IT Act 65 – Tampering With Source Code',
    aliases: ['it act 65', 'source code tampering', 'software code alteration', 'program tampering'],
    sections: ['IT Act Section 65'],
    punishment:
      'Knowingly or intentionally concealing, destroying, or altering any computer source code required to be kept by law can lead to imprisonment up to 3 years, or a fine up to INR 2 lakh, or both.',
    penalty:
      'This provision is often applied to cases where developers or employees tamper with source code of regulated software, banking applications, or systems required to maintain audit trails.',
    evidence: ['Preserve the original source code and all altered versions with timestamps', 'Obtain version control or repository history to establish the tampering', 'File a complaint with the cybercrime cell and engage a forensic software expert'],
  },
  {
    title: 'IT Act 66 – Computer Related Offences and Hacking',
    aliases: ['it act 66', 'it act hacking', 'computer offence', 'dishonest computer access'],
    sections: ['IT Act Section 66'],
    punishment:
      'Any act covered under Section 43 that is done dishonestly or fraudulently is also an offence under Section 66, attracting criminal rather than civil liability. Imprisonment up to 3 years, or fine up to INR 5 lakh, or both.',
    penalty:
      'Section 66 is the criminal counterpart to Section 43 and is invoked when fraudulent or dishonest intent is proved. Hacking, unauthorized data access for fraud, and deliberate system disruption are key applications.',
    evidence: ['Establish the dishonest or fraudulent intent behind the unauthorized access', 'Preserve logs, forensic data, and any evidence of financial gain by the accused', 'File an FIR citing both Section 43 for compensation and Section 66 for criminal prosecution'],
  },
  {
    title: 'IT Act 66B – Receiving Stolen Computer Resource',
    aliases: ['it act 66b', 'receiving stolen computer resource', 'stolen data receiver', 'handling stolen digital property'],
    sections: ['IT Act Section 66B'],
    punishment:
      'Dishonestly receiving or retaining any stolen computer resource or communication device knowing it to be stolen is an offence. Imprisonment up to 3 years, or fine up to INR 1 lakh, or both.',
    penalty:
      'This provision targets those who receive hacked data, stolen databases, or compromised device credentials, even if they did not commit the original theft or hacking.',
    evidence: ['Document evidence of receipt or possession of the stolen resource', 'Establish that the accused knew or had reason to know the resource was stolen', 'Preserve digital forensic evidence linking the accused to the stolen data or device'],
  },
  {
    title: 'IT Act 66C – Identity Theft',
    aliases: ['it act 66c', 'identity theft it act', 'electronic signature fraud', 'password theft it act'],
    sections: ['IT Act Section 66C'],
    punishment:
      'Fraudulently or dishonestly making use of any person\'s electronic signature, password, or any other unique identification feature is identity theft under the IT Act. Imprisonment up to 3 years and a fine up to INR 1 lakh.',
    penalty:
      'Section 66C is commonly applied in cases of SIM swap fraud, stolen OTPs, misuse of login credentials, and impersonation using another person\'s digital identity.',
    evidence: ['Preserve evidence of the stolen credential and how it was misused', 'Get logs from the service provider showing access using the victim\'s credentials', 'Report immediately to the bank or service provider and file a cybercrime complaint'],
  },
  {
    title: 'IT Act 66D – Online Cheating by Personation',
    aliases: ['it act 66d', 'cheating by personation it act', 'online impersonation it act', 'computer resource fraud impersonation'],
    sections: ['IT Act Section 66D'],
    punishment:
      'Cheating by personation using a computer resource or communication device can lead to imprisonment up to 3 years and a fine up to INR 1 lakh.',
    penalty:
      'This provision is widely used for online impersonation frauds, fake customer service calls, and phishing attacks where the accused pretends to be a bank, official, or trusted entity.',
    evidence: ['Save the fraudulent communication, website, or account used for impersonation', 'Document all transactions or actions taken by the victim as a result of the impersonation', 'Report to the cybercrime portal and the relevant institution being impersonated'],
  },
  {
    title: 'IT Act 66E – Violation of Privacy',
    aliases: ['it act 66e', 'violation of privacy it act', 'capturing private image', 'publishing private area image'],
    sections: ['IT Act Section 66E'],
    punishment:
      'Intentionally or knowingly capturing, publishing, or transmitting the image of a private area of any person without their consent violates their privacy under the IT Act. Imprisonment up to 3 years, or fine up to INR 2 lakh, or both.',
    penalty:
      'This provision applies to upskirt photos, voyeuristic recordings, and non-consensual sharing of intimate images online. It complements BNS Section 77 on voyeurism.',
    evidence: ['Preserve links and platform details where the image or video was shared', 'Report to the platform for emergency removal and preserve evidence before takedown', 'File a complaint with the cybercrime portal and request police assistance'],
  },
  {
    title: 'IT Act 66F – Cyber Terrorism',
    aliases: ['it act 66f', 'cyber terrorism it act', 'attack critical infrastructure it act', 'terror online it act'],
    sections: ['IT Act Section 66F'],
    punishment:
      'Committing or conspiring to commit cyber attacks that threaten the unity, integrity, security, or sovereignty of India, or that create terror in the minds of the public, attracts life imprisonment.',
    penalty:
      'Section 66F is one of the most serious provisions of the IT Act. Attacks on critical information infrastructure such as power grids, banking systems, or defence networks fall within this section.',
    evidence: ['Immediately report to CERT-In and law-enforcement cyber wings', 'Preserve attack logs, signatures, and forensic data without modification', 'Do not attempt to handle the incident alone; escalate to national cybersecurity authorities'],
  },
  {
    title: 'IT Act 67 – Obscene Electronic Content',
    aliases: ['it act 67', 'obscene content it act', 'online pornography it act', 'obscene transmission'],
    sections: ['IT Act Section 67'],
    punishment:
      'Publishing or transmitting obscene material in electronic form is an offence. First conviction: imprisonment up to 3 years and a fine up to INR 5 lakh. Subsequent convictions: imprisonment up to 5 years and a fine up to INR 10 lakh.',
    penalty:
      'Section 67 is the IT Act counterpart to IPC 292 for electronic media. Online distribution of obscene content, pornographic websites, and sexting to non-consenting persons are key applications.',
    evidence: ['Archive the URL and platform where the content was hosted', 'Report to the platform and the cybercrime portal without re-sharing the material', 'Preserve device or account details of the person who transmitted the content'],
  },
  {
    title: 'IT Act 67A – Sexually Explicit Content',
    aliases: ['it act 67a', 'sexually explicit content it act', 'explicit material online it act', 'adult content it act'],
    sections: ['IT Act Section 67A'],
    punishment:
      'Publishing or transmitting material containing sexually explicit acts in electronic form can lead to imprisonment up to 5 years on first conviction and up to 7 years on subsequent conviction, along with fines.',
    penalty:
      'Section 67A applies to material depicting explicit sexual activity—going beyond general obscenity covered under Section 67. Online platforms, messaging applications, and social media are common venues for this offence.',
    evidence: ['Preserve evidence of the sexually explicit content with platform and account details', 'Report to the platform for takedown and the cybercrime portal for investigation', 'Do not re-share the material when filing the complaint'],
  },
  {
    title: 'IT Act 67B – Child Sexual Abuse Material',
    aliases: ['it act 67b', 'child sexual content it act', 'csam it act', 'child porn it act', 'minor explicit content'],
    sections: ['IT Act Section 67B'],
    punishment:
      'Publishing, transmitting, browsing, downloading, or facilitating child sexual abuse material online is a grave offence. First conviction: imprisonment up to 5 years and a fine up to INR 10 lakh. Subsequent conviction: imprisonment up to 7 years and a fine up to INR 10 lakh.',
    penalty:
      'Any act inducing or enticing a child into sexually explicit conduct online also falls within this section. The National Centre for Missing and Exploited Children and CERT-In maintain emergency reporting mechanisms.',
    evidence: ['Report to the NCMEC cybertipline and CERT-In immediately', 'Preserve the URL and platform details without downloading or distributing the material further', 'Contact local police and ask for referral to specialised child protection units'],
  },
  {
    title: 'IT Act 67C – Failure to Preserve Data',
    aliases: ['it act 67c', 'failure to preserve data', 'data retention failure', 'intermediary data preservation'],
    sections: ['IT Act Section 67C'],
    punishment:
      'Intermediaries such as social media platforms, websites, and internet service providers are required to preserve specified information for prescribed periods. Failure to preserve such data is an offence attracting imprisonment up to 3 years and a fine.',
    penalty:
      'This provision is primarily directed at intermediaries rather than individual users and is enforced when platforms fail to retain traffic data, logs, or user records as directed by authorities.',
    evidence: ['Document the request for data preservation and the intermediary\'s failure to comply', 'Preserve copies of any communication sent to the intermediary regarding data retention', 'Report to CERT-In or the relevant regulatory authority for enforcement action'],
  },
  {
    title: 'IT Act 69 – Interception Powers',
    aliases: ['it act 69', 'interception it act', 'government interception', 'lawful interception', 'monitor communications'],
    sections: ['IT Act Section 69'],
    punishment:
      'Section 69 empowers the central and state governments to intercept, monitor, or decrypt information transmitted through any computer resource in the interest of national security or public order. Failure to comply with an interception order attracts imprisonment up to 7 years and a fine.',
    penalty:
      'This section grants surveillance powers to government agencies and creates an obligation on intermediaries and service providers to assist. It does not create criminal liability for users; it governs government interception authority.',
    evidence: ['Not applicable to individual victims; this section governs government powers', 'If an interception order is wrongfully executed, seek legal advice on remedies', 'Intermediaries must ensure all interception requests are properly authorized before complying'],
  },
  {
    title: 'IT Act 69A – Website and App Blocking',
    aliases: ['it act 69a', 'website blocking it act', 'app blocking india', 'government website takedown'],
    sections: ['IT Act Section 69A'],
    punishment:
      'The central government can direct blocking of any website, app, or online resource in the interest of sovereignty, security, public order, or to prevent incitement. Failure to comply by intermediaries attracts imprisonment up to 7 years and a fine.',
    penalty:
      'Section 69A is invoked for blocking social media content, apps, and websites deemed harmful. Individual users are not directly penalised, but intermediaries must comply promptly.',
    evidence: ['Document any blocking order received and comply within the prescribed timeframe', 'Intermediaries should maintain records of all blocking requests and their compliance', 'Affected parties can challenge blocking orders through the appropriate legal forum'],
  },
  {
    title: 'IT Act 69B – Traffic Monitoring',
    aliases: ['it act 69b', 'traffic monitoring it act', 'internet monitoring india', 'network traffic surveillance'],
    sections: ['IT Act Section 69B'],
    punishment:
      'The central government can direct monitoring and collection of traffic data from any computer resource for cybersecurity purposes. Non-compliance by intermediaries attracts imprisonment up to 3 years and a fine.',
    penalty:
      'Section 69B authorises cyber intelligence gathering by designated agencies. Intermediaries are obligated to assist and provide technical infrastructure for traffic monitoring.',
    evidence: ['Intermediaries should maintain compliance protocols and audit trails for monitoring requests', 'All monitoring must be pursuant to a lawful government direction', 'Affected parties believing unlawful monitoring has occurred may seek judicial review'],
  },
  {
    title: 'IT Act 70 – Protected Systems',
    aliases: ['it act 70', 'protected systems it act', 'critical system access', 'government computer attack'],
    sections: ['IT Act Section 70'],
    punishment:
      'Any person who secures access or attempts to secure access to a protected system—designated by the government as critical—in contravention of the provisions commits an offence. Imprisonment up to 10 years and a fine.',
    penalty:
      'Power plants, financial systems, defence networks, and other critical infrastructure are typically designated as protected systems. The enhanced punishment reflects the national security implications of attacks on these systems.',
    evidence: ['Report immediately to CERT-In and the system operator', 'Preserve all access logs, intrusion indicators, and forensic data', 'Do not attempt to investigate independently; escalate to national cybersecurity authorities'],
  },
  {
    title: 'IT Act 70B – CERT-In Powers',
    aliases: ['it act 70b', 'cert-in it act', 'national nodal agency', 'cybersecurity incident response'],
    sections: ['IT Act Section 70B'],
    punishment:
      'Section 70B establishes CERT-In as the national nodal agency for responding to cybersecurity incidents. Failure to report cybersecurity incidents to CERT-In as required by its directions attracts imprisonment up to 1 year, or fine, or both.',
    penalty:
      'Intermediaries, service providers, and entities operating in critical sectors must report incidents to CERT-In within prescribed timelines. Non-reporting compounds the harm and attracts regulatory action.',
    evidence: ['Maintain an incident response plan that includes mandatory CERT-In reporting', 'Document all cybersecurity incidents with technical details ready for submission', 'Report to CERT-In at incident@cert-in.org.in promptly after any significant cyber incident'],
  },
  {
    title: 'IT Act 71 – Misrepresentation',
    aliases: ['it act 71', 'misrepresentation it act', 'false representation certifying authority', 'certificate fraud'],
    sections: ['IT Act Section 71'],
    punishment:
      'Whoever makes any misrepresentation or suppresses any material fact to obtain a digital signature certificate or electronic signature certificate from the certifying authority commits an offence. Imprisonment up to 2 years, or fine up to INR 1 lakh, or both.',
    penalty:
      'This provision targets fraudulent procurement of digital signature certificates by submitting false information, impersonating entities, or concealing disqualifying facts from certifying authorities.',
    evidence: ['Preserve the application submitted to the certifying authority and the certificate obtained', 'Document the false statements or suppressed facts that led to the certificate being issued', 'Report to the certifying authority and the Controller of Certifying Authorities'],
  },
  {
    title: 'IT Act 72 – Breach of Confidentiality',
    aliases: ['it act 72', 'breach of confidentiality it act', 'disclosure of information it act', 'government officer disclosure'],
    sections: ['IT Act Section 72'],
    punishment:
      'Any person who has secured access to electronic records, books, registers, correspondence, or information and discloses it to any other person without authorization commits a breach of confidentiality. Imprisonment up to 2 years, or fine up to INR 1 lakh, or both.',
    penalty:
      'This section applies to government officials, certifying authority personnel, and others who gain access to sensitive information through official duties and disclose it without authorization.',
    evidence: ['Document the unauthorized disclosure and identify who received the information', 'Preserve any official access logs showing the accused\'s access to the information', 'File a complaint with the relevant authority and approach the cybercrime cell'],
  },
  {
    title: 'IT Act 72A – Disclosure of Personal Information',
    aliases: ['it act 72a', 'personal information disclosure it act', 'section 72a', 'confidential data disclosure service provider'],
    sections: ['IT Act Section 72A'],
    punishment:
      'Any person, including an intermediary, who discloses personal information of another person in breach of a lawful contract and without consent commits an offence. Imprisonment up to 3 years, or fine up to INR 5 lakh, or both.',
    penalty:
      'This provision is frequently applied to employees, vendors, and service providers who misuse customer data or share it with third parties in violation of contractual obligations.',
    evidence: ['Preserve the contract or terms of service that prohibited the disclosure', 'Document what personal information was shared and with whom', 'Keep copies of your complaint to the data fiduciary and the cybercrime portal'],
  },
  {
    title: 'IT Act 73 – Fake Digital Signature Certificate',
    aliases: ['it act 73', 'fake digital signature certificate', 'fraudulent certificate publication', 'false certificate it act'],
    sections: ['IT Act Section 73'],
    punishment:
      'Publishing a digital signature certificate knowing it to be false or for fraudulent purposes, or making a false representation to a certifying authority, attracts imprisonment up to 2 years, or fine up to INR 1 lakh, or both.',
    penalty:
      'This provision targets the creation and circulation of fraudulent digital signature certificates used to falsely authenticate electronic documents or transactions.',
    evidence: ['Preserve the fraudulent certificate and evidence of its publication or use', 'Report to the certifying authority and the Controller of Certifying Authorities', 'File a cybercrime complaint and request revocation of the fraudulent certificate'],
  },
  {
    title: 'IT Act 74 – Fraudulent Digital Signature Publication',
    aliases: ['it act 74', 'fraudulent digital signature publication', 'fraudulent purpose digital certificate', 'fake certificate fraud it act'],
    sections: ['IT Act Section 74'],
    punishment:
      'Creating or publishing a digital signature certificate for any fraudulent or unlawful purpose can lead to imprisonment up to 2 years, or fine up to INR 1 lakh, or both.',
    penalty:
      'Section 74 complements Section 73 and together they cover the full range of certificate fraud—from false publication to creation for fraudulent purposes.',
    evidence: ['Document the fraudulent purpose for which the certificate was created or published', 'Preserve the certificate details and the transactions or documents it was used to authenticate', 'Report to the Controller of Certifying Authorities and file a cybercrime complaint'],
  },
  {
    title: 'IT Act 84B – Attempt to Commit Cyber Offence',
    aliases: ['it act 84b', 'attempt cyber offence it act', 'attempt hacking', 'cyber offence attempt'],
    sections: ['IT Act Section 84B'],
    punishment:
      'Whoever attempts to commit any offence under the IT Act and does not succeed shall be punished with imprisonment or fine for a term that may extend to one-half of the imprisonment provided for the offence, or with the same fine as the offence, or both.',
    penalty:
      'This provision ensures that failed cyber attacks, attempted hacking, and unsuccessful phishing attempts are also criminal acts, even where no harm ultimately results.',
    evidence: ['Document the attempt and preserve technical evidence of the attempted offence', 'Note any malware, phishing kits, or tools found in connection with the attempt', 'File a complaint with the cybercrime portal even if the attempt was unsuccessful'],
  },
  {
    title: 'IT Act 84C – Abetment of Cyber Offence',
    aliases: ['it act 84c', 'abetment cyber offence it act', 'aiding cyber crime', 'facilitating cyber attack'],
    sections: ['IT Act Section 84C'],
    punishment:
      'Whoever abets any offence under the IT Act—by instigating, conspiring, or intentionally aiding the commission of the offence—shall be punished with imprisonment or fine up to the same amount as the offence abetted.',
    penalty:
      'If the abetted offence is committed, the abettor faces the full punishment. This provision targets those who provide infrastructure, tools, funding, or instructions for cyber offences even if they do not directly participate.',
    evidence: ['Document the abettor\'s role in instigating or facilitating the cyber offence', 'Preserve communications showing instructions, funding, or tools provided by the abettor', 'File a complaint naming all abettors alongside the principal offenders'],
  },
];

function normalizeText(value: string) {
  return value.toLowerCase().trim();
}

function formatPdfLines(doc: jsPDF, text: string, width: number) {
  return doc.splitTextToSize(text, width);
}

export default function IndianCyberLawPage() {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPlaceholderIndex((currentIndex) => (currentIndex + 1) % searchPlaceholders.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, []);

  const filteredLaws = useMemo(() => {
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
      return lawEntries;
    }

    return lawEntries.filter((entry) => {
      const searchableText = [entry.title, ...entry.aliases, ...entry.sections, entry.punishment, entry.penalty, ...entry.evidence]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [query]);

  const downloadAllLaws = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 48;
    const contentWidth = pageWidth - margin * 2;
    let cursorY = 56;

    const ensureSpace = (requiredHeight: number) => {
      if (cursorY + requiredHeight > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }
    };

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Indian Cyber Crime Laws Reference', margin, cursorY);

    cursorY += 22;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const introLines = formatPdfLines(
      doc,
      'Educational reference only. Verify exact sections and outcomes with a qualified lawyer or law-enforcement authority, because charges depend on the facts of each case.',
      contentWidth,
    );
    doc.text(introLines, margin, cursorY);
    cursorY += introLines.length * 13 + 8;

    lawEntries.forEach((entry, index) => {
      ensureSpace(90);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text(`${index + 1}. ${entry.title}`, margin, cursorY);
      cursorY += 18;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);

      const sectionsLines = formatPdfLines(doc, `Sections: ${entry.sections.join(', ')}`, contentWidth);
      doc.text(sectionsLines, margin, cursorY);
      cursorY += sectionsLines.length * 13 + 2;

      const punishmentLines = formatPdfLines(doc, `Punishment: ${entry.punishment}`, contentWidth);
      doc.text(punishmentLines, margin, cursorY);
      cursorY += punishmentLines.length * 13 + 2;

      const penaltyLines = formatPdfLines(doc, `Penalty: ${entry.penalty}`, contentWidth);
      doc.text(penaltyLines, margin, cursorY);
      cursorY += penaltyLines.length * 13 + 2;

      const evidenceLines = formatPdfLines(doc, `Evidence tips: ${entry.evidence.join(' | ')}`, contentWidth);
      doc.text(evidenceLines, margin, cursorY);
      cursorY += evidenceLines.length * 13 + 14;
    });

    doc.save('indian-cyber-crime-laws.pdf');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors">
            ← Back to Home
          </Link>
          <span className="text-slate-700">/</span>
          <span className="text-xs text-slate-400">Indian Cyber Law Module</span>
        </div>
      </div>

      <main className="pt-24 pb-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-xs font-semibold uppercase tracking-[0.24em]">
                <Scale className="w-3.5 h-3.5" />
                Indian Cyber Law Modules
              </span>
              <div className="space-y-4 max-w-2xl">
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                  Search cyber crimes and see the legal punishment in India.
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Type examples such as phishing attack, UPI scam, identity theft, or ransomware to see the most relevant Indian cyber crime law, along with penalties, punishment, and evidence tips.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl shadow-cyan-950/20 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-cyan-300 text-sm font-semibold uppercase tracking-[0.2em]">Search the law</p>
                  <h2 className="text-xl font-bold text-white mt-1">Find the right section fast</h2>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 border border-slate-800 rounded-full px-3 py-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                  Verified reference
                </div>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={`Try ${searchPlaceholders[placeholderIndex]}`}
                  className="w-full rounded-2xl bg-slate-950 border border-slate-800 pl-11 pr-4 py-4 text-sm sm:text-base text-white placeholder:text-slate-500 outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10 transition"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                {searchPlaceholders.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1.5 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={downloadAllLaws}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-3 transition-all shadow-lg shadow-cyan-500/20"
              >
                <Download className="w-4 h-4" />
                Download all laws as PDF
              </button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5">
            {filteredLaws.length > 0 ? (
              filteredLaws.map((entry) => (
                <article key={entry.title} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{entry.title}</h3>
                      <p className="text-slate-400 text-sm mt-2 max-w-3xl">
                        Search terms: {entry.aliases.join(', ')}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {entry.sections.map((section) => (
                        <span key={section} className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                          {section}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                      <div className="flex items-center gap-2 text-cyan-300 font-semibold mb-2">
                        <FileText className="w-4 h-4" />
                        Punishment
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">{entry.punishment}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                      <div className="flex items-center gap-2 text-cyan-300 font-semibold mb-2">
                        <Scale className="w-4 h-4" />
                        Penalty
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">{entry.penalty}</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <p className="text-white font-semibold mb-2">Evidence and next steps</p>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {entry.evidence.map((item) => (
                        <li key={item} className="text-sm text-slate-400 leading-relaxed rounded-xl bg-slate-900 border border-slate-800 px-3 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 p-8 text-center">
                <p className="text-lg font-semibold text-white">No exact match found.</p>
                <p className="text-slate-400 mt-2">Try phishing attack, UPI scam, identity theft, ransomware, or cyber stalking.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
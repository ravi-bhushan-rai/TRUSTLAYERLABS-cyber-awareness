import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./css/laws.css";
import "./css/ipc.css";
// @ts-ignore: module has no declaration file
import { LawsUI } from "./js/laws.js";
// @ts-ignore: module has no declaration file
import { SectionExplorer } from "./js/ipc.js";

const tabLinkClass = ({ isActive }: { isActive: boolean }) =>
  `law-tab ${isActive ? "law-tab-active" : "law-tab-inactive"}`;

export default function Bns() {
  useEffect(() => {
    LawsUI.init();
    SectionExplorer.init();
  }, []);

  return (
    <main className="law-shell">
      <nav className="law-nav">
        <Link className="brand-link" to="/laws/dashboard">
          <span className="brand-mark">CL</span>Cyber Law SOC
        </Link>
        <div className="law-links">
          <Link className="dashboard-link" to="/">
            Back to Dashboard
          </Link>
          <NavLink to="/laws/ipc" className={tabLinkClass}>
            IPC
          </NavLink>
          <NavLink to="/laws/bns" className={tabLinkClass}>
            BNS
          </NavLink>
          <NavLink to="/laws/it-act" className={tabLinkClass}>
            IT Act
          </NavLink>
          <NavLink to="/laws/reporting" className={tabLinkClass}>
            Reporting
          </NavLink>
        </div>
      </nav>

      <section className="hero-panel">
        <span className="eyebrow">BNS active map</span>
        <h1>Bharatiya Nyaya Sanhita Explorer</h1>
        <p className="lead">
          Map cyber incidents to modern offence families: cheating, forgery, criminal intimidation, organized crime,
          sexual harassment, and identity-linked misconduct.
        </p>
      </section>

      <section className="section-block">
        <div className="search-panel">
          <input
            className="law-search"
            type="search"
            placeholder="Search BNS topic, harm, section family..."
            data-law-search="[data-section-card], [data-accordion]"
          />
          <div className="chip-row" data-filter-group="[data-section-card]">
            <button className="chip active" data-filter="all">
              All
            </button>
            <button className="chip" data-filter="fraud">
              Fraud
            </button>
            <button className="chip" data-filter="harassment">
              Harassment
            </button>
            <button className="chip" data-filter="threat">
              Threat
            </button>
            <button className="chip" data-filter="organised">
              Organised Crime
            </button>
            <button className="chip" data-filter="forgery">
              Forgery
            </button>
            <button className="chip" data-filter="speech">
              Harmful Speech
            </button>
            <button className="chip" data-filter="terror">
              Terror / Sovereignty
            </button>
          </div>
        </div>

        <div className="explorer-layout">
          <div className="section-map">
            {/* Conspiracy */}
            <button className="section-node" data-category="fraud" data-section-card="bns-conspiracy">
              <strong>Criminal Conspiracy</strong>
              <span>BNS 61 – coordinated cyber offence planning.</span>
            </button>

            {/* Sexual offences */}
            <button className="section-node" data-category="harassment" data-section-card="bns-sex-harass">
              <strong>Sexual Harassment</strong>
              <span>BNS 75 – online sexual harassment contexts.</span>
            </button>
            <button className="section-node" data-category="harassment" data-section-card="bns-voyeur">
              <strong>Voyeurism</strong>
              <span>BNS 77 – covert digital recording and sharing.</span>
            </button>
            <button className="section-node" data-category="harassment" data-section-card="bns-stalk">
              <strong>Cyber Stalking</strong>
              <span>BNS 78 – persistent digital pursuit and monitoring.</span>
            </button>
            <button className="section-node" data-category="harassment" data-section-card="bns-modesty">
              <strong>Insulting Modesty of Woman</strong>
              <span>BNS 79 – digital content insulting or outraging modesty.</span>
            </button>

            {/* Organised crime */}
            <button className="section-node" data-category="organised" data-section-card="bns-organised">
              <strong>Organised Cyber Crime</strong>
              <span>BNS 111 – syndicated cyber criminal networks.</span>
            </button>
            <button className="section-node" data-category="organised" data-section-card="bns-petty">
              <strong>Petty Organised Crime</strong>
              <span>BNS 112 – low-level coordinated cyber offences.</span>
            </button>

            {/* Terror / sovereignty */}
            <button className="section-node" data-category="terror" data-section-card="bns-cyberterror">
              <strong>Cyber Terrorism</strong>
              <span>BNS 113 – terror acts through digital infrastructure.</span>
            </button>
            <button className="section-node" data-category="terror" data-section-card="bns-sovereignty">
              <strong>Endangering Sovereignty</strong>
              <span>BNS 152 – digital acts against national integrity.</span>
            </button>

            {/* Speech / content */}
            <button className="section-node" data-category="speech" data-section-card="bns-enmity">
              <strong>Promoting Enmity Online</strong>
              <span>BNS 196 – online content inciting group hatred.</span>
            </button>
            <button className="section-node" data-category="speech" data-section-card="bns-obscene">
              <strong>Obscene Electronic Content</strong>
              <span>BNS 294 – publishing obscene material digitally.</span>
            </button>
            <button className="section-node" data-category="speech" data-section-card="bns-religious">
              <strong>Religious Hate Content</strong>
              <span>BNS 299 – online content targeting religious groups.</span>
            </button>
            <button className="section-node" data-category="speech" data-section-card="bns-defame">
              <strong>Defamation family</strong>
              <span>BNS 356–357 – defamatory statements and publications online.</span>
            </button>
            <button className="section-node" data-category="speech" data-section-card="bns-insult">
              <strong>Intentional Online Insult</strong>
              <span>BNS 352 – deliberate insult causing offence online.</span>
            </button>

            {/* Evidence tampering */}
            <button className="section-node" data-category="fraud" data-section-card="bns-false-evid">
              <strong>False / Fake Evidence</strong>
              <span>BNS 204 & 217 – fabricating or planting digital evidence.</span>
            </button>
            <button className="section-node" data-category="fraud" data-section-card="bns-false-rec">
              <strong>Fabricating False Records</strong>
              <span>BNS 237 – manufacturing false digital records.</span>
            </button>

            {/* Theft / extortion / trust */}
            <button className="section-node" data-category="threat" data-section-card="bns-theft">
              <strong>Theft of Digital Assets</strong>
              <span>BNS 303 – stealing devices or data.</span>
            </button>
            <button className="section-node" data-category="threat" data-section-card="bns-extort">
              <strong>Online Extortion</strong>
              <span>BNS 308 – sextortion, ransomware, digital blackmail.</span>
            </button>
            <button className="section-node" data-category="fraud" data-section-card="bns-trust">
              <strong>Criminal Breach of Trust</strong>
              <span>BNS 316 – misuse of entrusted digital assets or data.</span>
            </button>

            {/* Existing cheating / forgery / threat / harassment nodes */}
            <button className="section-node" data-category="fraud" data-section-card="bns-cheat">
              <strong>Cheating family</strong>
              <span>BNS 318–319 – online deception, fake platforms, payment traps.</span>
            </button>
            <button className="section-node" data-category="fraud" data-section-card="bns-forgery">
              <strong>Forgery family</strong>
              <span>BNS 335–340 – fake records, fabricated proof, identity documents.</span>
            </button>
            <button className="section-node" data-category="threat" data-section-card="bns-threat">
              <strong>Intimidation family</strong>
              <span>BNS 351 – cyber blackmail, doxxing threats, coercion.</span>
            </button>
            <button className="section-node" data-category="harassment" data-section-card="bns-harass">
              <strong>Harassment and stalking contexts</strong>
              <span>Sexual harassment, stalking, image abuse contexts.</span>
            </button>
          </div>

          <div className="accordion-list">

            {/* BNS 61 */}
            <article className="accordion" id="bns-conspiracy" data-accordion>
              <button className="accordion-button">
                <span>BNS 61</span>Criminal Conspiracy <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Applies when two or more persons agree to commit a cyber offence — coordinated phishing campaigns, organised fraud rings, multi-actor data theft operations, or joint online harassment schemes.
                </div>
              </div>
            </article>

            {/* BNS 75 */}
            <article className="accordion" id="bns-sex-harass" data-accordion>
              <button className="accordion-button">
                <span>BNS 75</span>Sexual Harassment <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Covers unwelcome sexually coloured messages, emails, social media demands, or digital conduct creating a hostile environment. Applicable alongside IT Act provisions for online sexual harassment.
                </div>
              </div>
            </article>

            {/* BNS 77 */}
            <article className="accordion" id="bns-voyeur" data-accordion>
              <button className="accordion-button">
                <span>BNS 77</span>Voyeurism <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Use when a person captures, stores, or transmits images of a woman in private acts without consent. Covers spy-cam recordings, covert device access, and non-consensual intimate imagery distribution.
                </div>
              </div>
            </article>

            {/* BNS 78 */}
            <article className="accordion" id="bns-stalk" data-accordion>
              <button className="accordion-button">
                <span>BNS 78</span>Cyber Stalking <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Repeated digital contact, monitoring location via apps, tracking online activity, or persistent messaging despite clear disinterest. Often charged alongside IT Act Section 67 for electronic communications.
                </div>
              </div>
            </article>

            {/* BNS 79 */}
            <article className="accordion" id="bns-modesty" data-accordion>
              <button className="accordion-button">
                <span>BNS 79</span>Insulting Modesty of Woman <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Applicable to acts or digital content that outrages or insults the modesty of a woman — morphed images, degrading posts, publicly shared intimate material, or humiliating digital content targeting women.
                </div>
              </div>
            </article>

            {/* BNS 111 */}
            <article className="accordion" id="bns-organised" data-accordion>
              <button className="accordion-button">
                <span>BNS 111</span>Organised Cyber Crime <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  For syndicated, gang-run cyber operations — large-scale fraud networks, dark-web marketplaces, ransomware syndicates, and organised data-theft rings that operate continuously as a criminal enterprise.
                </div>
              </div>
            </article>

            {/* BNS 112 */}
            <article className="accordion" id="bns-petty" data-accordion>
              <button className="accordion-button">
                <span>BNS 112</span>Petty Organised Crime <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Covers smaller coordinated cyber offences — OTP scam groups, SIM-swap crews, low-value repeat fraud operations, and coordinated trolling or abuse campaigns run by loosely organised groups.
                </div>
              </div>
            </article>

            {/* BNS 113 */}
            <article className="accordion" id="bns-cyberterror" data-accordion>
              <button className="accordion-button">
                <span>BNS 113</span>Cyber Terrorism / Terror Acts <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Applies to attacks on critical information infrastructure, propagating terror via digital networks, disrupting essential services, or using digital means to intimidate the government or public for ideological ends.
                </div>
              </div>
            </article>

            {/* BNS 152 */}
            <article className="accordion" id="bns-sovereignty" data-accordion>
              <button className="accordion-button">
                <span>BNS 152</span>Endangering Sovereignty Through Digital Means <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Use for online activities that excite disaffection, promote secession, or endanger the sovereignty and integrity of India — including digital propaganda, disinformation campaigns, or coordinated influence operations.
                </div>
              </div>
            </article>

            {/* BNS 196 */}
            <article className="accordion" id="bns-enmity" data-accordion>
              <button className="accordion-button">
                <span>BNS 196</span>Promoting Enmity Online <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  For digital content — posts, videos, memes, forwards — that promotes hatred or enmity between religious, caste, language, or regional groups. Commonly charged alongside IT Act Section 66A successors and platform-facilitated hate speech.
                </div>
              </div>
            </article>

            {/* BNS 204 & 217 */}
            <article className="accordion" id="bns-false-evid" data-accordion>
              <button className="accordion-button">
                <span>BNS 204 / 217</span>False and Fake Digital Evidence <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  BNS 204 addresses fabricating false evidence for use in proceedings; BNS 217 specifically covers planting or presenting fake electronic evidence. Applicable in cases of forged chat logs, deepfake recordings, or manipulated metadata submitted as proof.
                </div>
              </div>
            </article>

            {/* BNS 237 */}
            <article className="accordion" id="bns-false-rec" data-accordion>
              <button className="accordion-button">
                <span>BNS 237</span>Fabricating False Records <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Covers creating or altering digital records — transaction logs, audit trails, server records — with intent to cause a wrong belief or gain an unfair advantage in legal or financial proceedings.
                </div>
              </div>
            </article>

            {/* BNS 294 */}
            <article className="accordion" id="bns-obscene" data-accordion>
              <button className="accordion-button">
                <span>BNS 294</span>Obscene Electronic Content <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Applies to publishing, transmitting, or circulating obscene material through digital channels. Use in conjunction with IT Act Sections 67, 67A, and 67B for online obscenity, morphed images, and child sexual abuse material.
                </div>
              </div>
            </article>

            {/* BNS 299 */}
            <article className="accordion" id="bns-religious" data-accordion>
              <button className="accordion-button">
                <span>BNS 299</span>Religious Hate Content Online <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  For deliberate digital acts intended to outrage religious feelings — blasphemous posts, digitally manipulated religious imagery, or targeted hate campaigns against a religious community circulated via social media or messaging apps.
                </div>
              </div>
            </article>

            {/* BNS 303 */}
            <article className="accordion" id="bns-theft" data-accordion>
              <button className="accordion-button">
                <span>BNS 303</span>Theft of Digital Devices / Data <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Covers physical theft of devices carrying digital assets, as well as misappropriation of stored data or credentials. Often charged alongside IT Act Section 43 and 66 for data theft and unauthorised access.
                </div>
              </div>
            </article>

            {/* BNS 308 */}
            <article className="accordion" id="bns-extort" data-accordion>
              <button className="accordion-button">
                <span>BNS 308</span>Online Extortion <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Primary section for sextortion, ransomware demands, and digital blackmail where threats are used to extract money, property, or compliance. Pairs with BNS 351 (criminal intimidation) and IT Act provisions for electronic threats.
                </div>
              </div>
            </article>

            {/* BNS 316 */}
            <article className="accordion" id="bns-trust" data-accordion>
              <button className="accordion-button">
                <span>BNS 316</span>Criminal Breach of Trust <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Applicable when an employee, vendor, or agent misuses entrusted access to systems, databases, or digital assets — insider data theft, unauthorised credential sharing, or misappropriation of customer data by a fiduciary.
                </div>
              </div>
            </article>

            {/* BNS 318 & 319 — existing cheating node, updated */}
            <article className="accordion" id="bns-cheat" data-accordion>
              <button className="accordion-button">
                <span>BNS 318 / 319</span>Cheating through digital channels <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  BNS 318 covers dishonest inducement in online investments, job scams, marketplace fraud, support impersonation, and payment manipulation. BNS 319 extends to cheating by personation — fake profiles, impersonating officials or brands, and identity-based deception.
                </div>
              </div>
            </article>

            {/* BNS 335–340 — existing forgery node, updated */}
            <article className="accordion" id="bns-forgery" data-accordion>
              <button className="accordion-button">
                <span>BNS 335–340</span>Forgery and false records <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  BNS 335 (forgery) and BNS 336 (forged electronic records) apply when digital documents are fabricated. BNS 338 covers forgery of valuable security or official documents. BNS 340 is used when a person knowingly uses forged electronic documents as genuine — presenting falsified IDs, invoices, certificates, or e-signatures.
                </div>
              </div>
            </article>

            {/* BNS 351 — existing threat node, updated */}
            <article className="accordion" id="bns-threat" data-accordion>
              <button className="accordion-button">
                <span>BNS 351</span>Criminal intimidation <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Covers threats to reputation, body, property, family, or livelihood delivered through chats, calls, posts, and emails. Use alongside BNS 308 for extortion-linked threats and IT Act provisions for electronic menace.
                </div>
              </div>
            </article>

            {/* BNS 352 */}
            <article className="accordion" id="bns-insult" data-accordion>
              <button className="accordion-button">
                <span>BNS 352</span>Intentional Online Insult <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  For deliberate public insults delivered via digital platforms — targeted abuse posts, provocative messages, or online content calculated to provoke a breach of peace or humiliate an identifiable individual.
                </div>
              </div>
            </article>

            {/* BNS 356 & 357 */}
            <article className="accordion" id="bns-defame" data-accordion>
              <button className="accordion-button">
                <span>BNS 356 / 357</span>Defamation and publishing defamatory content <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  BNS 356 covers making or imputing false statements that harm reputation. BNS 357 applies to publishing or circulating such content digitally — defamatory social media posts, fake news articles, malicious review campaigns, and reputation-damaging mass forwards.
                </div>
              </div>
            </article>

            {/* Existing harassment node */}
            <article className="accordion" id="bns-harass" data-accordion>
              <button className="accordion-button">
                <span>BNS</span>Harassment and stalking contexts <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Useful for repeated unwanted contact, sexualized threats, and stalking behavior alongside IT Act provisions.
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>
    </main>
  );
}
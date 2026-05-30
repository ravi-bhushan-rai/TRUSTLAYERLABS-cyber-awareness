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

export default function Ipc() {
  useEffect(() => {
    try { LawsUI.init(); } catch (e) {}
    try { SectionExplorer.init(); } catch (e) {}
  }, []);
  return (
    <main className="law-shell">
      <nav className="law-nav" aria-label="Cyber law navigation">
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
        <span className="eyebrow">IPC legacy explorer</span>
        <h1>Indian Penal Code Cyber Links</h1>
        <p className="lead">
          Use this searchable explorer for older references, FIR language, and cyber-adjacent offences such as cheating, forgery,
          defamation, intimidation, and obscenity.
        </p>
      </section>

      <section className="section-block">
        <div className="search-panel">
          <input
            className="law-search"
            type="search"
            placeholder="Search IPC section, offence, keyword..."
            data-law-search="[data-section-card], [data-accordion]"
            data-empty-target="#ipc-empty"
          />
          <div className="chip-row" data-filter-group="[data-section-card]">
            <button className="chip active" data-filter="all">
              All
            </button>
            <button className="chip" data-filter="fraud">
              Fraud
            </button>
            <button className="chip" data-filter="speech">
              Speech
            </button>
            <button className="chip" data-filter="safety">
              Safety
            </button>
          </div>
        </div>
        <p id="ipc-empty" hidden>
          No matching IPC signal found.
        </p>

        <div className="explorer-layout">
          <div className="section-map">
            {/* ── Conspiracy ── */}
            <button className="section-node" data-category="fraud" data-section-card="ipc-120b">
              <strong>IPC 120B</strong>
              <span>Criminal conspiracy to commit a cyber offence.</span>
            </button>

            {/* ── Speech / Enmity ── */}
            <button className="section-node" data-category="speech" data-section-card="ipc-153a">
              <strong>IPC 153A</strong>
              <span>Promoting enmity between groups through social media.</span>
            </button>
            <button className="section-node" data-category="speech" data-section-card="ipc-292">
              <strong>IPC 292</strong>
              <span>Obscene online content, distribution, or circulation.</span>
            </button>
            <button className="section-node" data-category="speech" data-section-card="ipc-295a">
              <strong>IPC 295A</strong>
              <span>Religious hate content online, deliberate insult to religion.</span>
            </button>

            {/* ── Safety / Harassment ── */}
            <button className="section-node" data-category="safety" data-section-card="ipc-354a">
              <strong>IPC 354A</strong>
              <span>Sexual harassment through online messages or media.</span>
            </button>
            <button className="section-node" data-category="safety" data-section-card="ipc-354c">
              <strong>IPC 354C</strong>
              <span>Voyeurism, non-consensual capture or sharing of images.</span>
            </button>
            <button className="section-node" data-category="safety" data-section-card="ipc-354d">
              <strong>IPC 354D</strong>
              <span>Cyber stalking, repeated unwanted online contact with a woman.</span>
            </button>

            {/* ── Theft / Property ── */}
            <button className="section-node" data-category="fraud" data-section-card="ipc-379">
              <strong>IPC 379</strong>
              <span>Theft of digital devices or stored data.</span>
            </button>
            <button className="section-node" data-category="fraud" data-section-card="ipc-403">
              <strong>IPC 403</strong>
              <span>Dishonest misappropriation of online funds or digital assets.</span>
            </button>
            <button className="section-node" data-category="fraud" data-section-card="ipc-406">
              <strong>IPC 406</strong>
              <span>Criminal breach of trust, misuse of entrusted digital property.</span>
            </button>
            <button className="section-node" data-category="fraud" data-section-card="ipc-409">
              <strong>IPC 409</strong>
              <span>Breach of trust by public servant, banker, or agent online.</span>
            </button>

            {/* ── Cheating ── */}
            <button className="section-node" data-category="fraud" data-section-card="ipc-415">
              <strong>IPC 415</strong>
              <span>Cheating by deceptive inducement through online means.</span>
            </button>
            <button className="section-node" data-category="fraud" data-section-card="ipc-416">
              <strong>IPC 416</strong>
              <span>Cheating by personation using a fake online identity.</span>
            </button>
            <button className="section-node" data-category="fraud" data-section-card="ipc-419">
              <strong>IPC 419</strong>
              <span>Online impersonation fraud, standalone personation charge.</span>
            </button>
            <button className="section-node" data-category="fraud" data-section-card="ipc-420">
              <strong>IPC 420</strong>
              <span>Cheating and dishonestly inducing delivery of property.</span>
            </button>

            {/* ── Forgery ── */}
            <button className="section-node" data-category="fraud" data-section-card="ipc-463">
              <strong>IPC 463</strong>
              <span>Forgery, making a false electronic document with fraudulent intent.</span>
            </button>
            <button className="section-node" data-category="fraud" data-section-card="ipc-464">
              <strong>IPC 464</strong>
              <span>Making false electronic records intended to pass as genuine.</span>
            </button>
            <button className="section-node" data-category="fraud" data-section-card="ipc-465">
              <strong>IPC 465</strong>
              <span>Punishment for forgery of documents or electronic records.</span>
            </button>
            <button className="section-node" data-category="fraud" data-section-card="ipc-468">
              <strong>IPC 468</strong>
              <span>Forgery for purpose of cheating.</span>
            </button>
            <button className="section-node" data-category="fraud" data-section-card="ipc-469">
              <strong>IPC 469</strong>
              <span>Forgery to harm reputation, fake screenshots or records.</span>
            </button>
            <button className="section-node" data-category="fraud" data-section-card="ipc-471">
              <strong>IPC 471</strong>
              <span>Using forged electronic or physical records as genuine.</span>
            </button>

            {/* ── Speech / Defamation ── */}
            <button className="section-node" data-category="speech" data-section-card="ipc-499">
              <strong>IPC 499/500</strong>
              <span>Defamation through harmful publication.</span>
            </button>

            {/* ── Safety / Threats ── */}
            <button className="section-node" data-category="safety" data-section-card="ipc-503">
              <strong>IPC 503/506</strong>
              <span>Criminal intimidation, threats, extortion pressure.</span>
            </button>
            <button className="section-node" data-category="speech" data-section-card="ipc-505">
              <strong>IPC 505</strong>
              <span>Fake news and rumour circulation causing public fear.</span>
            </button>
            <button className="section-node" data-category="safety" data-section-card="ipc-507">
              <strong>IPC 507</strong>
              <span>Anonymous online threats with concealed identity.</span>
            </button>
            <button className="section-node" data-category="safety" data-section-card="ipc-509">
              <strong>IPC 509</strong>
              <span>Insulting modesty of a woman through online words or gestures.</span>
            </button>
          </div>

          <div className="accordion-list">
            {/* ── IPC 120B ── */}
            <article className="accordion" id="ipc-120b" data-accordion>
              <button className="accordion-button">
                <span>IPC 120B</span>Criminal conspiracy <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Applies when two or more persons plan a cyber offence together. Each conspirator is liable for the same punishment as if they committed the substantive offence. Common in coordinated phishing campaigns, organised fraud rings, and ransomware groups.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 120B">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 153A ── */}
            <article className="accordion" id="ipc-153a" data-accordion>
              <button className="accordion-button">
                <span>IPC 153A</span>Promoting enmity through social media <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Invoked for online posts, videos, or shares that promote hatred or enmity between groups on grounds of religion, race, caste, language, or community. Imprisonment up to 3 years; up to 5 years if committed at a place of worship.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 153A">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 292 ── */}
            <article className="accordion" id="ipc-292" data-accordion>
              <button className="accordion-button">
                <span>IPC 292</span>Obscene online content <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Covers selling, distributing, exhibiting, or circulating obscene material through electronic channels. First conviction: up to 2 years and fine. Subsequent convictions: up to 5 years and fine. IT Act Section 67 often applies concurrently.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 292">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 295A ── */}
            <article className="accordion" id="ipc-295a" data-accordion>
              <button className="accordion-button">
                <span>IPC 295A</span>Religious hate content online <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Targets deliberate and malicious online acts intended to outrage religious feelings of any class by insulting its religion or beliefs. Imprisonment up to 3 years, or fine, or both. Requires proof of deliberate and malicious intent.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 295A">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 354A ── */}
            <article className="accordion" id="ipc-354a" data-accordion>
              <button className="accordion-button">
                <span>IPC 354A</span>Sexual harassment <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Applies to unwelcome sexual advances, demands for sexual favours, showing pornography without consent, and sexually coloured remarks made online. Imprisonment up to 3 years or fine depending on the specific sub-section. Complements workplace harassment laws.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 354A">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 354C ── */}
            <article className="accordion" id="ipc-354c" data-accordion>
              <button className="accordion-button">
                <span>IPC 354C</span>Voyeurism <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Covers capturing images or videos of a woman in a private act without consent, and disseminating such material online. First conviction: 1–3 years and fine. Subsequent convictions: 3–7 years and fine. IT Act Section 66E may also apply.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 354C">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 354D ── */}
            <article className="accordion" id="ipc-354d" data-accordion>
              <button className="accordion-button">
                <span>IPC 354D</span>Cyber stalking <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Applies when a man repeatedly contacts or monitors a woman online despite her clear disinterest, or tracks her internet use and electronic communications. First conviction: up to 3 years and fine. Subsequent convictions: up to 5 years and fine.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 354D">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 379 ── */}
            <article className="accordion" id="ipc-379" data-accordion>
              <button className="accordion-button">
                <span>IPC 379</span>Theft of digital devices or data <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Covers dishonest taking of digital devices such as laptops, phones, or storage drives. Also applicable where data stored on the device is the primary target. Imprisonment up to 3 years, or fine, or both. IT Act provisions may apply alongside.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 379">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 403 ── */}
            <article className="accordion" id="ipc-403" data-accordion>
              <button className="accordion-button">
                <span>IPC 403</span>Dishonest misappropriation <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Relevant where a person dishonestly misappropriates or converts digital assets, online funds, or cryptocurrency belonging to another. Imprisonment up to 2 years, or fine, or both. Stronger provisions under IPC 406 apply where a trust relationship exists.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 403">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 406 ── */}
            <article className="accordion" id="ipc-406" data-accordion>
              <button className="accordion-button">
                <span>IPC 406</span>Criminal breach of trust <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Applies when a person entrusted with property or funds—including digital accounts or investment portfolios—dishonestly misappropriates them. Imprisonment up to 3 years, or fine, or both. Common in online investment fraud and misuse of client accounts.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 406">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 409 ── */}
            <article className="accordion" id="ipc-409" data-accordion>
              <button className="accordion-button">
                <span>IPC 409</span>Breach of trust by public servant <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Enhanced provision for public servants, bankers, merchants, brokers, attorneys, or agents who misuse digital access or credentials entrusted to them. Imprisonment up to 10 years and fine, reflecting the higher duty of care owed by these persons.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 409">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 415 ── */}
            <article className="accordion" id="ipc-415" data-accordion>
              <button className="accordion-button">
                <span>IPC 415</span>Cheating <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Foundation cheating provision: deceiving a person to induce delivery of property or to do or omit an act causing harm, including through online platforms. Imprisonment up to 1 year, or fine, or both. Forms the basis for the more specific IPC 419 and IPC 420 charges.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 415">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 416 ── */}
            <article className="accordion" id="ipc-416" data-accordion>
              <button className="accordion-button">
                <span>IPC 416</span>Cheating by personation <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Covers cheating by pretending to be another person or substituting one person for another online. Imprisonment up to 3 years, or fine, or both. Applied in fake profile scams, impersonation of officials, and identity substitution for financial gain.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 416">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 419 ── */}
            <article className="accordion" id="ipc-419" data-accordion>
              <button className="accordion-button">
                <span>IPC 419</span>Online impersonation fraud <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Standalone punishment provision for cheating by personation. Imprisonment up to 3 years, or fine, or both. Commonly invoked alongside IT Act Section 66D for online impersonation fraud, fake customer service calls, and phishing by identity substitution.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 419">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 420 ── */}
            <article className="accordion" id="ipc-420" data-accordion>
              <button className="accordion-button">
                <span>IPC 420</span>Cheating online <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Commonly referenced for cyber fraud, marketplace scams, fake investment portals, and social engineering that causes wrongful loss. Imprisonment up to 7 years and fine. One of the most frequently cited sections in online fraud FIRs.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 420">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 463 ── */}
            <article className="accordion" id="ipc-463" data-accordion>
              <button className="accordion-button">
                <span>IPC 463</span>Forgery <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Defines the offence of making a false document or false electronic record with intent to cause damage, support a fraudulent claim, or harm reputation. Punishment prescribed under IPC 465. Covers doctored PDFs, fabricated screenshots, and altered digital contracts.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 463">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 464 ── */}
            <article className="accordion" id="ipc-464" data-accordion>
              <button className="accordion-button">
                <span>IPC 464</span>False electronic records <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  A person makes a false document who dishonestly signs, seals, or executes an electronic record knowing it will be used as genuine. Covers fabricated digital contracts, forged digital signatures, and altered transaction records. Punishment under IPC 465.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 464">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 465 ── */}
            <article className="accordion" id="ipc-465" data-accordion>
              <button className="accordion-button">
                <span>IPC 465</span>Punishment for forgery <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Base punishment for forgery as defined under IPC 463 and 464: imprisonment up to 2 years, or fine, or both. Aggravated forms—forgery for cheating under IPC 468 and forgery to harm reputation under IPC 469—carry higher sentences.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 465">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 468 ── */}
            <article className="accordion" id="ipc-468" data-accordion>
              <button className="accordion-button">
                <span>IPC 468</span>Forgery for cheating <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Applies when forged documents, identities, screenshots, emails, or records are created to deceive a victim or organization. Imprisonment up to 7 years and fine. The elevated sentence combines the harm of both forgery and cheating.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 468">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 469 ── */}
            <article className="accordion" id="ipc-469" data-accordion>
              <button className="accordion-button">
                <span>IPC 469</span>Forgery for reputation harm <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Applies when fabricated screenshots, doctored posts, or false records are circulated online specifically to damage a person's reputation. Imprisonment up to 3 years and fine. Often used alongside IPC 499 in online defamation cases involving forged evidence.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 469">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 471 ── */}
            <article className="accordion" id="ipc-471" data-accordion>
              <button className="accordion-button">
                <span>IPC 471</span>Using forged records <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Useful when a forged record is presented as genuine, including fake KYC, payment proof, or doctored communication. The user of a forged electronic record faces the same punishment as the forger. If the forgery was for cheating, this means up to 7 years imprisonment.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 471">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 499 / 500 ── */}
            <article className="accordion" id="ipc-499" data-accordion>
              <button className="accordion-button">
                <span>IPC 499/500</span>Defamation <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  May arise in reputational attacks, false posts, impersonation campaigns, or targeted harmful publication. IPC 499 defines the offence; IPC 500 prescribes imprisonment up to 2 years, or fine, or both. A non-cognisable, bailable, compoundable offence—civil suit for damages is also available.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 499/500">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 503 / 506 ── */}
            <article className="accordion" id="ipc-503" data-accordion>
              <button className="accordion-button">
                <span>IPC 503/506</span>Threats and intimidation <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Relevant to extortion threats, doxxing threats, blackmail messages, and coercive online intimidation. IPC 503 defines criminal intimidation; IPC 506 prescribes up to 2 years for basic threats and up to 7 years for threats of death or grievous hurt.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 503/506">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 505 ── */}
            <article className="accordion" id="ipc-505" data-accordion>
              <button className="accordion-button">
                <span>IPC 505</span>Fake news and rumour circulation <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Covers making, publishing, or circulating false statements or rumours online that may cause public fear or alarm, or incite one class to commit offences against another. Imprisonment up to 3 years, or fine, or both. Enhanced punishment if committed at a place of worship.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 505">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 507 ── */}
            <article className="accordion" id="ipc-507" data-accordion>
              <button className="accordion-button">
                <span>IPC 507</span>Anonymous threats <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Adds additional punishment for criminal intimidation delivered through anonymous channels—burner accounts, masked emails, unregistered numbers. Imprisonment up to 2 years on top of punishment under IPC 506. Law enforcement can request platform data to trace the sender.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 507">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* ── IPC 509 ── */}
            <article className="accordion" id="ipc-509" data-accordion>
              <button className="accordion-button">
                <span>IPC 509</span>Insulting modesty of woman online <b className="accordion-icon">+</b>
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  Covers uttering words, making gestures, or sending objects through online channels intending to insult the modesty of a woman—including obscene messages, lewd comments, and explicit images sent without consent. Imprisonment up to 3 years and fine.
                  <div className="copy-row">
                    <button className="law-btn" data-copy-section="IPC 509">
                      Copy section
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/laws.css";
import { LawsUI } from "./js/laws.js";
import { SectionExplorer } from "./js/ipc.js";

export default function ItAct() {
  useEffect(() => {
    try { LawsUI.init(); } catch (e) {}
    try { SectionExplorer.init(); } catch (e) {}
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
          <Link to="/laws/ipc">IPC</Link>
          <Link to="/laws/bns">BNS</Link>
          <Link className="active" to="/laws/it-act">
            IT Act
          </Link>
          <Link to="/laws/reporting">Reporting</Link>
        </div>
      </nav>

      <section className="hero-panel">
        <span className="eyebrow">IT Act control layer</span>
        <h1>Information Technology Act Matrix</h1>
        <p className="lead">
          Search practical IT Act anchors for unauthorized access, identity theft, privacy breach, obscene material,
          protected systems, and intermediary response.
        </p>
      </section>

      <section className="section-block">
        <div className="search-panel">
          <input
            className="law-search"
            type="search"
            placeholder="Search section, offence, evidence..."
            data-law-search="[data-accordion]"
          />
          <div className="chip-row">
            <Link className="chip" to="/laws/reporting">
              Report incident
            </Link>
            <Link className="chip" to="/laws/penalties">
              See penalties
            </Link>
          </div>
        </div>

        <div className="accordion-list">
          <article className="accordion open" data-accordion>
            <button className="accordion-button">
              <span>Sec 43 / 66</span>Unauthorized access and damage <b className="accordion-icon">-</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Use for unauthorized access, data extraction, malware, denial of service, account compromise, and system damage.
                Preserve logs, IP traces, device images, and timestamps.
              </div>
            </div>
          </article>
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 66C</span>Identity theft <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Applies to fraudulent use of passwords, digital signatures, usernames, OTPs, or other unique identification features.
              </div>
            </div>
          </article>
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 65</span>Source document tampering <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Applies when a person knowingly alters, destroys, conceals, or tampers with computer source documents to cause wrongful loss or facilitate cybercrime.
              </div>
            </div>
          </article>
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 66D</span>Cheating by personation <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Relevant for fake support agents, spoofed profiles, romance scams, job scams, marketplace impersonation, and payment redirection.
              </div>
            </div>
          </article>
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 66E</span>Privacy violation <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Covers capture, publication, or transmission of private images in violation of privacy expectations.
              </div>
            </div>
          </article>
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 67</span>Obscene material <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Used for publication or transmission of obscene electronic content and explicit material that harms public morality.
              </div>
            </div>
          </article>
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 67A</span>Sexually explicit material <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Covers electronic transmission of sexually explicit material, including revenge porn and sexual exploitation via digital channels.
              </div>
            </div>
          </article>
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 67B</span>Child sexual abuse material <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Applies to creation, publication, or transmission of child sexual abuse material through electronic systems.
              </div>
            </div>
          </article>
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 69</span>Interception and decryption <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Supports lawful interception orders, direction to decrypt information, and preservation of digital evidence during investigation.
              </div>
            </div>
          </article>
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 72</span>Confidentiality breach <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Applies when sensitive personal information is disclosed without consent by a person who has access to it under lawful contract.
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block">
        <div className="search-panel">
          <h2 className="section-title">Scam Type → IT Act Mapping</h2>
          <p className="section-description">Quick reference for which IT Act sections apply to common cyber crimes.</p>
        </div>

        <div className="accordion-list">
    <article className="accordion" data-accordion>
      <button className="accordion-button">
        <span>66D · 66C · 43</span>UPI fraud / phishing / QR scam <b className="accordion-icon">+</b>
      </button>
      <div className="accordion-content">
        <div className="accordion-content-inner">
          Sections 66D (cheating by personation), 66C (identity theft), and 43 (unauthorized access / damage)
          apply to UPI fraud, phishing pages, and QR-code redirect scams.
        </div>
      </div>
    </article>
    <article className="accordion" data-accordion>
      <button className="accordion-button">
        <span>66C · 66D</span>Identity theft / OTP misuse <b className="accordion-icon">+</b>
      </button>
      <div className="accordion-content">
        <div className="accordion-content-inner">
          Section 66C covers fraudulent use of passwords, OTPs, and digital signatures. Section 66D extends
          to impersonation used to deceive victims into transferring money or credentials.
        </div>
      </div>
    </article>
    <article className="accordion" data-accordion>
      <button className="accordion-button">
        <span>65 · 66 · 69 · 43</span>Unauthorized access, hacking, tampered systems <b className="accordion-icon">+</b>
      </button>
      <div className="accordion-content">
        <div className="accordion-content-inner">
          Section 66 / 43 cover unauthorized access and system damage; Section 65 applies to source code
          tampering; Section 69 supports lawful interception and decryption orders during investigation.
        </div>
      </div>
    </article>
    <article className="accordion" data-accordion>
      <button className="accordion-button">
        <span>72</span>Confidentiality breach / data leakage <b className="accordion-icon">+</b>
      </button>
      <div className="accordion-content">
        <div className="accordion-content-inner">
          Section 72 applies when sensitive personal data is disclosed without consent by someone who had
          lawful access — insiders, vendors, or service providers.
        </div>
      </div>
    </article>
    <article className="accordion" data-accordion>
      <button className="accordion-button">
        <span>66E · 67 · 67A</span>Privacy invasion / image abuse <b className="accordion-icon">+</b>
      </button>
      <div className="accordion-content">
        <div className="accordion-content-inner">
          Section 66E covers capture or transmission of private images; Section 67 targets obscene
          electronic content; Section 67A applies specifically to sexually explicit material including
          revenge porn.
        </div>
      </div>
    </article>
    <article className="accordion" data-accordion>
      <button className="accordion-button">
        <span>67B</span>Child sexual abuse material <b className="accordion-icon">+</b>
      </button>
      <div className="accordion-content">
        <div className="accordion-content-inner">
          Section 67B covers creation, publication, or transmission of child sexual abuse material through
          any electronic system or network.
        </div>
      </div>
    </article>
        </div>
      </section>
    </main>
  );
}

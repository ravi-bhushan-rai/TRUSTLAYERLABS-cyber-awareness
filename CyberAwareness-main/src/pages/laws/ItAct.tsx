import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/laws.css";
// @ts-ignore: module has no declaration file
import { LawsUI } from "./js/laws.js";
// @ts-ignore: module has no declaration file
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

          {/* Sec 43 / 66 */}
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

          {/* Sec 65 */}
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

          {/* Sec 66B */}
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 66B</span>Receiving stolen computer resource <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Covers dishonestly receiving or retaining any stolen computer resource or communication device, knowing or having reason to believe it to be stolen. Applicable in cases of traded stolen data, credentials, or compromised devices.
              </div>
            </div>
          </article>

          {/* Sec 66C */}
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

          {/* Sec 66D */}
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

          {/* Sec 66E */}
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

          {/* Sec 66F */}
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 66F</span>Cyber terrorism <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Applies to acts that threaten the unity, integrity, security, or sovereignty of India through electronic means — attacking critical infrastructure, disrupting essential services, or using computer resources to spread terror. Carries life imprisonment on conviction.
              </div>
            </div>
          </article>

          {/* Sec 67 */}
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

          {/* Sec 67A */}
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

          {/* Sec 67B */}
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

          {/* Sec 67C */}
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 67C</span>Failure to preserve data <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Mandates intermediaries to preserve and retain specified information as directed. Use when a platform or service provider fails to retain traffic data, transaction logs, or communication records required for an investigation.
              </div>
            </div>
          </article>

          {/* Sec 69 */}
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

          {/* Sec 69A */}
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 69A</span>Website / app blocking <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Empowers the government to direct blocking of public access to any information through any computer resource in the interest of sovereignty, security, public order, or prevention of incitement. Applies to takedown orders against platforms and ISPs.
              </div>
            </div>
          </article>

          {/* Sec 69B */}
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 69B</span>Traffic data monitoring <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Authorises the government to monitor and collect traffic data or information through any computer resource for cyber security purposes. Relevant when authorised agencies require network flow data or metadata from service providers during investigations.
              </div>
            </div>
          </article>

          {/* Sec 70 */}
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 70</span>Protected systems <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Covers unauthorized access to or securing access to systems notified as protected — critical infrastructure including power grids, banking systems, and government networks. Attempted or successful intrusion into such systems is an aggravated offence.
              </div>
            </div>
          </article>

          {/* Sec 70B */}
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 70B</span>CERT-In powers <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Establishes the Indian Computer Emergency Response Team (CERT-In) as the national nodal agency for cyber incident response. Relevant for mandatory incident reporting obligations, coordination with CERT-In during breach response, and compliance with CERT-In directions on security practices.
              </div>
            </div>
          </article>

          {/* Sec 71 */}
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 71</span>Misrepresentation <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Applies when a person obtains a digital signature certificate, licence, or any approval under the IT Act by making a material misrepresentation or suppressing a material fact. Use in cases of fraudulently procured certificates or fake compliance declarations.
              </div>
            </div>
          </article>

          {/* Sec 72 */}
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

          {/* Sec 72A */}
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 72A</span>Disclosure of personal information <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Extends Section 72 to intermediaries and service providers — covers intentional disclosure of personal information obtained under a lawful contract, without consent and in breach of that contract, causing wrongful loss or gain.
              </div>
            </div>
          </article>

          {/* Sec 73 */}
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 73</span>Fake digital signature certificate <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Covers publishing a digital signature certificate that contains false information, or facilitating reliance on such a certificate with fraudulent or unlawful intent. Applicable in cases of forged e-signatures and fraudulent PKI abuse.
              </div>
            </div>
          </article>

          {/* Sec 74 */}
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 74</span>Fraudulent digital signature publication <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Applies to creating or publishing a digital signature certificate for any fraudulent or unlawful purpose. Use alongside Section 73 when a fake certificate is not only created but actively circulated or deployed in transactions.
              </div>
            </div>
          </article>

          {/* Sec 84B */}
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 84B</span>Attempt to commit cyber offence <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Extends liability to attempts — where a cyber offence under the IT Act is attempted but not completed, the accused is liable for half the punishment prescribed for the completed offence. Useful where evidence shows preparation and steps toward execution without a completed act.
              </div>
            </div>
          </article>

          {/* Sec 84C */}
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>Sec 84C</span>Abetment of cyber offence <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Covers instigation, conspiracy to commit, or intentional aiding of any cyber offence under the IT Act. Apply when a person facilitates, instructs, or provides infrastructure for another's cyber offence — mule account recruiters, scam call centre operators, and tool/malware suppliers.
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
              <span>66B · 43</span>Stolen data / traded credentials <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Section 66B applies to persons who dishonestly receive or retain stolen computer resources or data.
                Pair with Section 43 where the underlying theft involved unauthorized access.
              </div>
            </div>
          </article>
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>66F · 70</span>Critical infrastructure attack / cyber terror <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Section 66F covers acts of cyber terrorism targeting national security or essential services. Section 70
                applies specifically to intrusions into government-notified protected systems such as power grids and banking networks.
              </div>
            </div>
          </article>
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>72 · 72A</span>Confidentiality breach / data leakage <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Section 72 applies when sensitive personal data is disclosed without consent by someone who had
                lawful access — insiders, vendors, or service providers. Section 72A extends this to intermediaries
                disclosing personal information in breach of a lawful service contract.
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
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>67C · 69B · 70B</span>Intermediary compliance failures <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Section 67C targets platforms that fail to retain mandated data. Section 69B applies where a
                service provider obstructs authorised traffic monitoring. Section 70B covers non-compliance with
                CERT-In directions on incident reporting and security practices.
              </div>
            </div>
          </article>
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>73 · 74 · 71</span>Forged certificates / misrepresentation <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Sections 73 and 74 apply to fake or fraudulently published digital signature certificates.
                Section 71 covers misrepresentation or suppression of facts to obtain any certificate, licence, or
                approval under the IT Act.
              </div>
            </div>
          </article>
          <article className="accordion" data-accordion>
            <button className="accordion-button">
              <span>84B · 84C</span>Attempt and abetment <b className="accordion-icon">+</b>
            </button>
            <div className="accordion-content">
              <div className="accordion-content-inner">
                Section 84B extends liability to incomplete attempts at any IT Act offence. Section 84C covers
                abetment — mule recruiters, scam infrastructure providers, and anyone who instigates or aids a
                cyber offence are equally liable under these provisions.
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
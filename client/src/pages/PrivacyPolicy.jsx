import "../styles/PrivacyPolicy.css";
import Navbar from "../includes/Navbar";
import Footer from "../includes/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="privacy-policy-wrapper">
        <header className="privacy-policy-header">
          <h3 className="privacy-policy-title">Privacy Policy</h3>
        </header>

        <main>
          <section className="privacy-policy-section">
            <h2 className="privacy-policy-section-title">Introduction</h2>
            <p className="privacy-policy-text">
              Welcome to KASHVI Creation. We respect your privacy and are
              committed to protecting your personal data. This privacy policy
              will inform you about how we look after your personal data when
              you visit our website and tell you about your privacy rights and
              how the law protects you.
            </p>
          </section>

          <section className="privacy-policy-section">
            <h2 className="privacy-policy-section-title">
              Information We Collect
            </h2>
            <p className="privacy-policy-text">
              We collect and process the following information when you use our
              website:
            </p>
            <ul className="privacy-policy-list">
              <li className="privacy-policy-list-item">
                Personal identification information
              </li>
              <li className="privacy-policy-list-item">
                Billing and delivery address
              </li>
              <li className="privacy-policy-list-item">Payment information</li>
              <li className="privacy-policy-list-item">Purchase history</li>
              <li className="privacy-policy-list-item">
                Browsing history and preferences
              </li>
            </ul>
          </section>

          <section className="privacy-policy-section">
            <h2 className="privacy-policy-section-title">
              How We Use Your Information
            </h2>
            <p className="privacy-policy-text">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="privacy-policy-list">
              <li className="privacy-policy-list-item">
                Processing and fulfilling your orders
              </li>
              <li className="privacy-policy-list-item">
                Providing customer support
              </li>
              <li className="privacy-policy-list-item">
                Improving our website and services
              </li>
              <li className="privacy-policy-list-item">
                Sending promotional emails and newsletters (with your consent)
              </li>
              <li className="privacy-policy-list-item">
                Preventing fraud and ensuring website security
              </li>
            </ul>
          </section>

          <section className="privacy-policy-section">
            <h2 className="privacy-policy-section-title">Data Protection</h2>
            <p className="privacy-policy-text">
              We implement appropriate technical and organizational measures to
              ensure a level of security appropriate to the risk, including
              encryption of personal data and regular security assessments.
            </p>
          </section>

          <section className="privacy-policy-section">
            <h2 className="privacy-policy-section-title">Your Rights</h2>
            <p className="privacy-policy-text">You have the right to:</p>
            <ul className="privacy-policy-list">
              <li className="privacy-policy-list-item">
                Access your personal data
              </li>
              <li className="privacy-policy-list-item">
                Correct inaccurate personal data
              </li>
              <li className="privacy-policy-list-item">
                Request erasure of your personal data
              </li>
              <li className="privacy-policy-list-item">
                Object to processing of your personal data
              </li>
              <li className="privacy-policy-list-item">
                Request restriction of processing your personal data
              </li>
              <li className="privacy-policy-list-item">
                Request transfer of your personal data
              </li>
              <li className="privacy-policy-list-item">
                Withdraw consent at any time
              </li>
            </ul>
          </section>

          <section className="privacy-policy-section">
            <h2 className="privacy-policy-section-title">Contact Us</h2>
            <p className="privacy-policy-text">
              If you have any questions about this privacy policy or our privacy
              practices, please contact us at:
            </p>
            <p className="privacy-policy-text">
              Email: kashvicreation10@gmail.com
              <br />
              Phone: +91 93764 21333
              <br />
              Address: Shop No. 113, Millenium Textile Market - 2 Ring Road,
              Surat - 395007
            </p>
          </section>
        </main>

        <footer className="privacy-policy-footer">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </footer>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;

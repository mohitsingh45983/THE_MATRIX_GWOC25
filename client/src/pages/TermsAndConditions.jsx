import "../styles/TermsAndConditions.css";
import Navbar from "../includes/Navbar";
import Footer from "../includes/Footer";

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <div className="terms-wrapper">
        <header className="terms-header">
          <h1 className="terms-title">Terms and Conditions</h1>
        </header>

        <main className="terms-content">
          <section className="terms-section">
            <h2 className="terms-section-title">Introduction</h2>
            <p className="terms-paragraph">
              Welcome to KASHVI Creation. These terms and conditions outline the
              rules and regulations for the use of our website.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="terms-section-title">Acceptance of Terms</h2>
            <p className="terms-paragraph">
              By accessing this website, you accept these terms and conditions
              in full. Do not continue to use our website if you do not accept
              all of the terms and conditions stated on this page.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="terms-section-title">Product Information</h2>
            <p className="terms-paragraph">
              We strive to provide accurate product descriptions and images.
              However, we do not warrant that product descriptions or other
              content of this site is accurate, complete, reliable, current, or
              error-free.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="terms-section-title">Pricing and Payment</h2>
            <ul className="terms-list">
              <li>
                All prices are listed in [Your Currency] and are inclusive of
                applicable taxes.
              </li>
              <li>
                We reserve the right to modify prices without prior notice.
              </li>
              <li>Payment is due at the time of purchase.</li>
              <li>We accept [list of accepted payment methods].</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="terms-section-title">Shipping and Delivery</h2>
            <p className="terms-paragraph">
              We ship to [list of countries]. Delivery times may vary depending
              on the destination. We are not responsible for delays caused by
              customs or other factors outside our control.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="terms-section-title">Returns and Refunds</h2>
            <p className="terms-paragraph">
              We offer a [number of days] day return policy. To be eligible for
              a return, your item must be unused and in the same condition that
              you received it.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="terms-section-title">Intellectual Property</h2>
            <p className="terms-paragraph">
              The content on this website, including but not limited to text,
              graphics, logos, and images, is the property of Elegant Sarees
              E-commerce and is protected by copyright laws.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="terms-section-title">Limitation of Liability</h2>
            <p className="terms-paragraph">
              We shall not be liable for any indirect, incidental, special,
              consequential or punitive damages, including without limitation,
              loss of profits, arising out of or in connection with your use of
              this website.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="terms-section-title">Governing Law</h2>
            <p className="terms-paragraph">
              These terms and conditions are governed by and construed in
              accordance with the laws of [Your Country/State] and you
              irrevocably submit to the exclusive jurisdiction of the courts in
              that State or location.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="terms-section-title">Changes to Terms</h2>
            <p className="terms-paragraph">
              We reserve the right to modify these terms and conditions at any
              time. Your continued use of the website after changes are posted
              constitutes your acceptance of the modified terms.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="terms-section-title">Contact Us</h2>
            <p className="terms-paragraph">
              If you have any questions about these Terms and Conditions, please
              contact us at:
            </p>
            <p className="terms-contact">
              kashvicreation10@gmail.com
              <br />
              +91 93764 21333
              <br />
              Shop No. 113, Millenium Textile Market - 2 Ring Road, Surat -
              395007
            </p>
          </section>
        </main>

        <footer className="terms-footer">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </footer>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;

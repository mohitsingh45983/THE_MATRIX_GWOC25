import React, { useState } from "react";
import "../styles/contactForm.css";

const ContactFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can handle form submission here
    toggleModal(); // Close modal after submission
  };

  return (
    <>
      <button onClick={toggleModal} className="open-modal-btn-mohit">
        Contact Us
      </button>

      {isOpen && (
        <div className="modal-overlay-mohit">
          <div className="modal-content-mohit">
            <div className="contact-container-mohit">
              <div className="contact-info-mohit">
                <h2>Get in touch</h2>

                <div className="contact-item-mohit">
                  <p>
                    <span className="icon-mohit">📞</span> CALL US
                  </p>
                  <p>
                    <a href="tel:+912248900416">+91 (22) 4890 0416 (India)</a>
                    <br />
                    <a href="tel:+14085209415">+1 (408) 520 9415 (US)</a>
                    <br />
                    <a href="tel:+442071930887">+44 (20) 7193 0887 (UK)</a>
                    <br />
                    <a href="tel:+61280064667">+61 (02) 8006 4667 (AUS)</a>
                  </p>
                </div>

                <div className="contact-item-mohit">
                  <p>
                    <span className="icon-mohit">📧</span> MAIL US
                  </p>
                  <p>
                    <a href="mailto:info@kalkifashion.com">
                      info@kalkifashion.com
                    </a>
                  </p>
                </div>

                <div className="contact-item-mohit">
                  <p>
                    <span className="icon-mohit">💬</span> CHAT WITH US
                  </p>
                  <p>
                    <a href="mailto:info@kalkifashion.com">
                      info@kalkifashion.com
                    </a>
                  </p>
                </div>

                <div className="contact-item-mohit">
                  <p>
                    <span className="icon-mohit">📱</span> WHATSAPP
                  </p>
                  <p>
                    <a
                      href="https://wa.me/918890454118"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +91 (22) 4890 0416 (India)
                    </a>
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="contact-form-mohit">
                <div className="modal-header-mohit">
                  <h2>Contact Us</h2>
                  <button onClick={toggleModal} className="close-btn-mohit">
                    &times;
                  </button>
                </div>

                <input
                  type="text"
                  name="fullName"
                  placeholder="*Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="*Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="*Telephone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Add Review"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                <button type="submit" className="submit-btn-mohit">
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactFormModal;

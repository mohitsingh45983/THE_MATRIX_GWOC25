import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import {
  Modal,
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "../styles/contactmodal.css"; // Custom CSS for responsiveness
import "../styles/flash.css";
const temp = import.meta.env.VITE_BACKEND_URL;

function ContactModal({ show, onHide }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [flash, setFlash] = useState("");
  const [flashImage, setFlashImage] = useState(null);
  const [flashVisible, setFlashVisible] = useState(false);

  // Helper function to show flash messages with fade in/out transition.
  const showFlash = (message, imageUrl, duration = 1000) => {
    setFlash(message);
    setFlashImage(imageUrl);
    setTimeout(() => {
      setFlashVisible(true);
    }, 10);
    setTimeout(() => {
      setFlashVisible(false);
      setTimeout(() => {
        setFlash("");
      }, 500);
    }, duration);
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    telephone: "",
    review: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${temp}/orders-related/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({ fullName: "", email: "", telephone: "", review: "" });
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      showFlash(
        "Failed to send message. Please try again later.",
        "/images/undraw_cancel_7zdh.svg"
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSuccessMessage("");
        onHide();
      }, 3000);
    }
  };

  if (!show) return null;

  return (
    <>
      {/* Flash Modal */}
      {flash && (
        <div className={`flash-container ${flashVisible ? "visible" : ""}`}>
          <div className="flash-modal">
            <img
              className="flash-icon"
              src={flashImage}
              alt="Cart Illustration"
            />
            <h2 className="flash-text">{flash}</h2>
          </div>
        </div>
      )}
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
        className="contact-modal"
      >
        <Modal.Body className="p-4 rounded ">
          <Container fluid>
            <Row className="contact-row">
              {/* Left Section */}
              <Col xs={12} md={6} className="contact-left p-3">
                <h2 className="fw-light fs-4 mb-4">Get in Touch</h2>

                {[
                  {
                    icon: "bi-telephone-fill",
                    title: "CALL US",
                    details: ["+91 93764 21333", "+91 72909 09696"],
                    link: "tel:9376421333",
                  },
                  {
                    icon: "bi-envelope-fill",
                    title: "MAIL US",
                    details: ["kashvicreation10@gmail.com"],
                    link: "mailto:kashvicreation10@gmail.com",
                  },
                  {
                    icon: "bi-whatsapp",
                    title: "WHATSAPP",
                    details: ["+91 9920012474"],
                    link: "https://api.whatsapp.com/send?phone=+919376421333&text=Hello%20to%20Kashvi%20Sarees",
                  },
                ].map((item, index) => (
                  <Card key={index} className="border-0 shadow-sm mb-2 p-2">
                    <Card.Body className="d-flex align-items-center gap-2">
                      <i className={`bi ${item.icon} fs-6 text-muted`}></i>
                      <div>
                        <h3 className="fw-light fs-6 mb-1">{item.title}</h3>
                        {item.details.map((detail, i) => (
                          <p key={i} className="small text-muted mb-0">
                            <a href={item.link}>{detail}</a>
                          </p>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </Col>

              {/* Right Section */}
              <Col
                xs={12}
                md={6}
                className="contact-right p-3 bg-light rounded"
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="fw-light fs-4">Contact Us</h2>
                  {successMessage && (
                    <p className="text-success small mb-0">{successMessage}</p>
                  )}
                  <Button
                    variant="link"
                    onClick={onHide}
                    className="p-0 text-dark"
                  >
                    <i className="bi bi-x-lg fs-6"></i>
                  </Button>
                </div>

                <Form onSubmit={handleSubmit}>
                  {[
                    { name: "fullName", label: "Full Name", type: "text" },
                    { name: "email", label: "Email Address", type: "email" },
                    { name: "telephone", label: "Telephone", type: "tel" },
                  ].map(({ name, label, type }) => (
                    <Form.Group key={name} className="mb-2">
                      <Form.Label className="small text-muted">
                        {label}
                      </Form.Label>
                      <Form.Control
                        name={name}
                        type={type}
                        required
                        value={formData[name]}
                        onChange={handleChange}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  ))}

                  <Form.Group className="mb-3">
                    <Form.Label className="small text-muted">
                      Add Review
                    </Form.Label>
                    <Form.Control
                      name="review"
                      as="textarea"
                      rows={3}
                      value={formData.review}
                      onChange={handleChange}
                      className="border-light shadow-sm"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 rounded-3 py-2"
                    style={{ backgroundColor: "black", borderColor: "black" }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ContactModal;

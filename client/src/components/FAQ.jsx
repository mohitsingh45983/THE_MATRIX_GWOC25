"use client";

import { useState, useRef, useEffect } from "react";
import "../styles/FAQ.css";

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef([]);

  const faqs = [
    {
      question: "Delivery Was Attempted But I Was Unavailable. What Next?",
      answer:
        "You can reschedule the delivery or contact customer support for assistance.",
    },
    {
      question: "Does KASHVI Creation Offer Cash On Delivery (COD)?",
      answer:
        "COD is available for selected locations/Pin codes in India only. COD limit is up to 18000 INR. Customisation is not available for COD orders.",
    },
    {
      question: "Will I Receive A Quality Product By KASHVI Fashion?",
      answer:
        "We adhere to strict quality and design benchmarks. Every KASHVI product goes through a 5-step Quality Control process to ensure that you receive the best.",
    },
    {
      question:
        "The Order Status Is 'Delivered' But Not Received It. What Should I Do?",
      answer:
        "Please check with neighbors or contact customer support to raise a query.",
    },
    {
      question: "How To Track The Order Once Shipped?",
      answer:
        "You can track your order using the tracking link provided in the shipment confirmation email.",
    },
  ];

  useEffect(() => {
    answerRefs.current = answerRefs.current.slice(0, faqs.length);
  }, []); // Removed unnecessary dependency 'faqs'

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div id="faq" className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
          >
            <div
              className={`faq-question ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <h3>{faq.question}</h3>
              <span className="faq-icon">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>
            <div
              className={`faq-answer ${openIndex === index ? "open" : ""}`}
              ref={(el) => (answerRefs.current[index] = el)}
              style={{
                maxHeight:
                  openIndex === index
                    ? `${answerRefs.current[index]?.scrollHeight}px`
                    : "0px",
              }}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;

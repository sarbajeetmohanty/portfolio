import { MdArrowOutward } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>WhatsApp</h4>
            <p>
              <a
                href="https://api.whatsapp.com/send/?phone=918260540233"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                +91 8260540233
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Connect</h4>
            <a
              href="https://api.whatsapp.com/send/?phone=918260540233"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              WhatsApp <MdArrowOutward />
            </a>
            <a
              href="https://t.me/insane_dark90"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Telegram <MdArrowOutward />
            </a>
          </div>
        </div>
      </div>
      <footer className="contact-footer-absolute">
        Edited and Designed by <span>Sharim</span> (C) 2026
      </footer>
    </div>
  );
};

export default Contact;

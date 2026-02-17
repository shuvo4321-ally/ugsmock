"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

/* ─── Constants ─── */
const WA = "61466449762"; // User provided number
const EMAIL = "info@ugstravels.com";

const wa = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

/* ─── Destinations with Unsplash photos ─── */
const destinations = [
  { name: "United States", code: "us", tag: "Land of Opportunity", img: "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "United Kingdom", code: "gb", tag: "Heritage & Culture", img: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Canada", code: "ca", tag: "True North Strong", img: "https://images.pexels.com/photos/1868676/pexels-photo-1868676.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Australia", code: "au", tag: "Down Under Paradise", img: "https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "UAE", code: "ae", tag: "Luxury & Innovation", img: "https://images.pexels.com/photos/823696/pexels-photo-823696.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Malaysia", code: "my", tag: "Truly Asia", img: "https://images.pexels.com/photos/22804/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Thailand", code: "th", tag: "Land of Smiles", img: "https://images.pexels.com/photos/1682748/pexels-photo-1682748.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Singapore", code: "sg", tag: "Garden City", img: "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Turkey", code: "tr", tag: "East Meets West", img: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Saudi Arabia", code: "sa", tag: "Kingdom of Vision", img: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Japan", code: "jp", tag: "Ancient & Modern", img: "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "South Korea", code: "kr", tag: "Morning Calm", img: "https://images.pexels.com/photos/2376712/pexels-photo-2376712.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Maldives", code: "mv", tag: "Tropical Bliss", img: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Italy", code: "it", tag: "La Dolce Vita", img: "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "France", code: "fr", tag: "Art & Romance", img: "https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Switzerland", code: "ch", tag: "Alpine Elegance", img: "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

const services = [
  { icon: "visa", title: "Visa Assistance", text: "Complete guidance through documentation, appointments and follow-ups." },
  { icon: "flight", title: "Flight Booking", text: "Best-value airfares with the most convenient routes worldwide." },
  { icon: "hotel", title: "Hotel Reservations", text: "Handpicked accommodations matched to your preferences and budget." },
  { icon: "tour", title: "Tour Packages", text: "Curated experiences with guided tours, transfers and activities." },
];

/* ─── Inline SVG Icons ─── */
const I: Record<string, React.ReactNode> = {
  whatsapp: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  visa: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 10h20" /><path d="M6 14h2" /><path d="M10 14h4" /></svg>,
  flight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" /></svg>,
  hotel: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>,
  tour: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>,
  facebook: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
  down: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>,
};

/* ─── Scroll reveal ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    el.querySelectorAll(".reveal").forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Page ─── */
export default function Home() {
  /* ─── State ─── */
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const wrapper = useReveal();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const to = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div ref={wrapper}>
      {/* ── NAVBAR ── */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar__inner">
          <a href="#" className="navbar__logo"><img src="/logo.png" alt="UGS Travels" /></a>
          <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>


        </div>
      </nav>

      {/* ── SIDEBAR ── */}
      <div className={`sidebar-backdrop ${menuOpen ? "visible" : ""}`} onClick={() => setMenuOpen(false)} />
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar__header">
          <img src="/logo.png" alt="UGS Travels" className="sidebar__logo" />
          <button className="sidebar__close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        </div>
        <nav className="sidebar__nav">
          <a onClick={() => { to("destinations"); setMenuOpen(false); }}>Destinations</a>
          <a onClick={() => { to("services"); setMenuOpen(false); }}>Services</a>
          <a onClick={() => { to("about"); setMenuOpen(false); }}>About Us</a>
          <a onClick={() => { to("contact"); setMenuOpen(false); }}>Contact</a>
        </nav>
        <div className="sidebar__cta">
          <div className="sidebar__icons">
            <a className="icon-btn whatsapp" href={wa("Hi, I want to plan a trip.")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              {I.whatsapp}
            </a>
            <a className="icon-btn mail" href={`mailto:${EMAIL}`} aria-label="Email">
              {I.mail}
            </a>
            <a className="icon-btn phone" href="tel:+61466449762" aria-label="Call">
              {I.phone}
            </a>
          </div>
        </div>
      </aside>

      {/* ── HERO with video bg ── */}
      <section className="hero" id="home" style={{ backgroundColor: "#000" }}>
        <div className="hero__video-wrap">
          {/* Add a 'poster.jpg' to public folder for instant preview */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/poster.jpg"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
            // @ts-ignore
            fetchPriority="high"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero__overlay" />
        <div className="container hero__content">
          <h1 className="hero__title">
            Explore the<br /><span>World</span> with Us
          </h1>
          <p className="hero__sub">
            Choose your dream destination and connect with our travel experts
            instantly on WhatsApp.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={wa("Hi, I want to plan a trip. Can you help?")} target="_blank" rel="noopener noreferrer">
              {I.whatsapp} Start Planning
            </a>
            <button className="btn btn--outline" onClick={() => to("destinations")}>
              Discover Destinations {I.down}
            </button>
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section className="destinations" id="destinations">
        <div className="container">
          <div className="destinations__header reveal">
            <p className="section-label">Discover the World</p>
            <h2 className="section-title">Where Would You Like to Go?</h2>
            <p className="section-sub">Tap a destination to start a conversation on WhatsApp.</p>
          </div>
          <div className="destinations__grid">
            {destinations.map((d, i) => (
              <a
                key={d.code}
                className={`dest-card reveal reveal-d${(i % 8) + 1}`}
                href={wa(`Hi, I'm interested in traveling to ${d.name}. Please share available packages and details.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="dest-card__img">
                  <Image
                    src={d.img}
                    alt={d.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="dest-card__overlay" />
                <div className="dest-card__info">
                  <Image
                    className="dest-card__flag"
                    src={`https://flagcdn.com/w80/${d.code}.png`}
                    alt={d.name}
                    width={28}
                    height={20}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="dest-card__name">{d.name}</div>
                  <div className="dest-card__tagline">{d.tag}</div>
                </div>
                <div className="dest-card__arrow">{I.arrow}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services" id="services">
        <div className="container">
          <div className="services__header reveal">
            <p className="section-label">Our Services</p>
            <h2 className="section-title">How We Help You Travel</h2>
            <p className="section-sub">Everything you need for a seamless international trip.</p>
          </div>
          <div className="services__grid">
            {services.map((s, i) => (
              <a key={s.icon} href={wa(`I'm interested in ${s.title}`)} target="_blank" rel="noopener noreferrer" className={`service-card reveal reveal-d${i + 1}`}>
                <div className="service-card__icon">{I[s.icon]}</div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__text">{s.text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="about" id="about">
        <div className="container">
          <div className="about__inner">
            <div className="about__image reveal">
              <Image
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="UGS Travels team"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <div className="about__image-accent" />
            </div>
            <div className="about__content reveal reveal-d2">
              <p className="section-label">About Us</p>
              <h2 className="section-title">UGS Travels</h2>
              <p className="about__text">
                We are a dedicated travel services provider helping people explore
                the world with ease. Whether it&apos;s a family vacation, a business
                trip or a solo adventure — our team guides you every step of the way.
              </p>
              <div className="about__contact">
                <a className="about__contact-item" href={`mailto:${EMAIL}`}>{I.mail}<span>{EMAIL}</span></a>
                <a className="about__contact-item" href={wa("Hi, I'd like to get in touch.")} target="_blank" rel="noopener noreferrer">{I.whatsapp}<span>+61 466 449 762</span></a>
                <a className="about__contact-item" href="tel:+61466449762">{I.phone}<span>+61 466 449 762</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner">
        <div className="container reveal">
          <h2 className="cta-banner__title">Ready to Start Your Journey?</h2>
          <p className="cta-banner__sub">Message us on WhatsApp and we&apos;ll help plan the perfect trip.</p>
          <a className="btn btn--primary" href={wa("Hi, I'm ready to plan my next trip!")} target="_blank" rel="noopener noreferrer">
            {I.whatsapp} Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer__brand">
              <img src="/logo.png" alt="UGS Travels" />
              <p>Your trusted partner for international travel.</p>
            </div>
            <div className="footer__col">
              <h4>Legal</h4>
              <ul>
                <li><a onClick={() => setActiveModal("privacy")}>Privacy Policy</a></li>
                <li><a onClick={() => setActiveModal("terms")}>Terms of Use</a></li>
                <li><a onClick={() => setActiveModal("faq")}>FAQ</a></li>
              </ul>
            </div>
            <div className="footer__col">
              <h4>Top Destinations</h4>
              <ul>
                <li><a href={wa("Interested in the United States.")} target="_blank" rel="noopener noreferrer">United States</a></li>
                <li><a href={wa("Interested in United Kingdom.")} target="_blank" rel="noopener noreferrer">United Kingdom</a></li>
                <li><a href={wa("Interested in Canada.")} target="_blank" rel="noopener noreferrer">Canada</a></li>
                <li><a href={wa("Interested in Australia.")} target="_blank" rel="noopener noreferrer">Australia</a></li>
              </ul>
            </div>
            <div className="footer__col" id="contact">
              <h4>Contact</h4>
              <ul>
                <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
                <li><a href="tel:+61466449762">+61 466 449 762</a></li>
                <li><a href={wa("Hello!")} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <p>&copy; 2026 UGS Travels. All rights reserved.</p>

          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <a className="whatsapp-float" href={wa("Hi, I'd like to inquire about travel services.")} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        {I.whatsapp}
      </a>
      {/* ── LEGAL MODAL ── */}
      <LegalModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}

function LegalModal({ type, onClose }: { type: string | null; onClose: () => void }) {
  if (!type) return null;

  const content: Record<string, { title: string; body: React.ReactNode }> = {
    privacy: {
      title: "Privacy Policy",
      body: (
        <>
          <p><strong>Last Updated: February 2026</strong></p>
          <p>At UGS Travels, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
          <h4>1. Information We Collect</h4>
          <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows: Identity Data, Contact Data, and Technical Data.</p>
          <h4>2. How We Use Your Data</h4>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you.</p>
        </>
      ),
    },
    terms: {
      title: "Terms of Use",
      body: (
        <>
          <p><strong>Welcome to UGS Travels</strong></p>
          <p>These terms and conditions outline the rules and regulations for the use of UGS Travels' Website.</p>
          <h4>1. Acceptance of Terms</h4>
          <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use UGS Travels if you do not agree to take all of the terms and conditions stated on this page.</p>
          <h4>2. License</h4>
          <p>Unless otherwise stated, UGS Travels and/or its licensors own the intellectual property rights for all material on UGS Travels.</p>
        </>
      ),
    },
    faq: {
      title: "Frequently Asked Questions",
      body: (
        <>
          <h4>How do I book a trip?</h4>
          <p>Simply click on any "Chat on WhatsApp" button to connect with our travel experts. We will handle everything from there!</p>
          <h4>Do you provide visa assistance?</h4>
          <p>Yes, we provide comprehensive visa assistance for all major destinations including US, UK, Canada, and Australia.</p>
          <h4>What payment methods do you accept?</h4>
          <p>We accept bank transfers, credit cards, and cash payments at our office.</p>
        </>
      ),
    },
  };

  const data = content[type];
  if (!data) return null;

  return (
    <div className="modal-backdrop visible" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{data.title}</h3>
          <button onClick={onClose} className="modal-close">&times;</button>
        </div>
        <div className="modal-body">
          {data.body}
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, AtSign, CalendarDays, Check, ChevronRight, Flame, Mail, Menu as MenuIcon, Sparkles, Users, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = ["About", "Menu", "Services", "Events", "Contact"];
const values = [
  { number: "01", icon: Flame, title: "Fresh off the grill", text: "Made on-site and served with the energy of the event." },
  { number: "02", icon: Users, title: "People at the center", text: "Food is the start. Connection is what makes it memorable." },
  { number: "03", icon: Zap, title: "Built to learn", text: "A real student venture shaped through action, feedback, and growth." },
];
const services = [
  { icon: Flame, eyebrow: "01 / SERVE", title: "Event Catering", text: "Fresh grilled food and cold drinks, prepared for gatherings of every kind.", tone: "orange" },
  { icon: Sparkles, eyebrow: "02 / ENGAGE", title: "Food Experiences", text: "More than a meal—games, giveaways, and little moments guests remember.", tone: "gold" },
  { icon: Users, eyebrow: "03 / CONNECT", title: "Community Events", text: "Friendly, reliable service that adds energy and flavor to the whole room.", tone: "cream" },
];
const menuCategories = ["Burgers", "Combos", "Beverages", "Desserts", "Sides"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (!heroRef.current) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      heroRef.current.style.setProperty("--mx", `${x}`);
      heroRef.current.style.setProperty("--my", `${y}`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const startTextInquiry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Hi Faiz’s Buns! I’m interested in booking you for an event.",
      "",
      `Name: ${form.get("name")}`,
      `Email: ${form.get("email")}`,
      `Event date: ${form.get("date")}`,
      `Event type: ${form.get("type")}`,
      `Details: ${form.get("details")}`,
    ].join("\n");

    const encodedMessage = encodeURIComponent(message);
    const isAppleDevice = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
    const groupTextUrl = isAppleDevice
      ? `sms://open?addresses=+14086625447,+14086932024&body=${encodedMessage}`
      : `sms:+14086625447;+14086932024?body=${encodedMessage}`;

    setSent(true);
    window.location.href = groupTextUrl;
  };

  return (
    <main>
      <nav className="site-nav" aria-label="Main navigation">
        <button className="brand-lockup" onClick={() => scrollTo("home")} aria-label="Faiz's Buns home"><span className="brand-mark"><Flame size={18} strokeWidth={2.8} /></span><span>FAIZ’S <b>BUNS</b></span></button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => <button key={item} onClick={() => scrollTo(item)}>{item}</button>)}
          <Button className="nav-cta" onClick={() => scrollTo("contact")}>Book an event <ArrowUpRight /></Button>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <MenuIcon />}</button>
      </nav>

      <section className="hero" id="home" ref={heroRef}>
        <div className="hero-grid" aria-hidden="true" /><div className="glow" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span /> STUDENT-LED. EVENT-READY.</div>
          <h1>Fresh off<br />the grill.<br /><em>Built to connect.</em></h1>
          <p>Faiz’s Buns brings bold flavor, good energy, and memorable food experiences to every event.</p>
          <div className="hero-actions"><Button className="primary-btn" onClick={() => scrollTo("menu")}>Explore the menu <ArrowDownRight /></Button><Button className="text-btn" variant="ghost" onClick={() => scrollTo("contact")}>Book us for an event <ChevronRight /></Button></div>
        </div>
        <div className="hero-visual" aria-label="Fresh grilled smash burger">
          <div className="orbit orbit-a"><span>GRILLED</span></div><div className="orbit orbit-b"><span>FRESH</span></div><div className="burger-halo" />
          <Image className="hero-burger" src="/faizs-buns-hero.png" alt="A fresh double smash burger with melted cheese" width={1200} height={1200} priority />
          <div className="float-tag tag-one"><Flame size={18} /> Made fresh</div><div className="float-tag tag-two"><Sparkles size={18} /> Good energy</div>
        </div>
        <div className="hero-proof"><span className="proof-line" /><p><b>Food. People. Moments.</b><br />That’s what we’re here for.</p></div>
        <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i /></div>
      </section>

      <section className="marquee" aria-label="Faiz's Buns services"><div>FRESH GRILLED FOOD <i>✦</i> EVENT CATERING <i>✦</i> GOOD ENERGY <i>✦</i> COMMUNITY FIRST <i>✦</i> FRESH GRILLED FOOD <i>✦</i> EVENT CATERING <i>✦</i></div></section>

      <section className="about section" id="about">
        <div className="section-kicker" data-reveal><span>01</span> WHY WE DO IT</div>
        <div className="about-head" data-reveal><h2>We don’t just serve food.<br /><em>We create the moment.</em></h2><p>Faiz’s Buns is built around entrepreneurship, creativity, and bringing people together. Every event is a chance to learn, serve, and make something worth remembering.</p></div>
        <div className="values-grid">{values.map(({ icon: Icon, ...item }) => <article className="value-card" key={item.number} data-reveal><div className="card-top"><span>{item.number}</span><Icon /></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className="menu-section section" id="menu">
        <div className="menu-copy" data-reveal><div className="section-kicker light"><span>02</span> WHAT WE SERVE</div><h2>Simple menu.<br /><em>Serious flavor.</em></h2><p>Made for quick service, big crowds, and zero compromise on taste. Exact selections and pricing are confirmed for each event.</p><div className="category-row">{menuCategories.map((category, index) => <span key={category}><b>0{index + 1}</b>{category}</span>)}</div></div>
        <div className="menu-stage" data-reveal><div className="menu-card actual-menu"><div className="menu-card-head"><span className="brand-mark large"><Flame /></span><div><b>FAIZ’S BUNS</b><small>FULL EVENT MENU</small></div></div><Image className="menu-art" src="/faizs-buns-menu.png" alt="Faiz’s Buns menu with beverages, combos, burgers, desserts, fries, and prices" width={1810} height={1400} /><div className="menu-card-foot"><span>Hover to take a closer look</span><Sparkles size={18} /></div></div><span className="menu-shadow" /></div>
      </section>

      <section className="services section" id="services">
        <div className="services-head" data-reveal><div><div className="section-kicker"><span>03</span> WHAT WE BRING</div><h2>More than catering.<br /><em>An experience.</em></h2></div></div>
        <div className="services-grid">{services.map(({ icon: Icon, ...service }) => <article className={`service-card ${service.tone}`} key={service.title} data-reveal><div className="service-icon"><Icon /></div><span>{service.eyebrow}</span><h3>{service.title}</h3><p>{service.text}</p><ArrowUpRight className="service-arrow" /></article>)}</div>
      </section>

      <section className="story section" id="events">
        <div className="story-number" aria-hidden="true">01</div>
        <div className="story-copy" data-reveal><div className="section-kicker light"><span>04</span> THE VENTURE</div><h2>Built from an idea.<br /><em>Growing through action.</em></h2><blockquote>“Entrepreneurship isn’t just what we study. It’s what we’re building—one event, one customer, one lesson at a time.”</blockquote><p>Faiz’s Buns represents teamwork, creativity, and learning through real experience. We show up, serve well, listen closely, and keep improving.</p><div className="story-tags"><span>TEAMWORK</span><span>CREATIVITY</span><span>COMMUNITY</span><span>GROWTH</span></div></div>
        <div className="founder-portrait" data-reveal><Image src="/faizs-buns-founder-logo.png" alt="Faiz’s Buns founder wearing a chef hat and holding two burgers beneath the brand logo" width={1126} height={1394} /><span><b>FOUNDER-LED</b> / BUILT FROM EXPERIENCE</span></div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-copy" data-reveal><div className="section-kicker"><span>05</span> LET’S MAKE IT HAPPEN</div><h2>Bring the Buns<br />to your <em>next event.</em></h2><p>Tell us what you’re planning. We’ll bring the food, the energy, and the experience.</p><a className="social-link" href="#" aria-label="Social profile placeholder"><AtSign /> FAIZSBUNS <ArrowUpRight /></a></div>
        <form className="contact-form" data-reveal onSubmit={startTextInquiry}>
          {sent ? <div className="success-message"><span><Check /></span><h3>Your text is ready.</h3><p>We opened a group message to (408) 662-5447 and (408) 693-2024. Review the details, then tap send in your Messages app.</p><Button type="button" onClick={() => setSent(false)}>Start over</Button></div> : <><div className="form-row"><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@example.com" /></label></div><div className="form-row"><label>Event date<div className="input-icon"><CalendarDays /><input required type="date" name="date" /></div></label><label>Event type<select required name="type" defaultValue=""><option value="" disabled>Select one</option><option>School event</option><option>Community gathering</option><option>Private event</option><option>Other</option></select></label></div><label>Tell us about it<textarea required name="details" rows={4} placeholder="Guest count, location, and what you have in mind..." /></label><Button className="submit-btn" type="submit">Continue to text message <ArrowUpRight /></Button><p className="text-note">Your text will be addressed to both Faiz’s Buns contacts.</p></>}
        </form>
      </section>

      <footer><div className="brand-lockup footer-brand"><span className="brand-mark"><Flame /></span><span>FAIZ’S <b>BUNS</b></span></div><p>Fresh grilled experiences, built with heart.</p><div><span>© 2026 FAIZ’S BUNS</span><button className="footer-text-link" type="button" onClick={() => { const isAppleDevice = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent); window.location.href = isAppleDevice ? "sms://open?addresses=+14086625447,+14086932024" : "sms:+14086625447;+14086932024"; }}><Mail /> TEXT US</button></div></footer>
    </main>
  );
}

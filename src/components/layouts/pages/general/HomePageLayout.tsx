import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HeroCanvas from "../../../molecules/general/HeroCanvas";
import PortfolioFooter from "../../../molecules/general/PortfolioFooter";
import useScrollReveal from "../../../../hooks/useScrollReveal";

const marqueeItems = [
  "LivePerson",
  "Blue Owl",
  "BrainGym.AI",
  "Usprawniacze Firm",
  "Sigbar",
  "Odyssey Momentum",
  "Bank Millennium",
  "Univ. of Groningen",
];

const capabilities = [
  {
    num: "A1",
    title: "AI Agent Development",
    body: "Prompt architectures and autonomous, tool-using agents that handle real customer conversations — designed, evaluated and shipped to production at LivePerson.",
    tags: ["Agents", "Prompt design", "Conversational AI"],
  },
  {
    num: "A2",
    title: "Machine Learning & NLP",
    body: "Grounded in AI fundamentals from Groningen — neural networks, computer vision, NLP — applied to making language models reliable, measurable and safe.",
    tags: ["LLMs", "NLP", "Evaluation"],
  },
  {
    num: "A3",
    title: "Front-End Engineering",
    body: "Fast, polished React interfaces — from token-gated social UI on Odyssey Momentum to high-performance Shopify storefronts with Outsmartly at Blue Owl.",
    tags: ["React", "TypeScript", "Module Federation"],
  },
  {
    num: "A4",
    title: "Process Automation",
    body: "Consulting work that removes manual toil — automating operations and embedding AI agents into the sales and support flows of real businesses.",
    tags: ["Automation", "Integrations", "Consulting"],
  },
];

const work = [
  {
    idx: "01",
    title: "Conversational AI agents",
    desc: "Prompt architectures & agents for global brands as Prompt Engineer II.",
    tags: ["LivePerson", "2024 — now"],
  },
  {
    idx: "02",
    title: "AI-powered learning platform",
    desc: "GPT prompt pipelines generating personalised learning at BrainGym.AI.",
    tags: ["BrainGym.AI", "GPT"],
  },
  {
    idx: "03",
    title: "Dynamic plugin system",
    desc: "Module Federation + craco wrapper letting devs ship Momentum plugins with zero config.",
    tags: ["Module Federation", "React"],
  },
  {
    idx: "04",
    title: "SteelProfil sales agent",
    desc: "Customer-facing AI agent giving instant quotations & company info.",
    tags: ["Usprawniacze", "Agents"],
  },
  {
    idx: "05",
    title: "Odyssey Momentum metaverse",
    desc: "Social UI, Stage Mode & token-gated access; refactor to MobX.",
    tags: ["Sigbar", "React · MobX"],
  },
  {
    idx: "06",
    title: "Goodie — iOS loyalty platform",
    desc: "Swift app for discounts & loyalty; where the clean-code habit started.",
    tags: ["Bank Millennium", "Swift"],
  },
];

const HomePageLayout: React.FC = () => {
  useScrollReveal();

  useEffect(() => {
    document.title = "Daniel Aboo — Prompt Engineer & Full-Stack Developer";
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <HeroCanvas />
        <div className="hero-fade" />
        <div className="wrap hero-inner">
          <div className="status hero-status reveal in">
            <span className="dot" /> Available for select AI &amp; product
            consulting
          </div>
          <h1 className="display hero-name reveal in" data-delay="1">
            Daniel&nbsp;Aboo
          </h1>
          <p className="hero-role reveal in" data-delay="2">
            <span className="accent-text">Prompt Engineer II</span> @ LivePerson
            — building AI agents &amp; full-stack products.
          </p>
          <p className="lead hero-lead reveal in" data-delay="3">
            I design and ship conversational AI — prompt architectures,
            autonomous agents and the interfaces around them — that turn
            frontier models into measurable business outcomes.
          </p>
          <div className="hero-actions reveal in" data-delay="4">
            <Link className="btn btn-primary" data-magnetic to="/contact">
              Start a project <span className="arrow">→</span>
            </Link>
            <Link className="btn btn-ghost" to="/cv">
              View full CV
            </Link>
          </div>
        </div>
        <div className="hero-scroll reveal in" data-delay="5">
          <span>SCROLL</span>
          <span className="line" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <React.Fragment key={i}>
              <span>{item}</span>
              <span className="sep">/</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section className="section-pad" id="about">
        <div className="wrap about-grid">
          <div className="about-left reveal">
            <span className="kicker">
              <span className="idx">01</span> — About
            </span>
            <h2 className="section-title">
              I build AI that earns its place in the product.
            </h2>
            <div className="about-portrait card">
              <img src="/images/me.jpg" alt="Daniel Aboo" />
            </div>
          </div>
          <div className="about-right">
            <p className="lead reveal">
              I'm a prompt engineer and full-stack developer based in Poland. At
              LivePerson I design prompt architectures and autonomous agents for
              global brands — the kind that hold a real conversation and quietly
              do the work behind it.
            </p>
            <p className="about-body reveal" data-delay="1">
              My path was hands-on from the start: an early iOS role at Bank
              Millennium, a BSc in Artificial Intelligence at the University of
              Groningen, then years shipping iOS/tvOS, AR and React products at
              Sigbar and on the Odyssey Momentum metaverse platform.
            </p>
            <p className="about-body reveal" data-delay="2">
              From there I moved into consulting — automating operations and
              building customer-facing AI agents for companies like SteelProfil
              — then into prompt engineering proper at BrainGym.AI and Blue Owl,
              before joining LivePerson full-time.
            </p>
            <div className="about-stats reveal" data-delay="3">
              <div className="stat">
                <span className="num">7+</span>
                <span className="lbl">years shipping</span>
              </div>
              <div className="stat">
                <span className="num">2</span>
                <span className="lbl">languages — PL / EN</span>
              </div>
              <div className="stat">
                <span className="num">BSc</span>
                <span className="lbl">AI, Groningen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section-pad alt" id="capabilities">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">
              <span className="idx">02</span> — Capabilities
            </span>
            <h2 className="section-title">What I do</h2>
          </div>
          <div className="cap-grid">
            {capabilities.map((cap, i) => (
              <article
                className="cap-card card reveal"
                key={cap.num}
                data-delay={i > 0 ? String(i) : undefined}
              >
                <span className="cap-num">{cap.num}</span>
                <h3>{cap.title}</h3>
                <p>{cap.body}</p>
                <div className="tag-row">
                  {cap.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="section-pad" id="work">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">
              <span className="idx">03</span> — Selected work
            </span>
            <h2 className="section-title">Things I've built</h2>
          </div>
          <div className="work-list">
            {work.map((item) => (
              <Link className="work-row reveal" to="/cv" key={item.idx}>
                <span className="work-idx">{item.idx}</span>
                <div className="work-main">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="work-tags">
                  {item.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="work-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ASSISTANT TEASER */}
      <section className="section-pad alt" id="assistant-teaser">
        <div className="wrap">
          <div className="assistant-card card reveal">
            <div className="assistant-copy">
              <span className="kicker">
                <span className="idx">04</span> — Live demo
              </span>
              <h2 className="section-title">Ask my AI assistant anything.</h2>
              <p className="lead">
                A small taste of what I build. Trained on my background, it
                answers questions about my work — or passes a message straight to
                me.
              </p>
              <Link className="btn btn-primary" data-magnetic to="/assistant">
                Open the assistant <span className="arrow">→</span>
              </Link>
            </div>
            <div className="assistant-preview" aria-hidden="true">
              <div className="chat-bubble user">
                What has Daniel shipped with LLMs?
              </div>
              <div className="chat-bubble bot">
                <span className="bot-avatar">DA</span>
                <span>
                  Plenty — production agents at LivePerson, GPT learning
                  pipelines at BrainGym.AI, and a sales agent for SteelProfil.
                  Want specifics on any?
                </span>
              </div>
              <div className="chat-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PortfolioFooter variant="full" />
    </>
  );
};

export default HomePageLayout;

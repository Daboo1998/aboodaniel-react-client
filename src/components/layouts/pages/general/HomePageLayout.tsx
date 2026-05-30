import React, { useEffect, useRef } from 'react';
import useNavigation from '../../../../hooks/useNavigation';
import {
  HeroSection,
  HeroCanvasHost,
  HeroFade,
  HeroInner,
  StatusBadge,
  StatusDot,
  HeroName,
  HeroRole,
  HeroLead,
  HeroActions,
  PrimaryBtn,
  GhostBtn,
  BtnArrow,
  HeroScroll,
  ScrollLine,
  MarqueeStrip,
  MarqueeTrack,
  MarqueeSep,
  SectionPad,
  AltSection,
  Wrap,
  SectionKicker,
  KickerIdx,
  SectionTitle,
  AboutGrid,
  AboutLeft,
  AboutPortrait,
  AboutRight,
  LeadText,
  AboutBody,
  AboutStats,
  Stat,
  StatNum,
  StatLbl,
  SecHead,
  CapGrid,
  CapCard,
  CapNum,
  CapTagRow,
  Tag,
  WorkList,
  WorkRow,
  WorkIdx,
  WorkMain,
  WorkTags,
  WorkArrow,
  AssistantCard,
  AssistantCopy,
  AssistantPreview,
  ChatBubble,
  BotAvatar,
  ChatTyping,
  TypingDot,
} from './HomePageLayout.styled';

function useReveal() {
  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal-el'));
    if (!reveals.length) return;

    let ticking = false;
    let firstPass = true;

    function checkReveals() {
      ticking = false;
      const vh = window.innerHeight;
      for (let i = reveals.length - 1; i >= 0; i--) {
        const el = reveals[i];
        const top = el.getBoundingClientRect().top;
        if (firstPass && top < vh) {
          el.style.transition = 'none';
          el.classList.add('in');
          el.style.opacity = '1';
          el.style.transform = 'none';
          reveals.splice(i, 1);
        } else if (!firstPass && top < vh * 0.9) {
          el.classList.add('in');
          el.style.opacity = '1';
          el.style.transform = 'none';
          reveals.splice(i, 1);
        }
      }
      firstPass = false;
    }

    function onScrollResize() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkReveals);
      }
    }

    checkReveals();
    setTimeout(checkReveals, 300);
    window.addEventListener('scroll', onScrollResize, { passive: true });
    window.addEventListener('resize', onScrollResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScrollResize);
      window.removeEventListener('resize', onScrollResize);
    };
  }, []);
}

const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1;
    let dots: Array<{ x: number; y: number; ph: number }> = [];
    const GAP = 38;
    const mouse = { x: -9999, y: -9999, has: false };
    let t = 0;
    let animFrameId = 0;

    function getAccent() {
      return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || 'oklch(0.6 0.2 256)';
    }
    function getBase() {
      return getComputedStyle(document.documentElement).getPropertyValue('--border-2').trim() || '#ccc';
    }

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({ x: i * GAP, y: j * GAP, ph: Math.random() * Math.PI * 2 });
        }
      }
    }

    function frame() {
      t += 0.012;
      ctx.clearRect(0, 0, w, h);
      const ac = getAccent();
      const base = getBase();
      const R = 150;
      for (let k = 0; k < dots.length; k++) {
        const d = dots[k];
        let r = 0.9 + Math.sin(t + d.ph) * 0.35;
        let near = 0;
        if (mouse.has) {
          const dx = d.x - mouse.x, dy = d.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < R) near = 1 - dist / R;
        }
        if (near > 0.02) {
          ctx.fillStyle = ac;
          ctx.globalAlpha = 0.25 + near * 0.75;
          r = 0.9 + near * 2.6;
        } else {
          ctx.fillStyle = base;
          ctx.globalAlpha = 0.4;
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduce) animFrameId = requestAnimationFrame(frame);
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.has = true;
    };
    const onMouseLeave = () => { mouse.has = false; mouse.x = -9999; mouse.y = -9999; };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 150); };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onResize);

    resize();
    if (reduce) { frame(); } else { animFrameId = requestAnimationFrame(frame); }

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(resizeTimer);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <HeroCanvasHost ref={containerRef}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </HeroCanvasHost>
  );
};

const marqueeItems = [
  'LivePerson', 'Blue Owl', 'BrainGym.AI', 'Usprawniacze Firm',
  'Sigbar', 'Odyssey Momentum', 'Bank Millennium', 'Univ. of Groningen',
];

const capabilities = [
  {
    num: 'A1',
    title: 'AI Agent Development',
    desc: 'Prompt architectures and autonomous, tool-using agents that handle real customer conversations — designed, evaluated and shipped to production at LivePerson.',
    tags: ['Agents', 'Prompt design', 'Conversational AI'],
  },
  {
    num: 'A2',
    title: 'Machine Learning & NLP',
    desc: 'Grounded in AI fundamentals from Groningen — neural networks, computer vision, NLP — applied to making language models reliable, measurable and safe.',
    tags: ['LLMs', 'NLP', 'Evaluation'],
  },
  {
    num: 'A3',
    title: 'Front-End Engineering',
    desc: 'Fast, polished React interfaces — from token-gated social UI on Odyssey Momentum to high-performance Shopify storefronts with Outsmartly at Blue Owl.',
    tags: ['React', 'TypeScript', 'Module Federation'],
  },
  {
    num: 'A4',
    title: 'Process Automation',
    desc: 'Consulting work that removes manual toil — automating operations and embedding AI agents into the sales and support flows of real businesses.',
    tags: ['Automation', 'Integrations', 'Consulting'],
  },
];

const selectedWork = [
  { idx: '01', title: 'Conversational AI agents', desc: 'Prompt architectures & agents for global brands as Prompt Engineer II.', tags: ['LivePerson', '2024 — now'] },
  { idx: '02', title: 'AI-powered learning platform', desc: 'GPT prompt pipelines generating personalised learning at BrainGym.AI.', tags: ['BrainGym.AI', 'GPT'] },
  { idx: '03', title: 'Dynamic plugin system', desc: 'Module Federation + craco wrapper letting devs ship Momentum plugins with zero config.', tags: ['Module Federation', 'React'] },
  { idx: '04', title: 'SteelProfil sales agent', desc: 'Customer-facing AI agent giving instant quotations & company info.', tags: ['Usprawniacze', 'Agents'] },
  { idx: '05', title: 'Odyssey Momentum metaverse', desc: 'Social UI, Stage Mode & token-gated access; refactor to MobX.', tags: ['Sigbar', 'React · MobX'] },
  { idx: '06', title: 'Goodie — iOS loyalty platform', desc: 'Swift app for discounts & loyalty; where the clean-code habit started.', tags: ['Bank Millennium', 'Swift'] },
];

const HomePageLayout: React.FC = () => {
  const navigation = useNavigation();
  useReveal();

  return (
    <>
      {/* ---- HERO ---- */}
      <HeroSection>
        <HeroCanvas />
        <HeroFade />
        <Wrap>
          <HeroInner>
            <StatusBadge>
              <StatusDot />
              Available for select AI & product consulting
            </StatusBadge>
            <HeroName>Daniel&nbsp;Aboo</HeroName>
            <HeroRole>
              <span style={{ color: 'var(--accent)' }}>Prompt Engineer II</span> @ LivePerson — building AI agents & full-stack products.
            </HeroRole>
            <HeroLead>
              I design and ship conversational AI — prompt architectures, autonomous agents and
              the interfaces around them — that turn frontier models into measurable business outcomes.
            </HeroLead>
            <HeroActions>
              <PrimaryBtn onClick={() => navigation.navigateTo('/contact')}>
                Start a project <BtnArrow>→</BtnArrow>
              </PrimaryBtn>
              <GhostBtn onClick={() => navigation.navigateTo('/cv')}>
                View full CV
              </GhostBtn>
            </HeroActions>
          </HeroInner>
        </Wrap>
        <HeroScroll>
          <span>SCROLL</span>
          <ScrollLine />
        </HeroScroll>
      </HeroSection>

      {/* ---- MARQUEE ---- */}
      <MarqueeStrip aria-hidden="true">
        <MarqueeTrack>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            i % marqueeItems.length === 0 && i > 0 ? (
              <React.Fragment key={i}>
                <MarqueeSep>/</MarqueeSep>
                <span>{item}</span>
              </React.Fragment>
            ) : (
              <React.Fragment key={i}>
                {i > 0 && <MarqueeSep>/</MarqueeSep>}
                <span>{item}</span>
              </React.Fragment>
            )
          ))}
        </MarqueeTrack>
      </MarqueeStrip>

      {/* ---- ABOUT ---- */}
      <SectionPad id="about">
        <Wrap>
          <AboutGrid>
            <AboutLeft>
              <SectionKicker className="reveal-el">
                <KickerIdx>01</KickerIdx> — About
              </SectionKicker>
              <SectionTitle className="reveal-el" style={{ marginTop: '1.2rem', marginBottom: '2rem' }}>
                I build AI that earns its place in the product.
              </SectionTitle>
              <AboutPortrait className="reveal-el">
                <img src="/images/me.jpg" alt="Daniel Aboo" />
              </AboutPortrait>
            </AboutLeft>
            <AboutRight>
              <LeadText className="reveal-el">
                I'm a prompt engineer and full-stack developer based in Poland. At LivePerson I design
                prompt architectures and autonomous agents for global brands — the kind that hold a real
                conversation and quietly do the work behind it.
              </LeadText>
              <AboutBody className="reveal-el">
                My path was hands-on from the start: an early iOS role at Bank Millennium, a BSc in
                Artificial Intelligence at the University of Groningen, then years shipping iOS/tvOS, AR
                and React products at Sigbar and on the Odyssey Momentum metaverse platform.
              </AboutBody>
              <AboutBody className="reveal-el">
                From there I moved into consulting — automating operations and building customer-facing
                AI agents for companies like SteelProfil — then into prompt engineering proper at
                BrainGym.AI and Blue Owl, before joining LivePerson full-time.
              </AboutBody>
              <AboutStats className="reveal-el">
                <Stat>
                  <StatNum>7+</StatNum>
                  <StatLbl>years shipping</StatLbl>
                </Stat>
                <Stat>
                  <StatNum>2</StatNum>
                  <StatLbl>languages — PL / EN</StatLbl>
                </Stat>
                <Stat>
                  <StatNum>BSc</StatNum>
                  <StatLbl>AI, Groningen</StatLbl>
                </Stat>
              </AboutStats>
            </AboutRight>
          </AboutGrid>
        </Wrap>
      </SectionPad>

      {/* ---- CAPABILITIES ---- */}
      <AltSection id="capabilities">
        <Wrap>
          <SecHead>
            <SectionKicker className="reveal-el">
              <KickerIdx>02</KickerIdx> — Capabilities
            </SectionKicker>
            <SectionTitle className="reveal-el" style={{ marginTop: '1rem' }}>What I do</SectionTitle>
          </SecHead>
          <CapGrid>
            {capabilities.map((cap, i) => (
              <CapCard key={cap.num} className="reveal-el" style={{ transitionDelay: `${i * 0.08}s` }}>
                <CapNum>{cap.num}</CapNum>
                <h3 style={{ fontSize: '1.4rem', letterSpacing: '-0.02em', fontWeight: 600, color: 'var(--text)' }}>{cap.title}</h3>
                <p style={{ color: 'var(--text-2)', fontSize: '1rem', lineHeight: 1.6, flex: 1 }}>{cap.desc}</p>
                <CapTagRow>
                  {cap.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                </CapTagRow>
              </CapCard>
            ))}
          </CapGrid>
        </Wrap>
      </AltSection>

      {/* ---- SELECTED WORK ---- */}
      <SectionPad id="work">
        <Wrap>
          <SecHead>
            <SectionKicker className="reveal-el">
              <KickerIdx>03</KickerIdx> — Selected work
            </SectionKicker>
            <SectionTitle className="reveal-el" style={{ marginTop: '1rem' }}>Things I've built</SectionTitle>
          </SecHead>
          <WorkList>
            {selectedWork.map((item, i) => (
              <WorkRow
                key={item.idx}
                className="reveal-el"
                style={{ transitionDelay: `${i * 0.06}s` }}
                onClick={() => navigation.navigateTo('/cv')}
              >
                <WorkIdx>{item.idx}</WorkIdx>
                <WorkMain>
                  <h3 style={{ fontSize: 'clamp(1.3rem, 2.6vw, 1.9rem)', letterSpacing: '-0.02em', fontWeight: 600 }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.98rem', marginTop: '0.3rem' }}>{item.desc}</p>
                </WorkMain>
                <WorkTags>
                  {item.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                </WorkTags>
                <WorkArrow>→</WorkArrow>
              </WorkRow>
            ))}
          </WorkList>
        </Wrap>
      </SectionPad>

      {/* ---- ASSISTANT TEASER ---- */}
      <AltSection id="assistant-teaser">
        <Wrap>
          <AssistantCard className="reveal-el">
            <AssistantCopy>
              <SectionKicker>
                <KickerIdx>04</KickerIdx> — Live demo
              </SectionKicker>
              <SectionTitle style={{ marginTop: '1rem', marginBottom: '1.2rem' }}>
                Ask my AI assistant anything.
              </SectionTitle>
              <p style={{ color: 'var(--text-2)', fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', lineHeight: 1.55, maxWidth: '60ch', marginBottom: '2rem' }}>
                A small taste of what I build. Trained on my background, it answers questions about my work — or passes a message straight to me.
              </p>
              <PrimaryBtn onClick={() => navigation.navigateTo('/assistant')}>
                Open the assistant <BtnArrow>→</BtnArrow>
              </PrimaryBtn>
            </AssistantCopy>
            <AssistantPreview aria-hidden="true">
              <ChatBubble $type="user">What has Daniel shipped with LLMs?</ChatBubble>
              <ChatBubble $type="bot">
                <BotAvatar>DA</BotAvatar>
                <span>Plenty — production agents at LivePerson, GPT learning pipelines at BrainGym.AI, and a sales agent for SteelProfil. Want specifics on any?</span>
              </ChatBubble>
              <ChatTyping>
                <TypingDot />
                <TypingDot $delay="0.2s" />
                <TypingDot $delay="0.4s" />
              </ChatTyping>
            </AssistantPreview>
          </AssistantCard>
        </Wrap>
      </AltSection>
    </>
  );
};

export default HomePageLayout;

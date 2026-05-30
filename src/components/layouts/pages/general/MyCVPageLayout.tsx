import React, { useEffect, useState } from "react";
import database from "../../../../data/database";
import Experience from "../../../../data/experience";
import EducationItem from "../../../../data/EducationItem";
import SkillSet from "../../../../data/SkillSet";
import { useAuth } from "../../../../contexts/AuthContext";
import usePopup from "../../../../hooks/usePopup";
import useNavigation from "../../../../hooks/useNavigation";
import AddExperiencePopup from "../../../molecules/popups/experience/AddExperiencePopup";
import EditExperiencePopup from "../../../molecules/popups/experience/EditExperiencePopup";
import RemoveExperiencesPopup from "../../../molecules/popups/experience/RemoveExperiencesPopup";
import Button, { ButtonSize, ButtonType } from "../../../atoms/buttons and links/Button";

import {
  CVPageWrapper,
  CVHeader,
  CVKicker,
  CVKickerIdx,
  CVName,
  CVRole,
  CVActions,
  PrimaryBtn,
  GhostBtn,
  Divider,
  CVBody,
  CVLayout,
  CVMain,
  CVBlock,
  CVBlockTitle,
  CVBlockCount,
  CVSummary,
  Timeline,
  TimelineItem,
  TLMeta,
  TLNow,
  TLRole,
  TLAt,
  TLDesc,
  TLTags,
  Tag,
  EduItem,
  EduQ,
  EduPlace,
  EduYears,
  CVSide,
  SideCard,
  SidePhotoCard,
  SideHead,
  SideContact,
  ContactIco,
  SkillGroup,
  HobbyRow,
  LangRow,
  LangLvl,
  LangBar,
  LangFill,
  AdminControls,
} from "./MyCVPageLayout.styled";

const EmailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="3" y="5" width="18" height="14" rx="2"/>
    <path d="m3 7 9 6 9-6"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>
  </svg>
);
const LocationIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9s-2.04 1.38-2.04 2.8V21h-4z"/>
  </svg>
);

/* Static timeline (always shown, reflects actual CV) */
const staticExperiences = [
  {
    id: 'liveperson',
    current: true,
    meta: '2024 — Present · Remote',
    role: 'Prompt Engineer II',
    company: 'LivePerson',
    desc: 'Design and develop AI agents and prompt architectures for global brands. Build advanced conversational AI that enhances customer engagement, applying AI, machine learning and NLP to make language models reliable in production.',
    tags: ['Prompt Engineering', 'AI Agents', 'NLP', 'Conversational AI'],
  },
  {
    id: 'blueowl',
    current: false,
    meta: '2023 · Remote',
    role: 'Front-End Developer',
    company: 'Blue Owl',
    desc: 'Built fast, highly-optimised Shopify storefronts using React and Outsmartly, focused on performance and conversion for commerce clients.',
    tags: ['React', 'Outsmartly', 'Shopify'],
  },
  {
    id: 'braingym',
    current: false,
    meta: '2023 · Remote',
    role: 'Prompt Engineer',
    company: 'BrainGym.AI',
    desc: 'Worked on an AI-powered learning platform using GPT to generate personalised prompts for learners. Optimised prompt-engineering processes and algorithms to improve learning outcomes.',
    tags: ['GPT', 'Prompt Engineering', 'EdTech'],
  },
  {
    id: 'usprawniacze',
    current: false,
    meta: '2022 — 2023 · Poland',
    role: 'Software & Automation Consultant',
    company: 'Usprawniacze Firm',
    desc: 'Helped companies — Planeta Soni, ZIO-MAX, SteelProfil — improve operations through automation and software. Built a customer-facing AI agent for SteelProfil delivering instant quotations and company information.',
    tags: ['Automation', 'AI Agents', 'Consulting'],
  },
  {
    id: 'sigbar',
    current: false,
    meta: '2019 — 2021 · Groningen / Remote',
    role: 'Software Developer',
    company: 'Sigbar',
    desc: 'Shipped across platforms while studying: an iOS/tvOS narrowcasting system for St. Jansdal Hospital, AR shop apps (iOS + Node.js), and React web. On Odyssey Momentum: Social UI, Stage Mode, Token-Gated Access and a MobX refactor — plus a dynamic plugin system built on Module Federation.',
    tags: ['SwiftUI', 'tvOS', 'React', 'MobX', 'Module Federation'],
  },
  {
    id: 'bank',
    current: false,
    meta: '2018 — 2019 · Warsaw',
    role: 'iOS Developer',
    company: 'Bank Millennium',
    desc: 'Started my career developing iOS apps including Goodie, a discount and loyalty platform. Learned clean-code practices, API integration and professional teamwork in a banking environment — in Swift.',
    tags: ['Swift', 'iOS', 'Clean Code'],
  },
];

const MyCVPageLayout: React.FC = () => {
  const [, setSkillSets] = useState<SkillSet[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const auth = useAuth();
  const navigation = useNavigation();
  const [isAddExperiencePopupShown, showAddExperiencePopup, hideAddExperiencePopup] = usePopup();
  const [isEditExperiencePopupShown, showEditExperiencePopup, hideEditExperiencePopup] = usePopup();
  const [isRemoveExperiencesPopupShown, showRemoveExperiencesPopup, hideRemoveExperiencesPopup] = usePopup();
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onEditButtonClick = (experience: Experience) => {
    setSelectedExperience(experience);
    window.document.body.style.overflow = "hidden";
    showEditExperiencePopup();
  };

  const onAddExperienceClose = (addedExperience?: Experience) => {
    hideAddExperiencePopup();
    if (addedExperience) {
      const updated = [...experiences, addedExperience].sort((a, b) => b.importance - a.importance);
      setExperiences(updated);
    }
    window.document.body.style.overflow = "unset";
  };

  const onEditExperienceClose = (updatedExperience?: Experience) => {
    hideEditExperiencePopup();
    setSelectedExperience(null);
    if (updatedExperience) {
      const updated = experiences.map(exp =>
        exp.id === updatedExperience.id ? updatedExperience : exp
      ).sort((a, b) => b.importance - a.importance);
      setExperiences(updated);
    }
    window.document.body.style.overflow = "unset";
  };

  const onRemoveExperiencesClose = (remainingExperiences: Experience[]) => {
    setExperiences(remainingExperiences);
    hideRemoveExperiencesPopup();
    window.document.body.style.overflow = "unset";
  };

  useEffect(() => {
    database.skillSets.getAll().then(setSkillSets);
    database.experiences.getAll({ field: "importance", direction: "desc" }).then(setExperiences);
    database.education.getAll({ field: "endYear", direction: "desc" }).then(setEducation);
  }, []);

  return (
    <CVPageWrapper>
      {/* Admin popups */}
      <AddExperiencePopup isPopupShown={isAddExperiencePopupShown} onClose={onAddExperienceClose} />
      <EditExperiencePopup isPopupShown={isEditExperiencePopupShown} experience={selectedExperience} onClose={onEditExperienceClose} />
      <RemoveExperiencesPopup experiences={experiences} onClose={onRemoveExperiencesClose} isPopupShown={isRemoveExperiencesPopupShown} />

      {/* Header */}
      <CVHeader>
        <CVKicker><CVKickerIdx>CV</CVKickerIdx> — Curriculum Vitae</CVKicker>
        <CVName>Daniel Richard Aboo</CVName>
        <CVRole>Full-Stack Developer &amp; Prompt Engineer · Building production AI.</CVRole>
        <CVActions>
          <PrimaryBtn onClick={() => window.print()}>
            Download / Print PDF ↓
          </PrimaryBtn>
          <GhostBtn onClick={() => navigation.navigateTo('/contact')}>
            Contact me
          </GhostBtn>
        </CVActions>
      </CVHeader>

      <Divider />

      <CVBody>
        <CVLayout>
          {/* Main */}
          <CVMain>
            <CVBlock>
              <CVBlockTitle><h2>Profile</h2></CVBlockTitle>
              <CVSummary>
                I've always looked to the future — building solutions with technology that change how we
                live day to day. My mission is to innovate while keeping the work understandable and
                collaborative. Creativity, drive and determination define how I work; I listen carefully to
                the people I build with and find the path where everyone wins.
              </CVSummary>
            </CVBlock>

            <CVBlock>
              <CVBlockTitle>
                <h2>Experience</h2>
                <CVBlockCount>0{staticExperiences.length}</CVBlockCount>
              </CVBlockTitle>

              {auth.isOwner && (
                <AdminControls>
                  <Button size={ButtonSize.small} action={() => { window.document.body.style.overflow = "hidden"; showAddExperiencePopup(); }} label="Add Experience" type={ButtonType.constructive} />
                  <Button size={ButtonSize.small} label="Remove Experiences" action={() => { window.document.body.style.overflow = "hidden"; showRemoveExperiencesPopup(); }} type={ButtonType.destructive} />
                </AdminControls>
              )}

              <Timeline>
                {staticExperiences.map(exp => (
                  <TimelineItem key={exp.id} $current={exp.current}>
                    <TLMeta>
                      {exp.current && <TLNow>● Now</TLNow>}
                      {exp.meta}
                    </TLMeta>
                    <TLRole>
                      {exp.role} <TLAt>· {exp.company}</TLAt>
                    </TLRole>
                    <TLDesc>{exp.desc}</TLDesc>
                    <TLTags>
                      {exp.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                    </TLTags>
                  </TimelineItem>
                ))}
              </Timeline>
            </CVBlock>

            <CVBlock>
              <CVBlockTitle><h2>Education</h2></CVBlockTitle>
              <div>
                <EduItem>
                  <EduQ>BSc, Artificial Intelligence</EduQ>
                  <EduPlace>University of Groningen — Netherlands</EduPlace>
                  <EduYears>2019 — 2022 · Computer vision · Neural networks · Robotics</EduYears>
                </EduItem>
                <EduItem>
                  <EduQ>Machine Learning Specialization</EduQ>
                  <EduPlace>Coursera</EduPlace>
                  <EduYears>Supplementary · Applied ML &amp; model fundamentals</EduYears>
                </EduItem>
                {education.map(item => (
                  <EduItem key={item.qualification}>
                    <EduQ>{item.qualification}</EduQ>
                    <EduPlace>{item.place}</EduPlace>
                    <EduYears>{item.startYear} — {item.endYear}</EduYears>
                  </EduItem>
                ))}
              </div>
            </CVBlock>
          </CVMain>

          {/* Sidebar */}
          <CVSide>
            <SidePhotoCard>
              <img src="/images/me.jpg" alt="Daniel Aboo" />
            </SidePhotoCard>

            <SideCard>
              <SideHead>Contact</SideHead>
              <SideContact>
                <a href="mailto:me@aboodaniel.pl">
                  <ContactIco><EmailIcon /></ContactIco>
                  me@aboodaniel.pl
                </a>
                <a href="tel:+48601951169">
                  <ContactIco><PhoneIcon /></ContactIco>
                  +48 601 951 169
                </a>
                <span>
                  <ContactIco><LocationIcon /></ContactIco>
                  Poland
                </span>
                <a href="https://www.linkedin.com/in/danielaboo" target="_blank" rel="noopener noreferrer">
                  <ContactIco><LinkedInIcon /></ContactIco>
                  LinkedIn
                </a>
              </SideContact>
            </SideCard>

            <SideCard>
              <SideHead>Skills</SideHead>
              <SkillGroup>
                <h4>AI &amp; Machine Learning</h4>
                <HobbyRow>
                  {['Prompt Engineering', 'LLMs / GPT', 'AI Agents', 'NLP', 'Neural Networks', 'Computer Vision'].map(s => <Tag key={s}>{s}</Tag>)}
                </HobbyRow>
              </SkillGroup>
              <SkillGroup>
                <h4>Front-End</h4>
                <HobbyRow>
                  {['React', 'TypeScript', 'MobX', 'Module Federation', 'Shopify'].map(s => <Tag key={s}>{s}</Tag>)}
                </HobbyRow>
              </SkillGroup>
              <SkillGroup>
                <h4>Mobile</h4>
                <HobbyRow>
                  {['Swift', 'SwiftUI', 'iOS / tvOS', 'AR'].map(s => <Tag key={s}>{s}</Tag>)}
                </HobbyRow>
              </SkillGroup>
              <SkillGroup>
                <h4>Backend &amp; Tools</h4>
                <HobbyRow>
                  {['Node.js', 'Firebase', 'REST APIs', 'Git', 'Agile'].map(s => <Tag key={s}>{s}</Tag>)}
                </HobbyRow>
              </SkillGroup>
            </SideCard>

            <SideCard>
              <SideHead>Languages</SideHead>
              <LangRow>
                <span>Polish</span><LangLvl>Native</LangLvl>
              </LangRow>
              <LangBar><LangFill $width="100%" /></LangBar>
              <div style={{ height: '0.9rem' }} />
              <LangRow>
                <span>English</span><LangLvl>Fluent · C1</LangLvl>
              </LangRow>
              <LangBar><LangFill $width="92%" /></LangBar>
            </SideCard>

            <SideCard>
              <SideHead>Beyond Code</SideHead>
              <HobbyRow>
                {['Programming', 'Piano', 'Traveling', 'Photography'].map(h => <Tag key={h}>{h}</Tag>)}
              </HobbyRow>
            </SideCard>
          </CVSide>
        </CVLayout>
      </CVBody>
    </CVPageWrapper>
  );
};

export default MyCVPageLayout;

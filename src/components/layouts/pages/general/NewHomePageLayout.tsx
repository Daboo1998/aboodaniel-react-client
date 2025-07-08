import React from "react";
import PageLayout from "../PageLayout";
import {
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  HeroDescription,
  Section,
  SectionTitle,
  SectionContent,
  AboutGrid,
  AboutText,
  AboutHighlight,
  SkillsGrid,
  SkillCard,
  SkillIcon,
  SkillTitle,
  SkillDescription,
  ProjectsGrid,
  ProjectCard,
  ProjectTitle,
  ProjectDescription,
  ProjectTech,
  PersonalSection,
  PersonalContent,
  PersonalQuote,
  ConnectSection,
  ConnectTitle,
  ConnectDescription,
  GradientOrb,
  FloatingElement
} from "./NewHomePageLayout.styled";

const NewHomePageLayout: React.FC = () => {
  return (
    <PageLayout title="New Home">
      <GradientOrb />
      <FloatingElement />
      
      <HeroSection>
        <HeroTitle>Daniel Aboo</HeroTitle>
        <HeroSubtitle>Prompt Engineer II at LivePerson</HeroSubtitle>
        <HeroDescription>
          Designing and developing AI agents and prompt architectures that enhance customer engagement through advanced conversational AI solutions.
        </HeroDescription>
      </HeroSection>

      <Section>
        <SectionTitle>About Me</SectionTitle>
        <SectionContent>
          <AboutGrid>
            <AboutText>
              Welcome to my digital space! I'm a Prompt Engineer II at LivePerson, where I design and develop 
              AI agents and prompt architectures for various companies. My expertise in artificial intelligence, 
              machine learning, and natural language processing helps me build advanced conversational AI solutions 
              that enhance customer engagement.
            </AboutText>
            <AboutText>
              My journey began with a BSc in Artificial Intelligence from the University of Groningen, studying 
              AI fundamentals including computer vision, neural networks, and robotics. I've worked across diverse 
              roles - from frontend development at Blue Owl (Shopify headless commerce) to AI engineering at 
              BrainGym.AI, always passionate about leveraging AI to transform everyday life.
            </AboutText>
            <AboutHighlight>
              "Passionate about leveraging AI to transform everyday life, I'm always eager to learn and explore emerging technologies."
            </AboutHighlight>
          </AboutGrid>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>What I Do</SectionTitle>
        <SectionContent>
          <SkillsGrid>
            <SkillCard>
              <SkillIcon>🤖</SkillIcon>
              <SkillTitle>AI Agent Development</SkillTitle>
              <SkillDescription>
                Designing and developing AI agents and prompt architectures for various companies at LivePerson. 
                Creating conversational AI solutions that enhance customer engagement and experience.
              </SkillDescription>
            </SkillCard>
            
            <SkillCard>
              <SkillIcon>🧠</SkillIcon>
              <SkillTitle>Machine Learning & NLP</SkillTitle>
              <SkillDescription>
                Expertise in artificial intelligence, machine learning, and natural language processing. 
                Applied knowledge from University of Groningen AI studies including neural networks and computer vision.
              </SkillDescription>
            </SkillCard>
            
            <SkillCard>
              <SkillIcon>💻</SkillIcon>
              <SkillTitle>Frontend Development</SkillTitle>
              <SkillDescription>
                Experience building fast and optimized Shopify websites using React and Outsmartly at Blue Owl. 
                Contributed to Odyssey Momentum with social UI, stage mode, and token-gated access features.
              </SkillDescription>
            </SkillCard>
            
            <SkillCard>
              <SkillIcon>⚡</SkillIcon>
              <SkillTitle>Process Automation</SkillTitle>
              <SkillDescription>
                Automated repetitive tasks and developed AI agents for clients at Usprawniacze Firm. 
                Optimized prompt engineering processes and algorithms for AI-powered learning platforms at BrainGym.AI.
              </SkillDescription>
            </SkillCard>
          </SkillsGrid>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Featured Work</SectionTitle>
        <SectionContent>
          <ProjectsGrid>
            <ProjectCard>
              <ProjectTitle>AI Agent Architecture at LivePerson</ProjectTitle>
              <ProjectDescription>
                Design and develop AI agents and prompt architectures for various companies as a Prompt Engineer II. 
                Build advanced conversational AI solutions that enhance customer engagement using cutting-edge 
                artificial intelligence, machine learning, and natural language processing.
              </ProjectDescription>
              <ProjectTech>AI Agents • Prompt Engineering • NLP • Conversational AI • GPT</ProjectTech>
            </ProjectCard>
            
            <ProjectCard>
              <ProjectTitle>AI-Powered Learning Platform - BrainGym.AI</ProjectTitle>
              <ProjectDescription>
                Worked as a Prompt Engineer on an AI-powered learning platform that used GPT to generate 
                personalized prompts for learners. Optimized prompt engineering processes and algorithms 
                to enhance learning experiences and outcomes.
              </ProjectDescription>
              <ProjectTech>GPT • Prompt Engineering • AI/ML • Learning Platforms • Optimization</ProjectTech>
            </ProjectCard>
            
            <ProjectCard>
              <ProjectTitle>Shopify Headless Commerce - Blue Owl</ProjectTitle>
              <ProjectDescription>
                Built fast and optimized Shopify websites using React and Outsmartly as a Frontend Web Developer. 
                Contributed to Odyssey Momentum, developing key features including social UI, stage mode, 
                and token-gated access using MobX and styled-components.
              </ProjectDescription>
              <ProjectTech>React • Shopify • Outsmartly • MobX • Styled-Components • Testing</ProjectTech>
            </ProjectCard>
          </ProjectsGrid>
        </SectionContent>
      </Section>

      <PersonalSection>
        <SectionTitle>Beyond Code</SectionTitle>
        <PersonalContent>
          <AboutText>
            My journey from studying AI fundamentals at the University of Groningen to working with cutting-edge 
            conversational AI at LivePerson has been incredibly fulfilling. The combination of computer vision, 
            neural networks, and robotics studies with real-world prompt engineering creates a unique perspective 
            on how AI can transform everyday experiences.
          </AboutText>
          <AboutText>
            Fluent in both Polish and English, I bring a multilingual perspective to AI development that helps 
            create more inclusive and globally accessible solutions. I'm always eager to learn and explore 
            emerging technologies, completing additional specializations like Machine Learning on Coursera to 
            stay at the forefront of AI innovation.
          </AboutText>
          <PersonalQuote>
            "Passionate about leveraging AI to transform everyday life, one conversation at a time."
          </PersonalQuote>
        </PersonalContent>
      </PersonalSection>

      <ConnectSection>
        <ConnectTitle>Let's Build Something Amazing</ConnectTitle>
        <ConnectDescription>
          Whether you have an AI project in mind, need prompt engineering consultation, or just want to chat about 
          the latest in conversational AI and machine learning, I'd love to connect. Every great innovation starts with a conversation.
        </ConnectDescription>
      </ConnectSection>
    </PageLayout>
  );
};

export default NewHomePageLayout;
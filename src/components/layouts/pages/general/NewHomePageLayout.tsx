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
        <HeroSubtitle>Prompt Engineer at Olive Person</HeroSubtitle>
        <HeroDescription>
          Bridging the gap between human creativity and AI potential through thoughtful prompt engineering and technical expertise.
        </HeroDescription>
      </HeroSection>

      <Section>
        <SectionTitle>About Me</SectionTitle>
        <SectionContent>
          <AboutGrid>
            <AboutText>
              Welcome to my digital space! I'm a prompt engineer at Olive Person who transitioned from 
              full-stack development into the fascinating world of AI and language models. I believe in 
              the power of well-crafted prompts to unlock AI's potential and create meaningful solutions.
            </AboutText>
            <AboutText>
              My journey began in full-stack development with React, TypeScript, Node.js, and modern web 
              technologies. This technical foundation now empowers me to approach prompt engineering with 
              a deep understanding of how systems work, enabling me to design more effective AI interactions.
            </AboutText>
            <AboutHighlight>
              "Prompts are the bridge between human intention and AI capability – every word matters in crafting that connection."
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
              <SkillTitle>Prompt Engineering</SkillTitle>
              <SkillDescription>
                Designing and optimizing prompts for various AI models to achieve precise, reliable outputs. 
                I specialize in crafting instructions that maximize model performance and user satisfaction.
              </SkillDescription>
            </SkillCard>
            
            <SkillCard>
              <SkillIcon>🔗</SkillIcon>
              <SkillTitle>AI Integration</SkillTitle>
              <SkillDescription>
                Building seamless connections between AI capabilities and real-world applications. 
                My full-stack background enables me to implement AI solutions end-to-end.
              </SkillDescription>
            </SkillCard>
            
            <SkillCard>
              <SkillIcon>🚀</SkillIcon>
              <SkillTitle>Full-Stack Development</SkillTitle>
              <SkillDescription>
                Strong foundation in React, TypeScript, Node.js, and modern web technologies. 
                This technical background informs my approach to AI system design and implementation.
              </SkillDescription>
            </SkillCard>
            
            <SkillCard>
              <SkillIcon>�</SkillIcon>
              <SkillTitle>AI Strategy & Analysis</SkillTitle>
              <SkillDescription>
                Analyzing AI model behavior, optimizing performance, and developing strategies for 
                effective human-AI collaboration in various business contexts.
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
              <ProjectTitle>AI Conversation Optimization Framework</ProjectTitle>
              <ProjectDescription>
                Developed a comprehensive prompt engineering framework for optimizing AI conversations at Olive Person. 
                Created standardized templates and testing methodologies that improved response quality by 40% 
                across various use cases.
              </ProjectDescription>
              <ProjectTech>GPT Models • Prompt Templates • Testing Frameworks • Analytics</ProjectTech>
            </ProjectCard>
            
            <ProjectCard>
              <ProjectTitle>Full-Stack Web Applications</ProjectTitle>
              <ProjectDescription>
                Built multiple enterprise-grade web applications during my full-stack development career. 
                Focused on scalable architectures, responsive design, and seamless user experiences using 
                modern technologies and best practices.
              </ProjectDescription>
              <ProjectTech>React • TypeScript • Node.js • PostgreSQL • AWS</ProjectTech>
            </ProjectCard>
            
            <ProjectCard>
              <ProjectTitle>AI-Human Collaboration Tools</ProjectTitle>
              <ProjectDescription>
                Designed and implemented tools that enhance human-AI collaboration workflows. 
                Combined technical development skills with prompt engineering expertise to create 
                intuitive interfaces for AI-powered business processes.
              </ProjectDescription>
              <ProjectTech>AI APIs • React • Prompt Engineering • UX Design</ProjectTech>
            </ProjectCard>
          </ProjectsGrid>
        </SectionContent>
      </Section>

      <PersonalSection>
        <SectionTitle>Beyond Code</SectionTitle>
        <PersonalContent>
          <AboutText>
            My transition from full-stack development to prompt engineering has been one of the most rewarding 
            career moves I've made. It combines my love for technical precision with the art of communication, 
            allowing me to explore how language shapes AI behavior and capabilities.
          </AboutText>
          <AboutText>
            I'm fascinated by the evolving relationship between humans and AI systems. When I'm not designing 
            prompts, I enjoy reading about cognitive science, linguistics, and the philosophy of artificial 
            intelligence. These interests directly inform my approach to creating more intuitive AI interactions.
          </AboutText>
          <PersonalQuote>
            "The most powerful AI interactions happen when technical precision meets human understanding."
          </PersonalQuote>
        </PersonalContent>
      </PersonalSection>

      <ConnectSection>
        <ConnectTitle>Let's Build Something Amazing</ConnectTitle>
        <ConnectDescription>
          Whether you have a project in mind, need technical consultation, or just want to chat about 
          the latest in web development, I'd love to connect. Every great project starts with a conversation.
        </ConnectDescription>
      </ConnectSection>
    </PageLayout>
  );
};

export default NewHomePageLayout;
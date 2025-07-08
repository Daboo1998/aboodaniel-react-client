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
        <HeroTitle>Daniel Abou</HeroTitle>
        <HeroSubtitle>Full-Stack Developer & Digital Craftsman</HeroSubtitle>
        <HeroDescription>
          Transforming ideas into elegant digital experiences through code, creativity, and continuous learning.
        </HeroDescription>
      </HeroSection>

      <Section>
        <SectionTitle>About Me</SectionTitle>
        <SectionContent>
          <AboutGrid>
            <AboutText>
              Welcome to my digital space! I'm a passionate developer who believes in the power of 
              technology to solve real-world problems. With expertise spanning both frontend and backend 
              development, I craft solutions that are not only functional but also beautiful and intuitive.
            </AboutText>
            <AboutText>
              My journey in tech started with curiosity and has evolved into a deep love for creating 
              seamless user experiences. I specialize in React, TypeScript, Node.js, and modern web 
              technologies, always staying updated with the latest trends and best practices.
            </AboutText>
            <AboutHighlight>
              "Code is poetry written in logic, and every project is a new verse in the digital symphony."
            </AboutHighlight>
          </AboutGrid>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>What I Do</SectionTitle>
        <SectionContent>
          <SkillsGrid>
            <SkillCard>
              <SkillIcon>🚀</SkillIcon>
              <SkillTitle>Frontend Development</SkillTitle>
              <SkillDescription>
                Crafting responsive, interactive user interfaces with React, TypeScript, and modern CSS. 
                I focus on performance, accessibility, and pixel-perfect implementations.
              </SkillDescription>
            </SkillCard>
            
            <SkillCard>
              <SkillIcon>⚡</SkillIcon>
              <SkillTitle>Backend Architecture</SkillTitle>
              <SkillDescription>
                Building robust APIs and scalable backend systems. From database design to cloud 
                deployment, I ensure your application can grow with your business.
              </SkillDescription>
            </SkillCard>
            
            <SkillCard>
              <SkillIcon>🎨</SkillIcon>
              <SkillTitle>UI/UX Design</SkillTitle>
              <SkillDescription>
                Designing intuitive user experiences that delight and engage. I believe great 
                software starts with understanding user needs and crafting elegant solutions.
              </SkillDescription>
            </SkillCard>
            
            <SkillCard>
              <SkillIcon>🔧</SkillIcon>
              <SkillTitle>DevOps & Optimization</SkillTitle>
              <SkillDescription>
                Streamlining development workflows and optimizing application performance. 
                From CI/CD pipelines to monitoring, I ensure smooth sailing from code to production.
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
              <ProjectTitle>AI-Powered Assistant Platform</ProjectTitle>
              <ProjectDescription>
                A sophisticated chatbot platform leveraging natural language processing to provide 
                intelligent responses. Built with React, Node.js, and integrated with modern AI APIs 
                for enhanced user interactions.
              </ProjectDescription>
              <ProjectTech>React • TypeScript • Node.js • AI/ML • WebSocket</ProjectTech>
            </ProjectCard>
            
            <ProjectCard>
              <ProjectTitle>Enterprise Dashboard Suite</ProjectTitle>
              <ProjectDescription>
                Comprehensive analytics dashboard for enterprise clients featuring real-time data 
                visualization, custom reporting, and role-based access control. Handles thousands 
                of concurrent users with seamless performance.
              </ProjectDescription>
              <ProjectTech>React • D3.js • Firebase • Docker • Redis</ProjectTech>
            </ProjectCard>
            
            <ProjectCard>
              <ProjectTitle>Creative Portfolio Engine</ProjectTitle>
              <ProjectDescription>
                A dynamic portfolio management system for creative professionals. Features drag-and-drop 
                portfolio building, client collaboration tools, and integrated e-commerce capabilities 
                for selling digital artwork.
              </ProjectDescription>
              <ProjectTech>Next.js • Prisma • Stripe • AWS • GraphQL</ProjectTech>
            </ProjectCard>
          </ProjectsGrid>
        </SectionContent>
      </Section>

      <PersonalSection>
        <SectionTitle>Beyond Code</SectionTitle>
        <PersonalContent>
          <AboutText>
            When I'm not crafting code, you'll find me exploring the intersection of technology and creativity. 
            I'm passionate about photography, capturing moments that tell stories, and I believe this eye for 
            composition translates beautifully into interface design.
          </AboutText>
          <AboutText>
            I'm also an avid reader of science fiction and philosophy, always seeking new perspectives that 
            challenge conventional thinking. These diverse interests fuel my approach to problem-solving, 
            bringing fresh ideas to every project I work on.
          </AboutText>
          <PersonalQuote>
            "The best solutions emerge when technical expertise meets human empathy and creative vision."
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
import styled, { keyframes } from "styled-components";
import { theme } from "../../../../styles/theme";

// Enhanced Animations for Realistic Glass Effects (No Rotation)
const float = keyframes`
  0%, 100% { 
    transform: translateY(0px) scale(1);
    filter: blur(20px) brightness(1);
  }
  33% { 
    transform: translateY(-20px) scale(1.02);
    filter: blur(25px) brightness(1.1);
  }
  66% { 
    transform: translateY(-10px) scale(0.98);
    filter: blur(18px) brightness(0.95);
  }
`;

const pulse = keyframes`
  0%, 100% { 
    opacity: 0.7; 
    transform: scale(1);
    filter: blur(40px) brightness(1);
  }
  50% { 
    opacity: 1; 
    transform: scale(1.05);
    filter: blur(45px) brightness(1.2);
  }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// New Realistic Glass Effect Animations (No Rotation)
const caustics = keyframes`
  0%, 100% { 
    transform: translateX(0px) translateY(0px);
    opacity: 0.3;
  }
  25% { 
    transform: translateX(10px) translateY(-5px);
    opacity: 0.6;
  }
  50% { 
    transform: translateX(-5px) translateY(10px);
    opacity: 0.4;
  }
  75% { 
    transform: translateX(-10px) translateY(-5px);
    opacity: 0.7;
  }
`;

const fresnel = keyframes`
  0%, 100% { 
    opacity: 0.1;
    transform: scale(1);
  }
  50% { 
    opacity: 0.3;
    transform: scale(1.1);
  }
`;

const refraction = keyframes`
  0%, 100% { 
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
    filter: blur(0px);
  }
  25% { 
    transform: perspective(1000px) rotateX(2deg) rotateY(1deg);
    filter: blur(1px);
  }
  50% { 
    transform: perspective(1000px) rotateX(-1deg) rotateY(-2deg);
    filter: blur(0.5px);
  }
  75% { 
    transform: perspective(1000px) rotateX(1deg) rotateY(2deg);
    filter: blur(1.5px);
  }
`;

// Enhanced Background Elements with Realistic Glass Effects
export const GradientOrb = styled.div`
  position: fixed;
  top: -50%;
  right: -20%;
  width: 800px;
  height: 800px;

  /* Static glass orb without rotation */
  background: radial-gradient(
      circle at 30% 30%,
      ${theme.colors.blue[400]}40,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 70%,
      ${theme.colors.primary[400]}30,
      transparent 50%
    ),
    radial-gradient(
      circle at 50% 50%,
      ${theme.colors.green[400]}25,
      transparent 60%
    );

  border-radius: 50%;
  filter: blur(40px) brightness(1.1) contrast(1.2);
  z-index: -1;

  /* Static caustics effect layer */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: conic-gradient(
      from 0deg at 50% 50%,
      transparent 0deg,
      rgba(255, 255, 255, 0.1) 90deg,
      transparent 180deg,
      rgba(255, 255, 255, 0.05) 270deg,
      transparent 360deg
    );
    border-radius: 50%;
    mix-blend-mode: overlay;
  }

  /* Static fresnel reflection layer */
  &::after {
    content: "";
    position: absolute;
    top: 10%;
    left: 10%;
    width: 30%;
    height: 30%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.4) 0%,
      transparent 70%
    );
    border-radius: 50%;
    mix-blend-mode: screen;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    width: 600px;
    height: 600px;
    top: -40%;
    right: -30%;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 400px;
    height: 400px;
    top: -20%;
    right: -40%;
  }
`;

export const FloatingElement = styled.div`
  position: fixed;
  bottom: 10%;
  left: -10%;
  width: 200px;
  height: 200px;

  /* Static liquid glass background with organic shape */
  background: radial-gradient(
      ellipse at 30% 30%,
      ${theme.colors.primary[300]}50,
      transparent 60%
    ),
    radial-gradient(
      ellipse at 70% 70%,
      ${theme.colors.blue[300]}40,
      transparent 50%
    );

  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  filter: blur(20px) brightness(1.05) saturate(1.2);
  z-index: -1;

  /* Static refraction distortion layer */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: conic-gradient(
      from 45deg at 50% 50%,
      transparent 0deg,
      rgba(255, 255, 255, 0.1) 45deg,
      transparent 90deg,
      rgba(255, 255, 255, 0.05) 135deg,
      transparent 180deg,
      rgba(255, 255, 255, 0.08) 225deg,
      transparent 270deg,
      rgba(255, 255, 255, 0.03) 315deg,
      transparent 360deg
    );
    border-radius: inherit;
    mix-blend-mode: soft-light;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 150px;
    height: 150px;
  }
`;

// Enhanced Natural Glass Container Component with Rainbow Refraction
export const GlassContainer = styled.div<{ $intensity?: number }>`
  position: relative;
  padding: ${theme.spacing[10]};
  background: rgba(
    255,
    255,
    255,
    ${(props) => (props.$intensity ? props.$intensity * 0.1 : 0.1)}
  );
  backdrop-filter: blur(
    ${(props) => (props.$intensity ? props.$intensity * 8 : 8)}px
  );
  -webkit-backdrop-filter: blur(
    ${(props) => (props.$intensity ? props.$intensity * 8 : 8)}px
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 28px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.08),
    inset 0 0 40px rgba(0, 0, 0, 0.04);

  /* Enhanced natural refraction with subtle edge rainbow */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      /* Primary refraction layer */ linear-gradient(
        135deg,
        transparent 0%,
        rgba(255, 255, 255, 0.1) 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.05) 75%,
        transparent 100%
      ),
      /* Very subtle rainbow dispersion only at extreme edges */
        linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 0, 0, 0.008) 2%,
          rgba(255, 165, 0, 0.008) 3%,
          rgba(255, 255, 0, 0.008) 4%,
          rgba(0, 255, 0, 0.008) 5%,
          rgba(0, 255, 255, 0.008) 6%,
          rgba(0, 0, 255, 0.008) 7%,
          rgba(238, 130, 238, 0.008) 8%,
          transparent 10%,
          transparent 90%,
          rgba(238, 130, 238, 0.008) 92%,
          rgba(0, 0, 255, 0.008) 93%,
          rgba(0, 255, 255, 0.008) 94%,
          rgba(0, 255, 0, 0.008) 95%,
          rgba(255, 255, 0, 0.008) 96%,
          rgba(255, 165, 0, 0.008) 97%,
          rgba(255, 0, 0, 0.008) 98%,
          transparent 100%
        );
    border-radius: inherit;
    pointer-events: none;
  }

  /* Enhanced caustics with chromatic aberration */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      /* Primary caustics */ radial-gradient(
        circle at 20% 20%,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 80%,
        rgba(255, 255, 255, 0.05) 0%,
        transparent 50%
      ),
      /* Chromatic aberration caustics */
        radial-gradient(
          circle at 25% 25%,
          rgba(255, 0, 0, 0.04) 0%,
          transparent 40%
        ),
      radial-gradient(
        circle at 75% 75%,
        rgba(0, 0, 255, 0.04) 0%,
        transparent 40%
      ),
      radial-gradient(
        circle at 30% 70%,
        rgba(0, 255, 0, 0.03) 0%,
        transparent 35%
      ),
      radial-gradient(
        circle at 70% 30%,
        rgba(255, 255, 0, 0.03) 0%,
        transparent 35%
      );
    border-radius: inherit;
    mix-blend-mode: overlay;
    pointer-events: none;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(
      0,
      0,
      0,
      ${(props) => (props.$intensity ? props.$intensity * 0.2 : 0.2)}
    );
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 25px rgba(0, 0, 0, 0.15),
      inset 0 0 50px rgba(0, 0, 0, 0.08);
  }
`;

// Enhanced Hero Section with Glass Morphism
export const HeroSection = styled.section`
  text-align: center;
  padding: ${theme.spacing[20]} 0 ${theme.spacing[32]};
  position: relative;

  /* Layered glass background */
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 75%,
    transparent 100%
  );

  /* Static refraction layer */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: conic-gradient(
      from 0deg at 50% 50%,
      transparent 0deg,
      rgba(255, 255, 255, 0.02) 90deg,
      transparent 180deg,
      rgba(255, 255, 255, 0.01) 270deg,
      transparent 360deg
    );
    pointer-events: none;
  }

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(0, 0, 0, 0.1) 25%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.1) 75%,
      transparent 100%
    );
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[12]} 0 ${theme.spacing[20]};
  }
`;

export const HeroTitle = styled.h1`
  font-size: ${theme.fontSizes["7xl"]};
  font-weight: ${theme.fontWeights.black};
  margin: 0 0 ${theme.spacing[6]};
  background: linear-gradient(
    135deg,
    ${theme.colors.gray[900]},
    ${theme.colors.primary[600]},
    ${theme.colors.blue[600]}
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(
      135deg,
      ${theme.colors.white},
      ${theme.colors.primary[300]},
      ${theme.colors.blue[300]}
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: ${theme.fontSizes["6xl"]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes["5xl"]};
    margin-bottom: ${theme.spacing[4]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes["4xl"]};
  }
`;

export const HeroSubtitle = styled.h2`
  font-size: ${theme.fontSizes["2xl"]};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.primary[600]};
  margin: 0 0 ${theme.spacing[8]};
  letter-spacing: ${theme.letterSpacings.wide};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.primary[300]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.xl};
    margin-bottom: ${theme.spacing[6]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.lg};
  }
`;

export const HeroImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto ${theme.spacing[8]};
  border: 4px solid ${theme.colors.primary[200]};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  @media (prefers-color-scheme: dark) {
    border-color: ${theme.colors.primary[700]};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 150px;
    height: 150px;
    margin-bottom: ${theme.spacing[6]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 120px;
    height: 120px;
    margin-bottom: ${theme.spacing[4]};
  }
`;

export const HeroDescription = styled.p`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.gray[600]};
  max-width: 600px;
  margin: 0 auto;
  line-height: ${theme.lineHeights.relaxed};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[300]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
    padding: 0 ${theme.spacing[4]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.base};
  }
`;

// Section Components
export const Section = styled.section`
  padding: ${theme.spacing[20]} 0;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.xl}) {
    padding: ${theme.spacing[16]} ${theme.spacing[8]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[12]} ${theme.spacing[6]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing[8]} ${theme.spacing[4]};
  }
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes["4xl"]};
  font-weight: ${theme.fontWeights.bold};
  text-align: center;
  margin: 0 0 ${theme.spacing[16]};
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes["3xl"]};
    margin-bottom: ${theme.spacing[12]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes["2xl"]};
    margin-bottom: ${theme.spacing[8]};
  }
`;

export const SectionContent = styled.div`
  position: relative;
`;

// About Section
export const AboutGrid = styled.div`
  display: grid;
  gap: ${theme.spacing[8]};
  max-width: 800px;
  margin: 0 auto;
`;

export const AboutText = styled.p`
  font-size: ${theme.fontSizes.lg};
  line-height: ${theme.lineHeights.relaxed};
  color: ${theme.colors.gray[700]};
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[300]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.base};
  }
`;

export const AboutHighlight = styled.blockquote`
  font-size: ${theme.fontSizes.xl};
  font-style: italic;
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.primary[600]};
  text-align: center;
  margin: ${theme.spacing[8]} 0 0;
  padding: ${theme.spacing[6]};
  background: linear-gradient(
    135deg,
    ${theme.colors.primary[50]},
    ${theme.colors.blue[50]}
  );
  border-radius: 24px;
  border-left: 4px solid ${theme.colors.primary[400]};
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.02),
    inset 0 0 16px rgba(0, 0, 0, 0.01);

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.primary[300]};
    background: linear-gradient(
      135deg,
      ${theme.colors.primary[900]}40,
      ${theme.colors.blue[900]}40
    );
    border-left-color: ${theme.colors.primary[500]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
    padding: ${theme.spacing[4]};
  }
`;

// Skills Section
export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing[8]};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing[6]};
  }
`;

export const SkillCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing[8]};
  border-radius: 32px;
  box-shadow: ${theme.shadows.lg}, inset 0 0 15px rgba(0, 0, 0, 0.05),
    inset 0 0 30px rgba(0, 0, 0, 0.02);
  transition-property: all;
  transition-duration: ${theme.transitions.duration[300]};
  transition-timing-function: ${theme.transitions.easing["in-out"]};
  border: 1px solid ${theme.colors.gray[200]};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${theme.colors.primary[400]},
      ${theme.colors.blue[400]},
      ${theme.colors.green[400]}
    );
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows["2xl"]};
  }

  @media (prefers-color-scheme: dark) {
    background: ${theme.colors.gray[800]};
    border-color: ${theme.colors.gray[700]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[6]};
  }
`;

export const SkillIcon = styled.div`
  font-size: ${theme.fontSizes["4xl"]};
  margin-bottom: ${theme.spacing[4]};
  text-align: center;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
`;

export const SkillTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.gray[900]};
  margin: 0 0 ${theme.spacing[4]};
  text-align: center;

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const SkillDescription = styled.p`
  font-size: ${theme.fontSizes.base};
  line-height: ${theme.lineHeights.relaxed};
  color: ${theme.colors.gray[600]};
  margin: 0;
  text-align: center;

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[300]};
  }
`;

// Projects Section
export const ProjectsGrid = styled.div`
  display: grid;
  gap: ${theme.spacing[8]};

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing[6]};
  }
`;

export const ProjectCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing[8]};
  border-radius: 32px;
  box-shadow: ${theme.shadows.md}, inset 0 0 12px rgba(0, 0, 0, 0.04),
    inset 0 0 25px rgba(0, 0, 0, 0.02);
  border: 1px solid ${theme.colors.gray[200]};
  transition-property: all;
  transition-duration: ${theme.transitions.duration[300]};
  transition-timing-function: ${theme.transitions.easing["in-out"]};

  &:hover {
    box-shadow: ${theme.shadows.xl};
    transform: translateY(-4px);
  }

  @media (prefers-color-scheme: dark) {
    background: ${theme.colors.gray[800]};
    border-color: ${theme.colors.gray[700]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[6]};
  }
`;

export const ProjectTitle = styled.h3`
  font-size: ${theme.fontSizes["2xl"]};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.gray[900]};
  margin: 0 0 ${theme.spacing[4]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.xl};
  }
`;

export const ProjectDescription = styled.p`
  font-size: ${theme.fontSizes.base};
  line-height: ${theme.lineHeights.relaxed};
  color: ${theme.colors.gray[600]};
  margin: 0 0 ${theme.spacing[4]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[300]};
  }
`;

export const ProjectTech = styled.div`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.primary[600]};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  background: ${theme.colors.primary[50]};
  border-radius: ${theme.borderRadius.full};
  display: inline-block;

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.primary[300]};
    background: ${theme.colors.primary[900]}40;
  }
`;

// Personal Section
export const PersonalSection = styled(Section)`
  background: linear-gradient(
    135deg,
    ${theme.colors.gray[50]},
    ${theme.colors.primary[50]}40,
    ${theme.colors.gray[50]}
  );
  border-radius: 40px;
  margin: ${theme.spacing[20]} auto;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(
      135deg,
      ${theme.colors.gray[900]},
      ${theme.colors.primary[900]}20,
      ${theme.colors.gray[900]}
    );
  }

  @media (max-width: ${theme.breakpoints.xl}) {
    margin: ${theme.spacing[16]} ${theme.spacing[8]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    margin: ${theme.spacing[12]} ${theme.spacing[6]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    margin: ${theme.spacing[8]} ${theme.spacing[4]};
  }
`;

export const PersonalContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  display: grid;
  gap: ${theme.spacing[6]};
`;

export const PersonalQuote = styled.div`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.primary[700]};
  text-align: center;
  margin-top: ${theme.spacing[8]};
  padding: ${theme.spacing[6]};
  border-radius: ${theme.borderRadius.xl};
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.md}, inset 0 0 10px rgba(0, 0, 0, 0.03),
    inset 0 0 20px rgba(0, 0, 0, 0.01);

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.primary[300]};
    background: ${theme.colors.gray[800]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
    padding: ${theme.spacing[4]};
  }
`;

// Connect Section
export const ConnectSection = styled.section`
  text-align: center;
  padding: ${theme.spacing[20]} 0;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary[600]},
    ${theme.colors.blue[600]},
    ${theme.colors.green[600]}
  );
  color: ${theme.colors.white};
  margin: ${theme.spacing[20]} 0 0;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[16]} ${theme.spacing[6]};
    margin-top: ${theme.spacing[16]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing[12]} ${theme.spacing[4]};
    margin-top: ${theme.spacing[12]};
  }
`;

export const ConnectTitle = styled.h2`
  font-size: ${theme.fontSizes["4xl"]};
  font-weight: ${theme.fontWeights.bold};
  margin: 0 0 ${theme.spacing[6]};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes["3xl"]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes["2xl"]};
  }
`;

export const ConnectDescription = styled.p`
  font-size: ${theme.fontSizes.xl};
  line-height: ${theme.lineHeights.relaxed};
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.base};
  }
`;

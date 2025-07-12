import styled, { keyframes } from 'styled-components';
import { theme } from '../../../../styles/theme';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(5deg); }
  66% { transform: translateY(-10px) rotate(-3deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Background Elements
export const GradientOrb = styled.div`
  position: fixed;
  top: -50%;
  right: -20%;
  width: 800px;
  height: 800px;
  background: linear-gradient(135deg, 
    ${theme.colors.blue[400]}22, 
    ${theme.colors.primary[400]}11, 
    ${theme.colors.green[400]}22
  );
  border-radius: 50%;
  filter: blur(40px);
  animation: ${pulse} 8s ease-in-out infinite;
  z-index: -1;

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
  background: linear-gradient(45deg, 
    ${theme.colors.primary[300]}33, 
    ${theme.colors.blue[300]}22
  );
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  filter: blur(20px);
  animation: ${float} 6s ease-in-out infinite;
  z-index: -1;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 150px;
    height: 150px;
  }
`;

// Hero Section
export const HeroSection = styled.section`
  text-align: center;
  padding: ${theme.spacing[20]} 0 ${theme.spacing[32]};
  position: relative;
  background: linear-gradient(135deg, 
    transparent 0%, 
    ${theme.colors.primary[50]}40 50%, 
    transparent 100%
  );

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, 
      transparent 0%, 
      ${theme.colors.primary[900]}20 50%, 
      transparent 100%
    );
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[12]} 0 ${theme.spacing[20]};
  }
`;

export const HeroTitle = styled.h1`
  font-size: ${theme.fontSizes['7xl']};
  font-weight: ${theme.fontWeights.black};
  margin: 0 0 ${theme.spacing[6]};
  background: linear-gradient(135deg, 
    ${theme.colors.gray[900]}, 
    ${theme.colors.primary[600]}, 
    ${theme.colors.blue[600]}
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${shimmer} 3s ease-in-out infinite;
  line-height: 1.1;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, 
      ${theme.colors.white}, 
      ${theme.colors.primary[300]}, 
      ${theme.colors.blue[300]}
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: ${theme.fontSizes['6xl']};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['5xl']};
    margin-bottom: ${theme.spacing[4]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['4xl']};
  }
`;

export const HeroSubtitle = styled.h2`
  font-size: ${theme.fontSizes['2xl']};
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
  font-size: ${theme.fontSizes['4xl']};
  font-weight: ${theme.fontWeights.bold};
  text-align: center;
  margin: 0 0 ${theme.spacing[16]};
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['3xl']};
    margin-bottom: ${theme.spacing[12]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['2xl']};
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
  background: linear-gradient(135deg, 
    ${theme.colors.primary[50]}, 
    ${theme.colors.blue[50]}
  );
  border-radius: ${theme.borderRadius.xl};
  border-left: 4px solid ${theme.colors.primary[400]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.primary[300]};
    background: linear-gradient(135deg, 
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
  border-radius: ${theme.borderRadius['2xl']};
  box-shadow: ${theme.shadows.lg};
  transition: all ${theme.transitions.duration[300]} ${theme.transitions.easing['in-out']};
  border: 1px solid ${theme.colors.gray[200]};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      ${theme.colors.primary[400]}, 
      ${theme.colors.blue[400]}, 
      ${theme.colors.green[400]}
    );
    background-size: 200% 100%;
    animation: ${shimmer} 2s ease-in-out infinite;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows['2xl']};
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
  font-size: ${theme.fontSizes['4xl']};
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
  border-radius: ${theme.borderRadius['2xl']};
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.gray[200]};
  transition: all ${theme.transitions.duration[300]} ${theme.transitions.easing['in-out']};

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
  font-size: ${theme.fontSizes['2xl']};
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
  background: linear-gradient(135deg, 
    ${theme.colors.gray[50]}, 
    ${theme.colors.primary[50]}40, 
    ${theme.colors.gray[50]}
  );
  border-radius: ${theme.borderRadius['3xl']};
  margin: ${theme.spacing[20]} auto;

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, 
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
  box-shadow: ${theme.shadows.md};

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
  background: linear-gradient(135deg, 
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
  font-size: ${theme.fontSizes['4xl']};
  font-weight: ${theme.fontWeights.bold};
  margin: 0 0 ${theme.spacing[6]};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['3xl']};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['2xl']};
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
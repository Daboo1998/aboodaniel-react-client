import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const CVContainer = styled.div`
  padding-top: ${theme.spacing[10]};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[8]};
  max-width: calc(1400px + ${theme.spacing[10]} * 2) !important;
  margin: 0 auto !important;
  padding-left: ${theme.spacing[6]};
  padding-right: ${theme.spacing[6]};
  width: 100%;

  @media (min-width: ${theme.breakpoints.xl}) {
    max-width: calc(1600px + ${theme.spacing[10]} * 2) !important;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding-left: ${theme.spacing[4]};
    padding-right: ${theme.spacing[4]};
  }
`;

export const CVTitle = styled.h1`
  text-align: center;
  margin: 0;
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const CVMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing[8]};
  max-width: 100%;
  width: 100%;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column-reverse;
    gap: ${theme.spacing[6]};
  }
`;

export const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[8]};
  flex: 1;
  min-width: 0; /* Prevents flex item from overflowing */
  max-width: calc(100% - 320px - ${theme.spacing[8]});

  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
`;

export const SectionTitle = styled.h2`
  padding-bottom: ${theme.spacing[2]};
  margin: 0;
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }

  &.with-top-padding {
    padding-top: ${theme.spacing[5]};
  }
`;

export const AboutText = styled.p`
  margin: 0;
  line-height: 1.6;
  color: ${theme.colors.gray[800]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[200]};
  }
`;

export const SkillSetContainer = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

export const SkillSetTitle = styled.h3`
  margin: 0 0 ${theme.spacing[2]} 0;
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const SkillsList = styled.ul`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing[2]};
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
`;

export const SkillItem = styled.li`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 0 8px rgba(0, 0, 0, 0.03),
    inset 0 0 16px rgba(0, 0, 0, 0.01);
  position: relative;
  overflow: hidden;

  /* Subtle rainbow refraction at edges */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 0, 0, 0.005) 2%,
      rgba(255, 165, 0, 0.005) 3%,
      rgba(255, 255, 0, 0.005) 4%,
      rgba(0, 255, 0, 0.005) 5%,
      rgba(0, 255, 255, 0.005) 6%,
      rgba(0, 0, 255, 0.005) 7%,
      rgba(238, 130, 238, 0.005) 8%,
      transparent 10%,
      transparent 90%,
      rgba(238, 130, 238, 0.005) 92%,
      rgba(0, 0, 255, 0.005) 93%,
      rgba(0, 255, 255, 0.005) 94%,
      rgba(0, 255, 0, 0.005) 95%,
      rgba(255, 255, 0, 0.005) 96%,
      rgba(255, 165, 0, 0.005) 97%,
      rgba(255, 0, 0, 0.005) 98%,
      transparent 100%
    );
    pointer-events: none;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 0 8px rgba(0, 0, 0, 0.1),
      inset 0 0 16px rgba(0, 0, 0, 0.05);
  }

  p {
    margin: 0;
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.gray[800]};
    position: relative;
    z-index: 1;

    @media (prefers-color-scheme: dark) {
      color: ${theme.colors.gray[200]};
    }
  }
`;

export const HobbiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing[2]};
  flex-wrap: wrap;
`;

export const HobbyItem = styled.p`
  margin: 0;
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: ${theme.colors.blue[800]};
  font-size: ${theme.fontSizes.sm};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 0 8px rgba(0, 0, 0, 0.03),
    inset 0 0 16px rgba(0, 0, 0, 0.01);
  position: relative;
  overflow: hidden;

  /* Subtle rainbow refraction at edges */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 0, 0, 0.005) 2%,
      rgba(255, 165, 0, 0.005) 3%,
      rgba(255, 255, 0, 0.005) 4%,
      rgba(0, 255, 0, 0.005) 5%,
      rgba(0, 255, 255, 0.005) 6%,
      rgba(0, 0, 255, 0.005) 7%,
      rgba(238, 130, 238, 0.005) 8%,
      transparent 10%,
      transparent 90%,
      rgba(238, 130, 238, 0.005) 92%,
      rgba(0, 0, 255, 0.005) 93%,
      rgba(0, 255, 255, 0.005) 94%,
      rgba(0, 255, 0, 0.005) 95%,
      rgba(255, 255, 0, 0.005) 96%,
      rgba(255, 165, 0, 0.005) 97%,
      rgba(255, 0, 0, 0.005) 98%,
      transparent 100%
    );
    pointer-events: none;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.3);
    color: ${theme.colors.blue[200]};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 0 8px rgba(0, 0, 0, 0.1),
      inset 0 0 16px rgba(0, 0, 0, 0.05);
  }
`;

export const ExperienceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};

  .experience-admin-controls {
    display: flex;
    gap: ${theme.spacing[2]};
    margin-bottom: ${theme.spacing[4]};
    align-items: center;

    @media (max-width: ${theme.breakpoints.sm}) {
      flex-direction: column;
      gap: ${theme.spacing[2]};
    }
  }
`;

export const ExperienceItem = styled.div`
  border-left: 3px solid ${theme.colors.blue[500]};
  padding-left: ${theme.spacing[4]};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  padding: ${theme.spacing[4]};
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${theme.spacing[3]};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(0, 0, 0, 0.05),
    inset 0 0 40px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;

  /* Enhanced refraction with subtle edge rainbow */
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
          rgba(255, 0, 0, 0.03) 0%,
          transparent 40%
        ),
      radial-gradient(
        circle at 75% 75%,
        rgba(0, 0, 255, 0.03) 0%,
        transparent 40%
      );
    mix-blend-mode: overlay;
    pointer-events: none;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.1);
    border-left-color: ${theme.colors.blue[400]};
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 0 20px rgba(0, 0, 0, 0.15), inset 0 0 40px rgba(0, 0, 0, 0.08);
  }

  .experience-content {
    flex: 1;
    min-width: 0;
    position: relative;
    z-index: 1;
  }

  .experience-edit-button {
    flex-shrink: 0;
    opacity: 0.7;
    transition: opacity 0.2s ease;
    position: relative;
    z-index: 1;

    &:hover {
      opacity: 1;
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${theme.spacing[2]};

    .experience-edit-button {
      align-self: flex-end;
    }
  }
`;

export const ExperienceTitle = styled.h3`
  margin: 0 0 ${theme.spacing[2]} 0;
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const ExperienceDate = styled.p`
  font-weight: ${theme.fontWeights.bold};
  margin: 0 0 ${theme.spacing[2]} 0;
  color: ${theme.colors.gray[700]};
  font-size: ${theme.fontSizes.sm};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[300]};
  }
`;

export const ExperienceDescription = styled.p`
  white-space: pre-wrap;
  margin: 0;
  line-height: 1.6;
  color: ${theme.colors.gray[800]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[200]};
  }
`;

export const EducationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
`;

export const EducationItem = styled.div`
  padding: ${theme.spacing[3]};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(0, 0, 0, 0.05),
    inset 0 0 40px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;

  /* Enhanced refraction with subtle edge rainbow */
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
          rgba(255, 0, 0, 0.03) 0%,
          transparent 40%
        ),
      radial-gradient(
        circle at 75% 75%,
        rgba(0, 0, 255, 0.03) 0%,
        transparent 40%
      );
    mix-blend-mode: overlay;
    pointer-events: none;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 0 20px rgba(0, 0, 0, 0.15), inset 0 0 40px rgba(0, 0, 0, 0.08);
  }
`;

export const EducationTitle = styled.h3`
  margin: 0 0 ${theme.spacing[1]} 0;
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }
`;

export const EducationPlace = styled.h4`
  margin: 0 0 ${theme.spacing[1]} 0;
  color: ${theme.colors.gray[700]};
  font-weight: ${theme.fontWeights.medium};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[300]};
  }
`;

export const EducationYears = styled.p`
  margin: 0;
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.sm};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[400]};
  }
`;

export const ProfileColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${theme.spacing[4]};
  flex-shrink: 0;
  align-items: center;
  width: 320px !important;
  min-width: 320px !important;
  max-width: 320px !important;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${theme.spacing[6]};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(0, 0, 0, 0.03),
    inset 0 0 40px rgba(0, 0, 0, 0.01);
  position: relative;
  overflow: hidden;

  /* Enhanced refraction with subtle edge rainbow */
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
    pointer-events: none;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.1);
    border-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.1),
      inset 0 0 40px rgba(0, 0, 0, 0.05);
  }

  @media (min-width: ${theme.breakpoints.md}) {
    align-self: flex-start;
    position: sticky;
    top: ${theme.spacing[16]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100% !important;
    min-width: 100% !important;
    max-width: 100% !important;
  }
`;

export const ProfileImage = styled.img`
  width: ${theme.spacing[48]};
  object-fit: contain;
  border-radius: 28px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15), inset 0 0 20px rgba(0, 0, 0, 0.05),
    inset 0 0 40px rgba(0, 0, 0, 0.02);
  margin-bottom: ${theme.spacing[4]};
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  position: relative;
  z-index: 1;

  @media (prefers-color-scheme: dark) {
    border-color: rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.1),
      inset 0 0 40px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: ${theme.spacing[32]};
  }
`;

export const ProfileInfo = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    text-align: center;
  }
`;

export const ProfileName = styled.h4`
  text-align: center;
  padding-top: ${theme.spacing[2]};
  margin: 0;
  color: ${theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.white};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
  }
`;

export const ProfileTitle = styled.h5`
  text-align: center;
  padding-top: ${theme.spacing[2]};
  margin: 0;
  color: ${theme.colors.gray[700]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[300]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
  }
`;

export const ContactInfo = styled.p`
  width: 100%;
  padding-top: ${theme.spacing[2]};
  margin: 0;
  color: ${theme.colors.gray[700]};

  @media (prefers-color-scheme: dark) {
    color: ${theme.colors.gray[300]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    text-align: center;
  }

  a {
    color: ${theme.colors.blue[600]};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    @media (prefers-color-scheme: dark) {
      color: ${theme.colors.blue[400]};
    }
  }

  &.email-only {
    @media (max-width: ${theme.breakpoints.md}) {
      text-align: center;
      padding-top: 0;
    }
  }
`;

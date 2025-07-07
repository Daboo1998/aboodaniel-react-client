import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const CVContainer = styled.div`
  padding-top: ${theme.spacing[10]};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[8]};
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
  background-color: ${theme.colors.gray[100]};
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray[200]};

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.colors.gray[800]};
    border-color: ${theme.colors.gray[600]};
  }

  p {
    margin: 0;
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.gray[800]};

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
  background-color: ${theme.colors.blue[50]};
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.blue[200]};
  color: ${theme.colors.blue[800]};
  font-size: ${theme.fontSizes.sm};

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.colors.blue[900]};
    border-color: ${theme.colors.blue[700]};
    color: ${theme.colors.blue[200]};
  }
`;

export const ExperienceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

export const ExperienceItem = styled.div`
  border-left: 3px solid ${theme.colors.blue[500]};
  padding-left: ${theme.spacing[4]};
  background-color: ${theme.colors.gray[50]};
  padding: ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.md};

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.colors.gray[800]};
    border-left-color: ${theme.colors.blue[400]};
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
  background-color: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray[200]};

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.colors.gray[800]};
    border-color: ${theme.colors.gray[600]};
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
  min-width: 250px;

  @media (min-width: ${theme.breakpoints.md}) {
    align-self: flex-start;
    position: sticky;
    top: ${theme.spacing[16]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    min-width: 100%;
  }
`;

export const ProfileImage = styled.img`
  width: ${theme.spacing[48]};
  object-fit: contain;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  margin-bottom: ${theme.spacing[4]};

  @media (max-width: ${theme.breakpoints.md}) {
    width: ${theme.spacing[32]};
  }
`;

export const ProfileInfo = styled.div`
  width: 100%;
  text-align: center;

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
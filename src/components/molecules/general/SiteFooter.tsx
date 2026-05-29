import React from 'react';
import useNavigation from '../../../hooks/useNavigation';
import {
  FooterWrapper,
  FooterGrid,
  FooterCTASection,
  FooterKicker,
  FooterKickerIdx,
  FooterCTALine,
  FooterCTABtn,
  FooterNavSection,
  FooterSectionHead,
  FooterLinks,
  FooterLinkBtn,
  FooterBottom,
  FooterMeta,
} from './SiteFooter.styled';

const SiteFooter: React.FC = () => {
  const navigation = useNavigation();

  return (
    <FooterWrapper>
      <div style={{ maxWidth: 'var(--maxw)', marginInline: 'auto', paddingInline: 'var(--gutter)' }}>
        <FooterGrid>
          <FooterCTASection>
            <FooterKicker>
              <FooterKickerIdx>05</FooterKickerIdx>
              {' '}— Let's talk
            </FooterKicker>
            <FooterCTALine>Have an idea worth building?</FooterCTALine>
            <FooterCTABtn onClick={() => navigation.navigateTo('/contact')}>
              Get in touch <span style={{ transition: 'transform 0.3s var(--ease)', display: 'inline-block' }}>→</span>
            </FooterCTABtn>
          </FooterCTASection>

          <FooterNavSection>
            <FooterSectionHead>Navigate</FooterSectionHead>
            <FooterLinks>
              <FooterLinkBtn onClick={() => navigation.navigateTo('/')}>Home</FooterLinkBtn>
              <FooterLinkBtn onClick={() => navigation.navigateTo('/cv')}>Curriculum Vitae</FooterLinkBtn>
              <FooterLinkBtn onClick={() => navigation.navigateTo('/assistant')}>AI Assistant</FooterLinkBtn>
              <FooterLinkBtn onClick={() => navigation.navigateTo('/contact')}>Contact</FooterLinkBtn>
            </FooterLinks>
          </FooterNavSection>

          <FooterNavSection>
            <FooterSectionHead>Elsewhere</FooterSectionHead>
            <FooterLinks>
              <a href="mailto:me@aboodaniel.pl" style={{ color: 'var(--text-2)', fontSize: '0.95rem', transition: 'color 0.25s' }}>
                me@aboodaniel.pl
              </a>
              <a href="tel:+48601951169" style={{ color: 'var(--text-2)', fontSize: '0.95rem', transition: 'color 0.25s' }}>
                +48 601 951 169
              </a>
              <a href="https://www.linkedin.com/in/danielaboo" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-2)', fontSize: '0.95rem', transition: 'color 0.25s' }}>
                LinkedIn ↗
              </a>
            </FooterLinks>
          </FooterNavSection>
        </FooterGrid>

        <FooterBottom>
          <FooterMeta>© 2026 Daniel Aboo · aboodaniel.pl</FooterMeta>
          <FooterMeta>Designed &amp; built with intent.</FooterMeta>
        </FooterBottom>
      </div>
    </FooterWrapper>
  );
};

export default SiteFooter;

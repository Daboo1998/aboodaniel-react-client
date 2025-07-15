import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const NavigatorContainer = styled.div<{ $isHidden: boolean }>`
  display: flex;
  flex-direction: column;
  border-color: ${theme.colors.black};
  position: fixed;
  width: 100%;
  top: 0;
  z-index: ${theme.zIndices.overlay};
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 0 15px rgba(0, 0, 0, 0.08),
    inset 0 0 30px rgba(0, 0, 0, 0.04);

  /* Enhanced natural refraction with subtle edge rainbow */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    overflow: hidden; /* Only clip background effects, not children */
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
    border-radius: inherit;
    overflow: hidden; /* Only clip background effects, not children */
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

  ${({ $isHidden }) =>
    !$isHidden &&
    `
    border-bottom: ${theme.borderWidths[1]} solid ${theme.colors.black};
  `}

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    box-shadow: ${theme.shadows.md};
    height: unset;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: 3.5rem;
  }

  @media (prefers-color-scheme: dark) {
    background-color: rgba(0, 0, 0, 0.6);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
`;

export const MobileHeader = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${theme.background.light};
  width: 100%;
  height: 3.5rem;
  min-height: 3.5rem;
  border-bottom: 1px solid ${theme.colors.black};
  z-index: ${theme.zIndices.overlay};
  position: relative;
  background-color: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(35px) saturate(1.01);
  -webkit-backdrop-filter: blur(35px) saturate(1.01);
  border-bottom: 1px solid rgba(255, 255, 255, 0.01);
  box-shadow: none;
  inset: none;

  /* Minimal visual effects for mobile */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    pointer-events: none;
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${theme.background.dark};
    border-bottom-color: ${theme.colors.white};
    background-color: rgba(0, 0, 0, 0.02);
    border-bottom: 1px solid rgba(255, 255, 255, 0.01);
    box-shadow: none;
    inset: none;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

export const MenuButton = styled.button`
  border: none;
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
  min-width: 2.5rem;
  height: 100%;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    width: ${theme.spacing[6]};
    height: ${theme.spacing[6]};
  }

  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    outline-offset: 2px;
  }
`;

export const PageTitle = styled.h3`
  height: 100%;
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
  margin: 0;
  display: flex;
  align-items: center;
  flex-grow: 1;
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
`;

export const BrandTitle = styled.h3`
  white-space: nowrap;
  align-self: center;
  padding: 0 ${theme.spacing[4]};
  cursor: pointer;
  margin: 0;
  display: flex;
  align-items: center;
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};

  @media (min-width: ${theme.breakpoints.md}) {
    position: static;
    height: auto;
    /* No background, no width, no centering */
    justify-content: flex-start;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

export const NavigationContent = styled.div<{ $isHidden: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: transparent;

  width: 100%;
  overflow: hidden;
  z-index: ${theme.zIndices.overlay - 1};
  pointer-events: ${({ $isHidden }) => ($isHidden ? "none" : "auto")};
  will-change: transform;

  @media (prefers-color-scheme: dark) and (max-width: ${theme.breakpoints.md}) {
    background-color: rgba(30, 30, 30, 0.95);
  }

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: auto !important;
    overflow: visible;
    pointer-events: auto;
    padding: 0;
    box-sizing: border-box;
    transform: none !important;
    transition: none;
    z-index: ${theme.zIndices.overlay - 1};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    position: fixed;
    left: 0;
    top: 3.5rem;
    height: calc(100vh - 3.5rem);
    width: 100vw;
    z-index: 999;
    transform: ${({ $isHidden }) =>
      $isHidden ? "translateY(calc(-100% - 3.5rem))" : "translateY(0)"};
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
    box-sizing: border-box;
    padding-bottom: ${theme.spacing[4]};
    @supports (-webkit-touch-callout: none) {
      padding-bottom: calc(
        ${theme.spacing[4]} + env(safe-area-inset-bottom, 0px) + 50px
      );
    }
    align-items: stretch;
    justify-content: space-between;
    padding-top: ${({ $isHidden }) => ($isHidden ? "0" : theme.spacing[2])};
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;

    /* Enhanced Natural Glass Effect for Mobile Side Menu */
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px) saturate(1.2);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 0 0 24px 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.1),
      inset 0 0 40px rgba(0, 0, 0, 0.05);

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
      z-index: -1;
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
        ),
        radial-gradient(
          circle at 30% 70%,
          rgba(0, 255, 0, 0.02) 0%,
          transparent 35%
        );
      mix-blend-mode: overlay;
      pointer-events: none;
      z-index: -1;
    }

    @media (prefers-color-scheme: dark) {
      background-color: rgba(0, 0, 0, 0.8);
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
  }
`;

export const NavigationContentWrapper = styled.div<{ $isHidden: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    flex: none;
    overflow: visible;
    align-items: center;
    gap: ${theme.spacing[4]};
  }
`;

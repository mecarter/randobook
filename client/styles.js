import { css, keyframes } from 'emotion';

const FadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export const FadeInAnimation = css`
  animation: ${FadeIn} 0.2s forwards;
`;

export const FontHeading = css`
  font-family: 'Archivo Narrow', Helvetica, Arial, sans-serif;
  font-weight: 700;
`;
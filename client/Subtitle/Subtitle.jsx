import preact from 'preact';
import { css, cx } from 'emotion';

const Subtitle = ({ children }) => (
  <h2 id="site-subtitle" className={css`
    display: inline-block;
    background: #111;
    color: white;
    font-size: 3.2rem;
    margin: 1rem 0 2rem;
    padding: 1rem 2rem;
    text-transform: uppercase;

    button, span {
      background: transparent;
      border: none;
      color: #43DD94;
      font-family: inherit;
      font-size: 3.2rem;
      padding: 0;
    }

    button {
      cursor: pointer;
    }
  `}>{children}</h2>
);

export default Subtitle;

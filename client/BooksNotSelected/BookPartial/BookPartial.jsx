import preact from 'preact';
import { css, cx } from 'emotion';

import { FontHeader } from '../../styles';

const BookPartial = ({ image, title, author, link }) => (
  <div key={title} className={css`
    flex: 0 0 50%;
    padding: 2rem 2rem 2rem 0;

    @media (max-width: 520px) {
      flex: 0 0 100%;
      padding: 2rem 0;
    }
  `}>
    <img src={image} className={css`
      float: left;
      height: auto;
      margin-right: 1rem;
      width: 50px;
    `} />
    <h4 key={title}>{title} by {author}</h4>
    <a href={link} className={css`
      ${FontHeader}
      background: black;
      color: white;
      display: inline-block;
      font-size: 1.6rem;
      margin-top: 0.4rem;
      padding: 0 1rem;
      text-decoration: none;
      text-transform: uppercase;

      &:hover {
        opacity: 0.8;
      }
    `}>Buy it</a>
  </div>
);

export default BookPartial;
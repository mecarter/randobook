import preact from 'preact';
import ReactHtmlParser from 'react-html-parser';
import { css, cx } from 'emotion';

import { FontHeading } from '../styles';

import BookGraphic from './BookGraphic/BookGraphic';

const ButtonCSS = css`
  ${FontHeading}
  background: #111;
  border: none;
  color: white;
  cursor: pointer;
  display: block;
  line-height: 1.4;
  padding: 1rem 1.6rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
  width: 100%;

  &:hover {
    opacity: 0.8;
  }
`;

const Book = ({ image, title, author, description, link, rating, onSelectNext, showNextButton }) => (
  <div className={css`
    margin-bottom: 4rem;
  `}>
    <BookGraphic imageUrl={image} />
    <div className={css`
      margin: 2rem 0;  
    `}>
      <h1 className={css`
        display: inline;
        font-size: 3.2rem;  
      `}>{title}</h1>
      {' '}
      <h2 className={css`
        display: inline;
        font-size: 2rem;  
      `}>by {author}</h2>
    </div>
    <div>
      <a href={link} className={css`
        ${ButtonCSS}

      `}>
        {'Buy it from Powell\'s!'}
      </a>
      <div className={css`
        border: 0.5rem solid #43DD94;
        padding: 2rem;
      `}>
        <div className={css`
          ${FontHeading}
          font-size: 14px;
          text-transform: uppercase;
          margin-bottom: 1em;
        `}>
          {rating.average > 2.5 ? `👍` : `👎`}
          {' '}
          Average rating of {rating.average}/5 from {rating.count} reader{rating.count > 1 ? 's' : ''}.
        </div>
        {ReactHtmlParser(description)}
      </div>
      {showNextButton && (
        <button onClick={onSelectNext} className={css`
          ${ButtonCSS}
          background: #43DD94;
        `}>
          Nah, show me another one
        </button>
      )}
    </div>
  </div>
);

export default Book;

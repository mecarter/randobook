import preact from 'preact';
import { css, cx } from 'emotion';

import BookPartial from './BookPartial/BookPartial';

const BooksNotSelected = ({ books }) => (
  <div className={css`
    display: flex;
    flex-wrap: wrap;  
  `}>
    <h2 className={css`
      color: #43DD94;
      flex: 0 0 100%;
      font-family: 'Archivo Narrow', Helvetica, Arial, sans-serif;
      font-weight: 700;
      margin-bottom: 1rem;
      text-transform: uppercase;
    `}>{'Books you passed on this month:'}</h2>
    {books.map(book => <BookPartial key={book.title} {...book} />)}
  </div>
);

export default BooksNotSelected;

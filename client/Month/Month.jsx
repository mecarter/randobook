import preact from 'preact';

import Book from '../Book/Book';
import BooksNotSelected from '../BooksNotSelected/BooksNotSelected';
import Subtitle from '../Subtitle/Subtitle';

const Month = ({
  months,
  onClickMonth,
  onSelectNext,
  selectedMonth,
}) => {
  const month = months.find(m => m.month === selectedMonth);
  const isCurrentMonth = months.indexOf(month) === 0;
  const book = month.books[month.selected];
  return (
    <div>
      <Subtitle>
        Your selection for
        {' '}
        {months.length > 1 && (<button onClick={onClickMonth}>{month.month}</button>)}
        {months.length === 1 && <span>{month.month}</span>}
        :
      </Subtitle>
      {book && (
        <Book
          {...book}
          onSelectNext={
            isCurrentMonth
              ? () => onSelectNext(month.selected)
              : undefined
          }
          showNextButton={isCurrentMonth && month.books.length - 1 > month.selected}
        />
      )}
      {month.selected > 0 && <BooksNotSelected books={month.books.slice(0, month.selected)} />}
    </div>
  );
};

export default Month;

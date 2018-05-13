import preact from 'preact';

import BookGraphic from '../Book/BookGraphic/BookGraphic';
import Subtitle from '../Subtitle/Subtitle';

const Loading = () => (
  <div>
    <Subtitle>Fetching your selection...</Subtitle>
    <BookGraphic />
  </div>
);

export default Loading;

import preact from 'preact';
import { css, cx } from 'emotion';

const BookGraphic = ({ imageUrl }) => (
  <div className={css`
    width: 100%;
    height: 16rem;
  `}>
    <div className={css`
      background-color: #43DD94;
      background-position: -4.8rem center;
      background-image: url(${imageUrl && !imageUrl.includes('nophoto') ? imageUrl : '/placeholder.png'});
      border-bottom: 0.5rem solid #111;
      border-top: 0.5rem solid #111;
      height: 15rem;
      left: 0;
      position: absolute;
      width: 100vw;  
    `} />
  </div>
);

export default BookGraphic;
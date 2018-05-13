import preact from 'preact';
import { css, cx, keyframes } from 'emotion';

import { FadeInAnimation, FontHeading } from '../styles';

const MonthSelector = ({ availableMonths, onClose, onSelectMonth }) => (
  <div className={css`
    ${FadeInAnimation}
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  `}>
    <ul className={css`
      display: block;
      width: 50vw;
      min-width: 32rem;
      background: white;
      border: 5px solid #43DD94;
      list-style: none;
      padding: 2rem;
      margin: 0;
      text-align: center;
    `}>
      <li className={css`
        ${FontHeading}
        font-size: 1.6rem;
        text-transform: uppercase;
        margin-bottom: 1em;
      `}>View another month:</li>
      {availableMonths.map(month => (
        <li key={month}>
          <button onClick={() => onSelectMonth(month)} className={css`
            ${FontHeading}
            display: block;
            width: 100%;
            font-size: 3.2rem;
            background: none;
            border: none;
            color: #43DD94;
            padding: 1rem;
            cursor: pointer;

            &:hover {
              color: black;
            }
          `}>{month}</button>
        </li>
      ))}
    </ul>
    <div onClick={onClose} className={css`
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: rgba(255, 255, 255, 0.7);
    `}/>
  </div>
);

export default MonthSelector;

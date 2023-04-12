import React from 'react';
import { BsCheck } from 'react-icons/bs';

const Color = ({ colors, setColor, color }) => {
  return (
    <ul className='colors ps-0 d-flex flex-wrap align-items-center gap-10 mb-0'>
      {colors &&
        colors.map((curColor) => {
          return (
            <li
              key={curColor?._id}
              style={{
                backgroundColor: `${curColor?.hex}`,
                cursor: 'pointer',
                opacity: `${color === curColor?._id ? '1' : '0.6'}`,
              }}
              onClick={() => setColor(curColor?._id)}
            >
              {color === curColor?._id ? (
                <p className='d-flex align-items-center justify-content-center mb-0'>
                  <BsCheck color='white' size='18px' />
                </p>
              ) : (
                ''
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default Color;

import React from 'react';

const Color = ({ colors, setColor }) => {
  return (
    <ul className='colors ps-0 d-flex flex-wrap align-items-center gap-10 mb-0'>
      {colors &&
        colors.map((color) => {
          return (
            <li
              key={color?._id}
              style={{ backgroundColor: `${color?.hex}` }}
              onClick={() => setColor(color?._id)}
            ></li>
          );
        })}
    </ul>
  );
};

export default Color;

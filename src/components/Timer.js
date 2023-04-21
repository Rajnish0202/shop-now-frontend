import React, { useCallback, useEffect, useState } from 'react';

const Timer = ({ deadline }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = useCallback(() => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  }, [deadline]);

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    if (Date.parse(deadline) === Date.now()) {
      clearInterval(interval);
    }
  }, [deadline, getTime]);

  return (
    <>
      <p className='mb-0'>
        <b>{days} </b> days
      </p>
      <div className='d-flex gap-10 align-items-center'>
        <span className='badge rounded-circle p-3 bg-danger'>
          {hours < 10 ? hours?.toString()?.padStart(2, '0') : hours}
        </span>{' '}
        :
        <span className='badge rounded-circle p-3 bg-danger'>
          {minutes < 10 ? minutes?.toString()?.padStart(2, '0') : minutes}
        </span>{' '}
        :
        <span className='badge rounded-circle p-3 bg-danger'>
          {seconds < 10 ? seconds?.toString()?.padStart(2, '0') : seconds}
        </span>
      </div>
    </>
  );
};

export default Timer;

// Clock.jsx
import React, { useEffect, useState } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm text-white">
      {time.toLocaleTimeString()} | {time.toLocaleDateString()}
    </div>
  );
};

export default Clock;

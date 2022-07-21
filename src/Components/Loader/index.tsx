import React, { memo } from 'react';
import './style/loader.css';

const Loader = memo(() => {
  const loaders = Array.from({ length: 3 }, (_, k) => k + 1);
  return (
    <div className="loader">
      {loaders.map((l) => (
        <div key={l} />
      ))}
    </div>
  );
});

export default Loader;

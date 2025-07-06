import React from 'react';

const SectionWrapper = (Component, idName) => function HOC() {
  return (
    <div id={idName}>
      <Component />
    </div>
  );
};

export default SectionWrapper;

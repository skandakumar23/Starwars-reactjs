import React from 'react';
import './heading.css';

const Heading = ({ heading, children }) => {
  const HeadingComponent = heading ? 'h1' : 'h3';

  return (
    <div className='banner'>
      <HeadingComponent className={heading ? 'heading-title' : ''}>
        {children}
      </HeadingComponent>
    </div>
  );
};

export default Heading;

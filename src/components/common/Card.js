import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, className, ...props }) => {
  return (
    <div {...props} className={`bg-white shadow-md rounded-lg ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className, ...props }) => {
  return (
    <div {...props} className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className, ...props }) => {
  return (
    <div {...props} className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export { Card, CardHeader, CardContent };
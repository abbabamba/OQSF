import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ onClick, children, className, ...props }) => {
  return (
    <button 
      onClick={onClick} 
      {...props} 
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
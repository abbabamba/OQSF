import React from 'react';
import PropTypes from 'prop-types';

export const Table = ({ children, className, ...props }) => (
  <table {...props} className={`min-w-full divide-y divide-gray-200 ${className}`}>
    {children}
  </table>
);

export const TableBody = ({ children, ...props }) => (
  <tbody {...props} className="bg-white divide-y divide-gray-200">
    {children}
  </tbody>
);

export const TableCell = ({ children, className, ...props }) => (
  <td {...props} className={`px-6 py-4 whitespace-nowrap ${className}`}>
    {children}
  </td>
);

export const TableHead = ({ children, ...props }) => (
  <thead {...props} className="bg-gray-50">
    {children}
  </thead>
);

export const TableHeader = ({ children, className, ...props }) => (
  <th {...props} className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
    {children}
  </th>
);

export const TableRow = ({ children, ...props }) => (
  <tr {...props}>
    {children}
  </tr>
);

Table.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

TableBody.propTypes = {
  children: PropTypes.node.isRequired
};

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

TableHead.propTypes = {
  children: PropTypes.node.isRequired
};

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

TableRow.propTypes = {
  children: PropTypes.node.isRequired
};
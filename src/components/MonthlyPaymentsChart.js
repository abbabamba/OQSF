import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './MonthlyPaymentsChart.module.css';

const MonthlyPaymentsChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className={styles.cartesianGrid} />
          <XAxis dataKey="month" tick={{ fill: styles.textColor }} />
          <YAxis tick={{ fill: styles.textColor }} />
          <Tooltip contentStyle={{ backgroundColor: styles.tooltipBackground, border: 'none' }} />
          <Legend wrapperStyle={{ color: styles.textColor }} />
          <Line 
            type="monotone" 
            dataKey="paiement" 
            stroke={styles.lineColor} 
            activeDot={{ r: 8, fill: styles.activeDotColor }} 
            dot={{ fill: styles.dotColor }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyPaymentsChart;
import React from 'react';
import './index.css';

const CircleChartItem = ({ percentage, color1, color2 }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="chart-container">
      <svg className="svg-circle" width="100" height="100">
        <circle
          className="bg-circle"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="10"
          style={{ stroke: color1 }}
        />
        <circle
          className="fg-circle"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          strokeLinecap="square"
          style={{ stroke: color2 }}
        />
      </svg>
      <div className="chart-label">{percentage}%</div>
    </div>
  );
};

export default CircleChartItem;

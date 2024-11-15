import React from 'react';
import { render, screen } from '@testing-library/react';
import BellCurveVisualization from '../BellCurveVisualization';

describe('BellCurveVisualization', () => {
  it('renders without crashing', () => {
    render(<BellCurveVisualization />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('updates visualization when props change', () => {
    const { rerender } = render(<BellCurveVisualization mean={0} stdDev={1} />);
    const initialSvg = document.querySelector('svg')?.innerHTML;
    
    rerender(<BellCurveVisualization mean={2} stdDev={2} />);
    const updatedSvg = document.querySelector('svg')?.innerHTML;
    
    expect(initialSvg).not.toBe(updatedSvg);
  });

  it('renders data points when provided', () => {
    const testData = [1, 2, 3, 4, 5];
    render(<BellCurveVisualization data={testData} />);
    const rects = document.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(0);
  });
});

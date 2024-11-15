import React from 'react';
import { render, screen } from '@testing-library/react';
import BellCurveVisualization from '../BellCurveVisualization';

// Mock D3
jest.mock('d3', () => ({
  select: jest.fn(() => ({
    selectAll: jest.fn(() => ({
      remove: jest.fn()
    })),
    append: jest.fn(() => ({
      attr: jest.fn().mockReturnThis(),
      call: jest.fn().mockReturnThis()
    }))
  })),
  scaleLinear: jest.fn(() => ({
    domain: jest.fn().mockReturnThis(),
    range: jest.fn().mockReturnThis()
  })),
  range: jest.fn(() => []),
  line: jest.fn(() => ({
    x: jest.fn().mockReturnThis(),
    y: jest.fn().mockReturnThis(),
    curve: jest.fn()
  })),
  curveBasis: jest.fn(),
  axisBottom: jest.fn(),
  axisLeft: jest.fn(),
  zoom: jest.fn(() => ({
    scaleExtent: jest.fn().mockReturnThis(),
    on: jest.fn().mockReturnThis()
  })),
  bin: jest.fn(() => (data: any[]) => [])
}));

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

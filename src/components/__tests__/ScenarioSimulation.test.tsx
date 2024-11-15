import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ScenarioSimulation from '../ScenarioSimulation';

describe('ScenarioSimulation', () => {
  it('renders all scenario buttons', () => {
    render(<ScenarioSimulation onDataChange={() => {}} />);
    expect(screen.getByText(/Normal Distribution/)).toBeInTheDocument();
    expect(screen.getByText(/Add Outliers/)).toBeInTheDocument();
    expect(screen.getByText(/Bimodal Distribution/)).toBeInTheDocument();
  });

  it('generates data when buttons are clicked', () => {
    const onDataChange = jest.fn();
    render(<ScenarioSimulation onDataChange={onDataChange} />);
    
    fireEvent.click(screen.getByText(/Normal Distribution/));
    expect(onDataChange).toHaveBeenCalled();
    
    const data = onDataChange.mock.calls[0][0];
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(100); // default sample size
  });

  it('updates sample size when slider changes', () => {
    const onDataChange = jest.fn();
    render(<ScenarioSimulation onDataChange={onDataChange} />);
    
    const slider = screen.getByLabelText(/Sample Size/);
    fireEvent.change(slider, { target: { value: '200' } });
    
    fireEvent.click(screen.getByText(/Normal Distribution/));
    const data = onDataChange.mock.calls[0][0];
    expect(data.length).toBe(200);
  });
});

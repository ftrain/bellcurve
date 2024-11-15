import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ControlPanel from '../ControlPanel';

describe('ControlPanel', () => {
  it('renders sliders with default values', () => {
    render(<ControlPanel />);
    const meanSlider = screen.getByLabelText(/Mean/);
    const stdDevSlider = screen.getByLabelText(/Standard Deviation/);
    
    expect(meanSlider).toHaveValue('0');
    expect(stdDevSlider).toHaveValue('1');
  });

  it('calls onChange handlers when sliders change', () => {
    const onMeanChange = jest.fn();
    const onStdDevChange = jest.fn();
    
    render(<ControlPanel onMeanChange={onMeanChange} onStdDevChange={onStdDevChange} />);
    
    const meanSlider = screen.getByLabelText(/Mean/);
    fireEvent.change(meanSlider, { target: { value: '2' } });
    expect(onMeanChange).toHaveBeenCalledWith(2);
    
    const stdDevSlider = screen.getByLabelText(/Standard Deviation/);
    fireEvent.change(stdDevSlider, { target: { value: '3' } });
    expect(onStdDevChange).toHaveBeenCalledWith(3);
  });
});

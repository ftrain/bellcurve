import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BellCurveVisualization from '../BellCurveVisualization';

jest.mock('d3', () => ({
  ...jest.requireActual('d3'),
  select: jest.fn(() => ({
    selectAll: jest.fn(() => ({
      remove: jest.fn()
    })),
    append: jest.fn(() => ({
      attr: jest.fn().mockReturnThis(),
      style: jest.fn().mockReturnThis(),
      on: jest.fn().mockReturnThis(),
      call: jest.fn().mockReturnThis()
    }))
  }))
}));

describe('BellCurveVisualization Keyboard Navigation', () => {
  it('responds to keyboard navigation', () => {
    render(<BellCurveVisualization mean={0} stdDev={1} />);
    const overlay = screen.getByRole('application');
    
    expect(overlay).toHaveAttribute('tabindex', '0');
    
    fireEvent.keyDown(overlay, { key: 'ArrowLeft' });
    fireEvent.keyDown(overlay, { key: 'ArrowRight' });
    
    // Verify that the overlay has proper ARIA attributes
    expect(overlay).toHaveAttribute('aria-label', expect.stringContaining('Use arrow keys'));
  });

  it('maintains focus when using keyboard navigation', () => {
    render(<BellCurveVisualization mean={0} stdDev={1} />);
    const overlay = screen.getByRole('application');
    
    overlay.focus();
    expect(document.activeElement).toBe(overlay);
    
    fireEvent.keyDown(overlay, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(overlay);
  });
});

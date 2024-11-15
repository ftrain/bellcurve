import React, { useState } from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
`;

const SliderContainer = styled.div`
  margin: 20px 0;
`;

const SliderLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const SliderValue = styled.span`
  margin-left: 10px;
  color: #666;
`;

const Slider = styled.input`
  width: 100%;
  margin: 10px 0;
`;

interface ControlPanelProps {
  onMeanChange?: (value: number) => void;
  onStdDevChange?: (value: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onMeanChange,
  onStdDevChange
}) => {
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);

  const handleMeanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setMean(value);
    if (onMeanChange) {
      onMeanChange(value);
    }
  };

  const handleStdDevChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setStdDev(value);
    if (onStdDevChange) {
      onStdDevChange(value);
    }
  };

  return (
    <PanelContainer>
      <h2>Controls</h2>
      <SliderContainer>
        <SliderLabel>
          Mean (μ) <SliderValue>{mean.toFixed(2)}</SliderValue>
        </SliderLabel>
        <Slider
          type="range"
          min="-10"
          max="10"
          step="0.1"
          value={mean}
          onChange={handleMeanChange}
        />
      </SliderContainer>
      <SliderContainer>
        <SliderLabel>
          Standard Deviation (σ) <SliderValue>{stdDev.toFixed(2)}</SliderValue>
        </SliderLabel>
        <Slider
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={stdDev}
          onChange={handleStdDevChange}
        />
      </SliderContainer>
    </PanelContainer>
  );
};

export default ControlPanel;

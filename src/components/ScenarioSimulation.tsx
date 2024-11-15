import React, { useState } from 'react';
import styled from 'styled-components';

const SimulationContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin: 15px 0;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid #2196f3;
  border-radius: 4px;
  background: white;
  color: #2196f3;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #2196f3;
    color: white;
  }
`;

const SliderContainer = styled.div`
  margin: 20px 0;
`;

const SliderLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Slider = styled.input`
  width: 100%;
  margin: 10px 0;
`;

interface ScenarioSimulationProps {
  onDataChange: (data: number[]) => void;
}

const ScenarioSimulation: React.FC<ScenarioSimulationProps> = ({ onDataChange }) => {
  const [sampleSize, setSampleSize] = useState(100);

  const generateNormalData = () => {
    // Box-Muller transform to generate normal distribution
    const data = Array.from({ length: sampleSize }, () => {
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      return z;
    });
    onDataChange(data);
  };

  const addOutliers = () => {
    // Generate normal data with outliers
    const data = Array.from({ length: sampleSize }, () => {
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      // 10% chance of generating an outlier
      return Math.random() < 0.1 ? z * 5 : z;
    });
    onDataChange(data);
  };

  const generateBimodal = () => {
    // Generate bimodal distribution
    const data = Array.from({ length: sampleSize }, () => {
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      // Shift half the data points to create two modes
      return Math.random() < 0.5 ? z - 2 : z + 2;
    });
    onDataChange(data);
  };

  const handleSampleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSampleSize(parseInt(e.target.value, 10));
  };

  return (
    <SimulationContainer>
      <h2>Scenario Simulation</h2>
      <SliderContainer>
        <SliderLabel>Sample Size: {sampleSize}</SliderLabel>
        <Slider
          type="range"
          min="10"
          max="1000"
          step="10"
          value={sampleSize}
          onChange={handleSampleSizeChange}
        />
      </SliderContainer>
      <ButtonGroup>
        <Button onClick={generateNormalData}>Normal Distribution</Button>
        <Button onClick={addOutliers}>Add Outliers</Button>
        <Button onClick={generateBimodal}>Bimodal Distribution</Button>
      </ButtonGroup>
    </SimulationContainer>
  );
};

export default ScenarioSimulation;

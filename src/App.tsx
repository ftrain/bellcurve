import React, { useState } from 'react';
import styled from 'styled-components';
import BellCurveVisualization from './components/BellCurveVisualization';
import ControlPanel from './components/ControlPanel';
import SampleDataPanel from './components/SampleDataPanel';
import MisleadingVisualizations from './components/MisleadingVisualizations';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

interface Dataset {
  id: string;
  name: string;
  category: string;
  description: string;
  dataPoints: number[];
  explanation: string;
  source: string;
}

const App: React.FC = () => {
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);
  const [selectedData, setSelectedData] = useState<number[]>([]);

  const handleDatasetSelect = (dataset: Dataset) => {
    setSelectedData(dataset.dataPoints);
    
    // Calculate mean and standard deviation from the dataset
    const dataMean = dataset.dataPoints.reduce((a, b) => a + b, 0) / dataset.dataPoints.length;
    const variance = dataset.dataPoints.reduce((a, b) => a + Math.pow(b - dataMean, 2), 0) / dataset.dataPoints.length;
    const dataStdDev = Math.sqrt(variance);
    
    setMean(dataMean);
    setStdDev(dataStdDev);
  };

  return (
    <AppContainer>
      <Header>Interactive Bell Curve Explorer</Header>
      <ControlPanel 
        onMeanChange={setMean}
        onStdDevChange={setStdDev}
      />
      <SampleDataPanel onDatasetSelect={handleDatasetSelect} />
      <BellCurveVisualization 
        mean={mean}
        stdDev={stdDev}
        data={selectedData}
      />
      <MisleadingVisualizations />
    </AppContainer>
  );
};

export default App;

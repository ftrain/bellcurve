import React, { useState } from 'react';
import styled from 'styled-components';
import BellCurveVisualization from './components/BellCurveVisualization';
import ControlPanel from './components/ControlPanel';
import SampleDataPanel from './components/SampleDataPanel';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 40px;
`;

const App: React.FC = () => {
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);

  return (
    <AppContainer>
      <Header>Interactive Bell Curve Explorer</Header>
      <ControlPanel 
        onMeanChange={setMean}
        onStdDevChange={setStdDev}
      />
      <BellCurveVisualization 
        mean={mean}
        stdDev={stdDev}
      />
      <SampleDataPanel />
    </AppContainer>
  );
};

export default App;

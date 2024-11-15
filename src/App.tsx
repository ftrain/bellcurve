import React from 'react';
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
  return (
    <AppContainer>
      <Header>Interactive Bell Curve Explorer</Header>
      <ControlPanel />
      <BellCurveVisualization />
      <SampleDataPanel />
    </AppContainer>
  );
};

export default App;

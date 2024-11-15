import React from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <h1>Interactive Bell Curve Explorer</h1>
    </AppContainer>
  );
};

export default App;

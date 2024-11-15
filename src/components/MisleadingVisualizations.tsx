import React, { useState } from 'react';
import styled from 'styled-components';
import { Tooltip } from 'react-tooltip';

const Container = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
`;

const ComparisonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
`;

const VisualizationCard = styled.div`
  flex: 1;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  background: #f9f9f9;
`;

const Title = styled.h3`
  color: #333;
  margin-bottom: 15px;
`;

const Description = styled.p`
  color: #666;
  font-size: 0.9em;
  margin: 10px 0;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid #2196f3;
  border-radius: 4px;
  background: white;
  color: #2196f3;
  cursor: pointer;
  margin: 10px 0;
  transition: all 0.2s;

  &:hover {
    background: #2196f3;
    color: white;
  }
`;

const scenarios = [
  {
    id: 'axis_manipulation',
    title: 'Axis Manipulation',
    correct: 'Standard axis scaling shows the true relationship',
    misleading: 'Manipulated axis makes small differences look dramatic',
    explanation: 'Changing axis scales can make small differences appear more significant than they are, leading to misinterpretation of data trends.'
  },
  {
    id: 'sample_size',
    title: 'Small Sample Size',
    correct: 'Large sample size (n=1000) shows true distribution',
    misleading: 'Small sample size (n=10) gives misleading picture',
    explanation: 'Small sample sizes can lead to unreliable conclusions about the underlying population distribution.'
  },
  {
    id: 'cherry_picking',
    title: 'Cherry-Picked Data',
    correct: 'Complete dataset shows actual trends',
    misleading: 'Selected data points suggest different pattern',
    explanation: 'Selecting specific data points while ignoring others can create a false narrative that doesn\'t represent the true relationship.'
  }
];

const MisleadingVisualizations: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const nextScenario = () => {
    setCurrentScenario((prev) => (prev + 1) % scenarios.length);
    setShowExplanation(false);
  };

  return (
    <Container>
      <h2>Misleading Visualizations</h2>
      <Description>
        Learn to identify common visualization mistakes and misrepresentations of data.
      </Description>
      
      <ComparisonContainer>
        <VisualizationCard>
          <Title>Correct Visualization</Title>
          <Description>{scenarios[currentScenario].correct}</Description>
        </VisualizationCard>
        
        <VisualizationCard>
          <Title>Misleading Visualization</Title>
          <Description>{scenarios[currentScenario].misleading}</Description>
        </VisualizationCard>
      </ComparisonContainer>

      <Button 
        onClick={() => setShowExplanation(true)}
        data-tooltip-id="explanation-tooltip"
        data-tooltip-content={scenarios[currentScenario].explanation}
      >
        Learn Why
      </Button>
      
      <Button onClick={nextScenario}>
        Next Example
      </Button>

      <Tooltip id="explanation-tooltip" place="bottom" />
    </Container>
  );
};

export default MisleadingVisualizations;

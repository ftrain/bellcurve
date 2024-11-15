import React from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
`;

interface ControlPanelProps {
  onMeanChange?: (value: number) => void;
  onStdDevChange?: (value: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onMeanChange,
  onStdDevChange
}) => {
  return (
    <PanelContainer>
      <h2>Controls</h2>
      {/* Sliders and controls will be implemented here */}
    </PanelContainer>
  );
};

export default ControlPanel;

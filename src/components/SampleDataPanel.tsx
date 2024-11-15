import React from 'react';
import styled from 'styled-components';

const DataPanelContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
`;

interface SampleDataPanelProps {
  onDatasetSelect?: (dataset: any) => void;
}

const SampleDataPanel: React.FC<SampleDataPanelProps> = ({
  onDatasetSelect
}) => {
  return (
    <DataPanelContainer>
      <h2>Sample Datasets</h2>
      {/* Dataset selector will be implemented here */}
    </DataPanelContainer>
  );
};

export default SampleDataPanel;

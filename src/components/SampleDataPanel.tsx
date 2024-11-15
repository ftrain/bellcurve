import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DataPanelContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const DataInfo = styled.div`
  margin-top: 15px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
`;

const Description = styled.p`
  color: #666;
  margin: 10px 0;
`;

const Source = styled.div`
  font-size: 0.9em;
  color: #888;
  margin-top: 10px;
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

interface SampleDataPanelProps {
  onDatasetSelect?: (dataset: Dataset) => void;
}

const SampleDataPanel: React.FC<SampleDataPanelProps> = ({
  onDatasetSelect
}) => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(process.env.PUBLIC_URL + '/samples.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDatasets(data);
      } catch (error) {
        setError('Failed to load datasets. Please try again later.');
        console.error('Error loading datasets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDatasetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = datasets.find(d => d.id === e.target.value);
    if (selected) {
      setSelectedDataset(selected);
      if (onDatasetSelect) {
        onDatasetSelect(selected);
      }
    }
  };

  return (
    <DataPanelContainer>
      <h2>Sample Datasets</h2>
      {isLoading && <div aria-live="polite">Loading datasets...</div>}
      {error && <div role="alert" style={{ color: 'red' }}>{error}</div>}
      <Select 
        onChange={handleDatasetChange} 
        value={selectedDataset?.id || ''}
        disabled={isLoading}
        aria-label="Select a dataset to visualize"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.click();
          }
        }}
>
        <option value="">Select a dataset...</option>
        {datasets.map(dataset => (
          <option key={dataset.id} value={dataset.id}>
            {dataset.name} ({dataset.category})
          </option>
        ))}
      </Select>

      {selectedDataset && (
        <DataInfo>
          <Description>{selectedDataset.description}</Description>
          <Description>{selectedDataset.explanation}</Description>
          <Source>Source: {selectedDataset.source}</Source>
        </DataInfo>
      )}
    </DataPanelContainer>
  );
};

export default SampleDataPanel;

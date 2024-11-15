import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const ChartContainer = styled.div`
  width: 100%;
  height: 200px;
  margin: 10px 0;
`;

interface MisleadingVisualizationChartProps {
  type: 'correct' | 'misleading';
  scenario: string;
  data: number[];
}

const MisleadingVisualizationChart: React.FC<MisleadingVisualizationChartProps> = ({
  type,
  scenario,
  data
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = svgRef.current.clientHeight - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    switch (scenario) {
      case 'axis_manipulation':
        renderAxisManipulation(svg, width, height, type);
        break;
      case 'sample_size':
        renderSampleSize(svg, width, height, type);
        break;
      case 'cherry_picking':
        renderCherryPicking(svg, width, height, type);
        break;
    }
  }, [type, scenario, data]);

  const renderAxisManipulation = (svg: d3.Selection<SVGGElement, unknown, null, undefined>, width: number, height: number, type: string) => {
    const data = [10, 10.2, 10.1, 10.3, 10.2, 10.4];
    
    const x = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain(type === 'misleading' ? [9.9, 10.5] : [0, 15])
      .range([height, 0]);

    const line = d3.line<number>()
      .x((d, i) => x(i))
      .y(d => y(d));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#2196f3')
      .attr('stroke-width', 2)
      .attr('d', line);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  };

  const renderSampleSize = (svg: d3.Selection<SVGGElement, unknown, null, undefined>, width: number, height: number, type: string) => {
    const data = type === 'correct' 
      ? Array.from({ length: 1000 }, () => d3.randomNormal(0, 1)())
      : Array.from({ length: 10 }, () => d3.randomNormal(0, 1)());

    const x = d3.scaleLinear()
      .domain([-4, 4])
      .range([0, width]);

    const histogram = d3.bin()
      .domain([-4, 4])
      .thresholds(x.ticks(20));

    const bins = histogram(data);
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length) || 0])
      .range([height, 0]);

    svg.selectAll('rect')
      .data(bins)
      .join('rect')
      .attr('x', d => x(d.x0 || 0))
      .attr('width', d => Math.max(0, x(d.x1 || 0) - x(d.x0 || 0) - 1))
      .attr('y', d => y(d.length))
      .attr('height', d => height - y(d.length))
      .attr('fill', '#2196f3');

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  };

  const renderCherryPicking = (svg: d3.Selection<SVGGElement, unknown, null, undefined>, width: number, height: number, type: string) => {
    const fullData = [2, 4, 3, 5, 4, 6, 5, 7, 6, 8];
    const cherryPickedData = [2, 4, 3, 5, 4];
    
    const data = type === 'correct' ? fullData : cherryPickedData;

    const x = d3.scaleLinear()
      .domain([0, type === 'correct' ? 9 : 4])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, 10])
      .range([height, 0]);

    const line = d3.line<number>()
      .x((d, i) => x(i))
      .y(d => y(d));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#2196f3')
      .attr('stroke-width', 2)
      .attr('d', line);

    svg.selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d, i) => x(i))
      .attr('cy', d => y(d))
      .attr('r', 4)
      .attr('fill', '#2196f3');

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  };

  return (
    <ChartContainer>
      <svg ref={svgRef} width="100%" height="100%" />
    </ChartContainer>
  );
};

export default MisleadingVisualizationChart;

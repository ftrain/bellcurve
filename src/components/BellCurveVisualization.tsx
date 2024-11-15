import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const VisualizationContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 20px 0;
`;

interface BellCurveVisualizationProps {
  mean?: number;
  stdDev?: number;
  data?: number[];
}

const BellCurveVisualization: React.FC<BellCurveVisualizationProps> = ({
  mean = 0,
  stdDev = 1,
  data = []
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Set up dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = svgRef.current.clientHeight - margin.top - margin.bottom;

    // Create the SVG container
    const svg = d3.select(svgRef.current)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up scales
    const xScale = d3.scaleLinear()
      .domain([mean - 4 * stdDev, mean + 4 * stdDev])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, 1 / (stdDev * Math.sqrt(2 * Math.PI))])
      .range([height, 0]);

    // Generate bell curve points
    const points = d3.range(100).map(i => {
      const x = xScale.domain()[0] + (i / 99) * (xScale.domain()[1] - xScale.domain()[0]);
      const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * 
                Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)));
      return { x, y };
    });

    // Create the line generator
    const line = d3.line<{ x: number; y: number }>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveBasis);

    // Add the bell curve path
    svg.append('path')
      .datum(points)
      .attr('fill', 'none')
      .attr('stroke', '#2196f3')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append('g')
      .call(d3.axisLeft(yScale));

    // Add grid lines
    svg.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisBottom(xScale)
        .tickSize(height)
        .tickFormat(() => '')
      );

    // Add standard deviation markers
    [-2, -1, 0, 1, 2].forEach(n => {
      const x = xScale(mean + n * stdDev);
      svg.append('line')
        .attr('x1', x)
        .attr('x2', x)
        .attr('y1', height)
        .attr('y2', 0)
        .attr('stroke', '#666')
        .attr('stroke-dasharray', '4,4')
        .attr('opacity', 0.5);
      
      svg.append('text')
        .attr('x', x)
        .attr('y', height + 20)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .text(`${n}σ`);
    });

    // Add data points if available
    if (data && data.length > 0) {
      const histogram = d3.histogram()
        .domain(xScale.domain())
        .thresholds(xScale.ticks(30))
        .value(d => d);

      const bins = histogram(data);
      const maxBinLength = d3.max(bins, d => d.length) || 0;

      const yScaleHistogram = d3.scaleLinear()
        .domain([0, maxBinLength])
        .range([height, height * 0.7]);

      svg.selectAll('rect')
        .data(bins)
        .join('rect')
        .attr('x', d => xScale(d.x0 || 0))
        .attr('y', d => yScaleHistogram(d.length))
        .attr('width', d => Math.max(0, xScale(d.x1 || 0) - xScale(d.x0 || 0) - 1))
        .attr('height', d => height - yScaleHistogram(d.length))
        .attr('fill', '#2196f3')
        .attr('opacity', 0.3);
    }

  }, [mean, stdDev, data]);

  return (
    <VisualizationContainer>
      <svg ref={svgRef} width="100%" height="100%" />
    </VisualizationContainer>
  );
};

export default BellCurveVisualization;

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { Tooltip } from 'react-tooltip';

// Error function approximation for calculating normal distribution percentages
const erf = (x: number): number => {
  const t = 1.0 / (1.0 + 0.5 * Math.abs(x));
  const tau = t * Math.exp(-x * x - 1.26551223 +
    t * (1.00002368 +
      t * (0.37409196 +
        t * (0.09678418 +
          t * (-0.18628806 +
            t * (0.27886807 +
              t * (-1.13520398 +
                t * (1.48851587 +
                  t * (-0.82215223 +
                    t * 0.17087277)))))))))
  return x >= 0 ? 1 - tau : tau - 1;
};

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

    // Create the SVG container and clip path
    const svg = d3.select(svgRef.current)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add clip path
    svg.append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', width)
      .attr('height', height);

    // Create a group for the visualization that will be zoomed
    const vizGroup = svg.append('g')
      .attr('clip-path', 'url(#clip)');

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

    // Add the bell curve path with tooltip area
    vizGroup.append('path')
      .datum(points)
      .attr('class', 'curve')
      .attr('fill', 'none')
      .attr('stroke', '#2196f3')
      .attr('stroke-width', 2)
      .attr('d', line)
      .attr('role', 'graphics-document')
      .attr('aria-label', 'Bell curve visualization');

    // Add invisible overlay for tooltips and touch interactions
    const overlay = vizGroup.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .attr('aria-hidden', 'true')
      .attr('tabindex', 0)
      .attr('role', 'application')
      .attr('aria-label', 'Bell curve interaction area. Use arrow keys to explore data points.');

    // Add tooltip element
    const tooltip = vizGroup.append('g')
      .attr('class', 'tooltip')
      .style('display', 'none');

    tooltip.append('circle')
      .attr('r', 4)
      .attr('fill', '#2196f3');

    tooltip.append('text')
      .attr('x', 9)
      .attr('dy', '.35em')
      .attr('font-size', '12px');

    // Handle mouse events
    const handleMove = (event: any) => {
      const [mouseX] = d3.pointer(event);
      const x = xScale.invert(mouseX);
      const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * 
                Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)));
      
      // Calculate percentile
      const zscore = (x - mean) / stdDev;
      const percentile = (1 + erf(zscore / Math.sqrt(2))) / 2 * 100;

      tooltip.style('display', null)
        .attr('transform', `translate(${xScale(x)},${yScale(y)})`);
      
      tooltip.select('text')
        .text(`Value: ${x.toFixed(2)}, Percentile: ${percentile.toFixed(1)}%`);
    });

    // Handle mouse events
    overlay
      .on('mousemove', handleMove)
      .on('touchmove', (event) => {
        event.preventDefault();
        const touch = event.touches[0];
        const node = overlay.node();
        if (node) {
          const rect = node.getBoundingClientRect();
          const x = touch.clientX - rect.left;
          handleMove({ offsetX: x });
        }
      })
      .on('mouseout touchend', () => {
        tooltip.style('display', 'none');
      })
      .on('keydown', (event) => {
        const step = width / 50;
        let newX = xScale.invert(parseFloat(tooltip.attr('transform').split('(')[1]));
        
        switch (event.key) {
          case 'ArrowLeft':
            newX -= stdDev / 10;
            break;
          case 'ArrowRight':
            newX += stdDev / 10;
            break;
          default:
            return;
        }
        
        event.preventDefault();
        handleMove({ offsetX: xScale(newX) });
      });

    // Add x-axis
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale) as any);

    // Add y-axis
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale) as any);

    // Add grid lines
    svg.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisBottom(xScale)
        .tickSize(height)
        .tickFormat(() => '')
      );

    // Add standard deviation shading and markers
    [-2, -1, 0, 1, 2].forEach(n => {
      const x = xScale(mean + n * stdDev);
      
      // Add shading between standard deviations
      if (n < 2) {
        const areaPoints = points.filter(p => 
          p.x >= mean + n * stdDev && 
          p.x <= mean + (n + 1) * stdDev
        );
        
        const area = d3.area<{ x: number; y: number }>()
          .x(d => xScale(d.x))
          .y0(height)
          .y1(d => yScale(d.y));

        vizGroup.append('path')
          .datum(areaPoints)
          .attr('fill', '#2196f3')
          .attr('opacity', 0.1 * (3 - Math.abs(n)))
          .attr('d', area);
      }

      // Add vertical lines
      vizGroup.append('line')
        .attr('x1', x)
        .attr('x2', x)
        .attr('y1', height)
        .attr('y2', 0)
        .attr('stroke', '#666')
        .attr('stroke-dasharray', '4,4')
        .attr('opacity', 0.5)
        .attr('data-tooltip-id', 'sd-tooltip')
        .attr('data-tooltip-content', `${Math.abs(n)}σ: ${(erf(Math.abs(n)/Math.sqrt(2)) * 100).toFixed(1)}% of data`);
      
      svg.append('text')
        .attr('x', x)
        .attr('y', height + 20)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .text(`${n}σ`);
    });

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 5])
      .on('zoom', (event) => {
        // Only update x-scale, keeping y-scale fixed
        const newXScale = event.transform.rescaleX(xScale);
        
        // Update visualization using the new x-scale but keeping original y-scale
        const updatedLine = d3.line<{ x: number; y: number }>()
          .x(d => newXScale(d.x))
          .y(d => yScale(d.y))
          .curve(d3.curveBasis);

        vizGroup.selectAll('path.curve')
          .attr('d', (d: any) => updatedLine(d));

        // Update x-axis only
        svg.select('.x-axis').call(d3.axisBottom(newXScale) as any);
        
        // Update grid lines
        svg.select('.grid')
          .call(d3.axisBottom(newXScale)
            .tickSize(height)
            .tickFormat(() => '') as any
          );
      });

    d3.select(svgRef.current)
      .call(zoom);

    // Add data points if available
    if (data && data.length > 0) {
      const [min, max] = xScale.domain();
      const histogram = d3.bin()
        .domain([min, max])
        .thresholds(30);

      const bins = histogram(data);
      const maxBinLength = d3.max(bins, d => d.length) || 0;

      const yScaleHistogram = d3.scaleLinear()
        .domain([0, maxBinLength])
        .range([height, height * 0.7]);

      vizGroup.selectAll('rect')
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
      <svg 
        ref={svgRef} 
        width="100%" 
        height="100%"
        role="img"
        aria-label="Interactive bell curve visualization showing normal distribution"
      >
        <title>Bell Curve Visualization</title>
        <desc>
          An interactive visualization of a normal distribution with adjustable mean and standard deviation.
          Shows the probability density function and allows zooming and panning.
        </desc>
      </svg>
      <Tooltip id="sd-tooltip" place="top" />
    </VisualizationContainer>
  );
};

export default BellCurveVisualization;

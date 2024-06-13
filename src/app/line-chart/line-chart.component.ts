import {AfterViewInit, Component} from '@angular/core';
import * as d3 from 'd3'
import * as $ from 'jquery';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements AfterViewInit {
  data = [
    {session: 'Session 1', weight: 80, good: 80, better: 80, best: 80, end: 80},
    {session: 'Session 2', weight: 60, good: 75, better: 70, best: 60, end: 40, isImputed: true},
    {session: 'Session 3', weight: 69, good: 65, better: 50, best: 40, end: 0},
    {session: 'Session 4', weight: 60, good: 45, better: 30, best: 20, end: 0},
    {session: 'Session 5', weight: 62, good: 45, better: 30, best: 20, end: 0},
  ];

  colorMap = {
    weight: '#000',
  }

  legend = [
    {name: 'Weight', color: '#F9D949'}
  ]

  svg: any;
  margins = {
    top: 10,
    right: 10,
    bottom: 50,
    left: 20,
  };
  width = 100;
  height = 100;


  ngAfterViewInit() {
    this.width = $('#bar').width();
    this.height = $('#bar').height();

    this.createChart();

  }

  createChart() {
    this.svg = d3.select("#line")
      .append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
      .attr('viewBox', `-${this.margins.left + this.margins.right}, -10, ${this.width}, ${this.height + this.margins.top + this.margins.bottom}`)
      .attr('preserveAspectRatio', 'xMinYMin')
      .append("g")

    // Create the X-axis band scale
    const x = d3.scalePoint()
      .domain(this.data.map((d: any) => d.session))
      .range([0, this.width])

    // Create the Y-axis band scale

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.data, (d) => d.weight + 20)])
      .range([this.height, 0]);

    // Create tooltip
    const tooltip = d3.select('#bar').append('div')
      .attr('class', 'tooltip hidden')
      .style('position', 'absolute')

    const line = d3.line()
      .x((d: any) => x(String(d.session)))
      .y((d: any) => y(d.weight))
      .curve(d3.curveMonotoneX)

    this.svg.append("path")
      .datum(this.data)
      .attr("class", "line")
      .attr("d", d3.area()
        .x((d: any) => x(String(d.session)))
        .y0(y(0))
        .y1((d: any) => y(d.good))
      )
      .style("fill", "#bbbbef")

    this.svg.append("path")
      .datum(this.data)
      .attr("class", "line")
      .attr("d", d3.area()
        .x((d: any) => x(String(d.session)))
        .y0(y(0))
        .y1((d: any) => y(d.better))
      )
      .style("fill", "#a7d8a7")

    this.svg.append("path")
      .datum(this.data)
      .attr("class", "line")
      .attr("d", d3.area()
        .x((d: any) => x(String(d.session)))
        .y0(y(0))
        .y1((d: any) => y(d.best))
      )
      .style("fill", "#e2bbbb")

    this.svg.append("path")
      .datum(this.data)
      .attr("class", "line")
      .attr("d", d3.area()
        .x((d: any) => x(String(d.session)))
        .y0(y(0))
        .y1((d: any) => y(d.end))
      )
      .style("fill", "#FFFFFF")

    this.svg.append("path")
      .datum(this.data)
      .attr("class", "line")
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", this.colorMap.weight)
      .style("stroke-width", "2");


    this.svg.append('g')
      .selectAll("dot")
      .data(this.data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.session))
      .attr("cy", function (d) {
        return y(d.weight);
      })
      .attr("r", 4)
      .style("fill", (d) => d.isImputed ? '#FFFFFF' : this.colorMap.weight)
      .style("stroke", (d) => d.isImputed ? this.colorMap.weight : 'none')
      .style("stroke-width", (d) => d.isImputed ? 2 : 0)
      .on("mousemove", (e, d, i) => {
        tooltip
          .style("left", e.layerX + 15 + "px")
          .style("top", e.layerY + "px");
      })
      .on('mouseover', (e, d, i) => {
        tooltip.attr('class', 'tooltip');
        tooltip.html(`
            <table>
              <thead>
                <th colspan="2">
                  ${d.session}
                </th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Red Lights
                  </td>
                  <td>
                    ${d.weight}
                  </td>
                </tr>
                <tr>
                  <td>
                    Target
                  </td>
                  <td>
                    ${d.target}
                  </td>
                </tr>
              </tbody>
            </table>
        `)
      })
      .on('mouseout', () => tooltip.attr('class', 'tooltip hidden'));

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      // .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "center")
      .call(function (t) {
        t.each(function (d) { // for each one
          const self = d3.select(this);
          const s = self.text().split(' ');  // get the text and split it
          self.text(''); // clear it out
          s.forEach((d, i) => {
            self.append("tspan")
              .attr("x", 0)
              .attr("dy", "1em")
              .text(s[i]);
          })
        })
      })

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Add one dot in the legend for each name.
    this.svg.selectAll("legendMarkers")
      .data(this.legend)
      .enter()
      .append("circle")
      .attr("cx", this.width - 10)
      .attr("cy", (d, i) => ((this.height / 2) - (this.legend.length * 12.5)) + i * 25)
      .attr("r", 7)
      .style("fill", (d) => d.color)

    // Add one dot in the legend for each name.
    this.svg.selectAll("legendLabels")
      .data(this.legend)
      .enter()
      .append("text")
      .attr("x", this.width + 10)
      .attr("y", (d, i) => ((this.height / 2) - (this.legend.length * 12.5)) + i * 25)
      .style("fill", (d) => d.color)
      .text(function (d) {
        return d.name
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")

  }
}

import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as d3 from 'd3'
import * as $ from 'jquery';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit {
  data = [
    {session: 'Session 1', redLine: 23, target: 55},
    {session: 'Session 2', redLine: 43, target: 33},
    {session: 'Session 3', redLine: 54, target: 67},
    {session: 'Session 4', redLine: 65, target: 32},
    {session: 'Session 5', redLine: 75, target: 75},
  ];

  colorMap = {
    redLine: '#F9D949',
    target: '#3C486B'
  }

  legend = [
    {name: 'Marks', color: '#F9D949'},
    {name: 'Red Line', color: '#3C486B'},

  ]

  svg: any;
  margins = {
    top: 10,
    right: 0,
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
    this.svg = d3.select("#bar")
      .append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
      .attr('viewBox', `-${this.margins.left + this.margins.right}, -10, ${this.width}, ${this.height + this.margins.top + this.margins.bottom}`)
      .attr('preserveAspectRatio', 'xMinYMin')
      .append("g")

    // Create the X-axis band scale
    const x = d3.scaleBand()
      .rangeRound([0, this.width])
      .domain(this.data.map((d: any) => d.session))
      .padding(0.5)

    // Create the Y-axis band scale

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.data, (d) => Math.max(d.redLine, d.target))])
      .rangeRound([this.height, 0]);

    // Create tooltip
    const tooltip = d3.select('#bar').append('div')
      .attr('class', 'tooltip hidden')
      .style('position', 'absolute')
    // .style('background-color', 'green');

    // Create and fill the bars
    const selector = this.svg.selectAll(".bar")
      .data(this.data)
      .enter()

    selector.append("rect")
      .attr("x", (d: any) => x(d.session))
      .attr("y", (d: any) => y(d.marks))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.marks))
      .attr("fill", this.colorMap.redLine)
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
                    ${d.marks}
                  </td>
                </tr>
                <tr>
                  <td>
                    Target
                  </td>
                  <td>
                    ${d.goal}
                  </td>
                </tr>
              </tbody>
            </table>
        `)
      })
      .on('mouseout', () => tooltip.attr('class', 'tooltip hidden'));


    selector.append("path")
      .style("stroke", this.colorMap.target)
      .style("stroke-width", 2)
      .attr("d", function (d) {
        let rv = "M" + x(d.session) + "," + y(d.goal);
        rv += "L" + (x(d.session) + x.bandwidth()) + "," + y(d.goal);
        return rv;
      });


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

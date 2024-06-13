import {AfterViewInit, Component} from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'c3js-project';

  ngAfterViewInit() {
    c3.generate(
      {
        bindto: '#chart',
        data: {
          json: [{name: 'Abhijit', mathsMarks: 84, scienceMarks: 43},
            {name: 'Preshit', mathsMarks: 47, scienceMarks: 90},
            {name: 'Ameya', mathsMarks: 56, scienceMarks: 35},
            {name: 'Naval', mathsMarks: 51, scienceMarks: 98},
            {name: 'Pratik', mathsMarks: 4, scienceMarks: 46},
            {name: 'Monali', mathsMarks: 35, scienceMarks: 96},
            {name: 'Pravin', mathsMarks: 91, scienceMarks: 72},
            {name: 'Yash', mathsMarks: 70, scienceMarks: 89},
            {name: 'Swati', mathsMarks: 80, scienceMarks: 78},
            {name: 'Dhiraj', mathsMarks: 90, scienceMarks: 23},
          ],
          keys: {
            x: 'name',
            value: ['mathsMarks', 'scienceMarks']
          },
          names: {
            mathsMarks: 'Maths',
            scienceMarks: 'Science'
          },
          type: 'bar',
          groups: [
            ['mathsMarks', 'scienceMarks']
          ],
          colors: {
            mathsMarks: '#00bbff',
            scienceMarks: '#f60606',
          }
        },
        point: {
          show: true
        },
        axis: {
          x: {
            type: "category"
          },
          y: {
            min: 0,
            max: 100,
            padding: {top: 0, bottom: 0}
          }
        }
      }
    )
    c3.generate(
      {
        bindto: '#screen-chart1',
        data: {
          json: [{date: '2013-01-01', screenTime: 360},
            {date: '2013-01-02', screenTime: 115},
            {date: '2013-01-03', screenTime: 120},
            {date: '2013-01-04', screenTime: 110},
            {date: '2013-01-05', screenTime: 180},
            {date: '2013-01-06', screenTime: 120},
            {date: '2013-01-07', screenTime: 300},
          ],
          keys: {
            x: 'date',
            value: ['screenTime']
          },
          names: {
            screenTime: 'Screen Time (Min)',
          },
          type: 'bar',

          colors: {
            screenTime: '#fdca00',
          }
        },
        point: {
          show: true
        },
        axis: {
          x: {
            type: "timeseries",
            tick: {
              format: '%Y-%m-%d'
            },
            label: 'DAYS'
          },
          y: {
            min: 0,
            max: 1440,
            padding: {top: 0, bottom: 0},
            label: 'MINUTES'
          }
        },
        grid: {
          y: {
            lines: [{value: 120, text: 'ST GOAL', class: 'target-line'}]
          }
        }
      }
    )

    c3.generate(
      {
        bindto: '#screen-chart2',
        data: {
          json: [{
            sessionName: 'Session-1',
            day1Screentime: 360,
            day2Screentime: 300,
            day3Screentime: 260,
            day4Screentime: 160,
            day5Screentime: 230,
            day6Screentime: 460,
            day7Screentime: 60,
          },
            {
              sessionName: 'Session-2',
              day1Screentime: 60,
              day2Screentime: 230,
              day3Screentime: 360,
              day4Screentime: 160,
              day5Screentime: 360,
              day6Screentime: 460,
              day7Screentime: 300,
            },
            {
              sessionName: 'Session-3',
              day1Screentime: 230,
              day2Screentime: 360,
              day3Screentime: 460,
              day4Screentime: 160,
              day5Screentime: 230,
              day6Screentime: 360,
              day7Screentime: 360,
            },
            {
              sessionName: 'Session-4',
              day1Screentime: 360,
              day2Screentime: 300,
              day3Screentime: 260,
              day4Screentime: 160,
              day5Screentime: 230,
              day6Screentime: 460,
              day7Screentime: 60,
            },
            {
              sessionName: 'Session-5',
              day1Screentime: 60,
              day2Screentime: 230,
              day3Screentime: 360,
              day4Screentime: 160,
              day5Screentime: 360,
              day6Screentime: 460,
              day7Screentime: 300,
            },
            {
              sessionName: 'Session-6',
              day1Screentime: 230,
              day2Screentime: 360,
              day3Screentime: 460,
              day4Screentime: 160,
              day5Screentime: 230,
              day6Screentime: 360,
              day7Screentime: 360,
            },
            {
              sessionName: 'Session-7',
              day1Screentime: 360,
              day2Screentime: 300,
              day3Screentime: 260,
              day4Screentime: 160,
              day5Screentime: 230,
              day6Screentime: 460,
              day7Screentime: 60,
            },
          ],
          keys: {
            x: 'sessionName',
            value: ['day1Screentime', 'day2Screentime', 'day3Screentime', 'day4Screentime', 'day5Screentime', 'day6Screentime', 'day7Screentime']
          },
          names: {
            day1Screentime: 'Day 1 Screentime',
            day2Screentime: 'Day 2 Screentime',
            day3Screentime: 'Day 3 Screentime',
            day4Screentime: 'Day 4 Screentime',
            day5Screentime: 'Day 5 Screentime',
            day6Screentime: 'Day 6 Screentime',
            day7Screentime: 'Day 7 Screentime',
          },
          type: 'bar',
          // groups: [
          //   ['day1Screentime', 'day2Screentime', 'day3Screentime', 'day4Screentime', 'day5Screentime', 'day6Screentime', 'day7Screentime']
          // ],
          order: null,
          colors: {
            day1Screentime: '#ffb3ba',
            day2Screentime: '#ffdfba',
            day3Screentime: '#ffffba',
            day4Screentime: '#baffc9',
            day5Screentime: '#bae1ff',
            day6Screentime: 'violet',
            day7Screentime: '#e6bd57',
          }
        },
        point: {
          show: true
        },
        axis: {
          x: {
            type: "category",
            label: 'Sessions'
          },
          y: {
            min: 0,
            max: 500,
            padding: {top: 0, bottom: 0},
            label: 'MINUTES'
          }
        },
        grid: {
          y: {
            lines: [{value: 840, text: 'ST GOAL'}],
          }
        }
      }
    )
  }
}

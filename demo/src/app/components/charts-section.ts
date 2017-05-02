import { Component } from '@angular/core';

@Component({
  selector: 'charts-section',
  templateUrl:'charts-section.html'
})

export class ChartsSectionComponent {
  public name: string = 'Charts';
  public src: string = 'https://github.com/valor-software/ng2-charts/blob/master/components/charts/charts.ts';
  public desc: any = {
    lineChart: {
      heading: 'Processing Line chart',
      id: 'lineChart',
      ts: require('!!raw-loader?lang=typescript!./charts/line-chart-demo.ts'),
      html: require('!!raw-loader?lang=markup!./charts/line-chart-demo.html')
    },
    barChart: {
      heading: 'Bar Chart',
      id: 'barChart',
      ts: require('!!raw-loader?lang=typescript!./charts/bar-chart-demo.ts'),
      html: require('!!raw-loader?lang=markup!./charts/bar-chart-demo.html')
    },
    douChart: {
      heading: 'Doughnut Chart',
      id: 'doughnutChart',
      ts: require('!!raw-loader?lang=typescript!./charts/doughnut-chart-demo.ts'),
      html: require('!!raw-loader?lang=markup!./charts/doughnut-chart-demo.html')
    },
    radarChart: {
      heading: 'Radar Chart',
      id: 'radarChart',
      ts: require('!!raw-loader?lang=typescript!./charts/radar-chart-demo.ts'),
      html: require('!!raw-loader?lang=markup!./charts/radar-chart-demo.html')

    },
    pieChart: {
      heading: 'Pie Chart',
      id: 'pieChart',
      ts: require('!!raw-loader?lang=typescript!./charts/pie-chart-demo.ts'),
      html: require('!!raw-loader?lang=markup!./charts/pie-chart-demo.html')
    },
    polarChart: {
      heading: 'Polar Area Chart',
      id: 'polarAreaChart',
      ts: require('!!raw-loader?lang=typescript!./charts/polar-area-chart-demo.ts'),
      html: require('!!raw-loader?lang=markup!./charts/polar-area-chart-demo.html')
    },
    baseChart: {
      heading: 'Dynamic Chart',
      id: 'baseChart',
      ts: require('!!raw-loader?lang=typescript!./charts/base-chart-demo.ts'),
      html: require('!!raw-loader?lang=markup!./charts/base-chart-demo.html')
    }
  };
}

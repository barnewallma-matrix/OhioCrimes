declare var am4core: any;
declare var am4charts: any;

class Weapons {
  private chart: any;
  private isPercent: boolean;
  private series: any = [
    { field: 'firearms', name: 'Firearms', color: '#0088FF' },
    { field: 'knives', name: 'Knives', color: '#00FF00' },
    { field: 'otherWeapons', name: 'Other weapons', color: '#808080' },
    { field: 'unarmed', name: 'Hands, fists, feet, etc.', color: '#FF0000' }
  ];

  public constructor(id: string) {
    this.chart = am4core.create(id, am4charts.XYChart);
    this.isPercent = document.getElementById(id).hasAttribute('data-is-percent');

    this.createXAxis();
    this.createYAxis();
    this.addLegend();
    for (var i = 0; i < this.series.length; i++) {
      var series = this.series[i];
      this.createSeries(series.field, series.name, series.color);
    }

    this.loadData(id);
  }

  private createXAxis(): void {
    var axis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    axis.dataFields.category = 'crime';
    axis.renderer.grid.template.location = 0;
  }

  private createYAxis(): void {
    var axis = this.chart.yAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    if (this.isPercent)
      axis.renderer.labels.template.adapter.add("text", (text, label) => label.dataItem.value + "%");
  }

  private addLegend(): void {
    var legend = new am4charts.Legend();
    legend.position = 'right';
    this.chart.legend = legend
  }

  private createSeries(field: string, name: string, color: string): void {
    var series = this.chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.fill = am4core.color(color);
    series.stroke = am4core.color(color);
    series.dataFields.valueY = field;
    series.dataFields.categoryX = 'crime';
    series.sequencedInterpolation = true;
    series.stacked = true;
    series.columns.template.width = am4core.percent(60);
    series.cursorTooltipEnabled = false;
    series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}" + (this.isPercent ? '%' : '');
  }

  private loadData(id: string) {
    var element = document.getElementById(id);
    var chart = this.chart;

    fetch(element.getAttribute('data-url'))
      .then(res => res.json())
      .then(out => {
        if (out.error)
          alert(out.error);
        else {
          chart.data = out;
          chart.invalidateData();
        }
      });
  }
}

new Weapons('chartdiv');
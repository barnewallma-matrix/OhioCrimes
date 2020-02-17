declare var am4core: any;
declare var am4charts: any;

class Crimes {
  private chart: any;
  private series: any = [
    { field: 'murder', name: 'Murder' },
    { field: 'rape', name: 'Rape' },
    { field: 'robbery', name: 'Robbery' },
    { field: 'aggravatedAssault', name: 'Aggravated Assault' },
    { field: 'propertyCrime', name: 'Property Crime' },
    { field: 'burglary', name: 'Burglary' },
    { field: 'larceny', name: 'Larceny' },
    { field: 'motorVehicleTheft', name: 'Motor Vehicle Theft' },
    { field: 'arson', name: 'Arson' },
    { field: 'violentCrime', name: 'Violent Crime' }
  ];

  public constructor(id: string) {
    this.chart = am4core.create(id, am4charts.XYChart);

    this.createXAxis();
    this.createYAxis();
    this.addZoomControl();
    this.addLegend();
    for (var i = 0; i < this.series.length; i++) {
      var series = this.series[i];
      this.createSeries(series.field, series.name);
    }

    this.loadData(id);
  }

  private createXAxis(): void {
    var axis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    axis.dataFields.category = 'city';
    axis.renderer.grid.template.location = 0;
  }

  private createYAxis(): void {
    var axis = this.chart.yAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
  }

  private addZoomControl(): void {
    var zoom = new am4core.Scrollbar();
    zoom.showSystemTooltip = false;
    this.chart.scrollbarX = zoom;

    var cursor = new am4charts.XYCursor();
    cursor.behavior = "zoomX";
    cursor.lineY.disabled = true;
    cursor.showTooltipOn = 'hit';
    this.chart.cursor = cursor;
  }

  private addLegend(): void {
    var legend = new am4charts.Legend();
    legend.position = 'right';
    this.chart.legend = legend
  }

  private createSeries(field: string, name: string): void {
    var series = this.chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = 'city';
    series.sequencedInterpolation = true;
    series.stacked = true;
    series.columns.template.width = am4core.percent(60);
    series.cursorTooltipEnabled = false;
    series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
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

new Crimes('chartdiv');
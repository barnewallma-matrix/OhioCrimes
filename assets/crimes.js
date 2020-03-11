var Crimes = /** @class */ (function () {
    function Crimes(id) {
        this.series = [
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
    Crimes.prototype.createXAxis = function () {
        var axis = this.chart.xAxes.push(new am4charts.CategoryAxis());
        axis.dataFields.category = 'city';
        axis.renderer.grid.template.location = 0;
    };
    Crimes.prototype.createYAxis = function () {
        var axis = this.chart.yAxes.push(new am4charts.ValueAxis());
        axis.min = 0;
    };
    Crimes.prototype.addZoomControl = function () {
        var zoom = new am4core.Scrollbar();
        zoom.showSystemTooltip = false;
        this.chart.scrollbarX = zoom;
        var cursor = new am4charts.XYCursor();
        cursor.behavior = "zoomX";
        cursor.lineY.disabled = true;
        cursor.showTooltipOn = 'hit';
        this.chart.cursor = cursor;
    };
    Crimes.prototype.addLegend = function () {
        var legend = new am4charts.Legend();
        legend.position = 'right';
        this.chart.legend = legend;
    };
    Crimes.prototype.createSeries = function (field, name) {
        var series = this.chart.series.push(new am4charts.ColumnSeries());
        series.name = name;
        series.dataFields.valueY = field;
        series.dataFields.categoryX = 'city';
        series.sequencedInterpolation = true;
        series.stacked = true;
        series.columns.template.width = am4core.percent(60);
        series.cursorTooltipEnabled = false;
        series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
    };
    Crimes.prototype.loadData = function (id) {
      this.chart.data = JSON.parse('[{"city":"Columbus","murder":142,"rape":919,"robbery":1963,"aggravatedAssault":1454,"propertyCrime":34408,"burglary":7111,"larceny":23121,"motorVehicleTheft":4176,"arson":379,"violentCrime":4478},{"city":"Cleveland","murder":107,"rape":497,"robbery":2697,"aggravatedAssault":2698,"propertyCrime":18944,"burglary":5853,"larceny":9696,"motorVehicleTheft":3395,"arson":253,"violentCrime":5999},{"city":"Cincinnati","murder":70,"rape":292,"robbery":1196,"aggravatedAssault":1275,"propertyCrime":15105,"burglary":3448,"larceny":10172,"motorVehicleTheft":1485,"arson":0,"violentCrime":2833},{"city":"Toledo","murder":35,"rape":0,"robbery":780,"aggravatedAssault":1834,"propertyCrime":11095,"burglary":3103,"larceny":7247,"motorVehicleTheft":745,"arson":0,"violentCrime":0},{"city":"Akron","murder":42,"rape":209,"robbery":395,"aggravatedAssault":731,"propertyCrime":8360,"burglary":2301,"larceny":5304,"motorVehicleTheft":755,"arson":103,"violentCrime":1377},{"city":"Dayton","murder":30,"rape":122,"robbery":393,"aggravatedAssault":687,"propertyCrime":6083,"burglary":1779,"larceny":3688,"motorVehicleTheft":616,"arson":26,"violentCrime":1232},{"city":"Parma","murder":0,"rape":39,"robbery":37,"aggravatedAssault":65,"propertyCrime":906,"burglary":199,"larceny":633,"motorVehicleTheft":74,"arson":2,"violentCrime":141},{"city":"Canton","murder":16,"rape":97,"robbery":188,"aggravatedAssault":535,"propertyCrime":3766,"burglary":1008,"larceny":2512,"motorVehicleTheft":246,"arson":12,"violentCrime":836},{"city":"Youngstown","murder":23,"rape":32,"robbery":151,"aggravatedAssault":241,"propertyCrime":2362,"burglary":847,"larceny":1283,"motorVehicleTheft":232,"arson":82,"violentCrime":447},{"city":"Lorain","murder":2,"rape":30,"robbery":87,"aggravatedAssault":254,"propertyCrime":2019,"burglary":590,"larceny":1335,"motorVehicleTheft":94,"arson":11,"violentCrime":373},{"city":"Hamilton","murder":3,"rape":75,"robbery":111,"aggravatedAssault":123,"propertyCrime":2608,"burglary":716,"larceny":1890,"motorVehicleTheft":2,"arson":33,"violentCrime":312},{"city":"West Chester Township","murder":0,"rape":21,"robbery":15,"aggravatedAssault":28,"propertyCrime":1300,"burglary":170,"larceny":1086,"motorVehicleTheft":44,"arson":5,"violentCrime":64},{"city":"Colerain Township","murder":1,"rape":14,"robbery":41,"aggravatedAssault":44,"propertyCrime":1708,"burglary":223,"larceny":1400,"motorVehicleTheft":85,"arson":7,"violentCrime":100},{"city":"Green Township","murder":0,"rape":14,"robbery":19,"aggravatedAssault":19,"propertyCrime":1237,"burglary":218,"larceny":963,"motorVehicleTheft":56,"arson":0,"violentCrime":52},{"city":"Springfield","murder":9,"rape":25,"robbery":177,"aggravatedAssault":159,"propertyCrime":4024,"burglary":1040,"larceny":2691,"motorVehicleTheft":293,"arson":76,"violentCrime":370},{"city":"Kettering","murder":0,"rape":23,"robbery":26,"aggravatedAssault":21,"propertyCrime":860,"burglary":192,"larceny":616,"motorVehicleTheft":52,"arson":3,"violentCrime":70},{"city":"Elyria","murder":3,"rape":39,"robbery":64,"aggravatedAssault":85,"propertyCrime":1146,"burglary":248,"larceny":842,"motorVehicleTheft":56,"arson":12,"violentCrime":191},{"city":"Lakewood","murder":2,"rape":6,"robbery":40,"aggravatedAssault":26,"propertyCrime":1199,"burglary":469,"larceny":652,"motorVehicleTheft":78,"arson":5,"violentCrime":74},{"city":"Cuyahoga Falls","murder":2,"rape":18,"robbery":8,"aggravatedAssault":21,"propertyCrime":1209,"burglary":143,"larceny":1027,"motorVehicleTheft":39,"arson":1,"violentCrime":49},{"city":"Middletown","murder":5,"rape":41,"robbery":87,"aggravatedAssault":116,"propertyCrime":2956,"burglary":684,"larceny":2092,"motorVehicleTheft":180,"arson":0,"violentCrime":249}]');
    };
    return Crimes;
}());
new Crimes('chartdiv');
//# sourceMappingURL=crimes.js.map
angular
.module("KendoDemos", [ 'kendo.directives', 'gridster' ])
.controller("KendoDemosCtrl", ['$http', function ($http) {
	var that = this;

	this.title = 'Kendo Dashboard';

	// this.electricity = new kendo.data.DataSource({
	// 	transport: {read: {url: "/data/spain-electricity.json"}},
	// 	sort: {field: "year", dir: "asc"}
	// });
	// console.log(this.electricity);

	this.data = [];
	this.barData = [];

	$http.get('/data/spain-electricity.json').success(function (data) {
		if (data.length) {
			that.data = data;
			that.barData = [data[0]];
		}
	});

	this.gridsterOpts = {};


}])
.directive();






function createChart() {
    $("#mychart").kendoChart({
        title: {
            text: "Gross domestic product growth \n /GDP annual %/"
        },
        legend: {
            position: "bottom"
        },
        seriesDefaults: {
            type: "area",
            area: {
                line: {
                    style: "smooth"
                }
            }
        },
        series: [{
            name: "India",
            data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
        }, {
            name: "World",
            data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
        }, {
            name: "Haiti",
            data: [-0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590]
        }],
        valueAxis: {
            labels: {
                format: "{0}%"
            },
            line: {
                visible: false
            },
            axisCrossingValue: -10
        },
        categoryAxis: {
            categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            majorGridLines: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            format: "{0}%",
            template: "#= series.name #: #= value #"
        }
    });
}

$(document).ready(createChart);
$(document).bind("kendo:skinChange", createChart);

$("#mybutton").click(function () {
	$("#mychart").css("width", "800px");
	$("#mychart").data("kendoChart").resize();
});
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



	this.dataSmall = {
		c1: [       936, 968, 1025, 999, 998, 1014, 1017, 1010, 1010, 1007,
                    1004, 988, 990, 988, 987, 995, 946, 954, 991, 984,
                    974, 956, 986, 936, 955, 1021, 1013, 1005, 958, 953,
                    952, 940, 937, 980, 966, 965, 928, 916, 910, 980
        ],
        c2: [
                    16, 17, 18, 19, 20, 21, 21, 22, 23, 22,
                    20, 18, 17, 17, 16, 16, 17, 18, 19, 20,
                    21, 22, 23, 25, 24, 24, 22, 22, 23, 22,
                    22, 21, 16, 15, 15, 16, 19, 20, 20, 21
        ],
        c3: [
                    71, 70, 69, 68, 65, 60, 55, 55, 50, 52,
                    73, 72, 72, 71, 68, 63, 57, 58, 53, 55,
                    63, 59, 61, 64, 58, 53, 48, 48, 45, 45,
                    63, 64, 63, 67, 58, 56, 53, 59, 51, 54
        ]
    }


	/* Temp code: !!! Move to the separate directive !!!!!!!!!!!!! */
	this.gridsterOpts = {
		resizable: {
			start: function(event, uiWidget, $element) {
				if (!$element.innerChart) {
					$element.innerChart = $element.find("[kendo-chart]").data("kendoChart");
				}
				$element.addClass("resizingMode");
			},
			stop: function(event, uiWidget, $element) {
				// !!! try to find corresponding event, which fires after resizing, adjusting to grid and getting new sizes for tile
				setTimeout(function () {
					$element.removeClass("resizingMode");
					$element.innerChart.resize();
					//$element.innerChart.refresh();
				}, 300);
			}
		}
	};

	this.chart1 = {};
	this.chart2 = {};
	this.chart3 = {};

}]).directive("chartSizeAutoAdjust", [function () {
	return {
		priority: 10000,
		require: "kendo-chart",
		restrict: 'A',
		link: function(scope, element, attrs, kendoChartController) {
			console.log("gridsterAdjuster !!!!", element.data("kendoChart"), kendoChartController);
			// temporary hack, it should be redone with correct event
			setTimeout(function () {
				element.data("kendoChart").resize();
			}, 1000);
		}
	}
}]).directive("sparklineSizeAutoAdjust", [function () {
	return {
		priority: 10000,
		require: "kendo-sparkline",
		restrict: 'A',
		link: function(scope, element, attrs, kendoSparklineController) {
			console.log("gridsterAdjuster sparkline !!!!", element.data("kendoSparkline"), kendoSparklineController);
			// temporary hack, it should be redone with correct event
			setTimeout(function () {
				console.log(element.data("kendoSparkline"));
				element.data("kendoSparkline").resize();
			}, 1000);
		}
	}
}]);

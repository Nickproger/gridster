angular

.module("KendoDemos", [ 'kendo.directives', 'gridster' ])

.controller("KendoDemosCtrl", ['$scope', '$http', function ($scope, $http) {

	var that = this;

	// Fake data

	this.data = new kendo.data.DataSource({transport: {read: {url: "/data/spain-electricity.json"}}});

	this.barData = [{"solar": 2578, "hydro": 26112, "wind": 32203, "nuclear": 58973 }];

	this.dataSmall = {
		c1: [936, 968, 1025, 999, 998, 1014, 1017, 1010, 1010, 1007, 1004, 988, 990, 988, 987, 995, 946, 954, 991, 984],
		c2: [16, 17, 18, 19, 20, 21, 21, 22, 23, 22, 20, 18, 17, 17, 16, 16, 17, 18, 19, 20],
		c3: [71, 70, 69, 68, 65, 60, 55, 55, 50, 52, 73, 72, 72, 71, 68, 63, 57, 58, 53, 55]
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
				}, 300);
			}
		}
	};

}])

.directive("sizeAutoAdjust", [function () {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			scope.$on("kendoWidgetCreated", function(event, widget) {
				if (widget.element[0] == element[0]) {
					setTimeout(function () {
						widget.resize();
					}, 0);
				}
			});
		}
	}
}]);

(function () {
'use strict';

angular
.module("ChartDashboard", ['kendo.directives', 'gridster'])

.directive('m42ChartDashboard', [function () {
	return {
		restrict: 'AE',
		templateUrl: 'm42-chart-dashboard.html',
		transclude: true,
		scope: {
			options: '=m42ChartDashboard'
		},
		controller: function () {
			this.gridsterOpts = {
				margins: [20, 20],

				// Handle charts auto-resizing when Gridster's items are resizing
				resizable: {
					start: function(event, uiWidget, element) {
						if (!element.innerChart) {
							element.innerChart = element.find('.k-chart').data('kendoChart');
						}
						element.addClass('resizingMode');
					},
					stop: function(event, uiWidget, element) {
						setTimeout(function () {
							element.removeClass('resizingMode');
							element.innerChart.resize();
						}, 300);
					}
				}
			};
		},
		controllerAs: 'MCDCtrl',
		link: function(scope, elem, attrs) {

			// Handle charts auto-resizing when window/Grister is resizing
			scope.$on('gridster-resized', function() {
				elem.find('.k-chart').each(function () {
					$(this).data('kendoChart').resize();
				});
			});

			// Adjust size of charts, when they were loaded
			scope.$on('kendoWidgetCreated', function(event, widget) {
				setTimeout(function () {
					widget.resize();
				}, 0);
			});
		}
	}
}])

.controller("DashboardCtrl", ['$scope', '$http', function ($scope, $http) {

	this.chartDataSource = new kendo.data.DataSource({transport: {read: {url: "/data/spain-electricity.json"}}});

	this.dashboardOptions = [{
		position: { sizeX: 2, sizeY: 1, row: 0, col: 0 },
		chart: {
			seriesDefaults: {type: 'bar'},
			dataSource: [{"solar": 2578, "hydro": 26112, "wind": 32203, "nuclear": 58973 }],
			series: [{field: 'nuclear', name: 'Nuclear'}, {field: 'hydro', name: 'Hydro'}, {field: 'wind', name: 'Wind'}, {field: 'solar', name: 'Solar'}]
		}
	}, {
		position: { sizeX: 2, sizeY: 2, row: 1, col: 0 },
		chart: {
			title: { text: 'Solar' },
			seriesDefaults: {type: 'pie'},
			dataSource: this.chartDataSource,
			series: [{field: 'solar', name: 'Solar', categoryField: 'year'}]
		}
	}, {
		position: { sizeX:4, sizeY: 3, row: 0, col: 2 },
		chart: {
			seriesDefaults: {type: 'line'},
			dataSource: this.chartDataSource,
			series: [{field: 'nuclear', name: 'Nuclear'}, {field: 'hydro', name: 'Hydro'}, {field: 'wind', name: 'Wind'}, {field: 'solar', name: 'Solar'}],
			legend: { position: 'bottom' }
		}
	}];

}]);

}());

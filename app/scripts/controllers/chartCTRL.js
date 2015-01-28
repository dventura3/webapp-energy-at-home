var app = angular.module('webappEnergyAtHomeApp');


app.controller('ChartCtrl', ['$scope', function($scope) {

	$scope.chartConfig = {
        options: {
            chart: {
                type: 'line',
                zoomType: 'x',
				animation: Highcharts.svg,
				events: {
					load : function () {
						setInterval(function () {
							var x = (new Date()).getTime();
							var y = $scope.ENERGY.level;
							//var y = Math.random();
							$scope.chartConfig.series[0].data.push([x,y]);
							//$scope.chartConfig.series[0].data.push($scope.ENERGY.level);
							if($scope.chartConfig.series[0].data.length >= 30)
								$scope.chartConfig.series[0].data.shift();
							$scope.$apply();
						}, 1000);
					}
                }
            }
        },
        series: [{
            data: []
        }],
        title: {
            text: "Energy Values" 
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'W'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
		legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        }
    }


}]);

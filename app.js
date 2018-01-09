var app = angular.module('plunker', ['ngMap']);

app.controller('MainCtrl', function ($scope,$rootScope,$http) {

    $scope.route=[];

    $scope.lat=40.7;$scope.long=-74.21;

    $scope.isDisabled = false;


    $scope.addNewPoint=function(x,y){

        var a=parseInt(x);
        var b=parseInt(y);

        if(!isNaN(a) && !isNaN(b)){
            var asd=($scope.positions.length);
            var abc={ title:"Marker "+asd, pos:[a,b], onRoute:false, id:asd}
            $scope.positions.push(abc);

        }else{
            alert("enter number")
        }
    };
    $scope.dispatchTour = function(position){
        console.log("hello");
        $scope.route.unshift(position);
        position.onRoute=true;
        $scope.isDisabled = true;
        console.log("done");
    };



    $http.get('position.json').
    then(function(response) {
        $scope.longDriver=response.data.longitude;
        $scope.latDriver=response.data.latitude;

        $scope.driverPosition=[$scope.longDriver,$scope.latDriver];
        $scope.positions =[

            { title: 'Driver', pos:$scope.driverPosition, onRoute:false, id: 0},
            { title: 'Marker 1', pos:[40.71, -74.21], onRoute:false, id: 1},
            { title: 'Marker 2', pos:[40.72, -74.20], onRoute:false, id: 2},
            { title: 'Marker 3', pos:[40.73, -74.19], onRoute:false, id: 3}
        ];

        $scope.start = {};
        $scope.theWaypoints = [];
        $scope.end = {};

        $scope.$watchCollection('route', function () {
            if($scope.route.length > 1 ){
                $scope.start = $scope.route[0];
                $scope.theWaypoints = [];
                if($scope.route.length > 1 ){
                    for (var i = 1; i < $scope.route.length - 1; i++ ){
                        var obj = {
                            location:{
                                lat: $scope.route[i].pos[0],
                                lng: $scope.route[i].pos[1]
                            },
                            stopover: true
                        };
                        $scope.theWaypoints.push(obj);
                    }
                }
                $scope.end = $scope.route[$scope.route.length-1];
            }else{
                $scope.start = {};
                $scope.end = {};
            }
        });
    }).

    catch(function(error) {
        console.log("error",error);
    });


    $rootScope.customMarkers = [
        {address: "Newark, New Jersey, USA", "class": "my1"}
    ];

    

    $scope.addToRoute = function(position){
        $scope.route.push(position);
        position.onRoute=true;

    };

    $scope.removeFromRoute = function(position){
        for( var i = 0; i < $scope.route.length; i++ ){
            if($scope.route[i].id == position.id){
                $scope.route.splice(i, 1);
                position.onRoute = false;
            }
        }
        window.setTimeout(function(){
            $scope.$apply();
        },100);
    };

    
});
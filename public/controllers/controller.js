var myApp = angular.module('myApp', ['zingchart-angularjs','ngMaterial','material.svgAssetsCache']);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http,$element,$q) {
    console.log("Hello World from controller");



        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];   


 // here currency option
$scope.colorcode = ["#712400","#322dad","#8f7d6e","#cbd021","#504faf","#8e50d7","#aaa9ff","#e38c2d","#dbdcff","#07064c","#712400","#322dad","#8f7d6e","#cbd021","#504faf","#8e50d7","#aaa9ff","#e38c2d","#dbdcff","#07064c"];
    $scope.cur_rates = ["AUD","USD" , "BGN",
    "BRL",
    "CAD",
    "CHF",
    "CNY",
    "CZK",
    "DKK",
    "GBP",
    "HKD",
    "HRK",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "JPY",
    "KRW",
    "MXN",
    "MYR",
    "NOK",
    "NZD",
    "PHP",
    "PLN",
    "RON",
    "RUB",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "ZAR",
    "EUR"];



     $scope.selected1 = [];   /// for insert  model  
     $scope.selected = [];

      $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
          list.splice(idx, 1);
        }
        else {
          list.push(item);
        }
      };

      $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
      };




     
        //end here

  
     
    


   // $scope.flag = "Please wait...!";
 
     
       


           

   $scope.insertall = function($q) {
 
         $http.post('/insertall',{data : {"c1":$scope.contact,"c2":$scope.selected1}}).success(function(response) {
                deferred.resolve('request successful');
          
             }).error(function(){
                deferred.reject('ERROR');
                    $scope.flag = "server bad response so few entry failed  ";
             });
   

}

 


  $scope.generate = function(){

      $scope.spinner = true ; 
     console.log($scope.date);
        
        $http.post('/graphmonth',$scope.date).success(function(response) {
        
      
       $scope.max =0 ;

       $scope.value = [];
       for(let j=0;j<$scope.selected.length;j++)
       {        
       
                 $scope.eachcurrval = [];
                 $scope.dateg = [];
                for(let i=0;i<response.length;i++)
                 {      
                        $scope.dateg.push(new Date(response[i].date).getDate()+"-"+monthNames[new Date(response[i].date).getMonth()]+"-"+new Date(response[i].date).getFullYear());
                        $scope.eachcurrval.push(response[i].rates[$scope.selected[j]]);
                        if(response[i].rates[$scope.selected[j]]>$scope.max){
                            $scope.max = response[i].rates[$scope.selected[j]];
                        }
                      // console.log(response[i].rates[$scope.selected[j]]+" vale in curre");
                 }
                // console.log($scope.eachcurrval+" all value");
                var val = $scope.selected[j];
                //console.log(val);
                 $scope.value.push($scope.eachcurrval);
        }
      //  console.log( $scope.value);
    
           //here start graph




           // here to make  array of series to saw in graph


           $scope.graphseries = [];
           $scope.label = [];

            for(let j=0;j<$scope.value.length;j++){
                  $scope.graphseries.push(  {
                        "values": $scope.value[j],
                        "data-days":$scope.dateg,
                        "line-color": $scope.colorcode[j],
                        "aspect": "spline",
                        "background-color": "",
                        "alpha-area": ".3",
                        "font-family": "Roboto",
                        "font-size": "14px",
                        "text": "returns"
                    });

                     $scope.label.push(   
                         {
                    "text": $scope.selected[j]+": %plot-"+j+"-value",
                    "default-value": "",
                    "color": $scope.colorcode[j],
                    "x": 10*(j+1)+"%",
                    "y": 50,
                    "width": 120,
                    "text-align": "left",
                    "bold": 0,
                    "font-size": "14px",
                    "font-weight": "bold"
                }

                        );

                }
                 $scope.spinner = false ;              
                  $scope.max1 = "0:"+Math.floor($scope.max+1)+":"+parseFloat(($scope.max)/100).toFixed(2)+"";
                  console.log($scope.max1);
           // end here graph series array

             $scope.myJson =  {
    "globals":{
      "font-family": "Roboto"
    },
    "graphset": [
        {
            "type": "area",
            "background-color": "#fff",
            "utc": true,
            "title": {
                "y": "15px",
                "text": $scope.date.base+" Currency Rates From "+monthNames[new Date($scope.date.start).getMonth()]+"-"+new Date($scope.date.start).getFullYear()+" to "+monthNames[new Date($scope.date.end).getMonth()]+"-"+new Date($scope.date.end).getFullYear(),
                "background-color": "none",
                "font-color": "#e38c2d",
                "font-size": "24px",
                "height": "25px",
                "adjust-layout":true
            },
            "plotarea": {
                "margin-top":"10%",
                "margin-right":"dynamic",
                "margin-bottom":"dynamic",
                "margin-left":"dynamic",
                "adjust-layout":true
            },
            "labels": $scope.label,
            "scale-x": {
                "label": {
                    "text":"Date Range",
                    "font-size": "14px",
                    "font-weight": "normal",
                    "offset-x": "10%",
                },
                "item": {
                    "text-align": "center",
                    "font-color": "#05636c"
                },
                "zooming": 1,
                "max-labels": 12,
                "labels": $scope.dateg ,
                "max-items": 12,
                "items-overlap": true,
                "guide": {
                    "line-width": "0px"
                },
                "tick": {
                    "line-width": "2px"
                },
            },
            "crosshair-x": {
                "line-color":"#898989",
                "line-style":"dashed",
                "line-width":1,
                "plot-label": {
                    "visible": false
                },
                "marker":{
                  visible: true,
                  size: 4
                }
            },
            "scale-y": {
                "values": $scope.max1 ,  // "0:900:10"
                "item": {
                    "font-color": "#05636c",
                    "font-weight": "normal"
                },
                "label":{
                  "text":"Price Base currency",
                  "font-size":"14px"
                },
                "guide": {
                    "line-width": "0px",
                    "alpha": 0.2,
                    "line-style": "dashed"
                }
            },
            "plot": {
                "line-width": 2,
                "marker": {
                    "size": 1,
                    "visible": false
                },
                "tooltip": {
                    "font-family": "Roboto",
                    "font-size": "15px",
                    "text": "Rates %v  on %data-days",
                    "text-align": "left",
                    "border-radius":5,
                    "padding":10
                }
            },
            "series": 
            $scope.graphseries
          
            
        }
    ]
};


           // here end graph 
       
          // console.log($scope.myJson);
        
      });



  }

    //console.log($scope.value1 + "value1");
 

}]);﻿




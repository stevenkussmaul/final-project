"use strict";

const foodSelection = {
    template: `

    <section ng-click= "$ctrl.homePage();" class="title">BURGER BURNER</section>

    <h2 class="click-hint">Click to add item to plate</h2>

    <section class="main-container">

        <section class="left">
            <section class="food-choice" anime-directive ng-repeat="food in $ctrl.listOfFood track by $index">
                <img ng-click="$ctrl.add(food)" src="{{ food.src }}" class="food-photos">
            </section>
            <button class="go-btn" ng-show="$ctrl.buttonShow" ng-click="$ctrl.goActivity();">I'm Full</button>
        </section>

        <section class="instructions" ng-show="$ctrl.show">
            <h2>Are you ready to burn??</h2>
            <p class="instructions-text">Find out how far away you need to park in order to burn off those calories you're about to eat!</p>
            <button class="play-btn" ng-click="$ctrl.hideInstructions();">Burn Those Burgers!!</button>
        </section>

        <section class="right">
            <section class="plate-container">
                <img class="food-item" id="item{{$index}}" ng-repeat="food in $ctrl.plate track by $index" src="{{ food.src}}">
            </section>


            <section count="0" class="plate">
                <img class="plate-image" src="app/images/plate.png">
            </section>
        </section>
      
    </section>

    `,
    bindings: [],
    controller: ["Service", "$location", function (Service, $location) {
        const vm = this;
        vm.show = true;
        vm.buttonShow = false;

        vm.hideInstructions = () => {
            vm.show = false;
        };

        vm.listOfFood = [
            {
                name: "bigmac",
                cal: 563,
                src: "app/images/big-mac.png"
            },
            {
                name: "fries",
                cal: 510,
                src: "app/images/fries.png"
            },
            {
                name: "apple pie",
                cal: 230,
                src: "app/images/apple-pie.png"
            },
            {
                name: "coke",
                cal: 150,
                src: "app/images/coke.png"
            },
            {
                name: "nuggets",
                cal: 440,
                src: "app/images/nuggets.png"
            }
        ];



        vm.goActivity = () => {
            $location.path("/activity-selection");
        };

        // Service.getBigMac().then(function(result) {
        //     vm.bigMacObj = result;
        //     vm.listOfFood[0] = vm.bigMacObj            
        // });

        // Service.getCoke().then(function(result) {
        //     vm.cokeObj = result;
        //     vm.listOfFood[1] = vm.cokeObj            
        // });

        // Service.getFries().then(function(result) {
        //     vm.friesObj = result;
        //     vm.listOfFood[2] = vm.friesObj            
        // });

        // Service.getApplePie().then(function(result) {
        //     vm.ApplePieObj = result;
        //     vm.listOfFood[3] = vm.ApplePieObj            
        // });

        // Service.getNuggets().then(function(result) {
        //     vm.nuggetsObj = result;
        //     vm.listOfFood[4] = vm.nuggetsObj           
        // });

        // vm.listOfFood = [vm.bigMac, vm.coke, vm.fries, vm.pie, vm.nuggets];

        vm.add = (food) => {

            if (vm.plate >= 0) {
                vm.buttonShow = true;
            }

            Service.addFood(food);
            vm.plate = Service.getPlate();
            console.log(vm.plate.length);
            if (vm.plate.length === 5) {
                setTimeout(function () {
                    $location.path("/activity-selection"), 2000
                })
            }
        }

        vm.plate = Service.getPlate();

        vm.homePage = () => {
            Service.goHome();
        }


    }]

}

angular.module("App")
    .component("foodSelection", foodSelection);


"use strict";

const results = {
    template: `


    <section ng-click="$ctrl.goHome();" class="title">BURGER BURNER</section>

    
        <section class="distance">

           <p class="results-text"> You have {{ $ctrl.distance }} miles to {{ $ctrl.activitySelection }}! </p>

        </section>

        <section class="movement-container">
            <section class="skyline-container">
                <section class="skyline-background">
                    <section id="sprite">
                    </section>
                </section>
            </section>
        </section>

    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 375 812" width="375" height="812"><defs><clipPath id="_clipPath_oiZVaB5pHT5RuL76F3deahTYlMWnkv87"><rect width="375" height="812"/></clipPath></defs><g clip-path="url(#_clipPath_oiZVaB5pHT5RuL76F3deahTYlMWnkv87)"><g style="isolation:isolate"><path d=" M 156.36 600 C 148.238 525.839 80.667 479.333 120 440 C 80.667 441.333 51.333 540 81.36 600 C 75.256 574.584 32 571.333 44.52 540.64 C 26 551.333 12.667 561.333 0 600 L 0 812.25 L 375 811.875 L 375 600 C 341.272 596.781 326.322 576.844 330.12 540.16 C 300.667 571.333 301.333 580 293.4 600 C 284.244 525.906 218.667 530 256.44 441.92 C 234.679 486.601 205.333 472.667 217.68 600 C 187.333 481.333 240 375 187.5 350 C 213.333 411.333 100.667 419.333 156.36 600 Z " fill="rgb(255,0,0)" vector-effect="non-scaling-stroke" stroke-width="1" stroke="rgb(255,0,0)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/><path d=" M 156.36 600 C 148.238 525.839 80.667 479.333 120 440 C 80.667 441.333 51.333 540 81.36 600 C 75.256 574.584 32 571.333 44.52 540.64 C 26 551.333 12.667 561.333 0 600 L 0 812.25 L 375 811.875 L 375 600 C 341.272 596.781 326.322 576.844 330.12 540.16 C 300.667 571.333 301.333 580 293.4 600 C 284.244 525.906 218.667 530 256.44 441.92 C 234.679 486.601 205.333 472.667 217.68 600 C 187.333 481.333 240 375 187.5 350 C 213.333 411.333 100.667 419.333 156.36 600 Z " fill="rgb(255,0,0)" vector-effect="non-scaling-stroke" stroke-width="1" stroke="rgb(255,0,0)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/></g><g style="isolation:isolate"/><g style="isolation:isolate"/></g></svg>

    `,
    controller: ["Service", "$location", "$interval", function (Service, $location, $interval) {
        const vm = this;
        vm.distance = Service.getDistance();
        vm.activitySelection = Service.getActivity();
          
        vm.countdown = () => {            
            vm.distanceRounded = (vm.distance-.2);
            vm.distance = Math.round( vm.distanceRounded * 100 ) / 100;
            if (vm.distance <= 0) {
                vm.distance = 0;
                
                $interval.cancel(vm.counter);
            }
            console.log(vm.distance);
        }

        vm.counter = $interval(function (){
            vm.countdown();
        }, 500) 


        var tID; //we will use this variable to clear the setInterval()

        function stopAnimate() {
            clearInterval(tID);
        } //end of stopAnimate()


        function animateScript() {

            var position = 320; //start position for the image slicer
            const interval = 400; //100 ms of interval for the setInterval()
            const diff = 320; //diff as a variable for position offset

            tID = setInterval(() => {

                document.getElementById("sprite").style.backgroundPosition =
                    `-${position}px 0px`;

                if (position < 3200) {
                    position = position + diff;
                }
                //we increment the position by 320 each time
                else {
                    position = 320;
                }
                //reset the position to 320px, once position exceeds 3200px

            }, interval); //end of setInterval
        } //end of animateScript()

        animateScript();
    }]
}



angular.module("App")
        .component("results", results);


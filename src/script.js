class Amazing {

    constructor(config = {}, debug = false) {
        this.intervalWarehouse = [];
        this.config = config;
        this.config.useClass = this.config.useClass || "amazing";
        this.config.defaultAnimation = this.config.defaultAnimation || false;
        this.config.defaultSpeed = this.config.defaultSpeed || false;
        this.debug = debug;
    }

    init() {
        var self = this;
        if (self.debug)
            // If in debug mode, state the library has initiated and the object has been created
            console.log("Amazing initiated");

        function isScrolledIntoView(el) {
            // If elements is scrolled into view
            var rect = el.getBoundingClientRect();
            var elemTop = rect.top;
            var elemBottom = rect.bottom;
            var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
            return isVisible;
        }

        function setAnimation(el, speed, animation, delay) {
            setTimeout(()=>{
                el.classList.add("finished");
            },parseFloat(speed)*1000);
            speed = (isNaN(speed) && speed.indexOf(".")>-1) ? speed.replace(".","") : speed;
            setTimeout(()=>{
                el.classList.add(`animation-${speed}s`);
                el.classList.add("animated");
                el.classList.add(animation);
                el.style.visibility = "visible";
            },delay)
        }
        
        function scroll() {
            // Everytime the page is scrolled
          var all_elements = document.querySelectorAll(`.${self.config.useClass}:not(.finished)`);
                // Catch all elements with the chosen class
            all_elements.forEach((el)=>{
              if (isScrolledIntoView(el)) {
               var animation = el.dataset.animation || self.config.defaultAnimation;
               var delay = el.dataset.delay || 0;
               delay *= 1000;
               var speed = el.dataset.speed || 1;
               var after = el.dataset.after || false;
               speed = self.config.defaultSpeed || speed;
               if (after && el.className.indexOf("finished")==-1) {
                   // If after attribute exists on this element, check every 50ms if the element you're waiting for has finished, if it has - start the animation
                   let obj = {};
                   obj[after] = {};
                   obj[after].waiting = 0;
                   if (document.querySelectorAll(`.${after}`).length===0)
                   // If the "after" element does not exist
                    return false;
                   obj[after].interval = setInterval(()=>{
                       if (self.debug)
                            console.log("Tick..." + obj[after].waiting);
                       // If it does exist, start an interval and wait for it
                       if (document.querySelector(`.${after}`).className.indexOf("finished")>-1
                            || obj[after].waiting >= 10000) {
                           // If the after element has finished animating, we can start the animation
                           // If it has been 10 seconds and the other element did not reveal itself, kill the interval and start the animation anyways
                           setAnimation(el, speed, animation, delay);
                           // Stop the interval if we started the animation
                           clearInterval(obj[after].interval);
                       }
                       obj[after].waiting += 50;
                   },50)
                   self.intervalWarehouse.push(obj);
               }
               else {
                   setAnimation(el, speed, animation, delay);
               }
              }
            });
        }
        
        window.addEventListener("scroll", scroll);        
    }

}
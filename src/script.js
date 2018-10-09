class Amazing {

    constructor(config = {}, debug = false) {
        this.intervalWarehouse = [];
        this.config = config;
        this.config.useClass = this.config.useClass || "amazing";
        this.config.defaultAnimation = this.config.defaultAnimation || false;
        this.config.defaultSpeed = this.config.defaultSpeed || false;
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
          var all_elements = document.querySelectorAll(`.${self.config.useClass}:not(.animated)`);
                // Catch all elements with the chosen class
            all_elements.forEach((el)=>{
              if (isScrolledIntoView(el)) {
               var animation = el.dataset.animation || self.config.defaultAnimation;
               var delay = el.dataset.delay || 0;
               delay *= 1000;
               var speed = el.dataset.speed || 1;
               var after = el.dataset.after || false;
               speed = self.config.defaultSpeed || speed;
               if (after) {
                   // If after attribute exists on this element, check every 50ms if the element you're waiting for has finished, if it has - start the animation
                   let obj = {};
                   obj[after] = {};
                   obj[after].waiting = 0;
                   obj[after].interval = setInterval(()=>{
                       obj[after].waiting += 50;
                       console.log(obj[after].waiting);
                       if (document.querySelector(`.${after}`).className.split(/\s+/).indexOf("finished") !== -1 || obj[after].waiting >= 10000) {
                            // If you've set the animation, stop
                            // Also, if the element is waiting for more than 10 seconds, stop the interval
                            setAnimation(el, speed, animation, delay);
                            clearTimeout(self.intervalWarehouse.find((e)=>e.hasOwnProperty(after))[after].interval);
                            if (self.debug && obj[after].waiting >= 10000) {
                                console.error("Woha! I've been waiting for an animation to finish for over 10 seconds. Stopping the interval");
                            }
                       }
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
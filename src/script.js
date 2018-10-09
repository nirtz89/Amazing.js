class Amazing {

    constructor(config = {}, debug = false) {
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

        function setTimeoutToFinish(el,time) {
            // Sets a timeout for the animation to finish, when it finishes - add a class of "finished"
            setTimeout(()=>{
                el.classList.add("finished");
            },time*1000);
            // We are converting the time into milliseconds
        }
        
        function scroll() {
            // Everytime the page is scrolled
          var all_elements = document.querySelectorAll(`.${self.config.useClass}:not(.animated)`);
                // Catch all elements with the chosen class
            all_elements.forEach((el)=>{
              if (isScrolledIntoView(el)) {
               var animation = el.dataset.animation || self.config.defaultAnimation;
               var delay = el.dataset.delay || 0;
               var speed = el.dataset.speed || 1;
               speed = speed.replace(".","");
               speed = self.config.defaultSpeed || speed;
                setTimeout(()=>{
                    el.classList.add(`animation-${speed}s`);
                    el.classList.add("animated");
                    el.classList.add(animation);
                    el.style.visibility = "visible";
                    setTimeoutToFinish(el,speed);
                },delay)
              }
            });
        }
        
        window.addEventListener("scroll", scroll);        
    }

}
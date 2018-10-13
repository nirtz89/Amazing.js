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

        function setAnimation(el) {
            var animation = el.dataset.animation || self.config.defaultAnimation;
            var delay = parseFloat(el.dataset.delay) || 0;
            var speed = parseFloat(el.dataset.speed) || 1;        
            var after = el.dataset.after || false;
            setTimeout(()=>{
                el.classList.add("finished");
                // Find elements waiting for this to finish and activate animation on them
                var amazingClass = el.className.split(" ").filter((v)=>v.indexOf("amazing-")>-1)[0].replace("amazing-","");
                var allAfter = document.querySelectorAll(`[data-after="${amazingClass}"]`);
                allAfter.forEach((after_element) => {
                    setAnimation(after_element);
                });
            },parseFloat(speed+delay)*1000);
            setTimeout(()=>{
                el.classList.add(`animation-${speed}s`);
                el.classList.add("animated");
                el.classList.add(animation);
                el.style.visibility = "visible";
            },delay*1000)
        }
        
        function scroll() {
            // Everytime the page is scrolled
          var all_elements = document.querySelectorAll(`.${self.config.useClass}:not(.finished)`);
                // Catch all elements with the chosen class
            all_elements.forEach((el)=>{
              if (isScrolledIntoView(el)) {
               var animation = el.dataset.animation || self.config.defaultAnimation;
               var delay = el.dataset.delay || 0;
               var speed = el.dataset.speed || 1;
               var after = el.dataset.after || false;
               speed = self.config.defaultSpeed || speed;
               if (!after)
                setAnimation(el);
              }
            });
        }
        
        window.addEventListener("scroll", scroll);        
    }

}
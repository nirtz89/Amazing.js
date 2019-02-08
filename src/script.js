class Amazing {

    constructor(config = {}, debug = false) {
        this.intervalWarehouse = [];
        this.config = config;
        this.config.useClass = this.config.useClass || "amazing";
        this.config.defaultAnimation = this.config.defaultAnimation || false;
        this.config.defaultSpeed = this.config.defaultSpeed || false;
        this.config.defaultDelay = this.config.defaultDelay || 0;
        this.debug = debug;
    }

    init() {
        let self = this;
        if (self.debug)
            // If in debug mode, state the library has initiated and the object has been created
            console.log("Amazing initiated");

        function isScrolledIntoView(el) {
            // If elements is scrolled into view
            let rect = el.getBoundingClientRect();
            let elemTop = rect.top;
            let elemBottom = rect.bottom;
            let isVisible = elemTop < window.innerHeight && elemBottom >= 0;
            return isVisible;
        }

        function setAnimation(el) {
            let animation = el.dataset.animation || self.config.defaultAnimation;
            let delay = parseFloat(el.dataset.delay) || self.config.defaultDelay;
            let speed = parseFloat(el.dataset.speed) || self.config.defaultSpeed;
            setTimeout(()=>{
                el.classList.add("finished");
                // Find elements waiting for this to finish and activate animation on them
                if (el.className.indexOf("amazing-")>-1) {
                    let amazingClass = el.className.split(" ").filter((v)=>v.indexOf("amazing-")>-1)[0].replace("amazing-","");
                    let allAfter = document.querySelectorAll(`[data-after="${amazingClass}"]`);
                    allAfter.forEach((after_element) => {
                        setAnimation(after_element);
                    });
                }
            },parseFloat(speed+delay)*1000);
            setTimeout(()=>{
                el.classList.add(`animation-${speed}s`);
                el.classList.add("animated");
                el.classList.add(animation);
                el.style.visibility = "visible";
            },delay*1000);
        }
        
        function scroll() {
            // Everytime the page is scrolled
          let all_elements = document.querySelectorAll(`.${self.config.useClass}:not(.finished)`);
                // Catch all elements with the chosen class
            all_elements.forEach((el)=>{
              if (isScrolledIntoView(el)) {
               let after = el.dataset.after || false;
               if (!after)
                setAnimation(el);
              }
            });
        }
        
        window.addEventListener("scroll", scroll);        
    }

}
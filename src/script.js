class Amazing {

    init() {
        console.log("Amazing initiated");

        function isScrolledIntoView(el) {
            var rect = el.getBoundingClientRect();
            var elemTop = rect.top;
            var elemBottom = rect.bottom;
        
            var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
            return isVisible;
        }
        
        function scroll() {
          var all_elements = document.querySelectorAll(".scroll");
            all_elements.forEach((el)=>{
              if (isScrolledIntoView(el)) {
               el.classList.add("animated");
               el.classList.add("fadeIn");
               el.style.visibility = "visible";
              }
            });
        }
        
        window.addEventListener("scroll", scroll);        
    }

}
// resize header when page is scrolled down

window.addEventListener('scroll', function(){
    let distanceY = window.pageYOffset || document.documentElement.scrollTop;
    let limit = 150;
    let $header = $(".masthead");

    if (distanceY > limit) {
        $header.addClass("small");
    } else {
        $header.removeClass("small");
    }
});
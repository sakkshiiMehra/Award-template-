const scroll = new LocomotiveScroll({
    el: document.querySelector('main'),
    smooth: true
});

function skewsCircle(){
    // define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    var timeout;
    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);

        xdiff = dets.clientX - xprev;
        ydiff = dets.clientY - yprev;

        xprev = dets.clientX;
        yprev = dets.clientY;

        xscale = gsap.utils.clamp(0.8,1.2,xdiff);
        yscale = gsap.utils.clamp(0.8,1.2,ydiff);

        circleMouseFollwer(xscale,yscale);

        timeout = setTimeout(function(){
            document.getElementById("mini-circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        },100);
    });
}
skewsCircle();

function circleMouseFollwer(xscale,yscale){
    window.addEventListener("mousemove",function (dets) {
        document.getElementById("mini-circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}
circleMouseFollwer();

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("nav", {
        y:"-10",
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut
    })
        .to(".boundary-elem", {
        y:0,
        ease: Expo.easeInOut,
        duration: 2,
        stagger: 0.2,
        delay:-1
    })
        .from("home-footer", {
            y:"-10",
            opacity:0,
            duration:1.5,
            ease:Expo.easeInOut,
            delay: -1
        })
}
firstPageAnim();

// second section animation

document.querySelectorAll(".element").forEach(function(elem){

    elem.addEventListener("mouseleave", function(details){
        
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mousemove", function(details){
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot),
        });
    });
})

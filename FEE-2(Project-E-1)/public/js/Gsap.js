var tl = gsap.timeline() ;
tl.from(["#movie-about .font1","#movie-about .font2"],{
    x:-600 ,
    duration:0.5 ,
    opacity:0 ,
    stagger:0.25 ,
    ease:"expo.out"
});
tl.from("#movie-about #book",{
    scale:0 ,
    duration:0.5 ,
    opacity:0 ,
    ease:"expo.out" 
});
// tl.from("#movie-selection-t .card-sections .wrapper",{
//     x:-100 ,
//     duration:0.5 ,
//     opacity:0 ,
//     rotate:360 ,
//     stagger:0.25 ,
//     ease:"expo.out" 
// },"anim1");
// tl.from(".movie-section .font1",{
//     x:-600 ,
//     duration:0.5 ,
//     opacity:0 ,
//     stagger:0.25 ,
//     ease:"expo.out" 
// });
// tl.from(".movie-section .card-sections .wrapper",{
//     x:-600 ,
//     duration:0.5 ,
//     rotate:360 ,
//     opacity:0 ,
//     stagger:0.25 ,
//     ease:"expo.out" 
// }) ;
tl.from([".site-footer .footer-content .footer-logo", 
    ".site-footer .footer-content .footer-links a", 
    ".site-footer .footer-content .social-icons a", // Targeting each icon's <a> tag
    ".site-footer .footer-content .footer-contact",
    ".footer-bottom"], {
x: -600,
duration: 0.5,
rotate: 360,
opacity: 0,
stagger: 0.25, // Makes elements animate one after the other
ease: "expo.out"
});
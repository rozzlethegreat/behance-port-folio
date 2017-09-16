

	$('#nav-icon2').click(function(){
		$(this).toggleClass('open');
	});

var pagetop, menu, yPos, logo;
var hamburger = document.getElementById("nav-icon2").querySelectorAll(".spanner");
for (var i = 0; i < hamburger.length; i++) {
  hamburger[i]
}
window.addEventListener("scroll", yScroll);
function yScroll(){
  logo = document.getElementById('logo');
	pagetop = document.getElementById('pagetop');
	menu = document.getElementById('menu');

	yPos = window.pageYOffset;
	if(yPos > 50){
      pagetop.style.backgroundColor ="#fff";
		pagetop.style.height = "90px";
		pagetop.style.paddingTop = "8px";
      logo.style.color="#DA1932";
      logo.style.fontSize="60px";
      for (var i = 0; i < hamburger.length; i++) {
        hamburger[i].style.backgroundColor= "#22327B";
      }




	} else {
  pagetop.style.backgroundColor ="transparent";
		pagetop.style.height = "120px";
		pagetop.style.paddingTop = "30px";
    logo.style.color="#fff";
    logo.style.fontSize="100px";
    for (var i = 0; i < hamburger.length; i++) {
      hamburger[i].style.backgroundColor= "#fff";
    }


	}
}

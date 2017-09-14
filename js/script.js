$(window).scroll(function(){
    if ($(this).scrollTop() > 5) {
      $('.Menu').css("backgroundColor", "black");

    } else if ($(this).scrollTop() < 5){
          $('.Menu').css("backgroundColor", "transparent");

    }
});

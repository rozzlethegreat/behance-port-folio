var pagetop, menu, yPos, logo, APIKey, DesignersProfile, first_name, last_name, city;
var designerIDs = new Array();
var projectIDs = new Array();
var hamburger = document.getElementById("nav-icon2").querySelectorAll(".spanner");
$('.MenuOpen').css("display", "none");
for (var i = 0; i < hamburger.length; i++) {
  hamburger[i]
}
window.addEventListener("scroll", yScroll);

//Smooth Scrolling with in page anchors
        $("a").on('click', function(event) {
$('.MenuOpen').css("display", "none");
  $('#nav-icon2').toggleClass('open');

           if (this.hash !== "") {

             event.preventDefault();


             var hash = this.hash;

console.log(hash);
             $('html, body').animate({
               scrollTop: $(hash).offset().top
             }, 800, function(){

               window.location.hash = hash;
             });
           }
         });

function yScroll() {
  logo = document.getElementById('logo');
  pagetop = document.getElementById('pagetop');
  menu = document.getElementById('menu');
  yPos = window.pageYOffset;
  if (yPos > 50) {
    pagetop.style.backgroundColor = "#fff";
    pagetop.style.height = "90px";
    pagetop.style.paddingTop = "8px";
    logo.style.color = "#DA1932";
    logo.style.fontSize = "60px";
    for (var i = 0; i < hamburger.length; i++) {
      hamburger[i].style.backgroundColor = "#22327B";
    }
  } else {
    pagetop.style.backgroundColor = "transparent";
    pagetop.style.height = "120px";
    pagetop.style.paddingTop = "30px";
    logo.style.color = "#fff";
    logo.style.fontSize = "100px";
    for (i = 0; i < hamburger.length; i++) {
      hamburger[i].style.backgroundColor = "#fff";
    }
  }
}
$('#nav-icon2').click(function() {
  $('#nav-icon2').toggleClass('open');
    console.log($('.open').length);
    if ($('.open').length === 1) {

        $('.MenuOpen').css("display", "block");

    }else {

        $('.MenuOpen').css("display", "none");
    }
});
$('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: 200
});
// ***REQUESTS*** //
$.ajax({
  url: "./config.json",
  dataType: "json",
  beforeSend: function(xhr) {
    if (xhr.overrideMimeType) {
      xhr.overrideMimeType("application/json");
    }

  },
  success: function(DataFromJson) {

    DesignersProfile = DataFromJson.Designers;
    APIKey = DataFromJson.accessToken;
    getRippedDesigners();
  },
  error: function() {
    console.log("Something Went Wrong");
  }
})

function getRippedDesigners() {
  $.ajax({
    url: "http://www.behance.net/v2/users/" + DesignersProfile + "/following?client_id=" + APIKey,
    dataType: "jsonp",
    success: function(DataFromJson) {

      for (var i = 0; i < DataFromJson.following.length; i++) {
        designerIDs.push(DataFromJson.following[i]);
      }

      getProjects();
    },
    error: function() {
      console.log("Something Went Wrong");
    }
  })
}

function getProjects() {

		for (var i = 0; i < designerIDs.length; i++) {
    $.ajax({

      url: "http://www.behance.net/v2/users/" + designerIDs[i].id + "/projects?client_id=" + APIKey,
      dataType: "jsonp",
      success: function(DataFromJson) {


				projectIDs.push(DataFromJson.projects[0].id);
				if (projectIDs.length > 11) {
					getProjectImg();
				}

      },
      error: function() {
        console.log("Something Went Wrong");

      }

    })
  }

}

function getProjectImg(){
    for (var i = 0; i < projectIDs.length; i++) {
        var gridItems = [];
        gridItems.push('grid-item'+i);
        first_name = designerIDs[i].first_name;
      last_name = designerIDs[i].last_name;
          city = designerIDs[i].city;
          console.log(first_name, last_name, city);
        $.ajax({
            url: "http://www.behance.net/v2/projects/"+projectIDs[i]+"?client_id=" + APIKey,
            dataType: "jsonp",
            success: function(DataFromJson) {
                $('.grid').append("<div class='grid-item img-tag'><a id='aLink' data-remodal-target='modal'><img class='img grid-item img-tag' style='background-image: url("+DataFromJson.project.covers.original+")'></img><h1 class='Dets'>"+DataFromJson.project.owners[0].display_name+"</h1></a></div>");
                if ($('.grid-item').length >= 12) {

                    hoverEffect();
                  }

            },
            error: function() {
                console.log("Something Went Wrong");

            }

        })
    }
}


function hoverEffect(){
  var boxes = document.querySelectorAll('.grid-item');

for (var i = 0; i < boxes.length; i++) {
  boxes[i].style.height = boxes[i].offsetWidth + 'px';
  boxes[i].addEventListener("mouseenter", function(e) {
    TweenMax.to(e.target.querySelector('img'), 10, {
      scale: "1.15"
    });
  });
  boxes[i].addEventListener("mouseleave", function(e) {
    TweenMax.to(e.target.querySelector('img'), 0.9, {
      scale: "1"
    });
  });
}
}
// var thisvar;
// $(document).on("mouseenter", ".img-tag, .Dets", function() {
//     $(this).css('background-color', '#000');
//     $(this).css('opacity', '0.8');
//     $(this).css('transition', 'opacity 1s ease');
//     $(this).find('.Dets').css('display', "table-cell");
//     $(this).find('.Dets').css('opacity', "1");
//     thisvar = $(this);
//     console.log(thisvar);
// });
//
// $(document).on("mouseout", ".img-tag, Dets", function() {
//     $(this).css('opacity', '1');
//         $(this).find('.Dets').css('display', "none");
// });
// $(document).on("mouseenter", ".Dets", function() {
//   thisvar.css('background-color', '#000');
//   thisvar.css('opacity', '0.8');
//   thisvar.css('transition', 'opacity 1s ease');
//     $(this).css('display', "table-cell");
// });

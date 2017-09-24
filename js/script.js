var pagetop, menu, yPos, logo, APIKey, DesignersProfile, first_name, last_name, city;
var designerIDs = new Array();
var projectIDs = new Array();
var projects = new Array();
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
    }, 800, function() {

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

  } else {

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
var id, first_name, last_name, city, dp, projectscover

function getRippedDesigners() {
  $.ajax({
    url: "http://www.behance.net/v2/users/" + DesignersProfile + "/following?client_id=" + APIKey,
    dataType: "jsonp",
    success: function(DataFromJson) {
      for (var i = 0; i < DataFromJson.following.length; i++) {
        designerIDs.push(DataFromJson.following[i]);
      };

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

        // for (var i = 0; i < 9; i++) {
          projects.push(DataFromJson);
        // .projects[i].owners[0].first_name[DataFromJson.projects[i].id, DataFromJson.projects[i].name, DataFromJson.projects[i].covers.original, ]
        if (projectIDs.length > 11) {
          getProjectImg();
        };
        console.log(projects);

      },
      error: function() {
        console.log("Something Went Wrong");

      }

    })
  }

}

function getProjectImg() {
  for (var i = 0; i < projectIDs.length; i++) {
    var gridItems = [];
    gridItems.push('grid-item' + i);


    $.ajax({
      url: "http://www.behance.net/v2/projects/" + projectIDs[i] + "?client_id=" + APIKey,
      dataType: "jsonp",
      success: function(DataFromJson) {

        $('.grid').append("<div class='grid-item img-tag'><a id='aLink' data-remodal-target='modal'><img class='img grid-item img-tag' style='background-image: url(" + DataFromJson.project.covers.original + ")'></img><h1 class='Dets'>" + DataFromJson.project.owners[0].first_name + "</h1></a></div>");

        if ($('.grid-item').length >= 24) {

          hoverEffect();
          getStuff();

        } else {
          return;
        }

      },
      error: function() {
        console.log("Something Went Wrong");

      }

    })
  }
}


function hoverEffect() {
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
if ($('.grid-item').length > 12) {
  getStuff();
}
var projectBoxes = $('.project');
function getStuff() {
  $('.grid-item').on("click", function() {
    for (var i = 0; i < 12; i++) {
      var owner = $(this).find('.Dets').html();
      if (owner == designerIDs[i].first_name) {
        dp = designerIDs[i].images[230];
        first_name = designerIDs[i].first_name;
        last_name = designerIDs[i].last_name;
        city = designerIDs[i].city;

        followers = designerIDs[i].stats.followers;
        appris = designerIDs[i].stats.appreciations;
        views = designerIDs[i].stats.views;
        console.log(designerIDs);
        $('.circlePic').css("background-image", "url(" + dp + ")");
        $('#User').empty();
        $('#User').append(first_name + " " + last_name);
        $('#city').empty();
        $('#city').append(city);
        $('#views').empty();
        $('#views').append(views);
        $('#appris').empty();
        $('#appris').append(appris);
        $('#followers').empty();
        $('#followers').append(followers);
        console.log(owner);
        console.log(projects[i].projects[0].owners[0].first_name);
        console.log(projects[i].);
        for (var i = 0; i < projectBoxes.length; i++) {
          if (owner == projects[i].projects[0].owners[0].first_name) {
            // projectBoxes[i].css("background-image", "url("+projects[i].projects[i]+")" )
            }
          }

      }
      // if (owner > projects.) {
      //
      // }

    };

  });



}

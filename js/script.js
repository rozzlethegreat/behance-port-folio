var pagetop, menu, yPos, logo, APIKey, DesignersProfile, first_name, last_name, city, identity;
var artistName = [], workName = [], views = [], appreciations = [], comments = [];
var designerIDs = new Array();
var projectIDs = new Array();
var projectIdss;
var projects = new Array();
var projectIden =  new Array();
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

        var sArtistName = DataFromJson.projects[0].owners[0].display_name;
var sViews = DataFromJson.projects[0].stats.views;
var sAppreciations = DataFromJson.projects[0].stats.appreciations;
var sComments = DataFromJson.projects[0].stats.comments;
var sName = DataFromJson.projects[0].name;
console.log(artistName[1]);
artistName.push(sArtistName);
views.push(sViews);
appreciations.push(sAppreciations);
comments.push(sComments);
workName.push(sName);
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

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
function getStuff() {
  $('.grid-item').on("click", function() {
    for (var i = 0; i < 12; i++) {
      var owner = $(this).find('.Dets').html();
      if (owner == designerIDs[i].first_name) {
        dp = designerIDs[i].images[230];
        identity = (designerIDs[i].id);
        first_name = designerIDs[i].first_name;
        last_name = designerIDs[i].last_name;
        city = designerIDs[i].city;
        followers = designerIDs[i].stats.followers;
        appris = designerIDs[i].stats.appreciations;
        views = designerIDs[i].stats.views;
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
        projectIden = [];
    $('.box').empty();
        for (var i = 0; i < 12; i++) {
          if (owner == projects[i].projects[0].owners[0].first_name) {
            for (var j = 0; j < 8; j++) {
              $('.box').append("<div class='project' style='background-image: url(" + projects[i].projects[j].covers[404] + ")'></div>");
              projectIdss = projects[i].projects[j].id;

              projectIden.push(projects[i].projects[j]);
console.log(
  projectIden
);
              console.log(projectIden);
            }
            }
          }
            getimg();
      }
    };
  });
}
function getimg(){
  $('.project').on("click", function(){
      var bg = $(this).css('background-image');
      bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
      for (var i = 0; i < projectIden.length; i++) {
        if (bg == projectIden[i].covers[404]) {
          console.log(projectIden[i].id);
          var projectCode = projectIden[i].id;
          $.ajax({
            url: "http://www.behance.net/v2/projects/" + projectCode + "?client_id=" + APIKey,
            dataType: "jsonp",
            success: function(DataFromJson) {
              console.log(DataFromJson);
              $('.box').empty();
              for (var i = 0; i < projectIden.length; i++) {
                var names = [];
                names.push(DataFromJson.project.modules[i]);
                var found_names = $.grep(names, function(v) {
                  return v.type === "image";
                });
                console.log(found_names);
                $('.box').append("<img class='projectImages' style='background-image: url(" + found_names[i].sizes.max_1200+ ")'></img>")
              }

            },
            error: function() {
              console.log("Something Went Wrong");

            }

          })
        }
      }

  })
}

function drawTable() {
    var cssClassNames = {
        'headerRow': 'font-family title-style',
        'tableRow': 'font-family',
        'oddTableRow': 'font-family',
        'selectedTableRow': 'selected',
        'hoverTableRow': 'red-color'
        };


    var options = {'showRowNumber': true, 'allowHtml': true, 'cssClassNames': cssClassNames};
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Artist');
    data.addColumn('string', 'Work');
    data.addColumn('number', 'Views');
    data.addColumn('number', 'Appreciations');
    data.addColumn('number', 'Comments');
    for (var i = 0; i < projectIDs.length; i++) {
        data.addRow([artistName[i], workName[i], views[i], appreciations[i], comments[i]]);
    }

    var table = new google.visualization.Table(document.getElementById('table-div'));

    table.draw(data, options);
}

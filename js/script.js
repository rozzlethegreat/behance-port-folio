


var artistName = [], workName = [], views = [], appreciations = [], comments = [];
var pagetop, menu, yPos, logo, APIKey, DesignersProfile;
var designerIDs = new Array();
var projectIDs = new Array();
var hamburger = document.getElementById("nav-icon2").querySelectorAll(".spanner");
for (var i = 0; i < hamburger.length; i++) {
  hamburger[i]
}



window.addEventListener("scroll", yScroll);

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
    // console.log($('.open').length);
    if ($('.open').length === 1) {
      $('*').css("overflow-y", "hidden");
        $('.MenuOpen').css("display", "block");

    }else {
      $('*').css("overflow-y", "auto");
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
});

function getRippedDesigners() {
  $.ajax({
    url: "http://www.behance.net/v2/users/" + DesignersProfile + "/following?client_id=" + APIKey,
    dataType: "jsonp",
    success: function(DataFromJson) {

      for (var i = 0; i < DataFromJson.following.length; i++) {
        designerIDs.push(DataFromJson.following[i].id);
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

      url: "http://www.behance.net/v2/users/" + designerIDs[i] + "/projects?client_id=" + APIKey,
      dataType: "jsonp",
      success: function(DataFromJson) {
				projectIDs.push(DataFromJson.projects[0].id);
				if (projectIDs.length > 11) {
					getProjectImg();
				}
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

function getProjectImg(){
    for (var i = 0; i < projectIDs.length; i++) {
        $.ajax({
            url: "http://www.behance.net/v2/projects/"+projectIDs[i]+"?client_id=" + APIKey,
            dataType: "jsonp",
            success: function(DataFromJson) {
                $('.grid').append("<div class='grid-item img-tag' data-toggle='modal' data-target='#myModal'>" +
                    "<img class='grid-item img-tag' style='background-image: url("+DataFromJson.project.covers.original+")'></div>");
                if ($('.grid-item').length > 11) {
                    hoverEffect();
                  }
            },
            error: function() {
                console.log("Something Went Wrong");

            }

        })
    }
}

$('.MenuOpen').css("display", "none");

function hoverEffect() {
    var boxes = document.querySelectorAll('.grid-item');

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.height = boxes[i].offsetWidth + 'px';
        boxes[i].addEventListener("mouseenter", function (e) {
            TweenMax.to(e.target.querySelector('img'), 10, {
                scale: "1.15"
            });
        });
        boxes[i].addEventListener("mouseleave", function (e) {
            TweenMax.to(e.target.querySelector('img'), 0.9, {
                scale: "1"
            });
        });

    }
}


$(document).on("mouseenter", ".img-tag", function() {
    $(this).css('background-color', '#000');
    $(this).css('opacity', '0.6');
    $(this).css('transition', 'opacity 2s ease');
});

$(document).on("mouseout", ".img-tag", function() {
    $(this).css('opacity', '1');
});

function drawTable() {
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

    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
}
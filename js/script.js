var pagetop, menu, yPos, logo, APIKey, DesignersProfile, first_name, last_name, city, identity, owner, owner2, owner3, url, url2, id, first_name, last_name, city, dp, projectscover;
var artistName = [],
  workName = [],
  views = [],
  appreciations = [],
  comments = [];
var designerIDs = new Array();
var projectIDs = new Array();
var projectIdss;
var projects = new Array();
var projectIden = new Array();
var hamburger = document.getElementById("nav-icon2").querySelectorAll(".spanner");
$('.MenuOpen').css("display", "none");
for (var i = 0; i < hamburger.length; i++) {
  hamburger[i]
}
window.addEventListener("scroll", yScroll);
$("a").on('click', function(event) {
  $('.MenuOpen').css("display", "none");
  $('#nav-icon2').toggleClass('open');

  if (this.hash !== "") {
    event.preventDefault();
    var hash = this.hash;
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
        projects.push(DataFromJson);
        if (projectIDs.length > 11) {
          getProjectImg();
        };
        var sArtistName = DataFromJson.projects[0].owners[0].display_name;
        var sViews = DataFromJson.projects[0].stats.views;
        var sAppreciations = DataFromJson.projects[0].stats.appreciations;
        var sComments = DataFromJson.projects[0].stats.comments;
        var sName = DataFromJson.projects[0].name;
        artistName.push(sArtistName);
        views.push(sViews);
        appreciations.push(sAppreciations);
        comments.push(sComments);
        workName.push(sName);
        google.charts.load('current', {
          'packages': ['table']
        });
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
  $('.fa-arrow-left').on("click", function() {
    $('.fa-arrow-left').css("display", "none");
    $('.box').empty();
    owner2 = owner3;
    onClick();
  });
  $('.grid-item').click(onClick);

  function onClick() {
    for (var i = 0; i < 12; i++) {
      owner = $(this).find('.Dets').html();
      if (owner == designerIDs[i].first_name || owner2 == designerIDs[i].first_name) {
        $('.box').css("background-color", "white")
        dp = designerIDs[i].images[230];
        identity = (designerIDs[i].id);
        first_name = designerIDs[i].first_name;
        last_name = designerIDs[i].last_name;
        city = designerIDs[i].city;
        followers = designerIDs[i].stats.followers.toLocaleString(
          undefined, {
            minimumFractionDigits: 0
          }
        );
        appris = designerIDs[i].stats.appreciations.toLocaleString(
          undefined, {
            minimumFractionDigits: 0
          }
        );
        views = designerIDs[i].stats.views.toLocaleString(
          undefined, {
            minimumFractionDigits: 0
          }
        );
        $('.circlePic').empty();
        if (dp !== undefined) {
          $('.circlePic').css("background-image", "url(" + dp + ")");
        } else {
          return;
        }
        $('#changed').empty();
        $('#changed').append('View Profile');
        $('#User').empty();
        $('#User').append(first_name + " " + last_name);
        $('#city').empty();
        $('#city').append("<i class='fa fa-map-marker icons'></i><p class='city'>" + city + "</p>");
        $('#views').empty();
        $('#views').append("<i class='fa fa-eye icons'></i><p class='city'>" + views + "</p>");
        $('#appris').empty();
        $('#appris').append("<i class='fa fa-heart icons'></i><p class='city'>" + appris + "</p>");
        $('#followers').empty();
        $('#followers').append("<i class='fa fa-users icons'></i><p class='city'>" + followers + "</p>");
        projectIden = [];
        $('.box').empty();
        url = designerIDs[i].url
        for (var i = 0; i < 12; i++) {
          if (owner == projects[i].projects[0].owners[0].first_name || owner2 == projects[i].projects[0].owners[0].first_name) {
            owner2 = "";
            for (var j = 0; j < 8; j++) {
              $('.box').append("<div class='project' style='background-image: url(" + projects[i].projects[j].covers[404] + ")'></div>");
              projectIdss = projects[i].projects[j].id;
              projectIden.push(projects[i].projects[j]);
            }
          }
        }
        getimg();
        $('.fa-behance').on("click", function() {
          window.location.href = url;
        });
        $('#sendTo').on("click", function() {
          window.location.href = url;
        });
      }
    };

  }


}

function getimg() {
  $('.project').on("click", function() {
    $('.fa-arrow-left').css("display", "block");
    var bg = $(this).css('background-image');
    bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
    for (var i = 0; i < projectIden.length; i++) {
      if (bg == projectIden[i].covers[404]) {
        var projectCode = projectIden[i].id;
        $.ajax({
          url: "http://www.behance.net/v2/projects/" + projectCode + "?client_id=" + APIKey,
          dataType: "jsonp",
          success: function(DataFromJson) {
            $('.project').css('margin', '0px')
            $('#changed').empty();
            $('#changed').append('View Project');
            $('#User').empty();
            $('#User').append(DataFromJson.project.name);
            appris = DataFromJson.project.stats.appreciations.toLocaleString(
              undefined, {
                minimumFractionDigits: 0
              }
            );
            views = DataFromJson.project.stats.views.toLocaleString(
              undefined, {
                minimumFractionDigits: 0
              }
            );
            $('#city').empty();
            $('#city').append("<p class='city'>" + DataFromJson.project.owners[0].display_name + "</p>");
            $('#views').empty();
            $('#views').append("<i class='fa fa-eye icons'></i><p class='city'>" + views + "</p>");
            $('#appris').empty();
            $('#appris').append("<i class='fa fa-heart icons'></i><p class='city'>" + appris + "</p>");
            $('.box').empty();
            owner3 = DataFromJson.project.owners[0].first_name;
            $('#followers').empty();
            $('.projectText').css('color', 'black');
            $('.projectText').css("margin-top", "0px");
            url2 = DataFromJson.project.url;
            $('#sendTo').on("click", function() {
              window.location.href = url2;
            });
            for (var i = 0; i < DataFromJson.project.modules.length; i++) {
              $('.box').css("background-color", "#" + DataFromJson.project.styles.background.color);
              $('.projectItem').css("margin-bottom", DataFromJson.project.styles.spacing.modules.bottom_margin + "px");
              if (DataFromJson.project.modules[i].type == "text") {
                $('.projectText').css('color', DataFromJson.project.styles.text.paragraph.color);
                $('.projectText').css('font-size', DataFromJson.project.styles.text.paragraph.font_size);
                $('.projectText').css('line-height', DataFromJson.project.styles.text.paragraph.line_height);
                $('.box').append("<p class='projectText projectItem'> " + DataFromJson.project.modules[i].text_plain + "</p>");
                $('.projectText').css("margin-top", DataFromJson.project.styles.spacing.project.top_margin + "px");
              } else if (DataFromJson.project.modules[i].type == "image") {
                if (DataFromJson.project.modules[i].sizes.max_1200 !== undefined) {
                  $('.box').append("<img class='projectImages projectItem' src=" + DataFromJson.project.modules[i].sizes.max_1200 + "></img>")
                }
              }

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

  var options = {
    'showRowNumber': true,
    'allowHtml': true,
    'cssClassNames': cssClassNames
  };
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
$('#statsButton').on("click", function() {
  $('#table-div').css("display", "block");
  $('.footer').css("height", "40vh")
  $('#statsButton').css("display", "none");
  $('#HideButton').css("display", "block");
})
$('#HideButton').on("click", function() {
  $('#table-div').css("display", "none");
  $('.footer').css("height", "25vh")
  $('#HideButton').css("display", "none");
  $('#statsButton').css("display", "block");
});

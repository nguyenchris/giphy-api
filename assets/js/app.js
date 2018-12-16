// GIF Controller
const gifController = (function () {
  let topics = ["Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls", "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors", "Houston Rockets", "Indiana Pacers", "LA Clippers", "Los Angeles Lakers", "Memphis Grizzlies", "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks", "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards"]

  return {
    
    // method to return topics array
    getTopics: function () {
      return topics;
    },

    // Method to return all topics without whitespace
    getTopicsNoSpace: function () {
      const topic2 = [];

      topics.forEach(el => {
        if (el.includes(' ')) {
          let newEl = el.split(" ").join("-")
          topic2.push(newEl)
        } else {
          topic2.push(el);
        }
      })
      return topic2;
    },

    // Method to input newly added topic to topics array
    updateTopics: function (el) {
      topics.push(el);
    }
  };
})();





// UI Controller
const uiController = (function () {
  const cacheDom = {
    $categories: $('.categories'),
    $gifContent: $('.gif-content'),
    $gifButton: $('.gif-button'),
    $xButton: $('.x-button'),
    $form: $('form'),
    $search: $('#search')
  }


  return {

    // Method to return CacheDOM
    getDom: () => {
      return cacheDom;
    },

    // Generates list of category buttons in sidebar
    genButtons: function (arr, arrNoSpace) {

      cacheDom.$gifContent.empty();

      let html = `<li class='gif-button' data-type='%type%'><a class='waves-effect'>%topic%</a></li>`
      let newButtons = '';
      let newHtml;

      for (i = 0; i < arr.length; i++) {
        newHtml = html.replace('%topic%', arr[i]).replace('%type%', arrNoSpace[i])
        newButtons += newHtml;
      }
      cacheDom.$categories.append(newButtons);
    }
  }
})();




// GLOBAL APP Controller
const appController = (function (uiCtrl, gifCtrl) {

  var dom = uiCtrl.getDom();

  // Sets up all event listeners
  const setupEventListeners = function () {
    $(document).on('click', '.gif-button', function () {

      dom.$gifContent.empty();

      $('.gif-button').removeClass('active');
      $(this).addClass("active");

      let type = $(this).attr("data-type");

      let queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=iQnMlnNxPVU7zfdNmAh9iJv9JrOGncnS&limit=10";


      $.ajax({
        url: queryUrl,
        method: 'GET'
      }).then(function (response) {
        let results = response.data;

        for (i = 0; i < results.length; i++) {
          let newDiv = $("<div class='gif-item z-depth-1 hoverable'>");

          let rating = results[i].rating;

          let p = $("<p class='rating'>").text("Rating: " + rating);

          let animated = results[i].images.fixed_height.url;
          let still = results[i].images.fixed_height_still.url;

          let newImage = $("<img>");
          newImage.attr("src", still);
          newImage.attr("data-still", still);
          newImage.attr("data-animate", animated);
          newImage.attr("data-state", "still");
          newImage.addClass("gif-image");

          newDiv.append(newImage);
          newDiv.append(p);

          dom.$gifContent.append(newDiv);
        }
      });
    });


    // Click event Listener for clicking a gif to animate
    $(document).on("click", ".gif-image", function () {

      let state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });


    // Click event listener for x button to clear input field
    $(document).on('click', '.x-button', function () {
      dom.$search.val('');
    });


    // event listener for submit and plus button
    $('.submit-btn, .add-button').on('click', function (event) {

      event.preventDefault();
      let value = dom.$search.val().trim();

      if (value.length >= 2) {
        dom.$search.val('')
        gifCtrl.updateTopics(value);
        uiCtrl.genButtons(gifCtrl.getTopics(), gifCtrl.getTopicsNoSpace())
      }
    });
  };


  return {
    init: function () {
      uiCtrl.genButtons(gifCtrl.getTopics(), gifCtrl.getTopicsNoSpace())
      setupEventListeners();
    }
  }

})(uiController, gifController);

appController.init();
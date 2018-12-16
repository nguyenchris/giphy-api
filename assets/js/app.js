// M.AutoInit();




const gifController = (function () {
  let topics = ["Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls", "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors", "Houston Rockets", "Indiana Pacers", "LA Clippers", "Los Angeles Lakers", "Memphis Grizzlies", "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks", "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards"]

  return {
    getTopics: function () {
      return topics;
    },

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
    }
  };

})();






const uiController = (function () {
  const cacheDom = {
    $categories: $('.categories'),
    $gifContent: $('.gif-content'),
    $gifButton: $('.gif-button')
  }


  return {
    getDom: () => {
      return cacheDom;
    },

    genButtons: function (arr, arrNoSpace) {
      let html = `<li class='gif-button' data-type='%type%'><a class=waves-effect'>%topic%</a></li>`
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




const appController = (function (uiCtrl, gifCtrl) {

  var dom = uiCtrl.getDom();

  const setupEventListeners = function () {
    $(document).on('click', '.gif-button', function () {

      dom.$gifContent.empty();

      dom.$gifButton.addClass("active");
      dom.$gifButton.remove();
      // $(this).addClass("active");

      let type = $(this).attr("data-type");

      var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=iQnMlnNxPVU7zfdNmAh9iJv9JrOGncnS&limit=10"

      console.log(queryUrl);


      $.ajax({
        url: queryUrl,
        method: 'GET'
      }).then(function (response) {
        let results = response.data;

        for (i = 0; i < results.length; i++) {
          let newDiv = $("<div class='gif-item'>");

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

          newDiv.append(p);
          newDiv.append(newImage);

          dom.$gifContent.append(newDiv);
        }

      })

    })
  }



  return {
    init: function () {
      uiCtrl.genButtons(gifCtrl.getTopics(), gifCtrl.getTopicsNoSpace())
      setupEventListeners();
    }
  }

})(uiController, gifController);

appController.init();
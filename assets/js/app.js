// var group = ['Arizona Cardinals', 'Tennesee Titans']


// var search;
// var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=iQnMlnNxPVU7zfdNmAh9iJv9JrOGncnS"




$(document).on('click', '.gif-gen', function (event) {
  event.preventDefault();
  $.ajax({
    url: "https://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=iQnMlnNxPVU7zfdNmAh9iJv9JrOGncnS",
    method: 'GET'
  }).then(function (response) {


    console.log(response);
  })

})



// function generateButton() {
//   var html = $("<button class='gif-gen'>");
//   var newHtml

//   for (i = 0; i < group.length; i++) {
//     newHtml = html.text(group[i]);
//     $('.gif-buttons').append(newHtml)
//   }
// }

// generateButton();


var topics = ['Arizona Cardinals', 'San Francisco 49ers', 'San Diego Chargers']






var uiController = (function () {
  var cacheDom = {
    gifButtons: $('.gif-buttons')
  }




  return {
    getDom: () => {
      return cacheDom;
    },
    genButtons: function (arr) {

      arr.forEach(el => {
        var html = `<button class='gif-gen' data-type=${el}>${el}</button>`
        cacheDom.gifButtons.append(html);
      })
    }
  }

})();




var appController = (function (uiCtrl) {
  
  var setupEventListeners = function() {
    $(document).on('click', '.gif-gen', function (event) {
      event.preventDefault();
      $.ajax({
        url: `https://api.giphy.com/v1/gifs/search?q=&api_key=iQnMlnNxPVU7zfdNmAh9iJv9JrOGncnS`,
        method: 'GET'
      }).then(function (response) {

        
        
      })

    })
  }



  return {
    init: () => {
      uiCtrl.genButtons(topics)
      setupEventListeners();
    }
  }

})(uiController);

appController.init();
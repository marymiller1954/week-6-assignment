
$(document).ready(function() {

  var buttonArray = ["poppy", "peony", "tulip", "daffodil", "crocus" ];

  addButton();


  $('#addFlower').on('click', function(event){
    console.log("entering add flower");
    event.preventDefault();
    var newflower = $('#flowerInput').val().trim();
    if (newflower == "")
      {
        alert("Search item cannot be blank, please enter the name of a flower");
        return;
    };

     $('#flowerInput').val("")
    buttonArray.push(newflower);
    console.log("this is the new flower");
    console.log(newflower);
    console.log("going to addButton");
    console.log(buttonArray);
    addButton();
  });  // end addflower

  $('#flowerButton').on('click', '.flower', function(){
    event.preventDefault();
    console.log("flower button clicked");
    var theButtonText = this.textContent;
    var querycategory = " flower";
      //replace space with +
       var searchText = theButtonText.replace(" ", "+");
       searchText = searchText +querycategory;
       searchText = searchText.replace(" ", "+");
       var rating = "rating=g";
       var queryURL = "http://api.giphy.com/v1/gifs/search?q="+searchText+"&limit=10&api_key=dc6zaTOxFJmzC&rating=g";
      //make the ajax call
      $.ajax({url: queryURL, method: 'GET'}).done(function(ajaxResponse)
   {
        addGifs(ajaxResponse);
   });//end ajax{GET}
  })//end #flowerButton').on('click


  $("#giphysGoHere").on('click', '.giphy', function(){   
    animateGifs(this);
  })// end "("#giphysGoHere").on('click



  function addButton(){
    $('.flower').remove();
    for (var i = 0; i < buttonArray.length; i++) {
      var $button = $('<button>') // create <button></button> tag.
      $button.addClass('flower btn'); // Added a class
      $button.attr('data-name', buttonArray[i]); // Added a data-attribute
      $button.html(buttonArray[i]); // Provided the initial button text
      $('#flowerButton').append($button); // Added the button to the HTML
    };  // end for loop
  }; //end addButton()

  function addGifs(ajaxResponse){
    event.preventDefault();

    for (var objNdx = 0; objNdx < ajaxResponse.data.length; objNdx++) {
      
      var gifUrlAnime = ajaxResponse.data[objNdx].images.fixed_height.url;
      var gifUrlStill = ajaxResponse.data[objNdx].images.fixed_height_still.url;
      var gifHeight = ajaxResponse.data[objNdx].images.fixed_height.height; 
      var gifRating = ajaxResponse.data[objNdx].rating;
      var $div=$('<div>');
      $div.addClass("gifDiv pull-left");
      var $p=$('<p>').text("Rating: "+gifRating);
      $p.addClass("text-center");
      var $gifImage = $('<img>');
      $gifImage.attr('src', gifUrlStill);
      $gifImage.attr('data-still', gifUrlStill);
      $gifImage.attr('data-animate', gifUrlAnime);
      $gifImage.attr('data-state', 'still');
      $gifImage.addClass('giphy');     
      $div.append($gifImage);
      $div.append($p);
      $('#giphysGoHere').prepend($div);
    } //end for loop
  }  // end function addGifs

  function animateGifs(gifClicked){
    if ( $(gifClicked).attr('data-state') == 'still'){
      $(gifClicked).attr('src', $(gifClicked).data('animate'));
      $(gifClicked).attr('data-state', 'animate');
    }else{
      $(gifClicked).attr('src', $(gifClicked).data('still'));
      $(gifClicked).attr('data-state', 'still');
    } //end else
  }   //end animateGits


}); //end document).ready

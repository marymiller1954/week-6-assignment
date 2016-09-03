
$(document).ready(function() {

  var buttonArray = ["Jimi Hendrix", "Paul Simon", "Rod Stewart", "Jim Morrison", "Bob Dylan" ];

  addButton();


  $('#addmuscian').on('click', function(event){

    event.preventDefault();
    var newmuscian = $('#muscianInput').val().trim();
    if (newmuscian === "") {

          errormsg();
          
            return;
      
        } //end if
  else {

     $('#muscianInput').val("")

    buttonArray.push(newmuscian);

    addButton();

  }  //end else

  });  // end addmuscian

  $('#muscianButton').on('click', '.muscian', function(){
    event.preventDefault();

    var theButtonText = this.textContent;
    var querycategory = " music";
      //replace space with +
       var searchText = theButtonText.replace(" ", "+");
       searchText = searchText + querycategory;
       searchText = searchText.replace(" ", "+");
       var rating = "rating=g";
       var queryURL = "api.giphy.com/v1/gifs/search?q="+searchText+"&limit=10&api_key=dc6zaTOxFJmzC&rating=g";
      //make the ajax call
      $.ajax({url: queryURL, method: 'GET'}).done(function(ajaxResponse)
   {
        addGifs(ajaxResponse);
   });//end ajax{GET}
  })//end #muscianButton').on('click


  $("#giphysGoHere").on('click', '.giphy', function(){   
    animateGifs(this);
  })// end "("#giphysGoHere").on('click



  function addButton(){
    $('.muscian').remove();
    for (var i = 0; i < buttonArray.length; i++) {
      var $button = $('<button>') // create <button></button> tag.
      $button.addClass('muscian btn'); // Added a class
      $button.attr('data-name', buttonArray[i]); // Added a data-attribute
      $button.html(buttonArray[i]); // Provided the initial button text
      $('#muscianButton').append($button); // Added the button to the HTML
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


function errormsg() {
              var modal = document.getElementById('myModal');
              var span = document.getElementsByClassName("close")[0];
               modal.style.display = "block";

             span.onclick = function() {
              modal.style.display = "none";
             }


             window.onclick = function(event) {
              if (event.target == modal) {
                  modal.style.display = "none";
              }
            }
          }  //end function error message








}); //end document).ready

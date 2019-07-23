window.onload = function(){
let loadGif = ['Jay-Z', 'Beyonce', 'Smino', 'Chance The Rapper', 'Kendrick Lamar', 'Asap Rocky', 'Rhianna', 'Puff Daddy', 'Childish Gambino', 'Kanye West' ];
const buttonArea= $('.buttonArea');
const textArea = $('#textArea');
const searchArea = $('.searchArea');
const gifArea= $('.gifArea');

//creates the buttons 
function createButton (search){
    const newButton = $('<button>')
    newButton.attr('value', search.toLowerCase()).text(search);
    buttonArea.append(newButton);
    
}
// turns the data into the gifs and applys data-stata
function giphy(data){

    data.map(item => {
    let source= item.images.original.url;

    console.log(source);
    const newdiv = $('<div>');
    newdiv.addClass('gifDiv');
    const img = $('<img>'); 
    const rating = $('<h3>');
    rating.text('Rating: '+item.rating);

    img.attr("src", source);
    img.attr('data-state', 'animate');
    img.attr('data-animate', source);
    img.attr('data-still', item.images.original_still.url);
    newdiv.append(rating,img);
    gifArea.prepend(newdiv);
    })

}
//gets the results of the search
function getResults(search){
$.ajax({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=mquIIUiIFE2aPJyIIgWtpvnTxzj6ZKMv&limit=10&rating=PG`
    })
.then( response =>{
    let data = response.data;
    console.log(data);
    giphy(data);
    
})
}
//on click function to create button and populate gif
$('#submitButton').on('click', function (){
    let query = textArea.val().toLowerCase().trim();
    event.preventDefault();
    createButton(query);
    getResults(query);
    textArea.val('');
    
    console.log(query);
    
    
})
// populate gif based on buttons already created
$(document).on('click','button', function(){
    let data = $(this).attr('value');
    getResults(data);
    
})
//pauses the gif
$(document).on('click','img', function(){
    let state = $(this).attr('data-state');
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

})
//loads the gif at the beginning of this app
loadGif.map( elem =>{
    createButton(elem);  
})


}
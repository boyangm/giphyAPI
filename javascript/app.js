window.onload = function(){
let loadGif = ['dolphin', 'monkey', 'lizard', 'elephant', 'crab', 'frog', 'tutrle', 'dog', 'mouse', 'horse' ];
const buttonArea= $('.buttonArea');
const textArea = $('#textArea');
const searchArea = $('.searchArea');
const gifArea= $('.gifArea');


function createButton (search){
    const newButton = $('<button>')
    newButton.attr('value', search).text(search);
    buttonArea.append(newButton);
    
}
function giphy(data){
    gifArea.empty();
    data.map(item => {
    let source= item.images.original.url;
    console.log(source);
    const img = $('<img>');
    img.attr("src", source);
    img.attr('data-state', 'animate');
    gifArea.append(img);
    })

}
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
$('#submitButton').on('click', function (){
    let query = textArea.val().trim();
    event.preventDefault();
    createButton(query);
    getResults(query);
    textArea.val('');
    
    console.log(query);
    
    
})
$(document).on('click','button', function(){
    let data = $(this).attr('value');
    getResults(data);
    
})
loadGif.map( elem =>{
    createButton(elem);  
})


}
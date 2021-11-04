// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// ===================== AJAX FUNCTIONS ========================== //

// document init functions ready
$(document).ready(function(){
    console.log("hi")
});
// url of api sample rest
var url = 'http://localhost/ajax-api-app/samplerest/';

// login student data
function login() {
    const email = $("#email").val();
    const password = $("#password").val();
    // object variable
    item = {}
    // inputs will be turned into object
    item ["email"] = email;
    item ["password"] = password;
    // stringify the object
    item = JSON.stringify(item);
    // ajax
    $.ajax({
        // var url + student
        url: url+'login', 
        type: 'post',
        dataType: 'json',
        // data as item
        data:  item 
    })
    // if success
    .done( function( data ) {
        // set id as local storage
        localStorage.setItem("user", data.payload.id);
        // change the page
        document.location.href = "index.html";
        // alert message
        alert(data.status.message)
    })
    // if failed
    .fail( function( data ) {
        console.log(data);
    });
}
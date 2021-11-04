// ==================== MOAL FUNCTIONS ========================== //

// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// ===================== AJAX FUNCTIONS ========================== //

// student data global variable
var stud_data;
var studnum_id;
var edit_data;
var user;
// document init functions ready
$(document).ready(function(){
    getStudents();
    getUser();
});
// url of api sample rest
var url = 'http://localhost/ajax-api-app/samplerest/';
// get all student data
function getStudents() {
    $.ajax({
        // url student -> gets all students
        url: url+'student',
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            // get payload and make it into stud data
            stud_data = response.payload;
            // length of how many students
            var len = stud_data.length;
            // for loop each student 
            for(var i=0; i<len; i++){
                // each field as variable
                var recordno = stud_data[i].recno_fld;
                var studno = stud_data[i].studnum_fld;
                var fname = stud_data[i].fname_fld;
                var lname = stud_data[i].lname_fld;
                var email = stud_data[i].email_fld;
                var pw = stud_data[i].pword_fld;
                // html string for table row with field variables
                var tr_str = "<tr>" +
                "<td>" + recordno + "</td>" +
                "<td>" + studno + "</td>" +
                "<td>" + fname + ' ' + lname + "</td>" +
                "<td> <button class='button-37' onclick='openEditModal("+recordno+")'> edit </button>" +
                "<button class='button-13' onclick='deleteStudent("+recordno+")'> <i class='fas fa-trash-alt'></i> remove</button> </td>" +
                "</tr>";
                // table id studenttable add html string tr_str into tbody
                $("#studenttable tbody").append(tr_str);
            }
        }
    });
    getLastId();
}
// get current student
function getUser() {
    // gets user from local storage
    var x = localStorage.getItem("user");
    $.ajax({
        // url student -> gets user
        url: url+'student/'+x,
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            // get payload and make it into stud data
            user = response.payload;
            console.log(user)
            console.log(x)
            // length of how many students
            var len = user.length;
            // for loop each student 
            for(var i=0; i<len; i++){
                // each field as variable
                var recordno = user[i].recno_fld;
                var studno = user[i].studnum_fld;
                var fname = user[i].fname_fld;
                var lname = user[i].lname_fld;
                // chane that h1 text into the user name
                $("#username").text(fname+" "+lname);
            }
        }
    });
}
// add student
function addstudent() {
    // get input value from id's
    const fname = $("#firstname").val();
    const lname = $("#lastname").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const studnum = $("#studentno").val();
    // if empty..
    if (fname===""){
        alert("no first name!")
    }
    else if (lname===""){
        alert("no last name!")
    }
    else if (email===""){
        alert("no email!")
    }
    else if (password===""){
        alert("no password!")
    }
    else{
        // object variable
        item = {}
        // inputs will be turned into object
        item ["fname_fld"] = fname;
        item ["lname_fld"] = lname;
        item ["email_fld"] = email;
        item ["pword_fld"] = password;
        item ["studnum_fld"] = studnum;
        // stringify the object
        item = JSON.stringify(item);
        // ajax
        $.ajax({
            // var url + student
            url: url+'addstudent', 
            type: 'post',
            dataType: 'json',
            // data as item
            data:  item 
        })
        // if success
        .done( function( data ) {
            //alert student name that was added
            alert('student added '+fname+' '+lname);
            // remove all rows
            $("#studenttable tbody tr").remove(); 
            // call get students
            getStudents();
            closeAddModal();
        })
        // if failed
        .fail( function( data ) {
            console.log(data);
        });
    }
}
// delete a student 
function deleteStudent(id){
    $.ajax({
        // var url + student
        url: url+'deletestudent/'+id, 
        type: 'post',
    })
    // if success
    .done( function( data ) {
        // alert student name that was deleted
        alert('student deleted');
        // remove all rows
        $("#studenttable tbody tr").remove(); 
        // call get students
        getStudents();
    })
    // if failed
    .fail( function( data ) {
        console.log(data);
    });
}
// update a student 
function editStudent(){
    // get input value from id's
    const recno = $("#Erecno").val();         
    const fname = $("#Efirstname").val();
    const lname = $("#Elastname").val();
    const email = $("#Eemail").val();
    const password = $("#Epassword").val();
    const studnum = $("#Estudentno").val();
    // object variable
    item = {}
    // inputs will be turned into object
    item ["fname_fld"] = fname;
    item ["lname_fld"] = lname;
    item ["email_fld"] = email;
    item ["pword_fld"] = password;
    item ["studnum_fld"] = studnum;
    item ["recno_fld"] = recno;
    // stringify the object
    item = JSON.stringify(item);
    // ajax
    $.ajax({
        // var url + student
        url: url+'updatestudent', 
        type: 'post',
        dataType: 'json',
        // data as item
        data:  item 
    })
    // if success
    .done( function( data ) {
        //alert student name that was added
        alert('student updated '+ fname+' '+lname);
        // remove all rows
        $("#studenttable tbody tr").remove(); 
        // call get students
        getStudents();
        closeEditModal();
    })
    // if failed
    .fail( function( data ) {
        console.log(data);
    });
}
// Other Functions -----------
// close add modal
function closeAddModal(){
    document.getElementById("myModal").style.display = "none";
}
// open edit modal
function openEditModal(data){
    document.getElementById("myModal2").style.display = "block";
    $.ajax({
        // url student -> gets all students
        url: url+'student/'+data,
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            // get payload and make it into stud data
            edit_data = response.payload;
            // length of how many students
            var len = edit_data.length;
            // for loop each student 
            for(var i=0; i<len; i++){
                // each field as variable
                var recordno = edit_data[i].recno_fld;
                var studno = edit_data[i].studnum_fld;
                var fname = edit_data[i].fname_fld;
                var lname = edit_data[i].lname_fld;
                var email = edit_data[i].email_fld;
                var pw = edit_data[i].pword_fld;
                // pass data to inputs
                $("#Erecno").val(recordno);
                $("#Efirstname").val(fname);
                $("#Elastname").val(lname);
                $("#Eemail").val(email);
                $("#Epassword").val(pw);
                $("#Estudentno").val(studno);
            }
        }
    });
}
// close edit modal
function closeEditModal(){
    document.getElementById("myModal2").style.display = "none";
}
// set student number
function getLastId() {
    $.ajax({
        // url student -> gets last student number
        url: url+'getstudid',
        type: 'POST',
        dataType: 'JSON',
        success: function(response){
            // get payload and make it into stud data
            studnum_id = response.payload;
            // length of how many student id
            var len = studnum_id.length;
            for(var i=0; i<len; i++){
                var id = studnum_id[i].studnum_fld;
                id = id+1;
                // change studentno input value
                $("#studentno").val(id);            
            }
        }
    });
}
// logout student
function logout(){
    localStorage.removeItem("user");
    document.location.href = "login.html";
}
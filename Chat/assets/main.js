$(function () {
    var client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '130px' });
    var theagent = client.get('agents');
    
    //Pulling Agent Data from ZenDesk Chat to keep track of who requested it. 
    client.get(['visitor','agents']).then(function(data) {
        var user = data['visitor'];
        var agentID = Object.keys(data['agents'])[0];
        var agentEmail = data['agents'][agentID].email;
        showInfo(user, agentEmail);
    }
);
 
    //UNCOMMENT TO DEBUG
    //showInfo();
    //showError();
});


function showInfo(data, email) {
    var fullName = data.name;
    var names = fullName.split(" ");
    var firstName = names[0];
    var lastName = names[names.length -1]

  var requester_data = {
    'name': data.name,
    'firstName': firstName,
    'lastName': lastName,
    'email': data.email,
    'phone': data.phone,
    'agent': email
    
  };

  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#content").html(html);
}

/*This function creates the new tab or pop-up when the user clicks on Create Lead. The form is within the innerHTML and is formatted for better reading.
The first portion is the style sheet and then the HTML form code is after. Note that if you need it to redirect on submission the form action field must be 
the full URL to work.*/
function popUp(){
    
    
    
    let leadWindow = window.open("", "", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=1600");
   
    leadWindow.document.body.innerHTML = 
    "<!DOCTYPE html>\
<html>\
<style>\
body {font-family: Arial, Helvetica, sans-serif;}\
* {box-sizing: border-box}\
/* Full-width input fields */\
input[type=text], input[type=email], input[type=number]{\
    width: 100%;\
    padding: 15px;\
    margin: 5px 0 11px 0;\
    display: inline-block;\
    border: none;\
    background: #f1f1f1;\
}\
input[type=text]:focus, input[type=number]:focus{\
    background-color: #ddd;\
    outline: none;\
}\
textarea {\
    width: 100%;\
    padding-left:15px;\
    padding-top:15px;\
    padding-bottom:5em;\
    padding-right: 5em;\
    margin: 5px 0 0px 0;\
    display: inline-block;\
    border: none;\
    background: #f1f1f1;\
}\
hr {\
    border: 1px solid #f1f1f1;\
    margin-bottom: 15px;\
}\
/* Set a style for all buttons */\
button {\
    background-color: #0099ff;\
    color: white;\
    padding: 14px 20px;\
    margin: 8px 0;\
    border: none;\
    cursor: pointer;\
    width: 100%;\
    opacity: 0.9;\
}\
\
button:hover {\
    opacity:1;\
}\
\
/* Extra styles for the cancel button */\
.cancelbtn {\
    padding: 14px 20px;\
    background-color: #f44336;\
}\
/* Float cancel and signup buttons and add an equal width */\
.signupbtn {\
  display: inline-block\
  width: 50%;\
}\
\
/* Add padding to container elements */\
.container {\
    padding: 0px 8px;\
}\
\
/* Clear floats */\
.clearfix::after {\
    content: \"\";\
    clear: both;\
    display: table;\
}\
/* Change styles for cancel button and signup button on extra small screens */\
@media screen and (max-width: 300px) {\
    .signupbtn {\
       width: 100%;\
    }\
}\
</style>\
<body>\
<form action=\"https://45.62.239.240/Test2.php\" method=\"post\" name=\"addLead\" style=\"border:1px solid #ccc\">\
  <div class=\"container\">\
    <h2>Create a Lead</h2>\
    <p>Please fill in this form to create lead in Salesforce.</p>\
    <hr>\
    <label for=\"firstName\"><b>First name <font size=3 color=red>*</font></b></label>\
    <input type=\"text\" placeholder=\"Enter First name\" name=\"FirstName\" value=\'"+arguments[0]+"\' required>\
    <label for=\"lastName\"><b>Last name <font size=3 color=red>*</font></b></label>\
    <input type=\"text\" placeholder=\"Enter Last Name\" name=\"LastName\" value=\'"+arguments[1]+"\' required>\
    <label for=\"Email\"><b>Email <font size=3 color=red>*</font></b></label>\
    <input type=\"email\" placeholder=\"Enter Email\" name=\"Email\" value=\'"+arguments[2]+"\' required>\
    <label for=\"phoneNumber\"><b>Phone number</b></label>\
    <input type=\"text\" placeholder=\"Enter Phone Number\" name=\"phoneNumber\">\
    <label for=\"Company\"><b>Company</b></label>\
    <input type=\"text\" placeholder=\"Enter Company\" name=\"company\">\
    <label for=\"City\"><b>City</b></label>\
    <input type=\"text\" placeholder=\"Enter City\" name=\"city\">\
    <label for=\"numberOfEmployees\"><b>Number of Employees</b></label>\
    <input type=\"number\" placeholder=\"Enter Number of Employees\" name=\"numOfEmployees\">\
    <label for=\"languagesSpoken\"><b>Languages Spoken</b></label>\
    <input type=\"text\" placeholder=\"Enter Languages Spoken\" name=\"languagesSpoken\">\
    <label for=\"additionalDetails\"><b>Additional Details</b></label>\
    <textarea name=\"desc\" placeholder=\"Enter any additional details here\"></textarea>\
    <input type=\"hidden\" name=\"agent\" value=\'"+arguments[3]+"\'>\
    <p style=\"font-size:75%;color:red;float:right\">* indicates a required field</p>\
    <div class=\"clearfix\" style=\"width:100%;\">\
      <button type=\"submit\" class=\"signupbtn\">Submit</button>\
    </div>\
  </div>\
</form>\
<script>\
document.getElementById(\"addLead\").onkeypress = function(e) {\
  var key = e.charCode || e.keyCode || 0;\
  if (key == 13) {\
    e.preventDefault();\
  }\
}\
</script>\
</body>\
</html>"
	leadWindow.document.close();
}



	




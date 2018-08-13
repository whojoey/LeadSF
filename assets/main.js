$(function () {
	var client = ZAFClient.init();
	client.invoke('resize', { width: '100%', height: '130px' });
	client.get('ticket.requester.id').then(
	function(data) {
		var user_id = data['ticket.requester.id'];
		//console.log('Requester id is ' + user_id);
		requestUserInfo(client, user_id);
	}
);
	//showInfo();
	//showError();
});

function showInfo(data) {
	var fullName = data.user.name;
	var names = fullName.split(" ");
	var firstName = names[0];
	var lastName = names[names.length -1]

  var requester_data = {
    'name': data.user.name,
    'firstName': firstName,
    'lastName': lastName,
    'email': data.user.email,
    'tags': data.user.tags,
    'created_at': data.user.create_at,
    'last_login_at': data.user.last_login_at
  };

  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#content").html(html);
}

function showError(response) {
  var error_data = {
    'status': response.status,
    'statusText': response.statusText
  };
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  $("#content").html(html);
}

function requestUserInfo(client, id) {
	var settings = {
		url: '/api/v2/users/' + id + '.json',
		type:'GET',
		dataType: 'json',
	};

	client.request(settings).then(
		function(data) {
			showInfo(data);
		},
		function(response) {
			showError(response);
		}
	);	
}


function popUp(){
    
    
    
    let leadWindow = window.open("", "", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=1600");
   
    leadWindow.document.body.innerHTML = 
    "<!DOCTYPE html>\
<html>\
<style>\
body {font-family: Arial, Helvetica, sans-serif;}\
* {box-sizing: border-box}\
/* Full-width input fields */\
input[type=text], input[type=email] {\
    width: 100%;\
    padding: 15px;\
    margin: 5px 0 11px 0;\
    display: inline-block;\
    border: none;\
    background: #f1f1f1;\
}\
input[type=text]:focus {\
    background-color: #ddd;\
    outline: none;\
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
#desc {\
    width: 100%;\
    padding-left:15;\
    padding-top:15;\
    padding-bottom:10em;\
    padding-right: 15em;\
    margin: 5px 0 0px 0;\
    display: inline-block;\
    border: none;\
    background: #f1f1f1;\
}\
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
    <input type=\"text\" placeholder=\"Enter Number of Employees\" name=\"numberOfEmployees\">\
    <label for=\"languagesSpoken\"><b>Lanugages Spoken</b></label>\
    <input type=\"text\" placeholder=\"Enter Languages Spoken\" name=\"languagesSpoken\">\
    <label for=\"additionalDetails\"><b>Additional Details</b></label>\
    <input id=\"desc\" type=\"text\" placeholder=\"Enter any additional details\" name=\"desc\">\
    <p style=\"font-size:75%;color:red;float:right\">* indicates a required field</p>\
    <div class=\"clearfix\" style=\"width:100%;\">\
      <button type=\"submit\" class=\"signupbtn\">Submit</button>\
    </div>\
  </div>\
</form>\
</body>\
</html>"
	leadWindow.document.close();
}



	





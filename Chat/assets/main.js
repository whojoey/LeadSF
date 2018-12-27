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
input[type=text], input[type=email], input[type=tel], input[type=number] {\
    width: 100%;\
    padding: 15px;\
    margin: 5px 0 22px 0;\
    display: inline-block;\
    border: none;\
    background: #f1f1f1;\
}\
\
input[type=text]:focus {\
    background-color: #ddd;\
    outline: none;\
}\
textarea {\
    width: 100%;\
    padding-left:15px;\
    padding-top:15px;\
    padding-bottom:15em;\
    padding-right: 15em;\
    margin: 5px 0 0px 0;\
    display: inline-block;\
    border: none;\
    background: #f1f1f1;\
}\
hr {\
    border: 1px solid #f1f1f1;\
    margin-bottom: 25px;\
}\
em {\
  color:red;\
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
button:hover {\
    opacity:1;\
}\
#desc {\
}\
/* Extra styles for the cancel button */\
.cancelbtn {\
    padding: 14px 20px;\
    background-color: #f44336;\
}\
/* Float cancel and signup buttons and add an equal width */\
.signupbtn {\
  display: inline-blcok\
  width: 50%;\
}\
/* Add padding to container elements */\
.container {\
    padding: 16px;\
}\
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
.custom-select {\
  font-family: Arial;\
    width: 100%;\
    margin: 5px 0 22px 0;\
    display: inline-block;\
    border: none;\
    background: #f1f1f1;\
    font-size: 10px;\
\
\
}\
.custom-select select {\
  display: none; /*hide original SELECT element:*/\
  width: 25%\
\
}\
.select-selected {\
  background-color: #f1f1f1;\
}\
/*style the arrow inside the select element:*/\
.select-selected:after {\
  position: absolute;\
  content: \"\";\
  top: 14px;\
  right: 10px;\
  width: 0;\
  height: 0;\
  border: 6px solid transparent;\
  border-color: #fff transparent transparent transparent;\
}\
/*point the arrow upwards when the select box is open (active):*/\
.select-selected.select-arrow-active:after {\
  border-color: transparent transparent #fff transparent;\
  top: 7px;\
}\
/*style the items (options), including the selected item:*/\
.select-items div,.select-selected {\
  color: #6f6f6f;\
  padding: 8px 16px;\
  border: 1px solid transparent;\
  border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;\
  cursor: pointer;\
  user-select: none;\
}\
/*style items (options):*/\
.select-items {\
  position: absolute;\
  background-color: #ffffff;\
  border: 1px solid;\
  border-color: #f1f1f1;\
  top: 100%;\
  left: 0;\
  right: 0;\
  z-index: 99;\
}\
/*hide the items when the select box is closed:*/\
.select-hide {\
  display: none;\
}\
.select-items div:hover, .same-as-selected {\
  background-color: rgba(0, 0, 0, 0.1);\
}\
</style>\
<body>\
\
<form action=\"https://45.62.239.240/Test2.php\" method=\"post\" id=\"addLead\" name=\"addLead\" style=\"border:1px solid #ccc\">\
  <div class=\"container\">\
    <h1>Create a Lead</h1>\
    <p style=\"font-size:10%\">Please fill in this form to create lead in Salesforce.</p>\
    <hr>\
\
    <label for=\"firstName\"><em>First name*</em>\
    <input type=\"text\" placeholder=\"Enter First name\" value=\'"+arguments[0]+"\' name=\"firstName\" required>\
\
    <label for=\"lastName\"><em>Last name*</em></label>\
    <input type=\"text\" placeholder=\"Enter Last Name\" name=\"lastName\" value=\'"+arguments[1]+"\' required>\
\
    <label for=\"email\"><em>Email*</em></label>\
    <input type=\"email\" placeholder=\"Enter Email\" name=\"email\" value=\'"+arguments[2]+"\' required>\
\
    <label for=\"phoneNumber\"><b>Phone number</b></label>\
    <input type=\"tel\" pattern=\"[0-9]+\" placeholder=\"Enter Phone Number\" name=\"phoneNumber\">\
\
    <label for=\"Company\"><em>Company*</em></label>\
    <input type=\"text\" placeholder=\"Enter Company\" name=\"company\" required>\
\
    <label for=\"Address\"><b>Address</b></label>\
    <input type=\"text\" placeholder=\"Enter Address\" name=\"Address\">\
\
    <label for=\"City\"><b>City</b></label>\
    <input type=\"text\" placeholder=\"Enter City\" name=\"city\">\
\
    <label for=\"State\"><b>State</b></label>\
    <input type=\"text\" placeholder=\"Enter State\" name=\"state\">\
\
    <label for=\"zipCode\"><b>Zip Code</b></label>\
    <input type=\"number\" placeholder=\"Enter Zip Code\" name=\"zip\">\
\
    <label for=\"Country\"><b>Country</b></label>\
    <input type=\"text\" placeholder=\"Enter Country\" name=\"country\">\
    <br>\
    <label for=\"numberOfEmployees\"><em>Number of Employees*</em></label>\
    <br>\
    <div style=padding-top:5px;>\
      <select name=\"numOfEmployees\" required>\
        <option value=\"\" disabled selected>Select your option</option>\
        <option value=\"Just Me\">Just Me</option>\
        <option value=\"2-10\">2-10</option>\
        <option value=\"11-50\">11-50</option>\
        <option value=\"51-250\">51-250</option>\
        <option value=\"251-500\">251-500</option>\
        <option value=\"501-1000\">501-1000</option>\
        <option value=\"1001-5000\">1001-5000</option>\
        <option value=\"5001-10000\">5001-10000</option>\
        <option value=\"10001+\">10001+</option>\
      </select>\
    </div>\
    <br>\
\
<label for=\"languagesSpoken\"><b>Languages Spoken</b></label>\
    <input type=\"text\" placeholder=\"Enter Languages Spoken\" name=\"languagesSpoken\">\
\
    <label for=\"additionalDetails\"><b>Additional Details</b></label>\
    <textarea name=\"desc\" placeholder=\"Enter any additional details here\"></textarea>\
    \
    <p style=\"font-size:75%;color:red;float:right\">* indicates a required field</p>\
    <input type=\"hidden\" name=\"agent\" value=\'"+arguments[3]+"\'>\
    <input type=\"hidden\" name=\"LeadSource\" value=\'Sales Chat\'>\
\
<div class=\"clearfix\" style=\"width:100%;\">\
      <button type=\"submit\" class=\"signupbtn\">Sign Up</button>\
    </div>\
  </div>\
</form>\
</body>\
</html>"

    leadWindow.document.close();
}

/**
    <div>\
      <select name=\"state\">\
        <option value=\"header\" disabled selected> Select a State </option>\
        <option value=\"AL\">Alabama</option>\
        <option value=\"AK\">Alaska</option>\
        <option value=\"AZ\">Arizona</option>\
        <option value=\"AR\">Arkansas</option>\
        <option value=\"CA\">California</option>\
        <option value=\"CO\">Colorado</option>\
        <option value=\"CT\">Connecticut</option>\
        <option value=\"DE\">Delaware</option>\
        <option value=\"DC\">District Of Columbia</option>\
        <option value=\"FL\">Florida</option>\
        <option value=\"GA\">Georgia</option>\
        <option value=\"HI\">Hawaii</option>\
        <option value=\"ID\">Idaho</option>\
        <option value=\"IL\">Illinois</option>\
        <option value=\"IN\">Indiana</option>\
        <option value=\"IA\">Iowa</option>\
        <option value=\"KS\">Kansas</option>\
        <option value=\"KY\">Kentucky</option>\
        <option value=\"LA\">Louisiana</option>\
        <option value=\"ME\">Maine</option>\
        <option value=\"MD\">Maryland</option>\
        <option value=\"MA\">Massachusetts</option>\
        <option value=\"MI\">Michigan</option>\
        <option value=\"MN\">Minnesota</option>\
        <option value=\"MS\">Mississippi</option>\
        <option value=\"MO\">Missouri</option>\
        <option value=\"MT\">Montana</option>\
        <option value=\"NE\">Nebraska</option>\
        <option value=\"NV\">Nevada</option>\
        <option value=\"NH\">New Hampshire</option>\
        <option value=\"NJ\">New Jersey</option>\
        <option value=\"NM\">New Mexico</option>\
        <option value=\"NY\">New York</option>\
        <option value=\"NC\">North Carolina</option>\
        <option value=\"ND\">North Dakota</option>\
        <option value=\"OH\">Ohio</option>\
        <option value=\"OK\">Oklahoma</option>\
        <option value=\"OR\">Oregon</option>\
        <option value=\"PA\">Pennsylvania</option>\
        <option value=\"RI\">Rhode Island</option>\
        <option value=\"SC\">South Carolina</option>\
        <option value=\"SD\">South Dakota</option>\
        <option value=\"TN\">Tennessee</option>\
        <option value=\"TX\">Texas</option>\
        <option value=\"UT\">Utah</option>\
        <option value=\"VT\">Vermont</option>\
        <option value=\"VA\">Virginia</option>\
        <option value=\"WA\">Washington</option>\
        <option value=\"WV\">West Virginia</option>\
        <option value=\"WI\">Wisconsin</option>\
        <option value=\"WY\">Wyoming</option>\
      </select>\
    </div>\

**/

	




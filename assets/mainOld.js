$(function () {
	var client = ZAFClient.init();
	client.invoke('resize', { width: '100%', height: '100px' });
	client.get(['ticket.requester.id','ticket.assignee.user.email','ticket.comments']).then(
	
  //This is pulling the agent data in ZenDesk Ticket Support 
  function(data) {
		var user_id = data['ticket.requester.id'];
		var assignee = data['ticket.assignee.user.email'];
		var comments = data['ticket.comments'];
    requestUserInfo(client, user_id, assignee, comments);
		
		
	}
);
	//showInfo();
	//showError();

});

function showInfo(data, assignee, comments) {
	var fullName = data.user.name;
	var names = fullName.split(" ");
	var firstName = names[0];
	var lastName = names[names.length -1]
	var agent = assignee;
  var requester_data = {
    'name': data.user.name,
    'firstName': firstName,
    'lastName': lastName,
    'email': data.user.email,
    'agent': agent,
    'last_login_at': data.user.last_login_at
  };
  console.log(comments);
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

function requestUserInfo(client, userid, assignee, comments) {
	var settings = {
		url: '/api/v2/users/' + userid + '.json',
		type:'GET',
		dataType: 'json',	
	};	

	var assignee = assignee;
	client.request(settings, assignee).then(
		function(data) {
			showInfo(data, assignee, comments);
		},
		function(response) {
			showError(response);
		}
	);	
}



function popUp() {
    
    
    
    let leadWindow = window.open("", "", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=1600");
    

    var HTMLcode = 
    "<!DOCTYPE html>\
  <html>\
<style>\
body {font-family: Arial, Helvetica, sans-serif;}\
* {box-sizing: border-box}\
/* Full-width input fields */\
input[type=text], input[type=email] {\
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
    <label for=\"firstName\"><b>First name*</b></label>\
    <input type=\"text\" placeholder=\"Enter First name\" name=\"firstName\" value=\'"+arguments[0]+"\'required>\
\
    <label for=\"lastName\"><b>Last name*</b></label>\
    <input type=\"text\" placeholder=\"Enter Last Name\" name=\"lastName\" value=\'"+arguments[1]+"\' required>\
\
    <label for=\"email\"><b>Email*</b></label>\
    <input type=\"email\" placeholder=\"Enter Email\" name=\"email\" value=\'"+arguments[2]+"\' required>\
\
    <label for=\"phoneNumber\"><b>Phone number</b></label>\
    <input type=\"text\" placeholder=\"Enter Phone Number\" name=\"phoneNumber\">\
\
    <label for=\"Company\"><b>Company</b></label>\
    <input type=\"text\" placeholder=\"Enter Company\" name=\"company\">\
\
    <label for=\"Address\"><b>Address</b></label>\
    <input type=\"text\" placeholder=\"Enter Address\" name=\"Address\">\
\
    <label for=\"City\"><b>City</b></label>\
    <input type=\"text\" placeholder=\"Enter City\" name=\"city\">\
\
    <label for=\"Country\"><b>Country</b></label>\
\
    <select name=\"country\" id=\"country\">\
      <option value=\"us\">United States</option>\
      <option value=\"can\">Canada</option>\
      <option value=\"china\">China</option>\
      <option value=\"ghana\">Ghana</option>\
    </select>\
\
    <br>\
    <div id=\"state\">\
    <br>\
    <label for=\"State\"><b>State/Province </b></label>\
    <br>\
    <select name=\"choices[]\" id=\"choices\" multiple=\"multiple\" size=\"10\">\
    </select>\
    </div>\
    <br>\
  <label for=\"zipCode\"><b>Zip Code</b></label>\
    <input type=\"text\" placeholder=\"Enter Zip Code\" name=\"zip\">\
    <br>\
    <label for=\"numberOfEmployees\"><b>Number of Employees</b></label>\
    <br>\
    <div style=padding-top:5px;>\
      <select name=\"numOfEmployees\">\
        <option value=\"0\" disabled selected>Select your option</option>\
        <option value=\"1\">Just Me</option>\
        <option value=\"2\">2-10</option>\
        <option value=\"3\">11-50</option>\
        <option value=\"4\">51-250</option>\
        <option value=\"5\">251-500</option>\
        <option value=\"6\">501-1000</option>\
        <option value=\"7\">1001-5000</option>\
        <option value=\"8\">5001-10000</option>\
        <option value=\"9\">10001+</option>\
      </select>\
    </div>\
    <br>\
\
<label for=\"languagesSpoken\"><b>Languages Spoken</b></label>\
    <input type=\"text\" placeholder=\"Enter Languages Spoken\" name=\"languagesSpoken\">\
<label for=\"additionalDetails\"><b>Additional Details</b></label>\
    <textarea name=\"desc\" placeholder=\"Enter any additional details here\"></textarea>\
    \
<label for=\"LeadOwner\"><b>Lead Owner Email</b></label>\
  <input type=\"text\" name=\"agent\" value=\'"+arguments[3]+"\'>\
<input type=\"hidden\" name=\"LeadSource\" value=\'Zendesk Ticket\'>\
<p style=\"font-size:75%;color:red;float:right\">* indicates a required field</p>\
\
<div class=\"clearfix\" style=\"width:100%;\">\
      <button type=\"submit\" class=\"signupbtn\">Sign Up</button>\
    </div>\
  </div>\
</form>"

    //leadWindow.document.body.innerHTML =   
  leadWindow.document.write(HTMLcode);
  leadWindow.document.write(
"<script type=\"text/javascript\">"+


/*
Pulled 
From JavaScript and Forms Tutorial at dyn-web.com
*/


/** 
This function removes all options to be written after you refresh or initial
load of javascript page
*/
"function removeAllOptions(sel, removeGrp) {"+
    "var len, groups, par;"+
    "if (removeGrp) {"+
        "groups = sel.getElementsByTagName(\'optgroup\');"+
        "len = groups.length;"+
        "for (var i=len; i; i--) {"+
            "sel.removeChild( groups[i-1] );"+
        "}"+
    "}"+
    
    "len = sel.options.length;"+
    "for (var i=len; i; i--) {"+
        "par = sel.options[i-1].parentNode;"+
        "par.removeChild( sel.options[i-1] );"+
    "}"+
"}"+

/** 
This function does the action of Appending the Data to the selection 
in the arrays. 

*/
"function appendDataToSelect(sel, obj) {"+
    "var f = document.createDocumentFragment();"+
    "var labels = [], group, opts;"+
    
  "function addOptions(obj) {"+
      "var f = document.createDocumentFragment();"+
      "var o;"+
        
      "for (var i=0, len=obj.text.length; i<len; i++) {"+
        "o = document.createElement('option');"+
        "o.appendChild(document.createTextNode(obj.text[i]));"+
            
        "if (obj.value) {"+
          "o.value = obj.value[i];"+
        "}"+    
        "f.appendChild(o);"+
        "}"+
        "return f;"+
  "}"+
    
  "if ( obj.text ) {"+
    "opts = addOptions(obj);"+
      "f.appendChild(opts);"+
  "} else {"+
      "for ( var prop in obj ) {"+
        "if ( obj.hasOwnProperty(prop) ) {"+
          "labels.push(prop);"+
        "}"+
      "}"+
        
      "for (var i=0, len=labels.length; i<len; i++) {"+
        "group = document.createElement(\'optgroup\');"+
          "group.label = labels[i];"+
          "f.appendChild(group);"+
          "opts = addOptions(obj[ labels[i] ] );"+
          "group.appendChild(opts);"+
      "}"+
    "}"+
    "sel.appendChild(f);"+
"}"+

/* Anonymous function that reloads the form on selection of country*/
"document.forms['addLead'].elements['country'].onchange = function(e) {"+
    // name of associated select list
    "var relName = 'choices[]';"+
    
    // reference to associated select list 
    "var relList = this.form.elements[ relName ];"+
    
    // get data from object literal based on selection in controlling select list (this.value)
    "var obj = Select_List_Data[ relName ][ this.value ];"+
    "var state = document.getElementById(\"state\");"+

    //if country has province/states then move forward, else hide the states
    "if (obj) {"+
       // remove current options
      "removeAllOptions(relList, true);"+
      // call function to append to the list
      // pass function to append to the list
      "appendDataToSelect(relList, obj);"+
      
      //If states were originally hidden then display them   
      "state.style.display = \"block\";"+
    
    //Hide States
    "} else {"+
      "var choices = document.getElementById(\"choices\");"+
      "state.style.display = \"none\";"+
    "}"+
"};"+

// object that holds all the data arrays. So you would store province and states here
"var Select_List_Data = {"+
    
    "\'choices[]\': {"+
        
        "us: {"+
            "text: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'Washington DC', 'West Virginia', 'Wisconsin', 'Wyoming'],"+
            "value: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'DC', 'WV', 'WI', 'WY']"+
        "},"+
        "can: {"+
            "text: ['Ontario', 'Quebec', 'Nova Scotia', 'New Brunswick', 'Manitoba', 'British Columbia', 'Prince Edward Island', 'Saskatchewan', 'Alberta', 'Newfoundland and Labrador'],"+
            "value: ['ON', 'QC', 'NS', 'NB', 'MB', 'BC', 'PE', 'SK', 'AB', 'NL']"+
        "},"+
        "china: {"+
            "text: ['Anhui', 'Beijing', 'Chongqing', 'Fujian', 'Guangdong', 'Gansu', 'Guangxi Zhuang', 'Guizhou', 'Henan', 'Hubei', 'Hebei', 'Hainan', 'Hong Kong', 'Heilongjiang', 'Hunan', 'Jilin', 'Jiangsu', 'Jiangxi', 'Liaoning', 'Macau', 'Inner Mongolia', 'Ningxia Hui', 'Qinghai', 'Sichuan', 'Shandong', 'Shanghai', 'Shaanxi', 'Shanxi', 'Tianjin', 'Xinjiang', 'Tibet', 'Yunnan', 'Zhejiang'],"+
            "value: ['CN-AH', 'CN-BJ', 'CN-CQ', 'CN-FJ', 'CN-GD', 'CN-GS', 'CN-GX', 'CN-GZ', 'CN-HA', 'CN-HB', 'CN-HE', 'CN-HI', 'CN-HK', 'CN-HL', 'CN-HN', 'CN-JL', 'CN-JS', 'CN-JX', 'CN-LN', 'CN-MO', 'CN-NM', 'CN-NX', 'CN-QH', 'CN-SC', 'CN-SD', 'CN-SH', 'CN-SN', 'CN-SX', 'CN-TJ', 'CN-XJ', 'CN-XZ', 'CN-YN', 'CN-ZJ']"+
        "}"+
    "}"+

/**
EXAMPLE OF FORMATTING THAT IS POSSIBLE
You don't have to have the Option Headers but its possible to do. 
You also don't have to have the values either.

"key: {"+
            "'Option Header': {"+
                "text: ['Option1', 'Option2', 'Option3']"+
                "value: ['Value1, 'Value2', 'Value3']"+
            "},"+
            
            "'Option Header 2': {"+
                "text: ['Option1', 'Option2', 'Option3']"+
                "value: ['Value1', 'Value2', 'Value3']"+
            "}"+

*/    

"};"+

// Initially Populate the country dropdowns when page loads. It defaults to United States initially
"window.onload = function() {"+
    "var form = document.forms[\'addLead\'];"+
    
    "var sel = form.elements[\'country\'];"+
    "sel.selectedIndex = 0;"+
    
    "var relName = 'choices[]';"+
    
    "var rel = form.elements[ relName ];"+
    
    // get data for associated select list passing its name
    // and value of selected in controlling select list
    "var data = Select_List_Data[ relName ][ sel.value ];"+
    
    // add options and build the list
    "appendDataToSelect(rel, data);"+
"};"+
"</script>");
  
  leadWindow.document.close();
}

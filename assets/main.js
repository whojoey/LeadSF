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
<<<<<<< Updated upstream
    let leadWindow = window.open("", "myWindow", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=300,height=200");
    leadWindow.document.body.innerHTML = "<h1>Enter Lead Here</h1><p><form action=\"test.html\"  method=\"post\" name=\"addLead\">    First name: <input id=\"firstName\" type=\"text\" name=\"FirstName\" value=\'"+arguments[0]+"\' size=\"25\">\n    Last name: <input id=\"lastName\" type=\"text\" value=\'"+arguments[1]+"\' name=\"LastName\" size=\"25\">\n    Email: <input id=\"email\" value=\'"+arguments[2]+"\' type=\"text\" name=\"Email\" value=\'\' size=\"31\"><input type=\"submit\" value=\"Submit\"></center></p></form>";
    leadWindow.document.close();
=======
    
    let leadWindow = window.open("", "", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=400");
   
    leadWindow.document.body.innerHTML = 
    "<head>\
    	<style>\
	    	h1{\
				font-size:20px;\
				margin: 0px 5px;\
			}\
			input\
			{\
				display:inline-block;\
				float:center\
			}\
			input[type=details]\
			{\
				display:inline-block;\
				float:none;\
				text-decoration:none;\
				height:100px;\
			}\
			input[type=submit]\
			{\
				display:inline-block;\
				float:none;\
				text-decoration:none;\
				padding-left:0;\
				padding-top:0;\
				padding-bottom:0.4em;\
				padding-right: 0.4em;\
			}\
			label\
			{\
				display:inline-block;\
				width:200px;\
				text-align:right;\
				float:center;\
				clear:left;\
			}\
			#addLead\
			{\
				margin: 0px 0px;\
				display:block;\
			}\
			.LeadSF{\
				font-size: 12px\
			}\
		</style>\
	</head>\
	<body>\
		<center>\
			<h2 style=\"font-family:helvetica;\">Create a lead</h2>\
			<form action=\"https://45.62.239.240/Test2.php\"  method=\"post\" name=\"addLead\" style=\"font-family:helvetica;\">\
			\
			<!-- First Name -->\
			<label>First name:</label>\
			<input id=\"firstName\" class=\"LeadSF\" type=\"text\" name=\"FirstName\" value=\'"+arguments[0]+"\' size=\"25\">\
			<br>\
			<!-- Last Name -->\
			<label>Last name:</label>\
			<input id=\"lastName\" class=\"LeadSF\" type=\"text\" value=\'"+arguments[1]+"\' name=\"LastName\" size=\"25\">\
			<br>\
			<!-- Email -->\
			<label>Email:</label>\
			<input id=\"email\" class=\"LeadSF\" value=\'"+arguments[2]+"\' type=\"email\" name=\"Email\" size=\"25\">\
			<br>\
			<!-- Phone Number -->\
			<label>Phone Number:</label>\
			<input id=\"phoneNumber\" class=\"LeadSF\" type=\"phoneNumber\" name=\"phoneNumber\" size=\"25\">\
			<br>\
			<!-- Company -->\
			<label>Company:</label>\
			<input id=\"company\" class=\"LeadSF\" type=\"company\" name=\"company\" size=\"25\">\
			<br>\
			<!-- City -->\
			<label>City:</label>\
			<input id=\"city\" class=\"LeadSF\" type=\"city\" name=\"city\" size=\"25\">\
			<br>\
			<!-- Number of Employees -->\
			<label>Number of Employees:</label>\
			<input id=\"numOfEmployees\" class=\"LeadSF\" type=\"numOfEmployees\" name=\"numOfEmployees\" size=\"25\">\
			<br>\
			<!-- Languages Spoken -->\
			<label>Languages Spoken:</label>\
			<input id=\"languagesSpoken\" class=\"LeadSF\" type=\"languagesSpoken\" name=\"languagesSpoken\" size=\"25\">\
			<br>\
			<!-- Additional Details -->\
			<label>Additional Details:</label>\
			<input id=\"additionalDetails\" class=\"LeadSF\" type=\"details\" name=\"additionalDetails\" size=\"25\">\
			<br>\
			<br>\
			<input type=\"submit\" value=\"Submit\">\
			</form>\
		</center>\
	</body>"
	leadWindow.document.close();
}


>>>>>>> Stashed changes

}

function closeandSubmit() {
	document.forms['addLead'].submit();
	window.close();
}

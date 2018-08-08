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
    
    let leadWindow = window.open("", "", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=300,height=200");
   
    leadWindow.document.body.innerHTML = 
    "<head><style> h1 { font-size:20px; margin: 0px 5px } input {display:inline-block; float:left} input[type=submit] {display:inline-block;float:none;text-decoration:none;} label {display:inline-block; width:80px; text-align:right; float:left; clear:left; } #addLead { margin: 0px 0px; display:block;} .LeadSF{ font-size: 12px }</style></head><h1>Enter Lead Here</h1> <p><form action=\"https://45.62.239.240/Test2.php\"  method=\"post\" name=\"addLead\">   <label>First name:</label> <input id=\"firstName\" class=\"LeadSF\" type=\"text\" name=\"FirstName\" value=\'"+arguments[0]+"\' size=\"25\"></p> <p> <label>Last name:</label> <input id=\"lastName\" class=\"LeadSF\" type=\"text\" value=\'"+arguments[1]+"\' name=\"LastName\" size=\"25\"></p> <p><label>Email:</label> <input id=\"email\" class=\"LeadSF\" value=\'"+arguments[2]+"\' type=\"text\" name=\"Email\" size=\"25\"></p><input type=\"submit\" value=\"Submit\"></form>" 
	leadWindow.document.close();
}





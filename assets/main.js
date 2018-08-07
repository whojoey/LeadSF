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
    let leadWindow = window.open("", "myWindow", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=300,height=200");
    leadWindow.document.body.innerHTML = "<h1>Enter Lead Here</h1><p><form action=\"test.html\"  method=\"post\" name=\"addLead\">    First name: <input id=\"firstName\" type=\"text\" name=\"FirstName\" value=\'"+arguments[0]+"\' size=\"25\">\n    Last name: <input id=\"lastName\" type=\"text\" value=\'"+arguments[1]+"\' name=\"LastName\" size=\"25\">\n    Email: <input id=\"email\" value=\'"+arguments[2]+"\' type=\"text\" name=\"Email\" value=\'\' size=\"31\"><input type=\"submit\" value=\"Submit\"></center></p></form>";
    leadWindow.document.close();

}

function closeandSubmit() {
	document.forms['addLead'].submit();
	window.close();
}

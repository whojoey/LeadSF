$(function () { 
    var client = ZAFClient.init(); 
    client.invoke('resize', { width: '100%', height: '115px' } );
    client.get(['ticket.requester.id', 'ticket.assignee.user.email', 'ticket.comments']).then(
        function(data) {
            var user_id = data['ticket.requester.id'];
            var assignee = data['ticket.assignee.user.email'];
            var comments = data['ticket.comments'];
            requestUserInfo(client, user_id, assignee, comments[0].value);
        }
    );
    
});

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

function showInfo(data, assignee, comments) {
	var fullName = data.user.name;
	var names = fullName.split(" ");
	var firstName = names[0];
	var lastName = names[names.length -1]
	var agent = assignee;
    var comment = comments;
  var requester_data = {
    'name': data.user.name,
    'firstName': firstName,
    'lastName': lastName,
    'email': data.user.email,
    'agent': agent,
    'comment': comment,
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

function popUp(){
    for(var i = 0; i < arguments.length; i++){
        console.log(arguments[i]);
    }
    let leadWindow = window.open("", "", "toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes,width=400, height = 1600");
    leadWindow.document.write(
    "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>"+
    
    "<script>"+
        "$(document).ready(function(){"+
            "$(\"button[name='add']\").click(function(){"+
                "$(\"fieldset[name='additionalInfo']\").toggle();"+
            "});"+
        "});"+
        "function changeText()"+
        "{"+
        "if (document.getElementById(\"add\").innerHTML==\"Add Additional Information\") document.getElementById(\"add\").innerHTML = \"Hide Additional Information\";"+
        "else document.getElementById(\"add\").innerHTML = \"Add Additional Information\";"+
        "}"+
    "</script>");
    var HTMLcode = 
"<!DOCTYPE html>\
    <html>\
        <style>\
            body { font-family: Arial, Helvetica, sans-serif; }\
            * {box-sizing: border-box}\
\
            input[type=text], input[type=email], input[type=tel],\ input[type=number], input[type=search] {\
                width: 100%;\
                padding: 15px;\
                margin: 5px 0 15px 0;\
                display: inline-block;\
                border: none;\
                background: #f1f1f1;\
            }\
\
            /* Hides the incrementer in number text field */\
            input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button {\
                -webkit-appearance: none;\
                margin: 0;\
            }\
\
            input[type=text]:focus {\
                background-color: #ddd;\
                outline: none;\
            }\
\
            label {\
                font-size:14px;\
                font-weight:bold;\
            }\
\
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
\
            h3 {\
                font-size: 16px;\
                text-decoration: underline;\
            }\
\
            hr {\
                border: 1px solid #f1f1f1;\
                margin-bottom: 25px;\
            }\
\
            em {\
                color:red;\
            }\
\
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
            button:hover{\
                opacity:1;\
            }\
\
            button[name=add] {\
                background-color: #ffffff;\
                text-align: right;\
                color: #0099ff;\
                padding: 14px 20px;\
                margin: 8px 0;\
                border: none;\
                cursor: pointer;\
                width: 100%;\
                opacity: 0.9;\
            }\
            /* Float cancel and signup buttons and add an equal width */\
            .signupbtn {\
                display: inline-block\
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
            .hidden{\
                display:none;\
            }\
            fieldset{\
                border: 0;\
            }\
            /* Change styles for cancel button and signup button on extra small screens */\
            @media screen and (max-width: 300px) {\
                .signupbtn {\
                    width: 100%;\
                }\
            }\
	</style>\
    <body>\
            <form action=\"https://45.62.239.240/Test2.php\" method=\"post\" id=\"addLead\" name=\"addLead\" style=\"border:1px solid #ccc\">\
            <div class=\"w3-container\" style=\"padding-left:5px; padding-right:5px;\">\
    \
            <h2>Create a Lead</h2>\
            <p style=\"font-size:20%\">Please fill in this form to create lead in Salesforce.</p>\
            <hr style=\"margin:5px;\">\
    \
            <!-- Required Fields -->\
            <fieldset>\
                <label for=\"firstName\">First Name<em>*</em></label>\
                <input type=\"text\" placeholder=\"Enter First Name\" name=\"firstName\" value=\'"+arguments[0]+"\' required>\
    \
                <label for=\"lastName\">Last Name<em>*</em></label>\
                <input type=\"text\" placeholder=\"Enter Last Name\" name=\"lastName\" value=\'"+arguments[1]+"\' required>\
    \
                <label for=\"email\">Customer Email<em>*</em></label>\
                <input type=\"text\" placeholder=\"Enter First Name\" name=\"email\" value=\'"+arguments[2]+"\' required>\
    \
                <label for=\"LOemail\">Lead Owner Email<em>*</em></label>\
                <input type=\"search\" placeholder=\"Enter Lead Owner Email\" name=\"agent\" value=\'"+arguments[3]+"\' required>\
    \
                <label for=\"company\">Company</label>\
                <input type=\"text\" placeholder=\"Enter Company Name\" name=\"companyName\" required>\
    \
                <label for=\"numberOfEmployees\">Number of Employees</label>\
                <br>\
                <div style=padding-top:5px;>\
                    <select name=\"numOfEmployees\" id=\"huh\">\
                        <option value=\"\" disabled selected>Select your option<option><option value=\"Just Me\">Just Me<option><option value=\"2-10\">2-10<option>\
                        <option value=\"11-50\">11-50<option>\
                        <option value=\"51-250\">51-250<option>\
                        <option value=\"251-500\">251-500<option>\
                        <option value=\"501-1000\">501-1000<option>\
                        <option value=\"1001-5000\">1001-5000<option>\
                        <option value=\"5001-10000\">5001-10000<option>\
                        <option value=\"10001+\">10001+<option>\
                    </select>\
                </div>\
                <br>\
                <label for=\"phoneNumber\">Phone number <font size=1>(Format: 555-555-5555)</font></label>\
                <input type=\"tel\" pattern=\"[0-9]{3}-[0-9]{3}-[0-9]{4}\" placeholder=\"Enter Phone Number\" name=\"phoneNumber\">\
            </fieldset>\
\
			<!-- Additional Information -->\
			<hr style=\"margin:5px;\">\
			<fieldset name=\"additionalInfo\" class=\"hidden\">\
				<label for=\"industry\">Industry</label>\
				<br>\
				<div style=padding-top:5px;>\
					<select name=\"industry\">\
						<option value=\"\" disabled selected>Select Industry<option>\
						<option value=\"Advertising\">Advertising<option>\
						<option value=\"Biotech/Pharma\">Biotech/Pharma<option>\
						<option value=\"Communications\">Communications<option>\
						<option value=\"Construction\">Construction<option>\
						<option value=\"Education: Higher-ED\">Education Higher-ED<option>\
						<option value=\"Education: K-12\">Education K-12<option>\
						<option value=\"Education: Other\">Education Other<option>\
						<option value=\"Entertainment\">Entertainment<option>\
						<option value=\"Finance & Insurance\">Finance & Insurance<option>\
						<option value=\"Government\">Government<option>\
						<option value=\"Hospitality\">Hospitality<option>\
						<option value=\"Legal\">Legal<option>\
						<option value=\"Manufacturing\">Manufacturing<option>\
						<option value=\"Non-profit\">Non-profit<option>\
						<option value=\"Other\">Other<option>\
						<option value=\"Professional Services & Consulting\">Professional Services &amp; Consulting<option>\
						<option value=\"Real-estate\">Real-estate<option>\
						<option value=\"Retail/Wholesale\">Retail/Wholesale<option>\
						<option value=\"Technology\">Technology<option>\
						<option value=\"Transportation\">Transportation<option>\
					</select>\
				</div>\
				<br>\
                <label for=\"Address\"><b>Address</b></label>\
				<input type=\"text\" placeholder=\"Enter Address\" name=\"Address\">\
\
				<label for=\"City\"><b>City</b></label>\
				<input type=\"text\" placeholder=\"Enter City\" name=\"city\">\
				<label for=\"country\">Country</label>\
				<br>\
				<div style=\"padding-top:5px\">\
					<select name=\"countries\" id=\"countries\">\
						<option value=\"\" disabled selected>Select Country</option>\
                        <option value=\"AF\">Afghanistan</option>\
                        <option value=\"AX\">Aland Islands</option>\
                        <option value=\"AL\">Albania</option>\
                        <option value=\"DZ\">Algeria</option>\
                        <option value=\"AS\">American Samoa</option>\
                        <option value=\"AD\">Andorra</option>\
                        <option value=\"AO\">Angola</option>\
                        <option value=\"AI\">Anguilla</option>\
                        <option value=\"AQ\">Antarctica</option>\
                        <option value=\"AG\">Antigua and Barbuda</option>\
                        <option value=\"AR\">Argentina</option>\
                        <option value=\"AM\">Armenia</option>\
                        <option value=\"AW\">Aruba</option>\
                        <option value=\"AC\">Ascension Island</option>\
                        <option value=\"AU\">Australia</option>\
                        <option value=\"AT\">Austria</option>\
                        <option value=\"AZ\">Azerbaijan</option>\
                        <option value=\"BS\">Bahamas</option>\
                        <option value=\"BH\">Bahrain</option>\
                        <option value=\"BD\">Bangladesh</option>\
                        <option value=\"BB\">Barbados</option>\
                        <option value=\"CT\">Barcelona</option>\
                        <option value=\"BY\">Belarus</option>\
                        <option value=\"BE\">Belgium</option>\
                        <option value=\"BZ\">Belize</option>\
                        <option value=\"BJ\">Benin</option>\
                        <option value=\"BM\">Bermuda</option>\
                        <option value=\"BT\">Bhutan</option>\
                        <option value=\"BO\">Bolivia</option>\
                        <option value=\"BQ\">Bonaire, Sint Eustatius and Saba</option>\
                        <option value=\"BA\">Bosnia and Herzegovina</option>\
                        <option value=\"BW\">Botswana</option>\
                        <option value=\"BV\">Bouvet Island</option>\
                        <option value=\"BR\">Brazil</option>\
                        <option value=\"IO\">British Indian Ocean Territory</option>\
                        <option value=\"BN\">Brunei</option>\
                        <option value=\"BG\">Bulgaria</option>\
                        <option value=\"BF\">Burkina Faso</option>\
                        <option value=\"BI\">Burundi</option>\
                        <option value=\"KH\">Cambodia</option>\
                        <option value=\"CM\">Cameroon</option>\
                        <option value=\"CA\">Canada</option>\
                        <option value=\"IC\">Canary Islands</option>\
                        <option value=\"CV\">Cape Verde</option>\
                        <option value=\"KY\">Cayman Islands</option>\
                        <option value=\"CF\">Central African Republic</option>\
                        <option value=\"EA\">Ceuta and Melilla</option>\
                        <option value=\"TD\">Chad</option>\
                        <option value=\"CL\">Chile</option>\
                        <option value=\"CN\">China</option>\
                        <option value=\"CX\">Christmas Island</option>\
                        <option value=\"CP\">Clipperton Island</option>\
                        <option value=\"CC\">Cocos Islands</option>\
                        <option value=\"CO\">Colombia</option>\
                        <option value=\"KM\">Comoros</option>\
                        <option value=\"CD\">Congo, (Kinshasa)</option>\
                        <option value=\"CK\">Cook Islands</option>\
                        <option value=\"CR\">Costa Rica</option>\
                        <option value=\"CI\">Coted'Ivoire</option>\
                        <option value=\"HR\">Croatia</option>\
                        <option value=\"CU\">Cuba</option>\
                        <option value=\"CW\">Curaçao</option>\
                        <option value=\"CY\">Cyprus</option>\
                        <option value=\"CZ\">Czech Republic</option>\
                        <option value=\"DK\">Denmark</option>\
                        <option value=\"DG\">Diego Garcia</option>\
                        <option value=\"DJ\">Djibouti</option>\
                        <option value=\"DM\">Dominica</option>\
                        <option value=\"DO\">Dominican Republic</option>\
                        <option value=\"NQ\">Dronning Maud Land</option>\
                        <option value=\"EC\">Ecuador</option>\
                        <option value=\"EG\">Egypt</option>\
                        <option value=\"SV\">El Salvador</option>\
                        <option value=\"GQ\">Equatorial Guinea</option>\
                        <option value=\"EE\">Estonia</option>\
                        <option value=\"ET\">Ethiopia</option>\
                        <option value=\"EU\">European Union</option>\
                        <option value=\"FK\">Falkland Islands</option>\
                        <option value=\"FO\">Faroe Islands</option>\
                        <option value=\"FJ\">Fiji</option>\
                        <option value=\"FI\">Finland</option>\
                        <option value=\"FR\">France</option>\
                        <option value=\"GF\">French Guiana</option>\
                        <option value=\"PF\">French Polynesia</option>\
                        <option value=\"FQ\">French Southern and Antarctic Territories</option>\
                        <option value=\"TF\">French Southern Territories</option>\
                        <option value=\"GA\">Gabon</option>\
                        <option value=\"GM\">Gambia</option>\
                        <option value=\"GE\">Georgia</option>\
                        <option value=\"DE\">Germany</option>\
                        <option value=\"GH\">Ghana</option>\
                        <option value=\"GI\">Gibraltar</option>\
                        <option value=\"GR\">Greece</option>\
                        <option value=\"GL\">Greenland</option>\
                        <option value=\"GD\">Grenada</option>\
                        <option value=\"GP\">Guadeloupe</option>\
                        <option value=\"GU\">Guam</option>\
                        <option value=\"GT\">Guatemala</option>\
                        <option value=\"GG\">Guernsey</option>\
                        <option value=\"GN\">Guinea</option>\
                        <option value=\"GW\">Guinea-Bissau</option>\
                        <option value=\"GY\">Guyana</option>\
                        <option value=\"HT\">Haiti</option>\
                        <option value=\"HM\">Heard Island and McDonald Islands</option>\
                        <option value=\"HN\">Honduras</option>\
                        <option value=\"HK\">Hong Kong</option>\
                        <option value=\"HU\">Hungary</option>\
                        <option value=\"IS\">Iceland</option>\
                        <option value=\"IN\">India</option>\
                        <option value=\"ID\">Indonesia</option>\
                        <option value=\"IR\">Iran</option>\
                        <option value=\"IQ\">Iraq</option>\
                        <option value=\"IE\">Ireland</option>\
                        <option value=\"IM\">Isle of Man</option>\
                        <option value=\"IL\">Israel</option>\
                        <option value=\"IT\">Italy</option>\
                        <option value=\"JM\">Jamaica</option>\
                        <option value=\"JP\">Japan</option>\
                        <option value=\"JE\">Jersey</option>\
                        <option value=\"JT\">Johnston Island</option>\
                        <option value=\"JO\">Jordan</option>\
                        <option value=\"KZ\">Kazakhstan</option>\
                        <option value=\"KE\">Kenya</option>\
                        <option value=\"KI\">Kiribati</option>\
                        <option value=\"KP\">Korea (North)</option>\
                        <option value=\"XK\">Kosovo</option>\
                        <option value=\"KW\">Kuwait</option>\
                        <option value=\"KG\">Kyrgyzstan</option>\
                        <option value=\"LA\">Laos</option>\
                        <option value=\"LV\">Latvia</option>\
                        <option value=\"LB\">Lebanon</option>\
                        <option value=\"LS\">Lesotho</option>\
                        <option value=\"LR\">Liberia</option>\
                        <option value=\"LY\">Libya</option>\
                        <option value=\"LI\">Liechtenstein</option>\
                        <option value=\"LT\">Lithuania</option>\
                        <option value=\"LU\">Luxembourg</option>\
                        <option value=\"MO\">Macau</option>\
                        <option value=\"MK\">Macedonia</option>\
                        <option value=\"MG\">Madagascar</option>\
                        <option value=\"MW\">Malawi</option>\
                        <option value=\"MY\">Malaysia</option>\
                        <option value=\"MV\">Maldives</option>\
                        <option value=\"ML\">Mali</option>\
                        <option value=\"MT\">Malta</option>\
                        <option value=\"MH\">Marshall Islands</option>\
                        <option value=\"MQ\">Martinique</option>\
                        <option value=\"MR\">Mauritania</option>\
                        <option value=\"MU\">Mauritius</option>\
                        <option value=\"YT\">Mayotte</option>\
                        <option value=\"FX\">Metropolitan France</option>\
                        <option value=\"MX\">Mexico</option>\
                        <option value=\"FM\">Micronesia</option>\
                        <option value=\"MI\">Midway Islands</option>\
                        <option value=\"MD\">Moldova, Republic of</option>\
                        <option value=\"MC\">Monaco</option>\
                        <option value=\"MN\">Mongolia</option>\
                        <option value=\"ME\">Montenegro</option>\
                        <option value=\"MS\">Montserrat</option>\
                        <option value=\"MA\">Morocco</option>\
                        <option value=\"MZ\">Mozambique</option>\
                        <option value=\"MM\">Myanmar</option>\
                        <option value=\"NA\">Namibia</option>\
                        <option value=\"NR\">Nauru</option>\
                        <option value=\"NP\">Nepal</option>\
                        <option value=\"NL\">Netherlands</option>\
                        <option value=\"AN\">Netherlands Antilles</option>\
                        <option value=\"NT\">Neutral Zone</option>\
                        <option value=\"NC\">New Caledonia</option>\
                        <option value=\"NZ\">New Zealand</option>\
                        <option value=\"NI\">Nicaragua</option>\
                        <option value=\"NE\">Niger</option>\
                        <option value=\"NG\">Nigeria</option>\
                        <option value=\"NU\">Niue</option>\
                        <option value=\"NF\">Norfolk Island</option>\
                        <option value=\"VD\">North Vietnam</option>\
                        <option value=\"MP\">Northern Mariana Islands</option>\
                        <option value=\"NO\">Norway</option>\
                        <option value=\"OM\">Oman</option>\
                        <option value=\"OM_mobile\">Oman Mobile</option>\
                        <option value=\"QO\">Outlying Oceania</option>\
                        <option value=\"PC\">Pacific Islands Trust Territory</option>\
                        <option value=\"PK\">Pakistan</option>\
                        <option value=\"PW\">Palau</option>\
                        <option value=\"PS\">Palestine</option>\
                        <option value=\"PA\">Panama</option>\
                        <option value=\"PZ\">Panama Canal Zone</option>\
                        <option value=\"PG\">Papua New Guinea</option>\
                        <option value=\"PY\">Paraguay</option>\
                        <option value=\"YD\">People's Democratic Republic of Yemen</option>\
                        <option value=\"PE\">Peru</option>\
                        <option value=\"PH\">Philippines</option>\
                        <option value=\"PN\">Pitcairn</option>\
                        <option value=\"PL\">Poland</option>\
                        <option value=\"PT\">Portugal</option>\
                        <option value=\"PR\">Puerto Rico</option>\
                        <option value=\"QA\">Qatar</option>\
                        <option value=\"RE\">Reunion</option>\
                        <option value=\"RO\">Romania</option>\
                        <option value=\"RU\">Russia</option>\
                        <option value=\"RW\">Rwanda</option>\
                        <option value=\"BL\">Saint Barthélemy</option>\
                        <option value=\"SH\">Saint Helena, Ascension and Tristanda Cunha</option>\
                        <option value=\"KN\">Saint Kitts and Nevis</option>\
                        <option value=\"LC\">Saint Lucia</option>\
                        <option value=\"MF\">Saint Martin (Frenchpart)</option>\
                        <option value=\"PM\">Saint Pierre and Miquelon</option>\
                        <option value=\"VC\">Saint Vincent and the Grenadines</option>\
                        <option value=\"WS\">Samoa</option>\
                        <option value=\"SM\">San Marino</option>\
                        <option value=\"ST\">Sao Tome and Principe</option>\
                        <option value=\"SA\">Saudi Arabia</option>\
                        <option value=\"SN\">Senegal</option>\
                        <option value=\"RS\">Serbia</option>\
                        <option value=\"CS\">Serbia and Montenegro</option>\
                        <option value=\"SC\">Seychelles</option>\
                        <option value=\"SL\">Sierra Leone</option>\
                        <option value=\"SG\">Singapore</option>\
                        <option value=\"SX\">Sint Maarten</option>\
                        <option value=\"SK\">Slovakia</option>\
                        <option value=\"SI\">Slovenia</option>\
                        <option value=\"SB\">Solomon Islands</option>\
                        <option value=\"SO\">Somalia</option>\
                        <option value=\"ZA\">South Africa</option>\
                        <option value=\"GS\">South Georgia and the South Sandwich Islands</option>\
                        <option value=\"KR\">South Korea</option>\
                        <option value=\"SS\">South Sudan</option>\
                        <option value=\"ES\">Spain</option>\
                        <option value=\"LK\">Sri Lanka</option>\
                        <option value=\"SD\">Sudan</option>\
                        <option value=\"SR\">Suriname</option>\
                        <option value=\"SJ\">Svalbard and Jan Mayen</option>\
                        <option value=\"SZ\">Swaziland</option>\
                        <option value=\"SE\">Sweden</option>\
                        <option value=\"CH\">Switzerland</option>\
                        <option value=\"SY\">Syria</option>\
                        <option value=\"TW\">Taiwan</option>\
                        <option value=\"TW_mobile\">Taiwan Mobile</option>\
                        <option value=\"TJ\">Tajikistan</option>\
                        <option value=\"TZ\">Tanzania</option>\
                        <option value=\"TH\">Thailand</option>\
                        <option value=\"TL\">Timor-Leste</option>\
                        <option value=\"TG\">Togo</option>\
                        <option value=\"TK\">Tokelau</option>\
                        <option value=\"TO\">Tonga</option>\
                        <option value=\"TT\">Trinidad and Tobago</option>\
                        <option value=\"TA\">Tristanda Cunha</option>\
                        <option value=\"TN\">Tunisia</option>\
                        <option value=\"TR\">Turkey</option>\
                        <option value=\"TM\">Turkmenistan</option>\
                        <option value=\"TC\">Turks and Caicos Islands</option>\
                        <option value=\"TV\">Tuvalu</option>\
                        <option value=\"PU\">U.S. Miscellaneous Pacific Islands</option>\
                        <option value=\"UG\">Uganda</option>\
                        <option value=\"UA\">Ukraine</option>\
                        <option value=\"AE\">United Arab Emirates</option>\
                        <option value=\"UK\">United Kingdom</option>\
                        <option value=\"US\">United States</option>\
                        <option value=\"UM\">United States Minor Outlying Islands</option>\
                        <option value=\"UY\">Uruguay</option>\
                        <option value=\"UZ\">Uzbekistan</option>\
                        <option value=\"VU\">Vanuatu</option>\
                        <option value=\"VA\">Vatican City</option>\
                        <option value=\"VE\">Venezuela</option>\
                        <option value=\"VN\">Vietnam</option>\
                        <option value=\"VG\">Virgin Islands (British)</option>\
                        <option value=\"VI\">Virgin Islands (U.S.)</option>\
                        <option value=\"WK\">Wake Island</option>\
                        <option value=\"WF\">Wallis and Futuna</option>\
                        <option value=\"EH\">Western Sahara</option>\
                        <option value=\"YE\">Yemen</option>\
                        <option value=\"ZM\">Zambia</option>\
                        <option value=\"ZW\">Zimbabwe</option>\
					</select>\
				</div>\
				<br>\
                <label for=\"state\">State</label>\
				<div style=\"padding-top:5px\">\
					<select name=\"US_states\" id=\"US_states\" style=\"display:none\">\
						<option value=\"AK\">Alaska</option>\
                        <option value=\"AL\">Alabama</option>\
                        <option value=\"AR\">Arkansas</option>\
                        <option value=\"AZ\">Arizona</option>\
                        <option value=\"CA\">California</option>\
                        <option value=\"CO\">Colorado</option>\
                        <option value=\"CT\">Connecticut</option>\
                        <option value=\"DC\">District of Columbia</option>\
                        <option value=\"DC\">Washington DC</option>\
                        <option value=\"DE\">Delaware</option>\
                        <option value=\"FL\">Florida</option>\
                        <option value=\"GA\">Georgia</option>\
                        <option value=\"GU\">Guam</option>\
                        <option value=\"HI\">Hawaii</option>\
                        <option value=\"IA\">Iowa</option>\
                        <option value=\"ID\">Idaho</option>\
                        <option value=\"IL\">Illinois</option>\
                        <option value=\"IN\">Indiana</option>\
                        <option value=\"KS\">Kansas</option>\
                        <option value=\"KY\">Kentucky</option>\
                        <option value=\"LA\">Louisiana</option>\
                        <option value=\"MA\">Massachusetts</option>\
                        <option value=\"MD\">Maryland</option>\
                        <option value=\"ME\">Maine</option>\
                        <option value=\"MI\">Michigan</option>\
                        <option value=\"MN\">Minnesota</option>\
                        <option value=\"MO\">Missouri</option>\
                        <option value=\"MP\">Northern Mariana Islands</option>\
                        <option value=\"MS\">Mississippi</option>\
                        <option value=\"MT\">Montana</option>\
                        <option value=\"NC\">North Carolina</option>\
                        <option value=\"ND\">North Dakota</option>\
                        <option value=\"NE\">Nebraska</option>\
                        <option value=\"NH\">New Hampshire</option>\
                        <option value=\"NJ\">New Jersey</option>\
                        <option value=\"NM\">New Mexico</option>\
                        <option value=\"NV\">Nevada</option>\
                        <option value=\"NY\">New York</option>\
                        <option value=\"OH\">Ohio</option>\
                        <option value=\"OK\">Oklahoma</option>\
                        <option value=\"OR\">Oregon</option>\
                        <option value=\"PA\">Pennsylvania</option>\
                        <option value=\"PR\">Puerto Rico</option>\
                        <option value=\"RI\">Rhode Island</option>\
                        <option value=\"SC\">South Carolina</option>\
                        <option value=\"SD\">South Dakota</option>\
                        <option value=\"TN\">Tennessee</option>\
                        <option value=\"TX\">Texas</option>\
                        <option value=\"UT\">Utah</option>\
                        <option value=\"VA\">Virginia</option>\
                        <option value=\"VT\">Vermont</option>\
                        <option value=\"WA\">Washington</option>\
                        <option value=\"WI\">Wisconsin</option>\
                        <option value=\"WV\">West Virginia</option>\
                        <option value=\"WY\">Wyoming</option>\
					</select>\
\
					<select name=\"CA_states\" id=\"CA_states\" style=\"display:none\">\
						<option value=\"AB\">Alberta</option>\
                        <option value=\"BC\">British Columbia</option>\
                        <option value=\"MB\">Manitoba</option>\
                        <option value=\"NB\">New Brunswick</option>\
                        <option value=\"NL\">Newfoundland and Labrador</option>\
                        <option value=\"NT\">Northwest Territories</option>\
                        <option value=\"NS\">Nova Scotia</option>\
                        <option value=\"NU\">Nunavut</option>\
                        <option value=\"ON\">Ontario</option>\
                        <option value=\"PE\">Prince Edward Island</option>\
                        <option value=\"QC\">Quebec</option>\
                        <option value=\"SK\">Saskatchewan</option>\
                        <option value=\"YT\">Yukon</option>\
					</select>\
\
					<select name=\"AU_states\" id=\"AU_states\" style=\"display:none\">\
						<option value=\"ACT\">Australian Capital Territory</option>\
                        <option value=\"NSW\">New South Wales</option>\
                        <option value=\"NT\">Northern Territory</option>\
                        <option value=\"QLD\">Queensland</option>\
                        <option value=\"SA\">South Australia</option>\
                        <option value=\"TAS\">Tasmania</option>\
                        <option value=\"VIC\">Victoria</option>\
                        <option value=\"WA\">Western Australia</option>\
					</select>\
\
					<input type=\"text\" id=\"case\" name=\"nodropdown\">\
                    <br>\
				</div>\
                <label for=\"zipCode\" id=\"zipCodeTitle\">Zip Code</label>\
                <input type=\"text\" id=\"zipCode\" name=\"zipCode\">\
\
                <label for=\"languagesSpoken\"><b>Languages Spoken</b></label>\
				<input type=\"text\" placeholder=\"Enter Languages Spoken\" name=\"languagesSpoken\">\
\
				<label for=\"additionalDetails\"><b>Additional Details</b></label>\
				<textarea name=\"desc\" value=\'"+arguments[4]+"\'></textarea>\
			</fieldset>\
            <input type=\"hidden\" name=\"LeadSource\" value=\'Zendesk Ticket\'>\
            <button type=\"button\" onClick=\"changeText()\" name=\"add\" id=\"add\">Add Additional Information</button>\
			<div class=\"clearfix\" style=\"width:100%;\">\
				<button type=\"submit\" class=\"signupbtn\">Create Lead</button>\
			</div>\
		</div>\
        </form>\
</body>\
</html>"
    
    leadWindow.document.write(HTMLcode);
    leadWindow.document.write(
    "<script type=\"text/javascript\">"+
        "var select1 = document.getElementById(\"countries\");"+
        "var select2 = document.getElementById(\"US_states\");"+
        "var select3 = document.getElementById(\"CA_states\");"+
        "var select4 = document.getElementById(\"AU_states\");"+
        "var text1 = document.getElementById(\"case\");"+
        "var text2 = document.getElementById(\"zipCode\");"+
        "var label1 = document.getElementById(\"zipCodeTitle\");"+
        "select1.onchange = function() {"+
            "if (select1.value == \"US\") {"+
                "select2.style.display='block';"+
                "select3.style.display='none';"+
                "select4.style.display='none';"+
                "text1.style.display='none';"+
            "}"+
            "else if (select1.value == \"CA\"){"+
                "select2.style.display='none';"+
                "select3.style.display='block';"+
                "select4.style.display='none';"+
                "text1.style.display='none';"+
            "}"+
            "else if (select1.value == \"AU\"){"+
                "select2.style.display='none';"+
                "select3.style.display='none';"+
                "select4.style.display='block';"+
                "text1.style.display='none';"+
            "}"+
            "else"+
            "{"+
                "select2.style.display='none';"+
                "select3.style.display='none';"+
                "select4.style.display='none';"+
                "text1.style.display='block';"+
            "}"+

            "if (select1.value == \"AO\" || select1.value==\"AG\" || select1.value==\"AW\" || select1.value==\"BS\" || select1.value==\"BZ\" || select1.value==\"BJ\" || select1.value==\"BW\" || select1.value==\"BF\" || select1.value==\"BI\" || select1.value==\"CM\" || select1.value==\"CF\" || select1.value==\"KM\" || select1.value==\"CG\" || select1.value==\"CD\" || select1.value==\"CK\" || select1.value==\"CI\" || select1.value==\"DJ\" || select1.value==\"DM\" || select1.value==\"GQ\" || select1.value==\"ER\" || select1.value==\"FJ\" || select1.value==\"TF\" || select1.value==\"GM\" || select1.value==\"GH\" || select1.value==\"GD\" || select1.value==\"GN\" || select1.value==\"GY\" || select1.value==\"HK\" || select1.value==\"IE\" || select1.value==\"JM\" || select1.value==\"KE\" || select1.value==\"KI\" || select1.value==\"MO\" || select1.value==\"MW\" || select1.value==\"ML\" || select1.value==\"MR\" || select1.value==\"MU\" || select1.value==\"MS\" || select1.value==\"NR\" || select1.value==\"AN\" || select1.value==\"NU\" || select1.value==\"KP\" || select1.value==\"PA\" || select1.value==\"QA\" || select1.value==\"RW\" || select1.value==\"KN\" || select1.value==\"LC\" || select1.value==\"ST\" || select1.value==\"SA\" || select1.value==\"SC\" || select1.value==\"SL\" || select1.value==\"SB\" || select1.value==\"SO\" || select1.value==\"ZA\" || select1.value==\"SR\" || select1.value==\"SY\" || select1.value==\"TZ\" || select1.value==\"TL\" || select1.value==\"TK\" || select1.value==\"TO\" || select1.value==\"TT\" || select1.value==\"TV\" || select1.value==\"UG\" || select1.value==\"AE\" || select1.value==\"VU\" || select1.value==\"YE\" || select1.value==\"ZW\"){"+
                "text2.style.display='none';"+
                "label1.style.display='none';"+
            "} else {"+
                "text2.style.display='block';"+
                "label1.style.display='block';"+
            "}"+
        "}"+
    "</script>");
    leadWindow.document.close();
}
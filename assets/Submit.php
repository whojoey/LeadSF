<!doctype html>
<html lang="en">
<head>
    <script src="https://cdn.jsdelivr.net/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script>

        //Javascript that opens dialog box that it has been submitted and then it fades out
        $(function() {
            $("#dialog").dialog().fadeIn('fast').delay(1000).fadeOut('slow');
            setTimeout(
                function(){
                    window.close();
                },2000);


        })
    </script>


</head>

<body>
<?php
/**
 *
 * Joseph Hu
 * Date: 8/2/18
 * Time: 11:09 PM
 *
 * Flow of the PHP Submission
 *
 * Check if First Name, Last Name, Email and Agent name
 * If yes, post all the values in variables and submit
 *
 * Then check reply back from server
 *
 */

if (isset($_POST['FirstName'],$_POST['LastName'],$_POST['Email'],$_POST['agent'])) {

    $fname = $_POST['FirstName'];
    $lname = $_POST['LastName'];
    $email = $_POST['Email'];
    $company = $_POST['company'];
    $city = $_POST['city'];
    $phone = $_POST['phoneNumber'];
    if (empty($_POST['numOfEmployees']))
        $numOfEmployees = "0";
    else {
        $numOfEmployees = (string) $_POST['numOfEmployees'];
    }
    $comments = $_POST['desc'];
    $Language = $_POST['languagesSpoken'];
    $LeadOwnerEmail = $_POST['agent'];

    $data = array(
        'LastName' => $lname,
        'FirstName' => $fname,
        'Company' => $company,
        'City' => $city,
        'Phone' => $phone,
        'Email' => $email,
        'NumberOfEmployees' => $numOfEmployees,
        'LeadOwnerEmail'=> $LeadOwnerEmail,
        'Comments'=> $comments,
        'LanguagesSpoken'=> $Language
    );
    $jsoned = json_encode($data);

    $url='https://sfdc-system-api-qa.cloudhub.io/api/v1/lead/';
    $username='zendesk_admin';
    $password='Zoom999$';


    $request = curl_init();
    curl_setopt($request, CURLOPT_URL, $url);
    curl_setopt($request, CURLOPT_POST, TRUE);
    curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($request, CURLOPT_USERPWD, "$username:$password");
    curl_setopt($request, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($request, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($request, CURLOPT_POSTFIELDS, $jsoned);

    $output = curl_exec($request);
    $info = curl_getinfo($request, CURLINFO_HTTP_CODE);

    curl_close($request);


    echo "<div id=\"dialog\" title=\"Submitting...\"><p>";

    //Check if Http code is correct. You want 201. If it is anything else then it is not submitting.
    if ($info==201) {
        echo "Success! Lead Added to SalesForce. Http Code: <b>".$info."</b>.";
    } else {
        echo "Error. Please try submitting at another time. Error <b>".$info.".</b>";
    }


    echo "</p></div>";

    /*
        Uncomment to Debug
        Debug Code - Prints Results of Array
    */

    #$results = json_decode($jsoned);

    #var_dump($results);
    #echo "<br>";

    #echo $info;

} else {

    //Fails if First Name, Last Name, Email or Agent is somehow not set

    echo "<div id=\"dialog\" title=\"Submitting...\"><p>";

    echo "Possible Error Where Lead Email isn't Submitting.";

    echo "</p></div>";


}

echo "</body>";


?>
</html>

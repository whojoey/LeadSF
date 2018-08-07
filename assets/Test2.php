<?php
/**
 *
 * Joseph Hu
 * Date: 8/2/18
 * Time: 11:09 PM
 */

if (isset($_POST['submit'])) {

    echo "This Works!";
    /*$data = array(
  'LastName' => 'Hu',
  'FirstName' => 'Joseph',
  'Company' => 'Zoom',
  'Email' => 'joseph.hu@zoom.us'
);*/


    /*$data = array(
        'FirstName' => 'Joseph'
    );

    $jsoned = json_encode($data);

    $url='https://sfdc-system-api-qa.cloudhub.io/api/v1/lead';
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
    $info = curl_getinfo($request);


    curl_close($request);

    print_r($jsoned);

    echo $output.'<p>';
    echo $info;*/


}



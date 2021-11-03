<?php
require_once "./config/Connection.php";
require_once "./mainmodule/Get.php";
require_once "./mainmodule/Auth.php";
require_once "./mainmodule/Global.php";

$db = new Connection();
$pdo = $db->connect();
$global = new GlobalMethods($pdo);
$get = new Get($pdo);
$auth = new Auth($pdo);

if(isset($_REQUEST['request'])){
    $req = explode('/', rtrim($_REQUEST['request'], '/'));
}
else{
    $req = array("errorcatcher");
}

switch($_SERVER['REQUEST_METHOD']){
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        switch($req[0]){

            case 'login':
                echo json_encode($auth->login($data));
            break;

            case 'student':
                if(count($req)>1){
                    echo json_encode($get->get_common('students_tbl', "recno_fld = '$req[1]'"));
                }
                else{
                    echo json_encode($get->get_common('students_tbl'));
                }   
            break;

            case 'getstudid':
                if(count($req)>1){
                    echo json_encode($get->get_last('students_tbl', "studnum_fld = '$req[1]'"));
                }
                else{
                    echo json_encode($get->get_last('students_tbl'));
                }   
            break;

            case 'teacher':
                if(count($req)>1){
                    echo json_encode($get->get_common('teachers_tbl', "id = '$req[1]'"));
                }
                else{
                    echo json_encode($get->get_common('teachers_tbl'));
                }   
            break;

            case 'addstudent':
                echo json_encode($auth->add_student($data));
            break;

            case 'deletestudent':
                if(count($req)>1){
                    echo json_encode($global->delete('students_tbl', "recno_fld = '$req[1]'"));
                }
            break;

            case 'updatestudent':
                echo json_encode($global->update('students_tbl', $data, NULL));
            break;

            case 'employee':
                if(count($req)>1){
                    echo json_encode($get->get_common('employee_tbl', "empnum_fld = '$req[1]'"));
                }
                else{
                    echo json_encode($get->get_common('employee_tbl'));

                }       
            break;
            default:
                echo "request not found";
            break;
        }
    break;
    default:
        echo "failed request";
    break;

    
}
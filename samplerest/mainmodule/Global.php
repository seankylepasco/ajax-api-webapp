<?php

class GlobalMethods {
    protected $pdo;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }
    public function executeQuery($sql){
        $data = array();
        $errmsg = "";
        $code = 0;

        try{
            if($result = $this->pdo->query($sql)->fetchAll()){
                foreach($result as $record){
                    array_push($data, $record);
                }
                $code = 200;
                return array("code"=>$code, "data"=> $data);
            }
            else{
                $errmsg = 'No data found';
                $code = 404;
            }
        }
        catch(\PDOException $e){
           $errmsg = $e->getMessage();
           $code = 403;
        }
        return array("code"=> $code, "errmsg"=>$errmsg);
    }
    public function returnPayload($payload, $remarks, $message, $code){
        $status = array("remarks"=>$remarks, "message"=>$message);
        http_response_code($code);
        return array("status"=>$status, "payload"=>$payload, "timestamp"=>date_create());
    }
    public function insert($table_name, $data){
        $fields = [];
        $values = [];

        foreach($data as $key => $value){
            array_push($fields, $key);
            array_push($values, $value);
        }

        try{
            $counter = 0;
            $sql_str = "INSERT INTO $table_name (";

            foreach($fields as $value){
                $sql_str .= $value;
                $counter++;
                if($counter < count($fields)){
                    $sql_str .= ", ";
                }
            }

            $sql_str .= ") VALUES (" . str_repeat('?, ', count($values) - 1) . "?)";
            $sql = $this->pdo->prepare($sql_str);
            $sql->execute($values);
            return array("code"=>200, "remarks"=>"success");
        }
        catch(Exception $e){
            $errmsg = $e->getMessage();
            $code = 403;
        }
        return array("code"=>$code, "errmsg"=>$errmsg);
   
    }
    public function update($table_name, $data, $condition_string){
        // so i got bored and copied the insert code..
        // and changed some stuff..
        // some arrays..
        $fields = [];
        $values = [];
        // passing data to these arrays..
        foreach($data as $key => $value){
            array_push($fields, $key);
            array_push($values, $value);
        }
        //try
        try{
            $counter = 0;
            $sql_str = "UPDATE $table_name SET ";
            // advanced foreach loop uses 2 arrays but can use many arrays..
            foreach($fields as $index => $value){
                // ensures that the recno_fld is untouchable..
                if ($value==="recno_fld"){
                    // do nothing..
                }
                // if not recno_fld then move on..
                else{
                    $sql_str .= " $value = '$values[$index]',";
                }
            }
            // now because we habe commas for each sql strings we wanna remove the last one..
            $sql_str = rtrim($sql_str, ',');
            // where recno_fld is something..
            $sql_str .= " WHERE recno_fld = $data->recno_fld;";
            // prepare sql stmts
            $sql = $this->pdo->prepare($sql_str);
            // execute em..
            $sql->execute();
            // if worked ..
            return array("code"=>200, "remarks"=>"success");
        }
        // if not..
        catch(Exception $e){
            $errmsg = $e->getMessage();
            $code = 403;
        }
        // return whatever..
        return array("code"=>$code, "errmsg"=>$errmsg);
    }
    public function delete($table_name, $condition_string){
        // sql stuff
        $sql = "DELETE FROM $table_name ";
        // if we have something delete it..
        if($condition_string!=null){
            $sql .= " WHERE {$condition_string}";
        }
        // try sql if worked..
        try {
            $sql = $this->pdo->prepare($sql);
            $sql->execute();
            return array("status code"=>200, "remarks"=>"deleted successfully!");
        }
        // catch errors..
        catch(Exception $e){
            $errmsg = $e->getMessage();
            $code = 403;
        }
        // return if worked and if not return error message..
        return array("code"=>$code, "errmsg"=>$errmsg);
    }
    // By your secret white hat hacker..
}
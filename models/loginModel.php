<?php
class loginModel
{
    private $db;

    public function __construct($dbConnection)
    {
        $this->db = $dbConnection;
    }

    public function autenticarUsuario($usuario, $contraseña)
    {
        
    }

}

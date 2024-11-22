<?php
// models/conexion.php

class Conexion {
    private $host = "localhost";
    private $db = "recetario";
    private $user = "root";
    private $pass = "13mysql22";
    private $conexion;

    public function conectar() {
        try {
            $this->conexion = new PDO("mysql:host={$this->host};dbname={$this->db}", $this->user, $this->pass);
            $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->conexion;
        } catch (PDOException $e) {
            echo "Error de conexión: " . $e->getMessage();
        }
    }
}
?>

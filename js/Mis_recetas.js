import { mostrarRecetas, obtenerRecetas } from './helpers.js';

$(document).ready(function() {
    // Reutiliza la función global
   
    obtenerRecetas((error, data) => {
        if (error) {
            console.error("Error al obtener las recetas:", error);
            return;
        }
        mostrarRecetas(data);
    });

    
});
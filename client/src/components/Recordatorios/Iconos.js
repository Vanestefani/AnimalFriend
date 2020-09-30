import React from "react";
export function Iconos(tipo) {
  switch (tipo) {
    case "Cumpleaños":
      return <i class="fas fa-birthday-cake" width="300px"></i>;
      break;
    case "Vacunas":
      return <i class="fas fa-syringe" width="300px"></i>;
      break;
    case "Desparasitar":
      return <i class="fas fa-bug" width="300px"></i>;
      break;
    case "Peluqueria":
      return <i class="fas fa-cut" width="300px"></i>;
      break;
    case "Paseos":
      return <i class="fas fa-tree"></i>;
      break;
    case "Medicinas":
      return <i class="fas fa-tablets" width="300px"></i>;
      break;
    case "Guarderia":
      return <i class="fas fa-home" width="300px"></i>;
      break;
    case "Veterinaria":
      return <i class="fas fa-stethoscope" width="300px"></i>;
      break;
    case "Comida":
      return <i class="fas fa-bone" width="300px"></i>;
      break;
    case "Otro":
      return <i class="fas fa-clock" width="300px"></i>;
      break;
  }
}

import React from "react";
import AuthRoutes from "./auth.routes";
import ContratanteRoutes from "./Contratante/contratante.routes";
import PrestadorRoutes from "./Prestador/prestador.routes";
import { useSelector } from 'react-redux';


const Routes = () =>{
  const { tipoUsuario } = useSelector(({ authenticate: { user } }) => user);
  const token = useSelector(({ authenticate: { token } }) => token)

  if(token){
    if(tipoUsuario === "Contratante"){
      return <ContratanteRoutes />;
    }
    else if (tipoUsuario === "Prestador"){
      return <PrestadorRoutes />;
    }
  }else{
    return <AuthRoutes />;
  }  
}

export default Routes;

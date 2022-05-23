import React from "react";
import AuthRoutes from "./auth.routes";
import ContratanteRoutes from "./Contratante/contratante.routes";
import { useDispatch, useSelector } from 'react-redux';


const Routes = () =>{
  const token = useSelector(({ authenticate: { token } }) => token)  
  console.log("LOGADO: ", token);
  
  return token ? <ContratanteRoutes /> : <AuthRoutes />
}

export default Routes;

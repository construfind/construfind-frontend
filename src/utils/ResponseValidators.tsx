export const ValidaResponse = (valida) => {

  if(valida.Mensagens){
    return valida.Mensagens[0];
  }else{

    if(valida.CPF){
      return valida.CPF[0];
    }else if(valida.Documento){
      return valida.Documento[0];
    }else if(valida.Email){
      return valida.Email[0];
    }else if(valida.Telefone){
      return valida.Telefone[0];
    }else if(valida.TipoUsuario){
      return valida.TipoUsuario[0];
    }else if(valida.Endereco){
      return valida.Endereco[0];
    }else if(valida.Senha){
      return valida.Senha[0];
    }else if(valida.SenhaConfirmacao){
      return valida.SenhaConfirmacao[0];
    }else if(valida.Titulo){
      return valida.Titulo[0];
    }else if(valida.Local){
      return valida.Local[0];
    }else if(valida.TipoServico){
      return valida.TipoServico[0];
    }else if(valida.Descricao){
      return valida.Descricao[0];
    }else{
      return "Não foi possível realizar a operação, tente novamente mais tarde."
    }

  }
}

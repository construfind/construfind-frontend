import axios from "axios";

export const ViaCepHook = (cep) => {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
}

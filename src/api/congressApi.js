import axios from 'axios';

export default axios.create({
  //baseURL: "http://192.168.50.169:8080",
  //baseURL: "http://10.0.2.2:3000/prod",
  baseURL: 'https://dadosabertos.camara.leg.br/api/v2',
});

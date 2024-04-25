import { Imprimivel } from "./imprimivel.js";

// assim, essa classe irá receber apenas objetos que extendes de 'imprimivel'
// sendo uma tecnica de polimorfismo, que é quando um objeto tem a capacidade de ser referenciado de multiplas formas
export function imprimir(...objetos: Imprimivel[]){
  for(let objeto of objetos){
    console.log(objeto.paraText()); // chamando o método paratext
  }
}
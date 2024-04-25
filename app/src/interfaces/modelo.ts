import { Imprimivel } from "../utils/imprimivel.js";
import { Comparavel } from "./comparavel.js";

// sendo uma interface que extende de uma ou mais interfaces, assim, todas as classes que implementarem a interface "Modelo" tera, que implementar os métodos que se tem nas outras interfaces "Imprimivel" e "Comparavel" 
export interface Modelo<T> extends Imprimivel, Comparavel<T> {

}
export interface Comparavel<T> { // UTILIAZNDO GENERIC
  // tendo que definir na instancia da interface o tipo generic que será "T"
  ehIgual(objeto: T): boolean;
}
// decorator para medir o tempo de execução
export function logarTempoExecucao(emSegundos: boolean = false){ //caso não seja passado nenhum valor, ele adota o false por default
  return function(
    target: any,  // se coloca o decorator em um método estático, esse target é a função instrutora da classe
    // caso o decorator não seja estático ele irá retornar o protorype daquela classe
    // sendo do tipo "any", podendo receber qualquer tipo

    propertyKey: string, // ele me retorna o nome do método como string a ser decorado

    descriptor: PropertyDescriptor // ele sabe tudo sobre o método que queremos executar, tendo uma referencia ao método original
  ) {
      const metodoOriginal = descriptor.value;

      // qualquer cosia que eu colocar dentro do 'descriptor.value', ele irá sobrescrever na minha classe
      // porem, como se tem que passar os argumentos dos métodos que vão utilziar esse decorator, passamos os parametros dele pelo rest operator, definindo do tipo any
      descriptor.value = function(...args: Array<any> ) { // ou any[]
        let divisor = 1; // por padrão caso seja em milessegundos
        let unidade = 'Milessegundos';
        if(emSegundos){ // caso seja 'emSegundos' seja true
          divisor = 1000;
          unidade = 'Segundos'
        }
        const t1 = performance.now()
        
        // guardo o retorno do método original
        // utilizando o método apply, sendo passando o contexto e os argumentos
        // sendo o this desse bloco, que será executado (por exemplo) em negociações controller, então o this fará referencia a ele quando executado, e passando os argumentos desse array
        const retorno = metodoOriginal.apply(this, args)// chama o método original

        const t2 = performance.now()
        console.log(`Método "${propertyKey}", tempo de execução: ${(t2 - t1)/divisor} ${unidade}`)

        retorno // retorno o retorno original do meu método
      }

    return descriptor;
  }
}
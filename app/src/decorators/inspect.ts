// decorator que irá retornar qual o nome do método, os parametros dele e o que ele retorna

// como esse decorator não irá receber parametro, podemos fazer de outra maneira, retornando a função direto
export function inspect(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const metodoOriginal = descriptor.value;
  // atriubuindo ao value do descriptor uma função que recebe uma array de parametros do tipo any
  descriptor.value = function (...args: any[]) { 
    console.log(`--- Método: '${propertyKey}'`)
    console.log(`------ Parâmetros: ${JSON.stringify(args)}`) // transformando os argumentos em string para ser exibido
    const retorno = metodoOriginal.apply(this, args) // atribuindo ao 'retorno' a execução do método original com o apply, passando o this e os parametros do decorator
    console.log(`------ Retorno: ${JSON.stringify(retorno)}`)
    return retorno;
  }
  return descriptor;
}
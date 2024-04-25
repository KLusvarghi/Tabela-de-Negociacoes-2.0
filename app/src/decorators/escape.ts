// sendo um decorator para escapar / remover qualquer script que ouver na template string da negociacçoes-view
export function escape (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const metodoOriginal = descriptor.value
  descriptor.value = function(...args: any[]) {
    let retorno = metodoOriginal.apply(this, args)
    if(typeof retorno == 'string'){ //verificando o tipo de 'retorno'
     /* console.log(`@escape em ação na classe '${this.constructor.name}' para o método '${propertyKey}'`) */
      retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, '');

    }
    return retorno
  }
  return descriptor
}
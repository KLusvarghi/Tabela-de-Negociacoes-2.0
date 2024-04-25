// sendo esse decorator assim que a classe onde o decorator está é instanciada
export function domInjector(seletor: string){ // recebendo seletores HTML

  // O 'target' se colocado em uma propriedade estática ele me retorna a função construtora dessa classe, caso contrário ele me retorna o prototype dessa classe
  return function(target: any, propertyKey: string) { // sendo o propertyKey o atributo no qual o decorator foi colocado logo acima
    console.log(`Modificando portotype '${target.constructor.name}' e adicioandno getter para a propriedade '${propertyKey}'`)

    // porem não teremos acesso a instancia da classe negociacaoController, tendo que fazer o seguinte para se ter
    
    // quando o meu getter for aplicado na prorpiedade da minha classe, eu quero tranformar essa propriedade em um 'getter', sendo o terget fazedno eferencia a propriedade da classe, eu posso alterar usando 'Object.definePropertu()'

    let elemento: HTMLElement | null = null // variaveis do tipo 'HTMLEelemrnt' não podem receber null, mas nesse caso eu permito
    const getter = function() {
      if(!elemento) { // fazendo isso uma única vez para cada prorpiedade
        elemento = <HTMLElement>document.querySelector(seletor) // dizendo que 'elemento' sempre receberá um HTMLElement
        console.log(`Buscando elemento do DOM com o seletor '${seletor}' para injetar em '${propertyKey}'`)
      }
      // caso já tenha algum elemento, ele me retorna diretor o 'elemento', fazendo um sstema de cache
      return elemento
    }

    Object.defineProperty(
      target, // semdo ele um prototype que define a classe
      propertyKey, 
      { get: getter } // assim, todos as propriedades inputData, etc, irão criar um getter, e quando acessadas irão executar o código acima que busca o elemento do DOM (getter)
    ) 
    // passando o prototype que define a classe negociacao controller e adicione um getter para o propertyKey e por fim passando um objeto contendo o nome do getter

  }

}
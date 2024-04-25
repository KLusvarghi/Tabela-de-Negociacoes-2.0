import { NegociacoesDoDia } from "../interfaces/negociacaoDoDia.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService {

  // sendo um método que retorna uma 'promisse' do tipo array de NegociacoesDoDia 
  public obterNegociacoesDoDia(): Promise<Negociacao[]> {
    return fetch('http://localhost:8080/dados')
        .then(resp => resp.json())
        // tipando o valor de 'dados'
        .then((dados:NegociacoesDoDia[]) => { // definindo que os dados recebidos em json é uma array do tipo 'any'
            // retornanda a cada interação uma nova array
            return dados.map(dadoHoje => {
                // que dentro dessa array criada será retoernado uma nova negociação a cada loop dentro do map
                return new Negociacao(
                    new Date(), 
                    dadoHoje.vezes, 
                    dadoHoje.montante
                )
            })
        })
  }
}
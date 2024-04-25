import { Modelo } from '../interfaces/modelo.js';
import { Negociacao } from './negociacao.js';

// sendo essa classe implementada pela interface 'imprimivel'
export class Negociacoes implements Modelo<Negociacoes>{
   
    private negociacoes: Negociacao[] = [];

    public adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    // sendo o método para listar as negociações
    public lista(): readonly Negociacao[] {
        return this.negociacoes;
    }

    public paraText(): string {
        return JSON.stringify(this.negociacoes, null, 2); // passando 2 de espaçamento, par aque fique identado na hora de exibir
    }

    // método irá comparar duas listas
    public ehIgual(negociacoes: Negociacoes): boolean {
        // fazendo a comparação das duas listas
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista());
    }
}

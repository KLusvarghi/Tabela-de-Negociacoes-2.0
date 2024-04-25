import { Modelo } from "../interfaces/modelo.js";

// sendo essa classe implementada pela interface 'imprimivel'
export class Negociacao implements Modelo<Negociacao> {
    constructor(
        private _data: Date, 
        public readonly quantidade: number, 
        public readonly valor: number
    ) {
        // como agora vamos implemetar uma interface, não precisamos utilziar o super
        // super(); // como estou extendnedo de uma classe, mesmo que essa classe não tenha construtor, eu tenho que chamar o construtor dela por que eu sobrescrevi ali encima o construtor; tendo assim que garantir a chamda do construtior de 'imprimivel'
    }

    get volume(): number {
        return this.quantidade * this.valor;
    }

    get data(): Date {
        const data = new Date(this._data.getTime());
        return data;
    }

    public paraText(): string {
        return `
            Data: ${this.data},
            Quantidade: ${this.quantidade},
            Valor: ${this.valor},
        `;
    }

    public static criaDe(dataString: string, quantidadeString: string, valorString: string): Negociacao {
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor);
    }

    // método responsavel por comparar as negociações importadas com as futuras as proximas importadas
    // sendo obrigatório implementar esse método por conta que na interface "comparavel.ts" se chama esse método lá
    // se eu mudar e tirar o "Negociacao" e colocar "string" por exemplo, me dará um erro em ram time
    public ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() == negociacao.data.getDate() 
        && this.data.getMonth() === negociacao.data.getMonth()
        && this.data.getFullYear() === negociacao.data.getFullYear()
    }
}
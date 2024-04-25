import { domInjector } from '../decorators/dom-injector.js';
import { inspect } from '../decorators/inspect.js';
import { logarTempoExecucao } from '../decorators/logarTempoExecucao.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesService } from '../services/negociacoesService.js';
import { imprimir } from '../utils/imprimir.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

export class NegociacaoController {
// sendo um decoreitor par aque evitemos de ficar poluindo o nosso construtor e ter que ficar todo momento indo no DOM e pegar os seletores 
    // criando decoreitor para propriedade da classe
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacaoService = new NegociacoesService; //ccriando instancia dos servicoes de api

    constructor() {
// Após a criação do decorator 'domInjector' não precisamos mais instanciar os inputs no construtor

        // this.inputData = <HTMLInputElement>document.querySelector('#data');
        // this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        // this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    // Decorator
    @logarTempoExecucao(true)
    @inspect // não precisando usar '()' por conta que eu exporto a função direto, ele não receberá parametros
    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value, 
            this.inputQuantidade.value,
            this.inputValor.value
        );
     
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView
                .update('Apenas negociações em dias úteis são aceitas');
            return ;
        }

        this.negociacoes.adiciona(negociacao);
        imprimir(negociacao, this.negociacoes); // chamando o método que irá imprimir no console as negociações e negociacao
        this.limparFormulario();
        this.atualizaView();
    }

    public importDados(): void{
        // chamando o método que está em 'NegociacoesService', e como ele me retorna um "Promise" eu posso utilizar o '.then()' nele
        this.negociacaoService.obterNegociacoesDoDia() // recebe as negociações do dia
        // chamando ele no foreach, fazendo mais um encadeamento com o '.then()'

        // antes de fazer o for eu terei que filtrar os dados que serão importados
        .then(negociacoesHoje => { // sendo 'negociacoesHoje' os dados a serem importados
            return negociacoesHoje.filter(negoHoje => { // fazedno um filtro
                // para cada interação ei tenho que retornar true ou false
                return !this.negociacoes
                    .lista() // sendo o método para listar as negociações
                    // no some, a priemira coisa que é verdadeira, ele para e me retorna true
                    .some(negociacao => negociacao.ehIgual(negoHoje)) // assim verificando se tem alguma negociação igual a 'negoHoje', porem se for igual ele retorna true e entr apara a array que o filter retorna, então tendo que negar o "!this.negociacoes"
            })
        })
        .then( negociacoesHoje => {
            // sendo agora uma array de negociações, tendo acesso ao aoto complite

            

            for(let nego of negociacoesHoje){
                this.negociacoes.adiciona(nego)
            }
            // ao acabar o loop adicioanmos a tela as informações
            this.negociacoesView.update(this.negociacoes)
        })
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO 
            && data.getDay() < DiasDaSemana.SABADO;
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
}

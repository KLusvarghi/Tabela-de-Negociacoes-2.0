import { inspect } from "../decorators/inspect.js";
import { logarTempoExecucao } from "../decorators/logarTempoExecucao.js";

export abstract class View<T> {

    protected elemento: HTMLElement;

    constructor(seletor: string) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento as HTMLElement;
        } else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique`);
        }
    }

    // Decorator
    // @logarTempoExecucao(true) // ele é executado primeiro, porem ele passa para o segundo, faz o replace no segundo executa o segundo depois volta para o primeiro e faz o replace nele tbm
    // @inspect // não precisando usar '()' por conta que eu exporto a função direto, ele não receberá parametros
    public update(model: T): void {
        // vendo a performance do método utilizando o método global 'performance'
        // const t1 = performance.now()
        let template = this.template(model);
        this.elemento.innerHTML = template;
        // const t2 = performance.now()
        // console.log(`O tempo de execução do método 'update': ${(t2 - t1)/1000} segundos`)

    }

    protected abstract template(model: T): string;
}
export function domInjector(seletor) {
    return function (target, propertyKey) {
        console.log(`Modificando portotype '${target.constructor.name}' e adicioandno getter para a propriedade '${propertyKey}'`);
        let elemento = null;
        const getter = function () {
            if (!elemento) {
                elemento = document.querySelector(seletor);
                console.log(`Buscando elemento do DOM com o seletor '${seletor}' para injetar em '${propertyKey}'`);
            }
            return elemento;
        };
        Object.defineProperty(target, propertyKey, { get: getter });
    };
}
//# sourceMappingURL=dom-injector.js.map
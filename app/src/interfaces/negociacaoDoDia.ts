// essa interface irá servir para que a gente tipe as variaveis e tipos recebido pela api no beckend
export interface NegociacoesDoDia {
  // lembrando que não se pode usar modificadores private, public ou protected em propriedades de uma 'interface'
  montante: number;
  vezes: number;
  // dando dois click e indo em "Rename symbol" (F2), ele irá alterar o nome montante instaciada de 'NegociacoesDoDia' em todos os lugares do projeto
}
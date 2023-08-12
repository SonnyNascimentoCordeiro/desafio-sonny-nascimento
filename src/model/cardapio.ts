export class Cardapio {

    codigo: string;
    descricao: string;
    valor: number;

    constructor(codigo: string, descricao: string, valor: number) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.valor = valor;
    }
}
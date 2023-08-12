export class MetodoPagamento {

    codigo: string;
    modificador: string;
    valor: number;

    constructor(codigo: string, modificador: string, valor: number) {
        this.codigo = codigo;
        this.modificador = modificador;
        this.valor = valor;
    }
}

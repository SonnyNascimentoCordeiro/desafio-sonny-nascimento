import metodoPagamento from './assets/data/metodoPagamento.json';
import cardapioJson from './assets/data/cardapio.json';

export class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        const cardapio = cardapioJson;
        const metodoPagamentoAtual = metodoPagamento.find((element) => element.codigo === metodoDePagamento);

        if (!metodoPagamentoAtual) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let totalItemCarrinho = 0;
        let totalCompra = 0;
        for (let i = 0; i < itens.length; i++) {
            const pedido = itens[i].split(',');
            const quantidade = parseInt(pedido[1]);

            if (quantidade === 0) {
                return 'Quantidade inválida!';
            }

            const item = cardapio.find((element) => element.codigo === pedido[0]);
            if (!item) {
                return 'Item inválido!';
            }
            let valorItem = item.valor;

            if (item.extra) {
                const itemPrincipal = cardapio.find((e) => e.codigo === item.extra);

                if (!itens.find((pedido) => pedido.startsWith(item.extra))) {
                    return 'Item extra não pode ser pedido sem o principal';
                }

                valorItem += itemPrincipal.valor;
            }

            totalItemCarrinho = item.valor * quantidade;
            totalCompra += totalItemCarrinho;
        }
        totalCompra = calculaValorModificado(metodoPagamentoAtual.modificador, totalCompra, metodoPagamentoAtual.valor);
        totalCompra = parseFloat(totalCompra.toFixed(2));

        return totalCompra.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    }
}

export function calculaValorModificado(operador, valorOriginal, valorModificacao) {
    const valorDesconto = valorOriginal * (valorModificacao / 100);
    switch (operador) {
        default :
            return valorOriginal + valorDesconto;
        case '-':
            return valorOriginal - valorDesconto;

    }
}
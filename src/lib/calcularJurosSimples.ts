export interface ResultadoJurosSimples {
  labels: number[];
  pontosDados: number[];
  totalInvestido: number;
  totalGanhoJuros: number;
  valorFinal: number;
}

export interface ParametrosJurosSimples {
  principal: number;
  taxa: number;
  tempo: number;
  tempoEmAnos?: boolean;
  taxaEmAnos?: boolean;
}

export function calcularJurosSimples({
  principal,
  taxa,
  tempo,
  tempoEmAnos = true,
  taxaEmAnos = true,
}: ParametrosJurosSimples): ResultadoJurosSimples {
  let taxaJuros: number;
  let tempoTotal: number;

  if (taxaEmAnos && tempoEmAnos) {
    taxaJuros = taxa / 100;
    tempoTotal = tempo;
  } else if (taxaEmAnos && !tempoEmAnos) {
    taxaJuros = taxa / 100 / 12;
    tempoTotal = tempo;
  } else if (!taxaEmAnos && tempoEmAnos) {
    taxaJuros = (taxa / 100) * 12;
    tempoTotal = tempo;
  } else {
    taxaJuros = taxa / 100;
    tempoTotal = tempo;
  }

  let totalInvestido = principal;
  let totalGanhoJuros = principal * taxaJuros * tempoTotal;
  let valorFinal = totalInvestido + totalGanhoJuros;
  let labels: number[] = [];
  let pontosDados: number[] = [];

  for (let periodo = 0; periodo <= tempoTotal; periodo++) {
    labels.push(periodo);
    let valorPeriodo = principal + principal * taxaJuros * periodo;
    pontosDados.push(parseFloat(valorPeriodo.toFixed(2)));
  }

  return {
    labels,
    pontosDados,
    totalInvestido,
    totalGanhoJuros,
    valorFinal: parseFloat(valorFinal.toFixed(2)),
  };
}

export interface ResultadoJurosCompostos {
  labels: number[];
  pontosDados: number[];
  pontosInvestimento: number[];
  totalInvestido: number;
  lucroTotal: number;
  valorFinal: number;
}

export interface ParametrosJurosCompostos {
  capitalInicial: number;
  taxa: number;
  tempo: number;
  adicionarMensal: boolean;
  valorMensal?: number;
  tempoEmAnos?: boolean;
  taxaEmAnos?: boolean;
}

export function calcularJurosCompostos({
  capitalInicial,
  taxa,
  tempo,
  adicionarMensal,
  valorMensal = 0,
  tempoEmAnos = true,
  taxaEmAnos = true,
}: ParametrosJurosCompostos): ResultadoJurosCompostos {
  let taxaJuros: number;
  let tempoTotal: number;
  let mensal = adicionarMensal ? valorMensal : 0;

  if (taxaEmAnos && tempoEmAnos) {
    taxaJuros = taxa / 100;
    tempoTotal = tempo;
  } else if (taxaEmAnos && !tempoEmAnos) {
    taxaJuros = taxa / 100 / 12;
    tempoTotal = tempo;
  } else if (!taxaEmAnos && tempoEmAnos) {
    taxaJuros = taxa / 100;
    tempoTotal = tempo * 12;
  } else {
    taxaJuros = taxa / 100;
    tempoTotal = tempo;
  }

  let totalInvestido = capitalInicial;
  let valorFinal = capitalInicial;
  let labels: number[] = [];
  let pontosDados: number[] = [];
  let pontosInvestimento: number[] = [];

  for (let periodo = 0; periodo <= tempoTotal; periodo++) {
    labels.push(periodo);
    if (adicionarMensal) {
      if (periodo > 0) {
        totalInvestido += mensal;
        valorFinal = (valorFinal + mensal) * (1 + taxaJuros);
      }
      pontosDados.push(parseFloat(valorFinal.toFixed(2)));
      pontosInvestimento.push(parseFloat(totalInvestido.toFixed(2)));
    } else {
      valorFinal = capitalInicial * Math.pow(1 + taxaJuros, periodo);
      pontosDados.push(parseFloat(valorFinal.toFixed(2)));
      pontosInvestimento.push(parseFloat(capitalInicial.toFixed(2)));
    }
  }

  const lucroTotal = valorFinal - totalInvestido;

  return {
    labels,
    pontosDados,
    pontosInvestimento,
    totalInvestido,
    lucroTotal,
    valorFinal: parseFloat(valorFinal.toFixed(2)),
  };
}

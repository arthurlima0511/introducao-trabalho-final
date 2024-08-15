"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { calcularJurosCompostos } from "@/lib/calcularJurosCompostos";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DadosGrafico {
  labels: number[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

export default function JurosCompostos() {
  const [capitalInicial, setCapitalInicial] = useState("0");
  const [taxa, setTaxa] = useState("0");
  const [tempo, setTempo] = useState("0");
  const [valorMensal, setValorMensal] = useState("0");
  const [dados, setDados] = useState<DadosGrafico>({
    labels: [],
    datasets: [],
  });
  const [adicionarMensal, setAdicionarMensal] = useState("Não");
  const [periodoTempo, setPeriodoTempo] = useState("Anual");
  const [tipoTaxa, setTipoTaxa] = useState("Anual");
  const [valorFinalTotal, setValorFinalTotal] = useState("0");
  const [totalInvestido, setTotalInvestido] = useState("0");
  const [lucroTotal, setLucroTotal] = useState("0");

  const handleCalcular = () => {
    const params = {
      capitalInicial: parseFloat(capitalInicial),
      taxa: parseFloat(taxa),
      tempo: parseFloat(tempo),
      adicionarMensal: adicionarMensal === "Sim",
      valorMensal: parseFloat(valorMensal),
      tempoEmAnos: periodoTempo === "Anual",
      taxaEmAnos: tipoTaxa === "Anual",
    };

    const resultado = calcularJurosCompostos(params);

    setValorFinalTotal(resultado.valorFinal.toFixed(2));
    setTotalInvestido(resultado.totalInvestido.toFixed(2));
    setLucroTotal(resultado.lucroTotal.toFixed(2));

    const datasets = [
      {
        label: "Juros Compostos",
        data: resultado.pontosDados,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Total Investido",
        data: resultado.pontosInvestimento,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ];

    setDados({
      labels: resultado.labels,
      datasets,
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCalcular();
        }}
        className="flex flex-col gap-4"
      >
        <div>
          <Label htmlFor="principal">Principal Inicial: </Label>
          <Input
            id="principal"
            type="number"
            value={capitalInicial}
            onChange={(e) => setCapitalInicial(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="taxa">Taxa de Juros: </Label>
          <Input
            id="taxa"
            type="number"
            value={taxa}
            onChange={(e) => setTaxa(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="tipoTaxa">Tipo de Taxa: </Label>
          <Select
            value={tipoTaxa}
            onValueChange={(value: string) => setTipoTaxa(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de Taxa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Anual">Anual</SelectItem>
              <SelectItem value="Mensal">Mensal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="tempo">Tempo: </Label>
          <Input
            id="tempo"
            type="number"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="periodoTempo">Período de Tempo: </Label>
          <Select
            value={periodoTempo}
            onValueChange={(value: string) => setPeriodoTempo(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período de Tempo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Anual">Anual</SelectItem>
              <SelectItem value="Mensal">Mensal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="adicionarMensal">Adicionar Valor Mensal?</Label>
          <Select
            value={adicionarMensal}
            onValueChange={(value: string) => setAdicionarMensal(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Adicionar Mensal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sim">Sim</SelectItem>
              <SelectItem value="Não">Não</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="valorMensal">Valor Mensal: </Label>
          <Input
            id="valorMensal"
            type="number"
            value={valorMensal}
            onChange={(e) => setValorMensal(e.target.value)}
            disabled={adicionarMensal === "Não"}
          />
        </div>
        <Button type="submit">Calcular</Button>
        {valorFinalTotal && <p>Valor final: {valorFinalTotal}</p>}
        {lucroTotal && <p>Lucro total: {lucroTotal}</p>}
        {totalInvestido && <p>Investimento total: {totalInvestido}</p>}
      </form>
      <div className="w-1/3 h-1/3">
        <Line data={dados} />
      </div>
    </>
  );
}

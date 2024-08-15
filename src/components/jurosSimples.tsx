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
import { calcularJurosSimples } from "@/lib/calcularJurosSimples";

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

export default function JurosSimples() {
  const [principal, setPrincipal] = useState("0");
  const [taxa, setTaxa] = useState("0");
  const [tempo, setTempo] = useState("0");
  const [dados, setDados] = useState<DadosGrafico>({
    labels: [],
    datasets: [],
  });
  const [periodoTempo, setPeriodoTempo] = useState("Anual");
  const [tipoTaxa, setTipoTaxa] = useState("Anual");
  const [valorTotal, setValorTotal] = useState("0");
  const [totalInvestido, setTotalInvestido] = useState("0");
  const [lucroTotal, setLucroTotal] = useState("0");

  const handleCalcular = () => {
    const params = {
      principal: parseFloat(principal),
      taxa: parseFloat(taxa),
      tempo: parseFloat(tempo),
      tempoEmAnos: periodoTempo === "Anual",
      taxaEmAnos: tipoTaxa === "Anual",
    };

    const resultado = calcularJurosSimples(params);

    setValorTotal(resultado.valorFinal.toFixed(2));
    setTotalInvestido(resultado.totalInvestido.toFixed(2));
    setLucroTotal(resultado.totalGanhoJuros.toFixed(2));

    const datasets = [
      {
        label: "Juros Simples",
        data: resultado.pontosDados,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Total Investido",
        data: Array(resultado.labels.length).fill(resultado.totalInvestido),
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
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
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
            onValueChange={(value) => setTipoTaxa(value)}
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
            onValueChange={(value) => setPeriodoTempo(value)}
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
        <Button type="submit">Calcular</Button>
        {valorTotal && <p>Valor total: {valorTotal}</p>}
        {lucroTotal && <p>Lucro total: {lucroTotal}</p>}
        {totalInvestido && <p>Investimento total: {totalInvestido}</p>}
      </form>
      <div className="w-1/3 h-1/3">
        <Line data={dados} />
      </div>
    </>
  );
}

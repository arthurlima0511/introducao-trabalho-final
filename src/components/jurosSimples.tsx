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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
  };

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
        fill: false,
        backgroundColor: "#22c55e",
        borderColor: "#22c55e",
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 10,
        pointBackgroundColor: "#22c55e",
      },
      {
        label: "Total Investido",
        data: Array(resultado.labels.length).fill(resultado.totalInvestido),
        fill: false,
        backgroundColor: "#dc2626",
        borderColor: "#dc2626",
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 10,
        pointBackgroundColor: "#dc2626",
      },
    ];

    setDados({
      labels: resultado.labels,
      datasets,
    });

    console.log(datasets);
    console.log(dados);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-around items-center min-h-[80vh] gap-4 md:gap-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCalcular();
          }}
          className="flex flex-col gap-4 w-full md:w-1/3 min-h-[60vh]"
        >
          <div className="w-full">
            <Label htmlFor="principal">Valor inicial: </Label>
            <Input
              id="principal"
              type="number"
              min={1}
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-2/3">
              <Label htmlFor="taxa">Taxa de juros: </Label>
              <Input
                id="taxa"
                type="number"
                value={taxa}
                onChange={(e) => setTaxa(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3">
              <Label htmlFor="tipoTaxa">Tipo de taxa: </Label>
              <Select
                value={tipoTaxa}
                onValueChange={(value) => setTipoTaxa(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipo de Taxa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Anual">Anual</SelectItem>
                  <SelectItem value="Mensal">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-2/3">
              <Label htmlFor="tempo">Tempo: </Label>
              <Input
                id="tempo"
                type="number"
                min={1}
                value={tempo}
                onChange={(e) => setTempo(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3">
              <Label htmlFor="periodoTempo">Período de tempo: </Label>
              <Select
                value={periodoTempo}
                onValueChange={(value) => setPeriodoTempo(value)}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Período de Tempo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Anual">Anual</SelectItem>
                  <SelectItem value="Mensal">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit">Calcular</Button>

          <div className="flex flex-col gap-6 justify-start items-start md:mt-[5rem]">
            {valorTotal === "0" ? (
              <p className="text-xl font-bold">Valor total: R$ 00,00</p>
            ) : (
              <p className="text-xl font-bold">Valor total: R$ {valorTotal}</p>
            )}
            {lucroTotal === "0" ? (
              <p className="text-xl font-bold text-green-500">
                Lucro total: R$ 00,00
              </p>
            ) : (
              <p className="text-xl font-bold text-green-500">
                Lucro total: R$ {lucroTotal}
              </p>
            )}
            {totalInvestido === "0" ? (
              <p className="text-xl font-bold text-red-600">
                Investimento total: R$ 00,00
              </p>
            ) : (
              <p className="text-xl font-bold text-red-600">
                Investimento total: R$ {totalInvestido}
              </p>
            )}
          </div>
        </form>

        <div className="w-full md:w-2/4 h-[60vh]">
          <Line data={dados} options={options} />
        </div>
      </div>
    </>
  );
}

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
        label: "Valor final",
        data: resultado.pontosDados,
        fill: false,
        backgroundColor: "#22c55e",
        borderColor: "#22c55e",
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 7,
        pointBackgroundColor: "#22c55e",
      },
      {
        label: "Investimento total",
        data: resultado.pontosInvestimento,
        fill: false,
        backgroundColor: "#dc2626",
        borderColor: "#dc2626",
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 7,
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
      <div className="flex flex-col lg:flex-row justify-around items-center min-h-[80vh] gap-4 lg:gap-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCalcular();
          }}
          className="flex flex-col gap-4 w-full lg:w-1/3 min-h-[60vh]"
        >
          <div className="w-full">
            <Label htmlFor="principal">Valor inicial: </Label>
            <Input
              id="principal"
              type="number"
              min="1"
              value={capitalInicial}
              onChange={(e) => setCapitalInicial(e.target.value)}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-2/3">
              <Label htmlFor="taxa">Taxa de juros: </Label>
              <Input
                id="taxa"
                type="number"
                value={taxa}
                onChange={(e) => setTaxa(e.target.value)}
              />
            </div>
            <div className="w-full lg:w-1/3">
              <Label htmlFor="tipoTaxa">Tipo de taxa: </Label>
              <Select
                value={tipoTaxa}
                onValueChange={(value: string) => setTipoTaxa(value)}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Tipo de Taxa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Anual">Anual</SelectItem>
                  <SelectItem value="Mensal">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-2/3">
              <Label htmlFor="tempo">Tempo: </Label>
              <Input
                id="tempo"
                type="number"
                minLength={1}
                min={1}
                value={tempo}
                onChange={(e) => setTempo(e.target.value)}
              />
            </div>
            <div className="w-full lg:w-1/3">
              <Label htmlFor="periodoTempo">Período: </Label>
              <Select
                value={periodoTempo}
                onValueChange={(value: string) => setPeriodoTempo(value)}
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

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-2/3">
              <Label htmlFor="valorMensal">Valor mensal: </Label>
              <Input
                id="valorMensal"
                type="number"
                value={valorMensal}
                min={1}
                onChange={(e) => setValorMensal(e.target.value)}
                disabled={adicionarMensal === "Não"}
              />
            </div>
            <div className="w-full lg:w-1/3">
              <Label htmlFor="adicionarMensal">Valor mensal?</Label>
              <Select
                value={adicionarMensal}
                onValueChange={(value: string) => setAdicionarMensal(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Adicionar Mensal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sim">Sim</SelectItem>
                  <SelectItem value="Não">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <Button className="w-full" type="submit">
              Calcular
            </Button>
          </div>

          <div className="flex flex-col gap-6 justify-start items-start">
            {valorFinalTotal === "0" ? (
              <p className="text-xl font-bold text-green-500">
                Valor total: R$ 00,00
              </p>
            ) : (
              <p className="text-xl font-bold text-green-500">
                Valor total: R$ {valorFinalTotal}
              </p>
            )}
            {lucroTotal === "0" ? (
              <p className="text-xl font-bold">Lucro total: R$ 00,00</p>
            ) : (
              <p className="text-xl font-bold">Lucro total: R$ {lucroTotal}</p>
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

        <div className="w-full lg:w-2/4 h-[60vh]">
          <Line data={dados} options={options} />
        </div>
      </div>
    </>
  );
}

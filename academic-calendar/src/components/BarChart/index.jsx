import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { nome: "Jan", vendas: 400 },
    { nome: "Fev", vendas: 300 },
    { nome: "Mar", vendas: 500 },
    { nome: "Abr", vendas: 200 },
    { nome: "Mai", vendas: 700 },
];

function BarChartItem({ data, xKey, yKey, cor = "#007bc0" }) {
    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xKey} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={yKey} fill={cor} radius={[5, 5, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarChartItem;

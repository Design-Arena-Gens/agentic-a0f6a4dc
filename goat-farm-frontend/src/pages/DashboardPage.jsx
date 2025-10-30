import { useQuery } from '@tanstack/react-query';
import { fetchDashboard } from '../services/dashboardService';
import StatCard from '../components/global/StatCard';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts';
import { exportToPDF, exportToXLSX } from '../services/reportService';

const mockTrend = [
  { month: 'Jan', growth: 1.2, fcr: 5.4 },
  { month: 'Feb', growth: 1.5, fcr: 5.1 },
  { month: 'Mar', growth: 1.8, fcr: 4.9 },
  { month: 'Apr', growth: 2.1, fcr: 4.6 }
];

const DashboardPage = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => fetchDashboard(1)
  });

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading analytics...</p>;
  }

  const statCards = [
    { title: 'Total Herd Size', value: metrics?.totalGoats },
    { title: 'Mortality Rate', value: `${metrics?.mortalityRate}%`, trend: -2.1 },
    { title: 'Fertility Rate', value: `${metrics?.fertilityRate}%`, trend: 1.8 },
    { title: 'Monthly ROI', value: `${metrics?.kpiValues?.roi}%`, trend: 0.9 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">Farm Performance Overview</h2>
          <p className="text-sm text-slate-500">Key KPIs across herd, feed, health and finance</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
            onClick={() =>
              exportToXLSX('GFMS Dashboard', ['Metric', 'Value'], Object.entries(metrics?.kpiValues ?? {}))
            }
          >
            Export XLSX
          </button>
          <button
            type="button"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm"
            onClick={() =>
              exportToPDF(
                'GFMS Dashboard',
                ['Metric', 'Value'],
                Object.entries(metrics?.kpiValues ?? {}).map(([key, value]) => [key, value])
              )
            }
          >
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-700">Average Daily Gain vs Feed Conversion</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={mockTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" stroke="#2563eb" />
              <YAxis yAxisId="right" orientation="right" stroke="#14b8a6" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="growth" stroke="#2563eb" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="fcr" stroke="#14b8a6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-700">Cost & Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={[
                { name: 'Feed', cost: metrics?.kpiValues?.feedCostPerKgGain ?? 0 },
                { name: 'Health', cost: 42 },
                { name: 'Labor', cost: 35 }
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cost" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

import { exportToPDF, exportToXLSX } from '../services/reportService';
import DataTable from '../components/tables/DataTable';

const reports = [
  { name: 'Vaccination Register', description: 'Schedule, dosage, and compliance status' },
  { name: 'Breeding Performance', description: 'Fertility %, conception %, kidding %, prolificacy' },
  { name: 'Feed Ledger', description: 'Stock, consumption, cost per kg weight gain' },
  { name: 'Financial P&L', description: 'Revenue, expense, ROI, subsidy and loan tracking' }
];

const ReportsPage = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800">Reports & Documentation</h2>
        <p className="text-sm text-slate-500">Generate compliance-ready PDFs and spreadsheets</p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
          onClick={() => exportToXLSX('gfms-report-catalog', ['Report', 'Description'], reports.map((r) => [r.name, r.description]))}
        >
          Export Catalog XLSX
        </button>
        <button
          type="button"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm"
          onClick={() => exportToPDF('GFMS Report Catalog', ['Report', 'Description'], reports.map((r) => [r.name, r.description]))}
        >
          Export Catalog PDF
        </button>
      </div>
    </div>
    <DataTable
      data={reports}
      keyExtractor={(item) => item.name}
      columns={[
        { key: 'name', title: 'Report', dataIndex: 'name' },
        { key: 'description', title: 'Description', dataIndex: 'description' },
        {
          key: 'actions',
          title: 'Actions',
          dataIndex: 'name',
          render: (value) => (
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-lg border border-primary px-3 py-1 text-xs font-semibold text-primary"
                onClick={() => exportToPDF(value, ['Field', 'Value'], [['Status', 'Ready']])}
              >
                PDF
              </button>
              <button
                type="button"
                className="rounded-lg border border-emerald-500 px-3 py-1 text-xs font-semibold text-emerald-600"
                onClick={() => exportToXLSX(value, ['Field', 'Value'], [['Status', 'Ready']])}
              >
                XLSX
              </button>
            </div>
          )
        }
      ]}
    />
  </div>
);

export default ReportsPage;

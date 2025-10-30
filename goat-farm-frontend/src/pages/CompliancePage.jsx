const checklist = [
  { category: 'ICAR Guideline', item: 'Vaccination coverage >= 95%', status: 'On Track' },
  { category: 'NABARD', item: 'Monthly financial reporting', status: 'On Track' },
  { category: 'FSSAI', item: 'Meat processing hygiene log', status: 'Pending' },
  { category: 'Biosecurity', item: 'Quarantine register updated', status: 'Completed' }
];

const CompliancePage = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold text-slate-800">Compliance & Biosecurity</h2>
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Category</th>
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Checklist Item</th>
            <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {checklist.map((row) => (
            <tr key={row.item}>
              <td className="px-4 py-3 text-sm text-slate-700">{row.category}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{row.item}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    row.status === 'On Track'
                      ? 'bg-emerald-100 text-emerald-700'
                      : row.status === 'Completed'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CompliancePage;

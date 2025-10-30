const DataTable = ({ columns, data, keyExtractor }) => (
  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <table className="min-w-full divide-y divide-slate-200">
      <thead className="bg-slate-50">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {data.map((item, index) => (
          <tr key={keyExtractor ? keyExtractor(item) : index} className="hover:bg-slate-50">
            {columns.map((col) => (
              <td key={col.key} className="px-4 py-3 text-sm text-slate-700">
                {col.render ? col.render(item[col.dataIndex], item) : item[col.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;

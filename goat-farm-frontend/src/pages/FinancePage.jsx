import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listFinanceRecords, createFinanceRecord } from '../services/financeService';
import DataTable from '../components/tables/DataTable';
import dayjs from 'dayjs';
import { formatDate } from '../utils/dateUtils';

const FinancePage = () => {
  const [filters, setFilters] = useState({
    farmId: 1,
    start: dayjs().startOf('month').format('YYYY-MM-DD'),
    end: dayjs().endOf('month').format('YYYY-MM-DD')
  });
  const [form, setForm] = useState({ recordType: 'SALE', amount: 0, category: '', description: '' });
  const queryClient = useQueryClient();

  const { data: records = [] } = useQuery({
    queryKey: ['finance', filters],
    queryFn: () => listFinanceRecords(filters)
  });

  const mutation = useMutation({
    mutationFn: createFinanceRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance'] });
      setForm({ recordType: 'SALE', amount: 0, category: '', description: '' });
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">Finance & Sales</h2>
          <p className="text-sm text-slate-500">Track revenue streams, expenses, and ROI</p>
        </div>
        <div className="flex gap-2">
          <input
            type="date"
            value={filters.start}
            onChange={(e) => setFilters((prev) => ({ ...prev, start: e.target.value }))}
            className="rounded-lg border border-slate-200 px-3 py-2"
          />
          <input
            type="date"
            value={filters.end}
            onChange={(e) => setFilters((prev) => ({ ...prev, end: e.target.value }))}
            className="rounded-lg border border-slate-200 px-3 py-2"
          />
        </div>
      </div>

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-5">
        <select
          value={form.recordType}
          onChange={(e) => setForm((prev) => ({ ...prev, recordType: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        >
          <option value="SALE">Sale</option>
          <option value="EXPENSE">Expense</option>
          <option value="LOAN">Loan</option>
          <option value="SUBSIDY">Subsidy</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm((prev) => ({ ...prev, amount: Number(e.target.value) }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <button
          type="button"
          onClick={() => mutation.mutate({ ...form, farm: { id: 1 }, recordDate: dayjs().format('YYYY-MM-DD') })}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Log Transaction
        </button>
      </div>

      <DataTable
        data={records}
        keyExtractor={(item) => item.id}
        columns={[
          { key: 'date', title: 'Date', dataIndex: 'recordDate', render: (value) => formatDate(value) },
          { key: 'type', title: 'Type', dataIndex: 'recordType' },
          { key: 'category', title: 'Category', dataIndex: 'category' },
          {
            key: 'amount',
            title: 'Amount',
            dataIndex: 'amount',
            render: (value) => `₹${value ?? 0}`
          },
          { key: 'description', title: 'Description', dataIndex: 'description' }
        ]}
      />
    </div>
  );
};

export default FinancePage;

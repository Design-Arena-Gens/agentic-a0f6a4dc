import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listFeedStock, createFeedStock } from '../services/feedService';
import DataTable from '../components/tables/DataTable';

const FeedPage = () => {
  const [form, setForm] = useState({
    ingredientName: '',
    quantityKg: 0,
    remainingKg: 0,
    costPerKg: 0,
    farm: { id: 1 }
  });
  const queryClient = useQueryClient();

  const { data: stock = [] } = useQuery({
    queryKey: ['feedStock'],
    queryFn: () => listFeedStock(1)
  });

  const mutation = useMutation({
    mutationFn: createFeedStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedStock'] });
      setForm({ ingredientName: '', quantityKg: 0, remainingKg: 0, costPerKg: 0, farm: { id: 1 } });
    }
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-800">Feed & Nutrition</h2>
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-5">
        <input
          type="text"
          placeholder="Ingredient"
          value={form.ingredientName}
          onChange={(e) => setForm((prev) => ({ ...prev, ingredientName: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <input
          type="number"
          placeholder="Quantity (kg)"
          value={form.quantityKg}
          onChange={(e) => setForm((prev) => ({ ...prev, quantityKg: Number(e.target.value) }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <input
          type="number"
          placeholder="Remaining (kg)"
          value={form.remainingKg}
          onChange={(e) => setForm((prev) => ({ ...prev, remainingKg: Number(e.target.value) }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <input
          type="number"
          placeholder="Cost per kg"
          value={form.costPerKg}
          onChange={(e) => setForm((prev) => ({ ...prev, costPerKg: Number(e.target.value) }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <button
          type="button"
          onClick={() => mutation.mutate({ ...form, farm: { id: 1 } })}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Add Stock
        </button>
      </div>

      <DataTable
        data={stock}
        keyExtractor={(item) => item.id}
        columns={[
          { key: 'ingredientName', title: 'Ingredient', dataIndex: 'ingredientName' },
          { key: 'quantityKg', title: 'Quantity (kg)', dataIndex: 'quantityKg' },
          { key: 'remainingKg', title: 'Remaining (kg)', dataIndex: 'remainingKg' },
          {
            key: 'costPerKg',
            title: 'Cost/kg',
            dataIndex: 'costPerKg',
            render: (value) => `₹${value ?? 0}`
          },
          { key: 'expiryDate', title: 'Expiry', dataIndex: 'expiryDate' }
        ]}
      />
    </div>
  );
};

export default FeedPage;

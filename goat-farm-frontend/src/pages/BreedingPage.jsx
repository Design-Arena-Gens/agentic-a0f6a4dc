import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listBreedingRecords, createBreedingRecord } from '../services/breedingService';
import DataTable from '../components/tables/DataTable';
import { useState } from 'react';

const BreedingPage = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ doeId: '', buckId: '', breedingType: 'NATURAL', notes: '' });

  const { data: records = [] } = useQuery({
    queryKey: ['breeding'],
    queryFn: listBreedingRecords
  });

  const mutation = useMutation({
    mutationFn: createBreedingRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['breeding'] });
      setForm({ doeId: '', buckId: '', breedingType: 'NATURAL', notes: '' });
    }
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-800">Breeding Management</h2>
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
        <input
          type="number"
          placeholder="Doe ID"
          value={form.doeId}
          onChange={(e) => setForm((prev) => ({ ...prev, doeId: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <input
          type="number"
          placeholder="Buck ID"
          value={form.buckId}
          onChange={(e) => setForm((prev) => ({ ...prev, buckId: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <select
          value={form.breedingType}
          onChange={(e) => setForm((prev) => ({ ...prev, breedingType: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        >
          <option value="NATURAL">Natural</option>
          <option value="AI">Artificial Insemination</option>
          <option value="EMBRYO">Embryo Transfer</option>
        </select>
        <button
          type="button"
          onClick={() => mutation.mutate(form)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Log Breeding
        </button>
        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
          className="md:col-span-4 rounded-lg border border-slate-200 px-3 py-2"
        />
      </div>

      <DataTable
        data={records}
        keyExtractor={(item) => item.id}
        columns={[
          { key: 'id', title: 'ID', dataIndex: 'id' },
          { key: 'type', title: 'Type', dataIndex: 'breedingType' },
          { key: 'kidsBorn', title: 'Kids Born', dataIndex: 'kidsBorn' },
          { key: 'notes', title: 'Notes', dataIndex: 'notes' }
        ]}
      />
    </div>
  );
};

export default BreedingPage;

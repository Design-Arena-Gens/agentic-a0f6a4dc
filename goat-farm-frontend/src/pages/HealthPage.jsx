import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listHealthRecords, createHealthRecord } from '../services/healthService';
import DataTable from '../components/tables/DataTable';

const HealthPage = () => {
  const [selectedGoat, setSelectedGoat] = useState('');
  const [form, setForm] = useState({ diagnosis: '', treatment: '', medication: '', recordType: 'VACCINATION' });
  const queryClient = useQueryClient();

  const { data: records = [] } = useQuery({
    queryKey: ['health', selectedGoat],
    queryFn: () => listHealthRecords(selectedGoat || undefined)
  });

  const mutation = useMutation({
    mutationFn: (payload) => createHealthRecord(selectedGoat, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health', selectedGoat] });
      setForm({ diagnosis: '', treatment: '', medication: '', recordType: 'VACCINATION' });
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">Health & Veterinary</h2>
          <p className="text-sm text-slate-500">Vaccinations, treatments, vitals, and disease monitoring</p>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Filter by Goat ID"
            value={selectedGoat}
            onChange={(e) => setSelectedGoat(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2"
          />
        </div>
      </div>

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
        <select
          value={form.recordType}
          onChange={(e) => setForm((prev) => ({ ...prev, recordType: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        >
          <option value="VACCINATION">Vaccination</option>
          <option value="DEWORMING">Deworming</option>
          <option value="TREATMENT">Treatment</option>
        </select>
        <input
          type="text"
          placeholder="Diagnosis"
          value={form.diagnosis}
          onChange={(e) => setForm((prev) => ({ ...prev, diagnosis: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <input
          type="text"
          placeholder="Treatment"
          value={form.treatment}
          onChange={(e) => setForm((prev) => ({ ...prev, treatment: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <input
          type="text"
          placeholder="Medication"
          value={form.medication}
          onChange={(e) => setForm((prev) => ({ ...prev, medication: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <textarea
          placeholder="Notes"
          value={form.notes ?? ''}
          onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
          className="md:col-span-3 rounded-lg border border-slate-200 px-3 py-2"
        />
        <button
          type="button"
          onClick={() => mutation.mutate(form)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
          disabled={!selectedGoat}
        >
          Log Health Record
        </button>
      </div>

      <DataTable
        data={records}
        keyExtractor={(item) => item.id}
        columns={[
          { key: 'id', title: 'ID', dataIndex: 'id' },
          { key: 'type', title: 'Type', dataIndex: 'recordType' },
          { key: 'diagnosis', title: 'Diagnosis', dataIndex: 'diagnosis' },
          { key: 'treatment', title: 'Treatment', dataIndex: 'treatment' },
          { key: 'medication', title: 'Medication', dataIndex: 'medication' }
        ]}
      />
    </div>
  );
};

export default HealthPage;

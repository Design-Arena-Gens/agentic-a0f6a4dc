import { useQuery } from '@tanstack/react-query';
import { listGoats } from '../services/goatService';
import DataTable from '../components/tables/DataTable';
import Modal from '../components/modals/Modal';
import GoatForm from '../components/forms/GoatForm';
import { useState } from 'react';
import { formatDate } from '../utils/dateUtils';

const GoatsPage = () => {
  const [open, setOpen] = useState(false);
  const { data: goats = [], isLoading } = useQuery({
    queryKey: ['goats'],
    queryFn: () => listGoats(1)
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">Goat Registry</h2>
          <p className="text-sm text-slate-500">Track genetics, lineage, and growth</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm"
        >
          Register Goat
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading goats...</p>
      ) : (
        <DataTable
          columns={[
            { key: 'tagId', title: 'Tag ID', dataIndex: 'tagId' },
            { key: 'gender', title: 'Gender', dataIndex: 'gender' },
            {
              key: 'dob',
              title: 'DOB',
              dataIndex: 'dateOfBirth',
              render: (value) => formatDate(value)
            },
            {
              key: 'composition',
              title: 'Breed Composition',
              dataIndex: 'breedComposition',
              render: (value) =>
                value
                  ? Object.entries(value)
                      .map(([breed, percent]) => `${breed} ${percent}%`)
                      .join(', ')
                  : 'N/A'
            },
            { key: 'generation', title: 'Generation', dataIndex: 'generation' }
          ]}
          data={goats}
          keyExtractor={(item) => item.id}
        />
      )}

      <Modal title="Register Goat" open={open} onClose={() => setOpen(false)}>
        <GoatForm onSuccess={() => setOpen(false)} />
      </Modal>
    </div>
  );
};

export default GoatsPage;

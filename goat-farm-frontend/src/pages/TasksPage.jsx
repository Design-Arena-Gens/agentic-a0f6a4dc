import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listTasks, createTask, completeTask } from '../services/taskService';
import DataTable from '../components/tables/DataTable';
import dayjs from 'dayjs';
import { formatDate } from '../utils/dateUtils';

const TasksPage = () => {
  const [filters, setFilters] = useState({
    farmId: 1,
    start: dayjs().startOf('week').format('YYYY-MM-DD'),
    end: dayjs().endOf('week').format('YYYY-MM-DD')
  });
  const [task, setTask] = useState({ title: '', dueDate: dayjs().format('YYYY-MM-DD'), assignedTo: '' });
  const queryClient = useQueryClient();

  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => listTasks(filters)
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setTask({ title: '', dueDate: dayjs().format('YYYY-MM-DD'), assignedTo: '' });
    }
  });

  const completeMutation = useMutation({
    mutationFn: completeTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-800">Worker & Task Management</h2>
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-5">
        <input
          type="text"
          placeholder="Task title"
          value={task.title}
          onChange={(e) => setTask((prev) => ({ ...prev, title: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask((prev) => ({ ...prev, dueDate: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <input
          type="text"
          placeholder="Assigned to"
          value={task.assignedTo}
          onChange={(e) => setTask((prev) => ({ ...prev, assignedTo: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <button
          type="button"
          onClick={() => createMutation.mutate({ ...task, farm: { id: 1 }, status: 'PENDING' })}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Add Task
        </button>
      </div>

      <DataTable
        data={tasks}
        keyExtractor={(item) => item.id}
        columns={[
          { key: 'title', title: 'Task', dataIndex: 'title' },
          { key: 'assignedTo', title: 'Assigned To', dataIndex: 'assignedTo' },
          { key: 'dueDate', title: 'Due Date', dataIndex: 'dueDate', render: (value) => formatDate(value) },
          { key: 'status', title: 'Status', dataIndex: 'status' },
          {
            key: 'actions',
            title: 'Actions',
            dataIndex: 'id',
            render: (_, record) => (
              <button
                type="button"
                onClick={() => completeMutation.mutate(record.id)}
                className="rounded-lg border border-primary px-3 py-1 text-xs font-semibold text-primary"
              >
                Complete
              </button>
            )
          }
        ]}
      />
    </div>
  );
};

export default TasksPage;

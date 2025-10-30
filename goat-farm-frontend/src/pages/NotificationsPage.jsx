import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listNotifications, createNotification } from '../services/notificationService';
import DataTable from '../components/tables/DataTable';

const NotificationsPage = () => {
  const [form, setForm] = useState({ channel: 'INAPP', recipient: '', title: '', message: '' });
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: listNotifications
  });

  const mutation = useMutation({
    mutationFn: createNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      setForm({ channel: 'INAPP', recipient: '', title: '', message: '' });
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">Notifications & Alerts</h2>
          <p className="text-sm text-slate-500">Trigger SMS / Email / WhatsApp alerts for critical events</p>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          SMS · Email · WhatsApp Ready
        </span>
      </div>

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
        <select
          value={form.channel}
          onChange={(e) => setForm((prev) => ({ ...prev, channel: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        >
          <option value="SMS">SMS</option>
          <option value="EMAIL">Email</option>
          <option value="WHATSAPP">WhatsApp</option>
          <option value="INAPP">In-app</option>
        </select>
        <input
          type="text"
          placeholder="Recipient"
          value={form.recipient}
          onChange={(e) => setForm((prev) => ({ ...prev, recipient: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2"
        />
        <button
          type="button"
          onClick={() => mutation.mutate(form)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Send Alert
        </button>
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          className="md:col-span-4 rounded-lg border border-slate-200 px-3 py-2"
        />
      </div>

      <DataTable
        data={notifications}
        keyExtractor={(item) => item.id}
        columns={[
          { key: 'channel', title: 'Channel', dataIndex: 'channel' },
          { key: 'recipient', title: 'Recipient', dataIndex: 'recipient' },
          { key: 'title', title: 'Title', dataIndex: 'title' },
          { key: 'status', title: 'Status', dataIndex: 'status' }
        ]}
      />
    </div>
  );
};

export default NotificationsPage;

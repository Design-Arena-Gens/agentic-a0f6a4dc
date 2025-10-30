const StatCard = ({ title, value, trend }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-sm font-medium text-slate-500">{title}</p>
    <div className="mt-2 flex items-baseline gap-2">
      <span className="text-2xl font-semibold text-slate-800">{value}</span>
      {trend && (
        <span className={`text-xs font-semibold ${trend >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          {trend >= 0 ? '+' : ''}
          {trend.toFixed(1)}%
        </span>
      )}
    </div>
  </div>
);

export default StatCard;

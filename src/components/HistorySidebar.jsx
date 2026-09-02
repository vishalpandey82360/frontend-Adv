import { Clock3, ShoppingBag, Heart, Sparkles } from "lucide-react";

const historyItems = [
  {
    id: 1,
    title: "New drop",
    subtitle: "Spring essentials",
    icon: Sparkles,
    color: "amber",
  },
  {
    id: 2,
    title: "Bag picks",
    subtitle: "3 items saved",
    icon: ShoppingBag,
    color: "blue",
  },
  {
    id: 3,
    title: "Favorites",
    subtitle: "12 saved styles",
    icon: Heart,
    color: "rose",
  },
  {
    id: 4,
    title: "Recently viewed",
    subtitle: "2 mins ago",
    icon: Clock3,
    color: "green",
  },
];

export default function HistorySidebar() {
  return (
    <aside className="history-sidebar" aria-label="Shopping history panel">
      <div className="history-header">
        <p className="history-label">History</p>
        <button type="button" className="history-link">
          See all
        </button>
      </div>

      <div className="history-list">
        {historyItems.map(({ id, title, subtitle, icon: Icon, color }) => (
          <button key={id} type="button" className="history-item">
            <span className={`history-icon ${color}`}>
              <Icon size={16} />
            </span>
            <span className="history-text">
              <strong>{title}</strong>
              <small>{subtitle}</small>
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}

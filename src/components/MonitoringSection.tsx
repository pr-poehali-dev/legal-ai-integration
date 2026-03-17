import Icon from '@/components/ui/icon';

const sources = [
  { name: 'КонсультантПлюс', status: 'active', lastSync: '5 мин назад', count: '842 акта' },
  { name: 'Гарант', status: 'active', lastSync: '12 мин назад', count: '634 акта' },
  { name: 'kad.arbitr.ru', status: 'active', lastSync: '1 час назад', count: '1 240 решений' },
  { name: 'Верховный суд РФ', status: 'active', lastSync: '2 часа назад', count: '28 пленумов' },
  { name: 'Минстрой России', status: 'active', lastSync: '3 часа назад', count: '156 актов' },
  { name: 'Росреестр', status: 'sync', lastSync: 'Синхронизация...', count: '—' },
];

const timeline = [
  { time: '09:47', event: 'Обновлён ФЗ-214, 2 новые поправки', type: 'law' },
  { time: '08:23', event: 'Решение Пленума ВС №23 добавлено в базу', type: 'supreme' },
  { time: '07:11', event: 'Новый обзор судебной практики за I кв. 2026', type: 'practice' },
  { time: '03:45', event: 'Синхронизация kad.arbitr.ru: +47 решений', type: 'sync' },
  { time: '00:12', event: 'Ночная актуализация базы завершена', type: 'system' },
];

const typeColors: Record<string, string> = {
  law: 'text-yellow-400',
  supreme: 'text-red-400',
  practice: 'text-cyan',
  sync: 'text-green-400',
  system: 'text-muted-foreground',
};

const typeIcons: Record<string, string> = {
  law: 'BookOpen',
  supreme: 'Scale',
  practice: 'BarChart2',
  sync: 'RefreshCw',
  system: 'Settings',
};

export default function MonitoringSection() {
  return (
    <section id="monitoring" className="py-24 px-6 bg-secondary/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-72 h-72 rounded-full bg-green-400/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="tag-badge status-live inline-flex items-center gap-1.5 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot"></div>
            Круглосуточный мониторинг
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Мониторинг <span className="text-gold">24/7</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Автоматическое отслеживание изменений в законодательстве, судебной практике
            и решениях регуляторов по тематике строительных споров.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sources */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl font-semibold text-foreground">Источники данных</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 pulse-dot"></div>
                <span className="font-body text-xs text-green-400">Все активны</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {sources.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${s.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'} ${s.status === 'active' ? 'pulse-dot' : ''}`}></div>
                    <div>
                      <div className="font-body text-sm font-medium text-foreground">{s.name}</div>
                      <div className="font-body text-xs text-muted-foreground">{s.lastSync}</div>
                    </div>
                  </div>
                  <span className="font-body text-xs text-muted-foreground">{s.count}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: 'Источников', value: '12' },
                { label: 'Актов сегодня', value: '47' },
                { label: 'Алертов', value: '3' },
              ].map((item, i) => (
                <div key={i} className="glass-gold rounded-xl p-3 text-center">
                  <div className="font-display text-2xl font-bold text-gold">{item.value}</div>
                  <div className="font-body text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl font-semibold text-foreground">Лента обновлений</h3>
              <button className="font-body text-xs text-gold hover:underline">Настроить фильтры</button>
            </div>

            <div className="relative flex flex-col gap-0">
              <div className="absolute left-[30px] top-4 bottom-4 w-px bg-border" />
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-4 items-start py-3 group">
                  <div className={`w-7 h-7 rounded-lg glass border border-border flex items-center justify-center shrink-0 z-10 group-hover:border-gold/30 transition-colors`}>
                    <Icon name={typeIcons[item.type] as 'BookOpen'} size={12} className={typeColors[item.type]} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-foreground leading-snug">{item.event}</p>
                    <span className="font-body text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Alert settings */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="font-body text-xs text-muted-foreground mb-3">Уведомлять меня о:</div>
              <div className="flex flex-wrap gap-2">
                {['Решения Пленума ВС', 'Изменения ФЗ-214', 'Новые обзоры практики', 'Решения по застройщикам'].map(tag => (
                  <button key={tag} className="tag-badge status-new font-body text-xs cursor-pointer hover:opacity-80 transition-opacity">
                    {tag} ✓
                  </button>
                ))}
                <button className="tag-badge border border-border text-muted-foreground font-body text-xs hover:border-gold/40 transition-colors">
                  + Добавить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

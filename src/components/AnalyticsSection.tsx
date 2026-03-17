import { useState } from 'react';
import Icon from '@/components/ui/icon';

const updates = [
  {
    type: 'Пленум ВС',
    badge: 'status-new',
    title: 'Постановление № 23 «О применении норм ГК РФ о праве собственности»',
    date: '15 марта 2026',
    tags: ['Собственность', 'Строительство'],
    impact: 'Высокое влияние',
    impactColor: 'text-red-400',
  },
  {
    type: 'ФЗ Изменение',
    badge: 'status-live',
    title: 'Поправки в ФЗ-214 «Об участии в долевом строительстве» — эскроу-счета',
    date: '10 марта 2026',
    tags: ['ДДУ', 'Эскроу'],
    impact: 'Среднее влияние',
    impactColor: 'text-yellow-400',
  },
  {
    type: 'Обзор ВС',
    badge: 'status-ai',
    title: 'Обзор судебной практики по спорам с застройщиками — I квартал 2026',
    date: '5 марта 2026',
    tags: ['Застройщики', 'Судебная практика'],
    impact: 'Критично',
    impactColor: 'text-red-400',
  },
  {
    type: 'Приказ Минстрой',
    badge: 'status-new',
    title: 'Новые требования к проектной документации в части безопасности',
    date: '1 марта 2026',
    tags: ['Проектирование', 'Техрегулирование'],
    impact: 'Низкое влияние',
    impactColor: 'text-green-400',
  },
];

const filters = ['Все', 'Пленум ВС', 'ФЗ', 'ДДУ', 'Застройщики', 'Проектирование'];

export default function AnalyticsSection() {
  const [activeFilter, setActiveFilter] = useState('Все');
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="analytics" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="tag-badge status-live inline-flex items-center gap-1.5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot"></div>
              Обновляется в реальном времени
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
              Анализ <span className="text-gold">законодательства</span>
            </h2>
            <p className="font-body text-muted-foreground max-w-lg">
              Автоматическая синхронизация с базами правовых актов, мониторинг решений
              Пленума ВС и актуализация по тематике строительных споров.
            </p>
          </div>

          <div className="glass rounded-xl p-4 flex items-center gap-3 min-w-fit">
            <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center">
              <Icon name="Activity" size={18} className="text-green-400" />
            </div>
            <div>
              <div className="font-body text-sm font-semibold text-foreground">Последняя синхронизация</div>
              <div className="font-body text-xs text-muted-foreground">Сегодня, 09:47 · 12 новых актов</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-8 scrollbar-hide">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-body text-sm px-4 py-2 rounded-full transition-all ${
                activeFilter === f
                  ? 'gradient-gold text-[hsl(var(--navy))] font-semibold'
                  : 'glass text-muted-foreground hover:text-foreground hover:border-border/60'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Updates list */}
        <div className="flex flex-col gap-3">
          {updates.map((item, i) => (
            <div
              key={i}
              className={`glass rounded-xl overflow-hidden transition-all duration-300 ${expanded === i ? 'border-gold/30' : 'card-hover cursor-pointer'}`}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="Scale" size={16} className="text-[hsl(var(--navy))]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={`tag-badge ${item.badge}`}>{item.type}</span>
                    {item.tags.map(tag => (
                      <span key={tag} className="font-body text-xs text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="font-body text-sm font-medium text-foreground mb-1 leading-snug">{item.title}</p>
                  <div className="flex items-center gap-3">
                    <span className="font-body text-xs text-muted-foreground">{item.date}</span>
                    <span className={`font-body text-xs font-medium ${item.impactColor}`}>● {item.impact}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:border-gold/40 transition-all">
                    <Icon name="Download" size={14} className="text-muted-foreground" />
                  </button>
                  <button className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:border-gold/40 transition-all">
                    <Icon name="ChevronDown" size={14} className={`text-muted-foreground transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {expanded === i && (
                <div className="px-5 pb-5 pt-0 border-t border-border">
                  <div className="pt-4 grid md:grid-cols-3 gap-4">
                    <div className="glass-gold rounded-lg p-4">
                      <div className="font-body text-xs text-gold font-semibold uppercase tracking-wider mb-2">ИИ-анализ влияния</div>
                      <p className="font-body text-sm text-foreground/80">
                        Данный акт расширяет права собственников при спорах с застройщиками,
                        вводит новые основания для расторжения ДДУ.
                      </p>
                    </div>
                    <div className="glass rounded-lg p-4">
                      <div className="font-body text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Применимые статьи</div>
                      <div className="flex flex-wrap gap-1">
                        {['ст. 451 ГК', 'ст. 7 ФЗ-214', 'ст. 15.1 ФЗ-214'].map(s => (
                          <span key={s} className="font-body text-xs px-2 py-1 rounded-md bg-secondary text-foreground">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="glass rounded-lg p-4">
                      <div className="font-body text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Действия</div>
                      <div className="flex flex-col gap-2">
                        <button className="font-body text-xs text-gold hover:underline text-left">→ Обновить стратегию по ДДУ</button>
                        <button className="font-body text-xs text-cyan hover:underline text-left">→ Проверить шаблоны документов</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="font-body text-sm text-gold hover:underline flex items-center gap-1 mx-auto">
            Загрузить ещё 28 обновлений
            <Icon name="ChevronDown" size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import Icon from '@/components/ui/icon';

const recentDocs = [
  { title: 'Исковое о взыскании неустойки — ООО Альфа-строй', date: '17 марта 2026', status: 'Готово', type: 'Иск' },
  { title: 'Претензия к застройщику ЖК «Солнечный»', date: '15 марта 2026', status: 'В работе', type: 'Претензия' },
  { title: 'Анализ дела: банкротство ООО «МегаСтрой»', date: '12 марта 2026', status: 'Готово', type: 'Анализ' },
  { title: 'Стратегия по признанию права собственности', date: '10 марта 2026', status: 'Черновик', type: 'Стратегия' },
];

const statusColors: Record<string, string> = {
  'Готово': 'status-live',
  'В работе': 'status-ai',
  'Черновик': 'status-new',
};

const activity = [
  { action: 'Создан документ', detail: 'Исковое заявление № 47', time: 'Сегодня 09:32' },
  { action: 'ИИ-консультация', detail: 'Анализ ситуации по ДДУ', time: 'Вчера 18:14' },
  { action: 'Синхронизация', detail: 'Обновлено 5 актов', time: 'Вчера 08:00' },
  { action: 'Стратегия открыта', detail: 'Взыскание неустойки по ДДУ', time: '15 марта' },
];

export default function CabinetSection() {
  const [activeTab, setActiveTab] = useState<'docs' | 'activity' | 'settings'>('docs');

  return (
    <section id="cabinet" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile card */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center glow-gold">
                  <span className="font-display text-3xl font-bold text-[hsl(var(--navy))]">АИ</span>
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-green-400 border-2 border-background pulse-dot" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1">Дроздов Денис</h3>
              <p className="font-body text-xs text-muted-foreground mb-3">Юрист · Специалист по строительным спорам</p>
              <span className="tag-badge status-new">Pro-доступ</span>

              <div className="mt-5 pt-5 border-t border-border grid grid-cols-3 gap-3">
                {[
                  { label: 'Документов', value: '47' },
                  { label: 'Дел', value: '12' },
                  { label: 'Побед', value: '9' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-display text-xl font-bold text-gold">{s.value}</div>
                    <div className="font-body text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="glass rounded-2xl p-5">
              <h4 className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Быстрые действия</h4>
              <div className="flex flex-col gap-2">
                {[
                  { icon: 'Plus', label: 'Новый документ', color: 'text-gold' },
                  { icon: 'MessageSquare', label: 'Спросить ИИ', color: 'text-cyan' },
                  { icon: 'Target', label: 'Выбрать стратегию', color: 'text-gold' },
                  { icon: 'Bell', label: 'Настроить алерты', color: 'text-cyan' },
                ].map((a, i) => (
                  <button key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-all text-left group">
                    <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:border-gold/30 transition-colors">
                      <Icon name={a.icon as 'Plus'} size={14} className={a.color} />
                    </div>
                    <span className="font-body text-sm text-foreground">{a.label}</span>
                    <Icon name="ChevronRight" size={14} className="text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main area */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Tabs */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="flex border-b border-border">
                {([
                  { id: 'docs', label: 'Мои документы', icon: 'FileText' },
                  { id: 'activity', label: 'Активность', icon: 'Activity' },
                  { id: 'settings', label: 'Настройки', icon: 'Settings' },
                ] as const).map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 font-body text-sm font-medium transition-all ${activeTab === tab.id ? 'text-gold border-b-2 border-gold bg-gold/5' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Icon name={tab.icon as 'FileText'} size={15} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-5">
                {activeTab === 'docs' && (
                  <div className="flex flex-col gap-3">
                    {recentDocs.map((doc, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-all group cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                          <Icon name="FileText" size={16} className="text-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-body text-sm font-medium text-foreground truncate">{doc.title}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-body text-xs text-muted-foreground">{doc.date}</span>
                            <span className="font-body text-xs text-muted-foreground">·</span>
                            <span className="font-body text-xs text-muted-foreground">{doc.type}</span>
                          </div>
                        </div>
                        <span className={`tag-badge ${statusColors[doc.status]} shrink-0`}>{doc.status}</span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-7 h-7 glass rounded-md flex items-center justify-center hover:border-gold/40">
                            <Icon name="Pencil" size={11} className="text-muted-foreground" />
                          </button>
                          <button className="w-7 h-7 glass rounded-md flex items-center justify-center hover:border-red-400/40">
                            <Icon name="Trash2" size={11} className="text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div className="flex flex-col gap-3">
                    {activity.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-all">
                        <div className="w-8 h-8 rounded-lg glass flex items-center justify-center shrink-0 mt-0.5">
                          <Icon name="Clock" size={13} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="font-body text-sm font-medium text-foreground">{item.action}</div>
                          <div className="font-body text-xs text-muted-foreground">{item.detail}</div>
                        </div>
                        <span className="font-body text-xs text-muted-foreground shrink-0">{item.time}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="flex flex-col gap-4">
                    {[
                      { label: 'Email-уведомления', desc: 'Получать обновления на email', enabled: true },
                      { label: 'Telegram-алерты', desc: 'Мгновенные уведомления в Telegram', enabled: true },
                      { label: 'Ночной мониторинг', desc: 'Синхронизация в ночное время', enabled: false },
                      { label: 'Авто-генерация документов', desc: 'ИИ предлагает шаблоны автоматически', enabled: true },
                    ].map((setting, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-all">
                        <div>
                          <div className="font-body text-sm font-medium text-foreground">{setting.label}</div>
                          <div className="font-body text-xs text-muted-foreground">{setting.desc}</div>
                        </div>
                        <div className={`relative w-11 h-6 rounded-full transition-all cursor-pointer ${setting.enabled ? 'bg-gold/20 border border-gold/30' : 'bg-secondary border border-border'}`}>
                          <div className={`absolute top-0.5 w-5 h-5 rounded-full transition-all ${setting.enabled ? 'left-5 bg-gold' : 'left-0.5 bg-muted-foreground/50'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Storage */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-body text-sm font-semibold text-foreground">Использование хранилища</h4>
                <span className="font-body text-xs text-muted-foreground">2.4 ГБ из 10 ГБ</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full gradient-gold rounded-full" style={{ width: '24%' }} />
              </div>
              <p className="font-body text-xs text-muted-foreground mt-2">47 документов · 12 стратегий · 156 МБ медиа</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
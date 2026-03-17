import { useState } from 'react';
import Icon from '@/components/ui/icon';

const integrations = [
  { id: 'telegram', name: 'Telegram', desc: 'Уведомления и боты', icon: '✈️', color: 'bg-blue-500/10 border-blue-500/20', connected: true },
  { id: 'whatsapp', name: 'WhatsApp', desc: 'Деловая переписка', icon: '💬', color: 'bg-green-500/10 border-green-500/20', connected: false },
  { id: 'vk', name: 'ВКонтакте', desc: 'Профессиональная сеть', icon: '🔵', color: 'bg-indigo-500/10 border-indigo-500/20', connected: false },
  { id: 'email', name: 'Email / SMTP', desc: 'Рассылки и алерты', icon: '📧', color: 'bg-yellow-500/10 border-yellow-500/20', connected: true },
  { id: 'gpt', name: 'OpenAI GPT-4', desc: 'ИИ-анализ документов', icon: '🤖', color: 'bg-cyan-500/10 border-cyan-500/20', connected: true },
  { id: 'consultant', name: 'КонсультантПлюс', desc: 'База правовых актов', icon: '⚖️', color: 'bg-red-500/10 border-red-500/20', connected: true },
  { id: 'garant', name: 'Гарант', desc: 'Правовая база', icon: '🔴', color: 'bg-orange-500/10 border-orange-500/20', connected: false },
  { id: 'kad', name: 'КАД Арбитр', desc: 'Картотека арбитражных дел', icon: '🏛️', color: 'bg-purple-500/10 border-purple-500/20', connected: true },
  { id: 'egrul', name: 'ЕГРЮЛ / Росреестр', desc: 'Проверка контрагентов', icon: '📋', color: 'bg-teal-500/10 border-teal-500/20', connected: false },
];

export default function IntegrationsSection() {
  const [connections, setConnections] = useState<Record<string, boolean>>(
    Object.fromEntries(integrations.map(i => [i.id, i.connected]))
  );

  const toggle = (id: string) => {
    setConnections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const connectedCount = Object.values(connections).filter(Boolean).length;

  return (
    <section id="integrations" className="py-24 px-6 bg-secondary/20 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-cyan/5 blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="tag-badge status-ai inline-flex items-center gap-1.5 mb-4">
            <Icon name="Plug" size={11} />
            Центр интеграций
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Мессенджеры <span className="text-cyan">&amp; сервисы</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Подключите социальные сети, мессенджеры и внешние юридические базы для
            получения уведомлений и автоматического сбора данных.
          </p>
        </div>

        {/* Stats bar */}
        <div className="glass rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-cyan flex items-center justify-center glow-cyan">
              <Icon name="Zap" size={22} className="text-[hsl(var(--navy))]" />
            </div>
            <div>
              <div className="font-body text-sm font-semibold text-foreground">{connectedCount} из {integrations.length} интеграций активны</div>
              <div className="font-body text-xs text-muted-foreground">Данные синхронизируются в реальном времени</div>
            </div>
          </div>
          <div className="h-2 flex-1 max-w-xs rounded-full bg-secondary overflow-hidden hidden sm:block">
            <div
              className="h-full gradient-cyan rounded-full transition-all duration-500"
              style={{ width: `${(connectedCount / integrations.length) * 100}%` }}
            />
          </div>
          <button className="gradient-gold text-[hsl(var(--navy))] font-body font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shrink-0">
            <Icon name="Plus" size={15} />
            Добавить интеграцию
          </button>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map(item => (
            <div key={item.id} className={`glass rounded-xl p-5 card-hover border ${connections[item.id] ? 'border-cyan/20' : 'border-border'}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-2xl ${item.color}`}>
                  {item.icon}
                </div>
                <div className="flex items-center gap-2">
                  {connections[item.id] && (
                    <span className="tag-badge status-live font-body text-xs">Активно</span>
                  )}
                  <button
                    onClick={() => toggle(item.id)}
                    className={`relative w-11 h-6 rounded-full transition-all ${connections[item.id] ? 'bg-cyan/20 border border-cyan/30' : 'bg-secondary border border-border'}`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full transition-all ${connections[item.id] ? 'left-5 bg-cyan' : 'left-0.5 bg-muted-foreground/50'}`} />
                  </button>
                </div>
              </div>

              <div className="font-body text-sm font-bold text-foreground mb-1">{item.name}</div>
              <div className="font-body text-xs text-muted-foreground mb-4">{item.desc}</div>

              <button className={`w-full font-body text-xs font-medium py-2 rounded-lg transition-all ${connections[item.id] ? 'glass text-muted-foreground hover:text-foreground hover:border-border/60' : 'gradient-gold text-[hsl(var(--navy))] font-semibold hover:opacity-90'}`}>
                {connections[item.id] ? 'Настроить' : 'Подключить'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

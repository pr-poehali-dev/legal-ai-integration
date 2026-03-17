import { useState } from 'react';
import Icon from '@/components/ui/icon';

const suggestions = [
  'Какие основания для расторжения ДДУ?',
  'Как взыскать неустойку с застройщика?',
  'Признание права собственности на объект незавершённого строительства',
  'Права дольщиков при банкротстве застройщика',
];

const initialMessages = [
  {
    role: 'ai',
    text: 'Здравствуйте! Я юридический ИИ-ассистент LexPro, специализирующийся на защите прав собственников в строительных спорах. Готов помочь с анализом ситуации, подбором норм права и стратегией защиты. Опишите вашу ситуацию.',
  },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const send = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          text: `Анализирую ваш запрос по теме "${msg.substring(0, 40)}...".\n\nНа основе актуальной судебной практики и норм ФЗ-214, ГК РФ (ст. 451, 723, 737) могу предложить следующую стратегию защиты. Для получения полного анализа ситуации и автоматической генерации документов подключите полный доступ к платформе.`,
        },
      ]);
      setTyping(false);
    }, 1800);
  };

  return (
    <section id="ai" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-cyan/5 blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="tag-badge status-ai inline-flex items-center gap-1.5 mb-4">
              <Icon name="Bot" size={11} />
              GPT-4 + Юридическая база
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              ИИ-помощник <br /><span className="text-cyan">юриста</span>
            </h2>
            <p className="font-body text-muted-foreground mb-8 leading-relaxed">
              Обученный на актуальных нормах права, решениях Пленума ВС и судебной практике
              по строительным спорам. Анализирует ситуацию, предлагает стратегию,
              генерирует документы.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { icon: 'Search', label: 'Анализ правовой ситуации', desc: 'Оценка шансов, рисков и перспектив' },
                { icon: 'FileText', label: 'Генерация документов', desc: 'Иски, претензии, жалобы по шаблонам' },
                { icon: 'Scale', label: 'Подбор норм права', desc: 'Актуальные статьи и судебные прецеденты' },
              ].map((item, i) => (
                <div key={i} className="glass rounded-xl p-4 flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center shrink-0">
                    <Icon name={item.icon as 'Search'} size={16} className="text-cyan" />
                  </div>
                  <div>
                    <div className="font-body text-sm font-semibold text-foreground">{item.label}</div>
                    <div className="font-body text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat window */}
          <div className="glass rounded-2xl overflow-hidden border border-border">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gradient-cyan flex items-center justify-center glow-cyan">
                <Icon name="Bot" size={18} className="text-[hsl(var(--navy))]" />
              </div>
              <div>
                <div className="font-body text-sm font-semibold text-foreground">LexAI Ассистент</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot"></div>
                  <span className="font-body text-xs text-muted-foreground">Онлайн · Специализация: строительные споры</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 h-72 overflow-y-auto flex flex-col gap-3 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 rounded-lg gradient-cyan shrink-0 flex items-center justify-center mt-0.5">
                      <Icon name="Bot" size={12} className="text-[hsl(var(--navy))]" />
                    </div>
                  )}
                  <div
                    className={`rounded-xl px-3 py-2.5 max-w-[80%] font-body text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'gradient-gold text-[hsl(var(--navy))] font-medium'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-2 justify-start">
                  <div className="w-7 h-7 rounded-lg gradient-cyan shrink-0 flex items-center justify-center">
                    <Icon name="Bot" size={12} className="text-[hsl(var(--navy))]" />
                  </div>
                  <div className="bg-secondary rounded-xl px-4 py-3 flex gap-1 items-center">
                    {[0, 0.2, 0.4].map((d, j) => (
                      <div
                        key={j}
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: `${d}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick suggestions */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => send(s)}
                  className="shrink-0 font-body text-xs text-muted-foreground border border-border rounded-full px-3 py-1.5 hover:border-cyan/40 hover:text-cyan transition-all"
                >
                  {s.substring(0, 30)}...
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border flex gap-2">
              <input
                type="text"
                placeholder="Опишите вашу юридическую ситуацию..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                className="flex-1 bg-secondary rounded-xl px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold/40"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || typing}
                className="gradient-gold w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-90 transition-all disabled:opacity-40 shrink-0"
              >
                <Icon name="Send" size={16} className="text-[hsl(var(--navy))]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

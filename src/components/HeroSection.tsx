import Icon from '@/components/ui/icon';

const stats = [
  { value: '2 400+', label: 'Судебных решений' },
  { value: '180+', label: 'Шаблонов документов' },
  { value: '98%', label: 'Актуальность базы' },
  { value: '24/7', label: 'Мониторинг' },
];

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero grid-pattern">
      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/6 w-96 h-96 rounded-full bg-cyan/5 blur-[100px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full bg-gold/5 blur-[100px] pointer-events-none" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 mb-8 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-green-400 pulse-dot"></div>
          <span className="tag-badge text-gold">ИИ-Платформа для юристов · Строительные споры</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-[0.95] animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Право{' '}
          <span className="relative">
            <span className="text-gold">собственника</span>
            <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none">
              <path d="M0 3 Q75 0 150 3 Q225 6 300 3" stroke="hsl(42 85% 62% / 0.5)" strokeWidth="2" fill="none" />
            </svg>
          </span>
          <br />
          <span className="text-foreground/60">под защитой</span>{' '}
          <span className="text-cyan">ИИ</span>
        </h1>

        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Профессиональная платформа для юристов в сфере защиты прав собственников.
          Анализ законодательства, автоматизация исковых заявлений, мониторинг решений
          Пленума Верховного суда в режиме реального времени.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => scrollTo('ai')}
            className="gradient-gold text-[hsl(var(--navy))] font-body font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-all hover:scale-105 glow-gold flex items-center gap-2 justify-center"
          >
            <Icon name="MessageSquare" size={18} />
            Спросить ИИ-помощника
          </button>
          <button
            onClick={() => scrollTo('library')}
            className="glass border border-border text-foreground font-body font-medium px-8 py-4 rounded-xl hover:border-gold/40 transition-all flex items-center gap-2 justify-center"
          >
            <Icon name="FileText" size={18} />
            Открыть библиотеку
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {stats.map((stat, i) => (
            <div key={i} className="glass rounded-xl px-4 py-5 card-hover">
              <div className="font-display text-3xl font-bold text-gold mb-1">{stat.value}</div>
              <div className="font-body text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-xs text-muted-foreground font-body">прокрути вниз</span>
          <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}

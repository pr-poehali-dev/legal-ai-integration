import { useState } from 'react';
import Icon from '@/components/ui/icon';

const strategies = [
  {
    id: 1,
    title: 'Взыскание неустойки по ДДУ',
    complexity: 'Средняя',
    successRate: 87,
    steps: 5,
    time: '3-6 мес.',
    tags: ['ДДУ', 'Неустойка', 'ФЗ-214'],
    color: 'gold',
    desc: 'Стратегия взыскания неустойки за нарушение сроков передачи объекта долевого строительства.',
  },
  {
    id: 2,
    title: 'Расторжение ДДУ и возврат денег',
    complexity: 'Высокая',
    successRate: 74,
    steps: 7,
    time: '6-12 мес.',
    tags: ['ДДУ', 'Расторжение', 'Эскроу'],
    color: 'cyan',
    desc: 'Полная стратегия расторжения договора долевого участия с возвратом вложенных средств.',
  },
  {
    id: 3,
    title: 'Устранение строительных недостатков',
    complexity: 'Средняя',
    successRate: 91,
    steps: 4,
    time: '2-4 мес.',
    tags: ['Недостатки', 'Гарантия', 'Подряд'],
    color: 'gold',
    desc: 'Требование устранения дефектов строительства в гарантийный период через суд.',
  },
  {
    id: 4,
    title: 'Защита при банкротстве застройщика',
    complexity: 'Очень высокая',
    successRate: 62,
    steps: 9,
    time: '12-24 мес.',
    tags: ['Банкротство', 'Реестр требований'],
    color: 'cyan',
    desc: 'Включение в реестр требований кредиторов и получение компенсации при банкротстве.',
  },
  {
    id: 5,
    title: 'Споры по договору подряда',
    complexity: 'Средняя',
    successRate: 83,
    steps: 5,
    time: '3-5 мес.',
    tags: ['Подряд', 'Разработка', 'Проект'],
    color: 'gold',
    desc: 'Защита прав заказчика при нарушении условий договора подряда на строительство.',
  },
  {
    id: 6,
    title: 'Признание права собственности',
    complexity: 'Высокая',
    successRate: 79,
    steps: 6,
    time: '4-8 мес.',
    tags: ['Собственность', 'Регистрация'],
    color: 'cyan',
    desc: 'Судебное признание права собственности на объект недвижимости в спорных ситуациях.',
  },
];

const complexityColor: Record<string, string> = {
  'Средняя': 'text-yellow-400',
  'Высокая': 'text-orange-400',
  'Очень высокая': 'text-red-400',
};

export default function StrategiesSection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="strategies" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="tag-badge status-new inline-flex items-center gap-1.5 mb-4">
            <Icon name="Target" size={11} />
            Готовые стратегии
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Судебные <span className="text-gold">стратегии</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Пошаговые стратегии для типичных строительных споров.
            Автоматически генерирует документы под каждый шаг.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {strategies.map(s => (
            <div
              key={s.id}
              className={`glass rounded-xl p-5 card-hover cursor-pointer transition-all ${selected === s.id ? 'border-gold/40' : ''}`}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color === 'gold' ? 'bg-gold/10 border border-gold/20' : 'bg-cyan/10 border border-cyan/20'}`}>
                  <Icon name="Target" size={18} className={s.color === 'gold' ? 'text-gold' : 'text-cyan'} />
                </div>
                <div className="text-right">
                  <div className={`font-body text-xs font-semibold ${complexityColor[s.complexity]}`}>{s.complexity}</div>
                  <div className="font-body text-xs text-muted-foreground mt-0.5">{s.time}</div>
                </div>
              </div>

              <h3 className="font-body text-sm font-bold text-foreground leading-snug mb-2">{s.title}</h3>
              <p className="font-body text-xs text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>

              {/* Success rate */}
              <div className="mb-4">
                <div className="flex justify-between mb-1.5">
                  <span className="font-body text-xs text-muted-foreground">Успешность</span>
                  <span className={`font-body text-xs font-bold ${s.color === 'gold' ? 'text-gold' : 'text-cyan'}`}>{s.successRate}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${s.color === 'gold' ? 'gradient-gold' : 'gradient-cyan'}`}
                    style={{ width: `${s.successRate}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {s.tags.map(tag => (
                  <span key={tag} className="font-body text-xs text-muted-foreground border border-border px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>

              <button className={`w-full font-body text-xs font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                selected === s.id
                  ? 'gradient-gold text-[hsl(var(--navy))]'
                  : 'glass text-muted-foreground hover:text-foreground hover:border-gold/30'
              }`}>
                <Icon name="Play" size={12} />
                {selected === s.id ? 'Открыта · Начать работу' : `Открыть стратегию · ${s.steps} шагов`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

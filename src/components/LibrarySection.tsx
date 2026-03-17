import { useState } from 'react';
import Icon from '@/components/ui/icon';

const documents = [
  { icon: 'FileText', title: 'Исковое о взыскании неустойки по ДДУ', category: 'Иски', uses: 342, updated: 'Сегодня', hot: true },
  { icon: 'FileText', title: 'Претензия к застройщику о нарушении сроков сдачи', category: 'Претензии', uses: 218, updated: '2 дня назад', hot: true },
  { icon: 'FileText', title: 'Иск о признании права собственности на объект', category: 'Иски', uses: 195, updated: '3 дня назад', hot: false },
  { icon: 'FileText', title: 'Заявление об устранении строительных недостатков', category: 'Заявления', uses: 167, updated: '1 нед. назад', hot: false },
  { icon: 'FileText', title: 'Договор подряда с защитными оговорками', category: 'Договоры', uses: 143, updated: '1 нед. назад', hot: false },
  { icon: 'FileText', title: 'Апелляционная жалоба по спорам о долевом строительстве', category: 'Жалобы', uses: 128, updated: '2 нед. назад', hot: false },
];

const categories = ['Все', 'Иски', 'Претензии', 'Договоры', 'Жалобы', 'Заявления'];

export default function LibrarySection() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [search, setSearch] = useState('');

  const filtered = documents.filter(d => {
    const matchCat = activeCategory === 'Все' || d.category === activeCategory;
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="library" className="py-24 px-6 bg-secondary/20 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cyan/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="tag-badge status-ai inline-flex items-center gap-1.5 mb-4">
            <Icon name="Library" size={11} />
            Редактируемые документы
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Библиотека <span className="text-cyan">документов</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Готовые шаблоны исковых заявлений, претензий и договоров.
            Редактируй прямо в платформе, скачивай в нужном формате.
          </p>
        </div>

        {/* Search + Upload */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1 relative">
            <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск шаблонов и документов..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full glass border border-border rounded-xl pl-11 pr-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/40 bg-transparent"
            />
          </div>
          <button className="gradient-gold text-[hsl(var(--navy))] font-body font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shrink-0">
            <Icon name="Upload" size={16} />
            Загрузить документ
          </button>
          <button className="glass border border-border text-foreground font-body font-medium text-sm px-6 py-3 rounded-xl hover:border-gold/40 transition-all flex items-center gap-2 shrink-0">
            <Icon name="Plus" size={16} />
            Создать новый
          </button>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`font-body text-sm px-4 py-1.5 rounded-full transition-all ${
                activeCategory === c
                  ? 'bg-cyan/20 text-cyan border border-cyan/30'
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Documents grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((doc, i) => (
            <div key={i} className="glass rounded-xl p-5 card-hover group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center">
                  <Icon name="FileText" size={18} className="text-cyan" />
                </div>
                <div className="flex items-center gap-2">
                  {doc.hot && (
                    <span className="tag-badge status-new">Топ</span>
                  )}
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 glass rounded-md flex items-center justify-center hover:border-gold/40">
                    <Icon name="Bookmark" size={12} className="text-muted-foreground" />
                  </button>
                </div>
              </div>

              <h3 className="font-body text-sm font-semibold text-foreground leading-snug mb-3">{doc.title}</h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-body text-xs text-muted-foreground">{doc.category}</span>
                  <span className="font-body text-xs text-muted-foreground flex items-center gap-1">
                    <Icon name="Users" size={10} />
                    {doc.uses}
                  </span>
                </div>
                <span className="font-body text-xs text-muted-foreground">{doc.updated}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex gap-2">
                <button className="flex-1 font-body text-xs font-semibold text-[hsl(var(--navy))] gradient-gold py-2 rounded-lg hover:opacity-90 transition-opacity text-center">
                  Открыть
                </button>
                <button className="w-9 glass rounded-lg flex items-center justify-center hover:border-cyan/40 transition-all">
                  <Icon name="Download" size={14} className="text-muted-foreground" />
                </button>
                <button className="w-9 glass rounded-lg flex items-center justify-center hover:border-gold/40 transition-all">
                  <Icon name="Copy" size={14} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="font-body text-xs text-center text-muted-foreground mt-6">
          Показано {filtered.length} из 180+ шаблонов ·{' '}
          <button className="text-gold hover:underline">Показать все</button>
        </p>
      </div>
    </section>
  );
}

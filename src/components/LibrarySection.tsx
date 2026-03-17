import { useState } from 'react';
import Icon from '@/components/ui/icon';
import DocumentEditor from '@/components/DocumentEditor';

const documents = [
  {
    icon: 'FileText',
    title: 'Исковое о взыскании неустойки по ДДУ',
    category: 'Иски',
    uses: 342,
    updated: 'Сегодня',
    hot: true,
    content: `<p style="text-align:center;font-size:14pt;font-weight:bold;">В Арбитражный суд г. Москвы</p>
<p style="text-align:center;">Истец: ФИО, адрес</p>
<p style="text-align:center;">Ответчик: ООО «Застройщик»</p>
<br/>
<p style="text-align:center;font-size:14pt;font-weight:bold;">ИСКОВОЕ ЗАЯВЛЕНИЕ</p>
<p style="text-align:center;">о взыскании неустойки по договору долевого участия</p>
<br/>
<p>Между мной (далее — Истец) и ООО «Застройщик» (далее — Ответчик) был заключён договор участия в долевом строительстве № ___ от «__» _______ 20__ г.</p>
<br/>
<p>В соответствии с условиями Договора, Ответчик обязался передать Истцу объект долевого строительства не позднее «__» _______ 20__ г., однако обязательство не исполнил.</p>
<br/>
<p>Согласно ч. 2 ст. 6 ФЗ-214, при нарушении предусмотренного договором срока передачи участнику объекта застройщик уплачивает участнику неустойку (пени) в размере 1/150 ставки рефинансирования ЦБ РФ за каждый день просрочки.</p>
<br/>
<p><strong>Расчёт неустойки:</strong></p>
<p>Цена договора: ________ руб.</p>
<p>Период просрочки: с «__» _______ 20__ по «__» _______ 20__ — ___ дней.</p>
<p>Размер неустойки: __________ руб.</p>
<br/>
<p><strong>ПРОШУ:</strong></p>
<p>1. Взыскать с Ответчика неустойку в размере _________ руб.;</p>
<p>2. Взыскать расходы по уплате государственной пошлины.</p>
<br/>
<p>Приложения: 1. Копия ДДУ; 2. Расчёт неустойки; 3. Квитанция госпошлины.</p>
<br/>
<p>«__» _________ 20__ г. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Подпись: _______________</p>`
  },
  {
    icon: 'FileText',
    title: 'Претензия к застройщику о нарушении сроков сдачи',
    category: 'Претензии',
    uses: 218,
    updated: '2 дня назад',
    hot: true,
    content: `<p style="text-align:right;">ООО «Застройщик»</p>
<p style="text-align:right;">Адрес: ___________________</p>
<p style="text-align:right;">От: ФИО</p>
<p style="text-align:right;">Адрес: ___________________</p>
<p style="text-align:right;">Тел.: ____________________</p>
<br/>
<p style="text-align:center;font-size:14pt;font-weight:bold;">ПРЕТЕНЗИЯ</p>
<p style="text-align:center;">о нарушении срока передачи объекта долевого строительства</p>
<br/>
<p>Между мной и ООО «Застройщик» заключён договор участия в долевом строительстве № ___ от «__» _______ 20__ г. Срок передачи объекта — «__» _______ 20__ г.</p>
<br/>
<p>По состоянию на дату направления настоящей претензии объект мне не передан, в связи с чем прошу:</p>
<br/>
<p>1. В течение 10 дней с момента получения настоящей претензии передать объект по акту приёма-передачи;</p>
<p>2. Выплатить неустойку за период просрочки в размере _______ руб.;</p>
<p>3. Предоставить письменный ответ с указанием нового срока передачи.</p>
<br/>
<p>В случае неудовлетворения требований в добровольном порядке буду вынужден обратиться в суд с исковым заявлением, а также потребовать компенсации морального вреда и штрафа в размере 50% от взысканной суммы (ст. 13 Закона о защите прав потребителей).</p>
<br/>
<p>«__» _________ 20__ г. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Подпись: _______________</p>`
  },
  {
    icon: 'FileText',
    title: 'Иск о признании права собственности на объект',
    category: 'Иски',
    uses: 195,
    updated: '3 дня назад',
    hot: false,
    content: `<p style="text-align:center;font-size:14pt;font-weight:bold;">В _______________ суд</p>
<p style="text-align:center;">Истец: ФИО, адрес</p>
<p style="text-align:center;">Ответчик: ООО «Застройщик»</p>
<br/>
<p style="text-align:center;font-size:14pt;font-weight:bold;">ИСКОВОЕ ЗАЯВЛЕНИЕ</p>
<p style="text-align:center;">о признании права собственности на объект недвижимости</p>
<br/>
<p>Между Истцом и Ответчиком заключён договор № ___ от «__» _______ 20__ г. Обязательства по оплате исполнены в полном объёме.</p>
<br/>
<p>Ответчик уклоняется от государственной регистрации перехода права собственности, в связи с чем Истец вынужден обратиться в суд.</p>
<br/>
<p><strong>ПРОШУ:</strong></p>
<p>1. Признать за Истцом право собственности на объект: _____________________;</p>
<p>2. Обязать Росреестр произвести государственную регистрацию права собственности;</p>
<p>3. Взыскать расходы по уплате государственной пошлины.</p>
<br/>
<p>«__» _________ 20__ г. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Подпись: _______________</p>`
  },
  {
    icon: 'FileText',
    title: 'Заявление об устранении строительных недостатков',
    category: 'Заявления',
    uses: 167,
    updated: '1 нед. назад',
    hot: false,
    content: `<p style="text-align:right;">Директору ООО «Застройщик»</p>
<p style="text-align:right;">От: ФИО</p>
<br/>
<p style="text-align:center;font-size:14pt;font-weight:bold;">ЗАЯВЛЕНИЕ</p>
<p style="text-align:center;">об устранении строительных недостатков в гарантийный период</p>
<br/>
<p>Я являюсь собственником квартиры № ___, расположенной по адресу: _____________________, переданной мне по акту приёма-передачи «__» _______ 20__ г.</p>
<br/>
<p>В ходе эксплуатации квартиры выявлены следующие строительные недостатки:</p>
<p>1. _______________________________________________;</p>
<p>2. _______________________________________________;</p>
<p>3. _______________________________________________.</p>
<br/>
<p>На основании ст. 7 ФЗ-214 и ст. 723 ГК РФ прошу устранить указанные недостатки в срок не позднее ___ дней с момента получения настоящего заявления.</p>
<br/>
<p>При невыполнении требований буду вынужден обратиться в суд с требованием об устранении недостатков и взыскании неустойки.</p>
<br/>
<p>«__» _________ 20__ г. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Подпись: _______________</p>`
  },
  {
    icon: 'FileText',
    title: 'Договор подряда с защитными оговорками',
    category: 'Договоры',
    uses: 143,
    updated: '1 нед. назад',
    hot: false,
    content: `<p style="text-align:center;font-size:14pt;font-weight:bold;">ДОГОВОР ПОДРЯДА № ___</p>
<br/>
<p>г. Москва &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; «__» _________ 20__ г.</p>
<br/>
<p><strong>Заказчик:</strong> ФИО/наименование, именуемый в дальнейшем «Заказчик»,</p>
<p><strong>Подрядчик:</strong> ООО «___», именуемое в дальнейшем «Подрядчик»,</p>
<p>заключили настоящий договор о нижеследующем:</p>
<br/>
<p><strong>1. ПРЕДМЕТ ДОГОВОРА</strong></p>
<p>1.1. Подрядчик обязуется выполнить строительные работы: ___________________.</p>
<p>1.2. Срок выполнения работ: с «__» по «__» _______ 20__ г.</p>
<br/>
<p><strong>2. СТОИМОСТЬ И ПОРЯДОК ОПЛАТЫ</strong></p>
<p>2.1. Цена договора: _________ руб.</p>
<p>2.2. Авансирование: не более 30% от цены договора.</p>
<br/>
<p><strong>3. ГАРАНТИИ И ОТВЕТСТВЕННОСТЬ</strong></p>
<p>3.1. Гарантийный срок на выполненные работы: 5 лет.</p>
<p>3.2. Неустойка за нарушение сроков: 0,1% от цены договора за каждый день просрочки.</p>
<p>3.3. Заказчик вправе отказаться от договора при нарушении сроков более чем на 30 дней.</p>
<br/>
<p>Подписи сторон:</p>
<p>Заказчик: ___________________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Подрядчик: ___________________</p>`
  },
  {
    icon: 'FileText',
    title: 'Апелляционная жалоба по спорам о долевом строительстве',
    category: 'Жалобы',
    uses: 128,
    updated: '2 нед. назад',
    hot: false,
    content: `<p style="text-align:right;">В ____________ апелляционный суд</p>
<p style="text-align:right;">через _____________ суд первой инстанции</p>
<p style="text-align:right;">Апеллянт (Истец): ФИО</p>
<p style="text-align:right;">Ответчик: ООО «Застройщик»</p>
<br/>
<p style="text-align:center;font-size:14pt;font-weight:bold;">АПЕЛЛЯЦИОННАЯ ЖАЛОБА</p>
<p style="text-align:center;">на решение ______________ суда от «__» _______ 20__ г.</p>
<br/>
<p>Решением ______________ суда от «__» _______ 20__ г. по делу № ___ в удовлетворении моих требований было отказано. Считаю данное решение незаконным и необоснованным по следующим основаниям:</p>
<br/>
<p>1. Суд неправильно применил нормы материального права, а именно ст. 6 ФЗ-214;</p>
<p>2. Выводы суда не соответствуют фактическим обстоятельствам дела;</p>
<p>3. Суд не принял во внимание представленные доказательства: _____________.</p>
<br/>
<p><strong>ПРОШУ:</strong></p>
<p>1. Решение ______________ суда от «__» _______ 20__ г. отменить;</p>
<p>2. Принять по делу новое решение об удовлетворении исковых требований в полном объёме.</p>
<br/>
<p>«__» _________ 20__ г. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Подпись: _______________</p>`
  },
];

const categories = ['Все', 'Иски', 'Претензии', 'Договоры', 'Жалобы', 'Заявления'];

export default function LibrarySection() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [search, setSearch] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorDoc, setEditorDoc] = useState<{ title: string; content: string } | null>(null);

  const filtered = documents.filter(d => {
    const matchCat = activeCategory === 'Все' || d.category === activeCategory;
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openEditor = (doc: typeof documents[0]) => {
    setEditorDoc({ title: doc.title, content: doc.content });
    setEditorOpen(true);
  };

  const openBlankEditor = () => {
    setEditorDoc({ title: 'Новый документ', content: '<p>Начните вводить текст...</p>' });
    setEditorOpen(true);
  };

  return (
    <>
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
              Редактируй прямо в платформе, выбирай принтер и печатай.
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
            <button
              onClick={openBlankEditor}
              className="glass border border-border text-foreground font-body font-medium text-sm px-6 py-3 rounded-xl hover:border-gold/40 transition-all flex items-center gap-2 shrink-0"
            >
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

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-body text-xs text-muted-foreground">{doc.category}</span>
                    <span className="font-body text-xs text-muted-foreground flex items-center gap-1">
                      <Icon name="Users" size={10} />
                      {doc.uses}
                    </span>
                  </div>
                  <span className="font-body text-xs text-muted-foreground">{doc.updated}</span>
                </div>

                <div className="pt-4 border-t border-border flex gap-2">
                  <button
                    onClick={() => openEditor(doc)}
                    className="flex-1 font-body text-xs font-semibold text-[hsl(var(--navy))] gradient-gold py-2.5 rounded-lg hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-1.5"
                  >
                    <Icon name="Pencil" size={12} />
                    Открыть и редактировать
                  </button>
                  <button
                    onClick={() => openEditor(doc)}
                    className="w-9 glass rounded-lg flex items-center justify-center hover:border-gold/40 transition-all"
                    title="Печать"
                  >
                    <Icon name="Printer" size={14} className="text-muted-foreground" />
                  </button>
                  <button className="w-9 glass rounded-lg flex items-center justify-center hover:border-cyan/40 transition-all" title="Копировать">
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

      {/* Document editor modal */}
      {editorDoc && (
        <DocumentEditor
          open={editorOpen}
          onClose={() => setEditorOpen(false)}
          title={editorDoc.title}
          initialContent={editorDoc.content}
        />
      )}
    </>
  );
}

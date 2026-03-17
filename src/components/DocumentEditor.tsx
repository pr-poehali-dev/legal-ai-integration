import { useState, useRef, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/icon';

interface DocumentEditorProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  initialContent?: string;
}

const TOOLBAR_ACTIONS = [
  { id: 'bold', label: 'Ж', cmd: 'bold', title: 'Жирный (Ctrl+B)' },
  { id: 'italic', label: 'К', cmd: 'italic', title: 'Курсив (Ctrl+I)' },
  { id: 'underline', label: 'Ч', cmd: 'underline', title: 'Подчёркнутый (Ctrl+U)' },
];

const FONT_SIZES = ['10', '11', '12', '13', '14', '16', '18', '20', '24', '28', '32'];
const FONTS = ['Times New Roman', 'Arial', 'Garamond', 'Georgia', 'Courier New', 'Calibri'];
const ALIGNMENTS = [
  { cmd: 'justifyLeft', icon: 'AlignLeft', title: 'По левому краю' },
  { cmd: 'justifyCenter', icon: 'AlignCenter', title: 'По центру' },
  { cmd: 'justifyRight', icon: 'AlignRight', title: 'По правому краю' },
  { cmd: 'justifyFull', icon: 'AlignJustify', title: 'По ширине' },
];

const defaultContent = `<p style="text-align:center;font-size:14pt;font-weight:bold;">В Арбитражный суд г. Москвы</p>
<p style="text-align:center;">Истец: ФИО, адрес</p>
<p style="text-align:center;">Ответчик: ООО «Застройщик»</p>
<br/>
<p style="text-align:center;font-size:14pt;font-weight:bold;">ИСКОВОЕ ЗАЯВЛЕНИЕ</p>
<p style="text-align:center;">о взыскании неустойки по договору долевого участия</p>
<br/>
<p>Между мной (далее — Истец) и ООО «Застройщик» (далее — Ответчик) был заключён договор участия в долевом строительстве № ___ от «__» _______ 20__ г. (далее — Договор).</p>
<br/>
<p>В соответствии с условиями Договора, Ответчик обязался передать Истцу объект долевого строительства — квартиру №___, расположенную по адресу: ________________________________, в срок не позднее «__» _______ 20__ г.</p>
<br/>
<p>Однако в нарушение взятых на себя обязательств Ответчик до настоящего времени объект долевого строительства Истцу не передал, чем нарушил условия Договора и требования ч. 2 ст. 6 Федерального закона от 30.12.2004 № 214-ФЗ.</p>
<br/>
<p><strong>ПРОШУ:</strong></p>
<p>1. Взыскать с Ответчика в пользу Истца неустойку в размере _________ руб.;</p>
<p>2. Взыскать расходы по уплате государственной пошлины.</p>
<br/>
<p>Приложения: 1. Копия Договора; 2. Расчёт неустойки; 3. Квитанция об оплате госпошлины.</p>
<br/>
<p>«__» _________ 20__ г. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Подпись: _______________</p>`;

export default function DocumentEditor({ open, onClose, title = 'Исковое о взыскании неустойки по ДДУ', initialContent }: DocumentEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState('12');
  const [fontFamily, setFontFamily] = useState('Times New Roman');
  const [docTitle, setDocTitle] = useState(title);
  const [printers, setPrinters] = useState<PrinterInfo[]>([]);
  const [selectedPrinter, setSelectedPrinter] = useState('default');
  const [showPrintPanel, setShowPrintPanel] = useState(false);
  const [printCopies, setPrintCopies] = useState(1);
  const [printOrientation, setPrintOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [printMargin, setPrintMargin] = useState('normal');
  const [saved, setSaved] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  interface PrinterInfo { id: string; name: string; isDefault?: boolean }

  // Simulate printer discovery
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setPrinters([
          { id: 'default', name: 'Принтер по умолчанию', isDefault: true },
          { id: 'pdf', name: 'Microsoft Print to PDF' },
          { id: 'hp', name: 'HP LaserJet Pro MFP' },
          { id: 'canon', name: 'Canon PIXMA TS8350' },
        ]);
      }, 300);
    }
  }, [open]);

  // Init content
  useEffect(() => {
    if (open && editorRef.current) {
      editorRef.current.innerHTML = initialContent || defaultContent;
      updateWordCount();
    }
  }, [open]);

  const updateWordCount = useCallback(() => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || '';
      setWordCount(text.split(/\s+/).filter(Boolean).length);
    }
  }, []);

  const exec = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
    updateWordCount();
  };

  const applyFont = (font: string) => {
    setFontFamily(font);
    exec('fontName', font);
  };

  const applySize = (size: string) => {
    setFontSize(size);
    // execCommand fontSize uses 1-7 scale; we use inline style instead
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
      document.execCommand('fontSize', false, '7');
      const fontEls = editorRef.current?.querySelectorAll('font[size="7"]');
      fontEls?.forEach(el => {
        (el as HTMLElement).removeAttribute('size');
        (el as HTMLElement).style.fontSize = size + 'pt';
      });
    }
  };

  const handlePrint = () => {
    const content = editorRef.current?.innerHTML || '';
    const margins: Record<string, string> = {
      normal: '20mm',
      narrow: '10mm',
      wide: '30mm',
    };
    const marginValue = margins[printMargin] || '20mm';

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8"/>
        <title>${docTitle}</title>
        <style>
          @page {
            size: A4 ${printOrientation};
            margin: ${marginValue};
          }
          * { box-sizing: border-box; }
          body {
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.6;
            color: #000;
            background: #fff;
            margin: 0;
            padding: 0;
          }
          p { margin: 0 0 6pt 0; }
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>${content}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();

    // Small delay for styles to load
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 400);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExport = (format: 'txt' | 'html') => {
    if (!editorRef.current) return;
    const content = format === 'html'
      ? editorRef.current.innerHTML
      : editorRef.current.innerText;
    const blob = new Blob([content], { type: format === 'html' ? 'text/html' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docTitle.replace(/\s+/g, '_')}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-6xl h-[92vh] flex flex-col glass rounded-2xl overflow-hidden border border-border shadow-2xl animate-scale-in">

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
              <Icon name="FileText" size={15} className="text-[hsl(var(--navy))]" />
            </div>
            <input
              value={docTitle}
              onChange={e => setDocTitle(e.target.value)}
              className="font-body text-sm font-semibold text-foreground bg-transparent border-none outline-none focus:text-gold transition-colors min-w-0 max-w-xs md:max-w-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-muted-foreground hidden md:block">{wordCount} слов</span>
            <button onClick={handleSave} className={`font-body text-xs font-medium px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${saved ? 'bg-green-400/20 text-green-400 border border-green-400/30' : 'glass text-muted-foreground hover:text-foreground hover:border-gold/30'}`}>
              <Icon name={saved ? 'Check' : 'Save'} size={13} />
              {saved ? 'Сохранено' : 'Сохранить'}
            </button>
            <button onClick={() => setShowPrintPanel(!showPrintPanel)} className={`font-body text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${showPrintPanel ? 'gradient-gold text-[hsl(var(--navy))]' : 'glass-gold text-gold hover:opacity-90'}`}>
              <Icon name="Printer" size={13} />
              Печать
            </button>
            <button onClick={onClose} className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:border-red-400/40 hover:text-red-400 transition-all">
              <Icon name="X" size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Editor area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Formatting toolbar */}
            <div className="flex items-center gap-1 px-4 py-2 border-b border-border bg-secondary/30 flex-wrap shrink-0">
              {/* Font family */}
              <select
                value={fontFamily}
                onChange={e => applyFont(e.target.value)}
                className="font-body text-xs text-foreground bg-secondary border border-border rounded-md px-2 py-1.5 focus:outline-none focus:border-gold/40 cursor-pointer"
              >
                {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>

              {/* Font size */}
              <select
                value={fontSize}
                onChange={e => applySize(e.target.value)}
                className="font-body text-xs text-foreground bg-secondary border border-border rounded-md px-2 py-1.5 w-16 focus:outline-none focus:border-gold/40 cursor-pointer"
              >
                {FONT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <div className="w-px h-5 bg-border mx-1" />

              {/* Bold / Italic / Underline */}
              {TOOLBAR_ACTIONS.map(a => (
                <button
                  key={a.id}
                  onMouseDown={e => { e.preventDefault(); exec(a.cmd); }}
                  title={a.title}
                  className={`w-8 h-8 rounded-md flex items-center justify-center font-body text-sm font-bold transition-all hover:bg-secondary text-foreground ${a.id === 'bold' ? 'font-black' : a.id === 'italic' ? 'italic' : 'underline'}`}
                >
                  {a.label}
                </button>
              ))}

              <div className="w-px h-5 bg-border mx-1" />

              {/* Alignment */}
              {ALIGNMENTS.map(a => (
                <button
                  key={a.cmd}
                  onMouseDown={e => { e.preventDefault(); exec(a.cmd); }}
                  title={a.title}
                  className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-secondary transition-all"
                >
                  <Icon name={a.icon as 'AlignLeft'} size={14} className="text-muted-foreground" />
                </button>
              ))}

              <div className="w-px h-5 bg-border mx-1" />

              {/* Lists */}
              <button onMouseDown={e => { e.preventDefault(); exec('insertUnorderedList'); }} className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-secondary transition-all" title="Маркированный список">
                <Icon name="List" size={14} className="text-muted-foreground" />
              </button>
              <button onMouseDown={e => { e.preventDefault(); exec('insertOrderedList'); }} className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-secondary transition-all" title="Нумерованный список">
                <Icon name="ListOrdered" size={14} className="text-muted-foreground" />
              </button>

              <div className="w-px h-5 bg-border mx-1" />

              {/* Export */}
              <button onClick={() => handleExport('txt')} className="flex items-center gap-1 font-body text-xs text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-md hover:bg-secondary transition-all" title="Скачать TXT">
                <Icon name="Download" size={13} />
                <span className="hidden sm:inline">TXT</span>
              </button>
              <button onClick={() => handleExport('html')} className="flex items-center gap-1 font-body text-xs text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-md hover:bg-secondary transition-all" title="Скачать HTML">
                <Icon name="Download" size={13} />
                <span className="hidden sm:inline">HTML</span>
              </button>

              <div className="w-px h-5 bg-border mx-1" />

              <button onMouseDown={e => { e.preventDefault(); exec('undo'); }} className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-secondary transition-all" title="Отменить">
                <Icon name="Undo2" size={14} className="text-muted-foreground" />
              </button>
              <button onMouseDown={e => { e.preventDefault(); exec('redo'); }} className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-secondary transition-all" title="Повторить">
                <Icon name="Redo2" size={14} className="text-muted-foreground" />
              </button>
            </div>

            {/* Document editing area — A4 feel */}
            <div className="flex-1 overflow-y-auto bg-[hsl(220_15%_7%)] flex justify-center py-8 px-4">
              <div
                className="w-full bg-white text-black rounded-sm shadow-2xl"
                style={{
                  maxWidth: '210mm',
                  minHeight: '297mm',
                  padding: '20mm 25mm',
                  fontFamily: fontFamily + ', serif',
                  fontSize: fontSize + 'pt',
                  lineHeight: '1.6',
                }}
              >
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={updateWordCount}
                  className="outline-none min-h-full focus:outline-none"
                  style={{ fontFamily: fontFamily + ', serif', fontSize: fontSize + 'pt' }}
                />
              </div>
            </div>
          </div>

          {/* Print panel */}
          {showPrintPanel && (
            <div className="w-72 border-l border-border flex flex-col bg-[hsl(var(--card))] shrink-0 overflow-y-auto">
              <div className="p-5 border-b border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">Настройки печати</h3>
                <p className="font-body text-xs text-muted-foreground">Выберите принтер и параметры</p>
              </div>

              <div className="p-5 flex flex-col gap-5">
                {/* Printer selector */}
                <div>
                  <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Принтер</label>
                  <div className="flex flex-col gap-2">
                    {printers.length === 0 && (
                      <div className="flex items-center gap-2 py-2">
                        <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                        <span className="font-body text-xs text-muted-foreground">Поиск принтеров...</span>
                      </div>
                    )}
                    {printers.map(p => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPrinter(p.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${selectedPrinter === p.id ? 'border-gold/50 bg-gold/8 glass-gold' : 'border-border hover:border-border/80 bg-secondary/30'}`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${selectedPrinter === p.id ? 'gradient-gold' : 'bg-secondary'}`}>
                          <Icon name="Printer" size={14} className={selectedPrinter === p.id ? 'text-[hsl(var(--navy))]' : 'text-muted-foreground'} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-body text-xs font-semibold text-foreground truncate">{p.name}</div>
                          {p.isDefault && <div className="font-body text-xs text-muted-foreground">По умолчанию</div>}
                        </div>
                        {selectedPrinter === p.id && <Icon name="Check" size={14} className="text-gold shrink-0 ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Copies */}
                <div>
                  <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Количество копий</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setPrintCopies(Math.max(1, printCopies - 1))} className="w-9 h-9 glass rounded-xl flex items-center justify-center hover:border-gold/40 transition-all">
                      <Icon name="Minus" size={14} className="text-foreground" />
                    </button>
                    <span className="font-display text-2xl font-bold text-gold w-8 text-center">{printCopies}</span>
                    <button onClick={() => setPrintCopies(Math.min(99, printCopies + 1))} className="w-9 h-9 glass rounded-xl flex items-center justify-center hover:border-gold/40 transition-all">
                      <Icon name="Plus" size={14} className="text-foreground" />
                    </button>
                  </div>
                </div>

                {/* Orientation */}
                <div>
                  <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Ориентация</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'portrait', label: 'Портрет', icon: 'BookOpen' },
                      { value: 'landscape', label: 'Альбом', icon: 'Monitor' },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setPrintOrientation(opt.value as 'portrait' | 'landscape')}
                        className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${printOrientation === opt.value ? 'border-gold/50 glass-gold' : 'border-border bg-secondary/30 hover:border-border/80'}`}
                      >
                        <Icon name={opt.icon as 'BookOpen'} size={18} className={printOrientation === opt.value ? 'text-gold' : 'text-muted-foreground'} />
                        <span className={`font-body text-xs ${printOrientation === opt.value ? 'text-gold font-semibold' : 'text-muted-foreground'}`}>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Margins */}
                <div>
                  <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Поля</label>
                  <select
                    value={printMargin}
                    onChange={e => setPrintMargin(e.target.value)}
                    className="w-full font-body text-sm text-foreground bg-secondary border border-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-gold/40"
                  >
                    <option value="normal">Обычные (20 мм)</option>
                    <option value="narrow">Узкие (10 мм)</option>
                    <option value="wide">Широкие (30 мм)</option>
                  </select>
                </div>

                {/* Paper */}
                <div>
                  <label className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Формат бумаги</label>
                  <div className="glass rounded-xl p-3 flex items-center gap-2">
                    <Icon name="FileText" size={14} className="text-muted-foreground" />
                    <span className="font-body text-sm text-foreground">A4 (210 × 297 мм)</span>
                  </div>
                </div>

                {/* Print summary */}
                <div className="glass-gold rounded-xl p-4">
                  <div className="font-body text-xs text-gold font-semibold uppercase tracking-wider mb-2">Итого</div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between font-body text-xs">
                      <span className="text-muted-foreground">Копий:</span>
                      <span className="text-foreground font-medium">{printCopies} шт.</span>
                    </div>
                    <div className="flex justify-between font-body text-xs">
                      <span className="text-muted-foreground">Ориентация:</span>
                      <span className="text-foreground font-medium">{printOrientation === 'portrait' ? 'Портрет' : 'Альбом'}</span>
                    </div>
                    <div className="flex justify-between font-body text-xs">
                      <span className="text-muted-foreground">Принтер:</span>
                      <span className="text-foreground font-medium truncate max-w-[120px]">{printers.find(p => p.id === selectedPrinter)?.name ?? '—'}</span>
                    </div>
                  </div>
                </div>

                {/* Print button */}
                <button
                  onClick={handlePrint}
                  className="gradient-gold text-[hsl(var(--navy))] font-body font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all glow-gold"
                >
                  <Icon name="Printer" size={18} />
                  Печатать {printCopies > 1 ? `(${printCopies} копии)` : ''}
                </button>

                <button
                  onClick={() => handleExport('html')}
                  className="glass border border-border text-foreground font-body font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:border-gold/30 transition-all text-sm"
                >
                  <Icon name="Download" size={15} />
                  Скачать документ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

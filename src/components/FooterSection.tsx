import Icon from '@/components/ui/icon';

export default function FooterSection() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
              <span className="text-[hsl(var(--navy))] font-bold text-sm font-body">LP</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              Lex<span className="text-gold">Pro</span>
            </span>
          </div>
          <p className="font-body text-xs text-muted-foreground text-center">
            Платформа для юристов в сфере защиты прав собственников · Строительные споры · 2026
          </p>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
            <span className="font-body text-xs text-muted-foreground">Работаем 24/7</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

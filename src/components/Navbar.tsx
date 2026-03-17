import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const navItems = [
  { id: 'analytics', label: 'Анализ' },
  { id: 'library', label: 'Библиотека' },
  { id: 'ai', label: 'ИИ-помощник' },
  { id: 'monitoring', label: 'Мониторинг' },
  { id: 'strategies', label: 'Стратегии' },
  { id: 'integrations', label: 'Интеграции' },
  { id: 'cabinet', label: 'Кабинет' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-border' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center glow-gold">
            <span className="text-[hsl(var(--navy))] font-bold text-sm font-body">LP</span>
          </div>
          <span className="font-display text-xl font-semibold text-foreground">
            Lex<span className="text-gold">Pro</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link text-sm font-body font-medium transition-colors ${active === item.id ? 'text-gold' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 pulse-dot"></div>
            <span className="text-xs text-muted-foreground font-body">Онлайн 24/7</span>
          </div>
          <button
            onClick={() => scrollTo('cabinet')}
            className="gradient-gold text-[hsl(var(--navy))] font-body font-semibold text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Войти
          </button>
        </div>

        {/* Mobile burger */}
        <button className="lg:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden glass border-t border-border px-6 py-4 flex flex-col gap-3">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-left text-sm font-body font-medium text-muted-foreground hover:text-gold transition-colors py-1"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('cabinet')}
            className="gradient-gold text-[hsl(var(--navy))] font-body font-semibold text-sm px-4 py-2 rounded-lg w-full mt-2"
          >
            Войти
          </button>
        </div>
      )}
    </nav>
  );
}

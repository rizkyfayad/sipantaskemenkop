'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'DASHBOARD', href: '/#dashboard' },
  { label: 'UNGGAH DOKUMEN', href: '/#unggah' },
  { label: 'TIM UKK', href: '/#tim' },
  { label: 'INFORMASI', href: '/informasi' },
];

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        zIndex: 1000,
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        boxShadow: 'var(--shadow-light)',
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }} onClick={closeMenu}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <img
              src="/logo-kemenkop.png"
              alt="Logo Kemenkop"
              style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
        </Link>

        {/* Right side: Desktop Menu + Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

          {/* Desktop Nav - hidden on mobile via CSS class */}
          <nav className="nav-desktop-menu" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} style={{
                color: 'var(--nav-text)',
                textDecoration: 'none',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.background = 'var(--brand-green)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--nav-text)';
                e.currentTarget.style.background = 'transparent';
              }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{
                background: 'var(--bg-hover)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '20px',
                transition: 'all 0.3s',
                flexShrink: 0,
              }}
              title={theme === 'dark' ? 'Ganti ke Terang' : 'Ganti ke Gelap'}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          )}

          {/* Hamburger Button - ONLY visible on mobile */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none', /* shown via CSS media query */
              background: 'var(--bg-hover)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              flexShrink: 0,
            }}
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              /* X icon */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              /* Hamburger icon */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu Overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          zIndex: 999,
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-color)',
          padding: '1rem 1.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          boxShadow: 'var(--shadow-heavy)',
        }}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              style={{
                color: 'var(--nav-text)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                transition: 'all 0.2s',
                display: 'block',
                borderBottom: '1px solid var(--border-color)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--bg-hover)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

'use client';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const docs = [
  { id: 1, title: 'Undang-Undang No 25 Tahun 1992 Tentang Perkoperasian', url: 'https://drive.google.com/file/d/1UREo6vFRFzKuFhlvUUo8h5It9_4ITszU/view?usp=drive_link' },
  { id: 2, title: 'Permenkop UKM No 9 Tahun 2018', url: 'https://drive.google.com/file/d/1v8Mwydr-npOO9AufWcOIYtyQV-go27kY/view?usp=drive_link' },
  { id: 3, title: 'Pedoman Penilaian Kesehatan KSP', url: 'https://drive.google.com/file/d/17YWpL11A_8rIS6REGkH-HnQNXPq8FOUs/view?usp=drive_link' },
];

export default function Informasi() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div className="hero-section" style={{
        background: 'radial-gradient(ellipse at 50% 0%, var(--bg-hover) 0%, var(--bg-primary) 80%)',
        padding: '8rem 1.5rem 4rem',
        borderBottom: '1px solid var(--border-color)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(128,128,128,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.05) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 className="section-title" style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', fontWeight: 900, color: 'var(--text-title)', margin: '0 0 1rem' }}>
            REGULASI &amp; INFORMASI
          </h1>
          <div style={{ width: '100px', height: '4px', background: 'linear-gradient(to right, transparent, var(--brand-green), transparent)', margin: '0 auto 1.25rem' }} />
          <p style={{ color: 'var(--text-secondary)', margin: '0 auto', fontSize: 'clamp(0.85rem, 2vw, 1rem)', maxWidth: '600px', lineHeight: 1.6 }}>
            Pustaka regulasi resmi sebagai referensi dan pedoman pelaksana kegiatan perkoperasian.
          </p>
        </div>
      </div>

      {/* Doc List */}
      <div className="section-pad" style={{ padding: '3.5rem 1.5rem', maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {docs.map((doc, idx) => (
            <motion.div key={doc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.75rem 2rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '18px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  boxShadow: 'var(--shadow-light)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand-green)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-heavy)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-light)'; }}
              >
                <div className="doc-icon-wrap" style={{ background: 'var(--bg-hover)', borderRadius: '14px', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--brand-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.4rem', lineHeight: 1.35 }}>
                    {doc.title}
                  </h3>
                  <div style={{ color: 'var(--brand-blue)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                    Buka Dokumen Referensi
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

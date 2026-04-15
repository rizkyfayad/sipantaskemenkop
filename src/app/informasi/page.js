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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div style={{
        background: 'radial-gradient(ellipse at 50% 0%, var(--bg-hover) 0%, var(--bg-primary) 80%)',
        padding: '10rem 2.5rem 5rem',
        borderBottom: '1px solid var(--border-color)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Soft Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(128,128,128,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.05) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-title)', margin: '0 0 1rem', letterSpacing: '0.02em' }}>
            REGULASI & INFORMASI
          </h1>
          <div style={{
            width: '100px', height: '4px',
            background: 'linear-gradient(to right, transparent, var(--brand-green), transparent)',
            margin: '0 auto 1.5rem',
          }} />
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
            Menyajikan informasi umum serta pustaka regulasi resmi yang dapat digunakan sebagai referensi dan pedoman pelaksana kegiatan perkoperasian.
          </p>
        </div>
      </div>

      <div style={{ padding: '4rem 2.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {docs.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <a href={doc.url} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '2rem 2.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                textDecoration: 'none',
                transition: 'all 0.3s',
                boxShadow: 'var(--shadow-light)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--brand-green)';
                e.currentTarget.style.boxShadow = mounted && theme === 'dark' ? '0 15px 40px rgba(16,185,129,0.1)' : '0 15px 40px rgba(20,92,116,0.08)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'var(--shadow-light)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <div style={{
                   background: 'var(--bg-hover)',
                   borderRadius: '16px',
                   padding: '1rem',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--brand-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.5rem', letterSpacing: '0.01em' }}>
                    {doc.title}
                  </h3>
                  <div style={{ color: 'var(--brand-blue)', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

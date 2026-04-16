'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { useTheme } from 'next-themes';

export default function Home() {
  const { theme } = useTheme();

  const [statusData, setStatusData] = useState([
    { name: 'Proses\nVerifikasi', Jumlah: 0 },
    { name: 'Proses Uji', Jumlah: 0 },
    { name: 'Selesai', Jumlah: 0 },
  ]);
  const [teamProgressData, setTeamProgressData] = useState([
    { name: 'Tim 1', Jumlah: 0 },
    { name: 'Tim 2', Jumlah: 0 },
    { name: 'Tim 3', Jumlah: 0 },
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/dashboard');
      const data = await res.json();
      if (data.success) {
        setStatusData(data.statusData);
        setTeamProgressData(data.teamProgressData);
      }
    } catch (err) {
      console.error('Gagal mengambil data dashboard:', err);
    }
  };

  const handleFormsRedirect = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSd3AzUgihMX3cL-4g7QffRPi-m8zsDX83KKxB3dA7lmDRKOcg/viewform', '_blank');
  };

  const teams = [
    { id: 1, name: 'TIM 1', icon: '1', color: '#3b82f6', url: 'https://drive.google.com/drive/folders/1Lcy7HoDRgB8sdOAlrjYF3XSBykYSTUC6?usp=drive_link' },
    { id: 2, name: 'TIM 2', icon: '2', color: '#10b981', url: 'https://drive.google.com/drive/folders/1oMoTLE6letIWwLzjsO3ZTC1CwGMfap5r?usp=drive_link' },
    { id: 3, name: 'TIM 3', icon: '3', color: '#f59e0b', url: 'https://drive.google.com/drive/folders/1-02J6BI4CYZ4fIdG2dKulYSj3fLS2U-7?usp=drive_link' },
  ];

  const CustomXAxisTick = ({ x, y, payload }) => {
    const lines = payload.value.split('\n');
    return (
      <g transform={`translate(${x},${y})`}>
        {lines.map((line, index) => (
          <text key={index} x={0} y={index * 14} dy={14} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontWeight="700">
            {line}
          </text>
        ))}
      </g>
    );
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', overflowX: 'hidden', fontFamily: "'Inter', sans-serif" }}>

      {/* ===== HERO ===== */}
      <div className="hero-section" style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '10rem 2rem 8rem',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at 50% 0%, var(--bg-hover) 0%, var(--bg-primary) 80%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottom: '1px solid var(--border-color)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(128,128,128,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.05) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ width: '80px', height: '4px', background: 'linear-gradient(to right, transparent, var(--brand-green), transparent)', margin: '0 auto 2rem' }} />

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontWeight: 900,
              color: 'var(--text-title)',
              margin: '0 0 1rem',
              letterSpacing: '0.04em',
              lineHeight: 1.05,
            }}
          >
            SI PANTAS UKK
          </motion.h1>

          <div style={{ width: '200px', height: '4px', background: 'linear-gradient(to right, transparent, var(--brand-blue), var(--brand-green), transparent)', margin: '1.5rem auto', borderRadius: '4px' }} />

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
              letterSpacing: '0.2em',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              fontWeight: 600,
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            Sistem Informasi Pengelolaan Administrasi dan Verifikasi UKK<br/>
            Kementerian Koperasi RI
          </motion.p>
        </div>
      </div>

      {/* ===== DASHBOARD ===== */}
      <section id="dashboard" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-pad" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2.5rem' }}>
          <h2 className="section-title" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '3rem', textAlign: 'center', letterSpacing: '0.05em' }}>
            DASHBOARD MONITORING
          </h2>

          <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '2rem' }}>

            {/* Chart 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-light)' }}
            >
              <h3 style={{ textAlign: 'center', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '1px' }}>
                STATUS PROSES UKK
              </h3>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <BarChart data={statusData} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} stroke="var(--border-color)" />
                    <XAxis dataKey="name" tick={<CustomXAxisTick />} axisLine={{ stroke: 'var(--border-color)' }} tickLine={false} />
                    <YAxis tick={{ fill: 'var(--text-secondary)', fontWeight: 'bold', fontSize: 11 }} axisLine={false} tickLine={false} tickCount={5} domain={[0, 'dataMax + 2']} />
                    <Tooltip cursor={{ fill: 'var(--bg-hover)' }} contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }} />
                    <Bar dataKey="Jumlah" fill={theme === 'dark' ? '#3b82f6' : '#145c74'} barSize={45} radius={[6, 6, 0, 0]}>
                      <LabelList dataKey="Jumlah" position="top" fill={theme === 'dark' ? '#60a5fa' : '#145c74'} fontWeight="bold" dy={-8} fontSize={12} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Chart 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--shadow-light)' }}
            >
              <h3 style={{ textAlign: 'center', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '1px' }}>
                PROGRES SETIAP TIM
              </h3>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <BarChart data={teamProgressData} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} stroke="var(--border-color)" />
                    <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontWeight: 'bold', fontSize: 11 }} axisLine={{ stroke: 'var(--border-color)' }} tickLine={false} />
                    <YAxis tick={{ fill: 'var(--text-secondary)', fontWeight: 'bold', fontSize: 11 }} axisLine={false} tickLine={false} tickCount={5} domain={[0, 'dataMax + 2']} />
                    <Tooltip cursor={{ fill: 'var(--bg-hover)' }} contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }} />
                    <Bar dataKey="Jumlah" fill={theme === 'dark' ? '#10b981' : '#8cb83f'} barSize={45} radius={[6, 6, 0, 0]}>
                      <LabelList dataKey="Jumlah" position="top" fill={theme === 'dark' ? '#34d399' : '#8cb83f'} fontWeight="bold" dy={-8} fontSize={12} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ===== UNGGAH ===== */}
      <section id="unggah" style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-pad" style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2.5rem', textAlign: 'center' }}>
          <h2 className="section-title" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
            UNGGAH DOKUMEN
          </h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0 auto 2.5rem', fontSize: '1rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Pilih dan unggah dokumen persyaratan verifikasi ke dalam repositori utama kami yang terhubung dengan evaluasi tim secara otomatis.
          </p>

          <motion.div
            className="upload-box"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '3.5rem 2rem',
              boxShadow: 'var(--shadow-heavy)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.75rem',
            }}
          >
            <div style={{ background: 'var(--bg-hover)', borderRadius: '50%', width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--brand-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="12" y2="12"/><line x1="15" y1="15" x2="12" y2="12"/>
              </svg>
            </div>

            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Menuju Portal Google Forms</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                Form pengumpulan persyaratan administrasi dialihkan ke Google Forms resmi Kemenkop.
              </p>
            </div>

            <button
              onClick={handleFormsRedirect}
              style={{
                background: theme === 'dark' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'linear-gradient(135deg, #145c74, #0f4a5c)',
                color: 'white',
                padding: '1rem 2.5rem',
                borderRadius: '12px',
                border: 'none',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s',
                width: '100%',
                maxWidth: '360px',
                justifyContent: 'center',
                boxShadow: theme === 'dark' ? '0 10px 20px rgba(59,130,246,0.3)' : '0 10px 20px rgba(20,92,116,0.3)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              BUKA FORMULIR UNGGAHAN
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===== TIM UKK ===== */}
      <section id="tim" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-pad" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2.5rem', textAlign: 'center' }}>
          <h2 className="section-title" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
            DAFTAR TIM UKK
          </h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0 auto 3rem', fontSize: '1rem', maxWidth: '580px', lineHeight: 1.6 }}>
            Aksesibilitas pendataan kertas kerja dari masing-masing unit tim verifikator.
          </p>

          <div className="team-flex" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {teams.map((team, idx) => (
              <motion.div
                key={team.id}
                className="team-card"
                onClick={() => team.url && window.open(team.url, '_blank')}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: idx * 0.12, type: 'spring', stiffness: 100 }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem',
                  background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                  padding: '2.25rem 2rem', borderRadius: '28px', minWidth: '240px', flex: '1 1 240px', maxWidth: '320px',
                  transition: 'all 0.3s', boxShadow: 'var(--shadow-light)', cursor: 'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = team.color; e.currentTarget.style.boxShadow = `0 20px 40px ${team.color}40`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'var(--shadow-light)'; }}
              >
                <div style={{
                  width: '120px', height: '120px',
                  background: `linear-gradient(135deg, ${team.color}22, ${team.color}08)`,
                  border: `2px solid ${team.color}60`, borderRadius: '22px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '3.5rem', fontWeight: 900, color: team.color,
                }}>
                  {team.icon}
                </div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '0.05em' }}>
                  {team.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <section id="kontak" style={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#145c74', padding: '4rem 2rem', color: '#ffffff', borderTop: '2px solid rgba(255,255,255,0.05)' }}>
        <div className="footer-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>

          <div className="footer-map" style={{ flex: '1 1 400px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', minHeight: '280px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1135.5398285514166!2d106.82991054320953!3d-6.220199127827802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3faa9afc9e5%3A0xc6cb6916fa5e9664!2sThe%20H%20Tower!5e0!3m2!1sen!2sid!4v1714032123456!5m2!1sen!2sid"
              width="100%" height="300" style={{ border: 0, display: 'block' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--accent-yellow)' }}>HUBUNGI KAMI</h2>

            {[
              { icon: '📍', text: 'Jl. H. R. Rasuna Said No.Kav. 3-4, Kuningan, Karet Kuningan, Jakarta Selatan 12940' },
              { icon: '☎️', text: '+62 1500 587' },
              { icon: '📞', text: '+62 8111 451 587' },
              { icon: '📧', text: 'Asdeppelindungananggota@gmail.com' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ fontSize: '1.3rem', marginTop: '0.1rem', flexShrink: 0 }}>{item.icon}</span>
                <p style={{ margin: 0, fontWeight: 500, fontSize: '0.9rem', color: '#f0f8ff', lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

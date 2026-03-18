import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Nova | Quality Pre-Owned Vehicles',
  description: 'Browse our inventory of quality pre-owned vehicles in Nova Scotia. Simple, transparent, and local.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <nav style={{ background: '#1e293b', color: 'white', padding: '1rem 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
              CAR NOVA
            </a>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="/inventory" style={{ color: 'white', textDecoration: 'none' }}>Inventory</a>
              <a href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
            </div>
          </div>
        </nav>
        {children}
        <footer style={{ background: '#1e293b', color: 'white', padding: '2rem', textAlign: 'center', marginTop: '3rem' }}>
          <p>&copy; 2026 Car Nova. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

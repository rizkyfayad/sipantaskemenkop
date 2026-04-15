import { NextResponse } from 'next/server';
import Papa from 'papaparse';

export async function GET() {
  try {
    const sheetUrl = "https://docs.google.com/spreadsheets/d/1wfYdat06xyjyw9nDLB682wq5121U9GqyfeBmvf2dZik/export?format=csv&gid=44215394";
    
    // Fetch CSV data from Google Sheets
    const response = await fetch(sheetUrl, { cache: 'no-store' }); // Disable cache for real-time updates
    if (!response.ok) {
        throw new Error(`Failed to fetch Google Sheets data: ${response.status} ${response.statusText}`);
    }
    const csvText = await response.text();

    // Parse CSV
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    const data = result.data;

    // Initialize Accumulators
    let statusCounts = {
      'Proses Verifikasi': 0,
      'Proses Uji': 0,
      'Selesai': 0,
    };

    let teamCounts = {
      'Tim 1': 0,
      'Tim 2': 0,
      'Tim 3': 0,
    };

    // Calculate totals
    data.forEach((row) => {
      const tahap = row['Tahap']?.trim();
      const tim = row['Tim']?.trim();

      if (tahap && statusCounts[tahap] !== undefined) {
          statusCounts[tahap]++;
      }
      
      // Sometimes it could be labeled TIM 1 or Tim 1. Let's normalize it.
      const normalizedTim = tim ? tim.replace(/tim/i, 'Tim') : null;
      if (normalizedTim && teamCounts[normalizedTim] !== undefined) {
          teamCounts[normalizedTim]++;
      }
    });

    return NextResponse.json({
      success: true,
      statusData: [
        { name: 'Proses\nVerifikasi', Jumlah: statusCounts['Proses Verifikasi'] },
        { name: 'Proses Uji', Jumlah: statusCounts['Proses Uji'] },
        { name: 'Selesai', Jumlah: statusCounts['Selesai'] },
      ],
      teamProgressData: [
        { name: 'Tim 1', Jumlah: teamCounts['Tim 1'] },
        { name: 'Tim 2', Jumlah: teamCounts['Tim 2'] },
        { name: 'Tim 3', Jumlah: teamCounts['Tim 3'] },
      ],
      raw: data
    });

  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { success: false, error: 'Gagal memuat data dari Google Sheets.' },
      { status: 500 }
    );
  }
}

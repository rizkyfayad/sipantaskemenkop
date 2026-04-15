import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';


export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Parse PDF text
    let extractedText = '';
    try {
      const pdfParse = require('pdf-parse');
      const parsedData = await pdfParse(buffer);
      extractedText = parsedData.text;
    } catch (parseErr) {
      console.warn('PDF parsing warning (might be scanned or password protected):', parseErr);
      extractedText = ''; // Fallback for image-only or locked PDFs
    }

    const uniqueFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    
    // Upload to Storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from('pdfs')
      .upload(uniqueFileName, buffer, {
        contentType: file.type,
      });

    if (storageError) {
      console.error('Supabase Storage Error:', storageError);
      return NextResponse.json({ error: 'Gagal mengunggah file ke server storage.' }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from('pdfs')
      .getPublicUrl(uniqueFileName);
    
    // Save to DB
    const { data: dbData, error: dbError } = await supabase
      .from('documents')
      .insert([
        {
          filename: file.name,
          content: extractedText,
          file_url: publicUrlData.publicUrl
        }
      ]);

    if (dbError) {
      console.error('Supabase DB Error:', dbError);
      return NextResponse.json({ error: 'Gagal menyimpan metadata ke database.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Berkas berhasil diunggah dan disimpan.' });

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan internal.' }, { status: 500 });
  }
}

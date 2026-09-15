import fs from 'fs';
import path from 'path';

export async function saveUploadedFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // If running on Vercel serverless environment or read-only filesystem, convert image to Data URL
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    const mimeType = file.type || 'image/jpeg';
    const base64 = buffer.toString('base64');
    return `data:${mimeType};base64,${base64}`;
  }

  // Local filesystem storage for local development
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);
    return `/uploads/${filename}`;
  } catch (e) {
    // Fallback to Data URL if local write fails
    const mimeType = file.type || 'image/jpeg';
    const base64 = buffer.toString('base64');
    return `data:${mimeType};base64,${base64}`;
  }
}

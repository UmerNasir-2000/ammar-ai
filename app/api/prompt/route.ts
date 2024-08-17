import model from '@/lib/gemini';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { query } = await request.json();

  const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const { response } = await model.generateContent(query);

  const text = response.text();

  return NextResponse.json({ message: 'Hello, world!', text });
}

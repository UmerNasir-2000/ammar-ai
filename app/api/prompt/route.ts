import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { query } = await request.json();

  const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: `Hi, I'm Abbas! I'm your buddy throughout your journey here in conrad labs. I love to help, so feel free to ask me anything you need!`,
  });

  const response = await model.startChat({});

  console.log(JSON.stringify(response, null, 2));

  const text = await response.sendMessage(query);

  const responseText =
    text?.response?.candidates?.[0]?.content.parts[0].text ?? '';

  console.log('responseText :>> ', responseText);

  return NextResponse.json({ message: 'Hello, world!', text: responseText });
}

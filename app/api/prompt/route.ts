import { GoogleGenerativeAI } from '@google/generative-ai';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import Chat from '../models/chat.model';
import axios from 'axios';

export async function POST(request: Request) {
  const { query } = await request.json();

  //   const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

  //   const model = genAI.getGenerativeModel({
  //     model: 'gemini-1.5-flash',
  //     systemInstruction: `I am Abbas. My primary purpose is to provide information related to Conrad Labs projects, the team, events, and any news associated with Conrad Labs and its founders. If your question is related to Conrad Labs (CL), I'll provide the answer. For unrelated questions, I'll let you know by saying, 'I can assist you with information specific to Conrad Labs (CL)`,
  //   });

  //   const response = await model.startChat({});

  //   console.log(JSON.stringify(response, null, 2));

  //   const text = await response.sendMessage(query);

  //   const responseText =
  //     text?.response?.candidates?.[0]?.content.parts[0].text ?? '';

  //   console.log('responseText :>> ', responseText);

  const { data } = await axios.post(`${process.env.SERVER_URL}/chatbot`, {
    message: query,
  });

  await mongoose.connect(process.env.CONNECTION_STRING!);

  await Chat.create({ data: { data: data.response } });

  return NextResponse.json({
    message: 'Hello, world!',
    text: data.response,
  });
}

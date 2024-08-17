'use client';

import { Input } from '@/components/ui/input';
import { FormEvent, useCallback, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export default function Page() {
  const [prompt, setPrompt] = useState('');

  const onSubmitHandler = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const response = await model.generate({ prompt });

      console.log(response.data);
    },
    [prompt]
  );

  return (
    <div className='flex flex-col h-screen items-center'>
      <div className='flex-grow p-4 overflow-auto'>
        <TypeAnimation
          sequence={[
            'One', // Types 'One'
            1000, // Waits 1s
            'Two', // Deletes 'One' and types 'Two'
            2000, // Waits 2s
            'Two Three', // Types 'Three' without deleting 'Two'
          ]}
          wrapper='span'
          cursor={true}
          style={{ fontSize: '2em', display: 'inline-block' }}
        />
      </div>
      <div className='w-1/2 fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4'>
        <form
          className='w-full dark:bg-black rounded-md'
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='Please ask your query'
            className='w-full shadow-xl p-4 py-6'
          />
        </form>
      </div>
    </div>
  );
}

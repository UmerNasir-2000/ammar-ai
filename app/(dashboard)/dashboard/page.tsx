'use client';

import { Input } from '@/components/ui/input';
import { FormEvent, useCallback, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

interface PromptResponse {
  query: string;
  response: string;
}

export default function Page() {
  const [prompt, setPrompt] = useState('');

  const [sequence, setSequence] = useState<PromptResponse[]>([]);

  const onSubmitHandler = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const response = await fetch('/api/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: prompt }),
      });

      const data = await response.json();

      setSequence([...sequence, { query: prompt, response: data.text }]);

      setPrompt('');
    },
    [prompt]
  );

  return (
    <div className='flex flex-col h-screen items-center'>
      <div className='flex-grow p-4 overflow-auto space-y-4'>
        {!!sequence.length &&
          sequence.map(({ query, response }, index) => (
            <div
              key={index}
              className='max-w-4xl text-justify max-h-96 border-red-800 border-2 p-3 overflow-scroll gap-2'
            >
              <TypeAnimation
                sequence={[response, 1000]}
                speed={80}
                cursor={false}
              />
            </div>
          ))}
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

'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { IconArrowBadgeUpFilled } from '@tabler/icons-react';
import { FormEvent, useCallback, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

interface PromptResponse {
  query: string;
  response: string;
}

interface Macro {
  title: string;
  text: string;
}

const macros: Macro[] = [
  {
    title: 'Need Assistance?',
    text: 'Tell me what you’re struggling with, and I’ll direct you to the right person or resource.',
  },
  {
    title: 'Trouble Finding the Right Help?',
    text: 'Share your challenge, and I’ll connect you with a team member who can offer support.',
  },
  {
    title: 'Feeling Bored?',
    text: "Let's Mingle and Find Your Perfect Buddy!",
  },
];

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
        {!!sequence.length ? (
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
          ))
        ) : (
          <div>
            <div className='space-y-2 py-6 flex flex-col items-center'>
              <h3 className='text-6xl font-semibold bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-left'>
                Hello
              </h3>
              <p className='text-xl text-left'>
                How can I assist you today, buddy?
              </p>
            </div>
            <div className='flex gap-x-4'>
              {macros.map((macro, index) => (
                <Card
                  key={index}
                  className='w-72 dark:bg-zinc-900 flex flex-col justify-between hover:opacity-75 cursor-pointer'
                >
                  <CardHeader className='text-lg'>{macro.title}</CardHeader>
                  <CardContent className='flex justify-center items-center text-sm'>
                    {macro.text}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className='w-1/2 fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4'>
        <form
          className='w-full dark:bg-black rounded-xl flex items-center'
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='Message AbbasAI'
            className='w-full shadow-xl p-3 px-7 h-16 outline-none border-none placeholder:text-base rounded-xl focus:outline-none focus:ring-0 focus:border-none'
          />
          <IconArrowBadgeUpFilled className='w-8 h-8' />
        </form>
      </div>
    </div>
  );
}

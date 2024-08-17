'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

export default function Page() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-grow p-4 overflow-auto'>
        <TypeAnimation
          sequence={[
            'One', // Types 'One'
            1000, // Waits 1s
            'Two', // Deletes 'One' and types 'Two'
            2000, // Waits 2s
            'Two Three', // Types 'Three' without deleting 'Two'
            () => {
              console.log('Sequence completed');
            },
          ]}
          wrapper='span'
          cursor={true}
          repeat={Infinity}
          style={{ fontSize: '2em', display: 'inline-block' }}
        />
      </div>
      <div className='w-1/2 fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4'>
        <div className='w-full bg-black rounded-sm'>
          <Input
            placeholder='Please ask your query'
            className='w-full shadow-xl p-4 py-6'
          />
        </div>
      </div>
    </div>
  );
}

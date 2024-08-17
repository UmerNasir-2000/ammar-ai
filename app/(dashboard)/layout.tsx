'use client';

import { Logo, LogoIcon } from '@/components/logo';
import ModeToggle from '@/components/themeToggle';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import {
  IconArrowLeft,
  IconBookmarkAi,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from '@tabler/icons-react';
import Image from 'next/image';
import { PropsWithChildren, useState } from 'react';

const links = [
  {
    label: 'Dashboard',
    href: '#',
    icon: (
      <IconBrandTabler className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
    ),
  },
  {
    label: 'Profile',
    href: '#',
    icon: (
      <IconUserBolt className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
    ),
  },
  {
    label: 'Settings',
    href: '#',
    icon: (
      <IconSettings className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
    ),
  },
  {
    label: 'Logout',
    href: '#',
    icon: (
      <IconArrowLeft className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
    ),
  },
];

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden',
        'h-screen'
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className='justify-between gap-10 bg-stone-200 dark:bg-black'>
          <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
            {open ? <Logo /> : <IconBookmarkAi />}
            <div className='mt-8 flex flex-col gap-2'>
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: 'Umer Nasir',
                href: '#',
                icon: (
                  <Image
                    src='https://assets.aceternity.com/manu.png'
                    className='h-7 w-7 flex-shrink-0 rounded-full'
                    width={50}
                    height={50}
                    alt='Avatar'
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className='flex flex-col w-full'>
        <header className='flex items-center justify-between py-3 px-7'>
          <h2>Ask Your Doubts</h2>
          <ModeToggle />
        </header>
        <main className='py-4 px-7'>{children}</main>
      </div>
    </div>
  );
}

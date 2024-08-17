'use client';

import React, { PropsWithChildren, useState } from 'react';
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from '@tabler/icons-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { Logo, LogoIcon } from '@/components/logo';

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
        <SidebarBody className='justify-between gap-10'>
          <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
            {open ? <Logo /> : <LogoIcon />}
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
      <main className='p-4'>{children}</main>
    </div>
  );
}

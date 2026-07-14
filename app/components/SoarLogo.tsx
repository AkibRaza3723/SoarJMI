'use client';

import Image from 'next/image';

interface SoarLogoProps {
  size?: number;
  /** When true, renders on a transparent/coloured bg where the logo bg blends in */
  className?: string;
}

export default function SoarLogo({ size = 80, className = '' }: SoarLogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="SoarJMI Logo"
      width={size}
      height={size}
      className={className}
      style={{
        borderRadius: '12px',
        objectFit: 'contain',
        display: 'block',
      }}
      priority
    />
  );
}

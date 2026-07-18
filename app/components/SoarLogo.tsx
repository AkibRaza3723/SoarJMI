'use client';

import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';

interface SoarLogoProps {
  size?: number;
  /** When true, renders on a transparent/coloured bg where the logo bg blends in */
  className?: string;
}

export default function SoarLogo({ size = 80, className = '' }: SoarLogoProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by not rendering the image before client side mounted if it relies on theme
  // Default to logo2.png (light theme) for initial server render
  const logoSrc = !mounted ? '/logo2.png' : (theme === 'tech' ? '/logo.png' : '/logo2.png');

  return (
    <Image
      src={logoSrc}
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

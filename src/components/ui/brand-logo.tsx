'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';
import {
  LOGO_LETTERS,
  LOGO_MARK_TRANSFORM,
  LOGO_VIEW_BOX,
  LOGO_WORD,
  LOGO_WORD_TRANSFORM,
  MARK_BAG,
  MARK_BAG_HANDLE,
  MARK_BUBBLE,
  MARK_EYES,
} from '@/lib/logo';

/** How far the eyes can move inside the bag, in the mark's own units. */
const REACH = { x: 2.6, y: 2.4 };

/**
 * The animated logo, as on wkil.app: the eyes follow the pointer and blink. The blink and the
 * colours are in globals.css (`.brand-logo`); this sets `--look-x` and `--look-y`. Without a
 * pointer the eyes only blink, and with reduced motion they stay still.
 */
export function BrandLogo({ className }: { className?: string }) {
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;

    const look = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const eyes = logo.querySelector('.brand-eyes');
        if (!eyes) return;

        const box = eyes.getBoundingClientRect();
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        const distance = Math.hypot(dx, dy) || 1;
        const pull = Math.min(1, distance / 160);

        logo.style.setProperty('--look-x', ((dx / distance) * REACH.x * pull).toFixed(2));
        logo.style.setProperty('--look-y', ((dy / distance) * REACH.y * pull).toFixed(2));
      });
    };

    const rest = () => {
      cancelAnimationFrame(frame);
      logo.style.removeProperty('--look-x');
      logo.style.removeProperty('--look-y');
    };

    window.addEventListener('pointermove', look, { passive: true });
    document.documentElement.addEventListener('pointerleave', rest);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', look);
      document.documentElement.removeEventListener('pointerleave', rest);
    };
  }, []);

  return (
    <svg ref={logoRef} aria-hidden="true" focusable="false" viewBox={LOGO_VIEW_BOX} className={cn('brand-logo', className)}>
      <path className="brand-letters" d={LOGO_LETTERS} />
      <path className="brand-word" d={LOGO_WORD} transform={LOGO_WORD_TRANSFORM} />
      <g transform={LOGO_MARK_TRANSFORM}>
        <path className="brand-bubble" d={MARK_BUBBLE} />
        <path className="brand-bag" d={MARK_BAG} />
        <path className="brand-bag-handle" d={MARK_BAG_HANDLE} />
        <g className="brand-eyes">
          {MARK_EYES.map((eye) => (
            <circle key={eye.cx} className="brand-eye" {...eye} />
          ))}
        </g>
      </g>
    </svg>
  );
}

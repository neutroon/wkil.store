import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ContainerSize = 'page' | 'prose';

const sizes: Record<ContainerSize, string> = {
  page: 'max-w-page',
  prose: 'max-w-reading',
};

/** The page's one content column: centred, with the gutter on both sides. */
export function Container({ size = 'page', as: Tag = 'div', className, children }: {
  /** `page` is 1200px; `prose` is 720px, for the FAQ and other reading columns. */
  size?: ContainerSize;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn('mx-auto w-full px-gutter', sizes[size], className)}>{children}</Tag>;
}

import React, { ReactNode } from 'react';

interface CaptionPlaceholderProps {
  children: ReactNode;
}

export default function CaptionPlaceholder({ children }: CaptionPlaceholderProps) {
  return <div>{children}</div>
}

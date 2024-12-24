import React from 'react'

import { clsx } from '@/utils/clsx'

export function PageContainer({ children, withHeader, withBottomNav, noInsetTop, noInsetBottom }) {
  return (
    <div
      className={clsx(
        'page-container',
        withHeader && 'with-header',
        withBottomNav && 'with-bottom-nav',
        noInsetTop && 'no-inset-top',
        noInsetBottom && 'no-inset-bottom',
      )}
    >
      {children}
    </div>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ZHappy Life - 당신의 내일을 오늘 지켜드립니다',
  description: '가족과 미래를 위한 든든한 보장, ZHappy Life 생명보험과 함께하세요. 종신보험, 정기보험, 연금보험, 건강보험 등 다양한 보험상품을 제공합니다.',
  keywords: '생명보험, 종신보험, 정기보험, 연금보험, 건강보험, ZHappy Life',
  openGraph: {
    title: 'ZHappy Life - 당신의 내일을 오늘 지켜드립니다',
    description: '가족과 미래를 위한 든든한 보장, ZHappy Life 생명보험',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  )
}

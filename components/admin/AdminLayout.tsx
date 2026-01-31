'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (!auth) {
      router.push('/admin')
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <motion.div
        initial={false}
        animate={{ marginLeft: isCollapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="min-h-screen flex flex-col"
      >
        <AdminHeader title={title} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </motion.div>
    </div>
  )
}

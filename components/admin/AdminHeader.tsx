'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell, Search, User } from 'lucide-react'

interface AdminHeaderProps {
  title: string
}

export default function AdminHeader({ title }: AdminHeaderProps) {
  const [userName, setUserName] = useState('관리자')

  useEffect(() => {
    const user = localStorage.getItem('adminUser')
    if (user) {
      const parsed = JSON.parse(user)
      setUserName(parsed.name || '관리자')
    }
  }, [])

  return (
    <header className="glass border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="검색..."
              className="pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/20 w-64 text-sm"
            />
          </div>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors"
          >
            <Bell className="w-5 h-5 text-white/70" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </motion.button>

          {/* User */}
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-medium hidden sm:block">{userName}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

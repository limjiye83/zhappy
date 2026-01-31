'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Shield,
  LayoutDashboard,
  Package,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
} from 'lucide-react'

interface AdminSidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

const menuItems = [
  { name: '대시보드', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: '상품 관리', href: '/admin/products', icon: Package },
  { name: '상담 신청', href: '/admin/inquiries', icon: MessageSquare },
  { name: '고객 관리', href: '/admin/customers', icon: Users },
  { name: '설정', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar({ isCollapsed, setIsCollapsed }: AdminSidebarProps) {
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminUser')
    window.location.href = '/admin'
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen glass border-r border-white/10 z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg font-bold gradient-text whitespace-nowrap"
            >
              ZHappy Admin
            </motion.span>
          )}
        </Link>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        {isCollapsed ? (
          <Menu className="w-3 h-3 text-white" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-white" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-400' : ''}`} />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/60 hover:bg-white/10 hover:text-white transition-all w-full"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">로그아웃</span>}
        </button>
      </div>
    </motion.aside>
  )
}

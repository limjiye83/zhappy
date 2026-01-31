'use client'

import { motion } from 'framer-motion'
import {
  Users,
  FileText,
  TrendingUp,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Clock,
  Wallet,
  Heart,
} from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'

const stats = [
  {
    title: '총 고객 수',
    value: '15,234',
    change: '+12.5%',
    isPositive: true,
    icon: Users,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: '이번 달 상담 신청',
    value: '328',
    change: '+8.2%',
    isPositive: true,
    icon: MessageSquare,
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: '신규 계약',
    value: '156',
    change: '+23.1%',
    isPositive: true,
    icon: FileText,
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    title: '월 보험료 수입',
    value: '₩2.4억',
    change: '-3.2%',
    isPositive: false,
    icon: TrendingUp,
    color: 'from-orange-500 to-orange-600',
  },
]

const recentInquiries = [
  { id: 1, name: '김철수', product: '종신보험', date: '2024-01-15 14:30', status: '대기중' },
  { id: 2, name: '이영희', product: '연금보험', date: '2024-01-15 13:20', status: '상담완료' },
  { id: 3, name: '박민수', product: '건강보험', date: '2024-01-15 11:45', status: '대기중' },
  { id: 4, name: '정수진', product: '정기보험', date: '2024-01-15 10:15', status: '처리중' },
  { id: 5, name: '최동훈', product: '종신보험', date: '2024-01-15 09:30', status: '상담완료' },
]

const productStats = [
  { name: '종신보험', icon: Shield, count: 523, percentage: 35 },
  { name: '정기보험', icon: Clock, count: 412, percentage: 28 },
  { name: '연금보험', icon: Wallet, count: 298, percentage: 20 },
  { name: '건강보험', icon: Heart, count: 256, percentage: 17 },
]

const statusColors: Record<string, string> = {
  '대기중': 'bg-yellow-500/20 text-yellow-300',
  '처리중': 'bg-blue-500/20 text-blue-300',
  '상담완료': 'bg-emerald-500/20 text-emerald-300',
}

export default function Dashboard() {
  return (
    <AdminLayout title="대시보드">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.isPositive ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-white/60 text-sm mb-1">{stat.title}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">최근 상담 신청</h2>
            <a href="/admin/inquiries" className="text-primary-400 text-sm hover:underline">
              전체 보기
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/60 text-sm font-medium">고객명</th>
                  <th className="text-left py-3 px-4 text-white/60 text-sm font-medium">상품</th>
                  <th className="text-left py-3 px-4 text-white/60 text-sm font-medium">신청일시</th>
                  <th className="text-left py-3 px-4 text-white/60 text-sm font-medium">상태</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 text-white">{inquiry.name}</td>
                    <td className="py-3 px-4 text-white/70">{inquiry.product}</td>
                    <td className="py-3 px-4 text-white/70">{inquiry.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[inquiry.status]}`}>
                        {inquiry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Product Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6">상품별 계약 현황</h2>

          <div className="space-y-4">
            {productStats.map((product) => (
              <div key={product.name} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <product.icon className="w-5 h-5 text-white/70" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm">{product.name}</span>
                    <span className="text-white/60 text-sm">{product.count}건</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${product.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-white/60">총 계약</span>
              <span className="text-xl font-bold text-white">1,489건</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  )
}

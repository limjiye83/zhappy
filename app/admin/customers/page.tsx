'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, User, Phone, Mail, Calendar, FileText } from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'

interface Customer {
  id: number
  name: string
  phone: string
  email: string
  products: string[]
  totalPremium: number
  joinDate: string
  status: '정상' | '해지'
}

const customers: Customer[] = [
  {
    id: 1,
    name: '김철수',
    phone: '010-1234-5678',
    email: 'kim@example.com',
    products: ['종신보험', '건강보험'],
    totalPremium: 210000,
    joinDate: '2023-05-15',
    status: '정상',
  },
  {
    id: 2,
    name: '이영희',
    phone: '010-2345-6789',
    email: 'lee@example.com',
    products: ['연금보험'],
    totalPremium: 150000,
    joinDate: '2023-08-20',
    status: '정상',
  },
  {
    id: 3,
    name: '박민수',
    phone: '010-3456-7890',
    email: 'park@example.com',
    products: ['정기보험'],
    totalPremium: 80000,
    joinDate: '2022-12-10',
    status: '정상',
  },
  {
    id: 4,
    name: '정수진',
    phone: '010-4567-8901',
    email: 'jung@example.com',
    products: ['종신보험', '연금보험', '건강보험'],
    totalPremium: 380000,
    joinDate: '2021-03-25',
    status: '정상',
  },
  {
    id: 5,
    name: '최동훈',
    phone: '010-5678-9012',
    email: 'choi@example.com',
    products: ['건강보험'],
    totalPremium: 0,
    joinDate: '2023-01-05',
    status: '해지',
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.includes(searchTerm) ||
      c.phone.includes(searchTerm) ||
      c.email.includes(searchTerm)
  )

  return (
    <AdminLayout title="고객 관리">
      {/* Search */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="이름, 전화번호, 이메일 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/20"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <p className="text-white/60 text-sm mb-1">총 고객 수</p>
          <p className="text-3xl font-bold text-white">{customers.filter(c => c.status === '정상').length}명</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <p className="text-white/60 text-sm mb-1">총 계약 건수</p>
          <p className="text-3xl font-bold text-white">
            {customers.filter(c => c.status === '정상').reduce((acc, c) => acc + c.products.length, 0)}건
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <p className="text-white/60 text-sm mb-1">월 총 보험료</p>
          <p className="text-3xl font-bold text-white">
            {customers.filter(c => c.status === '정상').reduce((acc, c) => acc + c.totalPremium, 0).toLocaleString()}원
          </p>
        </motion.div>
      </div>

      {/* Customers List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">고객 정보</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">연락처</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">가입 상품</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">월 보험료</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">가입일</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">상태</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center">
                        <User className="w-5 h-5 text-white/70" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{customer.name}</p>
                        <p className="text-white/50 text-sm">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-white/70">{customer.phone}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {customer.products.map((product) => (
                        <span
                          key={product}
                          className="px-2 py-1 rounded-md bg-white/10 text-white/70 text-xs"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-white font-medium">
                    {customer.totalPremium.toLocaleString()}원
                  </td>
                  <td className="py-4 px-6 text-white/70">{customer.joinDate}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        customer.status === '정상'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AdminLayout>
  )
}

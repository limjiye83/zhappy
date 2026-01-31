'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Eye,
  Phone,
  Mail,
  Calendar,
  User,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'

interface Inquiry {
  id: number
  name: string
  phone: string
  email: string
  product: string
  age: number
  gender: string
  coverage: string
  smoker: boolean
  estimatedPremium: number
  status: '대기중' | '처리중' | '상담완료' | '취소'
  createdAt: string
  memo: string
}

const initialInquiries: Inquiry[] = [
  {
    id: 1,
    name: '김철수',
    phone: '010-1234-5678',
    email: 'kim@example.com',
    product: '종신보험',
    age: 35,
    gender: '남성',
    coverage: '1억원',
    smoker: false,
    estimatedPremium: 125000,
    status: '대기중',
    createdAt: '2024-01-15 14:30',
    memo: '',
  },
  {
    id: 2,
    name: '이영희',
    phone: '010-2345-6789',
    email: 'lee@example.com',
    product: '연금보험',
    age: 42,
    gender: '여성',
    coverage: '2억원',
    smoker: false,
    estimatedPremium: 210000,
    status: '상담완료',
    createdAt: '2024-01-15 13:20',
    memo: '상담 완료. 다음 주 계약 예정.',
  },
  {
    id: 3,
    name: '박민수',
    phone: '010-3456-7890',
    email: 'park@example.com',
    product: '건강보험',
    age: 28,
    gender: '남성',
    coverage: '5천만원',
    smoker: true,
    estimatedPremium: 85000,
    status: '대기중',
    createdAt: '2024-01-15 11:45',
    memo: '',
  },
  {
    id: 4,
    name: '정수진',
    phone: '010-4567-8901',
    email: 'jung@example.com',
    product: '정기보험',
    age: 45,
    gender: '여성',
    coverage: '3억원',
    smoker: false,
    estimatedPremium: 180000,
    status: '처리중',
    createdAt: '2024-01-15 10:15',
    memo: '1차 상담 완료. 추가 서류 요청 중.',
  },
  {
    id: 5,
    name: '최동훈',
    phone: '010-5678-9012',
    email: 'choi@example.com',
    product: '종신보험',
    age: 52,
    gender: '남성',
    coverage: '5억원',
    smoker: false,
    estimatedPremium: 450000,
    status: '상담완료',
    createdAt: '2024-01-15 09:30',
    memo: '계약 완료.',
  },
  {
    id: 6,
    name: '한미경',
    phone: '010-6789-0123',
    email: 'han@example.com',
    product: '연금보험',
    age: 38,
    gender: '여성',
    coverage: '1억원',
    smoker: false,
    estimatedPremium: 95000,
    status: '취소',
    createdAt: '2024-01-14 16:20',
    memo: '고객 요청으로 취소',
  },
]

const statusConfig = {
  '대기중': { color: 'bg-yellow-500/20 text-yellow-300', icon: AlertCircle },
  '처리중': { color: 'bg-blue-500/20 text-blue-300', icon: Clock },
  '상담완료': { color: 'bg-emerald-500/20 text-emerald-300', icon: CheckCircle },
  '취소': { color: 'bg-red-500/20 text-red-300', icon: X },
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [memo, setMemo] = useState('')

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.includes(searchTerm) ||
      inquiry.phone.includes(searchTerm) ||
      inquiry.email.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const openDetail = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry)
    setMemo(inquiry.memo)
  }

  const updateStatus = (status: Inquiry['status']) => {
    if (!selectedInquiry) return
    setInquiries(inquiries.map(i =>
      i.id === selectedInquiry.id ? { ...i, status, memo } : i
    ))
    setSelectedInquiry({ ...selectedInquiry, status, memo })
  }

  const saveMemo = () => {
    if (!selectedInquiry) return
    setInquiries(inquiries.map(i =>
      i.id === selectedInquiry.id ? { ...i, memo } : i
    ))
    setSelectedInquiry({ ...selectedInquiry, memo })
  }

  const statusCounts = {
    all: inquiries.length,
    '대기중': inquiries.filter(i => i.status === '대기중').length,
    '처리중': inquiries.filter(i => i.status === '처리중').length,
    '상담완료': inquiries.filter(i => i.status === '상담완료').length,
    '취소': inquiries.filter(i => i.status === '취소').length,
  }

  return (
    <AdminLayout title="상담 신청 관리">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-6">
        <div className="flex flex-wrap gap-2">
          {(['all', '대기중', '처리중', '상담완료', '취소'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                statusFilter === status
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {status === 'all' ? '전체' : status}
              <span className="ml-2 px-2 py-0.5 rounded-full bg-white/10 text-xs">
                {statusCounts[status]}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-80">
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

      {/* Inquiries Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">고객 정보</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">상품</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">보장금액</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">예상 보험료</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">신청일시</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">상태</th>
                <th className="text-center py-4 px-6 text-white/60 text-sm font-medium">상세</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((inquiry, index) => {
                const StatusIcon = statusConfig[inquiry.status].icon
                return (
                  <motion.tr
                    key={inquiry.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-white font-medium">{inquiry.name}</p>
                        <p className="text-white/50 text-sm">{inquiry.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white/70">{inquiry.product}</td>
                    <td className="py-4 px-6 text-white/70">{inquiry.coverage}</td>
                    <td className="py-4 px-6 text-white font-medium">
                      {inquiry.estimatedPremium.toLocaleString()}원
                    </td>
                    <td className="py-4 px-6 text-white/70">{inquiry.createdAt}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[inquiry.status].color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openDetail(inquiry)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <Eye className="w-4 h-4 text-white/70" />
                      </motion.button>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredInquiries.length === 0 && (
          <div className="py-12 text-center text-white/50">
            검색 결과가 없습니다.
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedInquiry(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl glass-card p-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedInquiry(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <h2 className="text-xl font-bold text-white mb-6">상담 신청 상세</h2>

              {/* Customer Info */}
              <div className="glass p-4 rounded-xl mb-6">
                <h3 className="text-white/60 text-sm mb-3">고객 정보</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-white/40" />
                    <div>
                      <p className="text-white font-medium">{selectedInquiry.name}</p>
                      <p className="text-white/50 text-sm">{selectedInquiry.age}세 · {selectedInquiry.gender}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-white/40" />
                    <p className="text-white">{selectedInquiry.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-white/40" />
                    <p className="text-white">{selectedInquiry.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-white/40" />
                    <p className="text-white">{selectedInquiry.createdAt}</p>
                  </div>
                </div>
              </div>

              {/* Insurance Info */}
              <div className="glass p-4 rounded-xl mb-6">
                <h3 className="text-white/60 text-sm mb-3">보험 정보</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-white/50 text-sm">상품</p>
                    <p className="text-white font-medium">{selectedInquiry.product}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">보장금액</p>
                    <p className="text-white font-medium">{selectedInquiry.coverage}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">흡연 여부</p>
                    <p className="text-white font-medium">{selectedInquiry.smoker ? '흡연' : '비흡연'}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">예상 월 보험료</p>
                    <p className="text-white font-medium text-lg">
                      {selectedInquiry.estimatedPremium.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div className="mb-6">
                <h3 className="text-white/60 text-sm mb-3">상태 변경</h3>
                <div className="flex flex-wrap gap-2">
                  {(['대기중', '처리중', '상담완료', '취소'] as const).map((status) => {
                    const StatusIcon = statusConfig[status].icon
                    return (
                      <button
                        key={status}
                        onClick={() => updateStatus(status)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          selectedInquiry.status === status
                            ? statusConfig[status].color
                            : 'bg-white/10 text-white/60 hover:bg-white/15'
                        }`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {status}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Memo */}
              <div className="mb-6">
                <h3 className="text-white/60 text-sm mb-3">메모</h3>
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  rows={3}
                  placeholder="상담 내용이나 메모를 입력하세요..."
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 resize-none"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveMemo}
                  className="mt-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors"
                >
                  메모 저장
                </motion.button>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="flex-1 py-3 rounded-xl glass-button font-medium flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  전화하기
                </a>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="flex-1 py-3 rounded-xl glass-button-primary font-medium flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  이메일 보내기
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  )
}

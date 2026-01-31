'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Shield,
  Clock,
  Wallet,
  Heart,
  X,
  Check,
} from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'

interface Product {
  id: number
  name: string
  type: string
  icon: string
  description: string
  minAge: number
  maxAge: number
  minCoverage: string
  maxCoverage: string
  baseRate: number
  isActive: boolean
}

const iconMap: Record<string, any> = {
  Shield,
  Clock,
  Wallet,
  Heart,
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: '종신보험',
    type: 'whole',
    icon: 'Shield',
    description: '평생 동안 사랑하는 가족을 지키는 든든한 보장',
    minAge: 19,
    maxAge: 65,
    minCoverage: '5천만원',
    maxCoverage: '10억원',
    baseRate: 0.0025,
    isActive: true,
  },
  {
    id: 2,
    name: '정기보험',
    type: 'term',
    icon: 'Clock',
    description: '필요한 기간만큼 합리적인 보험료로 가입',
    minAge: 19,
    maxAge: 70,
    minCoverage: '5천만원',
    maxCoverage: '5억원',
    baseRate: 0.0008,
    isActive: true,
  },
  {
    id: 3,
    name: '연금보험',
    type: 'pension',
    icon: 'Wallet',
    description: '노후 생활의 안정을 위한 똑똑한 준비',
    minAge: 19,
    maxAge: 60,
    minCoverage: '1억원',
    maxCoverage: '10억원',
    baseRate: 0.0015,
    isActive: true,
  },
  {
    id: 4,
    name: '건강보험',
    type: 'health',
    icon: 'Heart',
    description: '질병과 사고로부터 당신의 건강을 지킵니다',
    minAge: 19,
    maxAge: 75,
    minCoverage: '3천만원',
    maxCoverage: '3억원',
    baseRate: 0.0012,
    isActive: true,
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    icon: 'Shield',
    description: '',
    minAge: 19,
    maxAge: 65,
    minCoverage: '',
    maxCoverage: '',
    baseRate: 0.001,
    isActive: true,
  })

  const filteredProducts = products.filter(
    (p) =>
      p.name.includes(searchTerm) ||
      p.description.includes(searchTerm)
  )

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        type: product.type,
        icon: product.icon,
        description: product.description,
        minAge: product.minAge,
        maxAge: product.maxAge,
        minCoverage: product.minCoverage,
        maxCoverage: product.maxCoverage,
        baseRate: product.baseRate,
        isActive: product.isActive,
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name: '',
        type: '',
        icon: 'Shield',
        description: '',
        minAge: 19,
        maxAge: 65,
        minCoverage: '',
        maxCoverage: '',
        baseRate: 0.001,
        isActive: true,
      })
    }
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id
          ? { ...p, ...formData }
          : p
      ))
    } else {
      const newProduct: Product = {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...formData,
      }
      setProducts([...products, newProduct])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const toggleActive = (id: number) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ))
  }

  return (
    <AdminLayout title="상품 관리">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="상품 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/20"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openModal()}
          className="glass-button-primary flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium"
        >
          <Plus className="w-4 h-4" />
          상품 추가
        </motion.button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProducts.map((product, index) => {
          const Icon = iconMap[product.icon] || Shield
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-card p-6 ${!product.isActive ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                    <p className="text-white/60 text-sm">{product.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleActive(product.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.isActive
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-white/10 text-white/50'
                  }`}
                >
                  {product.isActive ? '활성' : '비활성'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-white/50">가입 연령</p>
                  <p className="text-white">{product.minAge}세 ~ {product.maxAge}세</p>
                </div>
                <div>
                  <p className="text-white/50">보장 금액</p>
                  <p className="text-white">{product.minCoverage} ~ {product.maxCoverage}</p>
                </div>
                <div>
                  <p className="text-white/50">기본 요율</p>
                  <p className="text-white">{(product.baseRate * 100).toFixed(2)}%</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-white/10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal(product)}
                  className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white/70 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  수정
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  삭제
                </motion.button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg glass-card p-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <h2 className="text-xl font-bold text-white mb-6">
                {editingProduct ? '상품 수정' : '상품 추가'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-white/70 text-sm mb-2 block">상품명</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">설명</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">최소 가입 연령</label>
                    <input
                      type="number"
                      value={formData.minAge}
                      onChange={(e) => setFormData({ ...formData, minAge: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">최대 가입 연령</label>
                    <input
                      type="number"
                      value={formData.maxAge}
                      onChange={(e) => setFormData({ ...formData, maxAge: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">최소 보장금액</label>
                    <input
                      type="text"
                      value={formData.minCoverage}
                      onChange={(e) => setFormData({ ...formData, minCoverage: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">최대 보장금액</label>
                    <input
                      type="text"
                      value={formData.maxCoverage}
                      onChange={(e) => setFormData({ ...formData, maxCoverage: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">기본 요율 (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={(formData.baseRate * 100).toFixed(2)}
                    onChange={(e) => setFormData({ ...formData, baseRate: parseFloat(e.target.value) / 100 })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-white">활성화 상태</span>
                  <button
                    onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      formData.isActive ? 'bg-primary-500' : 'bg-white/20'
                    }`}
                  >
                    <motion.div
                      initial={false}
                      animate={{ x: formData.isActive ? 24 : 0 }}
                      className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"
                    />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl glass-button font-medium"
                >
                  취소
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="flex-1 py-3 rounded-xl glass-button-primary font-medium flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  저장
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  )
}

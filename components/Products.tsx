'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, Wallet, Heart } from 'lucide-react'
import ProductCard from './ProductCard'

const products = [
  {
    icon: Shield,
    title: '종신보험',
    description: '평생 동안 사랑하는 가족을 지키는 든든한 보장',
    features: [
      '사망보험금 최대 10억원',
      '재해사망 추가보장',
      '보험료 납입면제 특약',
      '유족연금 전환 가능',
    ],
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    icon: Clock,
    title: '정기보험',
    description: '필요한 기간만큼 합리적인 보험료로 가입',
    features: [
      '최대 30년 보장기간',
      '저렴한 보험료',
      '갱신형/비갱신형 선택',
      '체증형 옵션 제공',
    ],
    gradient: 'from-purple-500 to-purple-700',
  },
  {
    icon: Wallet,
    title: '연금보험',
    description: '노후 생활의 안정을 위한 똑똑한 준비',
    features: [
      '평생연금 지급',
      '비과세 혜택',
      '중도인출 가능',
      '상속연금 옵션',
    ],
    gradient: 'from-pink-500 to-pink-700',
  },
  {
    icon: Heart,
    title: '건강보험',
    description: '질병과 사고로부터 당신의 건강을 지킵니다',
    features: [
      '3대 질병 집중보장',
      '실손의료비 보장',
      '입원/수술비 특약',
      '건강관리 서비스',
    ],
    gradient: 'from-emerald-500 to-emerald-700',
  },
]

export default function Products() {
  return (
    <section id="products" className="py-20 sm:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full glass text-sm text-white/70 mb-4"
          >
            보험상품
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="gradient-text">당신에게 맞는</span>
            <br />
            <span className="text-white">보험을 찾아보세요</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            ZHappy Life의 다양한 보험상품으로
            <br className="sm:hidden" />
            완벽한 보장을 설계하세요
          </motion.p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.title} {...product} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="glass-card inline-block p-8 sm:p-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              어떤 보험이 필요한지 모르시겠나요?
            </h3>
            <p className="text-white/60 mb-6">
              전문 상담사가 맞춤형 보험을 추천해드립니다
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-button-primary px-8 py-3 rounded-xl font-semibold"
            >
              무료 상담 받기
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

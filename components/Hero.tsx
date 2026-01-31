'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, MessageCircle, Users, Award, TrendingUp } from 'lucide-react'
import InsuranceCalculatorModal from './InsuranceCalculatorModal'

const stats = [
  { icon: Users, value: '150만+', label: '고객 수' },
  { icon: Award, value: '25년', label: '업력' },
  { icon: TrendingUp, value: '98.5%', label: '지급률' },
]

export default function Hero() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-primary-500/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-secondary-500/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-gradient-to-br from-pink-500/15 to-transparent blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">당신의 내일을</span>
            <br />
            <span className="text-white text-shadow">오늘 지켜드립니다</span>
          </motion.h1>

          {/* Sub heading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-lg sm:text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto"
          >
            가족과 미래를 위한 든든한 보장,
            <br className="sm:hidden" />
            ZHappy Life와 함께하세요
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCalculatorOpen(true)}
              className="glass-button-primary flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold w-full sm:w-auto"
            >
              <Calculator className="w-5 h-5" />
              보험료 계산하기
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="glass-button flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              무료 상담 신청
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass-card p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/30 to-secondary-500/30 mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Insurance Calculator Modal */}
      <InsuranceCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { ArrowRight, LucideIcon } from 'lucide-react'

interface ProductCardProps {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  gradient: string
  index: number
}

export default function ProductCard({
  icon: Icon,
  title,
  description,
  features,
  gradient,
  index,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="glass-card p-6 sm:p-8 group cursor-pointer"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${gradient} mb-6 shadow-lg`}
      >
        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
      </motion.div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{title}</h3>

      {/* Description */}
      <p className="text-white/60 mb-6 leading-relaxed">{description}</p>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-2 text-white/70 text-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400" />
            {feature}
          </motion.li>
        ))}
      </ul>

      {/* CTA Button */}
      <motion.button
        whileHover={{ x: 4 }}
        className="flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors group"
      >
        자세히 보기
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </motion.button>
    </motion.div>
  )
}

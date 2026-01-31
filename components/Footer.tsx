'use client'

import { motion } from 'framer-motion'
import { Shield, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'

const footerLinks = {
  products: [
    { name: '종신보험', href: '#' },
    { name: '정기보험', href: '#' },
    { name: '연금보험', href: '#' },
    { name: '건강보험', href: '#' },
  ],
  support: [
    { name: '자주 묻는 질문', href: '#' },
    { name: '보험금 청구', href: '#' },
    { name: '계약 변경', href: '#' },
    { name: '상담 예약', href: '#' },
  ],
  company: [
    { name: '회사 소개', href: '#' },
    { name: '채용 정보', href: '#' },
    { name: '뉴스룸', href: '#' },
    { name: '투자 정보', href: '#' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'Youtube' },
]

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 px-4">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="glass rounded-3xl p-8 sm:p-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.a
                href="#"
                className="flex items-center gap-2 mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">ZHappy Life</span>
              </motion.a>
              <p className="text-white/60 mb-6 leading-relaxed">
                ZHappy Life는 고객의 행복한 내일을 위해
                <br />
                최선의 보장을 제공합니다.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:1588-0000"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>1588-0000</span>
                </a>
                <a
                  href="mailto:support@zhappylife.com"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>support@zhappylife.com</span>
                </a>
                <div className="flex items-start gap-3 text-white/70">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>서울특별시 강남구 테헤란로 123</span>
                </div>
              </div>
            </div>

            {/* Products Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">보험상품</h4>
              <ul className="space-y-3">
                {footerLinks.products.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">고객지원</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">회사정보</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-8" />

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-white/50 text-sm text-center sm:text-left">
              <p>&copy; 2024 ZHappy Life Insurance. All rights reserved.</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white/70" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="text-center text-white/40 text-xs space-y-2">
          <p>
            ZHappy생명보험주식회사 | 대표이사: 홍길동 | 사업자등록번호: 123-45-67890
          </p>
          <p>
            <a href="#" className="hover:text-white/60 transition-colors">
              개인정보처리방침
            </a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-white/60 transition-colors">
              이용약관
            </a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-white/60 transition-colors">
              보험약관
            </a>
          </p>
          <p className="mt-4">
            보험계약 체결 전 상품설명서 및 약관을 반드시 확인하시기 바랍니다.
          </p>
        </div>
      </div>
    </footer>
  )
}

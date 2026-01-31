'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, Bell, Globe, Save, Shield } from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    name: '관리자',
    email: 'admin@zhappylife.com',
    phone: '02-1234-5678',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    smsNotifications: false,
    siteName: 'ZHappy Life',
    siteDescription: '당신의 내일을 오늘 지켜드립니다',
    contactEmail: 'support@zhappylife.com',
    contactPhone: '1588-0000',
  })

  const tabs = [
    { id: 'profile', name: '프로필', icon: User },
    { id: 'security', name: '보안', icon: Lock },
    { id: 'notifications', name: '알림', icon: Bell },
    { id: 'site', name: '사이트', icon: Globe },
  ]

  const handleSave = () => {
    alert('설정이 저장되었습니다.')
  }

  return (
    <AdminLayout title="설정">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="glass-card p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-white/15 text-white'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-primary-400' : ''}`} />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">프로필 설정</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors">
                      이미지 변경
                    </button>
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">이름</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">이메일</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">전화번호</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">보안 설정</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">현재 비밀번호</label>
                    <input
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">새 비밀번호</label>
                    <input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">새 비밀번호 확인</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">알림 설정</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <p className="text-white font-medium">이메일 알림</p>
                      <p className="text-white/50 text-sm">새로운 상담 신청 시 이메일 알림</p>
                    </div>
                    <button
                      onClick={() => setFormData({ ...formData, emailNotifications: !formData.emailNotifications })}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        formData.emailNotifications ? 'bg-primary-500' : 'bg-white/20'
                      }`}
                    >
                      <motion.div
                        initial={false}
                        animate={{ x: formData.emailNotifications ? 24 : 0 }}
                        className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <p className="text-white font-medium">SMS 알림</p>
                      <p className="text-white/50 text-sm">새로운 상담 신청 시 SMS 알림</p>
                    </div>
                    <button
                      onClick={() => setFormData({ ...formData, smsNotifications: !formData.smsNotifications })}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        formData.smsNotifications ? 'bg-primary-500' : 'bg-white/20'
                      }`}
                    >
                      <motion.div
                        initial={false}
                        animate={{ x: formData.smsNotifications ? 24 : 0 }}
                        className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Site Tab */}
            {activeTab === 'site' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">사이트 설정</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">사이트 이름</label>
                    <input
                      type="text"
                      value={formData.siteName}
                      onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">사이트 설명</label>
                    <textarea
                      value={formData.siteDescription}
                      onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">고객센터 이메일</label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">고객센터 전화번호</label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="glass-button-primary px-6 py-3 rounded-xl font-medium flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                변경사항 저장
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  )
}

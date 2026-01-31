'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Shield, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simple authentication (in production, use proper auth)
    await new Promise(resolve => setTimeout(resolve, 800))

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true')
      localStorage.setItem('adminUser', JSON.stringify({ username: 'admin', name: '관리자' }))
      router.push('/admin/dashboard')
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 mb-4"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">ZHappy Life 관리자</h1>
          <p className="text-white/60">관리자 계정으로 로그인하세요</p>
        </div>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleLogin}
          className="glass-card p-8"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 mb-6"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-white/70 text-sm mb-2 block">아이디</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="아이디를 입력하세요"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-white/70 text-sm mb-2 block">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all ${
              isLoading
                ? 'bg-white/20 text-white/60 cursor-not-allowed'
                : 'glass-button-primary'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                로그인 중...
              </span>
            ) : (
              '로그인'
            )}
          </motion.button>

          <p className="text-center text-white/40 text-sm mt-6">
            테스트 계정: admin / admin123
          </p>
        </motion.form>
      </motion.div>
    </div>
  )
}

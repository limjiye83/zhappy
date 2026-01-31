'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calculator, Shield, Clock, Wallet, Heart, ChevronRight, Check } from 'lucide-react'

interface InsuranceCalculatorModalProps {
  isOpen: boolean
  onClose: () => void
}

type InsuranceType = 'whole' | 'term' | 'pension' | 'health'
type Gender = 'male' | 'female'

const insuranceTypes = [
  { id: 'whole' as InsuranceType, name: '종신보험', icon: Shield, baseRate: 0.0025 },
  { id: 'term' as InsuranceType, name: '정기보험', icon: Clock, baseRate: 0.0008 },
  { id: 'pension' as InsuranceType, name: '연금보험', icon: Wallet, baseRate: 0.0015 },
  { id: 'health' as InsuranceType, name: '건강보험', icon: Heart, baseRate: 0.0012 },
]

const coverageOptions = [
  { value: 50000000, label: '5천만원' },
  { value: 100000000, label: '1억원' },
  { value: 200000000, label: '2억원' },
  { value: 300000000, label: '3억원' },
  { value: 500000000, label: '5억원' },
  { value: 1000000000, label: '10억원' },
]

export default function InsuranceCalculatorModal({ isOpen, onClose }: InsuranceCalculatorModalProps) {
  const [step, setStep] = useState(1)
  const [insuranceType, setInsuranceType] = useState<InsuranceType | null>(null)
  const [gender, setGender] = useState<Gender | null>(null)
  const [age, setAge] = useState('')
  const [coverage, setCoverage] = useState<number | null>(null)
  const [isSmoker, setIsSmoker] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  const resetForm = () => {
    setStep(1)
    setInsuranceType(null)
    setGender(null)
    setAge('')
    setCoverage(null)
    setIsSmoker(false)
    setResult(null)
  }

  const handleClose = () => {
    onClose()
    setTimeout(resetForm, 300)
  }

  const calculatePremium = () => {
    if (!insuranceType || !gender || !age || !coverage) return

    const selectedType = insuranceTypes.find(t => t.id === insuranceType)
    if (!selectedType) return

    const ageNum = parseInt(age)
    let baseRate = selectedType.baseRate

    // Age factor
    if (ageNum < 30) baseRate *= 0.7
    else if (ageNum < 40) baseRate *= 0.85
    else if (ageNum < 50) baseRate *= 1.0
    else if (ageNum < 60) baseRate *= 1.3
    else baseRate *= 1.6

    // Gender factor
    if (gender === 'male') baseRate *= 1.1

    // Smoker factor
    if (isSmoker) baseRate *= 1.25

    const monthlyPremium = Math.round(coverage * baseRate / 12)
    setResult(monthlyPremium)
    setStep(4)
  }

  const canProceedStep2 = insuranceType !== null
  const canProceedStep3 = gender !== null && age !== '' && parseInt(age) >= 19 && parseInt(age) <= 80
  const canCalculate = coverage !== null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg glass-card p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">보험료 계산기</h2>
                <p className="text-white/60 text-sm">예상 월 보험료를 확인해보세요</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: step >= s ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                  />
                </div>
              ))}
            </div>

            {/* Step 1: Insurance Type */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">어떤 보험을 찾으시나요?</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {insuranceTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setInsuranceType(type.id)}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        insuranceType === type.id
                          ? 'bg-white/20 border-white/40'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <type.icon className={`w-6 h-6 mb-2 ${insuranceType === type.id ? 'text-primary-400' : 'text-white/60'}`} />
                      <span className="text-white font-medium">{type.name}</span>
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => canProceedStep2 && setStep(2)}
                  disabled={!canProceedStep2}
                  className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    canProceedStep2
                      ? 'glass-button-primary'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                >
                  다음
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}

            {/* Step 2: Personal Info */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">기본 정보를 입력해주세요</h3>

                {/* Gender */}
                <div className="mb-4">
                  <label className="text-white/70 text-sm mb-2 block">성별</label>
                  <div className="flex gap-3">
                    {[
                      { id: 'male' as Gender, label: '남성' },
                      { id: 'female' as Gender, label: '여성' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setGender(g.id)}
                        className={`flex-1 py-3 rounded-xl border transition-all ${
                          gender === g.id
                            ? 'bg-white/20 border-white/40'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-white font-medium">{g.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age */}
                <div className="mb-4">
                  <label className="text-white/70 text-sm mb-2 block">나이 (만 19세 ~ 80세)</label>
                  <input
                    type="number"
                    min="19"
                    max="80"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="나이를 입력하세요"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                {/* Smoker */}
                <div className="mb-6">
                  <label className="text-white/70 text-sm mb-2 block">흡연 여부</label>
                  <button
                    onClick={() => setIsSmoker(!isSmoker)}
                    className={`w-full py-3 px-4 rounded-xl border transition-all flex items-center justify-between ${
                      isSmoker
                        ? 'bg-white/20 border-white/40'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-white">{isSmoker ? '흡연자입니다' : '비흡연자입니다'}</span>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center ${isSmoker ? 'bg-primary-500' : 'bg-white/20'}`}>
                      {isSmoker && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 rounded-xl glass-button font-semibold"
                  >
                    이전
                  </button>
                  <motion.button
                    whileHover={{ scale: canProceedStep3 ? 1.02 : 1 }}
                    whileTap={{ scale: canProceedStep3 ? 0.98 : 1 }}
                    onClick={() => canProceedStep3 && setStep(3)}
                    disabled={!canProceedStep3}
                    className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      canProceedStep3
                        ? 'glass-button-primary'
                        : 'bg-white/10 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    다음
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Coverage */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">보장 금액을 선택하세요</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {coverageOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCoverage(option.value)}
                      className={`p-4 rounded-xl border transition-all ${
                        coverage === option.value
                          ? 'bg-white/20 border-white/40'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-white font-medium">{option.label}</span>
                    </motion.button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 rounded-xl glass-button font-semibold"
                  >
                    이전
                  </button>
                  <motion.button
                    whileHover={{ scale: canCalculate ? 1.02 : 1 }}
                    whileTap={{ scale: canCalculate ? 0.98 : 1 }}
                    onClick={calculatePremium}
                    disabled={!canCalculate}
                    className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      canCalculate
                        ? 'glass-button-primary'
                        : 'bg-white/10 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    <Calculator className="w-4 h-4" />
                    계산하기
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Result */}
            {step === 4 && result !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-lg font-semibold text-white mb-2">예상 월 보험료</h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl sm:text-5xl font-bold gradient-text mb-2"
                >
                  {result.toLocaleString()}원
                </motion.p>
                <p className="text-white/50 text-sm mb-6">
                  {insuranceTypes.find(t => t.id === insuranceType)?.name} · {coverage?.toLocaleString()}원 보장
                </p>

                <div className="glass p-4 rounded-xl mb-6 text-left">
                  <p className="text-white/70 text-sm">
                    ※ 본 계산 결과는 예상 금액이며, 실제 보험료는 상품 및 가입 조건에 따라 달라질 수 있습니다.
                    정확한 보험료는 전문 상담을 통해 확인해주세요.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={resetForm}
                    className="flex-1 py-3 rounded-xl glass-button font-semibold"
                  >
                    다시 계산
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    className="flex-1 py-3 rounded-xl glass-button-primary font-semibold"
                  >
                    상담 신청
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

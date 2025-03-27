"use client"

import { useState } from "react"
import { CreditCard, DollarSign, Percent, Calendar } from "lucide-react"

export function LoanSection() {
  const [loanAmount, setLoanAmount] = useState(25000)
  const [interestRate, setInterestRate] = useState(5.5)
  const [loanTerm, setLoanTerm] = useState(36)

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = loanAmount
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm

    if (monthlyRate === 0) return principal / numberOfPayments

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    return monthlyPayment
  }

  const monthlyPayment = calculateMonthlyPayment()
  const totalPayment = monthlyPayment * loanTerm
  const totalInterest = totalPayment - loanAmount

  // Loan types
  const loanTypes = [
    { name: "Personal Loan", rate: "5.49%", term: "1-5 years", minAmount: "$1,000" },
    { name: "Auto Loan", rate: "3.99%", term: "1-7 years", minAmount: "$5,000" },
    { name: "Home Loan", rate: "6.25%", term: "15-30 years", minAmount: "$50,000" },
    { name: "Education Loan", rate: "4.75%", term: "5-15 years", minAmount: "$10,000" },
  ]

  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-purple-500" />
          Loan Calculator
        </h2>
        <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm">
          Apply for Loan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Loan Calculator */}
        <div className="lg:col-span-2 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-medium mb-4">Calculate Your Loan</h3>

          <div className="grid gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Loan Amount: ${loanAmount.toLocaleString()}</label>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$1,000</span>
                <span>$100,000</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Interest Rate: {interestRate}%</label>
              <input
                type="range"
                min="1"
                max="20"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1%</span>
                <span>20%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Loan Term: {loanTerm} months</label>
              <input
                type="range"
                min="12"
                max="120"
                step="12"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>12 months</span>
                <span>120 months</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Monthly Payment</div>
              <div className="text-xl font-semibold">${monthlyPayment.toFixed(2)}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Total Payment</div>
              <div className="text-xl font-semibold">${totalPayment.toFixed(2)}</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Total Interest</div>
              <div className="text-xl font-semibold">${totalInterest.toFixed(2)}</div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium">
            Get Pre-Approved
          </button>
        </div>

        {/* Loan Types */}
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-medium mb-4">Loan Types</h3>

          <div className="space-y-4">
            {loanTypes.map((loan) => (
              <div
                key={loan.name}
                className="border border-gray-800 rounded-lg p-4 hover:border-purple-900/50 transition-colors"
              >
                <div className="font-medium mb-2">{loan.name}</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Percent className="w-4 h-4" />
                    <span>{loan.rate}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{loan.term}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 col-span-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Min: {loan.minAmount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


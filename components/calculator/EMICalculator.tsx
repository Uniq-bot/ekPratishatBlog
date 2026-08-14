"use client";

import React, { useState } from "react";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState("150000");
  const [interestRate, setInterestRate] = useState("10");
  const [loanTenure, setLoanTenure] = useState("5");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "NPR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateEMI = () => {
    const principal = Number(loanAmount);
    const annualInterestRate = Number(interestRate);
    const years = Number(loanTenure);

    if (
      !principal ||
      principal <= 0 ||
      !annualInterestRate ||
      annualInterestRate <= 0 ||
      !years ||
      years <= 0
    ) {
      return {
        emi: 0,
        totalPayment: 0,
        totalInterest: 0,
      };
    }

    // Annual interest rate → monthly decimal rate
    const monthlyInterestRate = annualInterestRate / 12 / 100;

    // Years → months
    const numberOfPayments = years * 12;

    // EMI formula
    const emi =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalPayment = emi * numberOfPayments;

    const totalInterest = totalPayment - principal;

    return {
      emi,
      totalPayment,
      totalInterest,
    };
  };

  const emiData = calculateEMI();

  const handleReset = () => {
    setLoanAmount("150000");
    setInterestRate("10");
    setLoanTenure("5");
  };

  return (
    <div className="w-full bg-slate-100 p-6 md:p-10">
      <div className="mx-auto max-w-5xl overflow-hidden bg-white shadow-xl">

        {/* Header */}
        <div className="bg-slate-900 px-6 py-8 text-white md:px-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-slate-400">
            Financial Planning
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            EMI Calculator
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Calculate your monthly loan payment, total interest, and total
            repayment amount.
          </p>
        </div>

        <div className="grid md:grid-cols-2">

          {/* Inputs */}
          <div className="p-6 md:p-10">

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900">
                Loan Details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter your loan information below.
              </p>
            </div>

            <div className="space-y-6">

              {/* Loan Amount */}
              <div>
                <label
                  htmlFor="loanAmount"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Loan Amount
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                    Rs.
                  </span>

                  <input
                    type="number"
                    id="loanAmount"
                    min="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10"
                    placeholder="150000"
                  />
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label
                  htmlFor="interestRate"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Annual Interest Rate
                </label>

                <div className="relative">
                  <input
                    type="number"
                    id="interestRate"
                    min="0"
                    max="100"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full border border-slate-200 bg-slate-50 py-3 pl-4 pr-12 text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10"
                    placeholder="10"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                    %
                  </span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Loan Tenure
                </label>

                <div className="relative">
                  <input
                    type="number"
                    id="loanTenure"
                    min="1"
                    max="50"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                    className="w-full border border-slate-200 bg-slate-50 py-3 pl-4 pr-20 text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10"
                    placeholder="5"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                    Years
                  </span>
                </div>
              </div>

              {/* Reset */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="bg-slate-50 p-6 md:p-10">

            <div className="mb-8">
              <p className="text-sm font-medium text-slate-500">
                Your estimated monthly EMI
              </p>

              <div className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                {formatCurrency(emiData.emi)}
              </div>

              <p className="mt-2 text-sm text-slate-500">
                per month
              </p>
            </div>

            {/* Summary */}
            <div className="space-y-4">

              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-sm text-slate-500">
                  Loan Amount
                </span>

                <span className="font-semibold text-slate-900">
                  {loanAmount
                    ? formatCurrency(Number(loanAmount))
                    : "Rs. 0"}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-sm text-slate-500">
                  Interest Rate
                </span>

                <span className="font-semibold text-slate-900">
                  {interestRate || "0"}%
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-sm text-slate-500">
                  Loan Tenure
                </span>

                <span className="font-semibold text-slate-900">
                  {loanTenure || "0"} years
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-sm text-slate-500">
                  Total Interest
                </span>

                <span className="font-semibold text-red-600">
                  {formatCurrency(emiData.totalInterest)}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-medium text-slate-700">
                  Total Repayment
                </span>

                <span className="text-lg font-bold text-slate-900">
                  {formatCurrency(emiData.totalPayment)}
                </span>
              </div>
            </div>

            <div className="mt-8 bg-white p-5 ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Calculation
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                EMI is calculated using the reducing-balance method based on
                your loan amount, annual interest rate, and loan tenure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
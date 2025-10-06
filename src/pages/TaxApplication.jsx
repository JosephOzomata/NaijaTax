// src/pages/TaxApplication.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaHome, 
  FaHeart,
  FaGraduationCap,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa';

const TaxApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    nin: '',
    dateOfBirth: '',
    phone: '',
    
    // Income Information
    basicSalary: '',
    housingAllowance: '',
    transportAllowance: '',
    otherAllowances: '',
    
    // Simple Deductions
    pensionContribution: '',
    nhfContribution: '',
    lifeInsurance: '',
    
    // Simple Additional Info
    hasDependents: false,
    numberOfDependents: 0,
    isDisabled: false
  });
  
  const [taxResult, setTaxResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('taxUser');
    if (!userData) {
      navigate('/login');
      return;
    }
    const userObj = JSON.parse(userData);
    setUser(userObj);
    // Pre-fill some data from user profile
    setFormData(prev => ({
      ...prev,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      basicSalary: userObj.income
    }));
  }, [navigate]);

  const steps = [
    { number: 1, title: "Personal Info", icon: <FaUser /> },
    { number: 2, title: "Income", icon: <FaUser /> },
    { number: 3, title: "Deductions", icon: <FaHome /> },
    { number: 4, title: "Review", icon: <FaCheckCircle /> }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateTax = () => {
    // Simplified Nigerian PAYE Tax Calculation
    const basicSalary = parseFloat(formData.basicSalary) || 0;
    const housingAllowance = parseFloat(formData.housingAllowance) || 0;
    const transportAllowance = parseFloat(formData.transportAllowance) || 0;
    const otherAllowances = parseFloat(formData.otherAllowances) || 0;

    // Total gross income
    const grossIncome = basicSalary + housingAllowance + transportAllowance + otherAllowances;

    // Allowable deductions (simplified)
    const pension = parseFloat(formData.pensionContribution) || 0;
    const nhf = parseFloat(formData.nhfContribution) || 0;
    const lifeInsurance = parseFloat(formData.lifeInsurance) || 0;
    
    // Consolidated relief allowance (CRA) - 1% of gross income or ₦200,000 whichever is higher + 20% of gross
    const cra1 = Math.max(grossIncome * 0.01, 200000);
    const cra2 = grossIncome * 0.20;
    const totalCRA = cra1 + cra2;

    // Other deductions
    const totalDeductions = pension + nhf + lifeInsurance;

    // Chargeable income
    const chargeableIncome = Math.max(0, grossIncome - totalCRA - totalDeductions);

    // Nigerian tax bands (2024 rates - simplified)
    let tax = 0;
    
    if (chargeableIncome > 0) {
      if (chargeableIncome <= 300000) {
        tax = chargeableIncome * 0.07;
      } else if (chargeableIncome <= 600000) {
        tax = 21000 + (chargeableIncome - 300000) * 0.11;
      } else if (chargeableIncome <= 1100000) {
        tax = 54000 + (chargeableIncome - 600000) * 0.15;
      } else if (chargeableIncome <= 1600000) {
        tax = 129000 + (chargeableIncome - 1100000) * 0.19;
      } else {
        tax = 224000 + (chargeableIncome - 1600000) * 0.21;
      }
    }

    // Personal allowance for dependents
    const dependentAllowance = (parseInt(formData.numberOfDependents) || 0) * 2500;
    const disabilityAllowance = formData.isDisabled ? 50000 : 0;

    const finalTax = Math.max(0, tax - dependentAllowance - disabilityAllowance);
    const effectiveTaxRate = grossIncome > 0 ? (finalTax / grossIncome) * 100 : 0;

    setTaxResult({
      grossIncome,
      totalDeductions,
      chargeableIncome,
      finalTax,
      effectiveTaxRate,
      monthlyTax: finalTax / 12,
      netIncome: grossIncome - finalTax
    });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateTax();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NIN (National Identification Number)
                </label>
                <input
                  type="text"
                  name="nin"
                  value={formData.nin}
                  onChange={handleChange}
                  placeholder="Enter your NIN"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="080XXXXXXXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Income Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Basic Salary (₦)
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  value={formData.basicSalary}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Housing Allowance (₦)
                </label>
                <input
                  type="number"
                  name="housingAllowance"
                  value={formData.housingAllowance}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transport Allowance (₦)
                </label>
                <input
                  type="number"
                  name="transportAllowance"
                  value={formData.transportAllowance}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Allowances (₦)
                </label>
                <input
                  type="number"
                  name="otherAllowances"
                  value={formData.otherAllowances}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Deductions & Allowances</h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pension Contribution (₦)
                  </label>
                  <input
                    type="number"
                    name="pensionContribution"
                    value={formData.pensionContribution}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NHF Contribution (₦)
                  </label>
                  <input
                    type="number"
                    name="nhfContribution"
                    value={formData.nhfContribution}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Life Insurance Premium (₦)
                  </label>
                  <input
                    type="number"
                    name="lifeInsurance"
                    value={formData.lifeInsurance}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">Do you have dependents?</h4>
                  <p className="text-sm text-gray-600">Personal allowance for dependents</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="hasDependents"
                    checked={formData.hasDependents}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>

              {formData.hasDependents && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 bg-teal-50 rounded-lg"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Dependents
                  </label>
                  <input
                    type="number"
                    name="numberOfDependents"
                    value={formData.numberOfDependents}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </motion.div>
              )}

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">Are you disabled?</h4>
                  <p className="text-sm text-gray-600">Disability allowance</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isDisabled"
                    checked={formData.isDisabled}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Review & Calculate</h3>
            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Personal Information</h4>
                  <p className="text-gray-600">{formData.firstName} {formData.lastName}</p>
                  <p className="text-gray-600">NIN: {formData.nin || 'Not provided'}</p>
                  <p className="text-gray-600">Phone: {formData.phone || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Income Summary</h4>
                  <p className="text-gray-600">
                    Gross Income: ₦{(
                      (parseFloat(formData.basicSalary) || 0) +
                      (parseFloat(formData.housingAllowance) || 0) +
                      (parseFloat(formData.transportAllowance) || 0) +
                      (parseFloat(formData.otherAllowances) || 0)
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
              
              {taxResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl p-6 border-2 border-teal-200"
                >
                  <h4 className="text-xl font-bold text-teal-800 mb-4">Tax Calculation Complete!</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-700">Gross Income: <span className="font-semibold">₦{taxResult.grossIncome.toLocaleString()}</span></p>
                      <p className="text-gray-700">Total Deductions: <span className="font-semibold">₦{taxResult.totalDeductions.toLocaleString()}</span></p>
                      <p className="text-gray-700">Chargeable Income: <span className="font-semibold">₦{taxResult.chargeableIncome.toLocaleString()}</span></p>
                    </div>
                    <div>
                      <p className="text-gray-700">Annual Tax: <span className="font-semibold">₦{taxResult.finalTax.toLocaleString()}</span></p>
                      <p className="text-gray-700">Monthly Tax: <span className="font-semibold">₦{taxResult.monthlyTax.toLocaleString()}</span></p>
                      <p className="text-lg font-bold text-teal-600">
                        Net Income: ₦{taxResult.netIncome.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br mt-18 from-teal-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-teal-600 border-teal-600 text-white' 
                    : 'border-gray-300 text-gray-500'
                } transition duration-300`}>
                  {step.icon}
                </div>
                <div className="ml-3">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-teal-600' : 'text-gray-500'
                  }`}>
                    Step {step.number}
                  </div>
                  <div className="text-sm font-semibold">{step.title}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-teal-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

        
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold ${
                currentStep === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              } transition duration-300`}
            >
              <FaArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextStep}
              className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              <span>{currentStep === 4 ? 'Calculate Tax' : 'Next'}</span>
              <FaArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TaxApplication;
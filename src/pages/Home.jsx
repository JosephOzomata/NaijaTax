// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCalculator, 
  FaShieldAlt, 
  FaClock, 
  FaMoneyBillWave, 
  FaChartLine,
  FaAward,
  FaUsers,
  FaRocket,
  FaSync,
  FaCheck,
  FaCity,
  FaStar,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation()

    useEffect(() => {
        const user = localStorage.getItem('taxUser');
        setIsLoggedIn(!!user);
      }, [location]);

  const features = [
    {
      icon: <FaCalculator className="h-12 w-12 text-teal-600" />,
      title: "Easy Tax Calculation",
      description: "Calculate your Nigerian taxes quickly with our simple interface"
    },
    {
      icon: <FaShieldAlt className="h-12 w-12 text-teal-600" />,
      title: "FIRS Compliant",
      description: "Follows Federal Inland Revenue Service guidelines and regulations"
    },
    {
      icon: <FaClock className="h-12 w-12 text-teal-600" />,
      title: "Time Saving",
      description: "Complete your tax filing 5x faster than manual methods"
    },
    {
      icon: <FaMoneyBillWave className="h-12 w-12 text-teal-600" />,
      title: "Maximize Returns",
      description: "Identify all eligible allowances and reliefs under Nigerian law"
    }
  ];

  const stats = [
    { number: "25K+", label: "Nigerian Users" },
    { number: "₦1.8B+", label: "Taxes Processed" },
    { number: "98.7%", label: "Accuracy Rate" },
    { number: "36 States", label: "Covered Nationwide" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white">
      

<section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-teal-100 via-white to-cyan-700">
  
  <div className="absolute inset-0">
  
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute top-10 left-10 w-20 h-20 bg-teal-200 rounded-full blur-sm"
    />
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.7 }}
      className="absolute top-20 right-20 w-16 h-16 bg-cyan-200 rounded-full blur-sm"
    />
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.9 }}
      className="absolute bottom-20 left-20 w-24 h-24 bg-emerald-200 rounded-full blur-sm"
    />
    
    
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-100 to-transparent animate-pulse" />
    </div>
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
  
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-teal-200 rounded-full px-6 py-3 mb-8 shadow-lg"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-teal-500"
        >
          <FaStar className="w-4 h-4" />
        </motion.div>
        <span className="text-sm font-semibold text-teal-700">
          Trusted by 25,000+ Nigerian Taxpayers
        </span>
      </motion.div>

  
      <div className="mb-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-4"
        >
          Nigerian{" "}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-teal-600 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"
          >
            Tax Made
          </motion.span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          
          <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900">
            Simple
          </span>
          
        </motion.div>
      </div>

  
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
      >
        Easy tax preparation for individuals and small businesses in{" "}
        <motion.span
          animate={{ 
  
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-semibold bg-clip-text text-White bg-gradient-to-r from-teal-600 to-cyan-600"
        >
          Nigeria
        </motion.span>
        . FIRS compliant and absolutely hassle-free.
      </motion.p>

  
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {[
          { text: "FIRS Compliant", icon: FaShieldAlt },
          { text: "100% Secure", icon: FaShieldAlt },
          { text: "5-Minute Setup", icon: FaClock },
          { text: "Auto Calculations", icon: FaCalculator }
        ].map((feature, index) => (
          <motion.span
            key={feature.text}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-sm border border-teal-200 text-teal-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
          >
            <FaCheck className="w-3 h-3 text-green-500" />
            <feature.icon className="w-3 h-3" />
            {feature.text}
          </motion.span>
        ))}
      </motion.div>

  
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/signup"
            className="group relative bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 overflow-hidden"
          >
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaRocket className="w-5 h-5" />
            </motion.div>
            Get Started Free
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/login"
            className="group bg-white/80 backdrop-blur-sm border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <FaSync className="w-5 h-5" />
            </motion.div>
            Existing User
          </Link>
        </motion.div>
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="mt-16"
      >
        <p className="text-gray-500 text-sm mb-6 flex items-center justify-center gap-2">
          <FaUsers className="w-4 h-4" />
          Trusted by businesses across Nigeria
        </p>
        
      
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="flex flex-wrap justify-center items-center gap-8 opacity-60"
        >
          {[
            { label: "Lagos", icon: FaCity },
            { label: "Abuja", icon: FaMapMarkerAlt },
            { label: "Port Harcourt", icon: FaCity },
            { label: "Kano", icon: FaMapMarkerAlt },
            { label: "Calabar", icon: FaCity }
          ].map((city, index) => (
            <motion.div
              key={city.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 2 + index * 0.1 }}
              whileHover={{ scale: 1.1, opacity: 1 }}
              className="flex items-center gap-2 text-gray-600 font-medium"
            >
              <city.icon className="w-4 h-4 text-teal-500" />
              <span>{city.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      
      
    </motion.div>
  </div>

  
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      animate={{ 
        rotate: [0, 360],
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 4, repeat: Infinity }
      }}
      className="absolute -top-1/2 -right-1/2 w-full h-full opacity-5"
    >
      <div className="w-full h-full bg-gradient-conic from-teal-400 via-cyan-400 to-teal-400" />
    </motion.div>
  </div>
</section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose NaijaTax?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for Nigerian taxpayers with local tax laws in
              mind
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Nigerian Tax Solutions
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <FaAward className="h-6 w-6 text-teal-500 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      FIRS Compliant
                    </h3>
                    <p className="text-gray-600">
                      All calculations follow Federal Inland Revenue Service
                      guidelines and current tax laws.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FaUsers className="h-6 w-6 text-teal-500 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                    <p className="text-gray-600">
                      Designed for all Nigerians - from employees to small
                      business owners.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FaMapMarkerAlt className="h-6 w-6 text-teal-500 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Nationwide Coverage
                    </h3>
                    <p className="text-gray-600">
                      Supports taxpayers across all 36 states and the Federal
                      Capital Territory.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">
                Ready to File Your Taxes?
              </h3>
              <p className="text-lg m b-6 opacity-90">
                Join thousands of Nigerians simplifying their tax preparation
                process.
              </p>

              {isLoggedIn && (
                <Link
                  to="/application"
                  className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-2 rounded-lg font-semibold transition duration-300 inline-block"
                >
                  Calculate Tax
                </Link>
              )}

              {!isLoggedIn && (
                <Link
                  to="/signup"
                  className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-3 rounded-lg font-semibold transition duration-300 inline-block"
                >
                  Create Your Account
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
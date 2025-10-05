// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCalculator, 
  FaUser, 
  FaChartBar,
  FaFileInvoice,
  FaHistory,
  FaBell,
  FaCog
} from 'react-icons/fa';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('taxUser');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const action = [
    {
      icon: <FaCalculator className="h-8 w-8" />,
      title: "Start Tax Filing",
      description: "Begin your tax preparation",
      link: "/application",
      color: "from-teal-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 mt-18 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.firstName}!
              </h1>
              <p className="text-gray-600 mt-2">
                Ready to prepare your Nigerian taxes? Let's get started.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="w-12 h-12 bg-teal-800 flex rotate-45 items-center justify-center rounded-sm hover:bg-gray-200 transition duration-300">
                <p className="p-1 absolute rotate-[-45deg] text-2xl font-bold text-white" >{user.firstName[0]}</p>
              </button>
              
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2  flex items-center justify-center h-[100%] ">
            {/* <h2 className="text-2xl bg-teal-700 font-bold text-gray-900 mb-6">Quick Actions</h2> */}
            {/* <div className=" h-[100%] flex items-center justify-center"> */}
             
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                //   transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className=' flex items-center justify-center w-[100%] h-[100%] '
                >
                  <Link
                    to={action[0].link}
                    className={` flex items-center justify-center text-center bg-gradient-to-r ${action[0].color} text-white rounded-2xl w-[100%] h-[100%] shadow-lg hover:shadow-xl transition duration-300`}
                  >
                    <div className=" items-center justify-center  space-x-4">
                      <p className='text-6xl'>{action[0].icon}</p>
                      <div>
                        <h3 className="text-6xl font-semibold">{action[0].title}</h3>
                        <p className="opacity-90">{action[0].description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
            {/* </div> */}
          </div>

          {/* User Info Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-8"
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-600">{user.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                  <span className="text-gray-700">State:</span>
                  <span className="font-semibold">{user.state}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                  <span className="text-gray-700">Annual Income:</span>
                  <span className="font-semibold">
                    ₦{parseFloat(user.income).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                  <span className="text-gray-700">Member Since:</span>
                  <span className="font-semibold">{new Date().getFullYear()}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">Tax Tip</h4>
                <p className="text-yellow-700 text-sm">
                  Remember to file your annual tax returns before March 31st of the following year.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;
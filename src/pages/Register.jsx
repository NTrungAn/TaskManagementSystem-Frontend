import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Eye, EyeOff, Handshake } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        navigate('/login'); // Chuyển hướng tới login dùng useNavigate
      } else {
        alert(data.message || 'Lỗi đăng ký');
      }
    } catch (error) {
       alert('Không thể kết nối đến server');
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden font-sans bg-white text-black">
      
      {/* Left Column - Branding */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between px-16 py-12 bg-white relative border-r border-gray-300">
        
        {/* Top Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#5D3FDB] rounded-xl flex items-center justify-center text-white shadow-[0_4px_14px_0_rgba(93,63,219,0.39)] cursor-pointer">
            <Handshake size={24} strokeWidth={2.5} />
          </div>
          <span className="text-[#0084FF] font-extrabold text-[22px] tracking-tight">Working Together</span>
        </div>

        {/* Text Area */}
        <div className="mt-16 pr-8">
          <h1 className="text-[64px] text-black leading-[1.05] font-black mb-4 tracking-tight drop-shadow-sm">
            Design for your <br />
            <span className="text-[#5D3FDB]">Workspace.</span>
          </h1>
          <p className="text-[17px] text-gray-800 leading-relaxed font-medium mt-6">
            Experience a professional environment where clarity meets creativity.<br/>
            Integrated tools for teamswho value precision and editorial excellence.
          </p>
        </div>

        {/* Bottom Area: Grid + Image */}
        <div className="flex gap-6 items-end mt-auto pt-8">
          {/* Left piece: Grid & Text */}
          <div className="flex flex-col pb-4 gap-12 w-[100px] shrink-0">
            {/* Colored Grid */}
            <div className="grid grid-cols-2 gap-1 w-16">
              <div className="bg-black text-[#00E5FF] w-[30px] h-[30px] flex items-center justify-center text-xs font-bold leading-none border border-black">De</div>
              <div className="bg-black text-[#FF6D00] w-[30px] h-[30px] flex items-center justify-center text-xs font-bold leading-none border border-black">Si</div>
              <div className="bg-black text-[#F50057] w-[30px] h-[30px] flex items-center justify-center text-xs font-bold leading-none border border-black">Gn</div>
              <div className="bg-black text-[#00E676] w-[30px] h-[30px] flex items-center justify-center text-xs font-bold leading-none border border-black">Er</div>
            </div>
            
            {/* Trusted Text */}
            <div className="text-[9px] uppercase font-bold italic leading-tight border-y border-black py-1 tracking-widest w-fit">
              Trusted By<br />
              Modern<br />
              Teams
            </div>
          </div>

          {/* Right piece: Image */}
          <div className="w-full h-[260px] relative">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
              alt="Modern Office"
              className="w-full h-full object-cover rounded-[20px]"
            />
          </div>
        </div>
      </div>

      {/* Right Column - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white overflow-y-auto font-sans">
        <div className="w-[360px] mx-auto py-8">
          
          <div className="mb-8 text-center pt-2">
            <h2 className="text-[26px] font-black text-black">Đăng ký</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-black block" htmlFor="fullName">
                Họ tên<span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="w-full pl-3 pr-10 py-2 bg-white border border-gray-400 text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 font-medium rounded-sm"
                  placeholder="Nguoidung123"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <User size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-black pointer-events-none" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-black block" htmlFor="email">
                Email<span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full pl-3 pr-10 py-2 bg-white border border-gray-400 text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 font-medium rounded-sm"
                  placeholder="Nguoidung123@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Mail size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-black pointer-events-none fill-current" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-black block" htmlFor="password">
                Mật khẩu<span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  className="w-full pl-3 pr-10 py-2 bg-white border border-gray-400 text-black placeholder-gray-400 focus:outline-none focus:border-blue-500 font-medium rounded-sm"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start pt-1 pb-1">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  required
                  className="w-3.5 h-3.5 border-gray-400 rounded-sm text-blue-600 focus:ring-blue-500 bg-white cursor-pointer"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="acceptTerms" className="ml-2.5 text-sm font-bold text-gray-800 cursor-pointer">
                Tôi chấp nhận điều khoản <br/> dịch vụ của hệ thống
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#0084FF] hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2.5 rounded-sm transition-colors mt-2"
            >
              Đăng ký
            </button>

            {/* Divider */}
            <div className="text-center py-2">
              <span className="text-sm text-gray-600">Hoặc tiếp tục với:</span>
            </div>

            {/* Social Logins */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center py-2 bg-white border border-gray-400 rounded-sm hover:bg-gray-50 transition gap-2"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                <span className="text-sm font-bold text-[#D93025]">Google</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center py-2 bg-white border border-gray-400 rounded-sm hover:bg-gray-50 transition gap-2"
              >
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
                <span className="text-sm font-bold text-gray-400">Facebook</span>
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center text-xs text-black font-bold mt-8">
              Bạn đã có tài khoản?{' '}
              <a href="/login" className="hover:underline">
                Đăng nhập
              </a>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

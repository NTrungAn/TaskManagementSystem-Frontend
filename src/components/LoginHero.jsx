import React from 'react';

const LoginHero = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen max-w-[1380px] mx-auto bg-[#F9FAFB] font-sans">
      
      {/* Left Column: Branding / Marketing text */}
      <div className="flex-1 flex flex-col justify-center p-10 lg:p-16">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-[60px] h-[60px] rounded-[20px] bg-[#0B00A7] flex items-center justify-center text-white">
             {/* Icon Placeholder based on lucide/heart-handshake */}
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1800CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
             </svg>
          </div>
          <span className="text-[28px] font-bold text-[#3F3AC7] tracking-tight">Working Together</span>
        </div>
        
        <h1 className="text-[72px] lg:text-[96px] font-bold leading-tight text-black mb-8">
          Design for your<br/>Workspace.
        </h1>
        
        <p className="text-[24px] text-black mb-12 max-w-[800px] leading-relaxed">
          Experience a professional environment where clarity meets creativity. 
          Integrated tools for teams who value precision and editorial excellence.
        </p>

        {/* Decorative images placeholders */}
        <div className="flex space-x-6 items-end">
           <div className="w-[640px] h-[358px] bg-gray-200 rounded-[20px] overflow-hidden shadow-sm">
              {/* Image 2 Placeholder */}
              <img src="https://placehold.co/640x358/e2e8f0/94a3b8?text=Workspace+Image" alt="Workspace" className="w-full h-full object-cover" />
           </div>
           <div className="flex flex-col mb-4">
             <span className="text-[16px] font-normal leading-snug text-black mb-3">TRUSTED BY <br/> MODERN <br/> TEAMS</span>
             <div className="w-[154px] h-[154px] bg-gray-300 rounded-[20px] overflow-hidden shadow-sm">
                {/* Image 3 Placeholder */}
                <img src="https://placehold.co/154x154/e2e8f0/94a3b8?text=Team+Image" alt="Team" className="w-full h-full object-cover" />
             </div>
           </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-[525px] flex flex-col justify-center items-center p-8">
        {/* Form Container */}
        <div className="bg-white rounded-[20px] w-full p-[40px] shadow-sm">
          <h2 className="text-[28px] font-bold text-black mb-10">Đăng nhập</h2>
          
          <form className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-[24px] font-bold text-black flex items-center">
                Email <span className="text-[#D40205] ml-1">*</span>
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Nguoidung123@gmail.com"
                  className="w-[374px] h-[54px] border border-black rounded-sm px-4 text-[24px] font-bold text-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[24px] font-bold text-black flex items-center">
                Mật khẩu <span className="text-[#D40205] ml-1">*</span>
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="********"
                  className="w-[374px] h-[54px] border border-black rounded-sm px-4 text-[24px] font-bold text-black pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <button type="button" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-800">
                   {/* Eye Icon */}
                   <svg width="32" height="23" viewBox="0 0 32 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 4C9 4 3 9.5 0 16C3 22.5 9 28 16 28C23 28 29 22.5 32 16C29 9.5 23 4 16 4ZM16 24C11.5 24 8 20.5 8 16C8 11.5 11.5 8 16 8C20.5 8 24 11.5 24 16C24 20.5 20.5 24 16 24ZM16 11C13.2 11 11 13.2 11 16C11 18.8 13.2 21 16 21C18.8 21 21 18.8 21 16C21 13.2 18.8 11 16 11Z" fill="#1E1E1E"/>
                   </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 w-[374px]">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" className="w-[15px] h-[15px] border border-black rounded-none outline-none" />
                <span className="text-[24px] font-semibold text-black">Ghi nhớ đăng nhập</span>
              </label>
            </div>

            <button type="button" className="w-[374px] h-[54px] bg-[#0088FF] border border-black text-[#FEFCFC] text-[27px] font-semibold flex items-center justify-center mt-6">
              Đăng nhập
            </button>
          </form>

          <div className="mt-8 flex flex-col items-start w-[374px]">
            <span className="text-[24px] font-semibold text-black mb-4">Hoặc đăng nhập bằng:</span>
            
            <div className="flex flex-col space-y-4 w-full">
              <button className="flex items-center justify-center space-x-3 w-full h-[54px] border border-black bg-white hover:bg-gray-50 transition-colors">
                <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.51H37.5807C37.13 31.0927 35.5398 33.6826 33.1558 35.3458V40.8526H40.871C45.4593 36.4357 47.532 30.5694 47.532 24.5528Z" fill="#4285F4"/>
                  <path d="M24.4802 48.0016C30.9532 48.0016 36.4111 45.8764 40.8881 40.8582L33.1729 35.3514C30.9419 36.9388 28.0261 37.8924 24.4991 37.8924C18.1132 37.8924 12.67 33.5658 10.7497 27.6083H2.88013V33.4079C7.22808 42.146 15.6514 48.0016 24.4802 48.0016Z" fill="#34A853"/>
                  <path d="M10.7303 27.5878C9.72265 24.6366 9.72265 21.3653 10.7303 18.4141V12.6145H2.85966C-0.893 20.0888 -0.893 28.6019 2.85966 36.0762L10.7303 27.5878Z" fill="#FBBC05"/>
                  <path d="M24.4802 10.1119C27.9103 10.0469 31.2292 11.3323 33.7297 13.8054L41.0776 6.45749C36.6375 2.14445 30.6698 -0.22485 24.4802 0.0016146C15.6514 0.0016146 7.22808 5.85724 2.88013 14.5953L10.7497 20.3949C12.651 14.4374 18.0942 10.1119 24.4802 10.1119Z" fill="#EA4335"/>
                </svg>
                <span className="text-[24px] font-semibold text-[#C20A0A]">Google</span>
              </button>
              
              <button className="flex items-center justify-center space-x-3 w-full h-[54px] border border-black bg-white hover:bg-gray-50 transition-colors">
                <svg width="34" height="34" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77641 45.908 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8313 9.375 29.3156 9.375C31.9406 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.68 15.75 27.75 17.6006 27.75 19.4925V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2236 45.908 48 35.9789 48 24Z" fill="#1877F2"/>
                  <path d="M33.3422 30.9375L34.4062 24H27.75V19.4925C27.75 17.6006 28.68 15.75 31.6613 15.75H34.6875V9.84375C34.6875 9.84375 31.9406 9.375 29.3156 9.375C23.8313 9.375 20.25 12.6975 20.25 18.7125V24H14.1562V30.9375H20.25V47.7084C21.4828 47.9015 22.7368 48 24 48C25.2632 48 26.5172 47.9015 27.75 47.7084V30.9375H33.3422Z" fill="white"/>
                </svg>
                <span className="text-[24px] font-semibold text-[#999999]">Facebook</span>
              </button>
            </div>
            
            <div className="flex justify-between w-full mt-6">
               <span className="text-[24px] font-semibold text-black hover:text-blue-600 transition-colors cursor-pointer">Quên mật khẩu?</span>
               <span className="text-[24px] font-semibold text-black hover:text-blue-600 transition-colors cursor-pointer">Tạo tài khoản</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHero;

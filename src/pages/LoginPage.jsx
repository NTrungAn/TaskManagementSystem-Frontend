import { useId, useState } from 'react'
import heartHandshake from '../assets/login/heart-handshake.svg'
import iconEmail from '../assets/login/icon-email.svg'
import iconEye from '../assets/login/icon-eye.svg'
import google from '../assets/login/google.png'
import facebook from '../assets/login/facebook.png'
import heroOffice from '../assets/login/hero-office.png'
import gridSquares from '../assets/login/grid-squares.png'
import './LoginPage.css'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailId = useId()
  const passwordId = useId()

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Đăng nhập thành công!');
        localStorage.setItem('token', data.token); // Lưu token nếu cần
      } else {
        alert(data.message || 'Lỗi đăng nhập');
      }
    } catch (error) {
      alert('Không thể kết nối đến server');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
      } else {
        alert(data.message || 'Lỗi đăng ký');
      }
    } catch (error) {
      alert('Không thể kết nối đến server');
    }
  };

  return (
    <div className="login-viewport">
      <div className="login-frame">
        <div className="login-brand-icon-wrap" aria-hidden>
          <img src={heartHandshake} alt="" className="login-brand-icon" />
        </div>
        <p className="login-brand-title">Working Together</p>

        <div className="login-headline-wrap">
          <p className="login-headline-line1">Design for your </p>
          <p className="login-headline-line2">Workspace.</p>
        </div>

        <div className="login-subtext-block">
          <p className="login-subtext-p1">
            Experience a professional environment where clarity meets creativity.{' '}
          </p>
          <p className="login-subtext-p2">
            Integrated tools for teamswho value precision and editorial excellence.
          </p>
        </div>

        <img src={gridSquares} alt="" className="login-img-grid" />
        <img src={heroOffice} alt="" className="login-img-hero" />

        <div className="login-trusted-block">
          <p className="login-trusted-line">TRUSTED BY </p>
          <p className="login-trusted-line">MODERN</p>
          <p className="login-trusted-line">TEAMS</p>
        </div>

        <aside className="login-panel" aria-label="Đăng nhập">
          <h1 className="login-panel-title">Đăng nhập </h1>

          <p className="login-label-email" id={`${emailId}-l`}>
            Email
          </p>
          <p className="login-asterisk-email" aria-hidden>
            *
          </p>

          <div className="login-field login-field-email">
            <input
              id={emailId}
              className="login-field-input"
              type="text"
              name="email"
              autoComplete="username"
              placeholder="Nguoidung123@gmail.com"
              aria-labelledby={`${emailId}-l`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <img
            src={iconEmail}
            alt=""
            className="login-panel-icon login-panel-icon--email"
          />

          <p className="login-label-password" id={`${passwordId}-l`}>
            Mật khẩu
          </p>
          <p className="login-asterisk-password" aria-hidden>
            *
          </p>

          <div className="login-field login-field-password">
            <input
              id={passwordId}
              className="login-field-input"
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="current-password"
              placeholder="********"
              aria-labelledby={`${passwordId}-l`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="login-panel-eye"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            <img src={iconEye} alt="" width={34} height={34} />
          </button>

          <input
            id="remember"
            className="login-remember"
            type="checkbox"
            name="remember"
          />
          <label className="login-remember-label" htmlFor="remember">
            Ghi nhớ đăng nhập
          </label>

          <button type="button" className="login-btn-primary" onClick={handleLogin}>
            Đăng nhập
          </button>

          <p className="login-divider-text">Hoặc đăng nhập bằng:</p>

          <div
            className="login-social-row login-social-row--google"
            role="group"
            aria-label="Đăng nhập Google"
          >
            <img
              src={google}
              alt=""
              className="login-social-icon-pos login-social-icon-pos--g"
            />
            <span className="login-social-label-google-pos">Google</span>
          </div>

          <div
            className="login-social-row login-social-row--facebook"
            role="group"
            aria-label="Đăng nhập Facebook"
          >
            <img
              src={facebook}
              alt=""
              className="login-social-icon-pos login-social-icon-pos--f"
            />
            <span className="login-social-label-facebook-pos">Facebook</span>
          </div>

          <p className="login-footer-forgot">Quên mật khẩu?</p>
          <button type="button" className="login-footer-register" onClick={handleRegister}>
            Tạo tài khoản
          </button>
        </aside>
      </div>
    </div>
  )
}

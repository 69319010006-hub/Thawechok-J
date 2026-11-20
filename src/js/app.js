/**
 * src/js/app.js
 * App Logic - Login Handling
 */
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const authError = document.getElementById('authError');

    // ตรวจสอบว่าอยู่ในหน้า Login หรือไม่ก่อนทำงาน
    if (loginForm) {
        // 1. จัดการการดูรหัสผ่าน (Toggle Password Visibility)
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // สลับไอคอนเปิด/ปิดตา
            togglePasswordBtn.style.opacity = type === 'text' ? '0.5' : '1';
        });

        // 2. จัดการการ Submit Form
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            
            // ซ่อน Error ก่อน
            authError.style.display = 'none';

            const email = document.getElementById('email').value;
            const password = passwordInput.value;

            if (!email || !password) {
                authError.textContent = 'Please fill in all fields.';
                authError.style.display = 'block';
                return;
            }

            // เริ่ม Loading
            loginBtn.classList.add('is-loading');

            try {
                // TODO: แทนที่บรรทัดด้านล่างนี้ด้วย Firebase Auth ของจริง
                // const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
                
                // จำลองดีเลย์การล็อกอิน 1.5 วินาที
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                console.log('Login successful for:', email);
                
                // แจ้งเตือนความสำเร็จและเตรียม Redirect ไปหน้าหลัก (เช่น index.html หรือ dashboard)
                loginBtn.classList.remove('is-loading');
                loginBtn.innerHTML = '<span class="btn-text">Success! Redirecting...</span>';
                loginBtn.style.backgroundColor = 'var(--color-success)';
                
                // window.location.href = '../index.html'; // Uncomment เมื่อพร้อมใช้งานจริง

            } catch (error) {
                console.error('Login error:', error);
                loginBtn.classList.remove('is-loading');
                authError.textContent = 'Invalid credentials. Please try again.';
                authError.style.display = 'block';
            }
        });
    }
});
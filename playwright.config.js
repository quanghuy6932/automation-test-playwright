// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Chạy các test song song */
  fullyParallel: false, // Để false để các module chạy tuần tự cho ổn định
  /* Thời gian tối đa cho 1 test case (tăng lên 60s để tránh Timeout do mạng) */
  timeout: 60000,
  
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  
  /* Giới hạn số lượng trình duyệt mở cùng lúc để máy không bị treo */
  workers: 1, 

  /* Báo cáo kết quả dạng HTML */
  reporter: [['html', { open: 'always' }], ['list']],

  use: {
    /* Base URL giúp bạn chỉ cần viết page.goto('/') */
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    
    /* Cấu hình thời gian chờ cho các hành động Click, Fill và Load trang */
    actionTimeout: 15000,
    navigationTimeout: 30000,

    /* Quay video và chụp ảnh khi test thất bại để dễ debug */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    /* Chế độ hiện trình duyệt hay không */
    headless: true, 
  },

  /* Cấu hình các dự án chạy (Projects) */
  projects: [
    // 1. Bước Setup: Chạy file auth.setup.js để đăng nhập và lưu session
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/,
    },

    // 2. Chạy trên trình duyệt Chrome sử dụng Session đã lưu
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Nạp session từ file auth.json vào trình duyệt
        storageState: 'auth/auth.json', 
      },
      // Chỉ chạy project này sau khi 'setup' đã thành công
      dependencies: ['setup'],
    },

    // Bạn có thể mở lại Firefox/Webkit nếu muốn, nhớ thêm storageState và dependencies cho chúng
    /*
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: 'auth/auth.json' 
      },
      dependencies: ['setup'],
    },
    */
  ],
});
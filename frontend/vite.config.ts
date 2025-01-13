import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'

dotenv.config({ path: "../.env" })

const VITE_PORT: number = Number(process.env.VITE_PORT) || 5173

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: VITE_PORT,
    host: true
  }
})

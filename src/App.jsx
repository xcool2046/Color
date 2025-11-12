import { useState, useEffect } from 'react'
import { generatePalette } from './utils/colorGenerator'
import ColorPalette from './components/ColorPalette'
import PaletteModeSelector from './components/PaletteModeSelector'
import ExportButtons from './components/ExportButtons'
import './App.css'

function App() {
  const [mode, setMode] = useState('random')
  const [colors, setColors] = useState([])

  useEffect(() => {
    setColors(generatePalette(mode))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">
            Color Palette Generator ✨
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            一键生成美观的配色方案，支持多种配色理论，点击复制颜色代码
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-col items-center space-y-4 mb-6">
            <PaletteModeSelector mode={mode} setMode={setMode} />
          </div>

          <ColorPalette colors={colors} mode={mode} setColors={setColors} />

          <ExportButtons colors={colors} />

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">使用提示：</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 点击色块复制颜色代码（HEX格式）</li>
              <li>• 双击单个色块可以重新生成该颜色</li>
              <li>• 支持4种配色模式：随机、互补色、三角色、类似色</li>
              <li>• 可以导出为CSS变量或JSON格式</li>
            </ul>
          </div>
        </div>

        <footer className="text-center text-gray-500 text-sm mt-8">
          <p>使用 React + Vite + TailwindCSS 开发 · 颜色处理 powered by chroma.js</p>
        </footer>
      </div>
    </div>
  )
}

export default App

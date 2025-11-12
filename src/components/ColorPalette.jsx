import { useState } from 'react'
import { generatePalette, copyToClipboard } from '../utils/colorGenerator'

const ColorBox = ({ color, onRegenerate, index }) => {
  const [copied, setCopied] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleCopy = async () => {
    const success = await copyToClipboard(color.hex)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-2 flex-1 min-w-32">
      <div
        className="relative w-full h-32 md:h-40 rounded-lg cursor-pointer shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        style={{ backgroundColor: color.hex }}
        onClick={handleCopy}
        onDoubleClick={() => onRegenerate(index)}
        onMouseEnter={() => setShowHint(true)}
        onMouseLeave={() => setShowHint(false)}
      >
        <div className="absolute inset-0 rounded-lg bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="text-white font-medium">点击复制</span>
        </div>
        {copied && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
            ✓ 已复制!
          </div>
        )}
      </div>

      <div className="text-center space-y-1">
        <div className="font-mono text-sm font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
             onClick={handleCopy}>
          {color.hex}
        </div>

        {showHint && (
          <div className="text-xs text-gray-500 space-y-1">
            {index === 0 && <div>主色 · 双击可重新生成</div>}
            {index === 1 && <div>辅色 · 双击可重新生成</div>}
            {index === 2 && <div>强调色 · 双击可重新生成</div>}
            {index === 3 && <div>深色中性色 · 双击可重新生成</div>}
            {index === 4 && <div>浅色中性色 · 双击可重新生成</div>}
          </div>
        )}
      </div>
    </div>
  )
}

const ColorPalette = ({ colors, mode, setColors }) => {

  const regenerateAll = () => {
    const newColors = generatePalette(mode)
    setColors(newColors)
  }

  const regenerateColor = (index) => {
    const newColors = [...colors]
    const newColor = generatePalette(mode)[index]
    newColors[index] = newColor
    setColors(newColors)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-center">
        {colors.map((color, index) => (
          <ColorBox
            key={index}
            color={color}
            onRegenerate={regenerateColor}
            index={index}
          />
        ))}
      </div>

      <button
        onClick={regenerateAll}
        className="block mx-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
      >
        🎨 生成新配色
      </button>
    </div>
  )
}

export default ColorPalette

import chroma from 'chroma-js'

// 生成随机色板
export const generatePalette = (mode = 'random') => {
  const hue = Math.random() * 360

  const schemes = {
    random: () => {
      // 生成和谐的5色方案
      return [
        chroma.hsl(hue, 0.7, 0.5),                      // Primary
        chroma.hsl((hue + 30) % 360, 0.6, 0.6),         // Secondary
        chroma.hsl((hue + 180) % 360, 0.7, 0.4),        // Accent/complementary
        chroma.hsl(hue, 0.1, 0.2),                      // Neutral dark
        chroma.hsl(hue, 0.1, 0.9)                       // Neutral light
      ]
    },

    complementary: () => {
      // 互补色方案：主色 + 互补色
      return [
        chroma.hsl(hue, 0.75, 0.5),
        chroma.hsl(hue, 0.75, 0.3),
        chroma.hsl((hue + 180) % 360, 0.75, 0.5),
        chroma.hsl((hue + 180) % 360, 0.75, 0.7),
        chroma.hsl(hue, 0.1, 0.5)
      ]
    },

    triadic: () => {
      // 三角色方案：色相间隔120度
      return [
        chroma.hsl(hue, 0.7, 0.5),
        chroma.hsl((hue + 120) % 360, 0.7, 0.5),
        chroma.hsl((hue + 240) % 360, 0.7, 0.5),
        chroma.hsl(hue, 0.1, 0.2),
        chroma.hsl(hue, 0.1, 0.9)
      ]
    },

    analogous: () => {
      // 类似色方案：色相间隔30度
      return [
        chroma.hsl(hue, 0.7, 0.5),
        chroma.hsl((hue + 30) % 360, 0.7, 0.5),
        chroma.hsl((hue - 30 + 360) % 360, 0.7, 0.5),
        chroma.hsl(hue, 0.1, 0.2),
        chroma.hsl(hue, 0.1, 0.9)
      ]
    }
  }

  const colors = schemes[mode]?.() || schemes.random()

  // 转换为带有hex/rgb/hsl的对象格式
  return colors.map(color => {
    const [h, s, l] = color.hsl()
    const [r, g, b] = color.rgb()

    return {
      hex: color.hex(),
      rgb: `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`,
      hsl: `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
      r: Math.round(r),
      g: Math.round(g),
      b: Math.round(b),
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  })
}

// 复制文本到剪贴板
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy: ', err)
    return false
  }
}

// 导出CSS格式
export const exportAsCSS = (colors) => {
  return `:root {
  --color-primary: ${colors[0].hex};
  --color-secondary: ${colors[1].hex};
  --color-accent: ${colors[2].hex};
  --color-neutral-dark: ${colors[3].hex};
  --color-neutral-light: ${colors[4].hex};
}`
}

// 导出JSON格式
export const exportAsJSON = (colors) => {
  return JSON.stringify({
    primary: colors[0].hex,
    secondary: colors[1].hex,
    accent: colors[2].hex,
    neutralDark: colors[3].hex,
    neutralLight: colors[4].hex,
    palette: colors
  }, null, 2)
}

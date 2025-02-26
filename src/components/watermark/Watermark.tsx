import { useEffect, useRef } from 'react'

interface Props {
  text: string
  opacity?: number
  customW?: number
  customH?: number
}

const Watermark: React.FC<Props> = ({
  text,
  opacity = 0.2,
  customW = 200,
  customH = 100,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // 取得 canvas 的2D繪圖上下文
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpi = window.devicePixelRatio || 1

    // 根據螢幕解析度，設定 canvas 內部的解析度
    const width = customW * dpi
    const height = customH * dpi
    canvas.width = width
    canvas.height = height

    // 強制縮小 canvas 的 CSS 尺寸，讓它匹配原本的 200x100
    canvas.style.width = `${width / dpi}px`
    canvas.style.height = `${height / dpi}px`

    // 清空 canvas (從左上角開始清除 x,y,w,h 的區域)
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
    // 設定字體大小為 16 * dpi，確保在 高 DPI（Retina）螢幕 仍然清晰
    ctx.font = `${16 * dpi}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    // 將原點 (0,0) 移動到 canvas 的中心
    ctx.translate(width / 2, height / 2)
    // 將畫布旋轉 -30 度（-π/6 弧度），讓文字變成斜的。
    ctx.rotate(-Math.PI / 6)
    // 將文字繪製在畫布上，這邊的 (0,0) 是畫布的中心
    ctx.fillText(text, 0, 0)
  }, [text, opacity])

  return (
    /**
     * background: `url(${canvasRef.current?.toDataURL()}) repeat`
     * 主要意義: 將 canvas 轉換為圖片並作為背景重複顯示
     * 1. canvasRef.current 取得 canvas 元素的 真實 DOM 節點
     * 2. .toDataURL() 會把 canvas 內容轉換成 Base64 圖片（Data URL）
     * 3. url(${canvasRef.current?.toDataURL()})
     *    =>將這張 Base64 圖片當成 CSS 背景圖
     */
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none',
        background: `url(${canvasRef.current?.toDataURL()}) repeat`,
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Watermark

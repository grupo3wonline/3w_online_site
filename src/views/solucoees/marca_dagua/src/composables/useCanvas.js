import { ref } from 'vue'

export function useCanvas() {
  const createCanvas = (width, height) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
  }

  const getContext = (canvas) => {
    return canvas.getContext('2d')
  }

  const loadImage = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No file provided'))
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = e.target.result
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  }

  const drawImage = (ctx, image, x = 0, y = 0, width = null, height = null) => {
    if (width && height) {
      ctx.drawImage(image, x, y, width, height)
    } else {
      ctx.drawImage(image, x, y)
    }
  }

  const clearCanvas = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height)
  }

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const canvasToBlob = (canvas, type = 'image/png', quality = 0.92) => {
    return new Promise((resolve) => {
      canvas.toBlob(resolve, type, quality)
    })
  }

  const canvasToDataURL = (canvas, type = 'image/png', quality = 0.92) => {
    return canvas.toDataURL(type, quality)
  }

  return {
    createCanvas,
    getContext,
    loadImage,
    drawImage,
    clearCanvas,
    hexToRgba,
    canvasToBlob,
    canvasToDataURL
  }
}

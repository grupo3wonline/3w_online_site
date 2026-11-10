import { ref, computed, watch } from 'vue'
import { useCanvas } from './useCanvas'

export function useWatermark() {
  const { loadImage, hexToRgba, createCanvas, getContext, drawImage, clearCanvas, canvasToDataURL } = useCanvas()

  const watermarkConfig = ref({
    text: '',
    logo: null,
    position: 'center',
    color: '#ffffff',
    opacity: 0.5,
    fontSize: 'auto'
  })

  const sourceImages = ref([])
  const previewImage = ref(null)
  const processedImages = ref([])
  const isProcessing = ref(false)

  const hasWatermark = computed(() => {
    return watermarkConfig.value.text || watermarkConfig.value.logo
  })

  const calculatePosition = (position, canvasWidth, canvasHeight, elementWidth, elementHeight = 0) => {
    const padding = 20
    
    switch (position) {
      case 'top-left':
        return { x: padding, y: padding }
      case 'top-right':
        return { x: canvasWidth - elementWidth - padding, y: padding }
      case 'bottom-left':
        return { x: padding, y: canvasHeight - elementHeight - padding }
      case 'bottom-right':
        return { x: canvasWidth - elementWidth - padding, y: canvasHeight - elementHeight - padding }
      case 'center':
      default:
        return { x: canvasWidth / 2, y: canvasHeight / 2 }
    }
  }

  const applyTextWatermark = async (ctx, canvas, config) => {
    const { text, color, opacity, position } = config
    if (!text) return

    const fontSize = Math.floor(canvas.width / 20)
    ctx.font = `bold ${fontSize}px Arial`
    ctx.fillStyle = hexToRgba(color, opacity)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    if (position === 'diagonal') {
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(-Math.PI / 4)
      ctx.fillText(text, 0, 0)
      ctx.restore()
    } else {
      const { x, y } = calculatePosition(position, canvas.width, canvas.height, 0, 0)
      ctx.fillText(text, x, y)
    }
  }

  const applyLogoWatermark = async (ctx, canvas, logoFile, config) => {
    if (!logoFile) return

    try {
      const logo = await loadImage(logoFile)
      const size = Math.floor(canvas.width / 5)
      const { x, y } = calculatePosition(config.position, canvas.width, canvas.height, size, size)
      
      ctx.globalAlpha = config.opacity
      ctx.drawImage(logo, x, y, size, size)
      ctx.globalAlpha = 1.0
    } catch (error) {
      console.error('Error loading logo:', error)
    }
  }

  const generatePreview = async (imageFile) => {
    if (!imageFile) return null

    try {
      const img = await loadImage(imageFile)
      const canvas = createCanvas(img.width, img.height)
      const ctx = getContext(canvas)

      drawImage(ctx, img)

      if (watermarkConfig.value.logo) {
        await applyLogoWatermark(ctx, canvas, watermarkConfig.value.logo, watermarkConfig.value)
      } else if (watermarkConfig.value.text) {
        await applyTextWatermark(ctx, canvas, watermarkConfig.value)
      }

      return canvas
    } catch (error) {
      console.error('Error generating preview:', error)
      return null
    }
  }

  const processImage = async (imageFile) => {
    try {
      const img = await loadImage(imageFile)
      const canvas = createCanvas(img.width, img.height)
      const ctx = getContext(canvas)

      drawImage(ctx, img)

      if (watermarkConfig.value.logo) {
        await applyLogoWatermark(ctx, canvas, watermarkConfig.value.logo, watermarkConfig.value)
      } else if (watermarkConfig.value.text) {
        await applyTextWatermark(ctx, canvas, watermarkConfig.value)
      }

      return {
        dataUrl: canvasToDataURL(canvas),
        filename: imageFile.name,
        originalFile: imageFile
      }
    } catch (error) {
      console.error('Error processing image:', error)
      throw error
    }
  }

  const processAllImages = async (images) => {
    isProcessing.value = true
    processedImages.value = []

    try {
      const results = await Promise.all(
        Array.from(images).map(img => processImage(img))
      )
      processedImages.value = results
    } catch (error) {
      console.error('Error processing images:', error)
    } finally {
      isProcessing.value = false
    }
  }

  const updateWatermark = (updates) => {
    watermarkConfig.value = { ...watermarkConfig.value, ...updates }
  }

  const resetWatermark = () => {
    watermarkConfig.value = {
      text: '',
      logo: null,
      position: 'center',
      color: '#ffffff',
      opacity: 0.5,
      fontSize: 'auto'
    }
    sourceImages.value = []
    previewImage.value = null
    processedImages.value = []
  }

  return {
    watermarkConfig,
    sourceImages,
    previewImage,
    processedImages,
    isProcessing,
    hasWatermark,
    updateWatermark,
    generatePreview,
    processImage,
    processAllImages,
    resetWatermark
  }
}

// Funções para pré-processamento de imagem para melhorar OCR
export const preprocessImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Definir dimensões do canvas
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (!ctx) {
        reject(new Error('Não foi possível obter contexto do canvas'));
        return;
      }
      
      // Desenhar imagem original
      ctx.drawImage(img, 0, 0);
      
      // Obter dados da imagem
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Aplicar filtros de melhoria
      enhanceContrast(data);
      sharpenImage(data, canvas.width, canvas.height);
      
      // Aplicar de volta ao canvas
      ctx.putImageData(imageData, 0, 0);
      
      // Converter para blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Erro ao processar imagem'));
        }
      }, 'image/png', 1.0);
    };
    
    img.onerror = () => reject(new Error('Erro ao carregar imagem'));
    img.src = URL.createObjectURL(file);
  });
};

// Melhorar contraste da imagem
const enhanceContrast = (data: Uint8ClampedArray, factor: number = 1.5) => {
  for (let i = 0; i < data.length; i += 4) {
    // Converter para escala de cinza
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    
    // Aplicar contraste
    const contrast = Math.max(0, Math.min(255, (gray - 128) * factor + 128));
    
    // Aplicar a todos os canais RGB
    data[i] = contrast;     // R
    data[i + 1] = contrast; // G
    data[i + 2] = contrast; // B
    // Alpha permanece inalterado
  }
};

// Aplicar filtro de nitidez
const sharpenImage = (data: Uint8ClampedArray, width: number, height: number) => {
  const kernel = [
    0, -1, 0,
    -1, 5, -1,
    0, -1, 0
  ];
  
  const output = new Uint8ClampedArray(data);
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let r = 0, g = 0, b = 0;
      
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const pixel = ((y + ky) * width + (x + kx)) * 4;
          const weight = kernel[(ky + 1) * 3 + (kx + 1)];
          
          r += data[pixel] * weight;
          g += data[pixel + 1] * weight;
          b += data[pixel + 2] * weight;
        }
      }
      
      const currentPixel = (y * width + x) * 4;
      output[currentPixel] = Math.max(0, Math.min(255, r));
      output[currentPixel + 1] = Math.max(0, Math.min(255, g));
      output[currentPixel + 2] = Math.max(0, Math.min(255, b));
    }
  }
  
  // Copiar resultado de volta
  for (let i = 0; i < data.length; i++) {
    data[i] = output[i];
  }
};

// Detectar orientação do texto e rotacionar se necessário
export const detectAndCorrectOrientation = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      if (!ctx) {
        reject(new Error('Não foi possível obter contexto do canvas'));
        return;
      }
      
      // Por enquanto, apenas retorna a imagem original
      // Em uma implementação mais avançada, você poderia usar ML para detectar orientação
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Erro ao processar orientação'));
        }
      }, 'image/png', 1.0);
    };
    
    img.onerror = () => reject(new Error('Erro ao carregar imagem'));
    img.src = URL.createObjectURL(file);
  });
};

// Redimensionar imagem para melhor performance do OCR
export const resizeForOCR = (file: File, maxWidth: number = 1200): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      if (!ctx) {
        reject(new Error('Não foi possível obter contexto do canvas'));
        return;
      }
      
      // Calcular novas dimensões mantendo aspect ratio
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Desenhar imagem redimensionada
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Erro ao redimensionar imagem'));
        }
      }, 'image/png', 0.9);
    };
    
    img.onerror = () => reject(new Error('Erro ao carregar imagem'));
    img.src = URL.createObjectURL(file);
  });
};
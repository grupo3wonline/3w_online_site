import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Swal from "sweetalert2";

interface WatermarkSettings {
    text: string;
    opacity: number;
    color: string;
    position: string;
    logoFile: File | null;
    useText: boolean;
    fontSize: number;
}

interface ImageFile {
    file: File;
    url: string;
    processed?: string;
}

const FerramentaPage: React.FC = () => {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [watermarkSettings, setWatermarkSettings] = useState<WatermarkSettings>({
        text: "MARCA D'ÁGUA",
        opacity: 0.5,
        color: "#ffffff",
        position: "bottom-right",
        logoFile: null,
        useText: true,
        fontSize: 5,
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const validFiles = Array.from(files).filter(file =>
            ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(file.type)
        );

        if (validFiles.length !== files.length) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Alguns arquivos foram ignorados. Use apenas PNG, JPG, JPEG ou WEBP.',
                icon: 'warning',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#0891b2'
            });
        }

        if (validFiles.length > 10) {
            Swal.fire({
                title: 'Limite Excedido',
                text: 'Você pode processar no máximo 10 imagens por vez.',
                icon: 'info',
                confirmButtonText: 'OK',
                confirmButtonColor: '#0891b2'
            });
            validFiles.splice(10);
        }

        const newImages = validFiles.map(file => ({
            file,
            url: URL.createObjectURL(file),
        }));

        setImages(prev => [...prev, ...newImages]);

        Swal.fire({
            title: 'Sucesso!',
            text: `${newImages.length} imagem(ns) carregada(s) com sucesso!`,
            icon: 'success',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#0891b2',
            timer: 2000,
            timerProgressBar: true
        });
    }, []);

    const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setWatermarkSettings(prev => ({ ...prev, logoFile: file, useText: false }));
            Swal.fire({
                title: 'Logo Carregado!',
                text: 'Seu logo foi carregado com sucesso.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#0891b2',
                timer: 2000,
                timerProgressBar: true
            });
        }
    }, []);

    const drawWatermark = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx || images.length === 0) return;

        const currentImage = images[currentImageIndex];
        if (!currentImage) return;

        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            if (watermarkSettings.useText && watermarkSettings.text) {
                drawTextWatermark(ctx, canvas.width, canvas.height);
            } else if (!watermarkSettings.useText && watermarkSettings.logoFile) {
                drawLogoWatermark(ctx, canvas.width, canvas.height);
            }
        };
        img.src = currentImage.url;
    }, [images, currentImageIndex, watermarkSettings]);

    const drawTextWatermark = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        const fontSize = Math.max(20, Math.min(width, height) * (watermarkSettings.fontSize / 100));
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = watermarkSettings.color;
        ctx.globalAlpha = watermarkSettings.opacity;

        const textMetrics = ctx.measureText(watermarkSettings.text);
        const textWidth = textMetrics.width;
        const textHeight = fontSize;

        let x, y;
        switch (watermarkSettings.position) {
            case 'top-left':
                x = 20;
                y = textHeight + 20;
                break;
            case 'top-right':
                x = width - textWidth - 20;
                y = textHeight + 20;
                break;
            case 'bottom-left':
                x = 20;
                y = height - 20;
                break;
            case 'bottom-right':
                x = width - textWidth - 20;
                y = height - 20;
                break;
            case 'center':
                x = (width - textWidth) / 2;
                y = height / 2;
                break;
            default:
                x = width - textWidth - 20;
                y = height - 20;
        }

        ctx.fillText(watermarkSettings.text, x, y);
        ctx.globalAlpha = 1;
    };

    const drawLogoWatermark = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        if (!watermarkSettings.logoFile) return;

        const logoImg = new Image();
        logoImg.onload = () => {
            const maxSize = Math.min(width, height) * 0.2;
            const scale = Math.min(maxSize / logoImg.width, maxSize / logoImg.height);
            const logoWidth = logoImg.width * scale;
            const logoHeight = logoImg.height * scale;

            let x, y;
            switch (watermarkSettings.position) {
                case 'top-left':
                    x = 20;
                    y = 20;
                    break;
                case 'top-right':
                    x = width - logoWidth - 20;
                    y = 20;
                    break;
                case 'bottom-left':
                    x = 20;
                    y = height - logoHeight - 20;
                    break;
                case 'bottom-right':
                    x = width - logoWidth - 20;
                    y = height - logoHeight - 20;
                    break;
                case 'center':
                    x = (width - logoWidth) / 2;
                    y = (height - logoHeight) / 2;
                    break;
                default:
                    x = width - logoWidth - 20;
                    y = height - logoHeight - 20;
            }

            ctx.globalAlpha = watermarkSettings.opacity;
            ctx.drawImage(logoImg, x, y, logoWidth, logoHeight);
            ctx.globalAlpha = 1;
        };
        logoImg.src = URL.createObjectURL(watermarkSettings.logoFile);
    };

    const processAllImages = useCallback(async () => {
        if (images.length === 0) {
            Swal.fire({
                title: 'Nenhuma Imagem',
                text: 'Por favor, carregue pelo menos uma imagem para processar.',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#0891b2'
            });
            return;
        }

        setIsProcessing(true);

        Swal.fire({
            title: 'Processando...',
            html: `<div class="text-center"><i class="fas fa-spinner fa-spin text-4xl text-cyan-500 mb-4"></i><p>Processando ${images.length} imagem(ns)...</p></div>`,
            showConfirmButton: false,
            allowOutsideClick: false
        });

        let processedCount = 0;

        for (let index = 0; index < images.length; index++) {
            const imageFile = images[index];

            await new Promise<void>((resolve) => {
                const tempCanvas = document.createElement('canvas');
                const ctx = tempCanvas.getContext('2d');
                if (!ctx) {
                    resolve();
                    return;
                }

                const img = new Image();
                img.onload = () => {
                    tempCanvas.width = img.width;
                    tempCanvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    if (watermarkSettings.useText && watermarkSettings.text) {
                        const fontSize = Math.max(20, Math.min(img.width, img.height) * (watermarkSettings.fontSize / 100));
                        ctx.font = `bold ${fontSize}px Arial`;
                        ctx.fillStyle = watermarkSettings.color;
                        ctx.globalAlpha = watermarkSettings.opacity;

                        const textMetrics = ctx.measureText(watermarkSettings.text);
                        const textWidth = textMetrics.width;
                        const textHeight = fontSize;

                        let x, y;
                        switch (watermarkSettings.position) {
                            case 'top-left':
                                x = 20;
                                y = textHeight + 20;
                                break;
                            case 'top-right':
                                x = img.width - textWidth - 20;
                                y = textHeight + 20;
                                break;
                            case 'bottom-left':
                                x = 20;
                                y = img.height - 20;
                                break;
                            case 'bottom-right':
                                x = img.width - textWidth - 20;
                                y = img.height - 20;
                                break;
                            case 'center':
                                x = (img.width - textWidth) / 2;
                                y = img.height / 2;
                                break;
                            default:
                                x = img.width - textWidth - 20;
                                y = img.height - 20;
                        }

                        ctx.fillText(watermarkSettings.text, x, y);
                        ctx.globalAlpha = 1;
                    }

                    tempCanvas.toBlob((blob) => {
                        if (blob) {
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            const originalName = imageFile.file.name.replace(/\.[^/.]+$/, '');
                            link.download = `${originalName}-watermark.png`;
                            link.click();
                            URL.revokeObjectURL(url);
                            processedCount++;
                        }
                        resolve();
                    }, 'image/png');
                };
                img.src = imageFile.url;
            });
        }

        setIsProcessing(false);

        Swal.fire({
            title: 'Concluído!',
            html: `<div class="text-center"><i class="fas fa-check-circle text-4xl text-green-500 mb-4"></i><p>${processedCount} imagem(ns) processada(s) e baixada(s) com sucesso!</p></div>`,
            icon: 'success',
            confirmButtonText: 'Fechar',
            confirmButtonColor: '#0891b2'
        });
    }, [images, watermarkSettings]);

    const removeImage = useCallback((index: number) => {
        Swal.fire({
            title: 'Remover Imagem?',
            text: 'Deseja remover esta imagem da lista?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim, Remover',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280'
        }).then((result) => {
            if (result.isConfirmed) {
                setImages(prev => {
                    const newImages = prev.filter((_, i) => i !== index);
                    if (currentImageIndex >= newImages.length && newImages.length > 0) {
                        setCurrentImageIndex(newImages.length - 1);
                    } else if (newImages.length === 0) {
                        setCurrentImageIndex(0);
                    }
                    return newImages;
                });
            }
        });
    }, [currentImageIndex]);

    const clearAllImages = useCallback(() => {
        if (images.length === 0) return;

        Swal.fire({
            title: 'Limpar Todas?',
            text: 'Deseja remover todas as imagens da lista?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, Limpar Tudo',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280'
        }).then((result) => {
            if (result.isConfirmed) {
                setImages([]);
                setCurrentImageIndex(0);
            }
        });
    }, [images.length]);

    useEffect(() => {
        drawWatermark();
    }, [drawWatermark]);

    const positions = [
        { value: 'top-left', label: 'Superior Esq.', icon: '↖' },
        { value: 'top-right', label: 'Superior Dir.', icon: '↗' },
        { value: 'center', label: 'Centro', icon: '●' },
        { value: 'bottom-left', label: 'Inferior Esq.', icon: '↙' },
        { value: 'bottom-right', label: 'Inferior Dir.', icon: '↘' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-cyan-500/5">
            {/* Hero Mini */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 border-b border-border">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                                <i className="fas fa-wand-magic-sparkles text-cyan-500 mr-3"></i>
                                Editor de Marca D'Água
                            </h1>
                            <p className="text-muted-foreground">
                                Adicione marcas d'água profissionais em suas imagens de forma rápida e fácil
                            </p>
                        </div>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        Swal.fire({
                                            title: '<i class="fas fa-book-open text-cyan-500"></i> Como Usar',
                                            html: `
                        <div class="text-left space-y-3 text-sm">
                          <div class="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span class="bg-cyan-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                            <div>
                              <strong>Faça Upload</strong>
                              <p class="text-gray-600 dark:text-gray-400">Clique na área de upload ou arraste suas imagens (PNG, JPG, JPEG, WEBP)</p>
                            </div>
                          </div>
                          <div class="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span class="bg-cyan-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                            <div>
                              <strong>Configure a Marca D'Água</strong>
                              <p class="text-gray-600 dark:text-gray-400">Escolha texto ou logo, ajuste posição, opacidade e cor</p>
                            </div>
                          </div>
                          <div class="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span class="bg-cyan-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                            <div>
                              <strong>Baixe Suas Imagens</strong>
                              <p class="text-gray-600 dark:text-gray-400">Clique em "Processar e Baixar" para obter suas imagens</p>
                            </div>
                          </div>
                        </div>
                      `,
                                            confirmButtonText: 'Entendido',
                                            confirmButtonColor: '#0891b2',
                                            width: 500
                                        });
                                    }}
                                >
                                    <i className="fas fa-circle-question mr-2"></i>
                                    Ajuda
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Clique para ver instruções de uso</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Controls Panel */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Upload Section */}
                        <Card className="p-6 shadow-lg border-border">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <i className="fas fa-cloud-arrow-up text-cyan-500"></i>
                                    Upload de Imagens
                                </h3>
                                {images.length > 0 && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={clearAllImages}
                                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                            >
                                                <i className="fas fa-trash-alt mr-1"></i>
                                                Limpar
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Remover todas as imagens</p>
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                            </div>
                            <div className="space-y-4">
                                <div
                                    className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-cyan-500 hover:bg-cyan-500/5 transition-all duration-300 group"
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        const files = e.dataTransfer.files;
                                        if (files.length > 0 && fileInputRef.current) {
                                            fileInputRef.current.files = files;
                                            handleFileUpload({ target: { files } } as React.ChangeEvent<HTMLInputElement>);
                                        }
                                    }}
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <i className="fas fa-images text-cyan-500 text-2xl"></i>
                                    </div>
                                    <p className="text-foreground font-medium mb-2">
                                        Clique ou arraste suas imagens
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        PNG, JPG, JPEG, WEBP (máx. 10 arquivos)
                                    </p>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept=".png,.jpg,.jpeg,.webp"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    autoComplete="off"
                                />

                                {images.length > 0 && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">{images.length} imagem(ns)</span>
                                            <span className="text-muted-foreground">{currentImageIndex + 1}/{images.length}</span>
                                        </div>
                                        <div className="max-h-40 overflow-y-auto space-y-1 pr-2 scrollbar-thin">
                                            {images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex items-center justify-between p-2 rounded-lg border text-sm transition-all ${index === currentImageIndex
                                                            ? 'bg-cyan-500/10 border-cyan-500'
                                                            : 'bg-muted border-transparent hover:border-border'
                                                        }`}
                                                >
                                                    <button
                                                        className="cursor-pointer flex-1 truncate text-left"
                                                        onClick={() => setCurrentImageIndex(index)}
                                                    >
                                                        <i className="fas fa-image mr-2 text-cyan-500"></i>
                                                        {image.file.name}
                                                    </button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeImage(index)}
                                                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                    >
                                                        <i className="fas fa-times"></i>
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Watermark Type */}
                        <Card className="p-6 shadow-lg border-border">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <i className="fas fa-wand-magic-sparkles text-cyan-500"></i>
                                Tipo de Marca D'água
                            </h3>
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant={watermarkSettings.useText ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setWatermarkSettings(prev => ({ ...prev, useText: true }))}
                                                className={watermarkSettings.useText ? "bg-cyan-500 hover:bg-cyan-600" : ""}
                                            >
                                                <i className="fas fa-font mr-2"></i>
                                                Texto
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Usar texto como marca d'água</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant={!watermarkSettings.useText ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setWatermarkSettings(prev => ({ ...prev, useText: false }))}
                                                className={!watermarkSettings.useText ? "bg-cyan-500 hover:bg-cyan-600" : ""}
                                            >
                                                <i className="fas fa-image mr-2"></i>
                                                Logo
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Usar imagem/logo como marca d'água</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>

                                {watermarkSettings.useText ? (
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="watermark-text" className="flex items-center gap-2 mb-2">
                                                <i className="fas fa-pen text-cyan-500"></i>
                                                Texto da Marca D'Água
                                            </Label>
                                            <Input
                                                id="watermark-text"
                                                value={watermarkSettings.text}
                                                onChange={(e) => setWatermarkSettings(prev => ({ ...prev, text: e.target.value }))}
                                                placeholder="Digite o texto da marca d'água"
                                                className="border-border focus:border-cyan-500"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="watermark-color" className="flex items-center gap-2 mb-2">
                                                <i className="fas fa-palette text-cyan-500"></i>
                                                Cor do Texto
                                            </Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    id="watermark-color"
                                                    type="color"
                                                    value={watermarkSettings.color}
                                                    onChange={(e) => setWatermarkSettings(prev => ({ ...prev, color: e.target.value }))}
                                                    className="w-14 h-10 p-1 border-border cursor-pointer"
                                                    autoComplete="off"
                                                />
                                                <Input
                                                    value={watermarkSettings.color}
                                                    onChange={(e) => setWatermarkSettings(prev => ({ ...prev, color: e.target.value }))}
                                                    placeholder="#ffffff"
                                                    className="flex-1 border-border"
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label className="flex items-center gap-2 mb-2">
                                                <i className="fas fa-text-height text-cyan-500"></i>
                                                Tamanho do Texto: {watermarkSettings.fontSize}%
                                            </Label>
                                            <Slider
                                                value={[watermarkSettings.fontSize]}
                                                onValueChange={([value]) => setWatermarkSettings(prev => ({ ...prev, fontSize: value }))}
                                                max={15}
                                                min={1}
                                                step={1}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <Label htmlFor="logo-upload" className="flex items-center gap-2 mb-2">
                                            <i className="fas fa-upload text-cyan-500"></i>
                                            Upload do Logo
                                        </Label>
                                        <Button
                                            variant="outline"
                                            onClick={() => logoInputRef.current?.click()}
                                            className="w-full border-dashed hover:border-cyan-500 hover:bg-cyan-500/5"
                                        >
                                            <i className={`fas ${watermarkSettings.logoFile ? 'fa-sync-alt' : 'fa-cloud-arrow-up'} mr-2`}></i>
                                            {watermarkSettings.logoFile ? 'Trocar Logo' : 'Selecionar Logo'}
                                        </Button>
                                        <input
                                            ref={logoInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoUpload}
                                            className="hidden"
                                            autoComplete="off"
                                        />
                                        {watermarkSettings.logoFile && (
                                            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                                                <i className="fas fa-check-circle text-green-500"></i>
                                                {watermarkSettings.logoFile.name}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Settings */}
                        <Card className="p-6 shadow-lg border-border">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <i className="fas fa-sliders text-cyan-500"></i>
                                Configurações
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <Label className="flex items-center justify-between mb-2">
                                        <span className="flex items-center gap-2">
                                            <i className="fas fa-eye text-cyan-500"></i>
                                            Opacidade
                                        </span>
                                        <span className="text-muted-foreground">{Math.round(watermarkSettings.opacity * 100)}%</span>
                                    </Label>
                                    <Slider
                                        value={[watermarkSettings.opacity]}
                                        onValueChange={([value]) => setWatermarkSettings(prev => ({ ...prev, opacity: value }))}
                                        max={1}
                                        min={0}
                                        step={0.05}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label className="flex items-center gap-2 mb-3">
                                        <i className="fas fa-arrows-to-dot text-cyan-500"></i>
                                        Posição
                                    </Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {positions.slice(0, 2).map((pos) => (
                                            <Tooltip key={pos.value}>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant={watermarkSettings.position === pos.value ? 'default' : 'outline'}
                                                        size="sm"
                                                        onClick={() => setWatermarkSettings(prev => ({ ...prev, position: pos.value }))}
                                                        className={watermarkSettings.position === pos.value ? 'bg-cyan-500 hover:bg-cyan-600' : ''}
                                                    >
                                                        {pos.icon}
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{pos.label}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        ))}
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant={watermarkSettings.position === 'center' ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => setWatermarkSettings(prev => ({ ...prev, position: 'center' }))}
                                                    className={watermarkSettings.position === 'center' ? 'bg-cyan-500 hover:bg-cyan-600' : ''}
                                                >
                                                    ●
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Centro</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        {positions.slice(3).map((pos) => (
                                            <Tooltip key={pos.value}>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant={watermarkSettings.position === pos.value ? 'default' : 'outline'}
                                                        size="sm"
                                                        onClick={() => setWatermarkSettings(prev => ({ ...prev, position: pos.value }))}
                                                        className={watermarkSettings.position === pos.value ? 'bg-cyan-500 hover:bg-cyan-600' : ''}
                                                    >
                                                        {pos.icon}
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{pos.label}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        ))}
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Process Button */}
                        <Button
                            size="lg"
                            onClick={processAllImages}
                            disabled={images.length === 0 || isProcessing}
                            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-xl hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <>
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Processando...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-download mr-2"></i>
                                    Processar e Baixar ({images.length})
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Preview Panel */}
                    <div className="lg:col-span-2">
                        <Card className="p-6 shadow-lg border-border h-full">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <i className="fas fa-eye text-cyan-500"></i>
                                    Preview ao Vivo
                                </h3>
                                {images.length > 0 && (
                                    <span className="text-sm text-muted-foreground">
                                        Imagem {currentImageIndex + 1} de {images.length}
                                    </span>
                                )}
                            </div>

                            {images.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="bg-muted/50 rounded-xl p-4 overflow-auto max-h-[600px] flex items-center justify-center">
                                        <canvas
                                            ref={canvasRef}
                                            className="max-w-full h-auto border border-border rounded-lg shadow-lg"
                                        />
                                    </div>
                                    {images.length > 1 && (
                                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                                            {images.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${index === currentImageIndex
                                                            ? 'border-cyan-500 shadow-lg shadow-cyan-500/25'
                                                            : 'border-border hover:border-cyan-500/50'
                                                        }`}
                                                >
                                                    <img
                                                        src={image.url}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-96 bg-muted/30 rounded-xl border-2 border-dashed border-border">
                                    <div className="text-center">
                                        <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <i className="fas fa-images text-cyan-500 text-4xl"></i>
                                        </div>
                                        <h4 className="text-lg font-medium mb-2">Nenhuma Imagem Carregada</h4>
                                        <p className="text-muted-foreground mb-4">
                                            Faça upload de uma imagem para ver o preview
                                        </p>
                                        <Button
                                            variant="outline"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/10"
                                        >
                                            <i className="fas fa-upload mr-2"></i>
                                            Carregar Imagem
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>

            {/* Tips Section */}
            <div className="bg-muted/30 border-t border-border py-12">
                <div className="container mx-auto px-4">
                    <h3 className="text-xl font-semibold mb-6 text-center">
                        <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
                        Dicas para Melhores Resultados
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-card p-4 rounded-xl border border-border">
                            <i className="fas fa-image text-cyan-500 text-xl mb-2"></i>
                            <h4 className="font-medium mb-1">Imagens de Alta Qualidade</h4>
                            <p className="text-sm text-muted-foreground">Use imagens em alta resolução para melhores resultados</p>
                        </div>
                        <div className="bg-card p-4 rounded-xl border border-border">
                            <i className="fas fa-eye-dropper text-cyan-500 text-xl mb-2"></i>
                            <h4 className="font-medium mb-1">Contraste de Cores</h4>
                            <p className="text-sm text-muted-foreground">Escolha cores que contrastem com sua imagem</p>
                        </div>
                        <div className="bg-card p-4 rounded-xl border border-border">
                            <i className="fas fa-sliders text-cyan-500 text-xl mb-2"></i>
                            <h4 className="font-medium mb-1">Opacidade Equilibrada</h4>
                            <p className="text-sm text-muted-foreground">30-60% de opacidade costuma funcionar bem</p>
                        </div>
                        <div className="bg-card p-4 rounded-xl border border-border">
                            <i className="fas fa-arrows-to-dot text-cyan-500 text-xl mb-2"></i>
                            <h4 className="font-medium mb-1">Posicionamento</h4>
                            <p className="text-sm text-muted-foreground">Cantos são ideais para não atrapalhar o conteúdo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FerramentaPage;

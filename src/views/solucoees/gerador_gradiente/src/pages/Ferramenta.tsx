import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Breadcrumb from '../components/layout/Breadcrumb';
import SEO from '../components/SEO';
import Swal from 'sweetalert2';

type GradientType = 'linear' | 'radial' | 'conic';
type Direction = 'to right' | 'to left' | 'to top' | 'to bottom' | 'to top right' | 'to top left' | 'to bottom right' | 'to bottom left';

const Ferramenta = () => {
    const [gradientType, setGradientType] = useState<GradientType>('linear');
    const [direction, setDirection] = useState<Direction>('to right');
    const [color1, setColor1] = useState('#6366f1');
    const [color2, setColor2] = useState('#a855f7');
    const [angle, setAngle] = useState(90);

    const generateGradient = () => {
        if (gradientType === 'linear') {
            return `linear-gradient(${direction}, ${color1}, ${color2})`;
        } else if (gradientType === 'radial') {
            return `radial-gradient(circle, ${color1}, ${color2})`;
        } else {
            return `conic-gradient(from ${angle}deg, ${color1}, ${color2})`;
        }
    };

    const copyToClipboard = async () => {
        const cssCode = `background: ${generateGradient()};`;
        try {
            await navigator.clipboard.writeText(cssCode);
            Swal.fire({
                icon: 'success',
                title: 'Copiado!',
                text: 'Código CSS copiado para a área de transferência',
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Não foi possível copiar o código',
            });
        }
    };

    const presets = [
        { name: 'Sunset', color1: '#ff6b6b', color2: '#feca57', type: 'linear' as GradientType, direction: 'to right' as Direction },
        { name: 'Ocean', color1: '#667eea', color2: '#764ba2', type: 'linear' as GradientType, direction: 'to right' as Direction },
        { name: 'Forest', color1: '#11998e', color2: '#38ef7d', type: 'linear' as GradientType, direction: 'to bottom' as Direction },
        { name: 'Fire', color1: '#f12711', color2: '#f5af19', type: 'linear' as GradientType, direction: 'to top' as Direction },
        { name: 'Purple Dream', color1: '#c471ed', color2: '#f64f59', type: 'radial' as GradientType, direction: 'to right' as Direction },
        { name: 'Blue Sky', color1: '#56ccf2', color2: '#2f80ed', type: 'linear' as GradientType, direction: 'to bottom' as Direction },
    ];

    const applyPreset = (preset: typeof presets[0]) => {
        setColor1(preset.color1);
        setColor2(preset.color2);
        setGradientType(preset.type);
        setDirection(preset.direction);
    };

    const randomGradient = () => {
        const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        setColor1(randomColor());
        setColor2(randomColor());
    };

    return (
        <Layout>
            <SEO
                title="Ferramenta Gerador de Gradiente CSS - Crie Agora Grátis | 3w Online"
                description="Use nossa ferramenta gratuita para criar gradientes CSS perfeitos. Visualização em tempo real, múltiplos formatos e exportação instantânea de código."
                keywords="ferramenta gradiente, gerador css, criar gradiente, gradient tool, css generator"
                url="https://app.3wonline.com/gerador_gradiente/ferramenta"
            />

            <div className="container mx-auto px-4 pb-12">
                <Breadcrumb items={[{ label: 'Ferramenta' }]} />

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Gerador de Gradiente CSS
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600">
                        Crie gradientes perfeitos com visualização em tempo real
                    </p>
                </div>

                {/* Main Tool */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Preview */}
                    <div className="order-2 lg:order-1">
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold flex items-center">
                                    <i className="fas fa-eye mr-2 text-indigo-600"></i>
                                    Visualização
                                </h2>
                                <button
                                    onClick={randomGradient}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                                    data-tooltip="Gerar cores aleatórias"
                                >
                                    <i className="fas fa-random"></i>
                                    <span>Aleatório</span>
                                </button>
                            </div>

                            <div
                                className="w-full h-80 rounded-xl shadow-inner mb-6 transition-all duration-300"
                                style={{ background: generateGradient() }}
                            ></div>

                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-700">Código CSS:</span>
                                    <button
                                        onClick={copyToClipboard}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                                    >
                                        <i className="fas fa-copy"></i>
                                        <span>Copiar</span>
                                    </button>
                                </div>
                                <code className="block bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
                                    background: {generateGradient()};
                                </code>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="order-1 lg:order-2">
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <h2 className="text-2xl font-bold mb-6 flex items-center">
                                <i className="fas fa-sliders-h mr-2 text-purple-600"></i>
                                Controles
                            </h2>

                            <div className="space-y-6">
                                {/* Gradient Type */}
                                <div>
                                    <label className="block font-medium mb-3 flex items-center">
                                        <i className="fas fa-paint-roller mr-2 text-indigo-600"></i>
                                        Tipo de Gradiente
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {(['linear', 'radial', 'conic'] as GradientType[]).map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setGradientType(type)}
                                                className={`py-3 px-4 rounded-lg font-medium transition-all ${gradientType === type
                                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Direction (for linear gradients) */}
                                {gradientType === 'linear' && (
                                    <div>
                                        <label className="block font-medium mb-3 flex items-center">
                                            <i className="fas fa-arrows-alt mr-2 text-purple-600"></i>
                                            Direção
                                        </label>
                                        <select
                                            value={direction}
                                            onChange={(e) => setDirection(e.target.value as Direction)}
                                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                                            autoComplete="off"
                                        >
                                            <option value="to right">Para Direita →</option>
                                            <option value="to left">Para Esquerda ←</option>
                                            <option value="to top">Para Cima ↑</option>
                                            <option value="to bottom">Para Baixo ↓</option>
                                            <option value="to top right">Para Cima Direita ↗</option>
                                            <option value="to top left">Para Cima Esquerda ↖</option>
                                            <option value="to bottom right">Para Baixo Direita ↘</option>
                                            <option value="to bottom left">Para Baixo Esquerda ↙</option>
                                        </select>
                                    </div>
                                )}

                                {/* Angle (for conic gradients) */}
                                {gradientType === 'conic' && (
                                    <div>
                                        <label className="block font-medium mb-3 flex items-center">
                                            <i className="fas fa-compass mr-2 text-purple-600"></i>
                                            Ângulo: {angle}°
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="360"
                                            value={angle}
                                            onChange={(e) => setAngle(Number(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>
                                )}

                                {/* Color 1 */}
                                <div>
                                    <label className="block font-medium mb-3 flex items-center">
                                        <i className="fas fa-palette mr-2 text-indigo-600"></i>
                                        Cor Inicial
                                    </label>
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="color"
                                            value={color1}
                                            onChange={(e) => setColor1(e.target.value)}
                                            className="w-16 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                                            autoComplete="off"
                                        />
                                        <input
                                            type="text"
                                            value={color1}
                                            onChange={(e) => setColor1(e.target.value)}
                                            className="flex-1 p-3 border-2 border-gray-200 rounded-lg font-mono uppercase focus:border-indigo-500 focus:outline-none"
                                            placeholder="#000000"
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                {/* Color 2 */}
                                <div>
                                    <label className="block font-medium mb-3 flex items-center">
                                        <i className="fas fa-palette mr-2 text-purple-600"></i>
                                        Cor Final
                                    </label>
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="color"
                                            value={color2}
                                            onChange={(e) => setColor2(e.target.value)}
                                            className="w-16 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                                            autoComplete="off"
                                        />
                                        <input
                                            type="text"
                                            value={color2}
                                            onChange={(e) => setColor2(e.target.value)}
                                            className="flex-1 p-3 border-2 border-gray-200 rounded-lg font-mono uppercase focus:border-indigo-500 focus:outline-none"
                                            placeholder="#000000"
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Presets */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                        <i className="fas fa-swatchbook mr-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"></i>
                        Gradientes Predefinidos
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {presets.map((preset, index) => (
                            <button
                                key={index}
                                onClick={() => applyPreset(preset)}
                                className="group relative overflow-hidden rounded-xl h-24 hover:shadow-xl transition-all duration-300 hover:scale-105"
                                style={{
                                    background: `linear-gradient(${preset.direction}, ${preset.color1}, ${preset.color2})`,
                                }}
                            >
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        {preset.name}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Instructions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-100">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                            <i className="fas fa-palette text-white text-xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-3">1. Escolha as Cores</h3>
                        <p className="text-gray-600">
                            Selecione as cores inicial e final do seu gradiente usando os seletores ou digitando o código hex.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-100">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                            <i className="fas fa-sliders-h text-white text-xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-3">2. Ajuste os Controles</h3>
                        <p className="text-gray-600">
                            Configure o tipo de gradiente e a direção para obter o efeito desejado.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-100">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                            <i className="fas fa-code text-white text-xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-3">3. Copie o Código</h3>
                        <p className="text-gray-600">
                            Clique no botão "Copiar" e cole o código CSS pronto em seu projeto.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Ferramenta;

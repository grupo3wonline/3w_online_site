import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCopy,
    faDownload,
    faRedo,
    faInfoCircle,
    faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Layout from '../components/Layout';

const Ferramentas = () => {
    const [textType, setTextType] = useState('lorem');
    const [format, setFormat] = useState('paragraphs');
    const [quantity, setQuantity] = useState(3);
    const [generatedText, setGeneratedText] = useState('');

    const loremText = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    ];

    const mussumText = [
        'Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.',
        'Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit.',
        'Pra lá, depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Viva Forevis aptent taciti sociosqu ad litora torquent.',
        'Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim.',
        'Quem num gosta di mim que vai caçá sua turmis! Casamentiss faiz malandris se pirulitá.',
    ];

    const generateText = () => {
        const texts = textType === 'lorem' ? loremText : mussumText;
        let result = '';

        if (format === 'paragraphs') {
            result = texts.slice(0, quantity).join('\n\n');
        } else if (format === 'sentences') {
            const allSentences = texts.join(' ').split('. ');
            result = allSentences.slice(0, quantity).join('. ') + '.';
        } else if (format === 'words') {
            const allWords = texts.join(' ').split(' ');
            result = allWords.slice(0, quantity).join(' ');
        }

        setGeneratedText(result);

        Swal.fire({
            icon: 'success',
            title: 'Texto Gerado!',
            text: 'Seu texto foi gerado com sucesso.',
            timer: 2000,
            showConfirmButton: false,
        });
    };

    const copyText = () => {
        if (!generatedText) {
            Swal.fire({
                icon: 'warning',
                title: 'Atenção',
                text: 'Gere um texto antes de copiar!',
            });
            return;
        }

        navigator.clipboard.writeText(generatedText);
        Swal.fire({
            icon: 'success',
            title: 'Copiado!',
            text: 'Texto copiado para a área de transferência.',
            timer: 1500,
            showConfirmButton: false,
        });
    };

    const downloadText = () => {
        if (!generatedText) {
            Swal.fire({
                icon: 'warning',
                title: 'Atenção',
                text: 'Gere um texto antes de baixar!',
            });
            return;
        }

        const blob = new Blob([generatedText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lorem-ipsum-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);

        Swal.fire({
            icon: 'success',
            title: 'Download Iniciado!',
            text: 'Seu arquivo está sendo baixado.',
            timer: 1500,
            showConfirmButton: false,
        });
    };

    const showHelp = () => {
        Swal.fire({
            title: 'Como Usar',
            html: `
        <div class="text-left space-y-3">
          <p><strong>1.</strong> Escolha o tipo de texto (Lorem Ipsum Clássico ou Mussum Ipsum Brasileiro)</p>
          <p><strong>2.</strong> Selecione o formato (Parágrafos, Frases ou Palavras)</p>
          <p><strong>3.</strong> Defina a quantidade desejada</p>
          <p><strong>4.</strong> Clique em "Gerar Texto"</p>
          <p><strong>5.</strong> Use os botões para copiar ou baixar o resultado</p>
        </div>
      `,
            icon: 'info',
            confirmButtonText: 'Entendi',
            confirmButtonColor: '#7c3aed',
        });
    };

    const showTips = () => {
        Swal.fire({
            title: 'Dicas Profissionais',
            html: `
        <div class="text-left space-y-3">
          <p>💡 <strong>Use para protótipos:</strong> Textos Lorem Ipsum são perfeitos para visualizar layouts</p>
          <p>🎨 <strong>Teste tipografia:</strong> Veja como diferentes fontes se comportam</p>
          <p>📱 <strong>Responsividade:</strong> Teste como o texto se adapta em diferentes telas</p>
          <p>🚀 <strong>Economize tempo:</strong> Não perca tempo criando textos de exemplo</p>
          <p>✨ <strong>Mussum Ipsum:</strong> Use para dar um toque brasileiro e divertido</p>
        </div>
      `,
            icon: 'info',
            confirmButtonText: 'Ótimo!',
            confirmButtonColor: '#7c3aed',
        });
    };

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white py-16">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Gerador de Lorem Ipsum
                    </h1>
                    <p className="text-xl text-violet-100 max-w-2xl mx-auto">
                        Crie textos personalizados instantaneamente
                    </p>
                </div>
            </section>

            {/* Generator Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Controls */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-white to-violet-50 p-8 rounded-2xl shadow-xl border border-violet-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Configurações
                                    </h2>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={showHelp}
                                            className="p-2 text-violet-600 hover:bg-violet-100 rounded-lg transition-colors duration-300"
                                            title="Ajuda"
                                        >
                                            <FontAwesomeIcon icon={faQuestionCircle} className="text-xl" />
                                        </button>
                                        <button
                                            onClick={showTips}
                                            className="p-2 text-violet-600 hover:bg-violet-100 rounded-lg transition-colors duration-300"
                                            title="Dicas"
                                        >
                                            <FontAwesomeIcon icon={faInfoCircle} className="text-xl" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Tipo de Texto */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Tipo de Texto
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => setTextType('lorem')}
                                                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${textType === 'lorem'
                                                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                Lorem Ipsum
                                            </button>
                                            <button
                                                onClick={() => setTextType('mussum')}
                                                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${textType === 'mussum'
                                                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                Mussum Ipsum
                                            </button>
                                        </div>
                                    </div>

                                    {/* Formato */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Formato
                                        </label>
                                        <select
                                            value={format}
                                            onChange={(e) => setFormat(e.target.value)}
                                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-300"
                                            autoComplete="off"
                                        >
                                            <option value="paragraphs">Parágrafos</option>
                                            <option value="sentences">Frases</option>
                                            <option value="words">Palavras</option>
                                        </select>
                                    </div>

                                    {/* Quantidade */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Quantidade: {quantity}
                                        </label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            className="w-full h-2 bg-violet-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                                            <span>1</span>
                                            <span>10</span>
                                        </div>
                                    </div>

                                    {/* Botão Gerar */}
                                    <button
                                        onClick={generateText}
                                        className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                    >
                                        <FontAwesomeIcon icon={faRedo} className="mr-2" />
                                        Gerar Texto
                                    </button>
                                </div>
                            </div>

                            {/* Info Cards */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-100">
                                    <div className="text-3xl font-bold text-violet-600 mb-2">100%</div>
                                    <div className="text-sm text-gray-600">Gratuito</div>
                                </div>
                                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-100">
                                    <div className="text-3xl font-bold text-violet-600 mb-2">∞</div>
                                    <div className="text-sm text-gray-600">Ilimitado</div>
                                </div>
                            </div>
                        </div>

                        {/* Output */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-white to-violet-50 p-8 rounded-2xl shadow-xl border border-violet-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Resultado</h2>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={copyText}
                                            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all duration-300 flex items-center space-x-2"
                                            title="Copiar"
                                        >
                                            <FontAwesomeIcon icon={faCopy} />
                                            <span className="hidden sm:inline">Copiar</span>
                                        </button>
                                        <button
                                            onClick={downloadText}
                                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 flex items-center space-x-2"
                                            title="Download"
                                        >
                                            <FontAwesomeIcon icon={faDownload} />
                                            <span className="hidden sm:inline">Baixar</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl border-2 border-gray-200 min-h-[400px]">
                                    {generatedText ? (
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                            {generatedText}
                                        </p>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                                            <FontAwesomeIcon icon={faInfoCircle} className="text-6xl mb-4" />
                                            <p className="text-lg">
                                                Configure suas opções e clique em "Gerar Texto"
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gradient-to-br from-violet-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Recursos da Ferramenta
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="font-bold text-lg mb-2">Geração Instantânea</h3>
                            <p className="text-gray-600 text-sm">Tenha seu texto em milissegundos</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                            <div className="text-4xl mb-4">🎨</div>
                            <h3 className="font-bold text-lg mb-2">Múltiplos Estilos</h3>
                            <p className="text-gray-600 text-sm">Lorem clássico ou Mussum brasileiro</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                            <div className="text-4xl mb-4">📋</div>
                            <h3 className="font-bold text-lg mb-2">Copiar com 1 Clique</h3>
                            <p className="text-gray-600 text-sm">Interface simples e intuitiva</p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Ferramentas;

import Layout from '@/components/Layout';
import ColorTool from '@/components/ColorTool';
import CTASection from '@/components/CTASection';
import Swal from 'sweetalert2';

const Ferramentas = () => {
    const showHelpModal = () => {
        Swal.fire({
            title: '<strong><i class="fas fa-question-circle mr-2"></i>Como Usar</strong>',
            icon: 'info',
            html: `
        <div class="text-left space-y-4">
          <div class="bg-violet-50 p-4 rounded-lg">
            <h3 class="font-bold text-violet-900 mb-2"><i class="fas fa-palette mr-2"></i>Gerador de Paletas</h3>
            <ol class="list-decimal pl-5 space-y-2 text-sm">
              <li>Escolha uma cor base usando o seletor</li>
              <li>Selecione um esquema harmônico (complementar, análogo, tríade...)</li>
              <li>Ajuste o número de cores desejadas</li>
              <li>Clique em "Gerar Paleta"</li>
              <li>Copie os códigos de cores</li>
            </ol>
          </div>
          
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-bold text-blue-900 mb-2"><i class="fas fa-sync-alt mr-2"></i>Conversor de Cores</h3>
            <p class="text-sm">Converta facilmente entre formatos HEX, RGB, HSL e CMYK.</p>
          </div>
          
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="font-bold text-green-900 mb-2"><i class="fas fa-lightbulb mr-2"></i>Dicas</h3>
            <ul class="list-disc pl-5 space-y-1 text-sm">
              <li>Use cores complementares para criar contraste</li>
              <li>Cores análogas criam harmonia visual</li>
              <li>Tríades são ótimas para designs vibrantes</li>
              <li>Teste a acessibilidade das cores</li>
            </ul>
          </div>
        </div>
      `,
            width: 700,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: '<i class="fas fa-check mr-2"></i>Entendi!',
            confirmButtonColor: '#8B5CF6',
            customClass: {
                popup: 'rounded-2xl',
                title: 'text-2xl',
            }
        });
    };

    const showTipsModal = () => {
        Swal.fire({
            title: '<strong><i class="fas fa-lightbulb mr-2"></i>Dicas Profissionais</strong>',
            icon: 'success',
            html: `
        <div class="text-left space-y-3">
          <div class="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <h4 class="font-bold text-yellow-900 mb-1">Regra 60-30-10</h4>
            <p class="text-sm text-yellow-800">Use 60% cor dominante, 30% cor secundária e 10% cor de destaque.</p>
          </div>
          
          <div class="p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
            <h4 class="font-bold text-purple-900 mb-1">Contraste</h4>
            <p class="text-sm text-purple-800">Garanta bom contraste entre texto e fundo para acessibilidade (mínimo 4.5:1).</p>
          </div>
          
          <div class="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
            <h4 class="font-bold text-blue-900 mb-1">Psicologia das Cores</h4>
            <p class="text-sm text-blue-800">Azul transmite confiança, vermelho energia, verde natureza, roxo criatividade.</p>
          </div>
          
          <div class="p-3 bg-green-50 border-l-4 border-green-500 rounded">
            <h4 class="font-bold text-green-900 mb-1">Teste em Diferentes Dispositivos</h4>
            <p class="text-sm text-green-800">As cores podem parecer diferentes em telas variadas. Sempre teste!</p>
          </div>
        </div>
      `,
            width: 700,
            showCloseButton: true,
            confirmButtonText: '<i class="fas fa-thumbs-up mr-2"></i>Obrigado!',
            confirmButtonColor: '#10B981',
        });
    };

    return (
        <Layout>
            {/* Hero */}
            <section className="bg-gradient-to-br from-violet-600 to-purple-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Ferramenta de <span className="text-yellow-300">Cores</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-8">
                            Crie paletas harmônicas profissionais em segundos
                        </p>

                        {/* Help Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button
                                onClick={showHelpModal}
                                className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105"
                                data-tooltip-id="help-tooltip"
                                data-tooltip-content="Clique para ver instruções de uso"
                            >
                                <i className="fas fa-question-circle mr-2"></i>
                                Como Usar
                            </button>

                            <button
                                onClick={showTipsModal}
                                className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105"
                                data-tooltip-id="tips-tooltip"
                                data-tooltip-content="Dicas profissionais de design"
                            >
                                <i className="fas fa-lightbulb mr-2"></i>
                                Dicas
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tool Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <ColorTool />
                </div>
            </section>

            {/* Info Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                                Recursos <span className="text-violet-600">Profissionais</span>
                            </h2>
                            <p className="text-xl text-gray-600">
                                Tudo que você precisa para criar paletas perfeitas
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: 'fa-palette',
                                    title: 'Esquemas Harmônicos',
                                    desc: 'Complementar, Análogo, Tríade, Tetrádico e mais',
                                    color: 'from-violet-500 to-purple-500'
                                },
                                {
                                    icon: 'fa-sync-alt',
                                    title: 'Conversão de Cores',
                                    desc: 'HEX, RGB, HSL, HSV, CMYK',
                                    color: 'from-blue-500 to-cyan-500'
                                },
                                {
                                    icon: 'fa-adjust',
                                    title: 'Ajuste Fino',
                                    desc: 'Saturação, Luminosidade, Tonalidade',
                                    color: 'from-green-500 to-emerald-500'
                                },
                                {
                                    icon: 'fa-copy',
                                    title: 'Copiar Rápido',
                                    desc: 'Um clique para copiar qualquer cor',
                                    color: 'from-pink-500 to-rose-500'
                                },
                                {
                                    icon: 'fa-download',
                                    title: 'Exportar',
                                    desc: 'CSS, JSON, SVG, PNG',
                                    color: 'from-orange-500 to-amber-500'
                                },
                                {
                                    icon: 'fa-eye',
                                    title: 'Pré-visualização',
                                    desc: 'Veja sua paleta em tempo real',
                                    color: 'from-indigo-500 to-purple-500'
                                },
                            ].map((feature, idx) => (
                                <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                                        <i className={`fas ${feature.icon} text-2xl text-white`}></i>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Usage Tips */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                                Instruções de <span className="text-violet-600">Uso</span>
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    step: '1',
                                    title: 'Escolha a Cor Base',
                                    desc: 'Use o seletor de cores ou insira um código HEX/RGB. Esta será sua cor principal.',
                                    icon: 'fa-eyedropper'
                                },
                                {
                                    step: '2',
                                    title: 'Selecione o Esquema',
                                    desc: 'Escolha entre complementar, análogo, tríade, tetrádico ou split-complementar.',
                                    icon: 'fa-sliders-h'
                                },
                                {
                                    step: '3',
                                    title: 'Ajuste as Cores',
                                    desc: 'Refine cada cor individualmente ajustando saturação, luminosidade e matiz.',
                                    icon: 'fa-adjust'
                                },
                                {
                                    step: '4',
                                    title: 'Copie e Use',
                                    desc: 'Clique nas cores para copiar ou exporte sua paleta em diversos formatos.',
                                    icon: 'fa-download'
                                },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex flex-col items-center justify-center text-white">
                                            <span className="text-2xl font-bold">{item.step}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2 text-gray-900 flex items-center">
                                            <i className={`fas ${item.icon} text-violet-600 mr-3`}></i>
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <CTASection
                title="Precisa de um Site Profissional?"
                subtitle="A 3w Online cria sites e sistemas personalizados com design profissional e paletas de cores exclusivas. Transforme sua presença digital!"
                buttonText="Criar Meu Projeto"
                buttonIcon="fa-paint-brush"
            />
        </Layout>
    );
};

export default Ferramentas;

import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCode,
    faMobile,
    faSearch,
    faRocket,
    faCheckCircle,
    faServer,
    faPalette,
    faChartBar,
    faHeadset,
    faCogs,
    faArrowRight,
    faStar,
    faShieldAlt,
    faUsers,
    faLightbulb,
} from '@fortawesome/free-solid-svg-icons';

const ServicesPage = () => {
    const services = [
        {
            icon: faCode,
            title: 'Desenvolvimento Web',
            description: 'Sites e sistemas personalizados com tecnologia de ponta, responsivos e otimizados para resultados.',
            features: ['React.js, Vue.js & Next.js', 'Laravel, Node.js & Python', 'APIs RESTful & GraphQL', 'Performance & SEO otimizados'],
            gradient: 'from-violet-500 to-purple-600',
        },
        {
            icon: faMobile,
            title: 'Aplicativos Mobile',
            description: 'Apps nativos e multiplataforma para iOS e Android com interface moderna e experiência premium.',
            features: ['React Native & Flutter', 'Apps PWA progressivos', 'Integração com APIs', 'UX/UI de alta qualidade'],
            gradient: 'from-blue-500 to-cyan-600',
        },
        {
            icon: faSearch,
            title: 'SEO & Marketing Digital',
            description: 'Estratégias completas para posicionar seu negócio no topo do Google e gerar mais resultados.',
            features: ['Auditoria SEO completa', 'Google Ads & Meta Ads', 'Analytics & Tag Manager', 'Conteúdo otimizado'],
            gradient: 'from-green-500 to-emerald-600',
        },
        {
            icon: faServer,
            title: 'Sistemas Sob Medida',
            description: 'ERPs, CRMs, painéis administrativos e automações que resolvem os problemas reais do seu negócio.',
            features: ['ERP & CRM customizados', 'Dashboards & relatórios', 'Automação de processos', 'Integrações com APIs externas'],
            gradient: 'from-amber-500 to-orange-600',
        },
        {
            icon: faPalette,
            title: 'Design & UX/UI',
            description: 'Interfaces bonitas e intuitivas que encantam seus usuários e aumentam a conversão.',
            features: ['Design System & Branding', 'Prototipagem Figma', 'Testes de usabilidade', 'Design responsivo'],
            gradient: 'from-pink-500 to-rose-600',
        },
        {
            icon: faChartBar,
            title: 'Consultoria & Mentoria',
            description: 'Orientação estratégica para escolher as melhores tecnologias e caminhos para seu projeto digital.',
            features: ['Análise de viabilidade', 'Arquitetura de sistemas', 'Code review & auditoria', 'Planejamento de MVP'],
            gradient: 'from-indigo-500 to-violet-600',
        },
    ];

    const processSteps = [
        { step: '01', title: 'Descoberta', description: 'Entendemos suas necessidades, objetivos e desafios em uma reunião gratuita.' },
        { step: '02', title: 'Planejamento', description: 'Definimos escopo, prazos, tecnologias e entregáveis com total transparência.' },
        { step: '03', title: 'Desenvolvimento', description: 'Construímos com agilidade, testes e entregas parciais para seu acompanhamento.' },
        { step: '04', title: 'Entrega & Suporte', description: 'Lançamento com treinamento, documentação e suporte contínuo incluso.' },
    ];

    return (
        <div className="bg-white">
            <Helmet>
                <title>Serviços — Desenvolvimento Web, Apps e Sistemas | 3w Online</title>
                <meta name="description" content="Desenvolvimento web, apps mobile, SEO, sistemas sob medida e consultoria digital. Solicite seu orçamento gratuito." />
            </Helmet>

            {/* Hero */}
            <section className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-violet-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
                        <span className="text-sm font-semibold">Projetos que geram resultados reais</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        Soluções Digitais que <br />
                        <span className="text-yellow-300">Transformam Negócios</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-violet-100 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Do primeiro pixel ao deploy final — desenvolvemos sites, apps e sistemas sob medida com a 
                        <strong className="text-yellow-300"> mesma qualidade profissional</strong> que você vê nesta plataforma.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://www.3wonline.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
                        >
                            <span>Solicitar Orçamento Grátis</span>
                            <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 text-sm mt-10">
                        {[
                            '✅ Orçamento sem compromisso',
                            '✅ Atendimento personalizado',
                            '✅ Prazos realistas',
                            '✅ Suporte pós-entrega',
                        ].map((item) => (
                            <div key={item} className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                <span className="font-semibold">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-violet-100 text-violet-600 px-4 py-2 rounded-full font-semibold text-sm mb-4">
                            💼 Nossos Serviços
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Tudo que seu Projeto Precisa
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Da ideia ao produto final, cobrimos todas as etapas do desenvolvimento digital
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="group bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-violet-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <FontAwesomeIcon icon={service.icon} className="text-3xl text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                                <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-600">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-violet-100 text-violet-600 px-4 py-2 rounded-full font-semibold text-sm mb-4">
                            ⚙️ Nosso Processo
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Como Trabalhamos
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Metodologia ágil com foco em entregas rápidas e comunicação transparente
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((item, index) => (
                            <div key={index} className="relative">
                                <div className="bg-white rounded-2xl p-8 shadow-lg text-center h-full border-2 border-transparent hover:border-violet-300 transition-all duration-300">
                                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-full font-bold text-xl mb-6">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
                                {index < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-violet-300">
                                        <FontAwesomeIcon icon={faArrowRight} className="text-xl" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Por Que Escolher a 3w Online?
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: faCogs, title: 'Tecnologia de Ponta', desc: 'React, Laravel, Node.js, Flutter — usamos o melhor stack para cada projeto.' },
                            { icon: faHeadset, title: 'Suporte Dedicado', desc: 'Canal direto com a equipe técnica, sem intermediários ou robôs.' },
                            { icon: faShieldAlt, title: 'Segurança & LGPD', desc: 'Código seguro, criptografia e conformidade com a legislação brasileira.' },
                            { icon: faUsers, title: 'Foco no Resultado', desc: 'Cada projeto é desenhado para gerar valor real e retorno sobre o investimento.' },
                        ].map((item, index) => (
                            <div key={index} className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300">
                                <FontAwesomeIcon icon={item.icon} className="text-3xl text-violet-600 mb-4" />
                                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technologies */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-8">Tecnologias que Dominamos</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            'React.js', 'Vue.js', 'Next.js', 'TypeScript', 'Node.js', 'Laravel', 'Python',
                            'PostgreSQL', 'MySQL', 'MongoDB', 'Docker', 'AWS', 'React Native', 'Flutter',
                            'Tailwind CSS', 'GraphQL', 'Redis', 'Firebase', 'Git', 'CI/CD',
                        ].map((tech) => (
                            <span key={tech} className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:border-violet-400 hover:text-violet-600 transition-colors">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { q: 'Quanto custa desenvolver um site ou sistema?', a: 'Cada projeto é único. Oferecemos orçamento gratuito e personalizado após entender suas necessidades. Valores variam conforme complexidade e funcionalidades.' },
                            { q: 'Qual o prazo médio de entrega?', a: 'Sites institucionais: 2-4 semanas. Sistemas e apps: 4-12 semanas, dependendo da complexidade. Sempre definimos prazos realistas na proposta.' },
                            { q: 'Vocês oferecem suporte após a entrega?', a: 'Sim! Todos os projetos incluem período de garantia e suporte técnico. Oferecemos também planos de manutenção mensal para atualizações contínuas.' },
                            { q: 'Trabalham com projetos de qualquer tamanho?', a: 'Sim, atendemos desde landing pages e MVPs até sistemas complexos com múltiplas integrações. Cada projeto recebe atenção personalizada.' },
                            { q: 'Os testes de personalidade desta plataforma são um exemplo do trabalho de vocês?', a: 'Exatamente! Esta plataforma é uma vitrine real da qualidade do nosso trabalho — design, performance, SEO e funcionalidades completas.' },
                        ].map((item, index) => (
                            <details key={index} className="bg-white border border-gray-200 rounded-xl p-6 group hover:border-violet-300 transition-colors">
                                <summary className="font-bold text-gray-900 cursor-pointer flex items-center justify-between">
                                    {item.q}
                                    <FontAwesomeIcon icon={faLightbulb} className="text-violet-400 group-open:text-violet-600 transition-colors ml-4 flex-shrink-0" />
                                </summary>
                                <p className="text-gray-600 mt-4 leading-relaxed">{item.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-violet-600 to-purple-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FontAwesomeIcon icon={faRocket} className="text-6xl mb-6" />
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Transforme Sua Ideia em Realidade
                    </h2>
                    <p className="text-xl text-violet-100 mb-8 leading-relaxed">
                        A <strong className="text-yellow-300">3w Online</strong> tem anos de experiência no desenvolvimento de soluções digitais sob medida.
                        Entre em contato e descubra como podemos ajudar seu projeto a decolar!
                    </p>
                    <a
                        href="https://www.3wonline.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-yellow-400 text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                        🚀 Solicitar Orçamento Gratuito →
                    </a>
                    <p className="mt-6 text-sm text-violet-200">
                        ✨ Sem compromisso • Atendimento personalizado • Resposta em 24h
                    </p>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;

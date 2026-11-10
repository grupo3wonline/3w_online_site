import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import CTA3wOnline from '@/components/CTA3wOnline';
import Swal from 'sweetalert2';

const Tools = () => {
    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Ferramentas', path: '/ferramentas' }
    ];

    const [guests, setGuests] = useState(100);
    const [location, setLocation] = useState('capital');
    const [budget, setBudget] = useState<any>(null);

    const calculateBudget = () => {
        // Base cost per guest based on location
        const locationMultipliers: any = {
            capital: 350,
            interior: 250,
            rural: 180
        };

        const basePerGuest = locationMultipliers[location];
        const totalGuests = parseInt(guests.toString());

        // Calculate different categories
        const venue = basePerGuest * totalGuests * 0.30;
        const catering = basePerGuest * totalGuests * 0.35;
        const decoration = basePerGuest * totalGuests * 0.15;
        const photography = totalGuests * 80;
        const music = totalGuests * 50;
        const wedding_cake = totalGuests * 25;
        const invitations = totalGuests * 10;
        const souvenirs = totalGuests * 15;
        const misc = basePerGuest * totalGuests * 0.10;

        const total = venue + catering + decoration + photography + music + wedding_cake + invitations + souvenirs + misc;

        setBudget({
            total,
            perGuest: total / totalGuests,
            categories: {
                venue,
                catering,
                decoration,
                photography,
                music,
                wedding_cake,
                invitations,
                souvenirs,
                misc
            }
        });

        Swal.fire({
            icon: 'success',
            title: 'Orçamento Calculado!',
            text: `Valor total estimado: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
            confirmButtonColor: '#a855f7'
        });
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const getPercentage = (value: number) => {
        if (!budget) return 0;
        return ((value / budget.total) * 100).toFixed(1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            <Breadcrumb items={breadcrumbItems} />

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center space-y-6">
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Calculadora de Orçamento
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                            Descubra quanto custará o casamento dos seus sonhos
                        </p>
                    </div>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Input Panel */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-100 sticky top-24">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <i className="fas fa-pen-to-square text-purple-600"></i>
                                    Dados do Evento
                                </h2>

                                <div className="space-y-6">
                                    {/* Number of Guests */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Número de Convidados
                                            <button
                                                className="ml-2 text-purple-500 hover:text-purple-700"
                                                onClick={() => Swal.fire({
                                                    title: 'Dica!',
                                                    text: 'Inclua todos os convidados esperados, incluindo crianças.',
                                                    icon: 'info',
                                                    confirmButtonColor: '#a855f7'
                                                })}
                                            >
                                                <i className="fas fa-question-circle"></i>
                                            </button>
                                        </label>
                                        <input
                                            type="number"
                                            value={guests}
                                            onChange={(e) => setGuests(parseInt(e.target.value) || 0)}
                                            min="1"
                                            max="1000"
                                            autoComplete="off"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors text-lg font-semibold"
                                        />
                                        <input
                                            type="range"
                                            value={guests}
                                            onChange={(e) => setGuests(parseInt(e.target.value))}
                                            min="10"
                                            max="500"
                                            className="w-full mt-3"
                                        />
                                        <div className="text-center mt-2 text-sm text-gray-600">
                                            {guests} convidados
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Localização do Evento
                                            <button
                                                className="ml-2 text-purple-500 hover:text-purple-700"
                                                onClick={() => Swal.fire({
                                                    title: 'Localização',
                                                    html: '<strong>Capital:</strong> Cidades grandes (SP, RJ, etc.)<br><strong>Interior:</strong> Cidades médias<br><strong>Rural:</strong> Áreas rurais ou pequenas cidades',
                                                    icon: 'info',
                                                    confirmButtonColor: '#a855f7'
                                                })}
                                            >
                                                <i className="fas fa-question-circle"></i>
                                            </button>
                                        </label>
                                        <select
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors text-lg font-semibold"
                                        >
                                            <option value="capital">Capital / Grande Cidade</option>
                                            <option value="interior">Interior / Cidade Média</option>
                                            <option value="rural">Zona Rural / Pequena Cidade</option>
                                        </select>
                                    </div>

                                    {/* Calculate Button */}
                                    <button
                                        onClick={calculateBudget}
                                        className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105"
                                    >
                                        <i className="fas fa-calculator mr-2"></i>
                                        Calcular Orçamento
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="lg:col-span-2">
                            {budget ? (
                                <div className="space-y-6">
                                    {/* Total Summary */}
                                    <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-3xl p-8 shadow-2xl text-white">
                                        <div className="text-center">
                                            <p className="text-lg opacity-90 mb-2">Orçamento Total Estimado</p>
                                            <h2 className="text-5xl md:text-6xl font-bold mb-4">
                                                {formatCurrency(budget.total)}
                                            </h2>
                                            <p className="text-xl opacity-90">
                                                {formatCurrency(budget.perGuest)} por convidado
                                            </p>
                                        </div>
                                    </div>

                                    {/* Categories Breakdown */}
                                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-100">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                            <i className="fas fa-chart-pie text-purple-600"></i>
                                            Distribuição de Custos
                                        </h3>

                                        <div className="space-y-4">
                                            {[
                                                { key: 'venue', label: 'Local / Buffet', icon: 'fa-building', color: 'bg-pink-500' },
                                                { key: 'catering', label: 'Alimentação', icon: 'fa-utensils', color: 'bg-purple-500' },
                                                { key: 'decoration', label: 'Decoração', icon: 'fa-palette', color: 'bg-blue-500' },
                                                { key: 'photography', label: 'Fotografia / Vídeo', icon: 'fa-camera', color: 'bg-teal-500' },
                                                { key: 'music', label: 'Música / DJ', icon: 'fa-music', color: 'bg-indigo-500' },
                                                { key: 'wedding_cake', label: 'Bolo de Casamento', icon: 'fa-cake-candles', color: 'bg-amber-500' },
                                                { key: 'invitations', label: 'Convites', icon: 'fa-envelope', color: 'bg-rose-500' },
                                                { key: 'souvenirs', label: 'Lembrancinhas', icon: 'fa-gift', color: 'bg-emerald-500' },
                                                { key: 'misc', label: 'Outros / Imprevistos', icon: 'fa-ellipsis', color: 'bg-gray-500' }
                                            ].map((category) => {
                                                const value = budget.categories[category.key];
                                                const percentage = getPercentage(value);

                                                return (
                                                    <div key={category.key} className="group">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                                    <i className={`fas ${category.icon} text-white`}></i>
                                                                </div>
                                                                <span className="font-semibold text-gray-700">{category.label}</span>
                                                            </div>
                                                            <span className="font-bold text-gray-800">
                                                                {formatCurrency(value)}
                                                            </span>
                                                        </div>
                                                        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full ${category.color} rounded-full transition-all duration-500`}
                                                                style={{ width: `${percentage}%` }}
                                                            ></div>
                                                        </div>
                                                        <div className="text-right text-sm text-gray-500 mt-1">
                                                            {percentage}% do total
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Disclaimer */}
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                                        <div className="flex items-start gap-3">
                                            <i className="fas fa-info-circle text-yellow-600 text-xl mt-1"></i>
                                            <div className="text-sm text-gray-700">
                                                <strong className="text-yellow-800">Importante:</strong> Estes valores são estimativas baseadas em médias de mercado e podem variar conforme região, fornecedores escolhidos e especificações do evento. Recomendamos consultar profissionais locais para orçamentos precisos.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-purple-100 text-center">
                                    <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <i className="fas fa-calculator text-purple-500 text-4xl"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                        Pronto para Começar?
                                    </h3>
                                    <p className="text-gray-600 text-lg">
                                        Preencha os dados ao lado e clique em "Calcular Orçamento" para ver uma estimativa detalhada dos custos do seu casamento.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Tips Section */}
            <section className="py-20 px-4 bg-white/40 backdrop-blur-sm">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Dicas para Economia
                        </h2>
                        <p className="text-xl text-gray-600">
                            Economize sem perder qualidade no seu grande dia
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Escolha a Data com Sabedoria',
                                tip: 'Casamentos em dias de semana ou fora da alta temporada (maio-dezembro) costumam ser 30-40% mais econômicos.',
                                icon: 'fa-calendar'
                            },
                            {
                                title: 'Negocie com Fornecedores',
                                tip: 'Não aceite o primeiro orçamento. Compare pelo menos 3 fornecedores e negocie descontos para pagamento à vista.',
                                icon: 'fa-handshake'
                            },
                            {
                                title: 'DIY com Moderação',
                                tip: 'Faça você mesmo decorações simples, convites digitais ou lembrancinhas. Mas contrate profissionais para alimentação e fotografia.',
                                icon: 'fa-hands'
                            },
                            {
                                title: 'Lista de Convidados Enxuta',
                                tip: 'Cada convidado a menos representa economia significativa. Priorize pessoas realmente importantes.',
                                icon: 'fa-users'
                            },
                            {
                                title: 'Buffet Inteligente',
                                tip: 'Opte por buffet de jantar ao invés de almoço, ou considere coquetel em pé que sai até 50% mais barato.',
                                icon: 'fa-utensils'
                            },
                            {
                                title: 'Flores da Estação',
                                tip: 'Escolha flores da época que são mais baratas e bonitas. Evite importadas que encarecem muito.',
                                icon: 'fa-seedling'
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-purple-100 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                                    <i className={`fas ${item.icon} text-white text-xl`}></i>
                                </div>
                                <h4 className="font-bold text-gray-800 mb-2 text-lg">{item.title}</h4>
                                <p className="text-gray-600 text-sm">{item.tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTA3wOnline />
        </div>
    );
};

export default Tools;


import { ArrowRight, Zap, Download, Palette, Check, QrCode, BarChart3, Globe, ShoppingCart, Calendar, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CodeGen
            </span>
          </div>
          <Button 
            onClick={() => navigate('/generator')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Usar Gerador <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Gere QR Codes e Códigos de Barras
            <span className="block text-slate-700">em Segundos</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Ferramenta gratuita e intuitiva para criar códigos visuais profissionais. 
            Perfeito para empresas, eventos e uso pessoal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => navigate('/generator')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Começar Agora - Grátis <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-slate-500">✓ Sem cadastro necessário</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-800">Por que escolher o CodeGen?</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Simplicidade e qualidade profissional em uma única ferramenta
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Geração Instantânea</h3>
              <p className="text-slate-600 leading-relaxed">
                Códigos gerados em tempo real conforme você digita. Sem espera, sem complicação.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Download Fácil</h3>
              <p className="text-slate-600 leading-relaxed">
                Baixe seus códigos em alta qualidade no formato PNG para uso imediato.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Design Profissional</h3>
              <p className="text-slate-600 leading-relaxed">
                Códigos limpos e profissionais, prontos para impressão ou uso digital.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white/50 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-800">Como Funciona</h2>
            <p className="text-xl text-slate-600">Apenas 3 passos simples</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Digite seu Conteúdo</h3>
              <p className="text-slate-600">Insira o texto, URL ou dados que deseja transformar em código</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Escolha o Tipo</h3>
              <p className="text-slate-600">Selecione entre QR Code ou Código de Barras conforme sua necessidade</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Baixe e Use</h3>
              <p className="text-slate-600">Faça o download da imagem em alta qualidade e use onde precisar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-800">Casos de Uso</h2>
          <p className="text-xl text-slate-600">Ideal para diversas situações</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { icon: Globe, title: "Sites e Links", desc: "Compartilhe URLs de forma rápida" },
            { icon: ShoppingCart, title: "E-commerce", desc: "Códigos para produtos e promoções" },
            { icon: Calendar, title: "Eventos", desc: "Check-in e informações de eventos" },
            { icon: Building, title: "Empresas", desc: "Cartões de visita digitais" },
            { icon: BarChart3, title: "Inventário", desc: "Controle de estoque e produtos" },
            { icon: QrCode, title: "Marketing", desc: "Campanhas e materiais promocionais" }
          ].map((item, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <item.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2 text-slate-800">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white/50 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-800">Perguntas Frequentes</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "O CodeGen é realmente gratuito?",
                a: "Sim! Você pode gerar e baixar quantos códigos quiser, sem limite e sem custo."
              },
              {
                q: "Que formatos de código são suportados?",
                a: "Atualmente oferecemos QR Codes e Códigos de Barras (Code 128). Mais formatos em breve!"
              },
              {
                q: "Posso usar os códigos comercialmente?",
                a: "Absolutamente! Os códigos gerados são seus para usar como quiser, incluindo uso comercial."
              },
              {
                q: "Os dados ficam armazenados?",
                a: "Não! Todos os códigos são gerados no seu navegador. Seus dados não são enviados para servidores."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3 text-slate-800 flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-2" />
                    {faq.q}
                  </h3>
                  <p className="text-slate-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-slate-800">
            Pronto para Criar seus Códigos?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Junte-se a milhares de usuários que já confiam no CodeGen
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/generator')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Começar Agora - É Grátis <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">CodeGen</span>
          </div>
          <p className="text-slate-400 mb-4">
            Gerador gratuito de QR Codes e Códigos de Barras
          </p>
          <p className="text-slate-500 text-sm">
            © 2024 CodeGen. Feito com ❤️ para simplificar sua vida.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

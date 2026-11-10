import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, RefreshCw, FileText, RotateCw, ArrowLeft, Receipt, Save, Sparkles, Trash2, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Receipt1 from "../components/templates/Receipt1";
import Receipt2 from "../components/templates/Receipt2";
import Receipt3 from "../components/templates/Receipt3";
import Receipt4 from "../components/templates/Receipt4";
import { formatCurrency } from "../utils/formatCurrency";
import { generateReceiptPDF } from "../utils/receiptPDFGenerator";
import { generateGSTNumber } from "../utils/invoiceCalculations";
import FloatingLabelInput from "../components/FloatingLabelInput";
import ItemDetails from "../components/ItemDetails";

const generateRandomInvoiceNumber = () => {
  const length = Math.floor(Math.random() * 6) + 3;
  const alphabetCount = Math.min(Math.floor(Math.random() * 4), length);
  let result = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  for (let i = 0; i < alphabetCount; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  for (let i = alphabetCount; i < length; i++) {
    result += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return result;
};

const footerOptions = [
  "Obrigado por nos escolher hoje! Esperamos que sua experiência de compra tenha sido agradável e tranquila. Sua satisfação é importante para nós e esperamos atendê-lo novamente em breve. Guarde este recibo fiscal para devoluções ou trocas.",
  "Sua compra apoia nossa comunidade! Acreditamos em dar retorno e trabalhar por um futuro melhor. Obrigado por fazer parte da nossa jornada. Agradecemos sua confiança e esperamos vê-lo novamente em breve.",
  "Valorizamos seu feedback! Ajude-nos a melhorar compartilhando seus pensamentos no link da pesquisa por mensagem de texto. Suas opiniões nos ajudam a servi-lo melhor e aprimorar sua experiência de compra. Obrigado por comprar conosco!",
  "Sabia que você pode economizar mais com nosso programa de fidelidade? Pergunte sobre ele na sua próxima visita e ganhe pontos a cada compra. É nossa forma de dizer obrigado por ser um cliente fiel. Até a próxima!",
  "Precisa de assistência com sua compra? Estamos aqui para ajudar! Entre em contato com nosso suporte ao cliente ou visite nosso site para mais informações. Estamos comprometidos em fornecer o melhor atendimento possível.",
  "Guarde este recibo fiscal para devoluções ou trocas.",
  "Cada compra faz a diferença! Somos dedicados a práticas ecológicas e sustentabilidade. Obrigado por apoiar um planeta mais verde conosco. Juntos, podemos construir um futuro melhor.",
  "Tenha um ótimo dia!",
  "Obrigado por comprar conosco hoje. Sabia que você pode devolver ou trocar seus itens em até 30 dias com este recibo fiscal? Queremos garantir que você esteja satisfeito com sua compra, então não hesite em voltar se precisar de ajuda.",
  "Empresa ecologicamente responsável. Este recibo fiscal é reciclável.",
  "Esperamos que tenha gostado da sua experiência de compra! Lembre-se, para cada amigo que você indicar, pode ganhar recompensas exclusivas. Visite www.exemplo.com/indicar para mais detalhes. Esperamos recebê-lo de volta em breve!",
  "Obrigado por nos escolher! Valorizamos seu negócio e esperamos servi-lo novamente. Guarde este recibo fiscal para consultas futuras ou devoluções.",
  "Sua compra apoia empresas locais e nos ajuda a continuar nossa missão. Obrigado por ser um cliente valioso. Esperamos vê-lo novamente em breve!",
  "Esperamos que tenha tido uma ótima experiência de compra hoje. Se tiver algum feedback, compartilhe conosco em nosso site. Estamos sempre aqui para ajudá-lo.",
  "Obrigado pela sua visita! Lembre-se, oferecemos descontos exclusivos para clientes que retornam. Verifique seu e-mail para ofertas especiais na sua próxima compra.",
  "Sua satisfação é nossa prioridade máxima. Se precisar de ajuda ou tiver dúvidas sobre sua compra, não hesite em nos contatar. Tenha um ótimo dia!",
  "Amamos nossos clientes! Obrigado por apoiar nosso negócio. Siga-nos nas redes sociais para atualizações sobre promoções e novos produtos. Até a próxima!",
  "Cada compra conta! Estamos comprometidos em causar um impacto positivo, e seu apoio nos ajuda a alcançar nossos objetivos. Obrigado por comprar conosco hoje!",
  "Esperamos que tenha encontrado tudo o que precisava. Se não, avise-nos para que possamos melhorar sua experiência. Seu feedback nos ajuda a servi-lo melhor. Obrigado!",
  "Obrigado por nos visitar! Sabia que pode economizar mais com nosso programa de recompensas? Pergunte sobre ele durante sua próxima visita e comece a ganhar pontos hoje!",
  "Agradecemos sua confiança em nós. Se precisar de assistência com seu pedido, visite nosso site ou ligue para o atendimento ao cliente. Estamos aqui para ajudar!",
];

const ReceiptPage = () => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const receiptRef = useRef(null);

  const [billTo, setBillTo] = useState("");
  const [invoice, setInvoice] = useState({
    date: "",
    number: generateRandomInvoiceNumber(),
  });
  const [yourCompany, setYourCompany] = useState({
    name: "",
    address: "",
    phone: "",
    gst: "",
  });
  const [cashier, setCashier] = useState("");
  const [items, setItems] = useState([
    { name: "", description: "", quantity: 0, amount: 0, total: 0 },
  ]);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [theme, setTheme] = useState("Receipt1");
  const [notes, setNotes] = useState("");
  const [footer, setFooter] = useState("Obrigado");
  const [selectedCurrency, setSelectedCurrency] = useState("BRL");

  const refreshFooter = () => {
    const randomIndex = Math.floor(Math.random() * footerOptions.length);
    setFooter(footerOptions[randomIndex]);
  };

  useEffect(() => {
    // Load form data from localStorage on component mount
    const savedFormData = localStorage.getItem("receiptFormData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setBillTo(parsedData.billTo || "");
      setInvoice(parsedData.invoice || { date: "", number: generateRandomInvoiceNumber() });
      setYourCompany(parsedData.yourCompany || { name: "", address: "", phone: "", gst: "" });
      setCashier(parsedData.cashier || "");
      setItems(parsedData.items || [{ name: "", description: "", quantity: 0, amount: 0, total: 0 }]);
      setTaxPercentage(parsedData.taxPercentage || 0);
      setNotes(parsedData.notes || "");
      setFooter(parsedData.footer || "Obrigado");
      setSelectedCurrency(parsedData.selectedCurrency || "BRL");
    } else {
      // Initialize with default values if nothing in localStorage
      setInvoice((prev) => ({ ...prev, number: generateRandomInvoiceNumber() }));
      setItems([{ name: "", description: "", quantity: 0, amount: 0, total: 0 }]);
    }
  }, []);

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    const formData = {
      billTo,
      invoice,
      yourCompany,
      cashier,
      items,
      taxPercentage,
      notes,
      footer,
      selectedCurrency,
    };
    localStorage.setItem("receiptFormData", JSON.stringify(formData));
  }, [billTo, invoice, yourCompany, cashier, items, taxPercentage, notes, footer, selectedCurrency]);

  const handleDownloadPDF = async () => {
    if (!isDownloading && receiptRef.current) {
      setIsDownloading(true);
      const receiptData = { // Prepare receiptData object
        billTo,
        invoice,
        yourCompany,
        cashier,
        items,
        taxPercentage,
        notes,
        footer,
        selectedCurrency,
      };
      try {
        await generateReceiptPDF(receiptRef.current, theme, receiptData);
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === "quantity" || field === "amount") {
      newItems[index].total = newItems[index].quantity * newItems[index].amount;
    }
    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", description: "", quantity: 0, amount: 0, total: 0 },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const calculateSubTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const calculateTaxAmount = () => {
    const subTotal = parseFloat(calculateSubTotal());
    return (subTotal * (taxPercentage / 100)).toFixed(2);
  };

  const calculateGrandTotal = () => {
    const subTotal = parseFloat(calculateSubTotal());
    const taxAmount = parseFloat(calculateTaxAmount());
    return (subTotal + taxAmount).toFixed(2);
  };

  const fillDummyData = () => {
    setBillTo("João Silva - Cliente");
    setYourCompany({
      name: "Sua Empresa Ltda",
      address: "Rua do Comércio, 789 - Empresarial, São Paulo - SP",
      phone: "(11) 7777-7777",
      gst: "12.345.678/0001-90"
    });
    setCashier("Maria Santos");
    setInvoice({
      date: new Date().toISOString().split("T")[0],
      number: generateRandomInvoiceNumber(),
    });
    setItems([
      {
        name: "Produto A",
        description: "Descrição do produto A",
        quantity: 2,
        amount: 25.50,
        total: 51.00,
      },
      {
        name: "Produto B",
        description: "Descrição do produto B",
        quantity: 1,
        amount: 49.90,
        total: 49.90,
      }
    ]);
    setTaxPercentage(10);
    setNotes("Obrigado pela preferência!");
    setFooter("Tenha um ótimo dia!");
    toast.success("Dados de exemplo carregados com sucesso!");
  };

  const clearForm = () => {
    setBillTo("");
    setYourCompany({ name: "", address: "", phone: "", gst: "" });
    setCashier("");
    setInvoice({
      date: "",
      number: generateRandomInvoiceNumber(),
    });
    setItems([{ name: "", description: "", quantity: 0, amount: 0, total: 0 }]);
    setTaxPercentage(0);
    setNotes("");
    setFooter("Obrigado");
    localStorage.removeItem("receiptFormData");
    toast.success("Formulário limpo com sucesso!");
  };

  const saveData = () => {
    const formData = {
      billTo,
      invoice,
      yourCompany,
      cashier,
      items,
      taxPercentage,
      notes,
      footer,
      selectedCurrency,
    };
    localStorage.setItem("receiptFormData", JSON.stringify(formData));
    toast.success("Dados salvos com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar ao Início</span>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-primary to-purple-600 p-2 rounded-xl">
                  <Receipt className="h-5 w-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  FaturaPro - Gerador de Recibos Fiscais
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/app')}
                className="flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>Notas Fiscais</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button
            onClick={saveData}
            variant="default"
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-soft"
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar Dados
          </Button>
          <Button
            onClick={fillDummyData}
            variant="secondary"
            className="shadow-soft"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Dados de Exemplo
          </Button>
          <Button
            onClick={clearForm}
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Limpar Tudo
          </Button>
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-600/90 hover:to-emerald-600/90"
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Baixando...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Baixar PDF
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Informações da Sua Empresa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FloatingLabelInput
                      id="yourCompanyName"
                      label="Nome da Empresa"
                      value={yourCompany.name}
                      onChange={handleInputChange(setYourCompany)}
                      name="name"
                    />
                    <FloatingLabelInput
                      id="yourCompanyPhone"
                      label="Telefone"
                      value={yourCompany.phone}
                      onChange={handleInputChange(setYourCompany)}
                      name="phone"
                    />
                  </div>
                  <FloatingLabelInput
                    id="yourCompanyAddress"
                    label="Endereço Completo"
                    value={yourCompany.address}
                    onChange={handleInputChange(setYourCompany)}
                    name="address"
                  />
                  <div className="relative">
                    <FloatingLabelInput
                      id="yourCompanyGST"
                      label="CNPJ"
                      value={yourCompany.gst}
                      onChange={(e) => {
                        const value = e.target.value.slice(0, 18);
                        handleInputChange(setYourCompany)({
                          target: { name: "gst", value },
                        });
                      }}
                      name="gst"
                      maxLength={18}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newGST = generateGSTNumber();
                        setYourCompany(prev => ({ ...prev, gst: newGST }));
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200"
                      title="Gerar novo CNPJ"
                    >
                      <RotateCw size={16} />
                    </button>
                  </div>
                  <FloatingLabelInput
                    id="cashier"
                    label="Atendente"
                    value={cashier}
                    onChange={(e) => setCashier(e.target.value)}
                    name="cashier"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <FloatingLabelInput
                  id="billTo"
                  label="Nome do Cliente"
                  value={billTo}
                  onChange={(e) => setBillTo(e.target.value)}
                  name="billTo"
                />
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  <span>Informações do Recibo Fiscal</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingLabelInput
                    id="invoiceNumber"
                    label="Número do Recibo Fiscal"
                    value={invoice.number}
                    onChange={handleInputChange(setInvoice)}
                    name="number"
                  />
                  <FloatingLabelInput
                    id="invoiceDate"
                    label="Data do Recibo Fiscal"
                    type="date"
                    value={invoice.date}
                    onChange={handleInputChange(setInvoice)}
                    name="date"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <ItemDetails
                  items={items}
                  handleItemChange={handleItemChange}
                  addItem={addItem}
                  removeItem={removeItem}
                  currencyCode={selectedCurrency}
                />
              </CardContent>
            </Card>
          </div>

          {/* Summary and Preview Section */}
          <div className="space-y-6">
            {/* Totals Summary */}
            <Card className="shadow-medium border-0 bg-gradient-to-br from-card to-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <span>Resumo Financeiro</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-semibold">{formatCurrency(parseFloat(calculateSubTotal()), selectedCurrency)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Taxa de Imposto (%):</span>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={taxPercentage}
                        onChange={(e) => setTaxPercentage(parseFloat(e.target.value) || 0)}
                        className="w-20 px-3 py-2 border rounded-lg text-center bg-background"
                        min="0"
                        max="100"
                        step="0.1"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg">
                    <span className="text-muted-foreground">Valor do Imposto:</span>
                    <span className="font-semibold">{formatCurrency(parseFloat(calculateTaxAmount()), selectedCurrency)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-2xl font-bold text-primary">
                    <span>Total Geral:</span>
                    <span>{formatCurrency(parseFloat(calculateGrandTotal()), selectedCurrency)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-24 p-4 border rounded-lg resize-none bg-background"
                  placeholder="Digite suas observações aqui..."
                />
              </CardContent>
            </Card>

            {/* Footer Section */}
            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Rodapé</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshFooter}
                    className="flex items-center space-x-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Gerar Rodapé</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={footer}
                  onChange={(e) => setFooter(e.target.value)}
                  className="w-full h-16 p-4 border rounded-lg resize-none bg-background"
                  placeholder="Digite o rodapé aqui ou clique em 'Gerar Rodapé' para uma sugestão..."
                />
              </CardContent>
            </Card>

            {/* Templates Selection */}
            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Escolha um Template de Recibo Fiscal</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Selecione um dos nossos templates profissionais para seu recibo fiscal
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {["Receipt1", "Receipt2", "Receipt3", "Receipt4"].map((template, index) => (
                    <div
                      key={template}
                      className={`cursor-pointer p-4 border-2 rounded-xl transition-all duration-300 bg-background shadow-soft hover:shadow-medium ${theme === template ? "border-primary bg-primary/5" : "border-border hover:border-primary"
                        }`}
                      onClick={() => setTheme(template)}
                    >
                      <div className="text-center">
                        <Receipt className="h-12 w-12 mx-auto mb-2 text-primary" />
                        <p className="font-medium">Modelo {index + 1}</p>
                        <Badge variant={theme === template ? "default" : "secondary"} className="mt-2">
                          {theme === template ? "Selecionado" : "Clique para usar"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Preview */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Pré-visualização</h3>
                  <div ref={receiptRef} className="w-[380px] mx-auto border shadow-lg rounded-lg overflow-hidden">
                    {theme === "Receipt1" && (
                      <Receipt1
                        data={{
                          billTo,
                          invoice,
                          yourCompany,
                          cashier,
                          items,
                          taxPercentage,
                          notes,
                          footer,
                          selectedCurrency,
                        }}
                      />
                    )}
                    {theme === "Receipt2" && (
                      <Receipt2
                        data={{
                          billTo,
                          invoice,
                          yourCompany,
                          cashier,
                          items,
                          taxPercentage,
                          notes,
                          footer,
                          selectedCurrency,
                        }}
                      />
                    )}
                    {theme === "Receipt3" && (
                      <Receipt3
                        data={{
                          billTo,
                          invoice,
                          yourCompany,
                          cashier,
                          items,
                          taxPercentage,
                          notes,
                          footer,
                          selectedCurrency,
                        }}
                      />
                    )}
                    {theme === "Receipt4" && (
                      <Receipt4
                        data={{
                          billTo,
                          invoice,
                          yourCompany,
                          items,
                          taxPercentage,
                          footer,
                          cashier,
                          selectedCurrency,
                        }}
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
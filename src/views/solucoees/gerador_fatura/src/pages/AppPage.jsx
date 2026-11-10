import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import FloatingLabelInput from '../components/FloatingLabelInput';
import BillToSection from '../components/BillToSection';
import ShipToSection from '../components/ShipToSection';
import ItemDetails from "../components/ItemDetails";
import { templates } from "../utils/templateRegistry";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Swal from 'sweetalert2';
import {
  FileText,
  Trash2,
  RotateCcw,
  Download,
  Home,
  Receipt,
  RefreshCw,
  Calculator,
  Save,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

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

const noteOptions = [
  "Obrigado por escolher nossos serviços! Esperamos que sua experiência tenha sido excelente. Sua satisfação é nossa prioridade e esperamos atendê-lo novamente em breve.",
  "Sua compra apoia nossa comunidade! Acreditamos em dar retorno e trabalhar por um futuro melhor. Obrigado por fazer parte da nossa jornada.",
  "Valorizamos seu feedback! Ajude-nos a melhorar compartilhando suas opiniões. Suas sugestões nos ajudam a servi-lo melhor.",
  "Sabia que você pode economizar mais com nosso programa de fidelidade? Pergunte sobre ele na sua próxima visita e ganhe pontos em cada compra.",
  "Precisa de assistência com sua compra? Estamos aqui para ajudar! Entre em contato com nosso suporte ao cliente ou visite nosso site.",
  "Guarde este recibo fiscal para devoluções ou trocas.",
  "Cada compra faz a diferença! Somos dedicados a práticas sustentáveis e ecológicas. Obrigado por apoiar um planeta mais verde conosco.",
  "Tenha um ótimo dia!",
  "Obrigado por fazer negócios conosco hoje. Sabia que você pode devolver ou trocar seus itens em até 30 dias com este recibo fiscal?",
  "Empresa ecologicamente responsável. Este recibo fiscal é reciclável.",
  "Esperamos que tenha gostado da sua experiência! Lembre-se, para cada amigo que você indicar, pode ganhar recompensas exclusivas.",
  "Obrigado por nos escolher! Valorizamos seu negócio e esperamos atendê-lo novamente.",
  "Sua compra apoia empresas locais e nos ajuda a continuar nossa missão. Obrigado por ser um cliente valioso.",
  "Esperamos que tenha tido uma ótima experiência de compra hoje. Se tiver algum feedback, compartilhe conosco em nosso site.",
  "Obrigado pela sua visita! Lembre-se, oferecemos descontos exclusivos para clientes que retornam.",
  "Sua satisfação é nossa prioridade máxima. Se precisar de ajuda ou tiver dúvidas sobre sua compra, não hesite em nos contatar.",
  "Amamos nossos clientes! Obrigado por apoiar nosso negócio. Siga-nos nas redes sociais para atualizações sobre promoções.",
  "Cada compra conta! Estamos comprometidos em causar um impacto positivo, e seu apoio nos ajuda a alcançar nossos objetivos.",
];

const AppPage = () => {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState("BRL");
  const [billTo, setBillTo] = useState({ name: "", address: "", phone: "" });
  const [shipTo, setShipTo] = useState({ name: "", address: "", phone: "" });
  const [invoice, setInvoice] = useState({
    date: "",
    paymentDate: "",
    number: "",
  });
  const [yourCompany, setYourCompany] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [items, setItems] = useState([]);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [notes, setNotes] = useState("");

  const refreshNotes = () => {
    const randomIndex = Math.floor(Math.random() * noteOptions.length);
    setNotes(noteOptions[randomIndex]);
    Swal.fire({ icon: 'success', title: 'Nota Atualizada!', text: 'A nota foi atualizada com sucesso.', timer: 2000, showConfirmButton: false });
  };

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setBillTo(parsedData.billTo || { name: "", address: "", phone: "" });
      setShipTo(parsedData.shipTo || { name: "", address: "", phone: "" });
      setInvoice(
        parsedData.invoice || { date: "", paymentDate: "", number: "" }
      );
      setYourCompany(
        parsedData.yourCompany || { name: "", address: "", phone: "" }
      );
      setItems(parsedData.items || []);
      setTaxPercentage(parsedData.taxPercentage || 0);
      setNotes(parsedData.notes || "");
      setSelectedCurrency(parsedData.selectedCurrency || "BRL");
    } else {
      setInvoice((prev) => ({
        ...prev,
        number: generateRandomInvoiceNumber(),
      }));
    }
  }, []);

  useEffect(() => {
    const formData = {
      billTo,
      shipTo,
      invoice,
      yourCompany,
      items,
      taxPercentage,
      taxAmount,
      subTotal,
      grandTotal,
      notes,
      selectedCurrency,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [
    billTo,
    shipTo,
    invoice,
    yourCompany,
    items,
    taxPercentage,
    notes,
    taxAmount,
    subTotal,
    grandTotal,
    selectedCurrency,
  ]);

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
    updateTotals();
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", description: "", quantity: 0, amount: 0, total: 0 },
    ]);
    Swal.fire({ icon: 'success', title: 'Item Adicionado!', timer: 1500, showConfirmButton: false });
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    Swal.fire({ icon: 'info', title: 'Item Removido!', timer: 1500, showConfirmButton: false });
  };

  const calculateSubTotal = () => {
    const calculatedSubTotal = items.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
    setSubTotal(calculatedSubTotal);
    return calculatedSubTotal;
  };

  const calculateTaxAmount = (subTotalValue) => {
    const tax = (subTotalValue * taxPercentage) / 100;
    setTaxAmount(tax);
    return tax;
  };

  const calculateGrandTotal = (subTotalValue, taxAmountValue) => {
    const total = parseFloat(subTotalValue) + parseFloat(taxAmountValue);
    setGrandTotal(total);
    return total;
  };

  const updateTotals = () => {
    const currentSubTotal = calculateSubTotal();
    const currentTaxAmount = calculateTaxAmount(currentSubTotal);
    calculateGrandTotal(currentSubTotal, currentTaxAmount);
  };

  const handleTaxPercentageChange = (e) => {
    const taxRate = parseFloat(e.target.value) || 0;
    setTaxPercentage(taxRate);
  };

  useEffect(() => {
    updateTotals();
  }, [items, taxPercentage]);

  const handleTemplateClick = (templateNumber) => {
    const formData = {
      billTo,
      shipTo,
      invoice,
      yourCompany,
      items,
      taxPercentage,
      taxAmount,
      subTotal,
      grandTotal,
      notes,
      selectedCurrency,
    };
    navigate("/template", {
      state: { formData, selectedTemplate: templateNumber },
    });
  };

  const fillDummyData = () => {
    setBillTo({
      name: "João Silva",
      address: "Rua das Flores, 123 - Centro, São Paulo - SP",
      phone: "(11) 99999-9999",
    });
    setShipTo({
      name: "Maria Santos",
      address: "Av. Paulista, 456 - Bela Vista, São Paulo - SP",
      phone: "(11) 88888-8888",
    });
    setInvoice({
      date: new Date().toISOString().split("T")[0],
      paymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      number: generateRandomInvoiceNumber(),
    });
    setYourCompany({
      name: "Sua Empresa Ltda",
      address: "Rua do Comércio, 789 - Empresarial, São Paulo - SP",
      phone: "(11) 7777-7777",
    });
    setItems([
      {
        name: "Consultoria em Marketing",
        description: "Serviço de consultoria especializada",
        quantity: 10,
        amount: 150,
        total: 1500,
      },
      {
        name: "Design Gráfico",
        description: "Criação de materiais visuais",
        quantity: 5,
        amount: 200,
        total: 1000,
      },
      {
        name: "Desenvolvimento Web",
        description: "Criação de site responsivo",
        quantity: 1,
        amount: 2500,
        total: 2500,
      },
    ]);
    setTaxPercentage(10);
    setSelectedCurrency("BRL");
    setNotes("Obrigado pela preferência! Esperamos fazer negócios novamente em breve.");
    Swal.fire({ icon: 'success', title: 'Dados Carregados!', text: 'Dados de exemplo foram preenchidos com sucesso.', timer: 2000, showConfirmButton: false });
  };

  const clearForm = () => {
    setBillTo({ name: "", address: "", phone: "" });
    setShipTo({ name: "", address: "", phone: "" });
    setInvoice({
      date: "",
      paymentDate: "",
      number: generateRandomInvoiceNumber(),
    });
    setYourCompany({ name: "", address: "", phone: "" });
    setItems([{ name: "", description: "", quantity: 0, amount: 0, total: 0 }]);
    setTaxPercentage(0);
    setNotes("");
    localStorage.removeItem("formData");
    Swal.fire({ icon: 'success', title: 'Formulário Limpo!', text: 'Todos os dados foram removidos.', timer: 2000, showConfirmButton: false });
  };

  const saveData = () => {
    const formData = {
      billTo,
      shipTo,
      invoice,
      yourCompany,
      items,
      taxPercentage,
      taxAmount,
      subTotal,
      grandTotal,
      notes,
      selectedCurrency,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
    Swal.fire({ icon: 'success', title: 'Dados Salvos!', text: 'Seus dados foram salvos localmente.', timer: 2000, showConfirmButton: false });
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
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Gerador de Faturas
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/receipt', {
                  state: {
                    formData: {
                      billTo,
                      shipTo,
                      invoice,
                      yourCompany,
                      items,
                      taxPercentage,
                      notes,
                      selectedCurrency,
                    },
                  },
                })}
                className="flex items-center space-x-2"
              >
                <Receipt className="h-4 w-4" />
                <span>Recibos Fiscais</span>
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <BillToSection
                  billTo={billTo}
                  handleInputChange={handleInputChange(setBillTo)}
                  selectedCurrency={selectedCurrency}
                  setSelectedCurrency={setSelectedCurrency}
                />
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <ShipToSection
                  shipTo={shipTo}
                  handleInputChange={handleInputChange(setShipTo)}
                  billTo={billTo}
                />
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Informações da Nota Fiscal</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FloatingLabelInput
                    id="invoiceNumber"
                    label="Número da Nota Fiscal"
                    value={invoice.number}
                    onChange={handleInputChange(setInvoice)}
                    name="number"
                  />
                  <FloatingLabelInput
                    id="invoiceDate"
                    label="Data da Nota Fiscal"
                    type="date"
                    value={invoice.date}
                    onChange={handleInputChange(setInvoice)}
                    name="date"
                  />
                  <FloatingLabelInput
                    id="paymentDate"
                    label="Data de Vencimento"
                    type="date"
                    value={invoice.paymentDate}
                    onChange={handleInputChange(setInvoice)}
                    name="paymentDate"
                  />
                </div>
              </CardContent>
            </Card>

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

          {/* Summary and Templates Section */}
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
                    <span className="font-semibold">{formatCurrency(subTotal, selectedCurrency)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Taxa de Imposto (%):</span>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={taxPercentage}
                        onChange={handleTaxPercentageChange}
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
                    <span className="font-semibold">{formatCurrency(taxAmount, selectedCurrency)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-2xl font-bold text-primary">
                    <span>Total Geral:</span>
                    <span>{formatCurrency(grandTotal, selectedCurrency)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Observações</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshNotes}
                    className="flex items-center space-x-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Gerar Nota</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-24 p-4 border rounded-lg resize-none bg-background"
                  placeholder="Digite suas observações aqui ou clique em 'Gerar Nota' para uma sugestão..."
                />
              </CardContent>
            </Card>

            {/* Templates Selection */}
            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Escolha um Template</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Selecione um dos nossos templates profissionais para sua fatura
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {templates.slice(0, 6).map((template, index) => (
                    <div
                      key={index}
                      className="cursor-pointer p-4 border-2 rounded-xl hover:border-primary transition-all duration-300 bg-background shadow-soft hover:shadow-medium"
                      onClick={() => handleTemplateClick(index + 1)}
                    >
                      <div className="text-center">
                        <FileText className="h-12 w-12 mx-auto mb-2 text-primary" />
                        <p className="font-medium">{template.name}</p>
                        <Badge variant="secondary" className="mt-2">
                          Clique para usar
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {templates.length > 6 && (
                  <div className="mt-4 text-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        // Show more templates logic
                        toast.info("Mais templates em breve!");
                      }}
                    >
                      Ver Mais Templates ({templates.length - 6} disponíveis)
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPage;
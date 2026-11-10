import React from 'react';
import FloatingLabelInput from './FloatingLabelInput';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from 'lucide-react';

const BillToSection = ({ billTo, handleInputChange, selectedCurrency, setSelectedCurrency }) => {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-soft bg-secondary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-primary" />
            <span>Selecionar Moeda</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedCurrency}
            onValueChange={setSelectedCurrency}
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="INR" id="inr" />
              <Label htmlFor="inr" className="text-base font-medium">Real Brasileiro (R$)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="USD" id="usd" />
              <Label htmlFor="usd" className="text-base font-medium">Dólar Americano ($)</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-primary">Faturar Para</h2>
        <p className="text-muted-foreground mb-6">Informações do cliente que receberá a fatura</p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FloatingLabelInput
              id="billToName"
              label="Nome Completo / Empresa"
              value={billTo.name}
              onChange={handleInputChange}
              name="name"
              placeholder="Ex: João Silva ou Empresa XYZ Ltda"
            />
            <FloatingLabelInput
              id="billToPhone"
              label="Telefone"
              value={billTo.phone}
              onChange={handleInputChange}
              name="phone"
              placeholder="(11) 99999-9999"
            />
          </div>
          <FloatingLabelInput
            id="billToAddress"
            label="Endereço Completo"
            value={billTo.address}
            onChange={handleInputChange}
            name="address"
            placeholder="Rua, Número, Bairro, Cidade - Estado, CEP"
          />
        </div>
      </div>
    </div>
  );
};

export default BillToSection;
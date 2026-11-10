import React, { useState } from 'react';
import FloatingLabelInput from './FloatingLabelInput';
import { ChevronDown, ChevronUp, Truck, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const ShipToSection = ({ shipTo, handleInputChange, billTo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copyBillToShip, setCopyBillToShip] = useState(false);

  const handleCopyBillToShip = (checked) => {
    setCopyBillToShip(checked);
    if (checked) {
      handleInputChange({ target: { name: 'name', value: billTo.name } });
      handleInputChange({ target: { name: 'address', value: billTo.address } });
      handleInputChange({ target: { name: 'phone', value: billTo.phone } });
      toast.success("Dados copiados do campo 'Faturar Para'");
    }
  };

  return (
    <div className="space-y-4">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Truck className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold text-primary">Entregar Para</h2>
            <span className="text-sm text-muted-foreground">(Opcional)</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="copyBillToShip"
                checked={copyBillToShip}
                onCheckedChange={handleCopyBillToShip}
              />
              <label htmlFor="copyBillToShip" className="text-sm font-medium cursor-pointer flex items-center space-x-1">
                <Copy className="h-4 w-4" />
                <span>Mesmo endereço de cobrança</span>
              </label>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Ocultar
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Expandir
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        
        <CollapsibleContent className="space-y-0 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <Card className="border-0 shadow-soft bg-secondary/10 mt-4">
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">
                Preencha apenas se o endereço de entrega for diferente do endereço de cobrança
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingLabelInput
                    id="shipToName"
                    label="Nome do Destinatário"
                    value={shipTo.name}
                    onChange={handleInputChange}
                    name="name"
                    placeholder="Nome da pessoa que receberá"
                  />
                  <FloatingLabelInput
                    id="shipToPhone"
                    label="Telefone para Entrega"
                    value={shipTo.phone}
                    onChange={handleInputChange}
                    name="phone"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <FloatingLabelInput
                  id="shipToAddress"
                  label="Endereço de Entrega Completo"
                  value={shipTo.address}
                  onChange={handleInputChange}
                  name="address"
                  placeholder="Rua, Número, Bairro, Cidade - Estado, CEP"
                />
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ShipToSection;

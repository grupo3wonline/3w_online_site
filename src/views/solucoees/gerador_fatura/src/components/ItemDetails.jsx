import React from 'react';
import FloatingLabelInput from './FloatingLabelInput';
import { Trash2, Plus, Package } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getCurrencySymbol } from '../utils/formatCurrency.js';
import { toast } from "sonner";

const ItemDetails = ({ items, handleItemChange, addItem, removeItem, currencyCode: propCurrencyCode }) => {
  let currencyCode = propCurrencyCode;
  if (!currencyCode) {
    console.warn("Aviso: currencyCode não fornecido para ItemDetails. Usando 'INR' como padrão.");
    currencyCode = 'INR';
  }
  const currencySymbol = getCurrencySymbol(currencyCode);

  const handleAddItem = () => {
    addItem();
    toast.success("Novo item adicionado!");
  };

  const handleRemoveItem = (index) => {
    removeItem(index);
    toast.success("Item removido!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold text-primary">Detalhes dos Itens</h2>
        </div>
        <Badge variant="secondary" className="text-sm">
          {items.length} {items.length === 1 ? 'item' : 'itens'}
        </Badge>
      </div>
      
      <p className="text-muted-foreground">
        Adicione os produtos ou serviços que serão cobrados nesta fatura
      </p>

      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={index} className="relative border-0 shadow-soft bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Item #{index + 1}</span>
                {index > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remover
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingLabelInput
                  id={`itemName${index}`}
                  label="Nome do Item/Serviço"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  placeholder="Ex: Consultoria, Produto, etc."
                />
                <FloatingLabelInput
                  id={`itemDescription${index}`}
                  label="Descrição"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  placeholder="Descrição detalhada do item"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FloatingLabelInput
                  id={`itemQuantity${index}`}
                  label="Quantidade"
                  type="number"
                  min="0"
                  step="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
                <FloatingLabelInput
                  id={`itemAmount${index}`}
                  label={`Valor Unitário (${currencySymbol})`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.amount}
                  onChange={(e) => handleItemChange(index, 'amount', parseFloat(e.target.value) || 0)}
                  placeholder="0,00"
                />
                <div className="relative">
                  <FloatingLabelInput
                    id={`itemTotal${index}`}
                    label={`Total (${currencySymbol})`}
                    type="text"
                    value={formatCurrency((item.quantity * item.amount), currencyCode)}
                    disabled
                    className="bg-secondary/50 font-semibold"
                  />
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 text-xs"
                  >
                    Calculado
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={handleAddItem} 
          className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-soft"
          size="lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Novo Item
        </Button>
      </div>
      
      {items.length === 0 && (
        <Card className="border-dashed border-2 border-muted bg-muted/20">
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg mb-4">
              Nenhum item adicionado ainda
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Clique no botão "Adicionar Novo Item" para começar
            </p>
            <Button 
              onClick={handleAddItem}
              variant="outline"
              size="lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Primeiro Item
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItemDetails;

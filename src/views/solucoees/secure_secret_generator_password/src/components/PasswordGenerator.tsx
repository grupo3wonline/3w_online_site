import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw, Shield, Settings } from 'lucide-react';

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  includeSpecialChars: boolean;
  excludeSimilar: boolean;
  count: number;
}

const PasswordGenerator = () => {
  const { toast } = useToast();
  const [passwords, setPasswords] = useState<string[]>([]);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    includeSpecialChars: false,
    excludeSimilar: true,
    count: 1,
  });

  const generatePassword = useCallback(() => {
    let charset = '';
    
    if (options.includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.includeNumbers) charset += '0123456789';
    if (options.includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:\'",.<>/?';
    if (options.includeSpecialChars) charset += 'àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ';
    
    if (options.excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }

    if (!charset) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um tipo de caractere",
        variant: "destructive",
      });
      return;
    }

    const newPasswords = [];
    for (let i = 0; i < options.count; i++) {
      let password = '';
      for (let j = 0; j < options.length; j++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      newPasswords.push(password);
    }

    setPasswords(newPasswords);
    
    toast({
      title: "Senhas geradas!",
      description: `${newPasswords.length} senha${newPasswords.length > 1 ? 's' : ''} criada${newPasswords.length > 1 ? 's' : ''} com sucesso`,
    });
  }, [options, toast]);

  const copyToClipboard = async (password: string) => {
    try {
      await navigator.clipboard.writeText(password);
      toast({
        title: "Copiado!",
        description: "Senha copiada para a área de transferência",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar a senha",
        variant: "destructive",
      });
    }
  };

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score < 3) return { text: 'Fraca', color: 'text-destructive' };
    if (score < 5) return { text: 'Média', color: 'text-yellow-600' };
    return { text: 'Forte', color: 'text-success' };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Gerador de Senhas Seguras
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Crie senhas fortes e personalizadas para proteger suas contas
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle>Configurações</CardTitle>
              </div>
              <CardDescription>
                Personalize sua senha ideal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="length">Tamanho da senha: {options.length}</Label>
                <Input
                  id="length"
                  type="range"
                  min="4"
                  max="64"
                  value={options.length}
                  onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>4</span>
                  <span>64</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-sm">Tipos de caracteres</h4>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uppercase"
                    checked={options.includeUppercase}
                    onCheckedChange={(checked) => 
                      setOptions({ ...options, includeUppercase: !!checked })
                    }
                  />
                  <Label htmlFor="uppercase" className="text-sm">Letras Maiúsculas (A-Z)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lowercase"
                    checked={options.includeLowercase}
                    onCheckedChange={(checked) => 
                      setOptions({ ...options, includeLowercase: !!checked })
                    }
                  />
                  <Label htmlFor="lowercase" className="text-sm">Letras Minúsculas (a-z)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="numbers"
                    checked={options.includeNumbers}
                    onCheckedChange={(checked) => 
                      setOptions({ ...options, includeNumbers: !!checked })
                    }
                  />
                  <Label htmlFor="numbers" className="text-sm">Números (0-9)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="symbols"
                    checked={options.includeSymbols}
                    onCheckedChange={(checked) => 
                      setOptions({ ...options, includeSymbols: !!checked })
                    }
                  />
                  <Label htmlFor="symbols" className="text-sm">Símbolos (!@#$%^&*)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="special"
                    checked={options.includeSpecialChars}
                    onCheckedChange={(checked) => 
                      setOptions({ ...options, includeSpecialChars: !!checked })
                    }
                  />
                  <Label htmlFor="special" className="text-sm">Caracteres Especiais (ção, acentos)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="exclude"
                    checked={options.excludeSimilar}
                    onCheckedChange={(checked) => 
                      setOptions({ ...options, excludeSimilar: !!checked })
                    }
                  />
                  <Label htmlFor="exclude" className="text-sm">Excluir caracteres similares (l, 1, I, O, 0)</Label>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="count">Número de senhas</Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="20"
                  value={options.count}
                  onChange={(e) => setOptions({ ...options, count: parseInt(e.target.value) || 1 })}
                />
              </div>

              <Button 
                onClick={generatePassword} 
                className="w-full" 
                variant="hero"
                size="lg"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Gerar Senhas
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Senhas Geradas</CardTitle>
              <CardDescription>
                {passwords.length > 0 ? `${passwords.length} senha${passwords.length > 1 ? 's' : ''} gerada${passwords.length > 1 ? 's' : ''}` : 'Suas senhas aparecerão aqui'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {passwords.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Clique em "Gerar Senhas" para começar</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {passwords.map((password, index) => {
                    const strength = getPasswordStrength(password);
                    return (
                      <div key={index} className="border rounded-lg p-4 bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Senha {index + 1}</span>
                            <span className={`text-xs font-medium ${strength.color}`}>
                              {strength.text}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(password)}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copiar
                          </Button>
                        </div>
                        <div className="font-mono text-sm bg-background p-2 rounded border break-all">
                          {password}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
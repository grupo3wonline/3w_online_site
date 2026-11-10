import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useToast } from "@/hooks/use-toast"
import { 
  Upload, 
  Download, 
  Copy, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Shuffle, 
  RotateCcw, 
  Filter,
  Home,
  Settings
} from "lucide-react"
import { Link } from "react-router-dom"

type SeparatorType = "newline" | "space" | "comma" | "dash" | "custom"
type TransformType = "alphabetic" | "numeric-asc" | "numeric-desc" | "reverse" | "shuffle" | "remove-duplicates"

const ListManipulator = () => {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [inputSeparator, setInputSeparator] = useState<SeparatorType>("newline")
  const [outputSeparator, setOutputSeparator] = useState<SeparatorType>("newline")
  const [customInputSeparator, setCustomInputSeparator] = useState("")
  const [customOutputSeparator, setCustomOutputSeparator] = useState("")
  const [itemCount, setItemCount] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const getSeparatorValue = (type: SeparatorType, customValue: string): string => {
    switch (type) {
      case "newline": return "\n"
      case "space": return " "
      case "comma": return ","
      case "dash": return "-"
      case "custom": return customValue
      default: return "\n"
    }
  }

  const parseItems = useCallback((text: string, separator: SeparatorType, customSep: string): string[] => {
    if (!text.trim()) return []
    const sep = getSeparatorValue(separator, customSep)
    return text.split(sep).map(item => item.trim()).filter(item => item.length > 0)
  }, [])

  const joinItems = useCallback((items: string[], separator: SeparatorType, customSep: string): string => {
    const sep = getSeparatorValue(separator, customSep)
    return items.join(separator === "newline" ? "\n" : sep)
  }, [])

  const transformList = useCallback((type: TransformType) => {
    const items = parseItems(inputText, inputSeparator, customInputSeparator)
    
    if (items.length === 0) {
      toast({
        title: "Lista vazia",
        description: "Por favor, insira alguns itens para transformar.",
        variant: "destructive"
      })
      return
    }

    let transformedItems: string[]

    switch (type) {
      case "alphabetic":
        transformedItems = [...items].sort((a, b) => a.localeCompare(b, 'pt-BR'))
        break
      
      case "numeric-asc":
        transformedItems = [...items].sort((a, b) => {
          const numA = parseFloat(a)
          const numB = parseFloat(b)
          if (isNaN(numA) && isNaN(numB)) return a.localeCompare(b, 'pt-BR')
          if (isNaN(numA)) return 1
          if (isNaN(numB)) return -1
          return numA - numB
        })
        break
      
      case "numeric-desc":
        transformedItems = [...items].sort((a, b) => {
          const numA = parseFloat(a)
          const numB = parseFloat(b)
          if (isNaN(numA) && isNaN(numB)) return b.localeCompare(a, 'pt-BR')
          if (isNaN(numA)) return 1
          if (isNaN(numB)) return -1
          return numB - numA
        })
        break
      
      case "reverse":
        transformedItems = [...items].reverse()
        break
      
      case "shuffle":
        transformedItems = [...items]
        for (let i = transformedItems.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [transformedItems[i], transformedItems[j]] = [transformedItems[j], transformedItems[i]]
        }
        break
      
      case "remove-duplicates":
        transformedItems = [...new Set(items)]
        break
      
      default:
        transformedItems = items
    }

    const result = joinItems(transformedItems, outputSeparator, customOutputSeparator)
    setOutputText(result)
    setItemCount(transformedItems.length)

    toast({
      title: "Transformação concluída",
      description: `${transformedItems.length} itens processados com sucesso.`
    })
  }, [inputText, inputSeparator, outputSeparator, customInputSeparator, customOutputSeparator, parseItems, joinItems, toast])

  const copyToClipboard = async () => {
    if (!outputText) {
      toast({
        title: "Nada para copiar",
        description: "Primeiro processe uma lista.",
        variant: "destructive"
      })
      return
    }

    try {
      await navigator.clipboard.writeText(outputText)
      toast({
        title: "Copiado!",
        description: "Lista copiada para a área de transferência."
      })
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar para a área de transferência.",
        variant: "destructive"
      })
    }
  }

  const downloadFile = () => {
    if (!outputText) {
      toast({
        title: "Nada para exportar",
        description: "Primeiro processe uma lista.",
        variant: "destructive"
      })
      return
    }

    const blob = new Blob([outputText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lista-processada-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Download iniciado",
      description: "Arquivo exportado com sucesso."
    })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const validTypes = ['text/plain', 'text/csv', 'application/json']
    if (!validTypes.includes(file.type) && !file.name.match(/\.(txt|csv|json)$/i)) {
      toast({
        title: "Formato inválido",
        description: "Use apenas arquivos .txt, .csv ou .json",
        variant: "destructive"
      })
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "Arquivo muito grande",
        description: "O arquivo deve ter no máximo 10MB.",
        variant: "destructive"
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setInputText(content)
      toast({
        title: "Arquivo carregado",
        description: `${file.name} foi importado com sucesso.`
      })
    }
    reader.readAsText(file)
  }

  const clearAll = () => {
    setInputText("")
    setOutputText("")
    setItemCount(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInputText(text)
      toast({
        title: "Colado!",
        description: "Conteúdo importado da área de transferência."
      })
    } catch (err) {
      toast({
        title: "Erro ao colar",
        description: "Não foi possível acessar a área de transferência.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ML</span>
              </div>
              <span className="text-xl font-bold">Manipulador de Listas</span>
            </Link>
            <Badge variant="secondary">
              Ferramenta
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Início
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Título e Descrição */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Processador de Listas</h1>
            <p className="text-muted-foreground">
              Transforme, ordene e processe suas listas com facilidade
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Entrada */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Entrada de Dados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Upload de Arquivo */}
                <div className="space-y-2">
                  <Label>Importar Arquivo</Label>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Selecionar Arquivo
                    </Button>
                    <Button variant="outline" onClick={pasteFromClipboard}>
                      <Copy className="h-4 w-4 mr-2" />
                      Colar
                    </Button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt,.csv,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground">
                    Suporte: .txt, .csv, .json (máx. 10MB)
                  </p>
                </div>

                {/* Separador de Entrada */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Separador de Entrada</Label>
                    <Select value={inputSeparator} onValueChange={(value: SeparatorType) => setInputSeparator(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newline">Quebra de linha</SelectItem>
                        <SelectItem value="comma">Vírgula (,)</SelectItem>
                        <SelectItem value="space">Espaço</SelectItem>
                        <SelectItem value="dash">Traço (-)</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {inputSeparator === "custom" && (
                    <div className="space-y-2">
                      <Label>Separador Personalizado</Label>
                      <Input 
                        value={customInputSeparator}
                        onChange={(e) => setCustomInputSeparator(e.target.value)}
                        placeholder="Digite o separador"
                      />
                    </div>
                  )}
                </div>

                {/* Área de Texto */}
                <div className="space-y-2">
                  <Label>Lista de Itens</Label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Cole ou digite sua lista aqui..."
                    className="min-h-[200px] font-mono text-sm"
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      {parseItems(inputText, inputSeparator, customInputSeparator).length} itens detectados
                    </p>
                    <Button variant="ghost" size="sm" onClick={clearAll}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Limpar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Saída */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Resultado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Separador de Saída */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Separador de Saída</Label>
                    <Select value={outputSeparator} onValueChange={(value: SeparatorType) => setOutputSeparator(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newline">Quebra de linha</SelectItem>
                        <SelectItem value="comma">Vírgula (,)</SelectItem>
                        <SelectItem value="space">Espaço</SelectItem>
                        <SelectItem value="dash">Traço (-)</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {outputSeparator === "custom" && (
                    <div className="space-y-2">
                      <Label>Separador Personalizado</Label>
                      <Input 
                        value={customOutputSeparator}
                        onChange={(e) => setCustomOutputSeparator(e.target.value)}
                        placeholder="Digite o separador"
                      />
                    </div>
                  )}
                </div>

                {/* Área de Resultado */}
                <div className="space-y-2">
                  <Label>Lista Processada</Label>
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder="O resultado aparecerá aqui..."
                    className="min-h-[200px] font-mono text-sm bg-muted/50"
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      {itemCount > 0 && `${itemCount} itens processados`}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadFile}>
                        <Download className="h-4 w-4 mr-2" />
                        Baixar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transformações */}
          <Card className="bg-gradient-card border-0 shadow-soft mt-8">
            <CardHeader>
              <CardTitle>Transformações Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => transformList("alphabetic")}
                  className="flex-col h-auto py-4"
                >
                  <ArrowUp className="h-5 w-5 mb-2" />
                  <span className="text-sm">Alfabética</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => transformList("numeric-asc")}
                  className="flex-col h-auto py-4"
                >
                  <ArrowUp className="h-5 w-5 mb-2" />
                  <span className="text-sm">Numérica ↑</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => transformList("numeric-desc")}
                  className="flex-col h-auto py-4"
                >
                  <ArrowDown className="h-5 w-5 mb-2" />
                  <span className="text-sm">Numérica ↓</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => transformList("reverse")}
                  className="flex-col h-auto py-4"
                >
                  <RotateCcw className="h-5 w-5 mb-2" />
                  <span className="text-sm">Inverter</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => transformList("shuffle")}
                  className="flex-col h-auto py-4"
                >
                  <Shuffle className="h-5 w-5 mb-2" />
                  <span className="text-sm">Embaralhar</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => transformList("remove-duplicates")}
                  className="flex-col h-auto py-4"
                >
                  <Filter className="h-5 w-5 mb-2" />
                  <span className="text-sm">Sem Duplicatas</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ListManipulator
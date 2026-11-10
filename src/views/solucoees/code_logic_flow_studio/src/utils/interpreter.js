export class Interpreter {
    constructor() {
        this.variables = {};
        this.outputCallback = null;
        this.inputCallback = null;
        this.finishCallback = null;
    }

    setCallbacks(onPrint, onInput, onFinish) {
        this.outputCallback = onPrint;
        this.inputCallback = onInput;
        this.finishCallback = onFinish;
    }

    async run(code) {
        this.variables = {};
        const lines = code.split('\n');

        try {
            for (let i = 0; i < lines.length; i++) {
                let line = lines[i].trim();
                if (!line || line.startsWith('//') || line.startsWith('algoritmo') || line.startsWith('inicio') || line.startsWith('fimalgoritmo') || line === 'var') continue;

                if (line.startsWith('escreva')) {
                    const content = line.match(/\((.*)\)/);
                    if (content) {
                        let output = this.parseExpression(content[1]);
                        if (this.outputCallback) this.outputCallback(output);
                    }
                } else if (line.startsWith('leia')) {
                    const varName = line.match(/\((.*)\)/)[1].trim();
                    if (this.inputCallback) {
                        const val = await this.inputCallback(varName);
                        this.variables[varName] = val;
                        if (this.outputCallback) this.outputCallback(`Entrada recebida: ${val}`, 'system');
                    }
                }
                else if (line.includes('=') && !line.startsWith('se ') && !line.startsWith('escreva') && !line.startsWith('enquanto')) {
                    const parts = line.split('=');
                    const varName = parts[0].trim();
                    const expression = parts[1].trim();
                    this.variables[varName] = this.parseExpression(expression);
                }
                else if (line.startsWith('se ')) {
                    let condition = line.substring(3, line.indexOf('entao')).trim();
                    let result = this.evalCondition(condition);

                    if (!result) {
                        let depth = 1;
                        while (depth > 0 && i < lines.length - 1) {
                            i++;
                            let nextLine = lines[i].trim();
                            if (nextLine.startsWith('se ')) depth++;
                            if (nextLine.startsWith('fimse')) depth--;
                            if (depth === 1 && nextLine.startsWith('senao')) {
                                depth = 0;
                            }
                        }
                    }
                }
                else if (line.startsWith('senao')) {
                    let depth = 1;
                    while (depth > 0 && i < lines.length - 1) {
                        i++;
                        let nextLine = lines[i].trim();
                        if (nextLine.startsWith('se ')) depth++;
                        if (nextLine.startsWith('fimse')) depth--;
                    }
                }
            }
        } catch (e) {
            if (this.outputCallback) this.outputCallback(`Erro na linha: ${e.message}`, 'error');
        }

        if (this.finishCallback) this.finishCallback();
    }

    parseExpression(exp) {
        if (exp.startsWith('"') && exp.endsWith('"')) return exp.slice(1, -1);
        if (exp.includes('+')) {
            const parts = exp.split('+');
            return parts.map(p => this.parseExpression(p.trim())).join('');
        }
        if (this.variables.hasOwnProperty(exp)) return this.variables[exp];
        return exp;
    }

    evalCondition(cond) {
        try {
            for (const [key, value] of Object.entries(this.variables)) {
                const regex = new RegExp(`\\b${key}\\b`, 'g');
                cond = cond.replace(regex, `"${value}"`);
            }
            if (cond.includes('=') && !cond.includes('==') && !cond.includes('!=')) {
                cond = cond.replace('=', '==');
            }
            // eslint-disable-next-line no-eval
            return eval(cond);
        } catch (e) {
            return false;
        }
    }
}

export const generateMermaidCode = (code) => {
    const lines = code.split('\n');
    let graphDefinition = "graph TD\n";
    graphDefinition += "Start([Início]) --> ";
    let lastNode = "Start";
    let nodeId = 0;

    lines.forEach(line => {
        line = line.trim();
        if (!line || line.startsWith('//') || line.startsWith('var') || line.startsWith('inicio')) return;

        nodeId++;
        let currentNode = `N${nodeId}`;
        let label = "";
        let shape = ["(", ")"];

        if (line.startsWith('escreva')) {
            label = "Saída: " + line.replace('escreva', '').replace(/[()"]/g, '');
            shape = ["[/", "/]"];
        } else if (line.startsWith('leia')) {
            label = "Ler: " + line.replace('leia', '').replace(/[()]/g, '');
            shape = ["[/", "/]"];
        } else if (line.startsWith('se ')) {
            label = "?" + line.substring(3, line.indexOf('entao'));
            shape = ["{", "}"];
        } else if (line.includes('=') && !line.startsWith('se ') && !line.startsWith('escreva')) {
            label = line;
            shape = ["[", "]"];
        } else if (line.startsWith('algoritmo') || line.startsWith('fimalgoritmo')) {
            return;
        }

        if (label) {
            label = label.replace(/"/g, "'");
            graphDefinition += `${currentNode}${shape[0]}"${label}"${shape[1]}\n`;
            graphDefinition += `${lastNode} --> ${currentNode}\n`;
            lastNode = currentNode;
        }
    });

    graphDefinition += `${lastNode} --> End([Fim])`;
    return graphDefinition;
}

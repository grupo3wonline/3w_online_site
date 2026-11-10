import { describe, it, expect, vi } from 'vitest'
import { Interpreter } from './interpreter'

describe('Interpreter Logic', () => {
    it('should print output', async () => {
        const interpreter = new Interpreter()
        const printSpy = vi.fn()

        interpreter.setCallbacks(printSpy, null, null)

        const code = `escreva("Hello World")`
        await interpreter.run(code)

        expect(printSpy).toHaveBeenCalledWith("Hello World")
    })

    it('should handle variables', async () => {
        const interpreter = new Interpreter()
        const printSpy = vi.fn()
        interpreter.setCallbacks(printSpy, null, null)

        const code = `
    x = 10
    escreva(x)
    `
        await interpreter.run(code)
        expect(printSpy).toHaveBeenCalledWith("10")
    })

    it('should handle if/else condition', async () => {
        const interpreter = new Interpreter()
        const printSpy = vi.fn()
        interpreter.setCallbacks(printSpy, null, null)

        // x = 5, if x == 5 write A else write B
        const code = `
    x = 5
    se (x == 5) entao
        escreva("A")
    senao
        escreva("B")
    fimse
    `
        await interpreter.run(code)
        expect(printSpy).toHaveBeenCalledWith("A")
    })
})

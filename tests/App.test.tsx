import React from 'react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'


describe('<App />', () => {
    
    //unitaria
    /*
    test('should render', () => {
        render(<App/>)
    

        expect(
            screen.getByText('Prueba tecnica List And Items')
        ).toBeDefined()
        
    }) */

    // E2E
    test('should add items and remove them', async ()=> {
        const user = userEvent.setup()

        render(<App/>)

        //Buscar el input
        const input = screen.getByRole('textbox', { name: /Elemento nuevo/i })
        expect(input).toBeDefined()

        // buscar el form
        const form = screen.getByRole('form')
        expect(form).toBeDefined()

        const button = form.querySelector('button')
        expect(button).toBeDefined()

        await user.type(input, 'Lavar sabanas')
        await user.click(button!)

        //asegurar que el elemento se ha agregado
        const list = screen.getByRole('list')
        expect(list).toBeDefined()
        expect(list.childNodes.length).toBe(2)

        screen.debug()

        // poder borrar el item

        const item = screen.getByText('Lavar sabanas')
        const removeButton = item.querySelector('button')
        expect(removeButton).toBeDefined()

        await user.click(removeButton!)

        // caso de no resultados

        const lastItem = screen.getByText('lavar ropa')
        const removeLastElementButton = lastItem.querySelector('button')
        expect(removeLastElementButton).toBeDefined()

        await user.click(removeLastElementButton!)

        const noResults = screen.getByText('No hay elementos agregados')
        expect(noResults).toBeDefined()

        screen.debug()
    })
})
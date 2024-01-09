import { describe, test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useItems } from '../src/hooks/useItems'

describe('useItems hook', () => {

    //test de integracion del custom hook (no unitario)
    test('should add and remove items', () => {
        const { result } = renderHook(() => useItems())

        expect(result.current.items.length).toBe(1)

        //add item

        act(() => {
            result.current.addItem('jugar basket')
            result.current.addItem('jugar futbol')
        })

        expect(result.current.items.length).toBe(3)

        //remove items
        act(() => {
            result.current.removeItem(result.current.items[0].id)
        })

        expect(result.current.items.length).toBe(2)
    })
})
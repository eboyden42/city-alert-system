import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'
import { test, expect, vi } from 'vitest'
import Dropdown from "./index"
import { text } from "express"

test('renders dropdown button', () => {
    render(
        <Dropdown>
            <Dropdown.Button>
                Hello this is some dropdown content
            </Dropdown.Button>
        </Dropdown>
    )

    const btnEl = screen.getByTestId("dropdown-btn")
    expect(btnEl).toBeInTheDocument()
    expect(btnEl.textContent).toBe("Hello this is some dropdown content")
})

test('renders dropdown content on click', async () => {
    const user = userEvent.setup()
    render(
        <Dropdown>
            <Dropdown.Button>
                click me
            </Dropdown.Button>
            <Dropdown.Content>
                text goes here
            </Dropdown.Content>
        </Dropdown>
    )

    const btnEl = screen.getByTestId("dropdown-btn")
    const contentEl = screen.getByTestId("dropdown-content")

    expect(contentEl.className).toBe("content closed")
    await user.click(btnEl)
    expect(contentEl.className).toBe("content open")
})

test('renders list element and items in dropdown', () => {
    render(
        <Dropdown>
            <Dropdown.Button>
                button text
            </Dropdown.Button>
            <Dropdown.Content>
                <Dropdown.List>
                    <Dropdown.Item>
                        item1
                    </Dropdown.Item>
                    <Dropdown.Item>
                        item2
                    </Dropdown.Item>
                    <Dropdown.Item>
                        item3
                    </Dropdown.Item>
                </Dropdown.List>
            </Dropdown.Content>
        </Dropdown>
    )

    expect(screen.getByTestId("dropdown-list")).toBeInTheDocument()
    const itemList = screen.getAllByTestId("dropdown-item")
    expect(itemList.length).toBe(3)
    for (let i = 0; i < itemList.length; ++i) {
        expect(itemList[i].textContent).toBe(`item${i + 1}`)
    }
})

test('runs functions on item clicks', async () => {
    const user = userEvent.setup()
    const mock = vi.fn()
    render(
        <Dropdown>
            <Dropdown.Button>
                button text
            </Dropdown.Button>
            <Dropdown.Content>
                <Dropdown.List>
                    <Dropdown.Item onClick={() => mock()}>
                        item1
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => mock()}>
                        item2
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => mock()}>
                        item3
                    </Dropdown.Item>
                </Dropdown.List>
            </Dropdown.Content>
        </Dropdown>
    )

    const itemList = screen.getAllByTestId("dropdown-item")
    for (let i = 0; i < itemList.length; ++i) { 
        await user.click(screen.getAllByTestId("dropdown-item")[i])
    }
    expect(mock).toHaveBeenCalledTimes(3)
})






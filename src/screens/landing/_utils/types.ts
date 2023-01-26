import { ReactElement } from 'react'

export type AvailableWallet = {
    id: string
    name: string
    icon: ReactElement
    isPopular: boolean
}
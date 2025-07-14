import { Button as Btn, ButtonProps } from '@mui/joy'
import { FC } from 'react'

export interface IButton extends ButtonProps {
    loadingLabel?: string
}

export const Button: FC<IButton> = (props) => {
    return <Btn {...props} />
}

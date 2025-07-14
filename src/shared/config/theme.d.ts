/* eslint-disable @typescript-eslint/no-empty-object-type */

import '@emotion/react'

import type { Theme as JoyTheme } from '@mui/joy/styles'

declare module '@emotion/react' {
    export interface Theme extends JoyTheme {}
}

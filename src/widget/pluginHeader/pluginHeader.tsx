import { FC, useEffect } from 'react'

export const PluginHeader: FC = () => {
    useEffect(() => {
        // const w = window.innerWidth
        // const h = window.innerHeight
        // console.log('WINDOW: ', figma.viewport.bounds.height)
        // parent.postMessage({ pluginMessage: { type: 'resize', w, h } }, '*')
    }, [])

    const expand = () => {
        parent.postMessage(
            {
                pluginMessage: {
                    type: 'expand',
                    width: 800,
                    height: 500,
                },
            },
            '*'
        )
    }

    const collapse = () => {
        parent.postMessage(
            { pluginMessage: { type: 'resize', width: 300, height: 400 } },
            '*'
        )
    }

    return (
        <div>
            {/* Plugin header
            <button onClick={expand}>Expand</button>
            <button onClick={collapse}>Collapse</button> */}
        </div>
    )
}

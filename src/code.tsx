// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).
const { editorType } = figma
const __DEV__: boolean = true

const pluginDefaultHeight = 720
const pluginDefaultWidth = 600

const showOptions = {
    width: pluginDefaultWidth,
    height: pluginDefaultHeight,
} satisfies ShowUIOptions

const run = () => {
    if (editorType === 'figma') {
        // This plugin will open a window to prompt the user to enter a number, and
        // it will then create that many rectangles on the screen.

        // This shows the HTML page in "ui.html".
        figma.showUI(__html__, showOptions)

        // Calls to "parent.postMessage" from within the HTML page will trigger this
        // callback. The callback will be passed the "pluginMessage" property of the
        // posted message.
        figma.ui.onmessage = (msg: {
            type: string
            count: number
            width: number
            height: number
            size: { w: number; h: number }
        }) => {
            // One way of distinguishing between different types of messages sent from
            // your HTML page is to use an object with a "type" property like this.

            if (msg.type === 'create-shapes') {
                // This plugin creates rectangles on the screen.
                const numberOfRectangles = msg.count

                const nodes: SceneNode[] = []
                for (let i = 0; i < numberOfRectangles; i++) {
                    const rect = figma.createRectangle()
                    rect.x = i * 150
                    rect.fills = [
                        { type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } },
                    ]
                    figma.currentPage.appendChild(rect)
                    nodes.push(rect)
                }
                figma.currentPage.selection = nodes
                figma.viewport.scrollAndZoomIntoView(nodes)
            }

            if (msg.type === 'resize') {
                figma.ui.resize(msg.size.w, msg.size.h)
                figma.clientStorage.setAsync('size', msg.size).catch((err) => {
                    console.log(err)
                })
            }

            if (msg.type === 'expand') {
                console.log('width: ', figma.viewport.bounds.width)
                console.log('width: ', figma.viewport.slidesView)

                figma.ui.resize(+figma.viewport.bounds.width.toFixed(), 400)
                // figma.ui.hide()
            }
            if (msg.type === 'dock') {
                // figma.ui.hide()
            }

            // Make sure to close the plugin when you're done. Otherwise the plugin will
            // keep running, which shows the cancel button at the bottom of the screen.
            // figma.closePlugin()
        }
    }

    // Runs this code if the plugin is run in FigJam
    if (figma.editorType === 'figjam') {
        // This plugin will open a window to prompt the user to enter a number, and
        // it will then create that many shapes and connectors on the screen.

        // This shows the HTML page in "ui.html".
        figma.showUI(__html__, showOptions)

        // Calls to "parent.postMessage" from within the HTML page will trigger this
        // callback. The callback will be passed the "pluginMessage" property of the
        // posted message.
        figma.ui.onmessage = (msg: { type: string; count: number }) => {
            // One way of distinguishing between different types of messages sent from
            // your HTML page is to use an object with a "type" property like this.
            if (msg.type === 'create-shapes') {
                // This plugin creates shapes and connectors on the screen.
                const numberOfShapes = msg.count

                const nodes: SceneNode[] = []
                for (let i = 0; i < numberOfShapes; i++) {
                    const shape = figma.createShapeWithText()
                    // You can set shapeType to one of: 'SQUARE' | 'ELLIPSE' | 'ROUNDED_RECTANGLE' | 'DIAMOND' | 'TRIANGLE_UP' | 'TRIANGLE_DOWN' | 'PARALLELOGRAM_RIGHT' | 'PARALLELOGRAM_LEFT'
                    shape.shapeType = 'ROUNDED_RECTANGLE'
                    shape.x = i * (shape.width + 200)
                    shape.fills = [
                        { type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } },
                    ]
                    figma.currentPage.appendChild(shape)
                    nodes.push(shape)
                }

                for (let i = 0; i < numberOfShapes - 1; i++) {
                    const connector = figma.createConnector()
                    connector.strokeWeight = 8

                    connector.connectorStart = {
                        endpointNodeId: nodes[i].id,
                        magnet: 'AUTO',
                    }

                    connector.connectorEnd = {
                        endpointNodeId: nodes[i + 1].id,
                        magnet: 'AUTO',
                    }
                }

                figma.currentPage.selection = nodes
                figma.viewport.scrollAndZoomIntoView(nodes)
            }

            // Make sure to close the plugin when you're done. Otherwise the plugin will
            // keep running, which shows the cancel button at the bottom of the screen.
            figma.closePlugin()
        }
    }

    // Runs this code if the plugin is run in Slides
    if (figma.editorType === 'slides') {
        // This plugin will open a window to prompt the user to enter a number, and
        // it will then create that many slides on the screen.

        // This shows the HTML page in "ui.html".
        figma.showUI(__html__, showOptions)

        // Calls to "parent.postMessage" from within the HTML page will trigger this
        // callback. The callback will be passed the "pluginMessage" property of the
        // posted message.
        figma.ui.onmessage = (msg: { type: string; count: number }) => {
            // One way of distinguishing between different types of messages sent from
            // your HTML page is to use an object with a "type" property like this.
            if (msg.type === 'create-shapes') {
                // This plugin creates slides and puts the user in grid view.
                const numberOfSlides = msg.count

                const nodes: SlideNode[] = []
                for (let i = 0; i < numberOfSlides; i++) {
                    const slide = figma.createSlide()
                    nodes.push(slide)
                }

                figma.viewport.slidesView = 'grid'
                figma.currentPage.selection = nodes
            }

            // Make sure to close the plugin when you're done. Otherwise the plugin will
            // keep running, which shows the cancel button at the bottom of the screen.
            figma.closePlugin()
        }
    }
}

if (__DEV__) {
    // в режиме разработки берём UI с Vite:

    figma.showUI('http://localhost:5173', showOptions)
    run()
} else {
    // в продакшене — встроенный в ui.html (htmlPlugin)
    // htmlPlugin инлайнит в глобальную переменную __html__
    figma.showUI(__html__, showOptions)
    run()
}

// Runs this code if the plugin is run in Figma

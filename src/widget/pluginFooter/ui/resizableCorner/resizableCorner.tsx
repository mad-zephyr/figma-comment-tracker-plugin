import { PointerEvent, useRef } from 'react'

import cls from './resizableCorner.module.sass'

export const ResizableCorner = () => {
    const cornerRef = useRef<SVGSVGElement>(null)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resizeWindow = (e: any) => {
        const size = {
            w: Math.max(50, Math.floor(e.clientX + 5)),
            h: Math.max(50, Math.floor(e.clientY + 5)),
        }
        window.parent.postMessage(
            { pluginMessage: { type: 'resize', size: size } },
            '*'
        )
    }

    const handlePointerDown = (e: PointerEvent) => {
        const corner = cornerRef.current

        if (corner) {
            corner.onpointermove = resizeWindow
            corner.setPointerCapture(e.pointerId)
        }
    }

    const handlePointerUp = (e: PointerEvent<SVGSVGElement>) => {
        const corner = cornerRef.current

        if (corner) {
            corner.onpointermove = null
            corner.releasePointerCapture(e.pointerId)
        }
    }

    return (
        <div className={cls.main}>
            <svg
                ref={cornerRef}
                id="corner"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#8C8C8C"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    position: 'absolute',
                    right: '4px',
                    bottom: '4px',
                    cursor: 'nwse-resize',
                }}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
            >
                <path d="M4 22C5.10457 22 6 21.1046 6 20C6 18.8954 5.10457 18 4 18C2.89543 18 2 18.8954 2 20C2 21.1046 2.89543 22 4 22Z" />
                <path d="M12 22C13.1046 22 14 21.1046 14 20C14 18.8954 13.1046 18 12 18C10.8954 18 10 18.8954 10 20C10 21.1046 10.8954 22 12 22Z" />
                <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" />
                <path d="M20 6C21.1046 6 22 5.10457 22 4C22 2.89543 21.1046 2 20 2C18.8954 2 18 2.89543 18 4C18 5.10457 18.8954 6 20 6Z" />
                <path d="M20 22C21.1046 22 22 21.1046 22 20C22 18.8954 21.1046 18 20 18C18.8954 18 18 18.8954 18 20C18 21.1046 18.8954 22 20 22Z" />
                <path d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z" />
            </svg>
        </div>
    )
}

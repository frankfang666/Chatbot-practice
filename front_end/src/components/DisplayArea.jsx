import {useEffect, useRef} from 'react'
import ReactMarkdown from 'react-markdown'

export default function DisplayArea({ displaytxts, areaHeight, areaWidth, toScroll, setToScroll }) {
    const scrollableDivRef = useRef(null)

    useEffect(()=>{
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight
            setToScroll(false)
        }, [toScroll, setToScroll]
    )

    return (
        <div 
            ref={scrollableDivRef}
            style={{ 
                backgroundColor: "#F8F8F8",
                width: areaWidth, 
                height: areaHeight, 
                border: '1px solid #F8F8F8', 
                position: 'absolute', 
                left: '50%', 
                top: window.innerHeight / 2,
                overflowY: "scroll",
                transform: 'translate(-50%, -50%)' 
            }}
        >
            {
                displaytxts.map((x, i) => {
                    return (
                        <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                            <li
                                key={i}
                                style={{
                                    display: 'flex',
                                    justifyContent: x.source === 'human' ? 'flex-start' : 'flex-end',
                                }}
                            >
                                {
                                        x.source === 'human' && 
                                        (<img 
                                            src='user.ico' 
                                            alt="avatar" 
                                            style={{ 
                                                width: '40px', 
                                                height: '40px', 
                                                borderRadius: '50%', 
                                                marginTop: '15px',
                                                marginLeft: '10px', 
                                                marginRight: '0px' 
                                            }} 
                                        />)
                                    }
                                <div
                                    style={{
                                        position: 'relative',
                                        padding: '10px',
                                        display: 'inline-block',
                                        backgroundColor: x.source === 'human' ? '#E8E8E8' : '#229FFF',
                                        borderRadius: '10px',
                                        maxWidth: areaWidth - 120,
                                        color: x.source === 'human' ? 'black' : 'white',
                                        wordBreak: 'break-word',
                                        marginTop: '20px',
                                        marginBottom: '10px',
                                        marginLeft: x.source === 'human' ? '10px' : '0',
                                        marginRight: x.source === 'machine' ? '10px' : '0',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <ReactMarkdown components={{p: ({ children }) => <span style={{ margin: 0, wordBreak: 'break-word', maxWidth: '100%'}}>{children}</span>}}>
                                        {x.text}
                                    </ReactMarkdown>
                                </div>
                            </li>
                    </ul>
                    )
                    }
                )
            }
        </div>
    )
}
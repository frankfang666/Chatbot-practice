import {useEffect, useRef, useState} from 'react'
import ReactMarkdown from 'react-markdown'
import { CopyOutlined } from '@ant-design/icons'

export default function DisplayArea({ displaytxts, toScroll, setToScroll, componentWidth, style }) {
    const scrollableDivRef = useRef(null)
    const [showPopup, setShowPopup] = useState(false)

    useEffect(()=>{
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight
            setToScroll(false)
        }, [toScroll, setToScroll]
    )

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setShowPopup(true)
            setTimeout(() => {
                setShowPopup(false)
            }, 2000) // 显示2秒后隐藏
        }).catch(err => {
            console.error('复制失败', err);
        });
    }

    return (
        <div 
            ref={scrollableDivRef}
            style={style}
        >
            {showPopup && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    zIndex: 1000
                }}>
                    内容已复制到剪贴板
                </div>
            )}
            {
                displaytxts.map((x, i) => {
                    return (
                        <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }} key={i}>
                            <li
                                style={{
                                    display: 'flex',
                                    justifyContent: x.source === 'human' ? 'flex-end' : 'flex-start',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        padding: '10px',
                                        display: 'inline-block',
                                        backgroundColor: x.source === 'human' ? '#E8E8E8' : '#229FFF',
                                        borderRadius: '10px',
                                        maxWidth: componentWidth,
                                        color: x.source === 'human' ? 'black' : 'white',
                                        wordBreak: 'break-word',
                                        marginTop: '20px',
                                        marginBottom: '10px',
                                        marginLeft: x.source === 'human' ? '0px' : '10px',
                                        marginRight: x.source === 'machine' ? '10px' : '0px',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <ReactMarkdown components={{p: ({ children }) => <span style={{ margin: 0, wordBreak: 'break-word', maxWidth: '100%' }}>{children}</span>}}>
                                        {x.text}
                                    </ReactMarkdown>
                                    <div style={{ textAlign: 'left', marginTop: '5px' }}>
                                        <button 
                                            onClick={() => copyToClipboard(x.text)} 
                                            style={{
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: x.source === 'human' ? 'black' : 'white'
                                            }}
                                        >
                                            <CopyOutlined style={{ fontSize: '16px', color: x.source === 'human' ? 'gray' : 'white' }} />
                                        </button>
                                    </div>
                                </div>
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
                            </li>
                        </ul>
                    )
                })
            }
        </div>
    )
}
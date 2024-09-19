import { useState } from "react"
import DisplayArea from './DisplayArea'
import QueryBox from "./QueryBox"

export default function Messager(){
    const [querytxt, setquerytxt] = useState("")
    const [displaytxts, setdisplaytxts] = useState([])
    const [toScroll, setToScroll] = useState(false)

    const [areaHeight, areaWidth, inputHeight] = [700, 600, 30]
    const inputWidth = areaWidth

    const handleAreaChange = (e) => {
        setquerytxt(e.target.value)
    }

    const handleSubmit = async () => {
        if (querytxt !== "") {
            try {
                const appendedDisplay = [...displaytxts, { "text": querytxt, "source": "human" }]
                setdisplaytxts(appendedDisplay)
                setquerytxt("")
                setToScroll(true)
    
                const res = await fetch(`http://127.0.0.1:3001/query?query=${encodeURIComponent(querytxt)}`, { method: "GET" })
    
                if (!res.ok) {
                    const errorMessage = await res.text()
                    throw new Error(`Error ${res.status}: ${errorMessage}`)
                }
    
                const reader = res.body.getReader()
                const decoder = new TextDecoder("utf-8")
                let text_stream = ""
    
                const processStream = async () => {
                    const { done, value } = await reader.read()
                    if (done) {
                        return // Stream completed
                    }
    
                    const chunk = decoder.decode(value, { stream: true })
                    text_stream += chunk
    
                    setdisplaytxts([...appendedDisplay, { "text": text_stream, "source": "machine" }])
    
                    // Continue reading the stream
                    setTimeout(processStream, 2000)
                    processStream()
                };
    
                processStream()
            } catch (error) {
                console.log(error)
            }
        }
    };

    return (
        <div>
            <DisplayArea 
                displaytxts={displaytxts} 
                areaHeight={areaHeight} 
                areaWidth={areaWidth} 
                toScroll={toScroll} 
                setToScroll={setToScroll} />
            <QueryBox 
                inputHeight={inputHeight} 
                inputWidth={inputWidth} 
                areaHeight={areaHeight} 
                querytxt={querytxt}
                handleAreaChange={handleAreaChange} 
                handleSubmit={handleSubmit}/>
        </div>
    )
}
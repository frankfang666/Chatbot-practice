import { useState } from "react";
import { Input } from "antd"; // Import Search from antd
import DisplayArea from './DisplayArea';
import { SendOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const { Search } = Input;

export default function Messager({ model }) {
    const [querytxt, setquerytxt] = useState("");
    const [displaytxts, setdisplaytxts] = useState([]);
    const [toScroll, setToScroll] = useState(false);
    const [loading, setLoading] = useState(false);
    const componentWidth = '50%';

    const handleAreaChange = (e) => {
        setquerytxt(e.target.value);
    };

    const handleSubmit = async (value) => {
        if (value !== "") {
            try {
                const appendedDisplay = [...displaytxts, { "text": value, "source": "human" }];
                setdisplaytxts(appendedDisplay);
                setquerytxt("");
                setToScroll(true);
                setLoading(true);

                // const res = await fetch(`http://127.0.0.1:3001/query?query=${encodeURIComponent(value)}`, { method: "GET" });
                const res = await fetch('http://localhost:11434/api/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: model,
                        prompt: value,
                        stream: true
                    }),
                });

                if (!res.ok) {
                    const errorMessage = await res.text();
                    throw new Error(`Error ${res.status}: ${errorMessage}`);
                }

                const reader = res.body.getReader();
                const decoder = new TextDecoder("utf-8");
                let text_stream = "";

                const processStream = async () => {
                    const { done, value } = await reader.read();
                    if (done) {
                        return; // Stream completed
                    }

                    const chunk = decoder.decode(value, { stream: true });
                    try {
                        text_stream += JSON.parse(chunk).response;
                    } catch (error) {
                        console.log(chunk);
                    }

                    setdisplaytxts([...appendedDisplay, { "text": text_stream, "source": "machine" }]);

                    // Continue reading the stream
                    setTimeout(processStream, 2000);
                    processStream();
                };

                processStream();
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '10vh'  
                }}
        >
            <DisplayArea 
                displaytxts={displaytxts} 
                toScroll={toScroll} 
                setToScroll={setToScroll} 
                componentWidth={componentWidth}
                style={{ 
                    backgroundColor: "#F8F8F8",
                    width: '50%', 
                    height: '80%', 
                    border: '1px solid #F8F8F8', 
                    position: 'absolute', 
                    marginLeft: '50%', 
                    marginTop: '85%',
                    overflowY: "scroll",
                    transform: 'translate(-50%, -50%)' 
                }}
            />
            <Search
                placeholder="Enter your query"
                loading={loading}
                enterButton={loading ? <Spin /> : <SendOutlined />}
                size="large"
                value={querytxt}
                onChange={handleAreaChange}
                onSearch={handleSubmit}
                style={{ width: componentWidth, height: '10%', marginTop: '90%' }}
            />
        </div>
    );
}
'use client';

import React, { useEffect, useState } from 'react';

interface Message {
    number: number;
    message: string;
}

function App() {
    const [messages, setMessages] = useState<Message[]>([]);

    async function fetchData() {
        console.log("Sending post request");
        const host = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3001';
        const endpoint = `${host}/api/basicStream`;
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.body) {
                throw new Error('Response body is null');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            reader.read().then(function processText({ done, value }) {
                if (done) {
                    console.log("Stream complete");
                    return;
                }

                // Decode the stream chunk to text
                const chunk = decoder.decode(value, { stream: true });
                console.log(chunk);

                // Assuming the chunk is a JSON string, parse it and update state
                try {
                    const json = JSON.parse(chunk);
                    console.log(json);
                    setMessages(prevMessages => [...prevMessages, json]);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }

                // Read the next chunk
                reader.read().then(processText);
            });
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    return (
        <div onClick={fetchData}>
            <h2>Streamed Data</h2>
            {messages.map((msg, index) => (
                <div key={index}>
                    {msg.number}: {msg.message}
                </div>
            ))}
        </div>
    );
}

export default App;
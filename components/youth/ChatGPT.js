import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const OpenAIChatComponent = () => {
    const [prompt, setPrompt] = useState('');
    const [generatedText, setGeneratedText] = useState('');

    const apiKey = 'YOUR_OPENAI_API_KEY';
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    const handleGenerateText = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    prompt: prompt,
                    max_tokens: 150, // Adjust as needed
                }),
            };

            const response = await fetch(apiUrl, requestOptions);
            const data = await response.json();

            setGeneratedText(data.choices[0].text);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>OpenAI Chat Component</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
                placeholder="Type your prompt here"
                value={prompt}
                onChangeText={(text) => setPrompt(text)}
            />
            <Button title="Generate Text" onPress={handleGenerateText} />
            {generatedText !== '' && (
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Generated Text:</Text>
                    <Text>{generatedText}</Text>
                </View>
            )}
        </View>
    );
};

export default OpenAIChatComponent;

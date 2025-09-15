import axios from "axios";

const apiKey = "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";

(async () => {
    try {
        const res = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: "Hello there" }],
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Success:", res.data.choices[0].message.content);
    } catch (err) {
        console.error("ERROR:", err.response?.data || err.message);
    }
})();

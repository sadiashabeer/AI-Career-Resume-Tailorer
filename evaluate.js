document.getElementById('generateBtn').addEventListener('click', async () => {
    const apiKey = document.getElementById('apiKey').value.trim();
    const jobDesc = document.getElementById('jobDesc').value.trim();
    const userSkills = document.getElementById('userSkills').value.trim();
    const targetIndustry = document.getElementById('targetIndustry').value.trim();
    const resultDiv = document.getElementById('result');

    if (!apiKey) {
        alert("Please enter your Groq API key.");
        return;
    }
    if (!jobDesc || !userSkills) {
        alert("Please fill in both the job description and your skills.");
        return;
    }

    resultDiv.style.display = "block";
    resultDiv.innerText = "Analyzing job requirements and tailoring your profile...";

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Bearer ${apiKey}
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert technical recruiter and career coach. Given a job description, user skills/experience, and a target industry, provide: 1) Tailored resume bullet points optimized for ATS systems, 2) Recommended keywords to include, and 3) A professional cover letter draft. Format the output cleanly with clear section headings."
                    },
                    {
                        role: "user",
                        content: Target Industry: ${targetIndustry}\n\nJob Description / Role:\n${jobDesc}\n\nMy Skills & Experience:\n${userSkills}
                    }
                ]
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            resultDiv.innerText = data.choices[0].message.content;
        } else {
            resultDiv.innerText = "Error: Unexpected response format from AI. Check your API key.";
        }

    } catch (error) {
        console.error("Error connecting to Groq:", error);
        resultDiv.innerText = "A connection error occurred. Please check your network connection.";
    }
});

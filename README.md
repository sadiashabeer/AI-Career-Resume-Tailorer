# AI Career & Resume Tailorer

## a. Overview & Problem Solved
*AI Career & Resume Tailorer* is a web utility designed to solve the problem of job application rejections caused by generic resumes and unoptimized keywords. It helps job seekers and students tailor their experience profile directly to specific job descriptions.

*Target Audience:* Computer Science students, recent graduates, and job applicants looking to bypass Applicant Tracking Systems (ATS).

## b. Live Deployment
🔗 *[Click here to use the live app](INSERT_VERCEL_URL_HERE)*

## c. Features List
* *Dynamic API Integration:* Secure, client-side input for the Groq API key ensuring zero hardcoded secrets.
* *ATS Keyword Matcher:* Scans job descriptions and suggests critical keywords.
* *Resume Bullet Point Optimizer:* Rewrites raw user experience into professional, impact-driven bullet points.
* *Cover Letter Drafter:* Automatically generates a professional cover letter matching the target industry.

## d. AI Feature & System Prompt
The application leverages the Groq API to analyze inputs and synthesize structured career documentation.

*System Instructions / Prompt used:*
> "You are an expert technical recruiter and career coach. Given a job description, user skills/experience, and a target industry, provide: 1) Tailored resume bullet points optimized for ATS systems, 2) Recommended keywords to include, and 3) A professional cover letter draft. Format the output cleanly with clear section headings."

## e. Tools, Services, and Models Used
* *AI Model:* Llama 3.3 70B via Groq API
* *Frontend:* HTML5, CSS3, Vanilla JavaScript
* *Hosting:* Vercel
* *Version Control:* Git & GitHub

## f. Screenshots
(Placeholder: Add 3 screenshots of the running app here)

## g. How to Run Locally
1. Clone the repository.
2. Open index.html in any web browser.
3. Enter your Groq API key, paste a job description, and generate your tailored materials.

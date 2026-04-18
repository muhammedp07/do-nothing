async function callApi(endpoint: string, body: object) {
  const res = await fetch(`http://localhost:3001/api/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const generateResume = {
  call: (data: { name: string; role: string; skills: string; experience: string; jobDescription?: string }) =>
    callApi("resume", data),
};

export const generateCoverLetter = {
  call: (data: { name: string; resume: string; jobDescription: string; tone?: string }) =>
    callApi("cover-letter", data),
};

export const generateInterviewPrep = {
  call: (data: { role: string; jobDescription: string; currentSkills: string }) =>
    callApi("interview", data),
};
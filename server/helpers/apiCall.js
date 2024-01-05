const apiKey = process.env.OPENAI_API_KEY;
const imageEndpoint = "https://api.openai.com/v1/images/generations";
const textEndpoint = "https://api.openai.com/v1/chat/completions";

function apiCall(prompt, type) {
  const config =
    type === "text"
      ? {
          messages: [{ role: "system", content: prompt }],
          model: "gpt-3.5-turbo",
        }
      : {
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1792",
        };
  const url = type === "text" ? textEndpoint : imageEndpoint;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(config),
    mode: "cors",
  };

  return fetch(`${url}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (type === "text") {
        if (data.choices && data.choices.length > 0) {
          return data.choices[0].message.content;
        }
      } else if (type === "image") {
        if (data && data.data && data.data.length > 0) {
          return data.data[0].url;
        }
      }
      throw new Error("No content received from OpenAI");
    })
    .catch((error) => {
      console.error("Error in fetching from open AI:", error);
      throw error;
    });
}

module.exports = apiCall;

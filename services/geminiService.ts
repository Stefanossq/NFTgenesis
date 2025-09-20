
import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("A variável de ambiente API_KEY não está definida");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCharacterImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: `arte de gacha game, splash art, key visual de anime, trending no pixiv, retrato de corpo inteiro de ${prompt}, detalhes intrincados, cores vibrantes, fantasia épica`,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages[0].image.imageBytes;
    } else {
      throw new Error("Nenhuma imagem foi gerada pela API.");
    }
  } catch (error) {
    console.error("Erro ao gerar imagem:", error);
    throw new Error("Falha ao gerar a imagem do personagem através da API Gemini.");
  }
};

export const generateCharacterStory = async (prompt: string, imageBase64: string): Promise<{name: string, story: string}> => {
  try {
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageBase64,
      },
    };

    const textPart = {
      text: `Com base na imagem deste personagem e no comando original "${prompt}", escreva uma história de fundo curta e cativante para este personagem NFT. A resposta DEVE ser em JSON.
      1. Crie um nome épico e único para o personagem.
      2. Escreva uma história de 2 a 3 parágrafos, como a de um personagem de videogame.
      `,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            story: { type: Type.STRING }
          }
        }
      }
    });
    
    // The response text will be a JSON string, parse it.
    return JSON.parse(response.text);

  } catch (error) {
    console.error("Erro ao gerar história:", error);
    throw new Error("Falha ao gerar a história do personagem através da API Gemini.");
  }
};
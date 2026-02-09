
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, Asset, ChatMessage } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMarketAnalysis = async (assets: Asset[]) => {
  const assetList = assets.map(a => `${a.name} (${a.symbol})`).join(", ");
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a brief sentiment analysis (Bullish, Bearish, or Neutral) and reasoning for the following assets: ${assetList}. Also predict a short-term move.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            asset: { type: Type.STRING },
            sentiment: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            predictedMove: { type: Type.STRING }
          },
          required: ["asset", "sentiment", "reasoning", "predictedMove"]
        }
      }
    }
  });
  return JSON.parse(response.text || "[]");
};

export const getInvestmentRecommendations = async (profile: UserProfile) => {
  const prompt = `Act as a senior financial advisor. User Profile: Age ${profile.age}, Goal: ${profile.investmentGoal}, Risk: ${profile.riskTolerance}, Horizon: ${profile.horizonYears} years. Provide a comprehensive investment roadmap including suggested asset classes and strategy.`;
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
  });
  return response.text;
};

export const getRebalanceStrategy = async (assets: Asset[], profile: UserProfile) => {
  const assetData = assets.map(a => `${a.symbol}: ${a.allocation}%`).join(", ");
  const prompt = `Analyze this portfolio for a ${profile.riskTolerance} investor: ${assetData}. Recommend specific buy/sell actions to reach an optimal diversified state.`;
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return response.text;
};

export const chatWithAdvisor = async (message: string, profile: UserProfile, history: ChatMessage[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are FinAI, an expert investment advisor. You are helping ${profile.name} (Risk: ${profile.riskTolerance}). Provide data-driven, professional, and compliant financial guidance.`,
    }
  });
  const response = await chat.sendMessage({ message });
  return response.text;
};

export const getTrendAnalysis = async (sector: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the ${sector} sector. Provide current growth drivers, primary risks, and top tickers to watch.`,
  });
  return response.text;
};

// Added missing trade intelligence and networking services
export const getDailyTradeBriefing = async (profile: UserProfile) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a concise daily trade and logistics briefing for a ${profile.riskTolerance} profile professional. Focus on global shipping, customs, and macroeconomic shifts that might impact international commerce.`,
  });
  return response.text;
};

export const findTradePartners = async (profile: UserProfile, requirements: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Act as an AI Trade Matchmaker. Based on the user requirements: "${requirements}", suggest types of partners, regions to focus on, and key vetting criteria. Consider the user's risk posture: ${profile.riskTolerance}.`,
  });
  return response.text;
};

export const getTradeIntelligence = async (regions: string[]) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze trade intelligence for the following regions: ${regions.join(", ")}. Identify specific trends, emerging opportunities, and current risk levels.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            region: { type: Type.STRING },
            trend: { type: Type.STRING },
            opportunity: { type: Type.STRING },
            riskLevel: { type: Type.STRING }
          },
          required: ["region", "trend", "opportunity", "riskLevel"]
        }
      }
    }
  });
  return JSON.parse(response.text || "[]");
};

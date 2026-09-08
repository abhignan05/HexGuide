export const modelCatalog = [
  {
    id: "veo-3-1",
    name: "Veo 3.1",
    provider: "Google",
    type: "Video Generation",

    description:
      "High-end video generation for cinematic, realistic and story-driven creative work.",

    strengths: [
      "cinematic",
      "realism",
      "storytelling",
      "audio",
      "reference images",
      "character consistency",
    ],

    bestFor: [
      "Brand Awareness",
      "Product Launch",
      "Premium Ads",
      "Cinematic Storytelling",
    ],

    platforms: [
      "Instagram",
      "Instagram Reels",
      "YouTube",
      "TikTok",
    ],

    styles: [
      "Cinematic",
      "Premium",
      "Story Driven",
    ],

    priorities: [
      "Highest Quality",
      "Best Balance",
    ],

    capabilities: {
      textToVideo: true,
      imageToVideo: true,
      referenceImages: true,
      audio: true,
      multiShot: true,
    },

    qualityScore: 10,
    speedScore: 7,
    costScore: 5,
  },

  {
    id: "seedance-2-5",
    name: "Seedance 2.5",
    provider: "ByteDance Seed",

    type: "Video Generation",

    description:
      "Multimodal video generation suited to storytelling, references, editing and longer short-form sequences.",

    strengths: [
      "multi-shot storytelling",
      "motion",
      "multimodal references",
      "audio-video generation",
      "editing",
      "extensions",
    ],

    bestFor: [
      "Storytelling",
      "Social Ads",
      "Product Videos",
      "Complex Scenes",
    ],

    platforms: [
      "Instagram",
      "Instagram Reels",
      "TikTok",
      "YouTube",
    ],

    styles: [
      "Cinematic",
      "Premium",
      "Funny / Entertaining",
      "Trend-driven",
    ],

    priorities: [
      "Highest Quality",
      "Best Balance",
    ],

    capabilities: {
      textToVideo: true,
      imageToVideo: true,
      referenceImages: true,
      audio: true,
      multiShot: true,
    },

    qualityScore: 9,
    speedScore: 7,
    costScore: 6,
  },

  {
    id: "seedance-2-fast",
    name: "Seedance 2 Fast",
    provider: "BytePlus",

    type: "Video Generation",

    description:
      "A faster video-generation option for rapid creative iteration and social content workflows.",

    strengths: [
      "fast iteration",
      "social content",
      "prompt following",
      "video generation",
    ],

    bestFor: [
      "Social Engagement",
      "Testing",
      "Rapid Iteration",
      "Short-form Ads",
    ],

    platforms: [
      "Instagram",
      "Instagram Reels",
      "TikTok",
    ],

    styles: [
      "Funny / Entertaining",
      "Trend-driven",
      "UGC / Influencer",
    ],

    priorities: [
      "Fastest Generation",
      "Best Balance",
    ],

    capabilities: {
      textToVideo: true,
      imageToVideo: true,
      referenceImages: false,
      audio: false,
      multiShot: false,
    },

    qualityScore: 7,
    speedScore: 10,
    costScore: 8,
  },
]
/**
 * VELOUR PULSE — SCORING ENGINE
 * Calculates dimension scores, archetypes, and BDSM profiles
 */

/**
 * CALCULATE DIMENSION SCORES
 * Takes user answers and returns 0-100 score for each dimension
 */
function calculateDimensionScores(userAnswers, isPremium = false) {
  const scores = {};

  // For each dimension, collect its contributing questions
  for (const [dimension, questionIds] of Object.entries(questionsByDimension)) {
    let totalScore = 0;
    let validAnswers = 0;

    for (const qId of questionIds) {
      const question = fullQuestionBank.find(q => q.id === qId);
      if (!question || userAnswers[qId] === undefined) continue;

      let score = userAnswers[qId];

      // Reverse scoring for reverse-scored questions
      if (question.reverse) {
        score = 8 - score; // Convert 1-7 scale so higher = better on original scale
      }

      totalScore += score;
      validAnswers++;
    }

    // Convert to 0-100 scale
    if (validAnswers > 0) {
      const percentage = ((totalScore - validAnswers) / (validAnswers * 6)) * 100;
      scores[dimension] = Math.max(0, Math.min(100, percentage));
    }
  }

  // Free tier: return only top 3 dimensions
  if (!isPremium) {
    const sorted = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    const freeScores = {};
    sorted.forEach(([dim, score]) => {
      freeScores[dim] = score;
    });
    return freeScores;
  }

  // Premium: return all dimensions
  return scores;
}

/**
 * GET TOP DIMENSIONS
 * Returns top N dimensions from scores
 */
function getTopDimensions(scores, count = 3) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([dimension, score]) => ({
      dimension,
      score: Math.round(score),
      label: getDimensionLabel(score, dimension)
    }));
}

/**
 * GET DIMENSION LABEL
 * Returns low/mid/high label based on score
 */
function getDimensionLabel(score, dimensionName) {
  const def = dimensionDefinitions[dimensionName];
  if (!def) return "Moderate";

  if (score < 35) return def.lowLabel;
  if (score < 65) return def.midLabel;
  return def.highLabel;
}

/**
 * CALCULATE ARCHETYPE
 * Determines primary archetype based on dimension scores
 */
function calculateArchetype(scores) {
  // ARCHETYPE LOGIC:
  // Primary archetype is based on dominant dimensions
  // Map dimensions to archetypes

  const archetypeMap = {
    // Dominant: High Kink Dynamics (giving), High Boundary Clarity, High Communication
    "Dominant": {
      dimensions: ["Kink Dynamics", "Boundary Clarity", "Communication Style"],
      getScore: (s) => (s["Kink Dynamics"] || 0) * 0.5 + (s["Boundary Clarity"] || 0) * 0.3 + (s["Communication Style"] || 0) * 0.2
    },
    // Submissive: High Kink Dynamics (receiving), High Attachment, High Connection
    "Submissive": {
      dimensions: ["Kink Dynamics", "Attachment Style", "Connection Style"],
      getScore: (s) => (s["Kink Dynamics"] || 0) * 0.5 + (s["Attachment Style"] || 0) * 0.3 + (s["Connection Style"] || 0) * 0.2
    },
    // Switch: Balanced Kink Dynamics, High Authenticity, Flexible Communication
    "Switch": {
      dimensions: ["Kink Dynamics", "Authenticity in Sex", "Communication Style"],
      getScore: (s) => {
        const kink = s["Kink Dynamics"] || 0;
        const balance = 50 - Math.abs(kink - 50); // Penalize extremes
        return balance * 0.5 + (s["Authenticity in Sex"] || 0) * 0.3 + (s["Communication Style"] || 0) * 0.2;
      }
    },
    // Rigger: High Kink Dynamics (giving restraint), High Communication, High Boundary Clarity
    "Rigger": {
      dimensions: ["Kink Dynamics", "Communication Style", "Boundary Clarity"],
      getScore: (s) => (s["Kink Dynamics"] || 0) * 0.4 + (s["Communication Style"] || 0) * 0.35 + (s["Boundary Clarity"] || 0) * 0.25
    },
    // Rope Bunny: High Kink Dynamics (receiving bondage), High Trust/Attachment, High Connection
    "Rope Bunny": {
      dimensions: ["Kink Dynamics", "Attachment Style", "Connection Style"],
      getScore: (s) => (s["Kink Dynamics"] || 0) * 0.4 + (s["Attachment Style"] || 0) * 0.35 + (s["Connection Style"] || 0) * 0.25
    },
    // Sadist: High Sex Drive, High Kink Dynamics (giving), High Boundary Clarity
    "Sadist": {
      dimensions: ["Sex Drive", "Kink Dynamics", "Boundary Clarity"],
      getScore: (s) => (s["Sex Drive"] || 0) * 0.4 + (s["Kink Dynamics"] || 0) * 0.4 + (s["Boundary Clarity"] || 0) * 0.2
    },
    // Masochist: High Sex Drive, High Authenticity, High Kink Dynamics (receiving)
    "Masochist": {
      dimensions: ["Sex Drive", "Authenticity in Sex", "Kink Dynamics"],
      getScore: (s) => (s["Sex Drive"] || 0) * 0.4 + (s["Authenticity in Sex"] || 0) * 0.35 + (s["Kink Dynamics"] || 0) * 0.25
    },
    // Exhibitionist: High Voyeurism & Exhibitionism, High Authenticity, High Sex Drive
    "Exhibitionist": {
      dimensions: ["Voyeurism & Exhibitionism", "Authenticity in Sex", "Sex Drive"],
      getScore: (s) => (s["Voyeurism & Exhibitionism"] || 0) * 0.5 + (s["Authenticity in Sex"] || 0) * 0.3 + (s["Sex Drive"] || 0) * 0.2
    },
    // Voyeur: High Voyeurism & Exhibitionism, High Boundary Clarity
    "Voyeur": {
      dimensions: ["Voyeurism & Exhibitionism", "Boundary Clarity"],
      getScore: (s) => (s["Voyeurism & Exhibitionism"] || 0) * 0.7 + (s["Boundary Clarity"] || 0) * 0.3
    },
    // Primal: High Desire Style (spontaneous), High Sex Drive, High Kink Dynamics
    "Primal": {
      dimensions: ["Desire Style", "Sex Drive", "Kink Dynamics"],
      getScore: (s) => (s["Desire Style"] || 0) * 0.4 + (s["Sex Drive"] || 0) * 0.4 + (s["Kink Dynamics"] || 0) * 0.2
    },
    // Experimentalist: High Fetish & Roleplay, High Authenticity, High Communication
    "Experimentalist": {
      dimensions: ["Fetish & Roleplay", "Authenticity in Sex", "Communication Style"],
      getScore: (s) => (s["Fetish & Roleplay"] || 0) * 0.5 + (s["Authenticity in Sex"] || 0) * 0.3 + (s["Communication Style"] || 0) * 0.2
    },
    // Caregiver: High Connection Style, High Attachment Style, High Communication
    "Caregiver": {
      dimensions: ["Connection Style", "Attachment Style", "Communication Style"],
      getScore: (s) => (s["Connection Style"] || 0) * 0.4 + (s["Attachment Style"] || 0) * 0.4 + (s["Communication Style"] || 0) * 0.2
    },
    // Little: High Attachment, High Connection, High Kink Dynamics (receiving)
    "Little": {
      dimensions: ["Attachment Style", "Connection Style", "Kink Dynamics"],
      getScore: (s) => (s["Attachment Style"] || 0) * 0.4 + (s["Connection Style"] || 0) * 0.4 + (s["Kink Dynamics"] || 0) * 0.2
    },
    // Brat: High Kink Orientation, High Authenticity, High Sex Drive, Rebellious energy
    "Brat": {
      dimensions: ["Kink Orientation", "Authenticity in Sex", "Sex Drive"],
      getScore: (s) => (s["Kink Orientation"] || 0) * 0.4 + (s["Authenticity in Sex"] || 0) * 0.4 + (s["Sex Drive"] || 0) * 0.2
    },
    // Brat Tamer: High Kink Orientation, High Boundary Clarity, High Communication
    "Brat Tamer": {
      dimensions: ["Kink Orientation", "Boundary Clarity", "Communication Style"],
      getScore: (s) => (s["Kink Orientation"] || 0) * 0.4 + (s["Boundary Clarity"] || 0) * 0.35 + (s["Communication Style"] || 0) * 0.25
    },
    // Owner: High Connection, High Kink Dynamics (giving), High Attachment
    "Owner": {
      dimensions: ["Connection Style", "Kink Dynamics", "Attachment Style"],
      getScore: (s) => (s["Connection Style"] || 0) * 0.4 + (s["Kink Dynamics"] || 0) * 0.35 + (s["Attachment Style"] || 0) * 0.25
    },
    // Pet: High Connection, High Attachment, High Kink Dynamics (receiving)
    "Pet": {
      dimensions: ["Connection Style", "Attachment Style", "Kink Dynamics"],
      getScore: (s) => (s["Connection Style"] || 0) * 0.4 + (s["Attachment Style"] || 0) * 0.35 + (s["Kink Dynamics"] || 0) * 0.25
    },
    // Sensation Seeker: High Desire Style, High Sex Drive, High Authenticity
    "Sensation Seeker": {
      dimensions: ["Desire Style", "Sex Drive", "Authenticity in Sex"],
      getScore: (s) => (s["Desire Style"] || 0) * 0.4 + (s["Sex Drive"] || 0) * 0.4 + (s["Authenticity in Sex"] || 0) * 0.2
    }
  };

  // Score each archetype
  let bestArchetype = null;
  let bestScore = -Infinity;

  for (const [name, config] of Object.entries(archetypeMap)) {
    const score = config.getScore(scores);
    if (score > bestScore) {
      bestScore = score;
      bestArchetype = name;
    }
  }

  return {
    name: bestArchetype || "Experimentalist",
    score: Math.round(bestScore),
    description: getArchetypeDescription(bestArchetype || "Experimentalist")
  };
}

/**
 * GET ARCHETYPE DESCRIPTION
 * Returns personalized description based on archetype name
 */
function getArchetypeDescription(archeTypeName) {
  const descriptions = {
    "Dominant": "You know what you want and aren't afraid to take it. Control, clarity, and confident leadership define your sexual style. You thrive when you're directing the experience and your partner respects your authority.",
    "Submissive": "You find freedom in surrender. Trust and clear communication are essential — you need to know your partner respects your boundaries while you explore the joy of release and devotion.",
    "Switch": "You're fluid and adaptable. Depending on your mood, your partner, and the moment, you might crave control or surrender. Your strength is flexibility and your ability to meet partners where they are.",
    "Rigger": "You're fascinated by the craft and art of bondage. Whether it's rope, restraints, or suspension, you're focused on technique, precision, and the intimacy that comes from your partner trusting you completely.",
    "Rope Bunny": "You love the artistry and intimacy of being tied. There's something deeply soothing about restraint, about trusting your partner completely, and about the meditative quality of rope work.",
    "Sadist": "You find pleasure in consensually delivering sensation. The reaction from your partner — their pleasure, their surrender — is part of the reward. You're focused, intentional, and deeply engaged.",
    "Masochist": "Receiving sensation is where you find your flow state. The sting, the rush, the release — these experiences ground you and connect you to your body in ways that feel profound.",
    "Exhibitionist": "Being seen is your turn-on. You feel alive when you're the focus of attention, when your body and presence are appreciated, and when you're performing for an audience (consensually).",
    "Voyeur": "You're aroused by witnessing. There's something deeply satisfying about watching, observing, and being present without necessarily participating. You value discretion and consent in all scenarios.",
    "Primal": "You're instinctive and raw. You prefer spontaneous, unscripted moments where animal attraction and natural chemistry take over. Rules feel limiting — flow and intuition are your guides.",
    "Experimentalist": "You're curious about everything. Roleplay, fetishes, scenarios, costumes — you approach sexuality like an explorer. You're open, playful, and driven by the question: what's next?",
    "Caregiver": "Nurturing and protective, you show love through care and attention. You get deep satisfaction from knowing your partner feels safe, seen, and cherished. Aftercare and emotional check-ins matter deeply.",
    "Little": "You find comfort, play, and freedom in a dynamic where someone else holds the space. There's something freeing about letting go of control and allowing yourself to be cared for and protected.",
    "Brat": "You're cheeky, playful, and a little rebellious. You push boundaries (within consent) because you enjoy the dynamic that creates. You value partners who can match your energy and aren't afraid to keep you in check.",
    "Brat Tamer": "You enjoy the challenge and the chase. There's deep satisfaction in breaking through resistance with patience and authority. You value partners who push back because it makes the dynamic more engaging.",
    "Owner": "Ownership, collaring, and devotion speak to you. You thrive in dynamics built on deep claimed connection, where your partner belongs to you and you take responsibility for their wellbeing.",
    "Pet": "Being claimed, cared for, and belonging fully feels natural and freeing. The pet dynamic gives you permission to surrender control and experience the comfort of having someone else shape the dynamic.",
    "Sensation Seeker": "You're driven by feeling. Texture, temperature, sensation, and novelty light you up. You don't necessarily need extreme dynamics — you just need experiences that engage all your senses.",
    "Vanilla Curious": "You're new to exploring kink and sexuality beyond the conventional. Every archetype here was once here too — you're at the beginning of your journey, and that's exactly where you should be."
  };

  return descriptions[archeTypeName] || descriptions["Experimentalist"];
}

/**
 * CALCULATE BDSM PROFILE
 * Scores across 6 dimensions: Sensation, Impact, Restraint, Power, Humiliation, Role-play
 * Each has giving & receiving scores
 */
function calculateBDSMProfile(userAnswers) {
  const bdsmDimensions = {
    "Sensation Play": {
      giving: [1, 7],
      receiving: [7]
    },
    "Impact Play": {
      giving: [2],
      receiving: [8]
    },
    "Restraint": {
      giving: [3],
      receiving: [9]
    },
    "Power Dynamics": {
      giving: [4],
      receiving: [10]
    },
    "Humiliation": {
      giving: [5],
      receiving: [11]
    },
    "Role Dynamics": {
      giving: [6],
      receiving: [12]
    }
  };

  const profile = {};

  for (const [category, questions] of Object.entries(bdsmDimensions)) {
    const givingScores = questions.giving.map(id => userAnswers[id] || 0);
    const receivingScores = questions.receiving.map(id => userAnswers[id] || 0);

    const givingAvg = givingScores.length > 0
      ? Math.round((givingScores.reduce((a, b) => a + b, 0) / givingScores.length / 7) * 100)
      : 0;

    const receivingAvg = receivingScores.length > 0
      ? Math.round((receivingScores.reduce((a, b) => a + b, 0) / receivingScores.length / 7) * 100)
      : 0;

    profile[category] = {
      giving: givingAvg,
      receiving: receivingAvg,
      combined: Math.round((givingAvg + receivingAvg) / 2)
    };
  }

  return profile;
}

/**
 * CALCULATE ALL ARCHETYPE SCORES
 * Returns scores for all 18 archetypes (premium only)
 */
function calculateAllArchetypeScores(userAnswers) {
  const fullScores = calculateDimensionScores(userAnswers, true);

  const archetypeMap = {
    "Dominant": (s) => (s["Kink Dynamics"] || 0) * 0.5 + (s["Boundary Clarity"] || 0) * 0.3 + (s["Communication Style"] || 0) * 0.2,
    "Submissive": (s) => (s["Kink Dynamics"] || 0) * 0.5 + (s["Attachment Style"] || 0) * 0.3 + (s["Connection Style"] || 0) * 0.2,
    "Switch": (s) => {
      const kink = s["Kink Dynamics"] || 0;
      const balance = 50 - Math.abs(kink - 50);
      return balance * 0.5 + (s["Authenticity in Sex"] || 0) * 0.3 + (s["Communication Style"] || 0) * 0.2;
    },
    "Rigger": (s) => (s["Kink Dynamics"] || 0) * 0.4 + (s["Communication Style"] || 0) * 0.35 + (s["Boundary Clarity"] || 0) * 0.25,
    "Rope Bunny": (s) => (s["Kink Dynamics"] || 0) * 0.4 + (s["Attachment Style"] || 0) * 0.35 + (s["Connection Style"] || 0) * 0.25,
    "Sadist": (s) => (s["Sex Drive"] || 0) * 0.4 + (s["Kink Dynamics"] || 0) * 0.4 + (s["Boundary Clarity"] || 0) * 0.2,
    "Masochist": (s) => (s["Sex Drive"] || 0) * 0.4 + (s["Authenticity in Sex"] || 0) * 0.35 + (s["Kink Dynamics"] || 0) * 0.25,
    "Exhibitionist": (s) => (s["Voyeurism & Exhibitionism"] || 0) * 0.5 + (s["Authenticity in Sex"] || 0) * 0.3 + (s["Sex Drive"] || 0) * 0.2,
    "Voyeur": (s) => (s["Voyeurism & Exhibitionism"] || 0) * 0.7 + (s["Boundary Clarity"] || 0) * 0.3,
    "Primal": (s) => (s["Desire Style"] || 0) * 0.4 + (s["Sex Drive"] || 0) * 0.4 + (s["Kink Dynamics"] || 0) * 0.2,
    "Experimentalist": (s) => (s["Fetish & Roleplay"] || 0) * 0.5 + (s["Authenticity in Sex"] || 0) * 0.3 + (s["Communication Style"] || 0) * 0.2,
    "Caregiver": (s) => (s["Connection Style"] || 0) * 0.4 + (s["Attachment Style"] || 0) * 0.4 + (s["Communication Style"] || 0) * 0.2,
    "Little": (s) => (s["Attachment Style"] || 0) * 0.4 + (s["Connection Style"] || 0) * 0.4 + (s["Kink Dynamics"] || 0) * 0.2,
    "Brat": (s) => (s["Kink Orientation"] || 0) * 0.4 + (s["Authenticity in Sex"] || 0) * 0.4 + (s["Sex Drive"] || 0) * 0.2,
    "Brat Tamer": (s) => (s["Kink Orientation"] || 0) * 0.4 + (s["Boundary Clarity"] || 0) * 0.35 + (s["Communication Style"] || 0) * 0.25,
    "Owner": (s) => (s["Connection Style"] || 0) * 0.4 + (s["Kink Dynamics"] || 0) * 0.35 + (s["Attachment Style"] || 0) * 0.25,
    "Pet": (s) => (s["Connection Style"] || 0) * 0.4 + (s["Attachment Style"] || 0) * 0.35 + (s["Kink Dynamics"] || 0) * 0.25,
    "Sensation Seeker": (s) => (s["Desire Style"] || 0) * 0.4 + (s["Sex Drive"] || 0) * 0.4 + (s["Authenticity in Sex"] || 0) * 0.2
  };

  const allScores = {};
  for (const [name, scoreFn] of Object.entries(archetypeMap)) {
    allScores[name] = Math.round(scoreFn(fullScores));
  }

  return allScores;
}

/**
 * GENERATE EMOTIONAL INSIGHT
 * Returns 2-3 sentence insight based on top dimensions and archetype
 */
function generateEmotionalInsight(scores, archetype) {
  const topDims = getTopDimensions(scores, 3);
  const insights = [];

  // Build insight based on top dimensions
  if (topDims[0]?.dimension === "Connection Style" && scores["Connection Style"] > 65) {
    insights.push("You crave deep emotional and physical connection, and that's your strength. Your sexual expression is most alive when you feel truly seen and valued by a partner.");
  }
  if (topDims.some(d => d.dimension === "Boundary Clarity") && scores["Boundary Clarity"] > 65) {
    insights.push("You know your limits and you're not afraid to communicate them. This clarity helps you feel safe, which opens the door to deeper exploration and trust.");
  }
  if (topDims.some(d => d.dimension === "Authenticity in Sex") && scores["Authenticity in Sex"] > 65) {
    insights.push("You bring genuine, unapologetic presence to intimacy. You're not performing — you're just being, and that authenticity is magnetic.");
  }
  if (topDims.some(d => d.dimension === "Sex Drive") && scores["Sex Drive"] > 65) {
    insights.push("You have strong, consistent desire, and you prioritize it in your life. This isn't a phase — sexual exploration is central to who you are.");
  }
  if (topDims.some(d => d.dimension === "Attachment Style") && scores["Attachment Style"] > 65) {
    insights.push("You feel secure in intimate relationships, which gives you freedom to explore without fear or neediness. That security is rare and valuable.");
  }

  // Fall back to archetype-based insight if needed
  if (insights.length === 0) {
    const archetypeInsights = {
      "Dominant": "You lead with confidence and know what you want. Your directness and clarity create safety for your partners.",
      "Submissive": "You find power in surrender. Your trust and willingness to be vulnerable invites deep, meaningful connection.",
      "Switch": "Your flexibility and adaptability are your superpowers. You meet partners where they are and create balance.",
      "Rigger": "You're drawn to the artistry and skill of bondage. Your focus on craft and partner safety creates meaningful intimacy.",
      "Rope Bunny": "You find trust and meditative peace in restraint. Your vulnerability invites deep technical and emotional intimacy.",
      "Sadist": "You find pleasure in consensual sensation-giving. Your focus and intentionality create powerful, engaging moments.",
      "Masochist": "You experience sensation as a path to presence and release. Your openness to intensity creates authentic connection.",
      "Exhibitionist": "You bring confident presence to intimacy. Being seen is how you feel alive and validated.",
      "Voyeur": "You derive pleasure from observation and presence. Your discretion and respect set the tone for consensual exploration.",
      "Primal": "You trust instinct over rules. Your natural, unscripted energy creates authentic, spontaneous connection.",
      "Experimentalist": "You bring curiosity and playfulness to sex. Your openness creates space for growth and discovery.",
      "Caregiver": "You show love through care and attention. Your presence and aftercare make partners feel deeply valued.",
      "Little": "You bring playfulness and trust to intimacy. Your openness to care creates space for deep connection.",
      "Brat": "You bring playful challenge to intimacy. Your confidence and pushback create engaging, dynamic interactions.",
      "Brat Tamer": "You enjoy the dance of challenge and control. Your patience and authority make partners feel seen and engaged.",
      "Owner": "You thrive in claimed, devoted dynamics. Your care and ownership create deep, meaningful belonging.",
      "Pet": "You find freedom in being cared for and owned. Your trust and openness create safe, nurturing connection.",
      "Sensation Seeker": "You're fully alive through sensation and presence. Your curiosity and openness create dynamic, engaging moments."
    };

    insights.push(archetypeInsights[archetype.name] || "Your unique blend of desires and values creates your distinctive sexual expression.");
  }

  return insights.slice(0, 3).join(" ");
}

/**
 * FREE-TIER SUMMARY
 * Generates summary text for free results page
 */
function generateFreeSummary(scores, archetype, bdsmProfile) {
  const topDim = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([dim]) => dim)[0];

  const bdsmSummary = Object.entries(bdsmProfile)
    .sort((a, b) => b[1].combined - a[1].combined)
    .slice(0, 2)
    .map(([cat, scores]) => `${cat}: ${scores.combined}%`)
    .join(" • ");

  return `Your profile suggests a ${archetype.name.toLowerCase()} orientation, with ${topDim.toLowerCase()} as a primary interest. ${bdsmSummary}.`;
}

/**
 * Export functions
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateDimensionScores,
    getTopDimensions,
    getDimensionLabel,
    calculateArchetype,
    getArchetypeDescription,
    calculateBDSMProfile,
    calculateAllArchetypeScores,
    generateEmotionalInsight,
    generateFreeSummary
  };
}

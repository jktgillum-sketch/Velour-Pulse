/**
 * VELOUR PULSE — Complete Question Framework
 * 120 questions organized by section with dimension mappings
 * Scale: 1-7 (Strongly disagree → Strongly agree) unless noted
 */

const fullQuestionBank = [
  // ============================================================================
  // SECTION A: DESIRES (Questions 1-40)
  // ============================================================================

  // PART 1: KINK DYNAMICS (Q1-12)
  {
    id: 1,
    section: "Desires",
    part: "Kink Dynamics",
    text: "Sensation play (feathers, ice, wax, blindfolds) — giving",
    dimensions: ["Kink Dynamics", "Kink Orientation"],
    category: "Giving",
    type: "scale",
    reverse: false
  },
  {
    id: 2,
    section: "Desires",
    part: "Kink Dynamics",
    text: "Impact play (spanking, paddling, flogging) — giving",
    dimensions: ["Kink Dynamics", "Kink Orientation"],
    category: "Giving",
    type: "scale",
    reverse: false
  },
  {
    id: 3,
    section: "Desires",
    part: "Kink Dynamics",
    text: "Restraint and bondage — giving",
    dimensions: ["Kink Dynamics", "Kink Orientation"],
    category: "Giving",
    type: "scale",
    reverse: false
  },
  {
    id: 4,
    section: "Desires",
    part: "Kink Dynamics",
    text: "Domination and control — giving",
    dimensions: ["Kink Dynamics", "Kink Orientation"],
    category: "Giving",
    type: "scale",
    reverse: false
  },
  {
    id: 5,
    section: "Desires",
    part: "Kink Dynamics",
    text: "Humiliation or degradation play — giving",
    dimensions: ["Kink Dynamics", "Kink Orientation"],
    category: "Giving",
    type: "scale",
    reverse: false
  },
  {
    id: 6,
    section: "Desires",
    part: "Kink Dynamics",
    text: "Role-specific power dynamics (Sir/sub, Owner/pet, etc.) — giving",
    dimensions: ["Kink Dynamics", "Kink Orientation"],
    category: "Giving",
    type: "scale",
    reverse: false
  },
  {
    id: 7,
    section: "Desires",
    part: "Kink Dynamics",
    text: "Sensation play (feathers, ice, wax, blindfolds) — receiving",
    dimensions: ["Kink Dynamics", "Kink Orientation"],
    category: "Receiving",
    type: "scale",
    reverse: false
  },
  {
    id: 8,
    section: "Desires",
    part: "Kink Dynamics",
    text: "Impact play (spanking, paddling, flogging) — receiving",
    dimensions: ["Kink Dynamics", "Kink Orientation"],
    category: "Receiving",
    type: "scale",
    reverse: false
  },
  {
    id: 9,
    section: "Desires",
    part: "Kink Dynamics",
    text: "Restraint and bondage — receiving",
    dimensions: ["Kink Dynamics", "Kink Orientation"],
    category: "Receiving",
    type: "scale",
    reverse: false
  },
  {
    id: 10,
    section: "Desires",
    part: "Kink Dynamics",
    text: "Submission and being controlled — receiving",
    dimensions: ["Kink Dynamics", "Kink Orientation"],
    category: "Receiving",
    type: "scale",
    reverse: false
  },
  {
    id: 11,
    section: "Desires",
    part: "Kink Dynamics",
    text: "Humiliation or degradation play — receiving",
    dimensions: ["Kink Dynamics", "Kink Orientation"],
    category: "Receiving",
    type: "scale",
    reverse: false
  },
  {
    id: 12,
    section: "Desires",
    part: "Kink Dynamics",
    text: "Role-specific power dynamics (Sir/sub, Owner/pet, etc.) — receiving",
    dimensions: ["Kink Dynamics", "Kink Orientation"],
    category: "Receiving",
    type: "scale",
    reverse: false
  },

  // PART 2: VOYEURISM & EXHIBITIONISM (Q13-17)
  {
    id: 13,
    section: "Desires",
    part: "Voyeurism & Exhibitionism",
    text: "Watching others in sexual situations (consensually) interests me",
    dimensions: ["Voyeurism & Exhibitionism"],
    type: "scale",
    reverse: false
  },
  {
    id: 14,
    section: "Desires",
    part: "Voyeurism & Exhibitionism",
    text: "Being watched during sex is something I find exciting",
    dimensions: ["Voyeurism & Exhibitionism"],
    type: "scale",
    reverse: false
  },
  {
    id: 15,
    section: "Desires",
    part: "Voyeurism & Exhibitionism",
    text: "Performing for a partner visually is appealing to me",
    dimensions: ["Voyeurism & Exhibitionism"],
    type: "scale",
    reverse: false
  },
  {
    id: 16,
    section: "Desires",
    part: "Voyeurism & Exhibitionism",
    text: "I'm curious about partner-watching arrangements (with full consent)",
    dimensions: ["Voyeurism & Exhibitionism"],
    type: "scale",
    reverse: false
  },
  {
    id: 17,
    section: "Desires",
    part: "Voyeurism & Exhibitionism",
    text: "Public or semi-public settings add to my excitement",
    dimensions: ["Voyeurism & Exhibitionism"],
    type: "scale",
    reverse: false
  },

  // PART 3: FETISH & ROLEPLAY (Q18-24)
  {
    id: 18,
    section: "Desires",
    part: "Fetish & Roleplay",
    text: "I have specific objects, materials, or body parts that are intensely arousing to me",
    dimensions: ["Fetish & Roleplay", "Kink Orientation"],
    type: "scale",
    reverse: false
  },
  {
    id: 19,
    section: "Desires",
    part: "Fetish & Roleplay",
    text: "I enjoy incorporating costumes or props into sex",
    dimensions: ["Fetish & Roleplay"],
    type: "scale",
    reverse: false
  },
  {
    id: 20,
    section: "Desires",
    part: "Fetish & Roleplay",
    text: "Fantasy roleplay (teacher/student, strangers, etc.) appeals to me",
    dimensions: ["Fetish & Roleplay"],
    type: "scale",
    reverse: false
  },
  {
    id: 21,
    section: "Desires",
    part: "Fetish & Roleplay",
    text: "I enjoy consensual taboo scenarios in fantasy",
    dimensions: ["Fetish & Roleplay"],
    type: "scale",
    reverse: false
  },
  {
    id: 22,
    section: "Desires",
    part: "Fetish & Roleplay",
    text: "I'm interested in group sex or multi-partner scenarios",
    dimensions: ["Fetish & Roleplay"],
    type: "scale",
    reverse: false
  },
  {
    id: 23,
    section: "Desires",
    part: "Fetish & Roleplay",
    text: "Swinging or partner-swapping interests me",
    dimensions: ["Fetish & Roleplay"],
    type: "scale",
    reverse: false
  },
  {
    id: 24,
    section: "Desires",
    part: "Fetish & Roleplay",
    text: "I enjoy pet play or animal-role dynamics",
    dimensions: ["Fetish & Roleplay"],
    type: "scale",
    reverse: false
  },

  // PART 4: DESIRE STYLE - SPONTANEITY (Q25-30)
  {
    id: 25,
    section: "Desires",
    part: "Desire Style",
    text: "I experience desire spontaneously — it arises out of nowhere",
    dimensions: ["Desire Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 26,
    section: "Desires",
    part: "Desire Style",
    text: "My desire is more responsive — it builds once I'm already in a moment",
    dimensions: ["Desire Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 27,
    section: "Desires",
    part: "Desire Style",
    text: "I need the right context to feel sexually interested",
    dimensions: ["Desire Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 28,
    section: "Desires",
    part: "Desire Style",
    text: "Stress or anxiety noticeably lowers my sex drive",
    dimensions: ["Desire Style", "Sex Drive"],
    type: "scale",
    reverse: false
  },
  {
    id: 29,
    section: "Desires",
    part: "Desire Style",
    text: "When I'm relaxed and comfortable, my desire increases significantly",
    dimensions: ["Desire Style", "Sex Drive"],
    type: "scale",
    reverse: false
  },
  {
    id: 30,
    section: "Desires",
    part: "Desire Style",
    text: "I can separate emotional mood from sexual desire easily",
    dimensions: ["Desire Style"],
    type: "scale",
    reverse: false
  },

  // PART 4B: DESIRE ACCELERATORS (Q31-35)
  {
    id: 31,
    section: "Desires",
    part: "Desire Accelerators",
    text: "Novelty and new experiences increase my desire",
    dimensions: ["Desire Style", "Sex Drive"],
    type: "scale",
    reverse: false
  },
  {
    id: 32,
    section: "Desires",
    part: "Desire Accelerators",
    text: "Feeling desired by my partner is a strong turn-on",
    dimensions: ["Connection Style", "Sex Drive"],
    type: "scale",
    reverse: false
  },
  {
    id: 33,
    section: "Desires",
    part: "Desire Accelerators",
    text: "Visuals (partner's body, imagery) reliably arouse me",
    dimensions: ["Desire Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 34,
    section: "Desires",
    part: "Desire Accelerators",
    text: "Words, dirty talk, or verbal cues are highly arousing to me",
    dimensions: ["Desire Style", "Communication Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 35,
    section: "Desires",
    part: "Desire Accelerators",
    text: "Anticipation and build-up matter as much as the act itself",
    dimensions: ["Desire Style"],
    type: "scale",
    reverse: false
  },

  // PART 4C: DESIRE BRAKES (Q36-40)
  {
    id: 36,
    section: "Desires",
    part: "Desire Brakes",
    text: "Feeling disconnected from my partner reduces desire",
    dimensions: ["Connection Style", "Attachment Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 37,
    section: "Desires",
    part: "Desire Brakes",
    text: "Body image or self-consciousness can get in the way",
    dimensions: ["Authenticity in Sex"],
    type: "scale",
    reverse: false
  },
  {
    id: 38,
    section: "Desires",
    part: "Desire Brakes",
    text: "Worrying about being judged affects my openness",
    dimensions: ["Authenticity in Sex", "Boundary Clarity"],
    type: "scale",
    reverse: false
  },
  {
    id: 39,
    section: "Desires",
    part: "Desire Brakes",
    text: "Unresolved tension or arguments make it hard to be sexual",
    dimensions: ["Connection Style", "Attachment Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 40,
    section: "Desires",
    part: "Desire Brakes",
    text: "Performance pressure inhibits my enjoyment",
    dimensions: ["Authenticity in Sex"],
    type: "scale",
    reverse: false
  },

  // ============================================================================
  // SECTION B: AUTHENTICITY & SELF-EXPRESSION (Q41-47)
  // ============================================================================
  {
    id: 41,
    section: "Authenticity",
    part: "Authenticity in Sex",
    text: "I have sex because I genuinely want to",
    dimensions: ["Authenticity in Sex"],
    type: "scale",
    reverse: false
  },
  {
    id: 42,
    section: "Authenticity",
    part: "Authenticity in Sex",
    text: "I feel I need to perform or put on a show during sex",
    dimensions: ["Authenticity in Sex"],
    type: "scale",
    reverse: true
  },
  {
    id: 43,
    section: "Authenticity",
    part: "Authenticity in Sex",
    text: "I worry about being judged during sex",
    dimensions: ["Authenticity in Sex"],
    type: "scale",
    reverse: true
  },
  {
    id: 44,
    section: "Authenticity",
    part: "Authenticity in Sex",
    text: "I feel empowered during sex",
    dimensions: ["Authenticity in Sex"],
    type: "scale",
    reverse: false
  },
  {
    id: 45,
    section: "Authenticity",
    part: "Authenticity in Sex",
    text: "My sexual preferences feel true to who I am",
    dimensions: ["Authenticity in Sex"],
    type: "scale",
    reverse: false
  },
  {
    id: 46,
    section: "Authenticity",
    part: "Authenticity in Sex",
    text: "I feel free to express what I want with partners",
    dimensions: ["Authenticity in Sex", "Communication Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 47,
    section: "Authenticity",
    part: "Authenticity in Sex",
    text: "Sex feels like an authentic expression of myself",
    dimensions: ["Authenticity in Sex"],
    type: "scale",
    reverse: false
  },

  // ============================================================================
  // SECTION C: BOUNDARIES & CONSENT (Q48-74)
  // ============================================================================

  // PART 5: VOICE & CONSENT - INITIATING (Q48-52)
  {
    id: 48,
    section: "Boundaries",
    part: "Voice & Consent",
    text: "I'm open with partners about my needs",
    dimensions: ["Communication Style", "Boundary Clarity"],
    type: "scale",
    reverse: false
  },
  {
    id: 49,
    section: "Boundaries",
    part: "Voice & Consent",
    text: "I let partners know when I want to have sex",
    dimensions: ["Communication Style", "Boundary Clarity"],
    type: "scale",
    reverse: false
  },
  {
    id: 50,
    section: "Boundaries",
    part: "Voice & Consent",
    text: "It's easy to talk about sex with partners",
    dimensions: ["Communication Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 51,
    section: "Boundaries",
    part: "Voice & Consent",
    text: "I feel comfortable initiating intimacy",
    dimensions: ["Communication Style", "Boundary Clarity"],
    type: "scale",
    reverse: false
  },
  {
    id: 52,
    section: "Boundaries",
    part: "Voice & Consent",
    text: "I can express what I want without feeling embarrassed",
    dimensions: ["Communication Style", "Authenticity in Sex"],
    type: "scale",
    reverse: false
  },

  // PART 6: SAYING NO (Q53-57)
  {
    id: 53,
    section: "Boundaries",
    part: "Saying No",
    text: "I say no if I don't want sex",
    dimensions: ["Boundary Clarity"],
    type: "scale",
    reverse: false
  },
  {
    id: 54,
    section: "Boundaries",
    part: "Saying No",
    text: "I sometimes have sex when I don't really want to",
    dimensions: ["Boundary Clarity"],
    type: "scale",
    reverse: true
  },
  {
    id: 55,
    section: "Boundaries",
    part: "Saying No",
    text: "It's easy to say no without feeling guilty",
    dimensions: ["Boundary Clarity"],
    type: "scale",
    reverse: false
  },
  {
    id: 56,
    section: "Boundaries",
    part: "Saying No",
    text: "I can hold my limits even under pressure",
    dimensions: ["Boundary Clarity"],
    type: "scale",
    reverse: false
  },
  {
    id: 57,
    section: "Boundaries",
    part: "Saying No",
    text: "I feel safe asserting my boundaries with partners",
    dimensions: ["Boundary Clarity", "Attachment Style"],
    type: "scale",
    reverse: false
  },

  // PART 7: SAFETY & SEXUAL HEALTH (Q58-62)
  {
    id: 58,
    section: "Boundaries",
    part: "Sexual Health",
    text: "I ask partners if they've practiced safe sex with others",
    dimensions: ["Boundary Clarity", "Communication Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 59,
    section: "Boundaries",
    part: "Sexual Health",
    text: "I ask partners about their sexual history",
    dimensions: ["Boundary Clarity", "Communication Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 60,
    section: "Boundaries",
    part: "Sexual Health",
    text: "I ask partners about STI status before sex",
    dimensions: ["Boundary Clarity", "Communication Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 61,
    section: "Boundaries",
    part: "Sexual Health",
    text: "I use protection consistently",
    dimensions: ["Boundary Clarity"],
    type: "scale",
    reverse: false
  },
  {
    id: 62,
    section: "Boundaries",
    part: "Sexual Health",
    text: "I bring up sexual health conversations before becoming intimate",
    dimensions: ["Communication Style", "Boundary Clarity"],
    type: "scale",
    reverse: false
  },

  // PART 8: RED FLAGS AWARENESS (Q63-68)
  // Note: Different scale (1-7 where 7 = always a red flag)
  {
    id: 63,
    section: "Boundaries",
    part: "Red Flags",
    text: "A partner checking your phone without permission",
    dimensions: ["Boundary Clarity"],
    type: "scale",
    reverse: false
  },
  {
    id: 64,
    section: "Boundaries",
    part: "Red Flags",
    text: "A partner monitoring your social media contacts or messages",
    dimensions: ["Boundary Clarity"],
    type: "scale",
    reverse: false
  },
  {
    id: 65,
    section: "Boundaries",
    part: "Red Flags",
    text: "A partner controlling who you spend time with",
    dimensions: ["Boundary Clarity"],
    type: "scale",
    reverse: false
  },
  {
    id: 66,
    section: "Boundaries",
    part: "Red Flags",
    text: "A partner using guilt to influence your sexual decisions",
    dimensions: ["Boundary Clarity"],
    type: "scale",
    reverse: false
  },
  {
    id: 67,
    section: "Boundaries",
    part: "Red Flags",
    text: "A partner dismissing your stated limits as 'not serious'",
    dimensions: ["Boundary Clarity"],
    type: "scale",
    reverse: false
  },
  {
    id: 68,
    section: "Boundaries",
    part: "Red Flags",
    text: "A partner pressuring you after you've said no",
    dimensions: ["Boundary Clarity"],
    type: "scale",
    reverse: false
  },

  // PART 9: SELF-EXPRESSION (Q69-74)
  {
    id: 69,
    section: "Boundaries",
    part: "Self-Expression",
    text: "I've read or learned about my sexual interests",
    dimensions: ["Authenticity in Sex"],
    type: "scale",
    reverse: false
  },
  {
    id: 70,
    section: "Boundaries",
    part: "Self-Expression",
    text: "I feel proud of my sexual preferences",
    dimensions: ["Authenticity in Sex"],
    type: "scale",
    reverse: false
  },
  {
    id: 71,
    section: "Boundaries",
    part: "Self-Expression",
    text: "I feel comfortable bringing up toys or new ideas with a partner",
    dimensions: ["Communication Style", "Authenticity in Sex"],
    type: "scale",
    reverse: false
  },
  {
    id: 72,
    section: "Boundaries",
    part: "Self-Expression",
    text: "I feel seen when a partner engages with my desires",
    dimensions: ["Connection Style", "Authenticity in Sex"],
    type: "scale",
    reverse: false
  },
  {
    id: 73,
    section: "Boundaries",
    part: "Self-Expression",
    text: "It matters to me that partners take my interests seriously",
    dimensions: ["Communication Style", "Connection Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 74,
    section: "Boundaries",
    part: "Self-Expression",
    text: "I often talk about my interests with partners",
    dimensions: ["Communication Style"],
    type: "scale",
    reverse: false
  },

  // ============================================================================
  // SECTION D: CONNECTION & ATTACHMENT (Q75-113)
  // ============================================================================

  // PART 10: DEALBREAKERS (Q75-80)
  {
    id: 75,
    section: "Connection",
    part: "Dealbreakers",
    text: "A partner who kink-shames others",
    dimensions: ["Connection Style", "Authenticity in Sex"],
    type: "scale",
    reverse: false
  },
  {
    id: 76,
    section: "Connection",
    part: "Dealbreakers",
    text: "A partner who won't discuss sexual health",
    dimensions: ["Communication Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 77,
    section: "Connection",
    part: "Dealbreakers",
    text: "A partner who doesn't respect stated limits",
    dimensions: ["Boundary Clarity"],
    type: "scale",
    reverse: false
  },
  {
    id: 78,
    section: "Connection",
    part: "Dealbreakers",
    text: "A partner who avoids communication about sex altogether",
    dimensions: ["Communication Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 79,
    section: "Connection",
    part: "Dealbreakers",
    text: "A partner who is dishonest about other partners",
    dimensions: ["Communication Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 80,
    section: "Connection",
    part: "Dealbreakers",
    text: "A partner who uses sex as a reward or punishment",
    dimensions: ["Connection Style"],
    type: "scale",
    reverse: false
  },

  // PART 11: ATTACHMENT STYLE (Q81-86)
  {
    id: 81,
    section: "Connection",
    part: "Attachment Style",
    text: "I need emotional connection before I can be fully sexually open",
    dimensions: ["Attachment Style", "Connection Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 82,
    section: "Connection",
    part: "Attachment Style",
    text: "I feel anxious when partners seem emotionally distant",
    dimensions: ["Attachment Style"],
    type: "scale",
    reverse: true
  },
  {
    id: 83,
    section: "Connection",
    part: "Attachment Style",
    text: "I'm comfortable with independence in relationships",
    dimensions: ["Attachment Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 84,
    section: "Connection",
    part: "Attachment Style",
    text: "I find it relatively easy to trust new partners",
    dimensions: ["Attachment Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 85,
    section: "Connection",
    part: "Attachment Style",
    text: "I pull away when things get too intense emotionally",
    dimensions: ["Attachment Style"],
    type: "scale",
    reverse: true
  },
  {
    id: 86,
    section: "Connection",
    part: "Attachment Style",
    text: "I feel most myself when I'm securely attached to someone",
    dimensions: ["Attachment Style"],
    type: "scale",
    reverse: false
  },

  // PART 12: EMOTIONAL NEEDS (Q87-92)
  {
    id: 87,
    section: "Connection",
    part: "Emotional Needs",
    text: "Verbal reassurance and check-ins matter deeply to me",
    dimensions: ["Attachment Style", "Connection Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 88,
    section: "Connection",
    part: "Emotional Needs",
    text: "I need consistency from partners to feel secure",
    dimensions: ["Attachment Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 89,
    section: "Connection",
    part: "Emotional Needs",
    text: "I feel most open when I feel emotionally safe",
    dimensions: ["Attachment Style", "Connection Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 90,
    section: "Connection",
    part: "Emotional Needs",
    text: "The more I trust someone, the more vulnerable I can be",
    dimensions: ["Attachment Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 91,
    section: "Connection",
    part: "Emotional Needs",
    text: "I need to feel emotionally connected to enjoy sex fully",
    dimensions: ["Connection Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 92,
    section: "Connection",
    part: "Emotional Needs",
    text: "Acts of care before and after sex matter as much as sex itself",
    dimensions: ["Connection Style"],
    type: "scale",
    reverse: false
  },

  // PART 13: COMMUNICATION STYLE A (Q93-95)
  {
    id: 93,
    section: "Connection",
    part: "Communication Style",
    text: "I like to talk with someone before we have sex",
    dimensions: ["Communication Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 94,
    section: "Connection",
    part: "Communication Style",
    text: "I need chemistry before I'm sexually interested in someone",
    dimensions: ["Communication Style", "Connection Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 95,
    section: "Connection",
    part: "Communication Style",
    text: "I address issues directly rather than avoiding them",
    dimensions: ["Communication Style"],
    type: "scale",
    reverse: false
  },

  // PART 13: COMMUNICATION STYLE B (Q96-99)
  {
    id: 96,
    section: "Connection",
    part: "Communication Style",
    text: "I find it easy to share my feelings with partners",
    dimensions: ["Communication Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 97,
    section: "Connection",
    part: "Communication Style",
    text: "I talk openly about what I need in relationships",
    dimensions: ["Communication Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 98,
    section: "Connection",
    part: "Communication Style",
    text: "Aftercare — checking in after intimacy — matters to me",
    dimensions: ["Connection Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 99,
    section: "Connection",
    part: "Communication Style",
    text: "I'd rather have a hard conversation than let something fester",
    dimensions: ["Communication Style"],
    type: "scale",
    reverse: false
  },

  // PART 14: RELATIONSHIP STRUCTURE A (Q100-106)
  {
    id: 100,
    section: "Connection",
    part: "Relationship Structure",
    text: "I'm open to non-monogamy",
    dimensions: ["Relationship Structure"],
    type: "scale",
    reverse: false
  },
  {
    id: 101,
    section: "Connection",
    part: "Relationship Structure",
    text: "Commitment is deeply important to me",
    dimensions: ["Relationship Structure"],
    type: "scale",
    reverse: false
  },
  {
    id: 102,
    section: "Connection",
    part: "Relationship Structure",
    text: "I prefer depth of connection over number of connections",
    dimensions: ["Relationship Structure", "Connection Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 103,
    section: "Connection",
    part: "Relationship Structure",
    text: "Long-term partnership is what I'm building toward",
    dimensions: ["Relationship Structure"],
    type: "scale",
    reverse: false
  },
  {
    id: 104,
    section: "Connection",
    part: "Relationship Structure",
    text: "I enjoy connections that don't need labels",
    dimensions: ["Relationship Structure"],
    type: "scale",
    reverse: false
  },
  {
    id: 105,
    section: "Connection",
    part: "Relationship Structure",
    text: "Loyalty and exclusivity matter a lot to me",
    dimensions: ["Relationship Structure"],
    type: "scale",
    reverse: false
  },
  {
    id: 106,
    section: "Connection",
    part: "Relationship Structure",
    text: "I could be happy in multiple caring connections at once",
    dimensions: ["Relationship Structure"],
    type: "scale",
    reverse: false
  },

  // PART 14: INTIMACY & CLOSENESS (Q107-113)
  {
    id: 107,
    section: "Connection",
    part: "Intimacy & Closeness",
    text: "Physical touch is central to how I feel loved",
    dimensions: ["Connection Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 108,
    section: "Connection",
    part: "Intimacy & Closeness",
    text: "I feel most connected through shared experiences",
    dimensions: ["Connection Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 109,
    section: "Connection",
    part: "Intimacy & Closeness",
    text: "I invest deeply in the people I'm intimate with",
    dimensions: ["Attachment Style", "Connection Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 110,
    section: "Connection",
    part: "Intimacy & Closeness",
    text: "I show love and care through physical affection",
    dimensions: ["Connection Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 111,
    section: "Connection",
    part: "Intimacy & Closeness",
    text: "I feel most alive when I'm deeply connected to someone",
    dimensions: ["Connection Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 112,
    section: "Connection",
    part: "Intimacy & Closeness",
    text: "Being truly known by someone is the greatest intimacy",
    dimensions: ["Connection Style"],
    type: "scale",
    reverse: false
  },
  {
    id: 113,
    section: "Connection",
    part: "Intimacy & Closeness",
    text: "I crave closeness as much as passion",
    dimensions: ["Connection Style"],
    type: "scale",
    reverse: false
  },

  // ============================================================================
  // SECTION E: SELF-PLEASURE & SEX DRIVE (Q114-120)
  // ============================================================================
  {
    id: 114,
    section: "Self-Pleasure",
    part: "Sex Drive",
    text: "I masturbate regularly",
    dimensions: ["Sex Drive"],
    type: "scale",
    reverse: false
  },
  {
    id: 115,
    section: "Self-Pleasure",
    part: "Sex Drive",
    text: "My sex drive feels strong and consistent",
    dimensions: ["Sex Drive"],
    type: "scale",
    reverse: false
  },
  {
    id: 116,
    section: "Self-Pleasure",
    part: "Sex Drive",
    text: "Sexual desire is an important part of my life",
    dimensions: ["Sex Drive"],
    type: "scale",
    reverse: false
  },
  {
    id: 117,
    section: "Self-Pleasure",
    part: "Sex Drive",
    text: "I can go long periods without sexual activity without distress",
    dimensions: ["Sex Drive"],
    type: "scale",
    reverse: false
  },
  {
    id: 118,
    section: "Self-Pleasure",
    part: "Sex Drive",
    text: "I prioritize time for sexual self-exploration",
    dimensions: ["Sex Drive"],
    type: "scale",
    reverse: false
  },
  {
    id: 119,
    section: "Self-Pleasure",
    part: "Sex Drive",
    text: "My desire for sex is mostly self-driven, not partner-dependent",
    dimensions: ["Sex Drive"],
    type: "scale",
    reverse: false
  },
  {
    id: 120,
    section: "Self-Pleasure",
    part: "Sex Drive",
    text: "I think about sex frequently throughout the week",
    dimensions: ["Sex Drive"],
    type: "scale",
    reverse: false
  }
];

/**
 * DIMENSION DEFINITIONS & SCORING
 * Each dimension maps to specific questions
 */
const dimensionDefinitions = {
  "Kink Dynamics": {
    lowLabel: "Minimal",
    midLabel: "Focused",
    highLabel: "Expansive",
    description: "Your comfort level with various BDSM practices"
  },
  "Kink Orientation": {
    lowLabel: "Vanilla-curious",
    midLabel: "Exploring",
    highLabel: "Integrated",
    description: "How integral kink is to your sexual identity"
  },
  "Voyeurism & Exhibitionism": {
    lowLabel: "Not very",
    midLabel: "Somewhat",
    highLabel: "Very",
    description: "Interest in watching/being watched scenarios"
  },
  "Fetish & Roleplay": {
    lowLabel: "Not very",
    midLabel: "Somewhat",
    highLabel: "Very",
    description: "Interest in fetishes, costumes, and role-playing"
  },
  "Desire Style": {
    lowLabel: "Responsive",
    midLabel: "Mixed",
    highLabel: "Spontaneous",
    description: "How your sexual desire tends to arise"
  },
  "Sex Drive": {
    lowLabel: "Mindful",
    midLabel: "Moderate",
    highLabel: "Elevated",
    description: "Overall frequency and strength of sexual desire"
  },
  "Authenticity in Sex": {
    lowLabel: "Developing",
    midLabel: "Growing",
    highLabel: "Liberated",
    description: "How authentic and free you feel sexually"
  },
  "Boundary Clarity": {
    lowLabel: "Fluid",
    midLabel: "Aware",
    highLabel: "Defined",
    description: "How clearly you know and communicate your limits"
  },
  "Communication Style": {
    lowLabel: "Reserved",
    midLabel: "Growing",
    highLabel: "Open",
    description: "How openly you discuss sex and desires"
  },
  "Attachment Style": {
    lowLabel: "Anxious/Avoidant",
    midLabel: "Mixed",
    highLabel: "Secure",
    description: "How secure you feel in intimate relationships"
  },
  "Connection Style": {
    lowLabel: "Independent",
    midLabel: "Balanced",
    highLabel: "Deeply bonded",
    description: "How much you need emotional intimacy"
  },
  "Relationship Structure": {
    lowLabel: "Open/Fluid",
    midLabel: "Flexible",
    highLabel: "Committed/Exclusive",
    description: "Your preference for relationship commitment and structure"
  }
};

/**
 * MAP QUESTIONS TO DIMENSIONS
 * Returns all questions that contribute to each dimension
 */
const questionsByDimension = {
  "Kink Dynamics": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  "Kink Orientation": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18],
  "Voyeurism & Exhibitionism": [13, 14, 15, 16, 17],
  "Fetish & Roleplay": [18, 19, 20, 21, 22, 23, 24],
  "Desire Style": [25, 26, 27, 28, 29, 30, 31, 33, 34, 35],
  "Sex Drive": [28, 29, 31, 32, 114, 115, 116, 117, 118, 119, 120],
  "Authenticity in Sex": [37, 38, 40, 41, 42, 43, 44, 45, 46, 47, 69, 70, 71, 72, 75],
  "Boundary Clarity": [48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 77],
  "Communication Style": [34, 46, 48, 49, 50, 51, 52, 58, 59, 62, 71, 73, 74, 76, 78, 79, 93, 94, 95, 96, 97, 99],
  "Attachment Style": [36, 39, 57, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 109],
  "Connection Style": [32, 36, 39, 72, 73, 80, 87, 89, 91, 92, 94, 98, 102, 107, 108, 109, 110, 111, 112, 113],
  "Relationship Structure": [100, 101, 102, 103, 104, 105, 106]
};

/**
 * QUIZ SPLITS
 * Free quiz: 20 questions (covers foundation, key desires, key boundaries)
 * Premium quiz: 100 questions (remaining full assessment)
 */
const freeQuizQuestions = fullQuestionBank.slice(0, 20);
const premiumQuizQuestions = fullQuestionBank.slice(20, 120);

/**
 * EXPORT FOR USE IN QUIZ & SCORING
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    fullQuestionBank,
    dimensionDefinitions,
    questionsByDimension,
    freeQuizQuestions,
    premiumQuizQuestions
  };
}

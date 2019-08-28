// const userID = "5d56bf7244bd3e002af3eb24"
const userID = "5d3698f42c75c055c4dadf1a"
const Game = require("./models/Game");

const seed1 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Which President was never elected to the office of either President or Vice President?",
      answers: [
        "Andrew Johnson",
        "Lyndon B. Johnson",
        "Harry Truman",
        "Gerald Ford"
      ]
    },

    {
      question: "This President held office for the least number of days",
      answers: [
        "William Mckinley",
        "William Henry Harrison",
        "Zachary Taylor",
        "Andrew Garfield"
      ]
    },

    {
      question: "Who is the only U.S. President to serve two terms nonconsecutively?",
      answers: [
        "James Madison",
        "William Howard Taft",
        "Grover Cleveland",
        "James K. Polk"
      ]
    },

    {
      question: "Who was President when Apollo 11 landed on the moon?",
      answers: [
        "John F. Kennedy",
        "Lyndon B. Johnson",
        "Richard Nixon",
        "Gerald Ford"
      ]
    },

    {
      question: "During this President's administration, the British burned down the White House during the War of 1812",
      answers: [
        "James Madison",
        "Thomas Jefferson",
        "James Monroe",
        "John Adams"
      ]
    },

    {
      question: "Which of the following President's face in NOT on Mount Rushmore?",
      answers: [
        "George Washington",
        "Thomas Jefferson",
        "Theodore Roosevelt",
        "Franklin Roosevelt"
      ]
    },

    {
      question: "Which President, during World War 2, served as Supreme Allied Commander?",
      answers: [
        "Dwight D. Eisenhower",
        "Harry Truman",
        "George Patton",
        "Franklin Roosevelt"
      ]
    },

    {
      question: "Who was the youngest person to serve as President?",
      answers: [
        "John F. Kennedy",
        "Barrack Obama",
        "Ronald Reagan",
        "Theodore Roosevelt"
      ]
    },
  ],
  correct: [
    "Gerald Ford",
    "William Henry Harrison",
    "Grover Cleveland",
    "Richard Nixon",
    "James Madison",
    "Franklin Roosevelt",
    "Dwight D. Eisenhower",
    "Theodore Roosevelt"
  ],
  title: "U.S. Presidents",
  category: "History",
  creatorID: userID
});

const seed2 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Which enchantment uses gained experience to repair items",
      answers: [
        "Looting",
        "Repairing",
        "Mending",
        "Unbreaking"
      ]
    },
    {
      question: "What are the two ingredients of TNT?",
      answers: [
        "Dynamite and Gravel",
        "Gunpowder and Sand",
        "Ghast Tears and Netherrack",
        "Ender Pearls and End Stone"
      ]
    },
    {
      question: "Which tier of tools has the most durablility?",
      answers: [
        "Gold",
        "Stone",
        "Iron",
        "Diamond"
      ]
    },
    {
      question: "What does a creeper turn into when it is struck by lightning?",
      answers: [
        "Charged Creeper",
        "Crazy Creeper",
        "Cannon Creeper",
        "Clawed Creeper"
      ]
    },
    {
      question: "Which mob can drop bones when it is killed?",
      answers: [
        "Enderman",
        "Zombie",
        "Skeleton",
        "Spider"
      ]
    },
    {
      question: "What is the size of a 'chunk' in blocks?",
      answers: [
        "8 X 8",
        "16 X 16",
        "32 X 32",
        "64 X 64"
      ]
    },
    {
      question: "What kind of stucture is the End Portal located at?",
      answers: [
        "Village",
        "Stronghold",
        "Abandoned Mineshaft",
        "Nether Fortress"
      ]
    },
    {
      question: "How many Eyes of Ender does it take to fill the End Portal frame?",
      answers: [
        "16",
        "8",
        "10",
        "12"
      ]
    },
    {
      question: "What biome does bamboo grow naturally in?",
      answers: [
        "Mountain",
        "Plains",
        "Jungle",
        "Desert"
      ]
    },
    {
      question: "Which resource is it not possible to set up a farming technique for?",
      answers: [
        "Gold",
        "Iron",
        "Emeralds",
        "Diamonds"
      ]
    }
  ],
  correct: ["Mending", "Gunpowder and Sand", "Diamond", "Charged Creeper", "Skeleton", "16 X 16", "Stronghold", "12", "Jungle", "Diamonds"],
  title: "Minecraft",
  category: "Other",
  creatorID: userID
});

const seed3 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed4 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed5 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed6 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed7 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed8 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed9 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed10 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed11 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

module.exports = [seed1, seed2];

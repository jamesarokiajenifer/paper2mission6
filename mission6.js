const MISSION6 = {
  "title": "Mission 6 - String Handling",
  "intro": {
    "notes": [
      "Cambridge string handling includes LENGTH, LCASE, UCASE and SUBSTRING.",
      "LENGTH(<identifier>) returns the number of characters as an INTEGER.",
      "LCASE(<identifier>) returns a STRING or CHAR in lower case.",
      "UCASE(<identifier>) returns a STRING or CHAR in upper case.",
      "SUBSTRING(<identifier>, <start>, <length>) returns part of a string.",
      "In Cambridge examples, position 1 is generally the first character of a string.",
      "STRING literals use double quotation marks; CHAR literals use single quotation marks.",
      "The exact characters inside a STRING or CHAR literal matter.",
      "The checker accepts harmless spacing and indentation differences but still checks the actual logic and string values."
    ],
    "examples": [
      "LENGTH(\"Happy Days\")",
      "LCASE('W')",
      "UCASE(\"Happy\")",
      "SUBSTRING(\"Happy Days\", 1, 5)",
      "Name ← \"Jenifer\"\nOUTPUT LENGTH(Name)",
      "Word ← \"computer\"\nOUTPUT UCASE(Word)"
    ],
    "mistakes": [
      "LENGTH \"Happy\"",
      "LOWER(Name)",
      "UPPER(Name)",
      "SUBSTRING(Name, 2)   // start and length are both required"
    ]
  },
  "weDo": [
    {
      "type": "mcq",
      "prompt": "Which routine returns the number of characters in a string?",
      "options": [
        "LENGTH",
        "UCASE",
        "LCASE",
        "SUBSTRING"
      ],
      "answer": 0,
      "hint": "It returns an INTEGER.",
      "explanation": "LENGTH returns the number of characters in the string."
    },
    {
      "type": "fill",
      "prompt": "What value is returned by LENGTH(\"Computer\")?",
      "answers": [
        "8"
      ],
      "hint": "Count every character.",
      "explanation": "Computer has 8 characters."
    },
    {
      "type": "fill",
      "prompt": "What value is returned by UCASE(\"paper\")?",
      "answers": [
        "PAPER"
      ],
      "caseSensitive": true,
      "hint": "Every alphabetic character becomes upper case.",
      "explanation": "UCASE converts the text to upper case, so the result is PAPER."
    },
    {
      "type": "fill",
      "prompt": "What value is returned by LCASE(\"HELLO\")?",
      "answers": [
        "hello"
      ],
      "caseSensitive": true,
      "hint": "Every alphabetic character becomes lower case.",
      "explanation": "LCASE converts the text to lower case, so the result is hello."
    },
    {
      "type": "fill",
      "prompt": "What value is returned by SUBSTRING(\"Singapore\", 1, 4)?",
      "answers": [
        "Sing"
      ],
      "caseSensitive": true,
      "hint": "Start at position 1 and take four characters.",
      "explanation": "The first four characters are Sing."
    },
    {
      "type": "fill",
      "prompt": "What value is returned by SUBSTRING(\"Computer\", 4, 3)?",
      "answers": [
        "put"
      ],
      "caseSensitive": true,
      "hint": "C=1, o=2, m=3, p=4.",
      "explanation": "Starting at position 4 and taking 3 characters gives put."
    },
    {
      "type": "code",
      "prompt": "Write one pseudocode statement that outputs the length of StudentName.",
      "models": [
        "OUTPUT LENGTH(StudentName)"
      ],
      "hint": "Put LENGTH(StudentName) after OUTPUT.",
      "explanation": "LENGTH(StudentName) returns an INTEGER that can be output."
    },
    {
      "type": "code",
      "prompt": "Write one assignment statement that stores the upper-case version of Word in UpperWord.",
      "models": [
        "UpperWord ← UCASE(Word)"
      ],
      "hint": "Use UCASE on the right-hand side.",
      "explanation": "UCASE(Word) returns the upper-case version."
    },
    {
      "type": "code",
      "prompt": "Write one assignment statement that stores the first 3 characters of Code in Prefix.",
      "models": [
        "Prefix ← SUBSTRING(Code, 1, 3)"
      ],
      "hint": "Use start position 1 and length 3.",
      "explanation": "SUBSTRING(Code, 1, 3) returns the first three characters."
    },
    {
      "type": "fill",
      "prompt": "What is output?",
      "code": "Text ← \"Cambridge\"\nOUTPUT UCASE(SUBSTRING(Text, 1, 3))",
      "answers": [
        "CAM"
      ],
      "caseSensitive": true,
      "hint": "Find the substring first, then apply UCASE.",
      "explanation": "SUBSTRING gives Cam and UCASE changes it to CAM."
    }
  ],
  "youDo": [
    {
      "type": "mcq",
      "prompt": "Which Cambridge routine converts text to lower case?",
      "options": [
        "LOWER",
        "LCASE",
        "LOWCASE",
        "LENGTH"
      ],
      "answer": 1,
      "explanation": "Cambridge pseudocode uses LCASE."
    },
    {
      "type": "mcq",
      "prompt": "Which Cambridge routine converts text to upper case?",
      "options": [
        "UPPER",
        "UCASE",
        "UPCASE",
        "CAPITAL"
      ],
      "answer": 1,
      "explanation": "Cambridge pseudocode uses UCASE."
    },
    {
      "type": "fill",
      "prompt": "What value is returned by LENGTH(\"Paper 2\")?",
      "answers": [
        "7"
      ],
      "explanation": "The space is also a character, so Paper 2 has 7 characters."
    },
    {
      "type": "fill",
      "prompt": "What value is returned by LENGTH(\"\")?",
      "answers": [
        "0"
      ],
      "explanation": "The empty string contains zero characters."
    },
    {
      "type": "fill",
      "prompt": "What value is returned by UCASE(\"Exam\")?",
      "answers": [
        "EXAM"
      ],
      "caseSensitive": true,
      "explanation": "UCASE changes all alphabetic characters to upper case."
    },
    {
      "type": "fill",
      "prompt": "What value is returned by LCASE(\"IGCSE\")?",
      "answers": [
        "igcse"
      ],
      "caseSensitive": true,
      "explanation": "LCASE changes all alphabetic characters to lower case."
    },
    {
      "type": "fill",
      "prompt": "What value is returned by SUBSTRING(\"Algorithm\", 1, 5)?",
      "answers": [
        "Algor"
      ],
      "caseSensitive": true,
      "explanation": "The first five characters are Algor."
    },
    {
      "type": "fill",
      "prompt": "What value is returned by SUBSTRING(\"Algorithm\", 6, 4)?",
      "answers": [
        "ithm"
      ],
      "caseSensitive": true,
      "explanation": "Starting at position 6 and taking four characters gives ithm."
    },
    {
      "type": "code",
      "prompt": "Write one pseudocode statement to output StudentName in upper case.",
      "models": [
        "OUTPUT UCASE(StudentName)"
      ],
      "explanation": "UCASE(StudentName) returns the upper-case form."
    },
    {
      "type": "code",
      "prompt": "Write one pseudocode statement to output City in lower case.",
      "models": [
        "OUTPUT LCASE(City)"
      ],
      "explanation": "LCASE(City) returns the lower-case form."
    },
    {
      "type": "code",
      "prompt": "Write one assignment statement that stores the length of Password in PasswordLength.",
      "models": [
        "PasswordLength ← LENGTH(Password)"
      ],
      "explanation": "LENGTH returns an INTEGER."
    },
    {
      "type": "code",
      "prompt": "Write one assignment statement that stores characters 2 to 5 of Word in Part. Start at position 2 and take 4 characters.",
      "models": [
        "Part ← SUBSTRING(Word, 2, 4)"
      ],
      "explanation": "The substring contains positions 2, 3, 4 and 5."
    },
    {
      "type": "fill",
      "prompt": "What is output?",
      "code": "Name ← \"Alice\"\nOUTPUT LENGTH(Name)",
      "answers": [
        "5"
      ],
      "explanation": "Alice has five characters."
    },
    {
      "type": "fill",
      "prompt": "What is output?",
      "code": "Word ← \"Science\"\nOUTPUT SUBSTRING(Word, 2, 3)",
      "answers": [
        "cie"
      ],
      "caseSensitive": true,
      "explanation": "Starting at position 2 and taking 3 characters gives cie."
    },
    {
      "type": "fill",
      "prompt": "What is output?",
      "code": "Text ← \"Computer\"\nOUTPUT LCASE(SUBSTRING(Text, 1, 4))",
      "answers": [
        "comp"
      ],
      "caseSensitive": true,
      "explanation": "SUBSTRING gives Comp and LCASE changes it to comp."
    },
    {
      "type": "fill",
      "prompt": "What is output?",
      "code": "Text ← \"computer\"\nOUTPUT UCASE(SUBSTRING(Text, 5, 4))",
      "answers": [
        "UTER"
      ],
      "caseSensitive": true,
      "explanation": "Positions 5 to 8 give uter, then UCASE returns UTER."
    },
    {
      "type": "mcq",
      "prompt": "Which expression returns the first character of StudentName?",
      "options": [
        "SUBSTRING(StudentName, 1, 1)",
        "SUBSTRING(StudentName, 0, 1)",
        "LENGTH(StudentName, 1)",
        "UCASE(StudentName, 1)"
      ],
      "answer": 0,
      "explanation": "Using Cambridge general convention, position 1 is the first character."
    },
    {
      "type": "code",
      "prompt": "Write an IF statement that outputs \"Long code\" when Code contains more than 8 characters. No ELSE is required.",
      "models": [
        "IF LENGTH(Code) > 8\n  THEN\n    OUTPUT \"Long code\"\nENDIF",
        "IF LENGTH(Code) > 8 THEN\n    OUTPUT \"Long code\"\nENDIF"
      ],
      "explanation": "LENGTH(Code) is compared with 8."
    },
    {
      "type": "code",
      "prompt": "Write an IF statement that outputs \"Yes selected\" when Answer is \"YES\", regardless of whether the user typed upper or lower case. No ELSE is required.",
      "models": [
        "IF UCASE(Answer) = \"YES\"\n  THEN\n    OUTPUT \"Yes selected\"\nENDIF",
        "IF UCASE(Answer) = \"YES\" THEN\n    OUTPUT \"Yes selected\"\nENDIF"
      ],
      "explanation": "UCASE makes the comparison independent of the user input letter case."
    },
    {
      "type": "code",
      "prompt": "Write an algorithm fragment that inputs UserName and outputs the first 3 characters in upper case.",
      "models": [
        "INPUT UserName\nOUTPUT UCASE(SUBSTRING(UserName, 1, 3))"
      ],
      "explanation": "The algorithm inputs the name, extracts the first 3 characters and converts them to upper case."
    }
  ]
};
window.MISSION6 = MISSION6;

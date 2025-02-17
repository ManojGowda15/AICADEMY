const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateTopicsAIModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Learn Python::As you are coaching teacher\n- User want to learn about the topic\n- Generate 5-7 Course title for study (Long and Detailed)\n- Make sure it is related to description\n- Output will be ARRAY of string in JSON FORMAT only\n- Do not add any plain text in output,",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '{\n"course_titles" :[\n  "Python Fundamentals: A Comprehensive Introduction to Programming Concepts and Syntax",\n  "Data Structures and Algorithms in Python: Mastering Efficient Data Management and Problem-Solving Techniques",\n  "Object-Oriented Programming with Python: Building Robust and Maintainable Applications",\n  "Web Development with Python and Frameworks (Django/Flask): Creating Dynamic Websites and APIs",\n  "Data Science and Machine Learning with Python: Analyzing Data, Building Models, and Making Predictions",\n  "Python for Automation and Scripting: Automating Tasks and Improving Efficiency",\n  "Advanced Python: Concurrency, Multiprocessing, and Optimization Techniques"\n]\n}',
        },
      ],
    },
  ],
});

export const GenerateCourseAIModel = model.startChat({
  generationConfig,
  history: [],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());

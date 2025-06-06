// data/dummyCourse.js
const jsCourse = [
  {
    courseId: "intro-to-js",
    pageNumber: 1,
    title: "Introduction to DSA (Data Structures & Algorithms)",
    subtitle: "Why Learn DSA?",
    content: `Data Structures and Algorithms (DSA) form the backbone of efficient programming. Whether you're solving a real-world problem or preparing for coding interviews, mastering DSA helps you:

- Write optimized code
- Think logically and structurally
- Crack tech interviews`,
    imageUrl: "https://d3trj3zqmkebtg.cloudfront.net/pics/121/121801_big.jpg",
    bottomContent: "DSA stands for Data Structures and Algorithms. It is a foundational concept in computer science used to store, organize, and manipulate data efficiently.",
  },
  {
    courseId: "intro-to-js",
    pageNumber: 2,
    title: "What is a Data Structure?",
    content: `A Data Structure is a way to store, organize, and manage data so it can be accessed and modified efficiently.

Think of it like organizing files in a cabinet — you can find them faster if they’re arranged smartly.`,
    mcqs: [
      {
        question: "Which of the following is NOT a data structure?",
        options: ["Stack", "Array", "Sorting", "Queue"],
        correctAnswer: "Sorting",
        explanation: "Sorting is an algorithm, not a data structure."
      }
    ]
  },
  {
    courseId: "intro-to-js",
    pageNumber: 3,
    title: "What is an Algorithm?",
    content: `An Algorithm is a step-by-step set of instructions to solve a specific problem.

For example, a recipe for making a cake is an algorithm!`,
    mcqs: [
      {
        question: "Which of these best describes an algorithm in everyday life?",
        options: ["A photo album", "A cooking recipe", "A TV remote", "A bookshelf"],
        correctAnswer: "A cooking recipe",
        explanation: "It provides clear steps to produce a result — like an algorithm."
      }
    ]
  },
  {
    courseId: "intro-to-js",
    pageNumber: 4,
    title: "Time and Space Complexity",
    content: `Every algorithm has a cost:

- **Time complexity**: How long it takes to run  
- **Space complexity**: How much memory it uses

We use Big O notation to express the worst-case performance.  
Example: Searching an unsorted array is O(n) time.`,
    mcqs: [
      {
        question: "Match the algorithm with its typical time complexity (worst case):",
        options: [
          "Linear Search → O(n)", "Binary Search → O(log n)", "Bubble Sort → O(n²)", "Binary Search → O(n log n)" ],
        correctAnswer:"Linear Search → O(n)",
        explanation: "Each algorithm has a standard time complexity — O(n log n) is not for Binary Search but for efficient sorts like Merge Sort."
      }
    ]
  },
  {
    courseId: "intro-to-js",
    pageNumber: 5,
    title: "DSA Summary",
    content: `📊 Summary Table

- **Data Structure**: A way to organize data  
- **Algorithm**: Steps to solve a problem  
- **Time Complexity**: How fast an algorithm runs  
- **Space Complexity**: How much memory it uses`,
    mcqs: [
      {
        question: "True or False: Arrays and Linked Lists are both linear data structures.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "They are both linear because they store data in sequence."
      },
      {
        question: "True or False: An algorithm always gives the correct answer.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Only correct/valid algorithms give the right answer."
      },
      {
        question: "True or False: Big O measures how fast a program runs on your computer.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Big O measures performance in terms of input growth, not actual runtime."
      },
      {
        question: "True or False: Stack follows FIFO order.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Stack is LIFO — Last In, First Out."
      }
    ]
  }
];

module.exports = jsCourse;

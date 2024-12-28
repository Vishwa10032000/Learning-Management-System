import card1 from "../../assets/asset.svg";
import card2 from "../../assets/product.svg";
import card3 from "../../assets/project.svg";
import card4 from "../../assets/purchase.svg";


const questions = [
    {
        id: 1,
        question: "What is the company's leave policy?",
        options: ["10 days", "15 days", "20 days", "25 days"],
        correctAnswer: ["15 days"],
        questionType: "single",
        category: "Policies",
        questionShowTime: 0, // in seconds
        type:"text",
        
    },
    {
        id: 2,
        question: "What is the company's dress code policy?",
        options: ["Formal", "Casual", "Business Casual", "Any"],
        correctAnswer: ["Formal", "Casual","Business Casual"],
        questionType: "multiple",
        category: "Policies",
        questionShowTime: 0,
        type:"image",
        images:[card1, card2, card3, card4]
    },
    {
        id: 3,
        question: "What is the orientation process duration?",
        options: ["1 week", "2 weeks", "3 weeks", "4 weeks"],
        correctAnswer: ["2 weeks"],
        questionType: "single",
        category: "Orientations",
        questionShowTime: 0,
        type:"text",
    },
    {
        id: 4,
        question: "Which department handles new employee orientation?",
        options: ["HR", "Finance", "Operations", "IT"],
        correctAnswer: ["HR"],
        questionType: "single",
        category: "Orientations",
        questionShowTime: 0,
        type:"text",
    },
    {
        id: 5,
        question: "What is the primary goal of training?",
        options: ["Skill enhancement", "Time pass", "Compliance", "Documentation"],
        correctAnswer: ["Skill enhancement"],
        questionType: "single",
        category: "Trainings",
        questionShowTime: 4,
        type:"text",
    },
    {
        id: 6,
        question: "How often are mandatory training sessions conducted?",
        options: ["Quarterly", "Bi-annually", "Annually", "Monthly"],
        correctAnswer: ["Annually"],
        questionType: "single",
        category: "Trainings",
        questionShowTime: 8,
        type:"text",
    },
    {
        id: 7,
        question: "Select the prime numbers.",
        options: ["2", "3", "4", "5"],
        correctAnswer: ["2", "3", "5"],
        questionType: "multiple",
        category: "Trainings",
        questionShowTime: 8,
        type:"text",
    },
    {
        id: 8,
        question: "Arrange the steps of the Software Development Workflow in the correct order.",
        options: ["Design Pattern",
            "Client confirmation",
            "Development confirmation",
            "Requirement Documentation",],
        correctAnswer: ["Requirement Documentation",
            "Client confirmation",
            "Design Pattern",
            "Development confirmation",],
        questionType: "drag&drop",
        category: "Policies",
        questionShowTime: 0,
        type:"text",

    }
]

export default questions;
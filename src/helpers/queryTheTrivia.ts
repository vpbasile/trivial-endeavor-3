import { category, categoryTag } from "../gameReducer";
import { shuffleArray } from "./routines";

type questionFromAPI = {
    correctAnswer: string;
    incorrectAnswers: string[];
    category: string;
    question: { text: string };
}
export type questionInternal = {
    questionText: string | null, choices: string[],
    correctAnswer: string | null,
    correctIndex: number,
    categoryTag: categoryTag
}

export const nullCategory: category = { key: "00", queryTag: "null", title: "Null" }

// This should probably be done as a map or a map-like tuple
export const categoryList: category[] = [
    { key: "08", queryTag: "science", title: "Science" },
    { key: "02", queryTag: "geography", title: "Geography" },
    { key: "04", queryTag: "history", title: "History" },
    { key: "03", queryTag: "general_knowledge", title: "General Knowledge" },
    { key: "01", queryTag: "food_and_drink", title: "Food & Drink" },
    { key: "05", queryTag: "sport_and_leisure", title: "Sport & Leisure" },
    { key: "07", queryTag: "music", title: "Music" },
    { key: "06", queryTag: "film_and_tv", title: "Film & TV" },
]


export async function getQuestion(categoryID: string, devMode: boolean): Promise<questionInternal> {
    // ---------------------------------------------
    // <><> This stuff is all specific to this particualr API
    // ---------------------------------------------
    try {
        // ---------------------------------------------
        // <><> Send the query
        // ---------------------------------------------
        const queryURL = `https://the-trivia-api.com/v2/questions?limit=1&categories=${categoryID}&difficulties=medium%2Chard`;
        const response = await fetch(queryURL);
        const receivedQuestion: questionFromAPI[] = await response.json();
        // }

        // ---------------------------------------------
        // <><> Parse and return the result
        // ---------------------------------------------
        // The API returns an array of question objects.  Currently, I'm requesting these one at a time so I always use the first question
        return parseReceivedQuestion(receivedQuestion[0], devMode);
    } catch (error) {
        console.error("Error encountered", (error as Error).message);
        throw error; // It's generally a good practice to rethrow errors in async functions.
    }
}

function parseReceivedQuestion(questionData: questionFromAPI, devMode: boolean): questionInternal {

    // console.log(`Parsing question`);
    // <> Parse the received question into the game's data structure
    // Make sure we don't have more than 4 incorrect answers
    const incorrectAnswers: string[] = questionData.incorrectAnswers ? questionData.incorrectAnswers.slice(0, 4) : [];
    const choicesCount = incorrectAnswers.length + 1
    shuffleArray(incorrectAnswers);
    const answerIndex = Math.floor(Math.random() * (choicesCount));
    const choices: string[] = ["Incorrect Choice", "Incorrect Choice", "Incorrect Choice", "Incorrect Choice"]
    if (!devMode) {
        // choices[answerIndex] = questionData.correctAnswer;
        for (let i = 0; i < choicesCount; i++) {
            if (i === answerIndex) { choices[i] = questionData.correctAnswer; }
            else {
                const x = incorrectAnswers.pop()
                if (x !== undefined) { choices[i] = x; }
            }
        }
    } else { choices[answerIndex] = "Correct Choice" }

    return {
        questionText: questionData.question.text,
        choices: choices,
        correctAnswer: questionData.correctAnswer,
        correctIndex: answerIndex,
        categoryTag: questionData.category
    }
}
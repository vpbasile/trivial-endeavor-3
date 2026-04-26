
import { category } from "../gameReducer";
import { questionInternal } from "./queryTheTrivia";
import { shuffleArray } from "./routines";

type questionFromAPI = {
    correctAnswer: string;
    incorrectAnswers: string[];
    category: string;
    question: string;
}

// This should probably be done as a map or a map-like tuple
export const categoryList: category[] = [
    // <> FIXME <> These keys are probably no longer necessary
    { key: "00", queryTag: "none", title: "x" },
    { key: "08", queryTag: "science", title: "Science" },
    { key: "02", queryTag: "geography", title: "Geography" },
    { key: "04", queryTag: "history", title: "History" },
    { key: "03", queryTag: "general_knowledge", title: "General Knowledge" },
    { key: "01", queryTag: "food_and_drink", title: "Food & Drink" },
    { key: "05", queryTag: "sport_and_leisure", title: "Sport & Leisure" },
    { key: "07", queryTag: "music", title: "Music" },
    { key: "06", queryTag: "movies", title: "Film & TV" },
]

export async function getQuestion(categoryID: string): Promise<questionInternal> {
    // ---------------------------------------------
    // <><> This stuff is all specific to this particualr API
    // ---------------------------------------------
    try {
        // ---------------------------------------------
        // <><> Send the query
        // ---------------------------------------------
        const queryURL = `https://the-trivia-api.com/api/questions?categories=${categoryID}&limit=1`;
        const response = await fetch(queryURL);
        const receivedQuestion: questionFromAPI[] = await response.json();
        // }

        // ---------------------------------------------
        // <><> Parse and return the result
        // ---------------------------------------------
        // The API returns an array of question objects.  Currently, I'm requesting these one at a time so I always use the first question
        return parseReceivedQuestion(receivedQuestion[0]);
    } catch (error) {
        console.error("Error encountered", (error as Error).message);
        throw error; // It's generally a good practice to rethrow errors in async functions.
    }
}

function parseReceivedQuestion(questionData: questionFromAPI): questionInternal {

    // console.log(`Parsing question`);
    // <> Parse the received question into the game's data structure
    // Make sure we don't have more than 4 incorrect answers
    const incorrectAnswers: string[] = questionData.incorrectAnswers ? questionData.incorrectAnswers.slice(0, 4) : [];
    const choicesCount = incorrectAnswers.length + 1
    shuffleArray(incorrectAnswers);
    const answerIndex = Math.floor(Math.random() * (choicesCount));
    const choices: string[] = ["", "", "", ""]
    for (let i = 0; i < choicesCount; i++) {
        if (i === answerIndex) { choices[i] = questionData.correctAnswer; }
        else {
            const x = incorrectAnswers.pop()
            if (x !== undefined) { choices[i] = x; }
        }
    }

    const categoryName: string = questionData.category;
    // This is where we get the category object from the list
    const category: category[] = categoryList.filter((categoryTemp) => {
        return categoryTemp.title === categoryName;
    });

    return {
        questionText: questionData.question,
        choices: choices,
        correctAnswer: questionData.correctAnswer,
        correctIndex: answerIndex,
        categoryTag: category[0].queryTag
    }
}
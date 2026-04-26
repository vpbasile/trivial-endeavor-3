import { Dispatch } from "react";
import { GameAction, category, nullQuestion } from "../gameReducer";
import { getQuestion } from "../helpers/queryTheTrivia";
import { SameButton } from "../helpers/SameButton";
/**
 *Requests a new question from the API and updates the game state with that question
 *
 * @param {category} category - The category of the question to fetch
 * @param {boolean} devMode - Whether to use the API or a placeholder question
 * @param {Dispatch<GameAction>} dispatch - The dispatch function to update the game state
 * @param {number} playerIndex - The index of the player requesting the question
 */
export const newQuestion = async (category: category, devMode: boolean, dispatch: Dispatch<GameAction>, playerIndex: number) => {
    // Update the UI to indicate that we're fetching a new question
    dispatch({ type: "phase_2_get_question" })
    // Clear the question while we wait for the API to respond

    if (devMode) {
        dispatch({
            type: "phase_3_answer_question", payload: { question: nullQuestion(category.queryTag), playerIndex }
        })
    }
    else {
        try {
            // Use await within the async function
            const question = await getQuestion(category.queryTag, devMode);
            // Update the game state with the new question
            dispatch({ type: "phase_3_answer_question", payload: { question, playerIndex } });
        } catch (error) {
            console.error("Error fetching question:", error);
            dispatch({
                type: "phase_2_question_error",
                payload: <SameButton text="Could not load a question. Please try that category again." color="incorrect" isDisabled />
            });
        }
    }
}
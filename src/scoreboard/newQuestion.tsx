import { Dispatch } from "react";
import { GameAction, category, nullQuestion, questionCache } from "../gameReducer";
import { getQuestion } from "../helpers/queryTheTrivia";
import { SameButton } from "../helpers/SameButton";
/**
 * Requests a question for the given category. Serves from the question cache when
 * available; falls back to the API only when the cache for that category is empty.
 *
 * @param {category} category - The category of the question to fetch
 * @param {boolean} devMode - Whether to use the API or a placeholder question
 * @param {Dispatch<GameAction>} dispatch - The dispatch function to update the game state
 * @param {number} playerIndex - The index of the player requesting the question
 * @param {questionCache} cache - The current question cache
 */
export const newQuestion = async (category: category, devMode: boolean, dispatch: Dispatch<GameAction>, playerIndex: number, cache: questionCache) => {
    // Update the UI to indicate that we're fetching a new question
    dispatch({ type: "phase_2_get_question" })

    if (devMode) {
        dispatch({
            type: "phase_3_answer_question", payload: { question: nullQuestion(category.queryTag), playerIndex }
        })
    }
    else {
        const cachedQuestions = cache[category.queryTag];
        if (cachedQuestions && cachedQuestions.length > 0) {
            // Serve a question from the cache and remove it so it isn't reused
            const [question, ...remaining] = cachedQuestions;
            dispatch({ type: "SET_question_cache", payload: { ...cache, [category.queryTag]: remaining } });
            dispatch({ type: "phase_3_answer_question", payload: { question, playerIndex } });
        } else {
            // Cache is empty for this category – fetch from the API
            try {
                const question = await getQuestion(category.queryTag, devMode);
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
}
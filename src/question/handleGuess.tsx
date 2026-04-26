import { Dispatch } from "react";
import { GameAction, categoryTag, player } from "../gameReducer";
import { questionInternal } from "../helpers/queryTheTrivia";
import { SameButton } from "../helpers/SameButton";

/**
 * Handles the player's guess.
 * @param guess - The index of the guessed answer.
 * @param currentPlayerIndex - The index of the current player.
 * @param category - The category of the question.
 * @param neededToWin - The number of points needed to win the game.
 */

export function handleGuess(question: questionInternal, guess: number, player: player, category: categoryTag, neededToWin: number, dispatch: Dispatch<GameAction>): void {
    const correctIndex = question.correctIndex;
    console.log('--handleGuess--')
    // If the player guessed correctly, give them a token for the category, display a message,
    // and if they have enough tokens to win, set their place in the game
    // Then move on to the next player
    console.log(`${player.name} guessed choice ${guess}: ${question.choices[guess]}.`);
    let score = player.correctCategories.length
    if (guess === correctIndex) {
        // If the player guessed correctly, 
        // Give them a token for the category
        dispatch({ type: "give_player_token", payload: { playerIndex: player.index, categoryTag: category } });
        score += 1;
        // If the player has enough points to win, give them a medal and move on to the next player
        if (score >= neededToWin) {
            dispatch({ type: "give_player_medal", payload: { playerIndex: player.index } });
        } else {
            const message = `That is correct!  ${player.name} now has ${score} points.`;
            console.log(message);
            dispatch({ type: "phase_4_feedback", payload: { guess, message: <SameButton text={message} color="correct" isDisabled /> } });
        }
    } else {
        // If the player guessed incorrectly, display a message and move on to the next player
        const message = `That is incorrect.  The correct answer was ${question.choices[correctIndex]}.`;
        console.log(message, `${correctIndex}: ${question.choices[correctIndex]}`)
        dispatch({ type: "phase_4_feedback", payload: { guess, message: <SameButton text={message} color="incorrect" isDisabled /> } });
    }
    // If we're not in devmode, then wait 5 seconds before moving on to the next player
    // if (!devMode) {
    //     sleep(5000).then(() => {
    //         dispatch({ type: "phase_5_next_player" });
    //     }); // Wait 5 seconds before moving on to the next player
    // }
}
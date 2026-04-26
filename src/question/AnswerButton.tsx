import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import { guessType, propsType } from "../gameReducer";
import { questionInternal } from "../helpers/queryTheTrivia";
import { handleGuess } from "./handleGuess";

/**
 * Props for the AnswerButton component.
 */
interface AnswerButtonProps extends propsType {
	key: number;
	index: number;
	question: questionInternal; // The question object
	guessEntered: guessType; // The guess entered by the player
	text: string; // The text displayed on the button
	isDisabled: boolean; // Whether the button is disabled
	icon?: JSX.Element; // The icon displayed on the button
	colorOverride?: string; // The color of the button
}

/**
 * AnswerButton component.
 * Renders a button for answering a question.
 */
export default function AnswerButton(props: AnswerButtonProps) {
	const { gameState, dispatch, question, icon, colorOverride, index, text, isDisabled } = props;
	const { currentPlayerIndex, neededToWin } = gameState;
	// If the colorOverride prop is not undefined, use it. Otherwise, use gray
	const color = colorOverride ? colorOverride : 'gray';
	const fg = useColorModeValue('light', 'dark')
	const bg = useColorModeValue('dark', 'light')

	// If the question is null, the player has not selected a question yet
	if (question === undefined) { return null; }

	const buttonID = `choice-${index}`;

	return (
		<Box py={2}>
			<Button
				bg={color + '.' + bg}
				color={color + '.' + fg}
				leftIcon={icon}
				rightIcon={icon}
				id={buttonID}
				whiteSpace={'normal'}
				w={'100%'}
				py={2}
				// isDisabled={isDisabled}				
				variant={isDisabled ? 'display-only' : 'solid'}
				onClick={() => handleGuess(question, index, gameState.playerList[currentPlayerIndex], question.categoryTag, neededToWin, dispatch)}
			>
				{text}
			</Button>
		</Box>
	);
}

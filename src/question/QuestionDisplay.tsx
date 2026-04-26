import { CheckCircleIcon, CloseIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { propsType } from "../gameReducer";
import { newBreaks } from "../helpers/style";
import AnswerButton from "./AnswerButton";

export default function QuestionDisplay(props: propsType): JSX.Element | null {
	// Cache the props
	const { gameState, dispatch } = props;

	// Destructure gameState
	const { currentQuestion, guessEntered } = gameState;
	const { choices, categoryTag } = currentQuestion

	// Figure out the coloration for the question box
	const bg = useColorModeValue('light', 'dark')
	const bgColor = categoryTag + '.' + bg;

	// Make answer buttons
	let buttonIndex = -1;

	function answerButtons() {
		switch (gameState.currentPhase) {
			// If we're in the answer phase, return the four gray buttons
			case ("Answer"): return choices.map((choice) => {
				buttonIndex++;
				return (
					<AnswerButton
						key={buttonIndex}
						index={buttonIndex}
						text={choice}
						isDisabled={guessEntered !== null}
						question={currentQuestion}
						guessEntered={guessEntered}
						icon={<QuestionOutlineIcon />}
						gameState={gameState}
						dispatch={dispatch} />
				);
			});
			// If we're in the feedback phase, return the four buttons with the correct answer green and the incorrect answer red
			case ("Feedback"): return choices.map((choice) => {
				buttonIndex++;
				let colorOverride
				// Color the correct answer green
				if (buttonIndex === currentQuestion.correctIndex) {
					colorOverride = 'correct';
				}
				// If the guess was incorrect, color the incorrect answer red
				else if (buttonIndex === guessEntered) {
					colorOverride = 'incorrect';
				}
				// Otherwise, make the button gray'
				else {
					colorOverride = 'gray';
				}
				return (
					<AnswerButton
						key={buttonIndex}
						index={buttonIndex}
						text={choice}
						isDisabled={true}
						question={currentQuestion}
						guessEntered={guessEntered}
						icon={choice === currentQuestion.correctAnswer ? <CheckCircleIcon /> : <CloseIcon />}
						colorOverride={colorOverride}
						gameState={gameState}
						dispatch={dispatch} />
				);
			});
		}
	}
	return (
		<Box id="questionWrapper" border={'8px'} borderColor={bgColor} borderRadius={'lg'}>
			<Heading id="display-question"
				bg={bgColor}
				// color={fgColor} 
				p={8} maxW={newBreaks}>{currentQuestion.questionText}</Heading>
			<Box id="buttonWrapper" p={2}>{answerButtons()}</Box>
			{/* <Box id='colorBit' bg={bgColor} p={2} borderRadius={'lg'}></Box> */}
		</Box>
	);
}
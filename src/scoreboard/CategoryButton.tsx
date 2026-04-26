import { CheckCircleIcon } from "@chakra-ui/icons";
import { Button, useColorModeValue } from "@chakra-ui/react";
import { category, player, propsType } from "../gameReducer";
import { ordinal, winnerColor } from "../helpers/routines";
import { newQuestion } from "./newQuestion";

interface categoryButtonProps extends propsType { category: category, player: player, isDisabled: boolean }

export default function CategoryButton(props: categoryButtonProps) {
	const { gameState, dispatch, isDisabled } = props;
	const player = props.player;
	const devMode = gameState.devMode;

	// Props unique to this component
	const category = props.category;
	const buttonKey = player.name + '_' + category.queryTag;

	const fg = useColorModeValue('light', 'dark')
	const bg = useColorModeValue('dark', 'light')

	const handleClick = () => {
		console.log(`${player.name} requests a ${category.title} question`);
		newQuestion(category, devMode, dispatch, player.index);
	};

	// If the player is a winner, the button should be gold and disabled.
	const hasWon = player.wonPlace;
	if (hasWon) {
		return <Button key={buttonKey} isDisabled={true}
			bg={winnerColor(hasWon) + '.' + bg}
			color={winnerColor(hasWon) + '.' + fg}
		>{ordinal(hasWon)} place!</Button>;
	} else {
		if (player.correctCategories.includes(category.queryTag)) {

			// If the player has already completed this category, show the category as completed and disabled.
			return <Button
				className="completedCategory"
				key={buttonKey}
				leftIcon={<CheckCircleIcon />}
				isDisabled={true}
				bg={category.queryTag + '.' + bg}
				color={category.queryTag + '.' + fg}

				onClick={handleClick}>
			</Button>
		} else {
			// If the player has not completed this category, show the category as not completed.
			// If the player is not the current player, show the category as disabled.
			return <Button
				key={buttonKey}
				isDisabled={isDisabled}
				bg={category.queryTag + '.' + bg}
				color={category.queryTag + '.' + fg}
				onClick={handleClick}
			>
				{category.title}
			</Button>
		}
	}
}
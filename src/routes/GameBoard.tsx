/**
 * Renders the game board component.
 * 
 * @returns The game board component.
 */
import { ArrowForwardIcon, QuestionIcon } from "@chakra-ui/icons";
import { Box, Collapse, VStack } from "@chakra-ui/react";
import { useReducer } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import DataDisplay from "../dev/DataDisplay";
import gameReducer, { gameStateType, nullQuestion } from "../gameReducer";
import ColorModeButton from "../helpers/ColorModeButton";
import DevModeButton from "../helpers/DevModeButton";
import { SameButton } from "../helpers/SameButton";
import AppRow from "../helpers/appRow";
import { categoryList } from "../helpers/queryTheTrivia";
import { newBreaks } from "../helpers/style";
import QuestionDisplay from "../question/QuestionDisplay";
import PlayerColumn from "../scoreboard/PlayerColumn";

export default function GameBoard() {

    // Access the parameters from the URL
    const { devModeEntered, playerNames } = useParams();
    let playerNamesArray: string[] = [];
    if (playerNames) playerNamesArray = playerNames.split("-");
    const playerListInit = playerNamesArray.map((name, index) => ({ index, key: index, name, correctCategories: [], wonPlace: 0 }))

    const firstPlayerName = playerListInit[0].name;
    const initialGameState: gameStateType = {
        currentPhase: "Select",
        currentPlayerIndex: 0,
        playerIndicator: firstPlayerName,
        displayMessage: <SameButton text={`Select a question, ${firstPlayerName}!`} isDisabled />,
        currentQuestion: nullQuestion(),
        vyingForPlace: 1,
        winners: [],
        guessEntered: null,
        playerList: playerListInit,
        askedQuestions: [""],
        // If devMode is 1, then the game is in developer mode.
        devMode: (devModeEntered === "1"),
        neededToWin: (devModeEntered === "1") ? 2 : categoryList.length,
    }

    const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
    const { currentPhase, playerList, currentPlayerIndex, playerIndicator, displayMessage } = gameState;

    let icon = undefined;
    if (currentPhase === "Feedback") {
        icon = <ArrowForwardIcon />;
    } else if (currentPhase === "Answer" || currentPhase === "Question") {
        icon = <QuestionIcon />;
    }

    return (<ErrorBoundary fallback={<Box>Error in component AppRow</Box>}>
        <VStack>
            <VStack id="gameflowDisplay" w={'100%'} p={3}>
                {displayMessage}
                {currentPhase === "Feedback" && (
                    <SameButton id="turnTracker"
                        text={playerIndicator}
                        isDisabled={false}
                        leftIcon={icon}
                        rightIcon={icon}
                        onClick={() => dispatch({ type: 'phase_5_next_player' })}
                    />
                )}
            </VStack>
            <VStack id="gameBoardContainer" maxWidth={newBreaks}>
                <Collapse in={currentPhase === "Answer" || currentPhase === "Feedback"} unmountOnExit animateOpacity>
                    <AppRow id="question-row">
                        <QuestionDisplay key={"currentQuestion"} gameState={gameState} dispatch={dispatch} />
                    </AppRow>
                </Collapse>
                <Collapse in={currentPhase === "Select"} unmountOnExit animateOpacity>
                    <Box id="scoreboard" display={{ sm: 'flex' }} scrollBehavior={'smooth'}>
                        {playerList.map((player, index) => (
                            <PlayerColumn key={player.name + '-column'} gameState={gameState} dispatch={dispatch} playerKey={index} inactive={index !== currentPlayerIndex} />))
                        }
                    </Box>
                </Collapse>
            </VStack>
            <VStack id="controlRow" w={'100%'} p={3}>
                <ColorModeButton />
                <DevModeButton devMode={gameState.devMode} dispatch={dispatch} />
                <DataDisplay gameState={gameState} />
            </VStack>
        </VStack>
    </ErrorBoundary >)
}
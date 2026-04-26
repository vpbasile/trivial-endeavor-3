import { Collapse, Show, Stack, Text } from '@chakra-ui/react';
import { player, propsType } from '../gameReducer';
import { categoryList } from '../helpers/queryTheTrivia';
import { sidePad } from '../helpers/style';
import CategoryButton from './CategoryButton';

interface playerColumnProps extends propsType {
  playerKey: number;
  inactive: boolean;
}

export default function PlayerColumn(props: playerColumnProps) {
  // Cache props
  const { gameState, dispatch, playerKey, inactive } = props;
  const playerList = gameState.playerList;
  const player: player = playerList[playerKey];
  // If the player has won, show the column disabeled
  // Determine the color scheme and disabled state based on the player's state
  let colorScheme = 'gray';

  // Winning players are yellow
  if (player.wonPlace) {
    colorScheme = 'yellow';
  } else if (player.index === gameState.currentPlayerIndex) {
    // The current player's buttons should be active and shown
    return (
      <Collapse in={true}>
        <Stack direction='column' id={playerKey + "-column"} flex={1} px={sidePad} borderY={`2px solid`} py={6}>
          <Text colorScheme={colorScheme}>{player.name}</Text>
          {categoryList.map(category => (
            <CategoryButton
              // <><><> Player and category we're iterating on
              category={category}
              key={category.key}
              player={player}
              gameState={gameState}
              dispatch={dispatch}
              isDisabled={false}
            />
          ))}
        </Stack>
      </Collapse>
    );
  }

  // Inactive players should have inactive buttons and should be hidden under the small breakpoint
  return (
    <Show above='sm'>
      <Stack direction='column' id={playerKey + "-column"} flex={1} px={sidePad} borderY={`2px solid`} py={6}>
        <Text colorScheme={colorScheme}>{player.name}</Text>
        {categoryList.map(category => (
          <CategoryButton
            // <><><> Player and category we're iterating on
            category={category}
            key={category.key}
            player={player}
            gameState={gameState}
            dispatch={dispatch}
            isDisabled={inactive}
          />
        ))}
      </Stack>
    </Show>
  );

}


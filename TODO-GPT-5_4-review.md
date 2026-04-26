# Review Todo

Model: GPT-5.4

- [ ] Fix feedback answer buttons so they cannot be clicked after a guess is locked in.
  Files: src/question/QuestionDisplay.tsx, src/question/AnswerButton.tsx, src/helpers/SameButton.tsx
- [ ] Enforce a minimum player count in setup so removing players cannot drop the game below one player.
  File: src/routes/GameSetup.tsx
- [ ] Guard GameBoard initialization against an empty or malformed player list from route params.
  File: src/routes/GameBoard.tsx
- [ ] Handle trivia fetch failures by restoring the UI to a usable state and showing an error message.
  File: src/scoreboard/newQuestion.tsx
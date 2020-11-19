const gameboard = (() => {
    
    let game = {
      cells: Array.from(document.querySelectorAll('.cell')),
      currentPlayer: 'X',
      winningComb: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ],
      gameState: ["", "", "", "", "", "", "", "", ""],
      gameActive: true
    }

    game.cells.forEach(cell => {
      cell.addEventListener('click', (e) => {
        
        let dataPos = e.target.getAttribute('data-pos');
        console.log(dataPos);
        if(game.gameState[dataPos] != ""){
          console.log("entra");
          return;
        }
        handleCellPlayed(cell, dataPos);
        checkWin();
 
      });
    });

    function handleCellPlayed(clickedCell, clickedCellIndex){

      game.gameState[clickedCellIndex] = game.currentPlayer;
      game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';

      clickedCell.classList.add(game.currentPlayer);
      placeMark(clickedCell, game.currentPlayer);
      
    }

    function placeMark(cell, mark){
        let p = document.createElement('p');
        p.innerText = mark;
        cell.appendChild(p);
    }

    const playerTurn = (player) => {
      console.log('funca ');
    }

    function winningMessage(){
      return `GANADOR ${game.currentPlayer}`;
    }

    function drawMessage(){
      return `EMPATE`;
    }

    function handleRestartGame(){
      game.gameActive = true;
      game.currentPlayer = "X";
      game.gameState =  ["","","","","","","","",""];
      game.cells.forEach((cell) => {
        cell.innerHTML = "";
      })
    }

    function checkWin(){
      let roundWon = false;
      
      for(let i=0 ; i<=7; i++){
        let winCondition = game.winningComb[i];
        
        let a = game.gameState[winCondition[0]];
        let b = game.gameState[winCondition[1]];
        let c = game.gameState[winCondition[2]];
        
        console.log(a + "/" + b + "/" + c);

        if((a !== "" && b !== "" && c !== "") && (a === b && b === c)){
          console.log(winningMessage());
          game.gameActive = false;
          handleRestartGame();
          return;
        }
      }

      if(!game.gameState.includes("")){
        console.log(drawMessage());
        game.gameActive = false;
        return
      }

    }

    return {
      playerTurn
    };
  })();

  gameboard.playerTurn('x');
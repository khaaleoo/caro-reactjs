import React from "react"
// import HistoryOnline from "./HistoryOnline";
import ChatBox from "./ChatBox"
import { emitRestartGameAfterGameOver , cancelFindingRoom} from "../../Config/Socket"

const ToolbarOnline = ({ props }) => {
  const {
    turnOnline,
    isPlayingOnline,
    clickRestartGameOnline,
    userInfo,
    roomInfo,
    sendRequestUndo,
    statusOfGame
  } = props
  var whoWin
  if (statusOfGame === 1){
    if (roomInfo.areYouPlayer1 === true)
      whoWin = 'You win'
    else 
      whoWin = 'Your enemy win'
  }
  else if (statusOfGame === 2){
    if (roomInfo.areYouPlayer1 === true)
      whoWin = 'Your enemy win'
    else 
      whoWin = 'You win'
  }
  return (
    <div className="col-md-4" id="toolbar">
      <div id="divImgCaro">
        <div className="row">
          <div className="col-md-6">
            <img id="imgCaroOnline" src="caroImg.jpg" alt="ảnh nền" />
          </div>
          <div className="col-md-6">
            <h1>1vs1 Online</h1>
            <div className="btn-group-vertical groupButtonWinDrawLose">
              <button
                type="button"
                className="btn btn-warning"
              >
                Tie Please!
              </button>
              <button
                type="button"
                className="btn btn-danger"
              >
                Im' lose!
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => sendRequestUndo()}
              >
                Undo!
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
          <h3 hidden={isPlayingOnline === false}>Current turn: {turnOnline ? "X" : "O"}</h3>
          <h3 hidden={statusOfGame===-1}>{statusOfGame===0? "Game Tie": whoWin}</h3>
      </div>
      <div>
        <div>You: {roomInfo.areYouPlayer1? "X":"O"}</div>
        <div>Your enemy: {roomInfo.areYouPlayer1? "O":"X"}</div>
      </div>
      <br />
      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => cancelFindingRoom(roomInfo.idRoom)}
        >
          Out Game
        </button>
        <button
          type="button"
          className="btn btn-success"
          hidden = {isPlayingOnline? true:false}
          onClick={() => emitRestartGameAfterGameOver(roomInfo.idRoom)}
        >
          Chơi lại
        </button>
        
      </div>

      {/* <HistoryOnline props={props} /> */}
      <ChatBox props={props}></ChatBox>
    </div>
  )
}

export default ToolbarOnline

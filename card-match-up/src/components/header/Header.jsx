import React from 'react';

const Header = ({ restartGame }) => (
    <div className="header-grid-container">
        <div className="align-left header-timer"></div>
        <div className="align-center header-status"></div>
        <div className="align-right">
            <button onClick={restartGame} className="btn-restart">Restart Game</button>
        </div>
    </div>
);

export default Header;
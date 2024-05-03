import { useEffect, useState } from 'react';
import './App.css';
import Grids from './Grids'

const MiniMap = ({ map, playerPosition, coloredCells, size = 9, isTopLeft }: any) => {
    const miniMapStyle = isTopLeft ? { top: '10px', left: '10px' } : { top: '10px', right: '10px' };

    const halfSize = Math.floor(size / 2);
    const maxX = map[0].length - 1;
    const maxY = map.length - 1;

    // Calculate start and end coordinates ensuring they stay within the map bounds
    const startX = Math.max(0, Math.min(playerPosition.x - halfSize, maxX - size + 1));
    const startY = Math.max(0, Math.min(playerPosition.y - halfSize, maxY - size + 1));
    const endX = startX + size;
    const endY = startY + size;

    // Extract the portion of the map to display based on player position
    const getMiniMap = () => {
        const miniMap = [];
        for (let y = startY; y < endY; y++) {
            const row = [];
            for (let x = startX; x < endX; x++) {
                // Check bounds to avoid undefined access
                const isInsideMap = x >= 0 && x < map[0].length && y >= 0 && y < map.length;
                const cellValue = isInsideMap ? map[y][x] : 0;  // Default to 0 if out-of-bounds
                const coloredCell = isInsideMap ? coloredCells.find((cell: any) => cell.x === x && cell.y === y) : null;
                row.push({ value: cellValue, color: coloredCell ? coloredCell.color : null });
            }
            miniMap.push(row);
        }
        return miniMap;
    };

    const miniMap = getMiniMap();

    return (
        <div className="mini-map" style={miniMapStyle}>
            {miniMap.map((row, i) => (
                <div key={i} className="row">
                    {row.map((cell, j) => (
                        <div
                            key={`${i}-${j}`}
                            className={`cell ${cell.value === 1 ? 'obstacle' : ''}`}
                        >
                            {cell.color && (
                                <div 
                                    className="color-marker" 
                                    style={{ backgroundColor: cell.color }}
                                />
                            )}
                            {i === halfSize && j === halfSize ? <div className="player-marker" style={{transform: `translate(-50%, -50%) rotate(${playerPosition.rotation}deg)`}}/> : null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

const HoverRadio = (props: any) => {
    const [appear, setAppear] = useState(false)

    useEffect(( )=> {}, [appear])
    return (
        <div 
        onMouseEnter={() => setAppear(true)}
        onMouseLeave={() => setAppear(false)}
        style={{
            position: 'fixed',
            top: '10px',
            right: '42%',
            transform: 'translateX(-50%)',
            width: '100px',  // Width of the hover area
            height: '100px', // Height of the hover area
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div 
            style={{
                display: !appear ? 'none' : 'flex',  // Initially hidden
                width: '100%',    // Full width of the hover area
                height: '100%'    // Full height of the hover area
            }} className="hover-content">
                <label>
                    <input
                        type="radio"
                        value="right"
                        checked={!props.isTopLeft}
                        onClick={() => props.setIsTopLeft(!props.isTopLeft)}
                    />
                    map right
                </label>
            </div>
        </div>
    );
};

// Assume some initial state for the map and player position
const App = () => {

    const [isTopLeft, setIsTopLeft] = useState(true);

    const [playerPosition, setPlayerPosition] = useState({ x: 10, y: 10, rotation: 0 });

    // a map with padding around it
    let map = [
        [0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0],
        [0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0],
        [0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0],
        [0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0],
        [0,0,0,0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0,0,0,0],
        [0,0,0,0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,0,0,0],
        [0,0,0,0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,0,0,0],
        [0,0,0,0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,0,0,0],
        [0,0,0,0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,0,0,0],
        [0,0,0,0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,0,0,0],
        [0,0,0,0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,0,0,0],
        [0,0,0,0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,0,0,0],
        [0,0,0,0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,0,0,0],
        [0,0,0,0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0,0,0,0],
        [0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0],
        [0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0],
        [0,0,0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0],
        [0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0],
    ];
    
    const [coloredCells, setColoredCells] = useState<any>([]);

    const colors = [
        '#ffb23e', // orange
        '#DCD31D', // yellow
        '#00A9BF', // blue
        '#FF69B4', // pink
        '#008000', // green
        '#A020F0'  // purple
    ];

    // Randomly assign colors to cells when the component mounts
    useEffect(() => {
        const newColoredCells = [];
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (Math.random() < 0.1 && map[i][j] === 1) { // 10% chance to assign a color
                    const colorIndex = Math.floor(Math.random() * colors.length);
                    newColoredCells.push({ x: j, y: i, color: colors[colorIndex] });
                }
            }
        }
        setColoredCells(newColoredCells);
    }, []);

    const handleKeyPress = (event: any) => {
        let { x, y, rotation } = playerPosition;
    
        // Proposed new position initialization
        let newX = x;
        let newY = y;
    
        switch (event.key) {
            case 'ArrowUp':
                newY = Math.max(0, y - 1);
                rotation = 0;
                break;
            case 'ArrowDown':
                newY = Math.min(map.length - 1, y + 1);
                rotation = 180;
                break;
            case 'ArrowLeft':
                newX = Math.max(0, x - 1);
                rotation = 270;
                break;
            case 'ArrowRight':
                newX = Math.min(map[0].length - 1, x + 1);
                rotation = 90;
                break;
            default:
                break;
        }
    
        // Check if the new position is valid before setting it
        if (map[newY][newX] === 1 ) {
            // Only update the position if the target cell is a '1'
            setPlayerPosition({ x: newX, y: newY, rotation });
            const cellIndex = coloredCells.findIndex((cell: any) => cell.x === newX && cell.y === newY);
            if (cellIndex !== -1) {
                // Alert the user about the lootbox
                alert('a lootbox!');
                // Remove the colored cell from the state
                const newColoredCells = [...coloredCells];
                newColoredCells.splice(cellIndex, 1);
                setColoredCells(newColoredCells);
            }
        } else {
            // Only update the rotation if the target cell is not '1'
            setPlayerPosition(prev => ({ ...prev, rotation }));
        }
    };
    
    // Add event listener for keydown when the component mounts and clean it up on unmount
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [playerPosition]);
    useEffect(() => {

    }, [isTopLeft])

    return (
        <div>
            <Grids/>
            <HoverRadio isTopLeft={isTopLeft} setIsTopLeft={setIsTopLeft}/>
            <MiniMap map={map} playerPosition={playerPosition} coloredCells={coloredCells} isTopLeft={isTopLeft}/>
        </div>
    );
};

export default App;
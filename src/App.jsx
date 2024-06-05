// App.jsx
import './App.css';
import { useState, useEffect } from 'react';
import Controls from './components/Controls';
import spellsData from './data/spells.json';
import { applySpell } from './utils/applySpell';

function App() {
  const [player, setPlayer] = useState({ name: 'Joueur', hp: 100, maxHp: 100, lastSpell: {} });
  const [enemy, setEnemy] = useState({ name: 'Ennemi (IA)', hp: 100, maxHp: 100, lastSpell: {} });
  const [currentPlayer, setCurrentPlayer] = useState('player');
  const [gameOver, setGameOver] = useState(false);
  const [spellCooldowns, setSpellCooldowns] = useState({});
  const [enemySpellCooldowns, setEnemySpellCooldowns] = useState({});


  const handlePlayerSpell = (spell) => {
    if (currentPlayer === 'player' && !spellCooldowns[spell.name] && !gameOver) {
      applySpell(player, enemy, spell.effect);
      setSpellCooldowns((prevCooldowns) => ({
        ...prevCooldowns,
        [spell.name]: spell.cooldown
      }));
  
      // Mettre à jour le cooldown du sort utilisé par l'ennemi
      setEnemySpellCooldowns((prevCooldowns) => ({
        ...prevCooldowns,
        [spell.name]: spell.cooldown
      }));
  
      setCurrentPlayer('enemy');
      setPlayer((prevPlayer) => ({ ...prevPlayer, lastSpell: spell }));
    }
  };
  
useEffect(() => {
  if (currentPlayer === 'player') {
    console.log('Tour actuel :', currentPlayer);
  } else if (currentPlayer === 'enemy' && !gameOver) {
    const randomSpell = spellsData.spells[Math.floor(Math.random() * spellsData.spells.length)];
    console.log('Sort sélectionné par l\'ennemi:', randomSpell);
    applySpell(enemy, player, randomSpell.effect);
    setCurrentPlayer('player');
    setEnemy((prevEnemy) => ({ ...prevEnemy, lastSpell: randomSpell }));
  }
}, [currentPlayer, gameOver]);

  return (
    <div>
      <div>Joueur: {player.name} (HP: {player.hp}) - Dernier sort utilisé : {player.lastSpell.name} (Valeur : {player.lastSpell.effect?.value})</div>
      <div>Ennemi: {enemy.name} (HP: {enemy.hp}) - Dernier sort utilisé : {enemy.lastSpell.name} (Valeur : {enemy.lastSpell.effect?.value})</div>
      <Controls spells={spellsData.spells} handleSpell={handlePlayerSpell} spellCooldowns={spellCooldowns} currentPlayer={currentPlayer} />
    </div>
  );
}

export default App;

const Controls = ({ spells, handleSpell, spellCooldowns, currentPlayer }) => {
  return (
    <div>
      {spells.map((spell, index) => (
        <button 
          key={index} 
          onClick={() => handleSpell(spell)} 
          disabled={currentPlayer !== 'player' || spellCooldowns[spell.name] > 0}>
          {spell.name} {spellCooldowns[spell.name] > 0 && `(Cooldown: ${spellCooldowns[spell.name]} tours)`}
        </button>
      ))}
    </div>
  );
};

export default Controls;

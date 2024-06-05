// applySpell.js
import SpellTypes from '../enums/spellTypes';

// Applique l'effet d'un sort à une cible
export const applySpell = (source, target, effect) => {
  console.log(`Appliquer l'effet du sort ${effect.type} à la cible`, target);

  switch (effect.type) {
    case SpellTypes.DIRECT_DAMAGE:
      target.hp -= effect.value;
      if (target.hp < 0) {
        target.hp = 0;
      }
      break;
    case SpellTypes.HEAL:
      source.hp += effect.value;
      if (source.hp > source.maxHp) {
        source.hp = source.maxHp;
      }
      break;
    default:
      console.error(`Type d'effet inconnu : ${effect.type}`);
  }
};
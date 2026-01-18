import CFonts from 'cfonts';
import { VERSION } from '../utils/constants.js';

/**
 * Display ASCII banner with LINE brand colors
 */
export function showBanner(): void {
  CFonts.say('LTVAI Kit', {
    font: 'block',
    align: 'left',
    colors: ['#00D700', '#00AF00'], // LINE Green gradient
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
  });

  console.log(`  \x1b[38;5;40mDeveloper Setup CLI\x1b[0m  \x1b[38;5;245mv${VERSION}\x1b[0m\n`);
}

import { getThemeColors, generateColors } from '../../../../build/config/themeConfig';

// import { replaceStyleVariables } from 'vite-plugin-theme/es/client';
const client = require('webpack-theme-color-replacer/client');
import { mixLighten, mixDarken, tinycolor } from './colorUtils';
export async function changeTheme(color, theme) {
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
    color,
  });

  // return await replaceStyleVariables({
  //   colorVariables: [...getThemeColors(color, theme), ...colors],
  // });
  return await client.changer.changeColor({
    newColors: [...getThemeColors(color, theme), ...colors],
  });
}

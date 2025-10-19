import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f0f4f7',
      100: '#d9e2ea',
      200: '#b7c8d5',
      300: '#8fa7ba',
      400: '#6b879b',
      500: 'var(--primary)', // Using CSS variable from styles.scss
      600: 'var(--secondary)', // Using secondary as darker shade
      700: '#3e5668',
      800: '#344556',
      900: '#2c3a47',
      950: '#1e2831',
    },
    colorScheme: {
      light: {
        primary: {
          color: 'var(--primary)',
          contrastColor: '#ffffff',
          hoverColor: 'var(--secondary)',
          activeColor: '#3e5668',
        },
      },
    },
  },
});

export default MyPreset;

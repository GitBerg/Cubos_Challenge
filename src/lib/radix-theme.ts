import {whiteA, blackA ,purpleDark, mauve, mauveDark } from "@radix-ui/colors";

export const lightTheme = {
  "--color-text": mauve.mauve12,
  "--color-text-title-card": mauve.mauve1,
  "--color-text-desc-card": mauve.mauve4,
  "--color-border": mauve.mauve11,
  "--color-secondary": mauve.mauve2,
  "--color-primary-dis": mauve.mauve12,
  "--color-primary-act": mauve.mauve8,
  "--color-primary-hover": mauve.mauve10,
  "--color-primary": mauve.mauve9,
  "--color-mask": mauve.mauve1,
  "--color-mask-top": whiteA.whiteA4,
  "--color-menu": mauveDark.mauve1,
  '--color-card': '#1c1b1e',
  '--opacity-menu': '0.7'
};

export const darkTheme = {
  "--color-text-desc-card": mauveDark.mauve10,
  "--color-text-title-card": mauve.mauve1,
  "--color-primary": purpleDark.purple9,
  "--color-primary-hover": purpleDark.purple10,
  "--color-primary-act": purpleDark.purple8,
  "--color-primary-dis": mauveDark.mauve9,
  "--color-secondary": mauveDark.mauve2,
  "--color-border": mauveDark.mauve10,
  "--color-text": mauve.mauve1,
  "--color-mask": mauveDark.mauve1,
  "--color-mask-top": blackA.blackA11,
  "--color-menu": mauveDark.mauve11,
  '--color-card': '#1c1b1e',
  '--opacity-menu': '0.2'
};
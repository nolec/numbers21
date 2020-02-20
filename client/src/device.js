const maxSize = {
  PC380: 380,
  PC400: 400,
  PC420: 420,
  PC450: 450,
  PC490: 490,
  PC500: 500,
  PC520: 520,
  PC570: 570,
  PC575: 575,
  PC580: 580,
  PC600: 600,
  PC660: 660,
  PC767: 767,
  PC768: 768,
  PC770: 770,
  PC860: 860,
  PC900: 900,
  PC920: 920,
  PC980: 980,
  PC990: 990,
  PC991: 991,
  PC992: 992,
  PC1100: 1100,
  PC1000: 1000,
  PC1199: 1199,
  PC: 1200,
  PC1300: 1300
};
const minSize = {
  minPC576: 576,
  minPC768: 768,
  minPC992: 992,
  minPC: 1200
};
export const device = Object.keys(maxSize).reduce((acc, key) => {
  acc[key] = style => `
      @media (max-width: ${maxSize[key]}px) {
        ${style};
      }
    `;
  return acc;
}, {});
export const minDevice = Object.keys(minSize).reduce((acc, key) => {
  acc[key] = style => `
    @media (min-width: ${minSize[key]}px) {
      ${style};
    }`;
  return acc;
}, {});

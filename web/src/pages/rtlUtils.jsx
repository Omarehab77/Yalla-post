export const applyRTLStyles = (lang) => {
  if (lang === 'ar') {
    return {
      direction: 'rtl',
      textAlign: 'right',
      '& .logo-container': {
        transform: 'scaleX(-1)'
      },
      '& .icon-container': {
        marginRight: 0,
        marginLeft: '8px'
      }
    };
  }
  return {
    direction: 'ltr',
    textAlign: 'left'
  };
};

export const flipIconPosition = (lang) => {
  return lang === 'ar' ? { ml: 1, mr: 0 } : { mr: 1, ml: 0 };
};

export const getFlexDirection = (lang) => {
  return lang === 'ar' ? 'row-reverse' : 'row';
};

export const getTextAlign = (lang) => {
  return lang === 'ar' ? 'right' : 'left';
};

export const getDrawerAnchor = (lang) => {
  return lang === 'ar' ? 'left' : 'right';
};
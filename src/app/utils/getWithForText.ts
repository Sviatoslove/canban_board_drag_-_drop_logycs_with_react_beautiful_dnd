export const getWithForText = (
  str: string,
  styles?: { [x: string]: string }
  ) => {
  const span = document.createElement('span');
  span.className = 'test-span';
  span.textContent = str;
  document.querySelector('body')!.append(span);
  if (styles) {
    Object.keys(styles).forEach(
      (style: any) => (span.style[style] = styles[style])
    );
  }
  setTimeout(()=>span.remove(),0)
  return {
    width: span.offsetWidth,
  };
};

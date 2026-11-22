// scrollTop থেকে moving block-এর top position হিসাব করে।
// আপাতত simple: block সবসময় visible area-র ২০px নিচে ভেসে থাকে।
export const getPosition = (scrollTop) => scrollTop + 20;

export function getCenter(elem) {
	return {x: (elem.left + elem.right) / 2, y: (elem.top + elem.bottom) / 2}
}

export function getTranslate(elemID1, elemID2) {
	const p1 = getCenter(document.getElementById(elemID1).getBoundingClientRect())
	const p2 = getCenter(document.getElementById(elemID2).getBoundingClientRect())
	return [p2.x - p1.x, p2.y - p1.y]
}

export function getRotation(misc, catID) {
	return (-misc.spacing * (misc.numCats - 1) / 2 + misc.spacing * catID)
}

export function deg2rad(degrees) {
  return degrees * (Math.PI / 180);
}
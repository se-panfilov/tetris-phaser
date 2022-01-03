export function Cursor(_name: string) {
  let x: number = 0;
  let y: number = 0;
  let isHeld = false;

  addEventListener(
    'mousemove',
    (evt) => {
      x = evt.pageX;
      y = evt.pageY;
    },
    false
  );

  return { x, y };
}

const cursor = Cursor('some');
// cursor.getFullName();

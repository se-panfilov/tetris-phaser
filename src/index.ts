import { Actor, CollisionType, Color, Engine, vec } from 'excalibur';

const game = new Engine({
  width: 800,
  height: 600
});

const paddle = new Actor({
  x: 150,
  y: game.drawHeight - 40,
  width: 200,
  height: 20,
  // Let's give it some color with one of the predefined
  // color constants
  color: Color.Chartreuse
});

paddle.body.collisionType = CollisionType.Fixed;

game.add(paddle);

game.input.pointers.primary.on('move', (evt) => {
  paddle.pos.x = evt.worldPos.x;
});

const ball = new Actor({
  x: 100,
  y: 300,
  // Use a circle collider with radius 10
  radius: 10,
  color: Color.Red
});

setTimeout(() => {
  // Set the velocity in pixels per second
  ball.vel = vec(100, 100);
}, 1000);

ball.body.collisionType = CollisionType.Passive;

game.add(ball);

// Wire up to the postupdate event
ball.on('postupdate', () => {
  // If the ball collides with the left side
  // of the screen reverse the x velocity
  if (ball.pos.x < ball.width / 2) {
    ball.vel.x *= -1;
  }

  // If the ball collides with the right side
  // of the screen reverse the x velocity
  if (ball.pos.x + ball.width / 2 > game.drawWidth) {
    ball.vel.x *= -1;
  }

  // If the ball collides with the top
  // of the screen reverse the y velocity
  if (ball.pos.y < ball.height / 2) {
    ball.vel.y *= -1;
  }
});

// Build Bricks

// Padding between bricks
const padding = 20; // px
const xoffset = 65; // x-offset
const yoffset = 20; // y-offset
const columns = 5;
const rows = 3;

const brickColor = [Color.Violet, Color.Orange, Color.Yellow];

// Individual brick width with padding factored in
const brickWidth = game.drawWidth / columns - padding - padding / columns; // px
const brickHeight = 30; // px
const bricks: Actor[] = [];
for (let j = 0; j < rows; j++) {
  for (let i = 0; i < columns; i++) {
    bricks.push(
      new Actor({
        x: xoffset + i * (brickWidth + padding) + padding,
        y: yoffset + j * (brickHeight + padding) + padding,
        width: brickWidth,
        height: brickHeight,
        color: brickColor[j % brickColor.length]
      })
    );
  }
}

bricks.forEach(function (brick) {
  // Make sure that bricks can participate in collisions
  brick.body.collisionType = CollisionType.Active;

  // Add the brick to the current scene to be drawn
  game.add(brick);
});

// On collision remove the brick, bounce the ball
ball.on('precollision', function (ev) {
  if (bricks.indexOf(ev.other) > -1) {
    // kill removes an actor from the current scene
    // therefore it will no longer be drawn or updated
    ev.other.kill();
  }

  // reverse course after any collision
  // intersections are the direction body A has to move to not be clipping body B
  // `ev.intersection` is a vector `normalize()` will make the length of it 1
  // `negate()` flips the direction of the vector
  var intersection = ev.intersection.normalize();

  // The largest component of intersection is our axis to flip
  if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
    ball.vel.x *= -1;
  } else {
    ball.vel.y *= -1;
  }
});

ball.on('exitviewport', () => {
  alert('You lose!');
});

game.start();

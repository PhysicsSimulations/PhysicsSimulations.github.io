// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();
console.log(World)
engine.world.gravity.y = 9.8
// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false
    }
});
var isMouseDown = false;
document.onmouseup   = function() { isMouseDown = false };

document.onmousemove = function(evt) {
    if(isMouseDown) {
        console.log(evt.x)
        console.log(evt.y)
        var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        var options = {
            restitution: 0.5,
            friction: 0.5,
            render: {
                strokeStyle: randomColor,
            }
        }
        World.add(engine.world, Bodies.circle(evt.x, evt.y, 20, options));
    }
};

document.body.onmousedown = function(evt) {
    isMouseDown = true
    console.log(evt.x)
    console.log(evt.y)
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    var options = {
        restitution: 0.5,
        friction: 0.5,
        render: {
            strokeStyle: randomColor,
        }
    }
    World.add(engine.world, Bodies.circle(evt.x, evt.y, 20, options));
}

// create two boxes and a ground
//var boxA = Bodies.rectangle(400, 200, 80, 80);
//var boxB = Bodies.rectangle(450, 50, 80, 80);
//var boxC = Bodies.rectangle(100, 100, 100, 100);
var ground = Bodies.rectangle(300, 400, 810, 60, { isStatic: true, angle: 0.5 });

var ground2 = Bodies.rectangle(800, 50, 810, 60, { isStatic: true, angle: - 0.5 });

// add all of the bodies to the world
World.add(engine.world, [ground, ground2]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

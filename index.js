// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
let engine = Engine.create();
// create a renderer
engine.world.gravity.y = 0
let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 400,
        height: 600,
        wireframes: false
    }
});
function setup() {
    createCanvas(400,600);
}
function draw()
{
    background(color('rgba(0,0,0,0)'))
    //let c = color(0, 126, 255, 102);
    //fill(c);
    //rect(15, 15, 35, 70);
}

let rangeslider = document.getElementById("sliderRange");
let output = document.getElementById("demo");
output.innerHTML = rangeslider.value;
rangeslider.oninput = function() {
    output.innerHTML = this.value;
    console.log(this.value)
    engine.world.gravity.y = Math.floor(this.value/10)
}
let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
let balz = [];
document.body.onmousedown = function(evt) {
    if(evt.x < 400 && evt.y < 600) {
        let options = {
            render: {
                strokeStyle: randomColor,
            }
        }
        let circ = Bodies.rectangle(evt.x, evt.y, 20, 20, options)
        balz.push(circ)
        for (var i = 0; i < balz.length; i++) {
            if(balz[i].position.x > 500 && balz[i].position.y > 700)
            {
                console.log('removed')
                World.remove(engine.world, balz[i])
            }
        }
        World.add(engine.world, circ);
    }
}

// create two boxes and a ground
//let boxA = Bodies.rectangle(400, 200, 80, 80);
//let boxB = Bodies.rectangle(450, 50, 80, 80);
//let boxC = Bodies.rectangle(100, 100, 100, 100);
let options = {
    isStatic: true,
    render: {
        strokeStyle: 'white',
    }
}
let ground = Bodies.rectangle(0, 600, 800, 100, options);

// add all of the bodies to the world
World.add(engine.world, [ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);


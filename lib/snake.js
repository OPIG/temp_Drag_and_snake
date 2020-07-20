(function () {
    var World = {
        Size: {
            width: 20,
            height: 20
        },
        Food: {
            x: undefined,
            y: undefined,

            generate: function (snake) {
                console.log(snake);
                var head = snake.head.get(), 
                part = snake.body.part;
                var map = [];
                for (var x = 0; x < World.Size.width; x++) {
                    for (var y = 0; y < World.Size.height; y++) {
                        if (x == head.x && y == head.y) {
                            continue;
                        }
                        if (part.length > 0) {
                            var pass = true;
                            for (var i = part.length; ; i++) {
                                if (x == part[i].x && y == part[i].y) {
                                    pass = false;
                                    break;
                                }
                            }
                            if (pass) {
                                map.push([x, y]);
                            }
                        } else {
                            map.push([x, y]);
                        }
                    }
                }

                var i = Math.floor(Math.random() * map.length);
                World.Food.x = map[i][0];
                World.Food.y = map[i][1];
            }
        }
    }

    var Direction = {
        up: 1,
        right: 2,
        down: -1,
        left: -2
    }

    function Snake() {
        var self = this;

        function Head() {
            this.x = 9;
            this.y = 9;
            this.direction = undefined;

            this.get = function () {
                return {
                    x: this.x,
                    y: this.y
                }
            };

            

            function eat(x, y) {
                if (x == World.Food.x && y == World.Food.y) {
                    return true;
                } else {
                    return false;
                }
            };

            function hitCheck(x, y) {
                if (x < 0 || y < 0 || x == World.Size.width || y == World.Size.height) {
                    return true;
                } else {
                    return false;
                }
            };

            function eatSelfCheck(x, y) {
                var part = self.body.part;
                for (var i = part.length; i--; ) {
                    if (x == part[i].x && y == part[i].y) {
                        return true;
                    }
                }
                return false;
            };
			
			this.move = function (direction) {
                var head = {
                    x: this.x,
                    y: this.y
                };

                if (direction + this.direction == 0) {
                    direction = this.direction;
                }
                this.direction = direction;
                switch (direction) {
                case Direction.up:
                    this.y--;
                    break;
                case Direction.right:
                    this.x++;
                    break;
                case Direction.left:
                    this.x--;
                    break;
                case Direction.down:
                    this.y++;
                    break;
                }

                if (eat(this.x, this.y)) {
                    World.Food.generate();
                    self.Body.increase(self);
                } else if (hitCheck(this.x, this.y) || eatSelfCheck(this.x, this.y)) {
                    //Console.log("Game Over, Try Again!");
                    die();
                    return false;
                } else {
                    self.body.move(head);
                }

                return true;
            };

            function die() {
                gameOver(self.body.part.length);
            }

            function gameOver(length) {
                alert("Your Score:" + length);
            }
        }

        function Body() {
            this.part = [];

            this.move = function(head) {
                if (this.part.length > 0) {
                    this.part.pop();
                    this.increase(head);
                }
            };

            this.increase = function (head) {
                this.part.unshift(head);
            }
        }

        this.body = new Body();
        this.head = new Head();
    }

    function init() {
        var snake = new Snake();
        World.Food.generate(snake);
        var ctx = document.querySelector('canvas').getContext('2d');

        function draw(snake) {
            ctx.clearRect(0, 0, 200, 200);
            var head = snake.head;
            ctx.fillStyle = 'black';
            ctx.fillRect(head.x * 10, head.y * 10, 10, 10);
            var body = snake.body.part;
            for (var i = body.length; i--; ) {
                ctx.fillRect(body[i].x * 10, body[i].y * 10, 10, 10);
            }
            ctx.fillStyle = 'red';
            ctx.fillRect(World.Food.x * 10, World.Food.y * 10, 10, 10);
        }

        var direction;
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
            case 37:
                direction = Direction.left;
                break;
            case 38:
                direction = Direction.up;
                break;
            case 39:
                direction = Direction.right;
                break;
            case 40:
                direction = Direction.down;
                break;
            }
        });
        (function () {
            if (snake.head.move(direction)) {
                draw(snake);
                setTimeout(arguments.callee, 200 - snake.body.part.length)
            }
        })();
    }
    init();
})();

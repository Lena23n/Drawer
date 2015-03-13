function Drawer (id) {
	this.id = id;
	this.canvas = null;
	this.context = null;
	this.canvasOffsetX = null;
	this.canvasOffsetY = null;

	this.lastX = 0;
	this.lastY = 0;
}

Drawer.prototype = {
	init: function () {
		var self = this;
		this.canvas = document.getElementById(this.id);

		if (!this.canvas) {
			return false
		}

		this.canvas.addEventListener('mousedown', function () {
			self.startDraw = true;
		});

		this.canvas.addEventListener('mousemove', function (e) {
			self.processMoveMouseEvent(e);
		});

		this.canvas.addEventListener('mouseup', function () {
			self.startDraw = false;
		});

		this.context = this.canvas.getContext('2d');
		this.canvasOffsetX = this.canvas.offsetLeft;
		this.canvasOffsetY = this.canvas.offsetTop;

	},


	drawLine: function (x1, y1, x2, y2) {
		this.context.lineWidth = 3;
		this.context.beginPath();

		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);

		this.context.stroke();
	},



	processMoveMouseEvent: function (e) {
		this.x = e.clientX - this.canvasOffsetX;
		this.y = e.clientY - this.canvasOffsetY;
		if (this.startDraw == true) {
			this.drawLine(this.lastX, this.lastY, this.x, this.y);
		}
		this.lastX = this.x;
		this.lastY = this.y;
	}


};

function startPage () {
	var d1 = new Drawer('test1'),
		d2 = new Drawer('test2');

	d1.init();
	d2.init();
}

window.addEventListener('load', startPage);


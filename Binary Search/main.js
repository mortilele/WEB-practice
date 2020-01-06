//type 1 guess number that AI made
//type 2 AI tries to guess your number
//ongame state which type is playing
//on type 2 used binary search
//Should I use two different functions for each of game?
//Fara lox)

var low, limit, lives, x;
var left, right, mid, tries;
var ongame = 0;

function main(limit) {
	Create(1, limit);
	Create(2, limit);
}

function init(type, lim) {
	ongame = 0;
	if (type == 1) {
		change(1);
		low = 0;
		document.getElementById('Lower').disabled = false;
		document.getElementById('play').style.opacity = 1;
		document.getElementById('Lower').value = limit;
	}
	else {
		document.getElementById('Lower2').disabled = false;
		document.getElementById('less').disabled = false;
		document.getElementById('more').disabled = false;
		document.getElementById('play2').style.opacity = 1;
		document.getElementById('less').style.opacity = 1;
		document.getElementById('more').style.opacity = 1;
		right = lim;
		change(2);
		left = 1;
	}
}
function check(resp) {
	if (ongame == 2) {
		if (resp.id == 'answer') {
			alert("Yeah, I won! It was: " + mid);
			init(2, 100);
		}
		else if (resp.id == 'less') {
			right = mid-1;
			tries--;
		}
		else {
			left = mid+1;
			tries--;
		}
		var lower = left-1;
		Draw(2, lower, right);
		if (left>=right) {
			alert("Hmmmm, My computer intuition tells me that it should be: " + left);
			init(2, 100);
		}
		if (tries == 0) {
			alert("I lost! Maybe next time");
			init(2, 100);
		}
 		mid = Math.floor((left+right)/2);
 		if (left==mid) {
			document.getElementById('less').disabled = true;
			document.getElementById('less').style.opacity = 0.3;
 		}
 		if (mid==right) {
 			document.getElementById('more').disabled = true;
 			document.getElementById('more').style.opacity = 0.3;
  		}
		document.getElementById('answer').innerHTML = mid;
		document.getElementById('tries').innerHTML = tries;
	}
}

function Play(type) {
	if (ongame == 1 && type == 2)
	{
		init(1, 100);
	}
	else if (ongame == 2 && type == 1)
		init(2, 100);
	ongame = type;
	if (ongame == 1) {
		document.getElementById('Lower').disabled = true;
		document.getElementById('play').style.opacity = 0.5;
	}
	else {
		document.getElementById('Lower2').disabled = true;
		document.getElementById('play2').style.opacity = 0.5;
		mid = Math.floor((left+right)/2);
		document.getElementById('answer').innerHTML = mid;
	}
}

function Create(type, num) {
	var parent;
	if (type == 1) {
		parent = document.getElementById("balls");
	}
	else {
		parent = document.getElementById("chest");
	}
	for(var i = 1; i <= num; i += 1) {
		var btn = document.createElement("button");
    	btn.innerHTML = i;
    	if (type == 1)
			btn.addEventListener("click", function() { Guess(this)});
    	parent.appendChild(btn);
	}
	init(type, 100);
}
	
function Draw(type, l, r) {
	var child;
	if (type == 1)
		child = document.getElementById("balls").children;
	else 
		child = document.getElementById("chest").children;
	for(var i = l; i < r; i += 1) 
		child[i].style.opacity = "1";
	for(var i = r; i < 100; i += 1)
		child[i].style.opacity = "0";
	for(var i = 0; i < l; i += 1)
		child[i].style.opacity = "0";
}

function Guess(element) {
	if (ongame == 1 && element.style.opacity!=0) {
		var num = Number(element.innerHTML);
		if (x == num) {
			alert("Congratulations You won! Lives left: " + lives);
			init(1, 100);
		}
		else if (num > x) {
			Draw(1, low, --num);
			lives--;
			limit = num;
		}
		else {
			low = num;
			Draw(1, low, Number(limit));
			lives--;
		}
		if (lives == 0)
		{
			alert("You lose");
			init(1, 100);
		}
		document.getElementById('live').innerHTML = lives;
	}
}

function change(type) {
	if (type == 1) {
		limit = document.getElementById('Lower').value;
		document.getElementById('LowerShow').innerHTML = limit;
		Draw(1, 0, Number(limit));
		x = getRandom(limit);
		lives = Math.ceil(Math.log2(limit))+1;
		document.getElementById('live').innerHTML = lives;
	}
	else {
		right = parseInt(document.getElementById('Lower2').value);
		document.getElementById('LowerShow2').innerHTML = right;
		Draw(2, 0, Number(right));
		tries = Math.ceil(Math.log2(right));
		document.getElementById('tries').innerHTML = tries;
	}
	
}

function getRandom(max) {
	return Math.floor(Math.random() * max)+1;
}

function Debug() {
	/*
	console.log("limit is " + limit);
	console.log("x is " + x);
	console.log("lives is " + lives);
	*/
	console.log(left + " " + mid + " " + right);
}



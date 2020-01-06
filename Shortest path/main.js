const INF = 10000000000;
let i, j;
var distances = {};
var path = {};
let roads = [];

class Edge {
    constructor(source, destination, distance) {
        this._source = source;
        this._destination = destination;
        this._distance = distance;
    }

    get source() {
        return this._source;
    }

    get destination() {
        return this._destination;
    }

    get distance() {
        return this._distance;
    }
}

var road = new Edge('Kyzylorda', 'Almaty', 1000);
roads.push(road);
road = new Edge('Kyzylorda', 'Astana', 800);
roads.push(road);
road = new Edge('Almaty', 'Chundzha', 300);
roads.push(road);
road = new Edge('Chundzha', 'Taldykorgan', 200);
roads.push(road);

let cities = [];
roads.forEach(road => {
    if (cities.indexOf(road.source)==-1)
        cities.push(road.source);
    if (cities.indexOf(road.destination)==-1)
        cities.push(road.destination);
})
let source=cities[0];

const onLoad = () => {
    let select = document.getElementById('source');
    let destination = document.getElementById('destination');
    cities.forEach(city => {
        let option = document.createElement('option');
        option.text = city;
        select.add(option);
    })
    onChangeSource();
}

const onChangeSource = () => {
    source = document.getElementById('source').value;

    Ford_Bellman();

    let destination = document.getElementById('destination');
    for (i = destination.length-1; i >= 0; i--)
        destination.remove(i);

    for (let key in distances) 
        if (distances[key]!=INF && distances[key]!=0) {
            let option = document.createElement('option');
            option.text = key;
            destination.add(option);
        }

    if (destination.length > 0)
        onChangeDestination();
    else {
        document.getElementById('result').innerHTML = '';
        document.getElementById('path').innerHTML = '';
    }
}

const onChangeDestination = () => {
    let destination = document.getElementById('destination').value;
    document.getElementById('result').innerHTML = `Shortest path from <span id="begin">${source}</span> to <span id="end">${destination}</span> is: <span id="distance">${distances[destination]}</span>km`;
    restorePath(destination);
}

function Ford_Bellman() {
    for (i = 0; i < cities.length; i++)
        distances[cities[i]] = INF;

    for (i = 0; i < cities.length; i++)
        path[cities[i]] = -1;

    distances[source]=0;

    for (;;) {
        let any = false; 
        for (j = 0; j < roads.length; j++) 
            if (distances[roads[j].source] < INF)
                if (distances[roads[j].destination] > distances[roads[j].source]+roads[j].distance) {
                    distances[roads[j].destination] = distances[roads[j].source]+roads[j].distance;
                    path[roads[j].destination] = roads[j].source;
                    any = true;
                }
        if (!any)
            break;
    }
}

function restorePath(destination) {
    if (distances[destination] == INF)
        document.getElementById('path').innerHTML = "No path";
    else {
        let pathCurrent = [];
        let cur;
        for (cur = destination; cur!=-1; cur=path[cur])
            pathCurrent.push(cur);
        let text = 'Path: ';
        for (i = pathCurrent.length-1; i >= 0 ; i--)
            if (!i)
                text+=`<span class="point">${pathCurrent[i]}</span>`;
            else
                text+=`<span class="point">${pathCurrent[i]}</span> ===> `;
        document.getElementById('path').innerHTML = text;
    }
}

function addNewRoad() {
    let newSource = document.getElementById('A').value;
    let newDestination = document.getElementById('B').value;
    let newDistance = Number(document.getElementById('length').value);
    let isBi = document.getElementById('bi').checked;

    if (isBi) {
        let road = new Edge(newSource, newDestination, newDistance);
        roads.push(road);
        road = new Edge(newDestination, newSource, newDistance);
        roads.push(road);
    }
    else {
        let road = new Edge(newSource, newDestination, newDistance);
        roads.push(road);
    }

    if (cities.indexOf(newSource)==-1) {
        cities.push(newSource);
        let option = document.createElement('option');
        option.text=newSource;
        document.getElementById('source').add(option);
    }
    if (cities.indexOf(newDestination)==-1) {
        cities.push(newDestination);
        let option = document.createElement('option');
        option.text = newDestination;
        document.getElementById('source').add(option);
    }
    
    onChangeSource();
}

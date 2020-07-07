import "./app.css";

// IDs
var HEADING_ID = "heading";
var DESC_ID = "desc";
var ACTIONS_ID = "actions";
var CONTROLS_ID = "controls";
var RESULT_ID = "result"

// Page copy mapping 
var HEADINGS_MAPPING = {
    1: "Step 1 : Select Your Shape",
    2: "Step 2 : Insert your values",
    3: "Step 3 : Your results"
};

var DESCRIPTION_MAPPING = {
    2: function(type) {
        return "You have selected a "+ type + ", please input the required variables";
    },
    3: function(type, area) {
        return "You have calculated the area of "+ type + " to be "+  obj.area() +". Below is your result:";
    }
};

var RESULT_TEXT = "The area is ";

// Constant
var TYPES = {
    RECT: 'rectangle',
    SQUARE: 'square',
    CIRCLE: 'circle',
    ECLIPSE: 'eclipse'
};

var USER_OPTIONS = [
    {
        type: "Rectangle",
        value: "Rectangle"
    },
    {
        type: "Square",
        value: "Square"
    },
    {
        type: "Circle",
        value: "Circle"
    },
    {
        type: "Eclipse",
        value: "Eclipse"
    }
]

var currentState = 1;
var userSelectedOption = 0;
var obj;

// Create Shape
function Shape(x, y) {
    this.x = x;
    this.y = y;
}

function Rect(x, y) {
    var rect = new Shape(x, y);
    this.type = "rect"
    this.area = function () {
        return rect.x * rect.y;
    }
}

function Circle(x, y) {
    var circle = new Shape(x, y);
    this.type = "circle"
    this.area = function () {
        return 3.14 * circle.x * circle.x;
    }
}


function Square(x) {
    var rect = new Rect(x, x);
    rect.type = "square";
    return rect;
}


function Eclipse(x, y) {
    var circle = new Circle(x, y);
    circle.type = "eclipse";
    return circle;
}

// Set page heading
function setHeading(id) {
    var headingElem = document.getElementById(HEADING_ID);
    headingElem.innerHTML = HEADINGS_MAPPING[id];
};

// Set page description
function setDesc(id) {
    var headingElem = document.getElementById(DESC_ID);
    if (DESCRIPTION_MAPPING[id] && userSelectedOption) {
        var text = Object.values(TYPES)[userSelectedOption - 1]
        headingElem.textContent = DESCRIPTION_MAPPING[id](text);
        headingElem.style.display = "block";
    } else {
        headingElem.style.display = "none";
    }
};


function setButton(id) {
    var buttonWrapper = document.getElementById(ACTIONS_ID);
    buttonWrapper.innerHTML = "";

    if (id == 1 || id == 2) {

        var nextBtn = document.createElement("div");
        nextBtn.textContent = "Next";
        nextBtn.setAttribute("class", "btn btn-success");
        nextBtn.addEventListener("click", goToNext);

        var cancelBtn = document.createElement("div");
        cancelBtn.textContent = "Cancel";
        cancelBtn.setAttribute("class", "btn btn-cancel");
        cancelBtn.addEventListener("click", resetToDefault);

        buttonWrapper.appendChild(nextBtn);
        buttonWrapper.appendChild(cancelBtn);
        buttonWrapper.style.display = 'block';

    } if (id == 3) {
        var restartBtn = document.createElement("div");
        restartBtn.setAttribute("class", "btn btn-success");
        restartBtn.textContent = "Start over";
        restartBtn.addEventListener("click", resetToDefault);

        buttonWrapper.appendChild(restartBtn);
        buttonWrapper.style.display = 'block';
    }
};

function generateInput(name, value) {
    var wrapper = document.createElement("div")
    wrapper.setAttribute("class", "wrapper");

    var ip = document.createElement("input");
    ip.setAttribute("type", "number");
    ip.setAttribute("name", name);
    ip.setAttribute("id", name.toLowerCase());
    ip.setAttribute("value", value);
    ip.addEventListener("input", function (e) {    });

    var elem = document.createElement('span')
    elem.textContent = name;

    wrapper.appendChild(elem);
    wrapper.appendChild(ip);
    return wrapper;
}

function setControls(id) {
    var elem = document.getElementById(CONTROLS_ID);
    elem.innerHTML = "";
    if (id == 1) {
        elem.style.display = "block";

        var wrapper = document.createElement("div")
        wrapper.setAttribute("class", "wrapper");

        for (var i = 0; i < USER_OPTIONS.length; i++) {
            var ip = document.createElement("input");
            ip.setAttribute("type", "radio");
            ip.setAttribute("name", "userOption");
            ip.setAttribute("value", USER_OPTIONS[i].value);
            ip.setAttribute("id", "checkbox-" + i);

            var label = document.createElement('label')
            label.htmlFor = USER_OPTIONS[i].value;
            label.appendChild(document.createTextNode(USER_OPTIONS[i].value));

            var br = document.createElement('br')

            wrapper.appendChild(ip);
            wrapper.appendChild(label);
            wrapper.appendChild(br);
        }

        elem.appendChild(wrapper);

    } else if (id == 2) {
        elem.style.display = "block";
        if (userSelectedOption == 1) {
            var widthElem = generateInput("width", "");
            elem.appendChild(widthElem);

            var heightElem = generateInput("height", "");
            elem.appendChild(heightElem);
        } else if (userSelectedOption == 2) {
            var lengthElem = generateInput("length", "");
            elem.appendChild(lengthElem);
        } else if (userSelectedOption == 3) {
            var radiusElem = generateInput("radius", "");
            elem.appendChild(radiusElem);
        } else if (userSelectedOption == 4) {
            var widthElem = generateInput("width", "");
            elem.appendChild(widthElem);

            var heightElem = generateInput("height", "");
            elem.appendChild(heightElem);
        }
    } else {
        elem.style.display = "none";
    }
}

function goToNext() {
    if (currentState < 4) {
        if (currentState == 1) {

            // Get user selected value
            for (var i = 0; i < USER_OPTIONS.length; i++) {
                var ip = document.getElementById("checkbox-" + i);
                if (ip.checked) {
                    userSelectedOption = i + 1;
                }
            }

            if (userSelectedOption) {
                currentState++;
            }

        } else if (currentState == 2) {
            if (userSelectedOption == 1) {
                // Get input values and create shape
    
                var width = document.getElementById("width");
                var height = document.getElementById("height");

                if (height && width && height.value && width.value) {
                    obj = new Rect(height.value, width.value);
                    currentState++;
                }
            } else if (userSelectedOption == 2) {
                var length = document.getElementById("length");
    
                if (length && length.value) {
                    obj = new Square(length.value);
                    currentState++;
                }
            } else if (userSelectedOption == 3) {
                var radius = document.getElementById("radius");

                if (radius && radius.value) {
                    obj = new Circle(radius.value);
                    currentState++;
                }
            } else if (userSelectedOption == 4) {
                var width = document.getElementById("width");
                var height = document.getElementById("height");

                if (height && width && height.value && width.value) {
                    obj = new Eclipse(height.value, width.value);
                    currentState++;
                }
            }
        }
        updateView(currentState)
    } else {
        resetToDefault();
    }
}

function resetToDefault() {
    currentState = 1;
    updateView(1)
}

function setResult() {
    var result = document.getElementById("result");
    result.style.display = "none";

    var shape = document.getElementById("shape");
    shape.style.display = "none";
    
    if(currentState == 3) {
        result.innerText = RESULT_TEXT + obj.area();
        result.style.display = "block";
    
        shape.style.display = "block";
        shape.setAttribute("class", "shape-item " + obj.type)
    }
}

function updateView(id) {
    setHeading(id);
    setDesc(id);
    setControls(id);
    setResult();
    setButton(id);
}

updateView(currentState);


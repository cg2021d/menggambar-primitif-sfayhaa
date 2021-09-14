function main() {
    var canvas = document.getElementById("myCanvas");
    // untuk memanipulasi gambar dan grapics di canvas
    var gl = canvas.getContext("webgl")

    //definisikan vertex-vertex 
    /**
     * Di WebGL itu rentang/skalanya 0-1 agar bisa masuk di layar
     * A (0.0, 0.5), B (0.5, -0.5), C (-0.5, -0.5)
     */
    var vertices = [
        0.5, 0.5, //titik A
        0.5, -0.5, //titik B
        -0.5, -0.5, //titik C
        -0.5, -0.5, //titik C
        -0.5, 0.5, //titik D
        0.5, 0.5, //titik A
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer((gl.ARRAY_BUFFER), positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);


    //mendefinisikan vertex
    var vertexShaderCode = `
    attribute vec2 a_Position;
    void main(){
        gl_Position = vec4(a_Position, 0.0, 1.0);
        gl_PointSize = 20.0;
    }`;

    //membuat vertex shader
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    //mendefinisikan fragmnent
    var fragmentShaderCode = `
    void main(){
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }`;

    //membuat fragment shader
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    //package program --> compile
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    //set warna background
    gl.clearColor(1.0, 1.0, 1.0, 1);
    //clear background
    gl.clear(gl.COLOR_BUFFER_BIT);

    //instruksi untuk menggambar
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}
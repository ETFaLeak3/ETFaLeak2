<script>
    import { onMount, onDestroy } from 'svelte';
  
    let canvas;
    let gl;
  
    // Fonction pour charger un fichier GLSL
    async function loadShader(url) {
      const response = await fetch(url);
      return await response.text();
    }
  
    // Initialisation WebGL et utilisation des shaders
    onMount(async () => {
      gl = canvas.getContext('webgl');
      if (!gl) {
        console.error('WebGL non supporté sur ce navigateur');
        return;
      }
  
      // Charger les shaders
      const vertexShaderSource = await loadShader('/vert.glsl');
      const fragmentShaderSource = await loadShader('/shader.glsl');
  
      // Fonction pour compiler un shader
      function compileShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error('Erreur de compilation du shader :', gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      }
  
      // Créer et compiler les shaders
      const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
  
      // Créer le programme WebGL
      const shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Erreur de lien du programme shader :', gl.getProgramInfoLog(shaderProgram));
        return;
      }
  
      gl.useProgram(shaderProgram);
  
      // Initialisation d'un cube simple (par exemple)
      const vertices = new Float32Array([
        -1.0, -1.0,  1.0,  // Front face
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
  
        -1.0, -1.0, -1.0,  // Back face
        -1.0,  1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0, -1.0, -1.0
      ]);
  
      const indices = new Uint16Array([
        0, 1, 2, 0, 2, 3,  // Front face
        4, 5, 6, 4, 6, 7,  // Back face
        0, 1, 7, 0, 7, 4,  // Bottom face
        1, 2, 6, 1, 6, 7,  // Right face
        2, 3, 5, 2, 5, 6,  // Top face
        3, 0, 4, 3, 4, 5   // Left face
      ]);
  
      // Créer les buffers de données
      const vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  
      const indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  
      // Obtenir l'emplacement des attributs et les lier
      const positionAttribLocation = gl.getAttribLocation(shaderProgram, "a_position");
      gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(positionAttribLocation);
  
      // Effacer l'écran et dessiner
      gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Couleur de fond (noir)
      gl.clear(gl.COLOR_BUFFER_BIT);
  
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    });
  
    // Nettoyage lorsque le composant est détruit
    onDestroy(() => {
      if (gl) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.flush();
      }
    });
  </script>
  
  <canvas bind:this={canvas}></canvas>
  
  <style>
    canvas {
      width: 100%;
      height: 100%;
    }
  </style>
  
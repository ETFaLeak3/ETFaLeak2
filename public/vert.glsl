// Vertex Shader (shader.vert)

precision mediump float;  // Déclaration de la précision des floats pour WebGL

attribute vec2 aPos;       // Position du sommet
attribute vec2 aTexCoords; // Coordonnées de texture

varying vec2 TexCoords; // Sortie des coordonnées de texture vers le fragment shader

void main() {
    TexCoords = aTexCoords;  // Passer les coordonnées de texture au fragment shader
    gl_Position = vec4(aPos, 0.0, 1.0); // Positionner le sommet dans les coordonnées de l'espace normalisé
}

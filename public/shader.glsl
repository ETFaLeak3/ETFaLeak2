// Fragment Shader (shader.frag)
precision mediump float;  // Déclaration de précision

uniform sampler2D screenTexture;  // Texture d'entrée
uniform vec2 u_screenSize;  // Taille de l'écran
uniform float u_glowIntensity;  // Intensité du glow
uniform float u_scanlineIntensity;  // Intensité des scanlines
uniform float u_warpIntensity;  // Intensité du warp
uniform float u_vignetteStrength;  // Force du vignette
uniform float u_chromaticAberrationStrength;  // Force de l'aberration chromatique
uniform float u_noiseIntensity;  // Intensité du bruit
uniform float u_barrelDistortion;  // Distorsion en barillet
uniform float u_colorBleedingStrength;  // Force de l'effet de saignement de couleur

varying vec2 TexCoords;  // Coordonnées de texture

// Fonction pour appliquer l'effet de scanlines
vec4 applyScanlines(vec2 uv, vec4 color) {
    float scanline = mod(uv.y * u_screenSize.y, 5.0);  // Motif des scanlines
    scanline = step(1.0, scanline);  // Étape binaire (0.0 ou 1.0)
    return mix(color, color * 0.5, scanline * u_scanlineIntensity);  // Appliquer les scanlines
}

// Fonction pour appliquer l'effet de warp (écran courbé)
vec2 applyWarp(vec2 uv) {
    vec2 center = vec2(0.5, 0.5);  // Centre de l'écran
    vec2 offset = uv - center;  // Décalage par rapport au centre
    float dist = length(offset);  // Distance par rapport au centre
    float warp = pow(dist, 2.0) * u_warpIntensity;  // Appliquer le warp basé sur la distance
    vec2 warpedUV = uv + offset * warp;  // Appliquer le warp sur les coordonnées UV

    // Restreindre les coordonnées UV à la plage [0, 1] pour éviter les échantillons hors limites
    warpedUV = clamp(warpedUV, vec2(0.0, 0.0), vec2(1.0, 1.0));  // Limiter dans l'espace valide de la texture
    return warpedUV;
}

// Fonction pour appliquer l'effet de vignette
vec4 applyVignette(vec2 uv, vec4 color) {
    float dist = max(length(uv - vec2(0.33, 0.5)), length(uv - vec2(0.66, 0.5)));  // Distance par rapport au centre
    dist *= u_vignetteStrength;
    color.rgb *= 1.0 - dist;  // Appliquer l'effet de vignette
    return color;  // Retourner la couleur modifiée
}

// Fonction pour appliquer l'effet d'aberration chromatique
vec4 applyChromaticAberration(vec2 uv, vec4 color) {
    vec2 offset = vec2(u_chromaticAberrationStrength * 0.005, 0.0);  // Décalage RGB
    vec4 aberrationColor = vec4(
        texture2D(screenTexture, uv + offset).r,  // Décalage pour le rouge
        texture2D(screenTexture, uv).g,  // Canal vert
        texture2D(screenTexture, uv - offset).b,  // Décalage pour le bleu
        1.0  // Canal alpha
    );
    return aberrationColor;
}

// Fonction pour appliquer l'effet de bruit
vec4 applyNoise(vec4 color) {
    float noise = (fract(sin(dot(TexCoords.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * u_noiseIntensity;
    color.rgb += noise;
    return color;
}

// Fonction pour appliquer la distorsion en barillet
vec2 applyBarrelDistortion(vec2 uv) {
    vec2 center = vec2(0.5, 0.5);
    vec2 offset = uv - center;
    float dist = length(offset);
    float barrelDistortion = 1.0 + u_barrelDistortion * dist * dist;
    vec2 distortedUV = center + offset * barrelDistortion;
    return clamp(distortedUV, vec2(0.0, 0.0), vec2(1.0, 1.0));
}

// Fonction pour appliquer l'effet de glow
vec4 applyGlow(vec2 uv, vec4 color) {
    // Effet glow (simuler un halo autour des zones lumineuses)
    float glow = exp(-length(uv - vec2(0.5, 0.5)) * u_glowIntensity);  // Décroissance avec la distance du centre
    return color + color * glow;  // Amplifier la couleur avec l'effet glow
}

// Fonction pour appliquer l'effet de saignement de couleur
vec4 applyColorBleeding(vec2 uv, vec4 color) {
    vec2 offset = vec2(u_colorBleedingStrength * 0.005, 0.0);  // Décalage RGB
    vec4 bleedingColor = vec4(
        texture2D(screenTexture, uv + offset).r,  // Décalage pour le rouge
        texture2D(screenTexture, uv).g,  // Canal vert
        texture2D(screenTexture, uv - offset).b,  // Décalage pour le bleu
        1.0  // Canal alpha
    );
    return bleedingColor;
}

void main() {
    vec2 uv = TexCoords;

    // Appliquer l'effet de distorsion en barillet
    uv = applyBarrelDistortion(uv);

    // Appliquer l'effet de warp
    uv = applyWarp(uv);

    // Échantillonner la texture
    vec4 color = texture2D(screenTexture, uv);

    // Appliquer l'aberration chromatique
    color = applyColorBleeding(uv, color);
    color = applyChromaticAberration(uv, color);

    // Appliquer l'effet de glow
    color = applyGlow(uv, color);

    // Appliquer l'effet de scanlines
    color = applyScanlines(uv, color);

    // Appliquer l'effet de vignette
    color = applyVignette(uv, color);

    // Appliquer l'effet de bruit
    color = applyNoise(color);

    // Retourner la couleur finale
    gl_FragColor = color;
}
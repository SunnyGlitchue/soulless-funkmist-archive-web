const scene = new THREE.Scene();
const camera = new THREE.Camera();
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('vhsCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.PlaneBufferGeometry(2, 2);
const texture = new THREE.TextureLoader().load('Blank.png');

const material = new THREE.ShaderMaterial({
  fragmentShader: `
    uniform float iTime;
    uniform vec3 iResolution;
    uniform sampler2D iChannel0;

    void main() {
      vec2 fragCoord = gl_FragCoord.xy;
      vec2 uv = fragCoord / iResolution.xy;

      float blendFactor = 0.1;
      float scanlineHeight = 4.0;
      float scanlineIntensity = 0.25;
      float scrollSpeed = 16.0;
      vec3 color = vec3(1.0);

      float grainIntensity = 2.0;
      vec2 grainSeed = vec2(12.9898, 78.233) + iTime * 0.1;

      float glitchProbability = 0.4;
      float glitchIntensityX = 0.001;
      float glitchIntensityY = 0.003;

      float bandSpeed = 0.2;
      float bandHeight = 0.01;
      float bandIntensity = 0.2;
      float bandChoppiness = 0.2;
      float staticAmount = 0.02;
      float warpFactor = 0.005;
      float chromaAmount = 0.2;

      float scanline = sin((uv.y * iResolution.y - iTime * scrollSpeed) * (1.0 / scanlineHeight));
      vec3 vhsColor = color * scanline * scanlineIntensity;

      float grain = fract(sin(dot(fragCoord * uv, grainSeed)) * 43758.5453);
      vhsColor += grain * grainIntensity;

      if (fract(iTime) < glitchProbability) {
        float glitchOffsetX = (fract(sin(iTime * 12.9898) * 43758.5453) - 0.5) * glitchIntensityX;
        float glitchOffsetY = (fract(cos(iTime * 78.233) * 43758.5453) - 0.5) * glitchIntensityY;
        uv += vec2(glitchOffsetX, glitchOffsetY);
      }

      float bandPos = fract(iTime * bandSpeed);
      float bandNoise = fract(sin(dot(uv * iResolution.xy, vec2(12.9898, 78.233))) * 43758.5453);

      if (abs(uv.y - bandPos) < bandHeight) {
        float randomStatic = bandNoise * bandChoppiness;
        vhsColor += vec3(randomStatic) * staticAmount;
        uv.x += sin(uv.y * iResolution.y * 10.0 + randomStatic) * warpFactor;

        vec3 chromaColor = vec3(
          texture2D(iChannel0, uv + vec2(chromaAmount * randomStatic, 0.0)).r,
          texture2D(iChannel0, uv).g,
          texture2D(iChannel0, uv - vec2(chromaAmount * randomStatic, 0.0)).b
        );

        float adjustedIntensity = bandIntensity * (1.0 - randomStatic);
        vhsColor = mix(vhsColor, chromaColor, adjustedIntensity);
      }

      vec3 originalColor = texture2D(iChannel0, uv).rgb;
      vec3 finalColor = mix(originalColor, vhsColor, blendFactor);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
  uniforms: {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
    iChannel0: { value: texture }
  }
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function animate(time) {
  material.uniforms.iTime.value = time * 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight, 1);
}
window.addEventListener('resize', resize);
resize();


document.addEventListener('tocameEsta', () => {
  material.uniforms.blendFactor.value = 0.2;
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('musicActivated') === 'true') {
    const music = new Audio('menuSong.mp3');
    music.loop = true;
    music.play();
  }
});
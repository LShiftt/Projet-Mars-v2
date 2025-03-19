import { camera } from "./scene";
export const setupControls = (rocket) => {
    const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
  
    document.addEventListener("keydown", (event) => {
      if (keys.hasOwnProperty(event.key)) keys[event.key] = true;
    });
  
    document.addEventListener("keyup", (event) => {
      if (keys.hasOwnProperty(event.key)) keys[event.key] = false;
    });
  
    const updateRocket = () => {
        const bounds = getRocketBounds();
        let newX = rocket.position.x;
        let newY = rocket.position.y;
        
        rocket.position.x = Math.max(bounds.xMin, Math.min(bounds.xMax, newX));
        rocket.position.y = Math.max(bounds.yMin, Math.min(bounds.yMax, newY));

      if (keys.ArrowUp) rocket.position.y += 5;
      if (keys.ArrowDown) rocket.position.y -= 5;
      if (keys.ArrowLeft) rocket.position.x -= 5;
      if (keys.ArrowRight) rocket.position.x += 5;
      requestAnimationFrame(updateRocket);
    };
    updateRocket();
  };
  
    const getRocketBounds = () => {
    const vFOV = (camera.fov * Math.PI) / 180; // Convertir en radians
    const heightAtDepth = 2 * Math.tan(vFOV / 2) * camera.position.z; // Hauteur visible à cette profondeur
    const widthAtDepth = heightAtDepth * camera.aspect; // Largeur visible à cette profondeur
  
    return {
      xMin: -widthAtDepth / 2 + 20, // Ajuste la marge pour éviter les bords
      xMax: widthAtDepth / 2 - 20,
      yMin: -heightAtDepth / 2 + 20,
      yMax: heightAtDepth / 2 - 20
    };
  };
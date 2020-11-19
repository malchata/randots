/* global registerPaint */

if (typeof registerPaint !== "undefined") {
  registerPaint("randots", class {
    static get inputProperties () {
      return [
        "--randots-tile-size",
        "--randots-color",
        "--randots-amplitude",
        "--randots-max-opacity",
        "--randots-blend-mode"
      ];
    }

    paint (ctx, geom, properties) {
      // Custom properties
      const tileSize = parseInt(properties.get("--randots-tile-size")) || 8;
      const color = properties.get("--randots-color").toString().trim() || "#6369d1";
      const amplitude = parseFloat(properties.get("--randots-amplitude")) || 2.25;
      const maxOpacity = parseFloat(properties.get("--randots-max-opacity")) || 1.0;
      const blendMode = properties.get("--randots-blend-mode").toString().trim() || "multiply";

      // Some stuff we need
      const fullCircle = Math.PI * 2;
      const xTiles = geom.width / tileSize;
      const yTiles = geom.height / tileSize;

      ctx.fillStyle = color;
      ctx.globalCompositeOperation = blendMode;

      for (let y = 0; y < yTiles; y++) {
        const yOffset = y * tileSize;

        for (let x = 0; x < xTiles; x++) {
          const opacity = Math.random() % Math.random();

          ctx.globalAlpha = opacity > maxOpacity ? maxOpacity : opacity;
          ctx.beginPath();
          ctx.arc(x * tileSize, yOffset, tileSize * Math.random() * amplitude, 0, fullCircle);
          ctx.fill();
        }
      }
    }
  });
}

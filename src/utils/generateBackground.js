import { createCanvas, loadImage } from 'canvas';
import sharp from 'sharp';
import fs from 'fs';

const CONFIG = {
    svgPath: '../../public/icons/w_pizza.svg', // ../../public/icons/pizza.svg
    outputPath: './w_pizzaBackground.png', // ./pizzaBackground.png
    rows: 4,
    columns: 20,
    tileWidth: 60,
    tileHeight: 60,
    rotationRange: [0, 360],
    backgroundColor: '#030712', // #ffffff
    outputScale: 2,
    svgRenderScale: 3,
    quality: 100
};

async function generatePattern() {
    try {
        if (!fs.existsSync(CONFIG.svgPath)) {
            throw new Error(`SVG file not found: ${CONFIG.svgPath}`);
        }
        const svgBuffer = fs.readFileSync(CONFIG.svgPath);
        const pngBuffer = await sharp(svgBuffer)
            .resize(
                Math.floor(CONFIG.tileWidth * CONFIG.svgRenderScale), 
                Math.floor(CONFIG.tileHeight * CONFIG.svgRenderScale),
                {
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                }
            )
            .png({
                compressionLevel: 0,
                quality: 100,
                force: true
            })
            .toBuffer();
        const outputWidth = (CONFIG.columns * CONFIG.tileWidth) * CONFIG.outputScale;
        const outputHeight = (CONFIG.rows * CONFIG.tileHeight) * CONFIG.outputScale;
        const canvas = createCanvas(outputWidth, outputHeight);
        const ctx = canvas.getContext('2d');
        ctx.quality = 'best';
        ctx.patternQuality = 'best';
        ctx.filter = 'best';
        ctx.fillStyle = CONFIG.backgroundColor;
        ctx.fillRect(0, 0, outputWidth, outputHeight);
        const tileImage = await loadImage(pngBuffer);
        const scaledTileWidth = CONFIG.tileWidth * CONFIG.outputScale;
        const scaledTileHeight = CONFIG.tileHeight * CONFIG.outputScale;
        for (let row = 0; row < CONFIG.rows; row++) {
            for (let col = 0; col < CONFIG.columns; col++) {
                const x = col * scaledTileWidth;
                const y = row * scaledTileHeight;
                const rotation = Math.random() * 
                    (CONFIG.rotationRange[1] - CONFIG.rotationRange[0]) + 
                    CONFIG.rotationRange[0];
                ctx.save();
                const centerX = x + scaledTileWidth / 2;
                const centerY = y + scaledTileHeight / 2;
                ctx.translate(centerX, centerY);
                ctx.rotate((rotation * Math.PI) / 180);
                const drawX = -scaledTileWidth / 2;
                const drawY = -scaledTileHeight / 2;
                ctx.drawImage(
                    tileImage, 
                    drawX, 
                    drawY, 
                    scaledTileWidth, 
                    scaledTileHeight
                );
                ctx.restore();
                const totalTiles = CONFIG.rows * CONFIG.columns;
                const currentTile = row * CONFIG.columns + col + 1;
            }
        }
        const buffer = canvas.toBuffer('image/png', {
            compressionLevel: 0,
            filters: canvas.PNG_FILTER_NONE,
            resolution: 300 * CONFIG.outputScale
        });
        fs.writeFileSync(CONFIG.outputPath, buffer);
    } catch (error) {
        console.error('Error generating pattern:', error.message);
        process.exit(1);
    }
}

generatePattern();
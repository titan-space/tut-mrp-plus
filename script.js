// Initialize AOS and hide preloader on window load
window.addEventListener('load', () => { 
  document.getElementById('preloader').style.display='none'; 
  AOS.init({ duration:1000, once:true }); 
});

// Starfield animation class
class Starfield {
  constructor(canvas, speed, count, color) {
    this.canvas = canvas; 
    this.ctx = canvas.getContext('2d'); 
    this.speed = speed; 
    this.count = count; 
    this.color = color;
    this.stars = [];
    this.resize(); 
    window.addEventListener('resize', () => this.resize());
    this.initStars(); 
    this.animate();
  }
  
  resize() { 
    this.canvas.width = window.innerWidth; 
    this.canvas.height = window.innerHeight; 
  }
  
  initStars() { 
    this.stars = Array(this.count).fill().map(() => ({ 
      x: Math.random()*this.canvas.width, 
      y: Math.random()*this.canvas.height, 
      size: Math.random()*1.2+0.1 
    })); 
  }
  
  draw() { 
    const ctx = this.ctx; 
    ctx.clearRect(0,0,this.canvas.width,this.canvas.height); 
    ctx.fillStyle=this.color; 
    this.stars.forEach(s=>ctx.fillRect(s.x, s.y, s.size, s.size)); 
  }
  
  update() { 
    this.stars.forEach(s => { 
      s.y += this.speed; 
      if (s.y > this.canvas.height) s.y = 0; 
    }); 
  }
  
  animate() { 
    this.update(); 
    this.draw(); 
    requestAnimationFrame(()=>this.animate()); 
  }
}

// Create starfield layers
new Starfield(document.getElementById('stars'), 0.15, 200, 'rgba(255,255,255,0.3)');
new Starfield(document.getElementById('stars2'), 0.3, 150, 'rgba(255,255,255,0.2)');
new Starfield(document.getElementById('stars3'), 0.6, 100, 'rgba(255,255,255,0.1)');
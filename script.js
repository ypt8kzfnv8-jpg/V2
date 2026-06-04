* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 255, 136, 0.4);
}

body {
    background: #0a0a0a;
    color: #fff;
    font-family: -apple-system, Arial, sans-serif;
    padding: 15px;
    min-height: 100vh;
}

h1 {
    text-align: center;
    color: #00ff88;
    font-size: 2.4rem;
    margin: 25px 0;
    text-shadow: 0 0 15px #00ff88;
}

.box {
    background: #1e1e1e;
    border-radius: 18px;
    padding: 22px;
    margin-bottom: 20px;
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.5);
}

h2 {
    color: #00ff88;
    font-size: 1.4rem;
    margin-bottom: 15px;
}

input {
    width: 100%;
    padding: 16px;
    margin: 10px 0 15px;
    border: none;
    border-radius: 12px;
    background: #2b2b2b;
    color: #fff;
    font-size: 1.1rem;
}

input:focus {
    outline: 3px solid #00ff88;
}

button {
    width: 100%;
    padding: 18px;
    margin: 12px 0;
    border: none;
    border-radius: 12px;
    font-size: 1.15rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
}

button:active {
    transform: scale(0.95);
    filter: brightness(0.85);
}

.verde { background: #00c853; }
.azul { background: #2962ff; }
.naranja { background: #ff6d00; }
.morado { background: #7b1fa2; }
.rojo { background: #d50000; }

#resultado {
    margin-top: 15px;
    padding: 16px;
    border-radius: 12px;
    min-height: 60px;
}

.fila {
    background: #292929;
    padding: 15px;
    border-radius: 12px;
    margin: 8px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.disp { color: #00ff88; font-weight: bold; }
.usado { color: #ff5252; font-weight: bold; }

/* Estilos adicionales */
.ejemplo-texto {
    font-size: 0.85rem;
    opacity: 0.7;
    margin-top: -10px;
    margin-bottom: 10px;
    display: block;
}

.acciones {
    display: flex;
    gap: 8px;
    align-items: center;
}

.btn-icono {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: none;
    background: #383838;
    color: #fff;
    cursor: pointer;
    transition: 0.2s;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-icono:hover { background: #505050; }
.qr-icono { color: #00ff88; }
.borrar-icono { color: #ff5252; }

.modal {
    display: none;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.92);
    padding-top: 60px;
}

.modal-contenido {
    background: #1e1e1e;
    margin: auto;
    padding: 25px;
    border: 2px solid #00ff88;
    width: 90%;
    max-width: 320px;
    border-radius: 18px;
    text-align: center;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
}

.cerrar {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    margin-top: -15px;
    margin-right: -10px;
}

.cerrar:hover { color: #00ff88; }

#camaraContainer {
    display: none;
    margin-top: 15px;
    position: relative;
    padding: 5px;
    border-radius: 12px;
    background: #222;
}

#video { width: 100%; border-radius: 8px; }
#canvas { display: none; }

.btn-descargar {
    background: #00c853;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 8px;
    margin-top: 15px;
    cursor: pointer;
    font-weight: bold;
    width: auto;
}

.btn-descargar:hover { background: #009640; }

/* Tutorial */
.tutorial {
    background-color: #2a2a2a;
    border: 1px dashed #00ff88;
    border-radius: 12px;
    padding: 12px;
    margin-bottom: 15px;
    font-size: 0.85rem;
    line-height: 1.5;
    color: #ccc;
}

.tutorial b { color: #00ff88; }
// ==============================================
// SISTEMA DE GESTIÓN DE CÓDIGOS - TECNO GAME
// ARCHIVO JAVASCRIPT COMPLETO - VERSIÓN 2.0
// DESARROLLO COMPLETO Y FUNCIONAL
// ==============================================

// VARIABLES GLOBALES Y ALMACENAMIENTO
let codigos = JSON.parse(localStorage.getItem('tecnoGameCodigos')) || {'TG-1001': 'Disponible'};
let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let escaneoActivo = false;
let streamActual = null;

// FUNCIÓN PRINCIPAL DE GUARDADO EN ALMACENAMIENTO LOCAL
function guardarEnStorage() {
    localStorage.setItem('tecnoGameCodigos', JSON.stringify(codigos));
    console.log('Datos guardados correctamente en la base local');
}

// FUNCIÓN PARA ACTUALIZAR LA VISTA COMPLETA Y LA LISTA DE ELEMENTOS
function actualizarVista() {
    const lista = document.getElementById("lista");
    const contador = document.getElementById("contador");
    lista.innerHTML = "";
    contador.textContent = Object.keys(codigos).length;
    
    // VERIFICACIÓN DE CONTENIDO VACÍO
    if (Object.keys(codigos).length === 0) {
        lista.innerHTML = `<p style="text-align:center;opacity:0.7;padding:30px;">Aún no hay códigos guardados en el sistema</p>`;
        return;
    }

    // RECORRIDO COMPLETO DE TODOS LOS CÓDIGOS REGISTRADOS
    for (const c in codigos) {
        lista.innerHTML += `
        <div class="fila">
            <b>${c}</b>
            <div style="display:flex;align-items:center;gap:12px;">
                <span class="${codigos[c]==='Disponible' ? 'disp' : 'usado'}">${codigos[c]}</span>
                <div class="acciones">
                    <button class="btn-icono qr-icono" onclick="generarQR('${c}')" title="Ver y descargar código QR">📷</button>
                    <button class="btn-icono borrar-icono" onclick="eliminarCodigo('${c}')" title="Eliminar este registro">🗑️</button>
                </div>
            </div>
        </div>`;
    }
    console.log('Vista actualizada correctamente');
}

// FUNCIÓN PARA CREAR Y REGISTRAR UN NUEVO CÓDIGO
function guardar() {
    const v = document.getElementById("codNuevo").value.trim().toUpperCase();
    if (!v) {
        alert("⚠️ Por favor ingresa un código válido");
        return;
    }
    if (codigos[v]) {
        alert("⚠️ Este código ya existe en el sistema");
        return;
    }
    
    codigos[v] = "Disponible";
    guardarEnStorage();
    document.getElementById("codNuevo").value = "";
    actualizarVista();
    alert("✅ Código guardado exitosamente en la base de datos");
}

// FUNCIÓN DE BÚSQUEDA Y CONSULTA
function buscar() {
    const v = document.getElementById("codBuscar").value.trim().toUpperCase();
    const r = document.getElementById("resultado");
    if (!v) {
        r.textContent = "⚠️ Ingresa un código para realizar la búsqueda";
        r.style.background = "#503800";
        return;
    }
    if (codigos[v]) {
        r.textContent = `Estado actual: ${codigos[v]}`;
        r.style.background = codigos[v] === "Disponible" ? "#005c31" : "#503800";
    } else {
        r.textContent = "❌ Código no encontrado en el registro";
        r.style.background = "#503800";
    }
}

// FUNCIÓN PARA MARCAR COMO UTILIZADO
function marcarUsado() {
    const v = document.getElementById("codBuscar").value.trim().toUpperCase();
    if (!codigos[v]) {
        alert("❌ El código ingresado no existe");
        return;
    }
    if (codigos[v] === "Usado") {
        alert("ℹ️ Este código ya fue marcado como utilizado anteriormente");
        return;
    }
    
    if (confirm(`¿Estás seguro de marcar el código ${v} como USADO? Esta acción es importante para el control`)) {
        codigos[v] = "Usado";
        guardarEnStorage();
        buscar();
        actualizarVista();
        alert("✅ Cambio de estado realizado correctamente");
    }
}

// FUNCIÓN DE ELIMINACIÓN DE REGISTRO
function eliminarCodigo(cod) {
    if(confirm(`🗑️ ATENCIÓN: Vas a eliminar definitivamente el código:\n${cod}\n\nEsta acción no se puede deshacer. ¿Continuar?`)){
        delete codigos[cod];
        guardarEnStorage();
        actualizarVista();
        alert("✅ Eliminación completada exitosamente");
    }
}

// ✅ FUNCIÓN MODIFICADA: GENERADOR DE QR CON BOTÓN ARRIBA Y VISIÓN PREVIA
function generarQR(texto) {
    const modal = document.getElementById("modalQR");
    const contenedor = document.getElementById("qrcode");
    const enlaceDescarga = document.getElementById("descargarQR");
    
    contenedor.innerHTML = "";
    modal.style.display = "block";

    // CONFIGURACIÓN COMPLETA DE GENERACIÓN
    QRCode.toCanvas(contenedor, texto, { 
        width: 240, 
        height: 240,
        color: { 
            dark: '#00ff88', 
            light: '#0a0a0a' 
        },
        margin: 2,
        scale: 4,
        errorCorrectionLevel: 'H'
    }, function (error, canvasQR) {
        if (error) {
            alert("❌ Error en la generación del código: " + error);
            return;
        }
        // PREPARACIÓN DE LA DESCARGA PARA EL BOTÓN SUPERIOR
        enlaceDescarga.href = canvasQR.toDataURL("image/png");
        console.log('Código QR generado y listo para guardar');
    });
}

// FUNCIÓN PARA CERRAR VENTANA MODAL
function cerrarModal() {
    document.getElementById("modalQR").style.display = "none";
}

// SISTEMA DE ESCANEO CON CÁMARA
function activarEscaner() {
    const contenedor = document.getElementById("camaraContainer");
    const r = document.getElementById("resultado");
    contenedor.style.display = "block";
    r.innerHTML = "";
    escaneoActivo = true;

    // ACCESO A DISPOSITIVO DE CÁMARA
    navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"},audio:false})
    .then(stream => {
        video.srcObject = stream;
        streamActual = stream;
        video.play();
        requestAnimationFrame(escanearLoop);
    })
    .catch(e => {
        alert("❌ No se pudo acceder a la cámara del dispositivo");
        console.error("Error de cámara:", e);
    });
}

// BUCLE PRINCIPAL DE LECTURA DE IMAGEN
function escanearLoop() {
    if(video.readyState === video.HAVE_ENOUGH_DATA && escaneoActivo){
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        let codigoQR = jsQR(ctx.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height);
        if(codigoQR){
            procesarEscaneo(codigoQR.data.trim().toUpperCase());
            return;
        }
    }
    if(escaneoActivo) requestAnimationFrame(escanearLoop);
}

// PROCESAMIENTO DE DATOS ESCANEADOS
function procesarEscaneo(valor) {
    const r = document.getElementById("resultado");
    if(codigos[valor]){
        r.innerHTML = codigos[valor]==="Disponible" ? `✅ DISPONIBLE: ${valor}` : `⚠️ USADO: ${valor}`;
        r.style.background = codigos[valor]==="Disponible" ? "#005c31" : "#503800";
    } else {
        r.innerHTML = `❌ NO REGISTRADO: ${valor}`;
        r.style.background = "#503800";
    }
    cerrarEscaner();
}

// FUNCIÓN DE CIERRE Y LIBERACIÓN DE RECURSOS
function cerrarEscaner() {
    escaneoActivo = false;
    document.getElementById("camaraContainer").style.display = "none";
    if(streamActual) {
        streamActual.getTracks().forEach(track => track.stop());
        streamActual = null;
    }
}

// CIERRE DE MODAL AL CLICAR FUERA
window.onclick = function(e) {
    const m = document.getElementById("modalQR");
    if(e.target === m) {
        m.style.display = "none";
    }
};

// INICIALIZACIÓN DEL SISTEMA AL CARGAR
window.onload = function() {
    actualizarVista();
    console.log('Sistema Tecno Game cargado completamente');
};

// ==============================================
// FIN DEL ARCHIVO JAVASCRIPT
// ==============================================
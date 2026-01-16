// fuinha.js \\
console.log("Sistema de telemetria Fuinha iniciado...");

fetch('http://192.168.1.2:5000/log', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        url: window.location.href,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString()
    })
})
.then(response => console.log("Log enviado com sucesso!"))
.catch(err => console.log("Erro ao enviar log:", err));

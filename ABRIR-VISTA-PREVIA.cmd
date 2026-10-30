@echo off
cd /d "%~dp0"
echo Abre http://127.0.0.1:8768 en tu navegador.
echo Deja esta ventana abierta mientras revisas la pagina.
python -m http.server 8768 --bind 127.0.0.1 --directory dist
pause

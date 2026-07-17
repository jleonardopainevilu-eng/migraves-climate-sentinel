# Subir MigrAves a GitHub desde Android

1. Descomprime `MigrAves_Climate_Sentinel_v3.zip` en el teléfono.
2. En GitHub, crea un repositorio público llamado `migraves-climate-sentinel`.
3. No agregues un README automático, porque el proyecto ya lo incluye.
4. En el repositorio, usa **Add file -> Upload files**.
5. Sube el contenido dentro de la carpeta `migraves-ai`.
6. Verifica que `index.html`, `app.js`, `api/`, `data/` y `README.md` aparezcan directamente en la raíz.
7. Mensaje de commit sugerido: `Crear MVP MigrAves Climate Sentinel`.
8. En Vercel, usa **Add New -> Project** e importa el repositorio.
9. Agrega `OPENAI_API_KEY` en **Settings -> Environment Variables**.
10. Opcionalmente agrega `OPENAI_MODEL=gpt-5.6-terra`.
11. Ejecuta un nuevo despliegue.

## No subir a GitHub

- `.env.local`
- claves API
- imágenes sensibles con coordenadas de nidos o especies vulnerables
- datos personales de revisores sin autorización

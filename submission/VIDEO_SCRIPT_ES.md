# Guion de video - máximo 3 minutos

## 0:00-0:22 - Problema

"El cambio climático se mide con estaciones, satélites y sensores. Pero la vida también responde. Las aves migratorias dependen de temperatura, viento, lluvias, alimento y humedales sincronizados. Hoy muchas observaciones quedan aisladas en imágenes, planillas o informes que no comparten un mismo formato."

## 0:22-0:43 - Propuesta

"MigrAves Climate Sentinel convierte esa respuesta biológica en datos trazables. No pretende demostrar cambio climático con una sola imagen. Crea registros estandarizados que pueden acumularse, revisarse y utilizarse en estudios futuros."

## 0:43-1:12 - Crear el área

1. Mostrar las tres áreas piloto: Chamiza, Maullín y Chiloé.
2. Abrir el formulario Nueva Área Bioclimática.
3. Mostrar nombre, código, ecosistema, coordenadas, radio, especies, línea base y acceso.
4. Crear un área o volver a seleccionar Chamiza.

Narración:
"Primero creamos una Área Bioclimática Migratoria, o ABM. Cada área conserva su ecosistema, ubicación, especies prioritarias, referencia histórica, responsables y reglas de acceso."

## 1:12-1:48 - Generar el dato

1. Cargar la simulación de Chamiza.
2. Mostrar imagen y sensores etiquetados como simulados.
3. Ejecutar Generar RBM e IRBC.
4. Mostrar código RBM, conteo, confianza e IRBC.
5. Mostrar los cuatro componentes: fenología, abundancia, hábitat y meteorología.
6. Mostrar detecciones y vista previa JSON.

Narración:
"GPT-5.6 recibe la imagen y el contexto del área. Structured Outputs entrega conteos estimados, identificación tentativa, conductas observables, comparación histórica, limitaciones y acciones recomendadas. Luego MigrAves genera un Registro Bioclimático Migratorio y un índice experimental separado en cuatro componentes."

## 1:48-2:15 - Validación humana

1. Ingresar nombre del revisor.
2. Seleccionar Estudiante y confirmar para alcanzar N3.
3. Mostrar que N4 solo está disponible con rol Biólogo o Científico.
4. Corregir un taxón o validar N4 con el rol correspondiente.

Narración:
"La IA no reemplaza al biólogo. Un estudiante o técnico puede confirmar o corregir el registro. Solo una validación profesional explícita alcanza nivel N4. Cada corrección queda vinculada al dato."

## 2:15-2:38 - Entrega para estudios

1. Exportar CSV.
2. Exportar JSON.
3. Exportar GeoJSON.
4. Mostrar el registro local acumulado.

Narración:
"El resultado puede descargarse para análisis estadístico, integración de software o mapas. Las coordenadas se generalizan si el área contiene información sensible."

## 2:38-2:53 - Tecnología y Codex

"La aplicación es móvil, bilingüe y usa una función segura de Vercel para no exponer la clave. Codex se utilizó para construir el flujo completo, los esquemas de datos, las guardas científicas, las pruebas y la documentación."

## 2:53-3:00 - Cierre

"Las estaciones miden la atmósfera. MigrAves registra cómo la vida está respondiendo."

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle

output = 'static/downloads/guategeeks/curiosity-evaluacion.pdf'
criteria = [
    ('Seguridad y orden de trabajo', 'Aplica el checklist sin apoyo y detiene el trabajo ante riesgos.', 'Cumple el checklist y mantiene el espacio seguro.', 'Cumple con recordatorios.', 'Requiere supervision constante.'),
    ('Calidad mecanica', 'Detecta y corrige defectos de encaje antes de probar.', 'Robot armado y funcional, con orugas libres.', 'Funciona con roce o desalineacion.', 'El armado impide funcionar.'),
    ('Cableado y documentacion electrica', 'Diagnostica y documenta fallas con autonomia.', 'Cableado correcto y continuidad verificada.', 'Funciona sin documentar ni verificar.', 'Presenta errores que no logra localizar.'),
    ('Programacion y comprension', 'Modifica, predice y justifica la logica del codigo.', 'Carga, modifica y explica los parametros.', 'Carga el codigo sin explicar los cambios.', 'No consigue cargar ni modificar el codigo.'),
    ('Pruebas y uso de evidencia', 'Disena ensayos, analiza error y decide con datos.', 'Registra datos y justifica una decision.', 'Recoge datos sin analizarlos.', 'No documenta pruebas.'),
    ('Reto autonomo', 'Completa la mision y registra el desempeno.', 'Opera de forma autonoma con atrapamientos breves.', 'Opera menos tiempo o supera el limite.', 'No logra operar de forma autonoma.'),
    ('Comunicacion del proyecto', 'Explica decisiones con datos y responde preguntas tecnicas.', 'Presenta y responde la mayoria de preguntas.', 'Presenta de forma incompleta.', 'No logra explicar el proyecto.'),
]

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='Small', parent=styles['BodyText'], fontSize=7.2, leading=8.5))
styles.add(ParagraphStyle(name='Tiny', parent=styles['BodyText'], fontSize=6.4, leading=7.4))
doc = SimpleDocTemplate(output, pagesize=letter, rightMargin=0.35*inch, leftMargin=0.35*inch, topMargin=0.35*inch, bottomMargin=0.35*inch)
story = [Paragraph('Curiosity - Tabla de evaluacion del programa', styles['Title']), Paragraph('Nombre del estudiante/equipo: ____________________________________   Grado: __________', styles['BodyText']), Paragraph('Fecha: __________________   Docente: ______________________________________________', styles['BodyText']), Spacer(1, 12)]
data = [[Paragraph('<b>Criterio</b>', styles['Small']), Paragraph('<b>4 - Sobresaliente</b>', styles['Small']), Paragraph('<b>3 - Logrado</b>', styles['Small']), Paragraph('<b>2 - En proceso</b>', styles['Small']), Paragraph('<b>1 - Inicial</b>', styles['Small']), Paragraph('<b>Nivel</b>', styles['Small'])]]
for row in criteria:
    data.append([Paragraph(f'<b>{row[0]}</b>', styles['Tiny']), *[Paragraph(value, styles['Tiny']) for value in row[1:]], '____'])
table = Table(data, colWidths=[1.18*inch, 1.38*inch, 1.38*inch, 1.38*inch, 1.38*inch, 0.45*inch], repeatRows=1)
table.setStyle(TableStyle([('BACKGROUND', (0,0), (-1,0), colors.HexColor('#ef8556')), ('TEXTCOLOR', (0,0), (-1,0), colors.white), ('GRID', (0,0), (-1,-1), 0.35, colors.HexColor('#b8bec7')), ('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 4), ('RIGHTPADDING', (0,0), (-1,-1), 4), ('TOPPADDING', (0,0), (-1,-1), 5), ('BOTTOMPADDING', (0,0), (-1,-1), 5)]))
story += [table, Spacer(1, 14), Paragraph('<b>Puntaje total:</b> __________ / 100', styles['BodyText']), Spacer(1, 10), Paragraph('<b>Observaciones:</b>', styles['BodyText']), Spacer(1, 8), Paragraph('________________________________________________________________________________', styles['BodyText']), Paragraph('________________________________________________________________________________', styles['BodyText']), Paragraph('________________________________________________________________________________', styles['BodyText']), Spacer(1, 20), Paragraph('Firma del docente: ____________________________________', styles['BodyText']), Spacer(1, 12), Paragraph('Escala: 4 = Sobresaliente - 3 = Logrado - 2 = En proceso - 1 = Inicial. Use la evidencia producida durante las sesiones para justificar el nivel.', styles['Small'])]
doc.build(story)

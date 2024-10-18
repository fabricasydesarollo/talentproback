const dataDescriptores = [
    {
        "descripcion": "Ejecuta las acciones señaladas en pro de conseguir los resultados previstos."
    },
    {
        "descripcion": "Esta constantemente buscando mecanismos para mejorar."
    },
    {
        "descripcion": "Propone pequeñas modificaciones en su ámbito de responsabilidad específico."
    }, {
        "descripcion": "Sus tiempos de respuesta frente a las demandas cambiantes del medio son adecuados."
    }, {
        "descripcion": "Comprende y acepta los cambios organizacionales que impactan su área de trabajo."
    },
    {
        "descripcion": "Colabora y coopera con los demás. Comparte información y mantiene a sus pares al tanto de sus avances."
    },
    {
        "descripcion": "Promueve un buen ambiente de trabajo con sus compañeros."
    },
    {
        "descripcion": "Responde ágilmente ante las urgencias y demandas que se presentan en su día a día."
    },
    {
        "descripcion": "Comprende los objetivos de su área y el impacto de su rol en los mismos."
    },
    {
        "descripcion": "Aplica y pone a disposición del área su conocimiento y experiencia para facilitar la consecución de objetivos."
    },
    {
        "descripcion": "Entrega resultados en los tiempos estipulados siguiendo los lineamientos de sus lideres."
    },
    {
        "descripcion": "Sigue la metodología y procedimientos a fin de garantizar un adecuado control de las actividades y recursos. "
    },
    {
        "descripcion": "Tiene claridad de las actividades que realizará durante el día y organiza su tiempo para cumplirlas."
    },
    {
        "descripcion": "Finaliza con éxito las tareas que inicia."
    },
    {
        "descripcion": "Cumple con los objetivos encomendados y realiza tareas adicionales que puedan mejorar su labor."
    },
    {
        "descripcion": "Se muestra responsable y cuidadoso de los recursos materiales asignados por la organización para el buen desempeño de su labor."
    },
    {
        "descripcion": "Consigue los resultados previstos."
    },
    {
        "descripcion": "Es eficiente en el uso de los recursos."
    },
    {
        "descripcion": "Esta constantemente buscando mecanismos para mejorar."
    },
    {
        "descripcion": "Hace seguimiento y confirma el grado de aceptación del cambio al interior de su equipo."
    },
    {
        "descripcion": "Logra involucrar al equipo de trabajo en los procesos de cambio de la compañía de manera efectiva."
    },
    {
        "descripcion": "Genera cambios en su área, logrando aportar con ellos al funcionamiento global de la compañía."
    },
    {
        "descripcion": "Promueve la colaboración entre equipos."
    },
    {
        "descripcion": "Mantiene una actitud abierta para aprender de los otros."
    },
    {
        "descripcion": "Solicita de manera respetuosa opinión de los miembros de su equipo, valorando las contribuciones ajenas, aun cuando se le planteen diferentes puntos de vista."
    },
    {
        "descripcion": "Comunica a su equipo de trabajo información relevante acerca de los objetivos de la empresa."
    },
    {
        "descripcion": "Define estándares de servicio para su equipo de trabajo requeridos según las necesidades de las diferentes áreas de la organización."
    },
    {
        "descripcion": "Asume las responsabilidades por los servicios ofrecidos por el equipo que lidera, según los estándares definidos."
    },
    {
        "descripcion": "Hace observaciones a su equipo de trabajo que permiten realizar ajustes oportunos a los procesos."
    },
    {
        "descripcion": "Realiza ajustes oportunos a los procesos de su área teniendo en cuenta el seguimiento, organizando aquellos aspectos que no se ajusten a lo planificado."
    },
    {
        "descripcion": "Aplica metodologías y procedimientos que permiten garantizar un adecuado control de las actividades y recursos para su trabajo y el de su equipo.  "
    },
    {
        "descripcion": "Promueve en su equipo de trabajo la constancia, perseverancia y compromiso con respecto a los objetivos asignados por la organización."
    },
    {
        "descripcion": "Realiza sus tareas tomando en consideración el objetivo que tienen y orientando su desempeño a la consecución de éste. "
    },
    {
        "descripcion": "Asume y acepta las responsabilidades de su rol y lleva a su equipo al mismo nivel de responsabilidad."
    },
    {
        "descripcion": "Asume metas desafiantes y se orienta a la mejora de sus niveles de rendimiento en el marco de las estrategias de la organización."
    },
    {
        "descripcion": "Modifica métodos de trabajo con el propósito de lograr mejoras en el rendimiento propio y el de toda la organización, encontrando formas más eficientes de hacer las cosas."
    },
    {
        "descripcion": "Planea sus metas con base a criterios rentables costo-beneficio. Periódicamente, revisa el cumplimiento de los objetivos y el desempeño propio y de sus colaboradores a través de indicadores de gestión."
    },
    {
        "descripcion": "Sus estrategias de trabajo se orientan a superar los objetivos propuestos por la organización. "
    },
    {
        "descripcion": "Implementa estrategias para la realización de seguimiento a los cambios de la organización."
    },
    {
        "descripcion": "Hace una adecuada interpretación de los cambios producidos en el entorno, logrando comprenderlos y comunicarlos de manera efectiva a los miembros de su equipo."
    },
    {
        "descripcion": "Involucra a su equipo en el cambio ayudando a superar las dificultades asociadas al proceso. "
    },
    {
        "descripcion": "Desde la estrategia ayuda a establecer la dirección adecuada del cambio organizativo. "
    },
    {
        "descripcion": "Es un referente al interior de la organización en el manejo de equipos de trabajo."
    },
    {
        "descripcion": "Prioriza los objetivos organizacionales de largo plazo sobre los propios o los de grupo en el corto plazo."
    },
    {
        "descripcion": "Apoya el desempeño de otras áreas de la compañía y fomenta el intercambio de información y experiencias."
    },
    {
        "descripcion": "Genera proactivamente planes de acción para garantizar el cumplimiento de los objetivos de la organización."
    },
    {
        "descripcion": "Integra las distintas prioridades de las áreas funcionales y negocios en la generación de una única estrategia."
    },
    {
        "descripcion": "Utiliza indicadores de gestión para monitorear el cumplimiento de metas de su equipo y realizar los ajustes necesarios para su mejora."
    },
    {
        "descripcion": "Identifica oportunidades para la compañía, mediante el análisis y desarrollo de oportunidades del mercado que permitan alcanzar la visión corporativa. "
    },
    {
        "descripcion": "Anticipa las necesidades de los clientes con el objetivo de elevar y fortalecer la cultura de servicio."
    },
    {
        "descripcion": "Hace trazabilidad de los procesos de la organización e identifica oportunidades de mejora en ellos."
    },
    {
        "descripcion": "Define y dirige procesos de trabajo de manera efectiva, enfocándose a realizar uso racional de los recursos implicados. "
    },
    {
        "descripcion": "Toma decisiones de forma oportuna con respecto a los ajustes en sus procesos, teniendo en cuenta el seguimiento, organizando aquellos aspectos que no se ajusten a lo planificado."
    },
    {
        "descripcion": "Es constante con sus objetivos y se enfoca en ellos a pesar de posibles distracciones e impedimentos externos dedicando toda su atención y esfuerzos al logro de estos."
    },
    {
        "descripcion": "Acepta la responsabilidad sobre los resultados de su área y su organización, incluso cuando son negativos, y crea estrategias para cumplir con los objetivos."
    },
    {
        "descripcion": "Sus estrategias de seguimiento a los objetivos garantizan el cumplimiento de los resultados a nivel de la organización."
    },
    {
        "descripcion": "Ofrece información útil a sus grupos de interés y presta una atención grata y amable, haciendo seguimiento a su satisfacción."
    },
    {
        "descripcion": "Soluciona los problemas de sus grupos de interés con rapidez, comprometiéndose personalmente en su resolución."
    },
    {
        "descripcion": "Actúa oportunamente en los procesos transversales en los que participa, a fin de optimizar los tiempos de respuesta a requerimientos internos y externos."
    },
    {
        "descripcion": "Busca oportunidades de aprendizaje para su desarrollo y el aporte a los resultados a su cargo."
    },
    {
        "descripcion": "Participa en grupos de trabajo con el fin de compartir y adquirir conocimientos que optimicen la consecución de los resultados."
    },
    {
        "descripcion": "Impulsa, construye y mantiene redes de relaciones con clientes y compañeros de trabajo, encontrando puntos en común que vayan encaminados al cumplimiento de los resultados."
    },
    {
        "descripcion": "Llega a acuerdos con los diferentes actores de la cadena de valor, manteniendo claridad en la oferta de valor presentada, desde el inicio hasta el final."
    },
    {
        "descripcion": "Toma medidas inmediatas para superar los obstáculos presentados en el día a día."
    },
    {
        "descripcion": "Utiliza sistemas de medición prácticos para evidenciar la consecución de sus resultados."
    },
    {
        "descripcion": "Actúa con constancia y firmeza hasta lograr los objetivos de corto plazo con un nivel de calidad y eficiencia adecuado."
    },
    {
        "descripcion": "Demuestra método y orden en el manejo de datos o información específica."
    },
    {
        "descripcion": "Aporta profundidad a los análisis de información en los que interviene."
    },
    {
        "descripcion": "Identifica, recolecta y comparte información clave, con el fin de garantizar eficiencia en los servicios prestados por la organización."
    },
    {
        "descripcion": "Ofrece un servicio oportuno y de calidad a sus grupos de interés, buscando siempre la satisfacción de sus necesidades."
    },
    {
        "descripcion": "Mantiene una actitud constante y genuina de servicio, demostrando amabilidad, respeto y cordialidad a sus grupos de interés."
    },
    {
        "descripcion": "Mantiene actualizados a sus grupos de interés con relación a los asuntos en curso y responde a sus preguntas, quejas o problemas."
    },
    {
        "descripcion": "Utiliza diferentes fuentes de información para adquirir conocimiento, que genere valor en sus actividades diarias."
    },
    {
        "descripcion": "Comparte su conocimiento con otros de forma espontánea."
    },
    {
        "descripcion": "Actúa de manera eficiente, entendiendo cómo el cumplimiento de sus actividades impacta en las diferentes áreas."
    },
    {
        "descripcion": "Asume apropiadamente su responsabilidad y participa con otros para el logro del resultado."
    },
    {
        "descripcion": "Lleva a cabo las actividades bajo su responsabilidad en los tiempos acordados y con la calidad esperada."
    },
    {
        "descripcion": "Ve posibilidades de actuación aún en situaciones negativas y trabaja con constancia para conseguir los objetivos planteados."
    },
    {
        "descripcion": "Presenta soluciones y alternativas, manteniendo el foco en el resultado esperado."
    },
    {
        "descripcion": "Sabe utilizar apropiadamente la información para el logro de sus resultados."
    },
    {
        "descripcion": "Es minucioso en el manejo de la información."
    },
    {
        "descripcion": "Analiza y prioriza la información de una manera precisa."
    },
    {
        "descripcion": "Proporciona los recursos necesarios para alcanzar las metas requeridas."
    },
    {
        "descripcion": "Valora los diferentes aportes y las contribuciones de los miembros del equipo."
    },
    {
        "descripcion": "Busca apoyo y asesoramiento, que le permiten resolver los problemas que se le presentan en su gestión, en las personas adecuadas."
    },
    {
        "descripcion": "Se asegura que el grupo disponga de la información necesaria para realizar su trabajo y expone las razones en las que se basan las decisiones tomadas."
    },
    {
        "descripcion": "Supera las objeciones más importantes que se le presentan."
    },
    {
        "descripcion": "Logra interesar favorablemente a sus oyentes respecto de sus opiniones o ideas."
    },
    {
        "descripcion": "Indaga y mantiene una comunicación abierta con sus grupos de interés, sobre sus expectativas y nivel de satisfacción, y se preocupa porque ellos también conozcan las suyas."
    },
    {
        "descripcion": "Atiende las inquietudes del cliente interno y externo en la dinámica del negocio, y busca alternativas que garanticen la satisfacción de sus necesidades, de acuerdo con los lineamientos de la Compañía."
    },
    {
        "descripcion": "Promueve con el ejemplo los altos estándares de servicio en la compañía."
    },
    {
        "descripcion": "Crea un ambiente de trabajo propicio para intercambiar conocimientos e ideas, buscando una mejora continua en los procesos y resultados de la organización."
    },
    {
        "descripcion": "Identifica los equipos y personas que tienen el conocimiento y las mejores prácticas, para desarrollar relaciones sinérgicas y para resolver situaciones o problemáticas acerca de su trabajo."
    },
    {
        "descripcion": "Identifica las personas claves para el éxito de los resultados de su área y la Organización, desarrollando relaciones a largo plazo con éstos a fin de obtener los resultados esperados."
    },
    {
        "descripcion": "Es directo y asertivo al comunicar sus puntos de vista, balanceando de esta manera las relaciones y asegurando el alcance de las metas Organizacionales."
    },
    {
        "descripcion": "Verifica el cumplimiento de los estándares de calidad y normas establecidas por la organización, y propone planes de acción, que mejoren el desempeño."
    },
    {
        "descripcion": "Garantiza el cumplimiento de los planes y programas asignados, enfrentando los obstáculos que se puedan presentar."
    },
    {
        "descripcion": "Coordina la ejecución de las acciones de acuerdo con las prioridades a corto y mediano plazo; controla y encamina los resultados que no se estén dando dentro de su área."
    },
    {
        "descripcion": "Impulsa el flujo correcto de información hacia los grupos de interés."
    },
    {
        "descripcion": "Identifica las tendencias y discrepancias en la información y actúa generando soluciones."
    },
    {
        "descripcion": "Hace conexiones de información aparentemente no relacionada y define controles o planes de contingencia, para prevenir riesgos."
    },
    {
        "descripcion": "Demuestra confianza en los demás, reconociendo sus capacidades, para cumplir sus responsabilidades y alcanzar objetivos retadores."
    },
    {
        "descripcion": "Acompaña y encamina la ejecución del equipo asegurando el resultado esperado."
    },
    {
        "descripcion": "Toma decisiones oportunamente que permiten el cumplimiento de los objetivos, las implementa y asume la corresponsabilidad con su equipo de trabajo."
    },
    {
        "descripcion": "Muestra capacidad para desarrollar una visión clara de los futuros desafíos empresariales y traduce esto en estrategias en el mediano y corto plazo."
    },
    {
        "descripcion": "Compromete a los demás con sus propuestas, consigue que los demás participen voluntariamente de sus objetivos, políticas y criterios."
    },
    {
        "descripcion": "Tiene impacto sobre las personas con las que trabaja, quiénes demuestran tener en cuenta las pautas que él sugiere."
    },
    {
        "descripcion": "Indaga proactivamente más allá de las necesidades manifestadas por los grupos de interés; diseña y estructura productos y servicios que satisfagan esas necesidades."
    },
    {
        "descripcion": "Establece una relación con perspectivas de largo plazo con sus grupos de interés (accionistas, proveedores, clientes, gobierno, colaboradores, etc.), crea estrategias para atender a cada uno, de acuerdo con su rol."
    },
    {
        "descripcion": "Lidera Iniciativas que conecten el conocimiento organizacional, las capacidades y características de los colaboradores, con las estrategias organizacionales, para el logro de objetivos y resultados."
    },
    {
        "descripcion": "Dirige equipos de trabajo que a partir del conocimiento agreguen valor y beneficios a la organización."
    },
    {
        "descripcion": "Realiza alianzas estratégicas con una visión integral para el logro de los resultados organizacionales."
    },
    {
        "descripcion": "Construye redes de relaciones y contactos estratégicos, que le permitan identificar o anticipar oportunidades relacionadas con los negocios."
    },
    {
        "descripcion": "Diseña planes directamente relacionados con los objetivos corporativos, estableciendo los estándares y normas a cumplir."
    },
    {
        "descripcion": "Encamina objetivamente todos los recursos que tiene bajo su responsabilidad a la consecución de resultados sostenibles en el tiempo."
    },
    {
        "descripcion": "Aprovecha las oportunidades del mercado y plantea estrategias con nuevos enfoques que garanticen la sostenibilidad del negocio."
    },
    {
        "descripcion": "Usa conjuntos de datos e información diversa y la integra para derivar ideas razonables que creen una visión, con el fin de desarrollar la capacidad organizacional a futuro."
    },
    {
        "descripcion": "Lidera el desarrollo de soluciones a situaciones complejas que requieren de análisis profundo de información, con el fin de poder generar soluciones sostenibles en el tiempo."
    },
    {
        "descripcion": "Demuestra en todos sus análisis de información, gran rigor y precisión para aportar criterios y planteamientos valiosos."
    },
    {
        "descripcion": "Recompensa a los que lo hacen bien, orientando al equipo hacia la excelencia y motivándolos a conseguir resultados ambiciosos."
    },
    {
        "descripcion": "Muestra interés por el mejoramiento de la calidad de vida de sus colaboradores, a nivel laboral, profesional y personal, buscando incrementar la productividad organizacional."
    },
    {
        "descripcion": "Identifica y evalúa los riesgos asociados a la consecución de los objetivos organizacionales, manteniendo y mejorando el posicionamiento de la organización frente a la industria."
    },
    {
        "descripcion": "Establece un plan de acción para alcanzar un objetivo o visión a largo plazo, incluyendo múltiples escenarios y planes de contingencia con base en la identificación de una gran variedad de problemas potenciales o posibilidades futuras."
    },
    {
        "descripcion": "Impulsa cambios en las políticas, procesos y métodos en respuesta a futuras tendencias o desarrollos en el sector y el negocio."
    },
    {
        "descripcion": "Desarrolla e implementa estrategias de comunicación y relaciones públicas para conseguir apoyo a sus ideas o planes de manera sostenible."
    },
    { "descripcion": "Mantiene una actitud permanente de ajustar sus actividades hacia la satisfacción de las necesidades de los clientes, aun cuando esto le represente acciones adicionales a las funciones de su cargo." },
    { "descripcion": "Demuestra una actitud de interés por las necesidades de sus clientes, estimulando y motivando a otros a la prestación de un servicio de Excelencia." },
    { "descripcion": "Logra obtener la admiración y aprobación de sus clientes por el trabajo realizado o servicio prestado." },
    { "descripcion": "Considera la plena satisfacción del cliente como un criterio esencial de la ejecución de sus labores." },
    { "descripcion": "Se apropia de situaciones que afectan a la organización, independiente de si estas forman parte del ámbito de sus responsabilidades." },
    { "descripcion": "Aplica seguimiento al resultado de los compromisos adquiridos, optimizando al máximo el recurso invertido e informando sistemáticamente los avances." },
    { "descripcion": "Posee una disposición que lo lleva a comprometerse con las responsabilidades y las metas asignadas, asumiéndolas como un desafío personal independientemente de los controles que reciba." },
    { "descripcion": "Se anticipa a las dificultades que surgen para cumplir sus responsabilidades y las enfrenta con su equipo si corresponde." },
    { "descripcion": "Expresa en forma clara lo que piensa, siente o necesita, teniendo en cuenta los derechos, sentimientos y valores de sus interlocutores." },
    { "descripcion": "Al momento de comunicarse tiene en cuenta referencias y motivaciones personales de los demás para atraer el interés de los mismos, con poder de convicción y animando a su interlocutor." },
    { "descripcion": "Establece comunicación empática con los demás, empleando un vocabulario respetuoso y acertado." },
    { "descripcion": "Entiende el sentido o el por qué los demás actúan en un momento de una determinada manera, y se esfuerza por mantener una posición de equilibrio frente a su interlocutor." },
    { "descripcion": "Denota una vocación especial por optimizar los recursos por lo cual presupuesta cuidadosamente su utilización." },
    { "descripcion": "Realiza seguimiento permanente para garantizar el control sobre la utilización de los recursos asignados." },
    { "descripcion": "Logra ejecutar su tarea de acuerdo al recurso presupuestado contribuyendo al cumplimiento de la misión institucional y promueve el uso eficiente de los mismos como una acción éticamente obligatoria." },
    { "descripcion": "Además de planificar los requerimientos de recursos, busca maneras creativas e innovadoras para su utilización eficiente bajo la perspectiva de costo-beneficio y se preocupa en forma permanente por la economía en el uso de los recursos a su cargo." },
    { "descripcion": "Propone permanentemente acciones e ideas creativas e innovadoras para mejorar continuamente la ejecución de sus tareas." },
    { "descripcion": "Implementa nuevos métodos y/o técnicas que representan a nivel personal y organizacional una ventaja competitiva en la ejecución de su tarea." },
    { "descripcion": "Implementa mejoras que fortalecen la eficiencia y productividad de la entidad y el cumplimiento de los propósitos de la misma." },
    { "descripcion": "Es recursivo, innovador y práctico. Busca nuevas alternativas de solución y se arriesga a romper los esquemas tradicionales." },
    { "descripcion": "Relación en términos de contenido, exactitud y presentación, entre el resultado de los trabajos y las instrucciones dadas." },
    { "descripcion": "Grado de conocimiento del trabajo a ejecutar ayudado por la experiencia y el entrenamiento." },
    { "descripcion": "Realización y entrega de los trabajos a tiempo, teniendo en cuenta los requerimientos del servicio y la optimización del mismo." },
    { "descripcion": "Utilización racional de todos los recursos disponibles que de cómo resultado la realización eficiente de las funciones." },
    { "descripcion": "Cumplimiento de las acciones, deberes y compromisos inherentes al servicio, asumiendo las consecuencias que se deriven del mismo." },
    { "descripcion": "Comportamiento con superiores, compañeros y usuarios del servicio y disposición para dar y recibir colaboración de manera que contribuya a establecer un ambiente laboral de cordialidad." },
    { "descripcion": "Medida en que demuestra interés, entusiasmo y disposición para ejercer las funciones del cargo y para adquirir conocimientos que posibiliten su desarrollo y mejoren su rendimiento." },
    { "descripcion": "Capacidad de movilización de actitudes positivas y recursos de las personas para el trabajo en equipo." },
    { "descripcion": "Capacidad de generar nuevas ideas y mejores formas de realizar el trabajo, tendientes al mejoramiento y la eficiencia en las labores." },
    { "descripcion": "Interés y participación en los diferentes programas que emprende la institución con miras al mejoramiento de sus procesos." },
    { "descripcion": "Comprensión del trabajo y las instrucciones que se le han dado, atención e interés para aceptar las ideas e indicaciones sin repeticiones seguidas." },
    { "descripcion": "Deseo y voluntad de progresar de alcanzar mayores responsabilidades, capacidad de ir un poco más allá de lo asignado y autocorregirse." },
    { "descripcion": "Interés en la adquisición de nuevos conocimientos para mejorar la ejecución de las labores." },
    { "descripcion": "Implementar eficazmente en sus actividades los conocimientos adquiridos en las capacitaciones recibidas." },
    { "descripcion": "Conoce el concepto de humanización y se mantiene enfocado en el servicio que se debe prestar, de una manera efectiva, siendo empático a las necesidades de los demás." },
    { "descripcion": "Se comunica de manera asertiva expresándose de manera cordial y respetuosa, lo que le permite abordar situaciones críticas con éxito." },
    { "descripcion": "Adopta acciones para satisfacer los requerimientos de sus clientes internos y/o externos, de conformidad a las expectativas de la organización." },
    { "descripcion": "Cuenta con actitud de servicio, muestra empatía y comprensión a su interlocutor y se ajusta a los diferentes momentos que se puedan presentar en su gestión." },
    { "descripcion": "Se enfoca con decisión y entusiasmo al cumplimiento de las metas de su cargo, ya que es consciente del impacto de su gestión frente al área y a la organización." },
    { "descripcion": "Cumple con efectividad plazos, procedimientos y resultados, con respecto a sus compromisos." },
    { "descripcion": "Asume con propiedad su rol en el equipo, aportando ideas y propuestas que mejoran los procesos o procedimientos." },
    { "descripcion": "Asume y se apega a los protocolos de calidad, gestionando las acciones pertinentes, el manejo de documentación implicada y las normas que la rigen." },
    { "descripcion": "Proporciona cuidados a las personas de manera solidaria, digna, con respeto, empatía, teniendo en cuenta sus decisiones y sus valores." },
    { "descripcion": "Su práctica está alineada con los estándares de calidad y seguridad del paciente, y participa en la implementación de acciones de mejora." },
    { "descripcion": "Busca el mejor resultado en salud para las personas, siendo consciente de las implicaciones humanas y económicas de cada una de sus decisiones." },
    { "descripcion": "Genera valor en cada atención, mejorando la experiencia de las personas en los servicios de salud." },
    { "descripcion": "Analiza, organiza y presenta datos numéricos. Identifica lo más importante y significativo de los datos obtenidos, a fin de generar planes de acción." },
    { "descripcion": "Realiza una buena gestión de los recursos obteniendo los resultados deseados de la manera más eficiente posible, además de realizar un seguimiento y control de todo el proceso." },
    { "descripcion": "Prioriza las tareas, realiza un seguimiento conforme a su desarrollo y las reorganiza ante los imprevistos que pueden surgir." },
    { "descripcion": "Realiza una adecuada planeación y seguimiento de su trabajo contemplando los tiempos y recursos disponibles para el desarrollo de sus actividades." },
    { "descripcion": "Monitorea los objetivos estratégicos e indicadores de la empresa, en concordancia con lo que sucede en el entorno competitivo, permitiendo ajustes precisos y oportunos." },
    { "descripcion": "Estudia y analiza la dinámica del negocio y el entorno, identificando cambios y oportunidades a largo plazo." },
    { "descripcion": "Se articula con los demás procesos de la organización, para trabajar conjuntamente a fin de mejorar el alcance e impacto de sus acciones y resultados." },
    { "descripcion": "Conoce ampliamente los factores claves de la planeación estratégica de la organización, así como el nivel de aporte que se espera con los resultados de su gestión." },
    { "descripcion": "Alcanza los resultados establecidos para su trabajo, con calidad y oportunidad, manteniendo un alto nivel de desempeño y orientándose a alcanzar objetivos retadores, que generan enriquecimiento y valor a los procesos en los que se implica." },
    { "descripcion": "Es abierto y flexible a los cambios y necesidades del entorno, modificando sus actitudes y comportamientos para el mejoramiento de los procesos en los que participa." },
    { "descripcion": "Anticipa, identifica y satisface las necesidades de los usuarios -internos y externos-, reflejando respeto, empatía, trato digno y genuino interés por el otro, en el marco de la política de humanización de la Institución." },
    { "descripcion": "Organiza, estructura, procesa, controla, verifica y presenta información pertinente y oportuna relacionada con los procesos en los que participa." },
    { "descripcion": "Comprende y atiende las necesidades de los usuarios, demostrando sensibilidad frente a su situación y ofreciendo un trato cercano y equitativo, respetando su intimidad y privacidad." },
    { "descripcion": "Posee un amplio y profundo dominio y experiencia en el marco de los estándares de calidad de su campo de acción." },
    { "descripcion": "Diseña e implementa planes estratégicos y/o de trabajo, estableciendo prioridades, responsabilidades, recursos y mecanismos de seguimiento, con el fin de cumplir los objetivos institucionales." },
    { "descripcion": "Dirige, acompaña, inspira, retroalimenta y reconoce el desempeño de sus colaboradores, orientando los esfuerzos hacia la consecución de resultados y cumplimiento de objetivos compartidos." },
    { "descripcion": "Orienta acciones que buscan posicionar la Institución, comprendiendo el entorno e implementando estrategias que contribuyan al cumplimiento de la misión y visión." }
]

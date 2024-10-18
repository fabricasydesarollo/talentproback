import express from "express"
import { Ciudades, Departamentos } from "../models/ciudades.model.js"
import { Competencias, Descriptores, TipoCompetencia } from "../models/competencias.model.js"
import { Empresas, Hubs, Sedes } from "../models/empresas.model.js"
import { Calificaciones } from "../models/respuestas.model.js"
import { NivelCargo, Usuarios, } from "../models/usuarios.model.js"

const nivelCargo = [
    { "nombre": "Asistentes" },
    { "nombre": "Profesional" },
    { "nombre": "Coordinación" },
    { "nombre": "Dirección" },
    { "nombre": "Analista" },
    { "nombre": "Asistente" },
    { "nombre": "Auxiliar" },
    { "nombre": "Regentes" },
    { "nombre": "Director Técnico" },
    { "nombre": "Gerente General" },
    { "nombre": "Operativo" },
    { "nombre": "Táctico" },
    { "nombre": "Estrategico" }
]

const tipoCompetencia = [
    { "nombre": "Competencia Organizacional" },
    { "nombre": "Funcional por área: Distribución Tradicional" },
    { "nombre": "Funcional por área:: Corporativo" },
    { "nombre": "Funcional por área: Dispensación Operaciones" },
    { "nombre": "Líder" },
    { "nombre": "Competencia Funcional - Asistencial" },
    { "nombre": "Competencia Funcional - Asistencial y Profesional" },
    { "nombre": "Competencia Funcional - Coordinación" },
    { "nombre": "Competencia Funcional - Coordinación y Directivo" },
    { "nombre": "Funcional - Rol Asistencial" },
    { "nombre": "Funcional - Rol Administrativo" },
    { "nombre": "Funcional - Rol Estratégico" },
    { "nombre": "Desempeño" }
]

const departamentos = [
    {
        "nombre": "Amazonas",
        "ciudades": [{ "nombre": "Leticia" }, { "nombre": "Puerto Nariño" }]
    },
    {
        "nombre": "Antioquia",
        "ciudades": [
            { "nombre": "Medellín" },
            { "nombre": "Bello" },
            { "nombre": "Envigado" },
            { "nombre": "Itagüí" },
            { "nombre": "Apartadó" }
        ]
    },
    {
        "nombre": "Arauca",
        "ciudades": [{ "nombre": "Arauca" }, { "nombre": "Tame" }, { "nombre": "Saravena" }]
    },
    {
        "nombre": "Atlántico",
        "ciudades": [{ "nombre": "Barranquilla" }, { "nombre": "Soledad" }, { "nombre": "Malambo" }]
    },
    {
        "nombre": "Bolívar",
        "ciudades": [{ "nombre": "Cartagena" }, { "nombre": "Magangué" }, { "nombre": "Turbaco" }]
    },
    {
        "nombre": "Boyacá",
        "ciudades": [{ "nombre": "Tunja" }, { "nombre": "Duitama" }, { "nombre": "Sogamoso" }]
    },
    {
        "nombre": "Caldas",
        "ciudades": [{ "nombre": "Manizales" }, { "nombre": "Villamaría" }]
    },
    {
        "nombre": "Caquetá",
        "ciudades": [{ "nombre": "Florencia" }]
    },
    {
        "nombre": "Casanare",
        "ciudades": [{ "nombre": "Yopal" }, { "nombre": "Aguazul" }]
    },
    {
        "nombre": "Cauca",
        "ciudades": [{ "nombre": "Popayán" }, { "nombre": "Santander de Quilichao" }]
    },
    {
        "nombre": "Cesar",
        "ciudades": [{ "nombre": "Valledupar" }, { "nombre": "Aguachica" }]
    },
    {
        "nombre": "Chocó",
        "ciudades": [{ "nombre": "Quibdó" }]
    },
    {
        "nombre": "Córdoba",
        "ciudades": [{ "nombre": "Montería" }, { "nombre": "Cereté" }, { "nombre": "Sahagún" }]
    },
    {
        "nombre": "Cundinamarca",
        "ciudades": [{ "nombre": "Bogotá" }, { "nombre": "Soacha" }, { "nombre": "Zipaquirá" }]
    },
    {
        "nombre": "Guainía",
        "ciudades": [{ "nombre": "Inírida" }]
    },
    {
        "nombre": "Guaviare",
        "ciudades": [{ "nombre": "San José del Guaviare" }]
    },
    {
        "nombre": "Huila",
        "ciudades": [{ "nombre": "Neiva" }, { "nombre": "Pitalito" }]
    },
    {
        "nombre": "La Guajira",
        "ciudades": [{ "nombre": "Riohacha" }, { "nombre": "Maicao" }]
    },
    {
        "nombre": "Magdalena",
        "ciudades": [{ "nombre": "Santa Marta" }, { "nombre": "Ciénaga" }]
    },
    {
        "nombre": "Meta",
        "ciudades": [{ "nombre": "Villavicencio" }, { "nombre": "Acacías" }]
    },
    {
        "nombre": "Nariño",
        "ciudades": [{ "nombre": "Pasto" }, { "nombre": "Ipiales" }, { "nombre": "Tumaco" }]
    },
    {
        "nombre": "Norte de Santander",
        "ciudades": [{ "nombre": "Cúcuta" }, { "nombre": "Ocaña" }]
    },
    {
        "nombre": "Putumayo",
        "ciudades": [{ "nombre": "Mocoa" }]
    },
    {
        "nombre": "Quindío",
        "ciudades": [{ "nombre": "Armenia" }]
    },
    {
        "nombre": "Risaralda",
        "ciudades": [{ "nombre": "Pereira" }, { "nombre": "Dosquebradas" }]
    },
    {
        "nombre": "San Andrés y Providencia",
        "ciudades": [{ "nombre": "San Andrés" }]
    },
    {
        "nombre": "Santander",
        "ciudades": [
            { "nombre": "Bucaramanga" },
            { "nombre": "Floridablanca" },
            { "nombre": "Barrancabermeja" }
        ]
    },
    {
        "nombre": "Sucre",
        "ciudades": [{ "nombre": "Sincelejo" }]
    },
    {
        "nombre": "Tolima",
        "ciudades": [{ "nombre": "Ibagué" }, { "nombre": "Espinal" }]
    },
    {
        "nombre": "Valle del Cauca",
        "ciudades": [
            { "nombre": "Cali" },
            { "nombre": "Palmira" },
            { "nombre": "Buenaventura" },
            { "nombre": "Buga" }
        ]
    },
    {
        "nombre": "Vaupés",
        "ciudades": [{ "nombre": "Mitú" }]
    },
    {
        "nombre": "Vichada",
        "ciudades": [{ "nombre": "Puerto Carreño" }]
    }
]

const hubss = [
    {
        nombre: "Business Unit Head Atención Primaria"
    },
    {
        nombre: "Business Unit Head Gestión Farmacéutica"
    },
    {
        nombre: "Business Unit Head Hospitales"
    }
]

const empresasSee = [
    {
        "nombre": "BIENESTAR I.P.S",
        "nit": null,
        "urlLogo": "https://zentria.com.co/wp-content/uploads/2023/06/bienestar.png",
        "idHub": 1,
    },
    {
        "nombre": "CLÍNICA GENERAL DEL NORTE",
        "nit": null,
        "urlLogo": "https://zentria.com.co/wp-content/uploads/2023/06/clinica-norte-logo.png",
        "idHub": 1,
    },
    {
        "nombre": "CLÍNICA CHIA",
        "nit": null,
        "urlLogo": "https://zentria.com.co/wp-content/uploads/2023/06/clinica-chia-logo.png",
        "idHub": 1,
    }, {
        "nombre": "EVEDISA",
        "nit": null,
        "urlLogo": "https://zentria.com.co/wp-content/uploads/2023/06/evedisa-logo.png",
        "idHub": 2,
    }, {
        "nombre": "HELPHARMA",
        "nit": null,
        "urlLogo": "https://zentria.com.co/wp-content/uploads/2023/06/helpharma.webp",
        "idHub": 2,
    }, {
        "nombre": "RONELLY",
        "nit": null,
        "urlLogo": "https://zentria.com.co/wp-content/uploads/2023/06/ronelly-logo.png",
        "idHub": 2,
    }, {
        "nombre": "AVIDANTI",
        "nit": null,
        "urlLogo": "https://zentria.com.co/wp-content/uploads/2023/06/unnamed.png",
        "idHub": 3,
    }, {
        "nombre": "ONCÓLOGOS DEL OCCIDENTE",
        "nit": null,
        "urlLogo": "https://zentria.com.co/wp-content/uploads/2023/06/o-occidente-logo.png",
        "idHub": 3,
    }
]


const sedesSeed = [
    {
        "nombre": "Clínica Avidanti Ibagué",
        "siglas": "CAI",
        "idEmpresa": 7,
        "idCiudad": 61   
    },{
        "nombre": "Clínica avidanti Santa Marta",
        "siglas": "CASM",
        "idEmpresa": 7,
        "idCiudad": 42
    },{
        "nombre": "Clínica Avidanti Soacha",
        "siglas": "CACV",
        "idEmpresa": 7,
        "idCiudad": 33
    },{
        "nombre": "Angiografía de Colombia",
        "siglas": "ADC",
        "idEmpresa": 7,
        "idCiudad": 47
    },{
        "nombre": "Clínica Avidanti Manizales",
        "siglas": "CAM",
        "idEmpresa": 7,
        "idCiudad": 20
    },{
        "nombre": "Unión de Cirujanos",
        "siglas": "UDC",
        "idEmpresa": 6,
        "idCiudad": 52
    },{
        "nombre": "Clínica Cancerológica de Boyacá",
        "siglas": "CCB",
        "idEmpresa": 6,
        "idCiudad": 14
    },{
        "nombre": "Hospital Infantil Universitario 'Rafael Henao Toro'",
        "siglas": "HIU",
        "idEmpresa": 6,
        "idCiudad": 20
    },{
        "nombre": "Oncólogos del Occidente Manizales",
        "siglas": "ODO",
        "idEmpresa": 6,
        "idCiudad": 57
    },{
        "nombre": "Clínica San Marcel",
        "siglas": "ODO",
        "idEmpresa": 6,
        "idCiudad": 20
    },{
        "nombre": "Clínica De Alta Tecnología Armenia",
        "siglas": "ODO",
        "idEmpresa": 6,
        "idCiudad": 52
    },
    ]

const competenciasSee = [
    {
        "nombre": "Vocación de Servicio",
        "descripcion": "Manifiesta la vocación y el deseo de ayudar o servir a los clientes internos o externos, identificar, comprender y satisfacer sus necesidades y expectativas, aun aquéllas no expresadas, mediante la aplicación de sus conocimientos y la generación de respuestas amables, oportunas y confiables animando a otros a actuar en la prestación de un servicio de excelencia.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Iniciativa a la mejora continua en procesos y técnicas",
        "descripcion": "Esta capacidad implica que la persona actúa con conocimiento pleno de lo que se le ha asignado, ejecutando su labor con precisión, autonomía y calidad respecto de compromisos u obligaciones adquiridas por él mismo, asignadas por sus superiores y/o por las personas a su cargo, respondiendo por los resultados y las consecuencias derivadas de su actuación.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Comunicación asertiva",
        "descripcion": "Es la capacidad de prestar atención con interés a los pensamientos, sentimientos o preocupaciones de los demás y de decir sin temores los suyos propios. La persona que se comunica asertivamente, expresa en forma clara lo que piensa, siente o necesita, teniendo en cuenta los derechos, sentimientos y valores de sus interlocutores. Para esto, al comunicarse da a conocer y hacer valer sus opiniones, derechos, sentimientos y necesidades, respetando las de las demás personas.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Toma de Responsabilidad personal",
        "descripcion": "Es capaz de presupuestar los recursos requeridos para el adecuado desempeño de sus labores y para el logro de sus metas y las de la entidad, administrándolos con eficiencia y aplicando técnicas de control. El poseedor de esta competencia es creativo para administrar en forma eficaz los recursos materiales, las instalaciones, insumos, recursos financieros y humanos. Establece estrategias para que la utilización de los recursos disponibles sea altamente productiva, es decir, que se lleve a cabo bajo ciertas condiciones que no permitan los sobre costos, el desperdicio y la ineficiencia en el uso de los mismos.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Manejo de Recursos",
        "descripcion": "Es la habilidad que posee una persona para identificar y presentar recursos, ideas y métodos novedosos relacionados con su propia tarea, la de su grupo primario y la de la organización y concretarlos en acciones que hagan más eficientes los métodos y procesos. Propone y recomienda en forma sistémica la implantación de mejoras que fortalecen la eficiencia y productividad de la entidad y el cumplimiento de los propósitos de la misma.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Calidad del Trabajo",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Conocimiento del Trabajo",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Oportunidad",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Organización",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Responsabilidad",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Relaciones Interpersonales",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Actitud Frente al Trabajo",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Liderazgo",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Iniciativa",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Participación",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Receptividad",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Actitud de Mejoramiento",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Capacitación",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Humanidad y Servicio",
        "descripcion": "Capacidad de identificar las necesidades de los demás y actuar proactivamente para generar soluciones diferenciadoras, manteniendo la comunicación asertiva y una actitud cordial, respetuosa y humanizada, que permite generar valor a los grupos de interés?, contribuyendo al modelo de servicio de Bienestar IPS.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Consciencia Organizacional",
        "descripcion": "Capacidad de ser consciente de la importancia de su gestión en el logro de objetivos tanto a nivel individual como en equipo, y el impacto que genera en los objetivos corporativos, encaminando todas sus acciones al cumplimiento efectivo de los procedimientos, normativas y estándares de calidad, desde una actitud de autogestión.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Generación de Valor en Salud",
        "descripcion": "Capacidad de mantener en equilibrio la calidad de los servicios asistenciales de salud, para que logren mejorar la satisfacción de las necesidades de las personas y su experiencia en los servicios prestados, mientras mantienen una relación óptima con los costos y los resultados financieros de la organización.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Análisis, Planificación y Organización",
        "descripcion": "Capacidad para analizar variables, indicadores y datos, con el propósito de establecer planes y programas que abarquen los puntos clave de la gestión a cargo, lo que implica organizar los recursos en espacio, tiempo y oportunidad.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Pensamiento Estratégico",
        "descripcion": "Capacidad para analizar el entorno donde se desenvuelven los procesos a su cargo, a fin de detectar oportunidades o cambios y visualizar escenarios de competitividad donde pueda formular, implementar y evaluar estrategias para potenciar el negocio, cumpliendo con el plan estratégico de la organización.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Humanidad y Servicio",
        "descripcion": "Capacidad de identificar las necesidades de los demás y actuar proactivamente para generar soluciones diferenciadoras, manteniendo la comunicación asertiva y una actitud cordial, respetuosa y humanizada, que permite generar valor a los grupos de interés?, contribuyendo al modelo de servicio de Bienestar IPS.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Consciencia Organizacional",
        "descripcion": "Capacidad de ser consciente de la importancia de su gestión en el logro de objetivos tanto a nivel individual como en equipo, y el impacto que genera en los objetivos corporativos, encaminando todas sus acciones al cumplimiento efectivo de los procedimientos, normativas y estándares de calidad, desde una actitud de autogestión.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Generación de Valor en Salud",
        "descripcion": "Capacidad de mantener en equilibrio la calidad de los servicios asistenciales de salud, para que logren mejorar la satisfacción de las necesidades de las personas y su experiencia en los servicios prestados, mientras mantienen una relación óptima con los costos y los resultados financieros de la organización.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Análisis, Planificación y Organización",
        "descripcion": "Capacidad para analizar variables, indicadores y datos, con el propósito de establecer planes y programas que abarquen los puntos clave de la gestión a cargo, lo que implica organizar los recursos en espacio, tiempo y oportunidad.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Pensamiento Estratégico",
        "descripcion": "Capacidad para analizar el entorno donde se desenvuelven los procesos a su cargo, a fin de detectar oportunidades o cambios y visualizar escenarios de competitividad donde pueda formular, implementar y evaluar estrategias para potenciar el negocio, cumpliendo con el plan estratégico de la organización.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Orientación a Resultados",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Adaptación al Cambio",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Orientación al Usuario",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Gestión de la Información",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Humanización",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Experticia Profesional y Técnica",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Planeación",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Liderazgo de Equipo de Trabajo",
        "descripcion": null,
        "idTipo": 1,
        
    },
    {
        "nombre": "Dirección Estratégica",
        "descripcion": null,
        "idTipo": 1,
        
    }, {
        "nombre": "Orientación al Servicio",
        "descripcion": "Implica tener una actitud permanente de ayuda y servicio hacia nuestros grupos de interés, garantizando anticiparse, satisfacer y superar sus necesidades y expectativas; reconociéndolos como la razón de ser de HelPharma.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Aprendizaje Continuo",
        "descripcion": "Es la capacidad de retar el statu quo, romper paradigmas, y encontrar cómo hacer las cosas mejor, tomando la iniciativa para ampliar y compartir el campo de conocimiento; alineado siempre con los valores, principios y la estrategia de la organización.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Construcción de Redes de Trabajo",
        "descripcion": "Es la capacidad de trabajar efectivamente con otras personas, valorando las diferencias y fomentando las sinergias con nuestros grupos de interés.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Generación de Resultados de Valor",
        "descripcion": "Es la capacidad para lograr resultados de calidad, en forma ágil, eficiente y novedosa; aún en situaciones difíciles; en el marco de la estrategia y valores de HelPharma.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Gestión de la Información",
        "descripcion": "Es la capacidad de buscar, analizar, producir, compartir y utilizar información fiable, veraz y exacta que genere conocimientos y agregue valor a los resultados individuales, grupales y organizacionales en el corto, mediano y largo plazo.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Gestión del Talento",
        "descripcion": "Es la capacidad de reconocer la importancia de los colaboradores, generando un alto sentido de pertenencia en ellos y facilitando experiencias de aprendizaje que impulsen su crecimiento integral.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Visión Estratégica",
        "descripcion": "Es la capacidad de analizar una situación desde una perspectiva integral, identificando sus elementos y su relación con el entorno, para plantear diferentes alternativas, anticipando las implicaciones de una situación en las acciones y decisiones tomadas.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Impactar e Influir en los demás",
        "descripcion": "Es la capacidad para influir en los demás, tomando la iniciativa y asumiendo de modo activo la responsabilidad de que las cosas sucedan. Gestionando, promoviendo y comunicando la visión de la estrategia organizacional y motivando el compromiso en otros.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Orientación a resultados",
        "descripcion": "Respiramos los éxitos y encontramos las mejoras de la compañía con el más alto sentido de pertenencia; buscamos la excelencia siendo parte del resultado; cada proceso bien ejecutado engrana un logro en conjunto.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Flexibilidad",
        "descripcion": "Nos adaptamos a un aprendizaje continuo enfocado en una innovación cultural.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Trabajo en Equipo",
        "descripcion": "Trabajamos con persistencia en los resultados de la compañía con efectividad, cumpliendo con las políticas y procedimientos organizacionales.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Desarrollo de Oportunidad de Negocio",
        "descripcion": "Trabajamos en el posicionamiento de nuestra marca basados en estrategias sensitivas, soportándonos en distintos entornos.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Planificación y Organización",
        "descripcion": "Controlamos de manera meticulosa nuestro proceso de principio a fin, asegurando las buenas prácticas.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Compromiso y responsabilidad",
        "descripcion": "Nos enfocamos en construir y alcanzar los objetivos organizacionales, ciñéndonos a los estándares normativos vigentes en procura de proteger legalmente a la compañía.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Orientación a resultados",
        "descripcion": "Respiramos los éxitos y encontramos las mejoras de la compañía con el más alto sentido de pertenencia; buscamos la excelencia siendo parte del resultado; cada proceso bien ejecutado engrana un logro en conjunto.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Flexibilidad",
        "descripcion": "Nos adaptamos a un aprendizaje continuo enfocado en una innovación cultural.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Trabajo en Equipo",
        "descripcion": "Trabajamos con persistencia en los resultados de la compañía con efectividad, cumpliendo con las políticas y procedimientos organizacionales.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Desarrollo de Oportunidad de Negocio",
        "descripcion": "Trabajamos en el posicionamiento de nuestra marca basados en estrategias sensitivas, soportándonos en distintos entornos.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Planificación y Organización",
        "descripcion": "Controlamos de manera meticulosa nuestro proceso de principio a fin, asegurando las buenas prácticas.",
        "idTipo": 1,
        
    },
    {
        "nombre": "Compromiso y responsabilidad",
        "descripcion": "Nos enfocamos en construir y alcanzar los objetivos organizacionales, ciñéndonos a los estándares normativos vigentes en procura de proteger legalmente a la compañía.",
        "idTipo": 1,
        
    }
]

const descriptoresSee = [
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

const competenciaCargoSee = [
    { idNivelCargo: 27, idCompetencia: 1 },
    { idNivelCargo: 27, idCompetencia: 2 },
    { idNivelCargo: 27, idCompetencia: 3 },
    { idNivelCargo: 27, idCompetencia: 4 },
    { idNivelCargo: 27, idCompetencia: 5 },
    { idNivelCargo: 27, idCompetencia: 6 },
    { idNivelCargo: 27, idCompetencia: 7 },
    { idNivelCargo: 27, idCompetencia: 8 },
    { idNivelCargo: 27, idCompetencia: 9 },
    { idNivelCargo: 27, idCompetencia: 10 },
    { idNivelCargo: 27, idCompetencia: 11 },
    { idNivelCargo: 27, idCompetencia: 12 },
    { idNivelCargo: 27, idCompetencia: 13 },
    { idNivelCargo: 27, idCompetencia: 14 },
    { idNivelCargo: 27, idCompetencia: 15 },
    { idNivelCargo: 27, idCompetencia: 16 },
    { idNivelCargo: 27, idCompetencia: 17 },
    { idNivelCargo: 27, idCompetencia: 18 },
    { idNivelCargo: 27, idCompetencia: 19 },
    { idNivelCargo: 27, idCompetencia: 20 },
    { idNivelCargo: 27, idCompetencia: 21 },
    { idNivelCargo: 27, idCompetencia: 22 },
    { idNivelCargo: 27, idCompetencia: 23 },
    { idNivelCargo: 27, idCompetencia: 24 },
    { idNivelCargo: 27, idCompetencia: 25 },
    { idNivelCargo: 27, idCompetencia: 26 },
    { idNivelCargo: 27, idCompetencia: 27 },
    { idNivelCargo: 27, idCompetencia: 28 }
]

const calificacionesSee = [
    {
        descripcion: "Supera las expectativas",
        valor: 5
    }, {
        descripcion: "Cumple todas las expectativas",
        valor: 4
    }, {
        descripcion: "Cumple la mayoría de las expectativas",
        valor: 3
    }, {
        descripcion: "Cumple parcialmente las expectativas",
        valor: 2
    }, {
        descripcion: "No cumple las expectativas",
        valor: 1
    },
]
const competenciasEvaluaciones = [
    { idEvaluacion: 1, idCompetencia: 1 },
    { idEvaluacion: 1, idCompetencia: 2 },
    { idEvaluacion: 1, idCompetencia: 3 },
    { idEvaluacion: 1, idCompetencia: 4 },
    { idEvaluacion: 1, idCompetencia: 5 },
    { idEvaluacion: 1, idCompetencia: 6 },
    { idEvaluacion: 1, idCompetencia: 7 },
    { idEvaluacion: 1, idCompetencia: 8 },
    { idEvaluacion: 1, idCompetencia: 9 },
    { idEvaluacion: 1, idCompetencia: 10 },
    { idEvaluacion: 1, idCompetencia: 11 },
    { idEvaluacion: 1, idCompetencia: 12 },
    { idEvaluacion: 1, idCompetencia: 13 },
    { idEvaluacion: 1, idCompetencia: 14 },
    { idEvaluacion: 1, idCompetencia: 15 },
    { idEvaluacion: 1, idCompetencia: 16 },
    { idEvaluacion: 1, idCompetencia: 17 },
    { idEvaluacion: 1, idCompetencia: 18 },
    { idEvaluacion: 1, idCompetencia: 19 },
    { idEvaluacion: 1, idCompetencia: 20 },
    { idEvaluacion: 1, idCompetencia: 21 },
    { idEvaluacion: 1, idCompetencia: 22 },
    { idEvaluacion: 1, idCompetencia: 23 },
    { idEvaluacion: 1, idCompetencia: 24 },
    { idEvaluacion: 1, idCompetencia: 25 },
    { idEvaluacion: 1, idCompetencia: 26 },
    { idEvaluacion: 1, idCompetencia: 27 },
    { idEvaluacion: 1, idCompetencia: 28 },
    { idEvaluacion: 1, idCompetencia: 29 },
    { idEvaluacion: 1, idCompetencia: 30 },
    { idEvaluacion: 1, idCompetencia: 31 },
    { idEvaluacion: 1, idCompetencia: 32 },
    { idEvaluacion: 1, idCompetencia: 33 },
    { idEvaluacion: 1, idCompetencia: 34 },
    { idEvaluacion: 1, idCompetencia: 35 },
    { idEvaluacion: 1, idCompetencia: 36 },
    { idEvaluacion: 1, idCompetencia: 37 },
    { idEvaluacion: 1, idCompetencia: 38 },
    { idEvaluacion: 1, idCompetencia: 39 },
    { idEvaluacion: 1, idCompetencia: 40 },
    { idEvaluacion: 1, idCompetencia: 41 },
    { idEvaluacion: 1, idCompetencia: 42 },
    { idEvaluacion: 1, idCompetencia: 43 },
    { idEvaluacion: 1, idCompetencia: 44 },
    { idEvaluacion: 1, idCompetencia: 45 },
    { idEvaluacion: 1, idCompetencia: 46 },
    { idEvaluacion: 1, idCompetencia: 47 },
    { idEvaluacion: 1, idCompetencia: 48 },
    { idEvaluacion: 1, idCompetencia: 49 },
    { idEvaluacion: 1, idCompetencia: 50 },
    { idEvaluacion: 1, idCompetencia: 51 },
    { idEvaluacion: 1, idCompetencia: 52 },
    { idEvaluacion: 1, idCompetencia: 53 },
    { idEvaluacion: 1, idCompetencia: 54 },
    { idEvaluacion: 1, idCompetencia: 55 },
    { idEvaluacion: 1, idCompetencia: 56 },
    { idEvaluacion: 1, idCompetencia: 57 }
]

const usuariosSee = [
    {
        idUsuario: 95059296,
        nombre: 'Sofía Ramírez',
        cargo: 'Developer',
        correo: 'sofía.ramírez@zentria.com.co',
        contrasena: 'Pruebas24*',
        idPerfil: 1,
        idNivelCargo: 4
    },
    {
        idUsuario: 80523640,
        nombre: 'Daniel Martínez',
        cargo: 'Developer',
        correo: 'daniel.martínez@zentria.com.co',
        contrasena: 'Pruebas24*',
        idPerfil: 1,
        idNivelCargo: 4
    },
    {
        idUsuario: 146595987,
        nombre: 'Valentina García',
        cargo: 'Developer',
        correo: 'valentina.garcía@zentria.com.co',
        contrasena: 'Pruebas24*',
        idPerfil: 1,
        idNivelCargo: 4
    },
    {
        idUsuario: 47733223,
        nombre: 'Mateo López',
        cargo: 'Developer',
        correo: 'mateo.lópez@zentria.com.co',
        contrasena: 'Pruebas24*',
        idPerfil: 1,
        idNivelCargo: 4
    },
    {
        idUsuario: 87692338,
        nombre: 'Camila Torres',
        cargo: 'Developer',
        correo: 'camila.torres@zentria.com.co',
        contrasena: 'Pruebas24*',
        idPerfil: 1,
        idNivelCargo: 4
    },
    {
        idUsuario: 130460720,
        nombre: 'Santiago Fernández',
        cargo: 'Developer',
        correo: 'santiago.fernández@zentria.com.co',
        contrasena: 'Pruebas24*',
        idPerfil: 1,
        idNivelCargo: 4
    },
    {
        idUsuario: 152601821,
        nombre: 'Isabella Vargas',
        cargo: 'Developer',
        correo: 'isabella.vargas@zentria.com.co',
        contrasena: 'Pruebas24*',
        idPerfil: 1,
        idNivelCargo: 4
    },
    {
        idUsuario: 68894889,
        nombre: 'Alejandro Jiménez',
        cargo: 'Developer',
        correo: 'alejandro.jiménez@zentria.com.co',
        contrasena: 'Pruebas24*',
        idPerfil: 1,
        idNivelCargo: 4
    },
    {
        idUsuario: 87815991,
        nombre: 'Emilia Rojas',
        cargo: 'Developer',
        correo: 'emilia.rojas@zentria.com.co',
        contrasena: 'Pruebas24*',
        idPerfil: 1,
        idNivelCargo: 4
    },
    {
        idUsuario: 36294647,
        nombre: 'Lucas Castillo',
        cargo: 'Developer',
        correo: 'lucas.castillo@zentria.com.co',
        contrasena: 'Pruebas24*',
        idPerfil: 1,
        idNivelCargo: 4
    }
]


const usuEval = [
    { idUsuario: 36294647, idEvaluador: 100075021 },
    { idUsuario: 68894889, idEvaluador: 80523640 },
    { idUsuario: 87692338, idEvaluador: 47733223 },
    { idUsuario: 87815991, idEvaluador: 47733223 },
    { idUsuario: 95059296, idEvaluador: 80523640 },
    { idUsuario: 130460720, idEvaluador: 100075021 },
    { idUsuario: 146595987, idEvaluador: 100075021 },
    { idUsuario: 152601821, idEvaluador: 100075021 },
]

const UsuEvaluadores = [
    {
        idUsuaEvaluador: 1,
        idEvaluacion: 1,
        idCompromiso: null,
        comentario: null,
        calificacion: null
    },
    {
        idUsuaEvaluador: 2,
        idEvaluacion: 1,
        idCompromiso: null,
        comentario: null,
        calificacion: null
    },
    {
        idUsuaEvaluador: 3,
        idEvaluacion: 1,
        idCompromiso: null,
        comentario: null,
        calificacion: null
    },
    {
        idUsuaEvaluador: 4,
        idEvaluacion: 1,
        idCompromiso: null,
        comentario: null,
        calificacion: null
    },
    {
        idUsuaEvaluador: 5,
        idEvaluacion: 1,
        idCompromiso: null,
        comentario: null,
        calificacion: null
    },
    {
        idUsuaEvaluador: 6,
        idEvaluacion: 1,
        idCompromiso: null,
        comentario: null,
        calificacion: null
    },
    {
        idUsuaEvaluador: 7,
        idEvaluacion: 1,
        idCompromiso: null,
        comentario: null,
        calificacion: null
    },
    {
        idUsuaEvaluador: 8,
        idEvaluacion: 1,
        idCompromiso: null,
        comentario: null,
        calificacion: null
    }
]

const descriptoresCargosSee = [
    { idDescriptor: 117, idNivelCargo: 3 },
    { idDescriptor: 119, idNivelCargo: 6 },
    { idDescriptor: 120, idNivelCargo: 1 },
    { idDescriptor: 63, idNivelCargo: 4 },
    { idDescriptor: 65, idNivelCargo: 10 },
    { idDescriptor: 66, idNivelCargo: 9 },
    { idDescriptor: 77, idNivelCargo: 5 },
    { idDescriptor: 78, idNivelCargo: 2 },
    { idDescriptor: 79, idNivelCargo: 8 },
    { idDescriptor: 95, idNivelCargo: 3 },
    { idDescriptor: 97, idNivelCargo: 6 },
    { idDescriptor: 98, idNivelCargo: 1 },
    { idDescriptor: 114, idNivelCargo: 4 },
    { idDescriptor: 115, idNivelCargo: 10 },
    { idDescriptor: 116, idNivelCargo: 9 },
    { idDescriptor: 83, idNivelCargo: 5 },
    { idDescriptor: 84, idNivelCargo: 2 },
    { idDescriptor: 102, idNivelCargo: 8 },
    { idDescriptor: 103, idNivelCargo: 3 },
    { idDescriptor: 118, idNivelCargo: 6 },
    { idDescriptor: 121, idNivelCargo: 1 },
    { idDescriptor: 85, idNivelCargo: 4 },
    { idDescriptor: 86, idNivelCargo: 10 },
    { idDescriptor: 104, idNivelCargo: 9 },
    { idDescriptor: 106, idNivelCargo: 5 },
    { idDescriptor: 122, idNivelCargo: 2 },
    { idDescriptor: 123, idNivelCargo: 8 },
    { idDescriptor: 88, idNivelCargo: 3 },
    { idDescriptor: 91, idNivelCargo: 6 },
    { idDescriptor: 105, idNivelCargo: 1 },
    { idDescriptor: 107, idNivelCargo: 4 },
    { idDescriptor: 124, idNivelCargo: 10 },
    { idDescriptor: 125, idNivelCargo: 9 },
    { idDescriptor: 218, idNivelCargo: 5 },
    { idDescriptor: 219, idNivelCargo: 2 },
    { idDescriptor: 251, idNivelCargo: 8 },
    { idDescriptor: 252, idNivelCargo: 2 },
    { idDescriptor: 253, idNivelCargo: 8 }
]
export const seed = () => {

    nivelCargo.map(async cargo => {
        await NivelCargo.create(cargo)
    })
    console.log("Finish succes!")
}


export const tipoCompetenciaSeed = () => {
    tipoCompetencia.map(async tipo => {
        await TipoCompetencias.create(tipo)
    })
    console.log("Finish succes!")
}

export const departamentosCiudadesSeed = () => {

    departamentos.map(async (item) => {
        const res = await Departamentos.create(item)
        console.log("Departamento creado!")
        item.ciudades.map(async ciudad => {
            await Ciudades.create({ ...ciudad, idDepartamento: res.dataValues.idDepartamento })
            console.log("Ciudad creada!")
        })
    })
    console.log("Finish succes!")
}

export const hubsSeed = () => {
    hubss.map(async HubItem => {
        await Hubs.create(HubItem)
    })
    console.log("Finish succes!")
}


export const empresasSeed = () => {
    empresasSee.map(async empresa => {
        await Empresas.create(empresa)
    })
    console.log("Finish succes!")
}

export const sedesSeedFn = () => {
    sedesSeed.map(async sede => {
        await Sedes.create(sede)
    })
    console.log("Finish succes!")
}

export const calificacionesSeed = () => {
    calificacionesSee.map(async calificacion => {
        await Calificaciones.create(calificacion)
    })
    console.log("Finish succes!")
}


export const competenciasSeed = () => {
    competenciasSee.map(async competencia => {
        await Competencias.create(competencia)
    })
    console.log("Finish succes!")
}
export const descriptoresSeed = () => {
    descriptoresSee.map(async descriptor => {
        await Descriptores.create({ ...descriptor, idCompetencia: 1 })
    })
    console.log("Finish succes!")
}

export const competenciaCargoSeed = () => {
    competenciaCargoSee.map(async item => {
        await CompetenciasCargo.create(item)
    })
    console.log("Finish succes!")
}

export const competenciasEvaluacionesSeed = () => {
    competenciasEvaluaciones.map(async item => {
        await CompetenciasEvaluaciones.create(item)
    })
}

export const usuariosSeed = () => {
    usuariosSee.map(async item => {
        await Usuarios.create(item)
    })
}

export const usuEvalSeed = () => {
    usuEval.map(async item => {
        await UsuariosEvaluadores.create(item)
    })
}

export const UsuEvaluadoresSeed = () => {
    UsuEvaluadores.map(async item => {
        await UsuariosEvaluaciones.create(item)
    })
}

export const descriptoresCargosSeed = () => {
    descriptoresCargosSee.map(async item => {
        await DescriptoresCargo.create(item)
    })
}
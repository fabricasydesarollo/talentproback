-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: dbtalentpro
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calificaciones`
--

DROP TABLE IF EXISTS `calificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calificaciones` (
  `idCalificacion` int NOT NULL AUTO_INCREMENT,
  `descripcion` text COLLATE utf8mb4_general_ci NOT NULL,
  `valor` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idCalificacion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificaciones`
--

LOCK TABLES `calificaciones` WRITE;
/*!40000 ALTER TABLE `calificaciones` DISABLE KEYS */;
INSERT INTO `calificaciones` VALUES (1,'Supera las expectativas',5,'2024-10-03 02:32:38','2024-10-03 02:32:38'),(2,'Cumple parcialmente las expectativas',2,'2024-10-03 02:32:38','2024-10-03 02:32:38'),(3,'Cumple todas las expectativas',4,'2024-10-03 02:32:38','2024-10-03 02:32:38'),(4,'Cumple la mayoría de las expectativas',3,'2024-10-03 02:32:38','2024-10-03 02:32:38'),(5,'No cumple las expectativas',1,'2024-10-03 02:32:38','2024-10-03 02:32:38');
/*!40000 ALTER TABLE `calificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudades`
--

DROP TABLE IF EXISTS `ciudades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudades` (
  `idCiudad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `idDepartamento` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idCiudad`),
  KEY `idDepartamento` (`idDepartamento`),
  CONSTRAINT `ciudades_ibfk_1` FOREIGN KEY (`idDepartamento`) REFERENCES `departamentos` (`idDepartamento`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudades`
--

LOCK TABLES `ciudades` WRITE;
/*!40000 ALTER TABLE `ciudades` DISABLE KEYS */;
INSERT INTO `ciudades` VALUES (1,'Tame',1,'2024-10-18 17:15:12','2024-10-18 17:15:12'),(2,'Arauca',1,'2024-10-18 17:15:12','2024-10-18 17:15:12'),(3,'Saravena',1,'2024-10-18 17:15:12','2024-10-18 17:15:12'),(4,'Leticia',2,'2024-10-18 17:15:12','2024-10-18 17:15:12'),(5,'Puerto Nariño',2,'2024-10-18 17:15:12','2024-10-18 17:15:12'),(6,'Medellín',3,'2024-10-18 17:15:12','2024-10-18 17:15:12'),(7,'Bello',3,'2024-10-18 17:15:12','2024-10-18 17:15:12'),(8,'Envigado',3,'2024-10-18 17:15:12','2024-10-18 17:15:12'),(9,'Itagüí',3,'2024-10-18 17:15:12','2024-10-18 17:15:12'),(10,'Apartadó',3,'2024-10-18 17:15:12','2024-10-18 17:15:12'),(11,'Barranquilla',4,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(12,'Soledad',4,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(13,'Malambo',4,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(14,'Cartagena',5,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(15,'Magangué',5,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(16,'Turbaco',5,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(17,'Tunja',6,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(18,'Duitama',6,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(19,'Sogamoso',6,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(20,'Manizales',7,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(21,'Villamaría',7,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(22,'Florencia',8,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(23,'Yopal',9,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(24,'Aguazul',9,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(25,'Popayán',10,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(26,'Santander de Quilichao',10,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(27,'Quibdó',12,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(28,'Valledupar',11,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(29,'Aguachica',11,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(30,'Montería',13,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(31,'Cereté',13,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(32,'Sahagún',13,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(33,'Bogotá',14,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(34,'Soacha',14,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(35,'Zipaquirá',14,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(36,'Inírida',15,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(37,'San José del Guaviare',16,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(38,'Neiva',17,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(39,'Pitalito',17,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(40,'Riohacha',18,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(41,'Maicao',18,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(42,'Santa Marta',19,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(43,'Ciénaga',19,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(44,'Villavicencio',20,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(45,'Acacías',20,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(46,'Pasto',21,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(47,'Ipiales',21,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(48,'Tumaco',21,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(49,'Cúcuta',22,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(50,'Ocaña',22,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(51,'Mocoa',23,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(52,'Armenia',24,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(53,'Pereira',25,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(54,'Dosquebradas',25,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(55,'San Andrés',26,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(56,'Bucaramanga',27,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(57,'Floridablanca',27,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(58,'Barrancabermeja',27,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(59,'Sincelejo',28,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(60,'Ibagué',29,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(61,'Espinal',29,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(62,'Cali',30,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(63,'Palmira',30,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(64,'Buenaventura',30,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(65,'Buga',30,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(66,'Puerto Carreño',32,'2024-10-18 17:15:13','2024-10-18 17:15:13'),(67,'Mitú',31,'2024-10-18 17:15:13','2024-10-18 17:15:13');
/*!40000 ALTER TABLE `ciudades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competencias`
--

DROP TABLE IF EXISTS `competencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competencias` (
  `idCompetencia` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `idTipo` int NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idCompetencia`),
  KEY `idTipo` (`idTipo`),
  CONSTRAINT `competencias_ibfk_1` FOREIGN KEY (`idTipo`) REFERENCES `tipocompetencia` (`idTipo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competencias`
--

LOCK TABLES `competencias` WRITE;
/*!40000 ALTER TABLE `competencias` DISABLE KEYS */;
INSERT INTO `competencias` VALUES (1,'Iniciativa a la mejora continua en procesos y técnicas',12,'Esta capacidad implica que la persona actúa con conocimiento pleno de lo que se le ha asignado, ejecutando su labor con precisión, autonomía y calidad respecto de compromisos u obligaciones adquiridas por él mismo, asignadas por sus superiores y/o por las personas a su cargo, respondiendo por los resultados y las consecuencias derivadas de su actuación.','2024-09-17 12:18:28','2024-10-02 23:12:49'),(2,'Vocación de Servicio',1,'Manifiesta la vocación y el deseo de ayudar o servir a los clientes internos o externos, identificar, comprender y satisfacer sus necesidades y expectativas, aun aquéllas no expresadas, mediante la aplicación de sus conocimientos y la generación de respuestas amables, oportunas y confiables animando a otros a actuar en la prestación de un servicio de excelencia.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(3,'Comunicación asertiva',9,'Es la capacidad de prestar atención con interés a los pensamientos, sentimientos o preocupaciones de los demás y de decir sin temores los suyos propios. La persona que se comunica asertivamente, expresa en forma clara lo que piensa, siente o necesita, teniendo en cuenta los derechos, sentimientos y valores de sus interlocutores. Para esto, al comunicarse da a conocer y hacer valer sus opiniones, derechos, sentimientos y necesidades, respetando las de las demás personas.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(4,'Toma de Responsabilidad personal',1,'Es capaz de presupuestar los recursos requeridos para el adecuado desempeño de sus labores y para el logro de sus metas y las de la entidad, administrándolos con eficiencia y aplicando técnicas de control. El poseedor de esta competencia es creativo para administrar en forma eficaz los recursos materiales, las instalaciones, insumos, recursos financieros y humanos. Establece estrategias para que la utilización de los recursos disponibles sea altamente productiva, es decir, que se lleve a cabo bajo ciertas condiciones que no permitan los sobre costos, el desperdicio y la ineficiencia en el uso de los mismos.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(5,'Manejo de Recursos',11,'Es la habilidad que posee una persona para identificar y presentar recursos, ideas y métodos novedosos relacionados con su propia tarea, la de su grupo primario y la de la organización y concretarlos en acciones que hagan más eficientes los métodos y procesos. Propone y recomienda en forma sistémica la implantación de mejoras que fortalecen la eficiencia y productividad de la entidad y el cumplimiento de los propósitos de la misma.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(6,'Conocimiento del Trabajo',13,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(7,'Calidad del Trabajo',13,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(8,'Responsabilidad',1,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(9,'Oportunidad',13,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(10,'Organización',13,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(11,'Relaciones Interpersonales',1,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(12,'Actitud Frente al Trabajo',1,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(13,'Liderazgo',1,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(14,'Iniciativa',1,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(15,'Participación',1,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(16,'Receptividad',1,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(17,'Actitud de Mejoramiento',1,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(18,'Capacitación',1,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(19,'Humanidad y Servicio',1,'Capacidad de identificar las necesidades de los demás y actuar proactivamente para generar soluciones diferenciadoras, manteniendo la comunicación asertiva y una actitud cordial, respetuosa y humanizada, que permite generar valor a los grupos de interés?, contribuyendo al modelo de servicio de Bienestar IPS.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(20,'Consciencia Organizacional',1,'Capacidad de ser consciente de la importancia de su gestión en el logro de objetivos tanto a nivel individual como en equipo, y el impacto que genera en los objetivos corporativos, encaminando todas sus acciones al cumplimiento efectivo de los procedimientos, normativas y estándares de calidad, desde una actitud de autogestión.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(21,'Generación de Valor en Salud',9,'Capacidad de mantener en equilibrio la calidad de los servicios asistenciales de salud, para que logren mejorar la satisfacción de las necesidades de las personas y su experiencia en los servicios prestados, mientras mantienen una relación óptima con los costos y los resultados financieros de la organización.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(22,'Análisis, Planificación y Organización',11,'Capacidad para analizar variables, indicadores y datos, con el propósito de establecer planes y programas que abarquen los puntos clave de la gestión a cargo, lo que implica organizar los recursos en espacio, tiempo y oportunidad.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(23,'Pensamiento Estratégico',12,'Capacidad para analizar el entorno donde se desenvuelven los procesos a su cargo, a fin de detectar oportunidades o cambios y visualizar escenarios de competitividad donde pueda formular, implementar y evaluar estrategias para potenciar el negocio, cumpliendo con el plan estratégico de la organización.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(24,'Humanidad y Servicio',1,'Capacidad de identificar las necesidades de los demás y actuar proactivamente para generar soluciones diferenciadoras, manteniendo la comunicación asertiva y una actitud cordial, respetuosa y humanizada, que permite generar valor a los grupos de interés?, contribuyendo al modelo de servicio de Bienestar IPS.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(25,'Consciencia Organizacional',1,'Capacidad de ser consciente de la importancia de su gestión en el logro de objetivos tanto a nivel individual como en equipo, y el impacto que genera en los objetivos corporativos, encaminando todas sus acciones al cumplimiento efectivo de los procedimientos, normativas y estándares de calidad, desde una actitud de autogestión.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(26,'Generación de Valor en Salud',9,'Capacidad de mantener en equilibrio la calidad de los servicios asistenciales de salud, para que logren mejorar la satisfacción de las necesidades de las personas y su experiencia en los servicios prestados, mientras mantienen una relación óptima con los costos y los resultados financieros de la organización.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(27,'Análisis, Planificación y Organización',11,'Capacidad para analizar variables, indicadores y datos, con el propósito de establecer planes y programas que abarquen los puntos clave de la gestión a cargo, lo que implica organizar los recursos en espacio, tiempo y oportunidad.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(28,'Pensamiento Estratégico',12,'Capacidad para analizar el entorno donde se desenvuelven los procesos a su cargo, a fin de detectar oportunidades o cambios y visualizar escenarios de competitividad donde pueda formular, implementar y evaluar estrategias para potenciar el negocio, cumpliendo con el plan estratégico de la organización.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(29,'Orientación a Resultados',1,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(30,'Adaptación al Cambio',1,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(31,'Orientación al Usuario',1,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(32,'Humanización',7,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(33,'Gestión de la Información',6,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(34,'Experticia Profesional y Técnica',7,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(35,'Planeación',8,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(36,'Liderazgo de Equipo de Trabajo',8,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(37,'Dirección Estratégica',10,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(38,'Orientación al Servicio',1,'Implica tener una actitud permanente de ayuda y servicio hacia nuestros grupos de interés, garantizando anticiparse, satisfacer y superar sus necesidades y expectativas; reconociéndolos como la razón de ser de HelPharma.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(39,'Aprendizaje Continuo',1,'Es la capacidad de retar el statu quo, romper paradigmas, y encontrar cómo hacer las cosas mejor, tomando la iniciativa para ampliar y compartir el campo de conocimiento; alineado siempre con los valores, principios y la estrategia de la organización.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(40,'Construcción de Redes de Trabajo',1,'Es la capacidad de trabajar efectivamente con otras personas, valorando las diferencias y fomentando las sinergias con nuestros grupos de interés.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(41,'Gestión de la Información',1,'Es la capacidad de buscar, analizar, producir, compartir y utilizar información fiable, veraz y exacta que genere conocimientos y agregue valor a los resultados individuales, grupales y organizacionales en el corto, mediano y largo plazo.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(42,'Generación de Resultados de Valor',1,'Es la capacidad para lograr resultados de calidad, en forma ágil, eficiente y novedosa; aún en situaciones difíciles; en el marco de la estrategia y valores de HelPharma.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(43,'Gestión del Talento',4,'Es la capacidad de reconocer la importancia de los colaboradores, generando un alto sentido de pertenencia en ellos y facilitando experiencias de aprendizaje que impulsen su crecimiento integral.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(44,'Visión Estratégica',4,'Es la capacidad de analizar una situación desde una perspectiva integral, identificando sus elementos y su relación con el entorno, para plantear diferentes alternativas, anticipando las implicaciones de una situación en las acciones y decisiones tomadas.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(45,'Orientación a resultados',1,'Respiramos los éxitos y encontramos las mejoras de la compañía con el más alto sentido de pertenencia; buscamos la excelencia siendo parte del resultado; cada proceso bien ejecutado engrana un logro en conjunto.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(46,'Impactar e Influir en los demás',4,'Es la capacidad para influir en los demás, tomando la iniciativa y asumiendo de modo activo la responsabilidad de que las cosas sucedan. Gestionando, promoviendo y comunicando la visión de la estrategia organizacional y motivando el compromiso en otros.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(47,'Flexibilidad',1,'Nos adaptamos a un aprendizaje continuo enfocado en una innovación cultural.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(48,'Trabajo en Equipo',1,'Trabajamos con persistencia en los resultados de la compañía con efectividad, cumpliendo con las políticas y procedimientos organizacionales.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(49,'Desarrollo de Oportunidad de Negocio',2,'Trabajamos en el posicionamiento de nuestra marca basados en estrategias sensitivas, soportándonos en distintos entornos.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(50,'Planificación y Organización',3,'Controlamos de manera meticulosa nuestro proceso de principio a fin, asegurando las buenas prácticas.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(51,'Compromiso y responsabilidad',5,'Nos enfocamos en construir y alcanzar los objetivos organizacionales, ciñéndonos a los estándares normativos vigentes en procura de proteger legalmente a la compañía.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(52,'Trabajo en Equipo',1,'Trabajamos con persistencia en los resultados de la compañía con efectividad, cumpliendo con las políticas y procedimientos organizacionales.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(53,'Orientación a resultados',1,'Respiramos los éxitos y encontramos las mejoras de la compañía con el más alto sentido de pertenencia; buscamos la excelencia siendo parte del resultado; cada proceso bien ejecutado engrana un logro en conjunto.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(54,'Flexibilidad',1,'Nos adaptamos a un aprendizaje continuo enfocado en una innovación cultural.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(55,'Desarrollo de Oportunidad de Negocio',2,'Trabajamos en el posicionamiento de nuestra marca basados en estrategias sensitivas, soportándonos en distintos entornos.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(56,'Planificación y Organización',3,'Controlamos de manera meticulosa nuestro proceso de principio a fin, asegurando las buenas prácticas.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(57,'Compromiso y responsabilidad',5,'Nos enfocamos en construir y alcanzar los objetivos organizacionales, ciñéndonos a los estándares normativos vigentes en procura de proteger legalmente a la compañía.','2024-10-02 23:12:49','2024-10-02 23:12:49'),(58,'Participar en las actividades de formación y desarrollo de la compañía',15,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(59,'Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión de la Seguridad y Salud en el Trabajo de la empresa',14,NULL,'2024-10-02 23:12:49','2024-10-02 23:12:49');
/*!40000 ALTER TABLE `competencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competenciasempresas`
--

DROP TABLE IF EXISTS `competenciasempresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competenciasempresas` (
  `idCompetencia` int NOT NULL,
  `idEmpresa` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idCompetencia`,`idEmpresa`),
  UNIQUE KEY `CompetenciasEmpresas_idEmpresa_idCompetencia_unique` (`idCompetencia`,`idEmpresa`),
  KEY `idEmpresa` (`idEmpresa`),
  CONSTRAINT `competenciasempresas_ibfk_1` FOREIGN KEY (`idCompetencia`) REFERENCES `competencias` (`idCompetencia`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `competenciasempresas_ibfk_2` FOREIGN KEY (`idEmpresa`) REFERENCES `empresas` (`idEmpresa`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competenciasempresas`
--

LOCK TABLES `competenciasempresas` WRITE;
/*!40000 ALTER TABLE `competenciasempresas` DISABLE KEYS */;
INSERT INTO `competenciasempresas` VALUES (1,2,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(2,2,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(3,2,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(4,2,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(5,2,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(6,7,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(7,7,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(8,7,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(9,7,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(10,7,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(11,7,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(12,7,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(13,7,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(14,7,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(15,7,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(16,7,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(17,7,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(18,7,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(19,3,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(20,3,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(21,3,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(22,3,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(23,3,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(24,1,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(25,1,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(26,1,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(27,1,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(28,1,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(29,6,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(30,6,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(31,6,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(32,6,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(33,6,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(34,6,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(35,6,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(36,6,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(37,6,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(38,8,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(39,8,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(40,8,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(41,8,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(42,8,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(43,8,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(44,8,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(45,4,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(46,8,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(47,4,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(48,4,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(49,4,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(50,4,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(51,4,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(52,5,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(53,5,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(54,5,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(55,5,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(56,5,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(57,5,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(58,7,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(59,7,'2024-10-02 23:12:49','2024-10-02 23:12:49');
/*!40000 ALTER TABLE `competenciasempresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competenciasnivelescargos`
--

DROP TABLE IF EXISTS `competenciasnivelescargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competenciasnivelescargos` (
  `idCompetencia` int NOT NULL,
  `idNivelCargo` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idCompetencia`,`idNivelCargo`),
  UNIQUE KEY `CompetenciasNivelesCargos_idNivelCargo_idCompetencia_unique` (`idCompetencia`,`idNivelCargo`),
  KEY `idNivelCargo` (`idNivelCargo`),
  CONSTRAINT `competenciasnivelescargos_ibfk_1` FOREIGN KEY (`idCompetencia`) REFERENCES `competencias` (`idCompetencia`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `competenciasnivelescargos_ibfk_2` FOREIGN KEY (`idNivelCargo`) REFERENCES `nivelcargos` (`idNivelCargo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competenciasnivelescargos`
--

LOCK TABLES `competenciasnivelescargos` WRITE;
/*!40000 ALTER TABLE `competenciasnivelescargos` DISABLE KEYS */;
INSERT INTO `competenciasnivelescargos` VALUES (1,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(2,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(3,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(4,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(5,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(6,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(7,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(8,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(9,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(10,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(11,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(12,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(13,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(14,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(15,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(16,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(17,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(18,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(19,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(20,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(21,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(22,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(23,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(24,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(25,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(26,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(27,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(28,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(29,1,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(29,4,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(30,1,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(30,2,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(30,3,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(30,4,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(31,1,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(31,2,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(31,3,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(31,4,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(32,2,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(32,3,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(33,2,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(34,3,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(35,1,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(36,2,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(36,3,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(36,4,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(37,4,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(38,6,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(58,1,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(58,7,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(58,8,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(58,9,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(58,10,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(58,11,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(58,12,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(58,13,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(58,27,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(59,1,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(59,7,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(59,8,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(59,9,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(59,10,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(59,11,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(59,12,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(59,13,'2024-10-03 01:12:58','2024-10-03 01:12:58'),(59,27,'2024-10-03 01:12:58','2024-10-03 01:12:58');
/*!40000 ALTER TABLE `competenciasnivelescargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compromisos`
--

DROP TABLE IF EXISTS `compromisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compromisos` (
  `idCompromiso` int NOT NULL AUTO_INCREMENT,
  `idEvalRealizada` int NOT NULL,
  `idCompetencia` int NOT NULL,
  `comentario` text COLLATE utf8mb4_general_ci NOT NULL,
  `estado` enum('Por Iniciar','En curso','Finalizado') COLLATE utf8mb4_general_ci NOT NULL,
  `fechaCumplimiento` datetime NOT NULL,
  `Retroalimentacion` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idCompromiso`),
  KEY `idEvalRealizada` (`idEvalRealizada`),
  KEY `idCompetencia` (`idCompetencia`),
  CONSTRAINT `compromisos_ibfk_1` FOREIGN KEY (`idEvalRealizada`) REFERENCES `evaluacionesrealizadas` (`idEvalRealizada`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `compromisos_ibfk_2` FOREIGN KEY (`idCompetencia`) REFERENCES `competencias` (`idCompetencia`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compromisos`
--

LOCK TABLES `compromisos` WRITE;
/*!40000 ALTER TABLE `compromisos` DISABLE KEYS */;
/*!40000 ALTER TABLE `compromisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamentos`
--

DROP TABLE IF EXISTS `departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamentos` (
  `idDepartamento` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idDepartamento`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamentos`
--

LOCK TABLES `departamentos` WRITE;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
INSERT INTO `departamentos` VALUES (1,'Arauca','2024-10-18 17:15:12','2024-10-18 17:15:12'),(2,'Amazonas','2024-10-18 17:15:12','2024-10-18 17:15:12'),(3,'Antioquia','2024-10-18 17:15:12','2024-10-18 17:15:12'),(4,'Atlántico','2024-10-18 17:15:12','2024-10-18 17:15:12'),(5,'Bolívar','2024-10-18 17:15:12','2024-10-18 17:15:12'),(6,'Boyacá','2024-10-18 17:15:12','2024-10-18 17:15:12'),(7,'Caldas','2024-10-18 17:15:12','2024-10-18 17:15:12'),(8,'Caquetá','2024-10-18 17:15:12','2024-10-18 17:15:12'),(9,'Casanare','2024-10-18 17:15:12','2024-10-18 17:15:12'),(10,'Cauca','2024-10-18 17:15:12','2024-10-18 17:15:12'),(11,'Cesar','2024-10-18 17:15:12','2024-10-18 17:15:12'),(12,'Chocó','2024-10-18 17:15:12','2024-10-18 17:15:12'),(13,'Córdoba','2024-10-18 17:15:12','2024-10-18 17:15:12'),(14,'Cundinamarca','2024-10-18 17:15:12','2024-10-18 17:15:12'),(15,'Guainía','2024-10-18 17:15:12','2024-10-18 17:15:12'),(16,'Guaviare','2024-10-18 17:15:12','2024-10-18 17:15:12'),(17,'Huila','2024-10-18 17:15:12','2024-10-18 17:15:12'),(18,'La Guajira','2024-10-18 17:15:12','2024-10-18 17:15:12'),(19,'Magdalena','2024-10-18 17:15:12','2024-10-18 17:15:12'),(20,'Meta','2024-10-18 17:15:12','2024-10-18 17:15:12'),(21,'Nariño','2024-10-18 17:15:12','2024-10-18 17:15:12'),(22,'Norte de Santander','2024-10-18 17:15:12','2024-10-18 17:15:12'),(23,'Putumayo','2024-10-18 17:15:12','2024-10-18 17:15:12'),(24,'Quindío','2024-10-18 17:15:12','2024-10-18 17:15:12'),(25,'Risaralda','2024-10-18 17:15:12','2024-10-18 17:15:12'),(26,'San Andrés y Providencia','2024-10-18 17:15:12','2024-10-18 17:15:12'),(27,'Santander','2024-10-18 17:15:12','2024-10-18 17:15:12'),(28,'Sucre','2024-10-18 17:15:12','2024-10-18 17:15:12'),(29,'Tolima','2024-10-18 17:15:12','2024-10-18 17:15:12'),(30,'Valle del Cauca','2024-10-18 17:15:12','2024-10-18 17:15:12'),(31,'Vaupés','2024-10-18 17:15:12','2024-10-18 17:15:12'),(32,'Vichada','2024-10-18 17:15:12','2024-10-18 17:15:12');
/*!40000 ALTER TABLE `departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `descriptores`
--

DROP TABLE IF EXISTS `descriptores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `descriptores` (
  `idDescriptor` int NOT NULL AUTO_INCREMENT,
  `idCompetencia` int NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idDescriptor`),
  KEY `idCompetencia` (`idCompetencia`),
  CONSTRAINT `descriptores_ibfk_1` FOREIGN KEY (`idCompetencia`) REFERENCES `competencias` (`idCompetencia`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=216 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `descriptores`
--

LOCK TABLES `descriptores` WRITE;
/*!40000 ALTER TABLE `descriptores` DISABLE KEYS */;
INSERT INTO `descriptores` VALUES (1,45,'Esta constantemente buscando mecanismos para mejorar.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(2,45,'Ejecuta las acciones señaladas en pro de conseguir los resultados previstos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(3,47,'Propone pequeñas modificaciones en su ámbito de responsabilidad específico.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(4,47,'Sus tiempos de respuesta frente a las demandas cambiantes del medio son adecuados.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(5,47,'Comprende y acepta los cambios organizacionales que impactan su área de trabajo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(6,48,'Colabora y coopera con los demás. Comparte información y mantiene a sus pares al tanto de sus avances.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(7,48,'Promueve un buen ambiente de trabajo con sus compañeros.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(8,49,'Responde ágilmente ante las urgencias y demandas que se presentan en su día a día.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(9,49,'Comprende los objetivos de su área y el impacto de su rol en los mismos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(10,50,'Entrega resultados en los tiempos estipulados siguiendo los lineamientos de sus lideres.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(11,49,'Aplica y pone a disposición del área su conocimiento y experiencia para facilitar la consecución de objetivos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(12,51,'Finaliza con éxito las tareas que inicia.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(13,50,'Sigue la metodología y procedimientos a fin de garantizar un adecuado control de las actividades y recursos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(14,50,'Tiene claridad de las actividades que realizará durante el día y organiza su tiempo para cumplirlas.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(15,51,'Cumple con los objetivos encomendados y realiza tareas adicionales que puedan mejorar su labor.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(16,51,'Se muestra responsable y cuidadoso de los recursos materiales asignados por la organización para el buen desempeño de su labor.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(17,45,'Consigue los resultados previstos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(19,45,'Es eficiente en el uso de los recursos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(20,47,'Hace seguimiento y confirma el grado de aceptación del cambio al interior de su equipo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(21,47,'Genera cambios en su área, logrando aportar con ellos al funcionamiento global de la compañía.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(22,47,'Logra involucrar al equipo de trabajo en los procesos de cambio de la compañía de manera efectiva.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(23,48,'Mantiene una actitud abierta para aprender de los otros.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(24,48,'Promueve la colaboración entre equipos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(25,48,'Solicita de manera respetuosa opinión de los miembros de su equipo, valorando las contribuciones ajenas, aun cuando se le planteen diferentes puntos de vista.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(26,49,'Comunica a su equipo de trabajo información relevante acerca de los objetivos de la empresa.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(27,49,'Define estándares de servicio para su equipo de trabajo requeridos según las necesidades de las diferentes áreas de la organización.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(28,49,'Asume las responsabilidades por los servicios ofrecidos por el equipo que lidera, según los estándares definidos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(29,50,'Realiza ajustes oportunos a los procesos de su área teniendo en cuenta el seguimiento, organizando aquellos aspectos que no se ajusten a lo planificado.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(30,50,'Hace observaciones a su equipo de trabajo que permiten realizar ajustes oportunos a los procesos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(31,50,'Aplica metodologías y procedimientos que permiten garantizar un adecuado control de las actividades y recursos para su trabajo y el de su equipo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(32,51,'Promueve en su equipo de trabajo la constancia, perseverancia y compromiso con respecto a los objetivos asignados por la organización.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(33,51,'Realiza sus tareas tomando en consideración el objetivo que tienen y orientando su desempeño a la consecución de éste.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(34,51,'Asume y acepta las responsabilidades de su rol y lleva a su equipo al mismo nivel de responsabilidad.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(35,45,'Asume metas desafiantes y se orienta a la mejora de sus niveles de rendimiento en el marco de las estrategias de la organización.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(36,45,'Modifica métodos de trabajo con el propósito de lograr mejoras en el rendimiento propio y el de toda la organización, encontrando formas más eficientes de hacer las cosas.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(37,45,'Sus estrategias de trabajo se orientan a superar los objetivos propuestos por la organización.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(38,47,'Implementa estrategias para la realización de seguimiento a los cambios de la organización.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(39,47,'Hace una adecuada interpretación de los cambios producidos en el entorno, logrando comprenderlos y comunicarlos de manera efectiva a los miembros de su equipo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(40,45,'Planea sus metas con base a criterios rentables costo-beneficio.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(41,47,'Desde la estrategia ayuda a establecer la dirección adecuada del cambio organizativo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(42,48,'Es un referente al interior de la organización en el manejo de equipos de trabajo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(43,48,'Prioriza los objetivos organizacionales de largo plazo sobre los propios o los de grupo en el corto plazo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(44,47,'Involucra a su equipo en el cambio ayudando a superar las dificultades asociadas al proceso.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(45,48,'Apoya el desempeño de otras áreas de la compañía y fomenta el intercambio de información y experiencias.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(46,49,'Genera proactivamente planes de acción para garantizar el cumplimiento de los objetivos de la organización.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(47,49,'Integra las distintas prioridades de las áreas funcionales y negocios en la generación de una única estrategia.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(48,49,'Utiliza indicadores de gestión para monitorear el cumplimiento de metas de su equipo y realizar los ajustes necesarios para su mejora.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(49,49,'Identifica oportunidades para la compañía, mediante el análisis y desarrollo de oportunidades del mercado que permitan alcanzar la visión corporativa.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(50,49,'Anticipa las necesidades de los clientes con el objetivo de elevar y fortalecer la cultura de servicio.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(51,50,'Hace trazabilidad de los procesos de la organización e identifica oportunidades de mejora en ellos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(52,50,'Toma decisiones de forma oportuna con respecto a los ajustes en sus procesos, teniendo en cuenta el seguimiento, organizando aquellos aspectos que no se ajusten a lo planificado.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(53,50,'Define y dirige procesos de trabajo de manera efectiva, enfocándose a realizar uso racional de los recursos implicados.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(54,51,'Acepta la responsabilidad sobre los resultados de su área y su organización, incluso cuando son negativos, y crea estrategias para cumplir con los objetivos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(55,51,'Es constante con sus objetivos y se enfoca en ellos a pesar de posibles distracciones e impedimentos externos dedicando toda su atención y esfuerzos al logro de estos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(56,51,'Sus estrategias de seguimiento a los objetivos garantizan el cumplimiento de los resultados a nivel de la organización.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(57,38,'Ofrece información útil a sus grupos de interés y presta una atención grata y amable, haciendo seguimiento a su satisfacción.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(58,38,'Soluciona los problemas de sus grupos de interés con rapidez, comprometiéndose personalmente en su resolución.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(59,38,'Actúa oportunamente en los procesos transversales en los que participa, a fin de optimizar los tiempos de respuesta a requerimientos internos y externos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(60,39,'Busca oportunidades de aprendizaje para su desarrollo y el aporte a los resultados a su cargo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(61,39,'Participa en grupos de trabajo con el fin de compartir y adquirir conocimientos que optimicen la consecución de los resultados.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(62,40,'Impulsa, construye y mantiene redes de relaciones con clientes y compañeros de trabajo, encontrando puntos en común que vayan encaminados al cumplimiento de los resultados.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(63,42,'Toma medidas inmediatas para superar los obstáculos presentados en el día a día.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(64,40,'Llega a acuerdos con los diferentes actores de la cadena de valor, manteniendo claridad en la oferta de valor presentada, desde el inicio hasta el final.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(65,42,'Utiliza sistemas de medición prácticos para evidenciar la consecución de sus resultados.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(66,42,'Actúa con constancia y firmeza hasta lograr los objetivos de corto plazo con un nivel de calidad y eficiencia adecuado.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(67,41,'Demuestra método y orden en el manejo de datos o información específica.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(68,41,'Identifica, recolecta y comparte información clave, con el fin de garantizar eficiencia en los servicios prestados por la organización.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(69,41,'Aporta profundidad a los análisis de información en los que interviene.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(70,38,'Ofrece un servicio oportuno y de calidad a sus grupos de interés, buscando siempre la satisfacción de sus necesidades.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(71,38,'Mantiene una actitud constante y genuina de servicio, demostrando amabilidad, respeto y cordialidad a sus grupos de interés.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(72,38,'Mantiene actualizados a sus grupos de interés con relación a los asuntos en curso y responde a sus preguntas, quejas o problemas.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(73,39,'Comparte su conocimiento con otros de forma espontánea.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(74,39,'Utiliza diferentes fuentes de información para adquirir conocimiento, que genere valor en sus actividades diarias.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(75,40,'Actúa de manera eficiente, entendiendo cómo el cumplimiento de sus actividades impacta en las diferentes áreas.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(76,40,'Asume apropiadamente su responsabilidad y participa con otros para el logro del resultado.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(77,42,'Ve posibilidades de actuación aún en situaciones negativas y trabaja con constancia para conseguir los objetivos planteados.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(78,42,'Lleva a cabo las actividades bajo su responsabilidad en los tiempos acordados y con la calidad esperada.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(79,42,'Presenta soluciones y alternativas, manteniendo el foco en el resultado esperado.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(80,41,'Sabe utilizar apropiadamente la información para el logro de sus resultados.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(81,41,'Es minucioso en el manejo de la información.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(82,41,'Analiza y prioriza la información de una manera precisa.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(83,43,'Valora los diferentes aportes y las contribuciones de los miembros del equipo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(84,43,'Proporciona los recursos necesarios para alcanzar las metas requeridas.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(85,44,'Se asegura que el grupo disponga de la información necesaria para realizar su trabajo y expone las razones en las que se basan las decisiones tomadas.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(86,44,'Busca apoyo y asesoramiento, que le permiten resolver los problemas que se le presentan en su gestión, en las personas adecuadas.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(87,38,'Atiende las inquietudes del cliente interno y externo en la dinámica del negocio, y busca alternativas que garanticen la satisfacción de sus necesidades, de acuerdo con los lineamientos de la Compañía.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(88,46,'Logra interesar favorablemente a sus oyentes respecto de sus opiniones o ideas.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(89,38,'Promueve con el ejemplo los altos estándares de servicio en la compañía.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(90,38,'Indaga y mantiene una comunicación abierta con sus grupos de interés, sobre sus expectativas y nivel de satisfacción, y se preocupa porque ellos también conozcan las suyas.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(91,46,'Supera las objeciones más importantes que se le presentan.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(92,39,'Crea un ambiente de trabajo propicio para intercambiar conocimientos e ideas, buscando una mejora continua en los procesos y resultados de la organización.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(93,40,'Identifica las personas claves para el éxito de los resultados de su área y la Organización, desarrollando relaciones a largo plazo con éstos a fin de obtener los resultados esperados.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(94,39,'Identifica los equipos y personas que tienen el conocimiento y las mejores prácticas, para desarrollar relaciones sinérgicas y para resolver situaciones o problemáticas acerca de su trabajo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(95,42,'Verifica el cumplimiento de los estándares de calidad y normas establecidas por la organización, y propone planes de acción, que mejoren el desempeño.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(96,40,'Es directo y asertivo al comunicar sus puntos de vista, balanceando de esta manera las relaciones y asegurando el alcance de las metas Organizacionales.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(97,42,'Garantiza el cumplimiento de los planes y programas asignados, enfrentando los obstáculos que se puedan presentar.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(98,42,'Coordina la ejecución de las acciones de acuerdo con las prioridades a corto y mediano plazo; controla y encamina los resultados que no se estén dando dentro de su área.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(99,41,'Impulsa el flujo correcto de información hacia los grupos de interés.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(100,41,'Identifica las tendencias y discrepancias en la información y actúa generando soluciones.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(101,41,'Hace conexiones de información aparentemente no relacionada y define controles o planes de contingencia, para prevenir riesgos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(102,43,'Demuestra confianza en los demás, reconociendo sus capacidades, para cumplir sus responsabilidades y alcanzar objetivos retadores.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(103,43,'Acompaña y encamina la ejecución del equipo asegurando el resultado esperado.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(104,44,'Toma decisiones oportunamente que permiten el cumplimiento de los objetivos, las implementa y asume la corresponsabilidad con su equipo de trabajo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(105,46,'Compromete a los demás con sus propuestas, consigue que los demás participen voluntariamente de sus objetivos, políticas y criterios.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(106,44,'Muestra capacidad para desarrollar una visión clara de los futuros desafíos empresariales y traduce esto en estrategias en el mediano y corto plazo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(107,46,'Tiene impacto sobre las personas con las que trabaja, quiénes demuestran tener en cuenta las pautas que él sugiere.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(108,38,'Establece una relación con perspectivas de largo plazo con sus grupos de interés (accionistas, proveedores, clientes, gobierno, colaboradores, etc.), crea estrategias para atender a cada uno, de acuerdo con su rol.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(109,38,'Indaga proactivamente más allá de las necesidades manifestadas por los grupos de interés; diseña y estructura productos y servicios que satisfagan esas necesidades.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(110,39,'Lidera Iniciativas que conecten el conocimiento organizacional, las capacidades y características de los colaboradores, con las estrategias organizacionales, para el logro de objetivos y resultados.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(111,40,'Realiza alianzas estratégicas con una visión integral para el logro de los resultados organizacionales.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(112,39,'Dirige equipos de trabajo que a partir del conocimiento agreguen valor y beneficios a la organización.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(113,40,'Construye redes de relaciones y contactos estratégicos, que le permitan identificar o anticipar oportunidades relacionadas con los negocios.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(114,42,'Diseña planes directamente relacionados con los objetivos corporativos, estableciendo los estándares y normas a cumplir.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(115,42,'Encamina objetivamente todos los recursos que tiene bajo su responsabilidad a la consecución de resultados sostenibles en el tiempo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(116,42,'Aprovecha las oportunidades del mercado y plantea estrategias con nuevos enfoques que garanticen la sostenibilidad del negocio.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(117,41,'Usa conjuntos de datos e información diversa y la integra para derivar ideas razonables que creen una visión, con el fin de desarrollar la capacidad organizacional a futuro.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(118,43,'Recompensa a los que lo hacen bien, orientando al equipo hacia la excelencia y motivándolos a conseguir resultados ambiciosos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(119,41,'Lidera el desarrollo de soluciones a situaciones complejas que requieren de análisis profundo de información, con el fin de poder generar soluciones sostenibles en el tiempo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(120,41,'Demuestra en todos sus análisis de información, gran rigor y precisión para aportar criterios y planteamientos valiosos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(121,43,'Muestra interés por el mejoramiento de la calidad de vida de sus colaboradores, a nivel laboral, profesional y personal, buscando incrementar la productividad organizacional.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(122,44,'Identifica y evalúa los riesgos asociados a la consecución de los objetivos organizacionales, manteniendo y mejorando el posicionamiento de la organización frente a la industria.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(123,44,'Establece un plan de acción para alcanzar un objetivo o visión a largo plazo, incluyendo múltiples escenarios y planes de contingencia con base en la identificación de una gran variedad de problemas potenciales o posibilidades futuras.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(124,46,'Impulsa cambios en las políticas, procesos y métodos en respuesta a futuras tendencias o desarrollos en el sector y el negocio.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(125,46,'Desarrolla e implementa estrategias de comunicación y relaciones públicas para conseguir apoyo a sus ideas o planes de manera sostenible.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(126,2,'Mantiene una actitud permanente de ajustar sus actividades hacia la satisfacción de las necesidades de los clientes, aun cuando esto le represente acciones adicionales a las funciones de su cargo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(127,2,'Logra obtener la admiración y aprobación de sus clientes por el trabajo realizado o servicio prestado.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(128,2,'Demuestra una actitud de interés por las necesidades de sus clientes, estimulando y motivando a otros a la prestación de un servicio de Excelencia.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(129,2,'Considera la plena satisfacción del cliente como un criterio esencial de la ejecución de sus labores.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(130,4,'Se apropia de situaciones que afectan a la organización, independiente de si estas forman parte del ámbito de sus responsabilidades.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(131,4,'Aplica seguimiento al resultado de los compromisos adquiridos, optimizando al máximo el recurso invertido e informando sistemáticamente los avances.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(132,4,'Posee una disposición que lo lleva a comprometerse con las responsabilidades y las metas asignadas, asumiéndolas como un desafío personal independientemente de los controles que reciba.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(133,3,'Expresa en forma clara lo que piensa, siente o necesita, teniendo en cuenta los derechos, sentimientos y valores de sus interlocutores.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(134,4,'Se anticipa a las dificultades que surgen para cumplir sus responsabilidades y las enfrenta con su equipo si corresponde.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(135,3,'Al momento de comunicarse tiene en cuenta referencias y motivaciones personales de los demás para atraer el interés de los mismos, con poder de convicción y animando a su interlocutor.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(136,3,'Establece comunicación empática con los demás, empleando un vocabulario respetuoso y acertado.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(137,3,'Entiende el sentido o el por qué los demás actúan en un momento de una determinada manera, y se esfuerza por mantener una posición de equilibrio frente a su interlocutor.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(138,5,'Logra ejecutar su tarea de acuerdo al recurso presupuestado contribuyendo al cumplimiento de la misión institucional y promueve el uso eficiente de los mismos como una acción éticamente obligatoria.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(139,5,'Denota una vocación especial por optimizar los recursos por lo cual presupuesta cuidadosamente su utilización.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(140,5,'Realiza seguimiento permanente para garantizar el control sobre la utilización de los recursos asignados.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(141,5,'Además de planificar los requerimientos de recursos, busca maneras creativas e innovadoras para su utilización eficiente bajo la perspectiva de costo-beneficio y se preocupa en forma permanente por la economía en el uso de los recursos a su cargo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(142,1,'Propone permanentemente acciones e ideas creativas e innovadoras para mejorar continuamente la ejecución de sus tareas.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(143,1,'Implementa nuevos métodos y/o técnicas que representan a nivel personal y organizacional una ventaja competitiva en la ejecución de su tarea.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(144,1,'Implementa mejoras que fortalecen la eficiencia y productividad de la entidad y el cumplimiento de los propósitos de la misma.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(145,1,'Es recursivo, innovador y práctico. Busca nuevas alternativas de solución y se arriesga a romper los esquemas tradicionales.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(146,7,'Relación en términos de contenido, exactitud y presentación, entre el resultado de los trabajos y las instrucciones dadas.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(147,6,'Grado de conocimiento del trabajo a ejecutar ayudado por la experiencia y el entrenamiento.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(148,9,'Realización y entrega de los trabajos a tiempo, teniendo en cuenta los requerimientos del servicio y la optimización del mismo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(149,10,'Utilización racional de todos los recursos disponibles que de cómo resultado la realización eficiente de las funciones.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(150,8,'Cumplimiento de las acciones, deberes y compromisos inherentes al servicio, asumiendo las consecuencias que se deriven del mismo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(151,11,'Comportamiento con superiores, compañeros y usuarios del servicio y disposición para dar y recibir colaboración de manera que contribuya a establecer un ambiente laboral de cordialidad.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(152,13,'Capacidad de movilización de actitudes positivas y recursos de las personas para el trabajo en equipo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(153,12,'Medida en que demuestra interés, entusiasmo y disposición para ejercer las funciones del cargo y para adquirir conocimientos que posibiliten su desarrollo y mejoren su rendimiento.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(154,16,'Comprensión del trabajo y las instrucciones que se le han dado, atención e interés para aceptar las ideas e indicaciones sin repeticiones seguidas.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(155,14,'Capacidad de generar nuevas ideas y mejores formas de realizar el trabajo, tendientes al mejoramiento y la eficiencia en las labores.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(156,15,'Interés y participación en los diferentes programas que emprende la institución con miras al mejoramiento de sus procesos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(157,17,'Deseo y voluntad de progresar de alcanzar mayores responsabilidades, capacidad de ir un poco más allá de lo asignado y autocorregirse.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(158,18,'Interés en la adquisición de nuevos conocimientos para mejorar la ejecución de las labores.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(159,18,'Implementar eficazmente en sus actividades los conocimientos adquiridos en las capacitaciones recibidas.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(160,24,'Conoce el concepto de humanización y se mantiene enfocado en el servicio que se debe prestar, de una manera efectiva, siendo empático a las necesidades de los demás.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(161,24,'Se comunica de manera asertiva expresándose de manera cordial y respetuosa, lo que le permite abordar situaciones críticas con éxito.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(162,24,'Adopta acciones para satisfacer los requerimientos de sus clientes internos y/o externos, de conformidad a las expectativas de la organización.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(163,24,'Cuenta con actitud de servicio, muestra empatía y comprensión a su interlocutor y se ajusta a los diferentes momentos que se puedan presentar en su gestión.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(164,25,'Se enfoca con decisión y entusiasmo al cumplimiento de las metas de su cargo, ya que es consciente del impacto de su gestión frente al área y a la organización.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(165,25,'Cumple con efectividad plazos, procedimientos y resultados, con respecto a sus compromisos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(166,25,'Asume con propiedad su rol en el equipo, aportando ideas y propuestas que mejoran los procesos o procedimientos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(167,25,'Asume y se apega a los protocolos de calidad, gestionando las acciones pertinentes, el manejo de documentación implicada y las normas que la rigen.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(168,26,'Proporciona cuidados a las personas de manera solidaria, digna, con respeto, empatía, teniendo en cuenta sus decisiones y sus valores.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(169,26,'Su práctica está alineada con los estándares de calidad y seguridad del paciente, y participa en la implementación de acciones de mejora.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(170,26,'Busca el mejor resultado en salud para las personas, siendo consciente de las implicaciones humanas y económicas de cada una de sus decisiones.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(171,26,'Genera valor en cada atención, mejorando la experiencia de las personas en los servicios de salud.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(172,27,'Analiza, organiza y presenta datos numéricos. Identifica lo más importante y significativo de los datos obtenidos, a fin de generar planes de acción.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(173,27,'Realiza una buena gestión de los recursos obteniendo los resultados deseados de la manera más eficiente posible, además de realizar un seguimiento y control de todo el proceso.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(174,27,'Prioriza las tareas, realiza un seguimiento conforme a su desarrollo y las reorganiza ante los imprevistos que pueden surgir.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(175,27,'Realiza una adecuada planeación y seguimiento de su trabajo contemplando los tiempos y recursos disponibles para el desarrollo de sus actividades.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(176,23,'Estudia y analiza la dinámica del negocio y el entorno, identificando cambios y oportunidades a largo plazo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(177,23,'Monitorea los objetivos estratégicos e indicadores de la empresa, en concordancia con lo que sucede en el entorno competitivo, permitiendo ajustes precisos y oportunos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(178,23,'Se articula con los demás procesos de la organización, para trabajar conjuntamente a fin de mejorar el alcance e impacto de sus acciones y resultados.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(179,23,'Conoce ampliamente los factores claves de la planeación estratégica de la organización, así como el nivel de aporte que se espera con los resultados de su gestión.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(180,29,'Alcanza los resultados establecidos para su trabajo, con calidad y oportunidad, manteniendo un alto nivel de desempeño y orientándose a alcanzar objetivos retadores, que generan enriquecimiento y valor a los procesos en los que se implica.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(181,30,'Es abierto y flexible a los cambios y necesidades del entorno, modificando sus actitudes y comportamientos para el mejoramiento de los procesos en los que participa.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(182,31,'Anticipa, identifica y satisface las necesidades de los usuarios -internos y externos-, reflejando respeto, empatía, trato digno y genuino interés por el otro, en el marco de la política de humanización de la Institución.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(183,33,'Organiza, estructura, procesa, controla, verifica y presenta información pertinente y oportuna relacionada con los procesos en los que participa.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(184,32,'Comprende y atiende las necesidades de los usuarios, demostrando sensibilidad frente a su situación y ofreciendo un trato cercano y equitativo, respetando su intimidad y privacidad.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(185,34,'Posee un amplio y profundo dominio y experiencia en el marco de los estándares de calidad de su campo de acción.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(186,35,'Diseña e implementa planes estratégicos y/o de trabajo, estableciendo prioridades, responsabilidades, recursos y mecanismos de seguimiento, con el fin de cumplir los objetivos institucionales.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(187,36,'Dirige, acompaña, inspira, retroalimenta y reconoce el desempeño de sus colaboradores, orientando los esfuerzos hacia la consecución de resultados y cumplimiento de objetivos compartidos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(188,37,'Orienta acciones que buscan posicionar la Institución, comprendiendo el entorno e implementando estrategias que contribuyan al cumplimiento de la misión y visión.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(189,59,'Cumple con las normas, políticas, reglamentos e instrucciones del SG-SST establecidas por la institución, comprende la Política de Seguridad y Salud en el Trabajo, y colabora activamente en el logro de los objetivos del sistema.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(190,59,'Procura el cuidado integral de su salud (garantizar orden, aseo y seguridad en su lugar de trabajo, utilizar y mantener adecuadamente los elementos de protección personal).','2024-10-03 01:12:58','2024-10-03 01:12:58'),(191,59,'Participa activamente en el desarrollo de actividades relacionadas con SST (Identificación de peligros, reporte oportuno de accidentes e incidentes, reporte de condiciones inseguras y de salud, actividades de capacitación)','2024-10-03 01:12:58','2024-10-03 01:12:58'),(192,58,'Realiza los cursos asignados en el Campus Virtual y asiste a las sesiones de formación programadas, asegurando la adquisición de las competencias necesarias para el desempeño del rol.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(193,58,'Aplica los conocimientos y habilidades adquiridos y presenta oportunamente a Talento Humano los soportes de formación necesarios para el desempeño de las funciones.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(194,19,'Adopta acciones para satisfacer los requerimientos de sus clientes internos y/o externos, de conformidad a las expectativas de la organización.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(195,20,'Asume y se apega a los protocolos de calidad, gestionando las acciones pertinentes, el manejo de documentación implicada y las normas que la rigen.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(196,19,'Conoce el concepto de humanización y se mantiene enfocado en el servicio que se debe prestar, de una manera efectiva, siendo empático a las necesidades de los demás.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(197,19,'Cuenta con actitud de servicio, muestra empatía y comprensión a su interlocutor y se ajusta a los diferentes momentos que se puedan presentar en su gestión.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(198,19,'Se comunica de manera asertiva expresándose de manera cordial y respetuosa, lo que le permite abordar situaciones críticas con éxito.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(199,20,'Asume y se apega a los protocolos de calidad, gestionando las acciones pertinentes, el manejo de documentación implicada y las normas que la rigen.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(200,20,'Cumple con efectividad plazos, procedimientos y resultados, con respecto a sus compromisos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(201,20,'Se enfoca con decisión y entusiasmo al cumplimiento de las metas de su cargo, ya que es consciente del impacto de su gestión frente al área y a la organización.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(202,21,'Busca el mejor resultado en salud para las personas, siendo consciente de las implicaciones humanas y económicas de cada una de sus decisiones.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(203,21,'Genera valor en cada atención, mejorando la experiencia de las personas en los servicios de salud.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(204,21,'Proporciona cuidados a las personas de manera solidaria, digna, con respeto, empatía, teniendo en cuenta sus decisiones y sus valores.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(205,21,'Su práctica está alineada con los estándares de calidad y seguridad del paciente, y participa en la implementación de acciones de mejora.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(206,22,'Analiza, organiza y presenta datos numéricos. Identifica lo más importante y significativo de los datos obtenidos, a fin de generar planes de acción.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(207,22,'Prioriza las tareas, realiza un seguimiento conforme a su desarrollo y las reorganiza ante los imprevistos que pueden surgir.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(208,22,'Realiza una adecuada planeación y seguimiento de su trabajo contemplando los tiempos y recursos disponibles para el desarrollo de sus actividades.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(209,22,'Realiza una buena gestión de los recursos obteniendo los resultados deseados de la manera más eficiente posible, además de realizar un seguimiento y control de todo el proceso.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(210,28,'Conoce ampliamente los factores claves de la planeación estratégica de la organización, así como el nivel de aporte que se espera con los resultados de su gestión.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(211,28,'Estudia y analiza la dinámica del negocio y el entorno, identificando cambios y oportunidades a largo plazo.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(212,28,'Monitorea los objetivos estratégicos e indicadores de la empresa, en concordancia con lo que sucede en el entorno competitivo, permitiendo ajustes precisos y oportunos.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(213,28,'Se articula con los demás procesos de la organización, para trabajar conjuntamente a fin de mejorar el alcance e impacto de sus acciones y resultados.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(214,45,'Periódicamente, revisa el cumplimiento de los objetivos y el desempeño propio y de sus colaboradores a través de indicadores de gestión.','2024-10-03 01:12:58','2024-10-03 01:12:58'),(215,53,'Es eficiente en el uso de los recursos.','2024-10-03 01:12:58','2024-10-03 01:12:58');
/*!40000 ALTER TABLE `descriptores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `descriptoresnivelescargos`
--

DROP TABLE IF EXISTS `descriptoresnivelescargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `descriptoresnivelescargos` (
  `idDescriptor` int NOT NULL,
  `idNivelCargo` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idDescriptor`,`idNivelCargo`),
  UNIQUE KEY `DescriptoresNivelesCargos_idNivelCargo_idDescriptor_unique` (`idDescriptor`,`idNivelCargo`),
  KEY `idNivelCargo` (`idNivelCargo`),
  CONSTRAINT `descriptoresnivelescargos_ibfk_1` FOREIGN KEY (`idDescriptor`) REFERENCES `descriptores` (`idDescriptor`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `descriptoresnivelescargos_ibfk_2` FOREIGN KEY (`idNivelCargo`) REFERENCES `nivelcargos` (`idNivelCargo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `descriptoresnivelescargos`
--

LOCK TABLES `descriptoresnivelescargos` WRITE;
/*!40000 ALTER TABLE `descriptoresnivelescargos` DISABLE KEYS */;
/*!40000 ALTER TABLE `descriptoresnivelescargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresas` (
  `idEmpresa` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `nit` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `urlLogo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idHub` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idEmpresa`),
  KEY `idHub` (`idHub`),
  CONSTRAINT `empresas_ibfk_1` FOREIGN KEY (`idHub`) REFERENCES `hubs` (`idHub`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'CLÍNICA CHIA','NULL','https://zentria.com.co/wp-content/uploads/2023/06/clinica-chia-logo.png',1,'2024-10-02 19:22:19','2024-10-02 19:22:19'),(2,'CLÍNICA GENERAL DEL NORTE','NULL','https://zentria.com.co/wp-content/uploads/2023/06/clinica-norte-logo.png',1,'2024-10-02 19:22:19','2024-10-02 19:22:19'),(3,'BIENESTAR I.P.S','NULL','https://zentria.com.co/wp-content/uploads/2023/06/bienestar.png',1,'2024-10-02 19:22:19','2024-10-02 19:22:19'),(4,'EVEDISA','NULL','https://zentria.com.co/wp-content/uploads/2023/06/evedisa-logo.png',2,'2024-10-02 19:22:19','2024-10-02 19:22:19'),(5,'RONELLY','NULL','https://zentria.com.co/wp-content/uploads/2023/06/ronelly-logo.png',2,'2024-10-02 19:22:19','2024-10-02 19:22:19'),(6,'ONCÓLOGOS DEL OCCIDENTE','NULL','https://zentria.com.co/wp-content/uploads/2023/06/o-occidente-logo.png',3,'2024-10-02 19:22:19','2024-10-02 19:22:19'),(7,'AVIDANTI','NULL','https://zentria.com.co/wp-content/uploads/2023/06/unnamed.png',3,'2024-10-02 19:22:19','2024-10-02 19:22:19'),(8,'HELPHARMA','NULL','https://zentria.com.co/wp-content/uploads/2023/06/helpharma.webp',2,'2024-10-02 23:07:09','2024-10-02 23:07:09');
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluacioncompetencias`
--

DROP TABLE IF EXISTS `evaluacioncompetencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluacioncompetencias` (
  `idEvaluacion` int NOT NULL,
  `idCompetencia` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idEvaluacion`,`idCompetencia`),
  UNIQUE KEY `EvaluacionCompetencias_idCompetencia_idEvaluacion_unique` (`idEvaluacion`,`idCompetencia`),
  KEY `idCompetencia` (`idCompetencia`),
  CONSTRAINT `evaluacioncompetencias_ibfk_1` FOREIGN KEY (`idEvaluacion`) REFERENCES `evaluaciones` (`idEvaluacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `evaluacioncompetencias_ibfk_2` FOREIGN KEY (`idCompetencia`) REFERENCES `competencias` (`idCompetencia`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluacioncompetencias`
--

LOCK TABLES `evaluacioncompetencias` WRITE;
/*!40000 ALTER TABLE `evaluacioncompetencias` DISABLE KEYS */;
INSERT INTO `evaluacioncompetencias` VALUES (1,1,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,2,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,3,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,4,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,5,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,6,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,7,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,8,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,9,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,10,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,11,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,12,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,13,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,14,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,15,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,16,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,17,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,18,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,19,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,20,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,21,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,22,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,23,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,24,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,25,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,26,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,27,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,28,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,29,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,30,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,31,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,32,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,33,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,34,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,35,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,36,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,37,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,38,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,39,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,40,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,41,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,42,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,43,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,44,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,45,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,46,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,47,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,48,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,49,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,50,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,51,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,52,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,53,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,54,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,55,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,56,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,57,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,58,'2024-10-09 13:27:03','2024-10-09 13:27:03'),(1,59,'2024-10-09 13:27:03','2024-10-09 13:27:03');
/*!40000 ALTER TABLE `evaluacioncompetencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluaciones`
--

DROP TABLE IF EXISTS `evaluaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluaciones` (
  `idEvaluacion` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `año` int NOT NULL,
  `activa` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idEvaluacion`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluaciones`
--

LOCK TABLES `evaluaciones` WRITE;
/*!40000 ALTER TABLE `evaluaciones` DISABLE KEYS */;
INSERT INTO `evaluaciones` VALUES (1,'EVALUACIÓN DE DESEMPEÑO',2024,1,'2024-10-02 17:21:58','2024-10-02 17:21:58');
/*!40000 ALTER TABLE `evaluaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluacionesrealizadas`
--

DROP TABLE IF EXISTS `evaluacionesrealizadas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluacionesrealizadas` (
  `idEvalRealizada` int NOT NULL AUTO_INCREMENT,
  `idEvaluacion` int NOT NULL,
  `idEvaluador` int NOT NULL,
  `idColaborador` int NOT NULL,
  `idTipoEvaluacion` int NOT NULL,
  `comentario` text COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idEvalRealizada`),
  KEY `idEvaluacion` (`idEvaluacion`),
  KEY `idEvaluador` (`idEvaluador`),
  KEY `idColaborador` (`idColaborador`),
  KEY `idTipoEvaluacion` (`idTipoEvaluacion`),
  CONSTRAINT `evaluacionesrealizadas_ibfk_1` FOREIGN KEY (`idEvaluacion`) REFERENCES `evaluaciones` (`idEvaluacion`) ON UPDATE CASCADE,
  CONSTRAINT `evaluacionesrealizadas_ibfk_2` FOREIGN KEY (`idEvaluador`) REFERENCES `usuarios` (`idUsuario`) ON UPDATE CASCADE,
  CONSTRAINT `evaluacionesrealizadas_ibfk_3` FOREIGN KEY (`idColaborador`) REFERENCES `usuarios` (`idUsuario`) ON UPDATE CASCADE,
  CONSTRAINT `evaluacionesrealizadas_ibfk_4` FOREIGN KEY (`idTipoEvaluacion`) REFERENCES `tipoevaluaciones` (`idTipoEvaluacion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluacionesrealizadas`
--

LOCK TABLES `evaluacionesrealizadas` WRITE;
/*!40000 ALTER TABLE `evaluacionesrealizadas` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluacionesrealizadas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hubs`
--

DROP TABLE IF EXISTS `hubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hubs` (
  `idHub` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idHub`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hubs`
--

LOCK TABLES `hubs` WRITE;
/*!40000 ALTER TABLE `hubs` DISABLE KEYS */;
INSERT INTO `hubs` VALUES (1,'Business Unit Head Hospitales','2024-10-02 19:22:07','2024-10-02 19:22:07'),(2,'Business Unit Head Gestión Farmacéutica','2024-10-02 19:22:07','2024-10-02 19:22:07'),(3,'Business Unit Head Atención Primaria','2024-10-02 19:22:07','2024-10-02 19:22:07');
/*!40000 ALTER TABLE `hubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nivelcargos`
--

DROP TABLE IF EXISTS `nivelcargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nivelcargos` (
  `idNivelCargo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idNivelCargo`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nivelcargos`
--

LOCK TABLES `nivelcargos` WRITE;
/*!40000 ALTER TABLE `nivelcargos` DISABLE KEYS */;
INSERT INTO `nivelcargos` VALUES (1,'Coordinación','2024-10-02 18:13:49','2024-10-02 18:13:49'),(2,'Asistentes','2024-10-02 18:13:49','2024-10-02 18:13:49'),(3,'Profesional','2024-10-02 18:13:49','2024-10-02 18:13:49'),(4,'Dirección','2024-10-02 18:13:49','2024-10-02 18:13:49'),(5,'Analista','2024-10-02 18:13:49','2024-10-02 18:13:49'),(6,'Regentes','2024-10-02 18:13:49','2024-10-02 18:13:49'),(7,'Asistente','2024-10-02 18:13:49','2024-10-02 18:13:49'),(8,'Auxiliar','2024-10-02 18:13:49','2024-10-02 18:13:49'),(9,'Director Técnico','2024-10-02 18:13:49','2024-10-02 18:13:49'),(10,'Gerente General','2024-10-02 18:13:49','2024-10-02 18:13:49'),(11,'Operativo','2024-10-02 18:13:49','2024-10-02 18:13:49'),(12,'Táctico','2024-10-02 18:13:49','2024-10-02 18:13:49'),(13,'Estrategico','2024-10-02 18:13:49','2024-10-02 18:13:49'),(27,'General','2024-10-02 19:43:05','2024-10-02 19:43:05');
/*!40000 ALTER TABLE `nivelcargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfiles`
--

DROP TABLE IF EXISTS `perfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfiles` (
  `idPerfil` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idPerfil`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfiles`
--

LOCK TABLES `perfiles` WRITE;
/*!40000 ALTER TABLE `perfiles` DISABLE KEYS */;
INSERT INTO `perfiles` VALUES (1,'Colaborador','2024-10-02 17:29:45','2024-10-02 17:29:45'),(2,'Evaluador','2024-10-02 18:02:27','2024-10-02 18:02:27'),(3,'Administrador','2024-10-02 18:02:35','2024-10-02 18:02:35');
/*!40000 ALTER TABLE `perfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuestas`
--

DROP TABLE IF EXISTS `respuestas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuestas` (
  `idRespuesta` int NOT NULL AUTO_INCREMENT,
  `idEvaluacion` int NOT NULL,
  `idEvaluador` int NOT NULL,
  `idColaborador` int NOT NULL,
  `idDescriptor` int NOT NULL,
  `idCalificacion` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idRespuesta`),
  UNIQUE KEY `respuestas_idEvaluador_idColaborador_unique` (`idEvaluador`,`idColaborador`),
  KEY `idEvaluacion` (`idEvaluacion`),
  KEY `idColaborador` (`idColaborador`),
  KEY `idDescriptor` (`idDescriptor`),
  KEY `idCalificacion` (`idCalificacion`),
  CONSTRAINT `respuestas_ibfk_1` FOREIGN KEY (`idEvaluacion`) REFERENCES `evaluaciones` (`idEvaluacion`) ON UPDATE CASCADE,
  CONSTRAINT `respuestas_ibfk_2` FOREIGN KEY (`idEvaluador`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `respuestas_ibfk_3` FOREIGN KEY (`idColaborador`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `respuestas_ibfk_4` FOREIGN KEY (`idDescriptor`) REFERENCES `descriptores` (`idDescriptor`) ON UPDATE CASCADE,
  CONSTRAINT `respuestas_ibfk_5` FOREIGN KEY (`idCalificacion`) REFERENCES `calificaciones` (`idCalificacion`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuestas`
--

LOCK TABLES `respuestas` WRITE;
/*!40000 ALTER TABLE `respuestas` DISABLE KEYS */;
/*!40000 ALTER TABLE `respuestas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sedes`
--

DROP TABLE IF EXISTS `sedes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sedes` (
  `idSede` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `siglas` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `idEmpresa` int NOT NULL,
  `idCiudad` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idSede`),
  KEY `idEmpresa` (`idEmpresa`),
  KEY `idCiudad` (`idCiudad`),
  CONSTRAINT `sedes_ibfk_1` FOREIGN KEY (`idEmpresa`) REFERENCES `empresas` (`idEmpresa`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sedes_ibfk_2` FOREIGN KEY (`idCiudad`) REFERENCES `ciudades` (`idCiudad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sedes`
--

LOCK TABLES `sedes` WRITE;
/*!40000 ALTER TABLE `sedes` DISABLE KEYS */;
INSERT INTO `sedes` VALUES (1,'Clínica avidanti Santa Marta','CASM',7,42,'2024-10-02 19:40:17','2024-10-02 19:40:17'),(2,'Clínica Avidanti Ibagué','CAI',7,61,'2024-10-02 19:40:17','2024-10-02 19:40:17'),(3,'Clínica Avidanti Manizales','CAM',7,20,'2024-10-02 19:40:17','2024-10-02 19:40:17'),(4,'Clínica Cancerológica de Boyacá','CCB',6,14,'2024-10-02 19:40:17','2024-10-02 19:40:17'),(5,'Unión de Cirujanos','UDC',6,52,'2024-10-02 19:40:17','2024-10-02 19:40:17'),(6,'Clínica Avidanti Soacha','CACV',7,33,'2024-10-02 19:40:17','2024-10-02 19:40:17'),(7,'Angiografía de Colombia','ADC',7,47,'2024-10-02 19:40:17','2024-10-02 19:40:17'),(8,'Hospital Infantil Universitario \'Rafael Henao Toro\'','HIU',6,20,'2024-10-02 19:40:17','2024-10-02 19:40:17'),(9,'Clínica San Marcel','ODO',6,20,'2024-10-02 19:40:17','2024-10-02 19:40:17'),(10,'Clínica De Alta Tecnología Armenia','ODO',6,52,'2024-10-02 19:40:17','2024-10-02 19:40:17'),(11,'Oncólogos del Occidente Manizales','ODO',6,57,'2024-10-02 19:40:17','2024-10-02 19:40:17'),(12,'Centro De Investigación Clínica General Del Norte','OCGN',2,10,'2024-10-02 19:40:17','2024-10-02 19:40:17'),(13,'Bienestar IPS Sede Medellín','BIPS',3,3,'2024-10-02 19:40:17','2024-10-02 19:40:17'),(14,'Clínica Chía (Sede Servicios Ambulatorios Chocontá)','CHIA',1,34,'2024-10-02 19:40:17','2024-10-02 19:40:17'),(15,'EVEDISA CEDI Bogotá','EVE',4,34,'2024-10-02 19:40:17','2024-10-02 19:40:17'),(16,'Helpharma FarmaPereira','HELP',8,57,'2024-10-02 19:40:17','2024-10-02 19:40:17'),(17,'CEDI Ronelly','RON',5,3,'2024-10-02 19:40:17','2024-10-02 19:40:17');
/*!40000 ALTER TABLE `sedes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipocompetencia`
--

DROP TABLE IF EXISTS `tipocompetencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipocompetencia` (
  `idTipo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idTipo`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipocompetencia`
--

LOCK TABLES `tipocompetencia` WRITE;
/*!40000 ALTER TABLE `tipocompetencia` DISABLE KEYS */;
INSERT INTO `tipocompetencia` VALUES (1,'Competencia Organizacional','2024-10-02 18:22:11','2024-10-02 18:22:11'),(2,'Funcional por área: Distribución Tradicional','2024-10-02 18:22:11','2024-10-02 18:22:11'),(3,'Funcional por área:: Corporativo','2024-10-02 18:22:11','2024-10-02 18:22:11'),(4,'Líder','2024-10-02 18:22:11','2024-10-02 18:22:11'),(5,'Funcional por área: Dispensación Operaciones','2024-10-02 18:22:11','2024-10-02 18:22:11'),(6,'Competencia Funcional - Asistencial','2024-10-02 18:22:11','2024-10-02 18:22:11'),(7,'Competencia Funcional - Asistencial y Profesional','2024-10-02 18:22:11','2024-10-02 18:22:11'),(8,'Competencia Funcional - Coordinación','2024-10-02 18:22:11','2024-10-02 18:22:11'),(9,'Funcional - Rol Asistencial','2024-10-02 18:22:11','2024-10-02 18:22:11'),(10,'Competencia Funcional - Coordinación y Directivo','2024-10-02 18:22:11','2024-10-02 18:22:11'),(11,'Funcional - Rol Administrativo','2024-10-02 18:22:11','2024-10-02 18:22:11'),(12,'Funcional - Rol Estratégico','2024-10-02 18:22:11','2024-10-02 18:22:11'),(13,'Desempeño','2024-10-02 18:22:11','2024-10-02 18:22:11'),(14,'Funciones de SST','2024-10-02 18:22:11','2024-10-02 18:22:11'),(15,'Autodesarrollo','2024-10-02 18:22:11','2024-10-02 18:22:11');
/*!40000 ALTER TABLE `tipocompetencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoevaluaciones`
--

DROP TABLE IF EXISTS `tipoevaluaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoevaluaciones` (
  `idTipoEvaluacion` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `peso` float DEFAULT '0.1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idTipoEvaluacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoevaluaciones`
--

LOCK TABLES `tipoevaluaciones` WRITE;
/*!40000 ALTER TABLE `tipoevaluaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipoevaluaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `cargo` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `correo` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `contrasena` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `idNivelCargo` int NOT NULL,
  `idPerfil` int NOT NULL,
  `activo` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idUsuario`),
  KEY `idNivelCargo` (`idNivelCargo`),
  KEY `idPerfil` (`idPerfil`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idNivelCargo`) REFERENCES `nivelcargos` (`idNivelCargo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`idPerfil`) REFERENCES `perfiles` (`idPerfil`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1053870487 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (36294647,'Lucas Castillo','Developer','lucas.castillo@zentria.com.co','$2b$10$OKrs/OdQl/UKwvRO8VhtWeLdGil5qPF5Y9PGcbnTQY6E3.lI7DSW2',3,1,1,'2024-10-09 16:45:56','2024-10-09 16:45:56'),(47733223,'Mateo López','Developer','mateo.lópez@zentria.com.co','$2b$10$OKrs/OdQl/UKwvRO8VhtWeLdGil5qPF5Y9PGcbnTQY6E3.lI7DSW2',27,2,1,'2024-10-09 16:45:56','2024-10-09 16:45:56'),(68894889,'Alejandro Jiménez','Developer','alejandro.jiménez@zentria.com.co','$2b$10$OKrs/OdQl/UKwvRO8VhtWeLdGil5qPF5Y9PGcbnTQY6E3.lI7DSW2',27,1,1,'2024-10-09 16:45:56','2024-10-09 16:45:56'),(80523640,'Daniel Martínez','Developer','daniel.martinez@zentria.com.co','$2b$10$OKrs/OdQl/UKwvRO8VhtWeLdGil5qPF5Y9PGcbnTQY6E3.lI7DSW2',10,2,1,'2024-10-09 16:45:56','2024-10-09 16:45:56'),(87692338,'Camila Torres','Developer','camila.torres@zentria.com.co','$2b$10$OKrs/OdQl/UKwvRO8VhtWeLdGil5qPF5Y9PGcbnTQY6E3.lI7DSW2',4,1,1,'2024-10-09 16:45:56','2024-10-09 16:45:56'),(87815991,'Emilia Rojas','Analista de Cartera','emilia.rojas@zentria.com.co','$2b$10$ueHwH5gnyVXg/xbbwcUgYObek9d3SqtjdEDcJJlr78F2liD3TcVge',27,1,1,'2024-10-09 16:45:56','2024-10-17 13:15:15'),(95059296,'Sofía Ramírez','Developer','sofia.ramírez@zentria.com.co','$2b$10$OKrs/OdQl/UKwvRO8VhtWeLdGil5qPF5Y9PGcbnTQY6E3.lI7DSW2',27,1,1,'2024-10-09 16:45:56','2024-10-09 16:45:56'),(100075021,'Maria Camila Gómez','Administradora AD','maria.gomez@zentria.com.co','$2b$10$k2RIEOB1qzBkV/iE7EYu6OVa2i4AvZnul8rLITg6hJkDwMzC5dyiG',27,3,1,'2024-10-02 19:49:45','2024-10-02 19:49:45'),(130460720,'Santiago Fernández','Enfermero','santiago.fernandez@zentria.com.co','$2b$10$vJdyhohyUpcICxY60cKimuF/H1Es3rJdLN79gaGM9MQeGuzSuxI4q',27,1,1,'2024-10-09 16:45:56','2024-10-17 13:12:50'),(146595987,'Valentina García','Developer','valentina.garcía@zentria.com.co','$2b$10$OKrs/OdQl/UKwvRO8VhtWeLdGil5qPF5Y9PGcbnTQY6E3.lI7DSW2',27,1,1,'2024-10-09 16:45:56','2024-10-09 16:45:56'),(152601821,'Isabella Vargas','Developer','isabella.vargas@zentria.com.co','$2b$10$OKrs/OdQl/UKwvRO8VhtWeLdGil5qPF5Y9PGcbnTQY6E3.lI7DSW2',27,1,1,'2024-10-09 16:45:56','2024-10-09 16:45:56'),(1053870486,'Luis Alberto Franco','Developer','luis.franco@zentria.com.co','$2b$10$1cZFpeNnacvv09fl4W.aWeqRQG7V7ebmdpT3b6gWzuIS.sfOWZB/i',27,1,1,'2024-10-02 19:40:55','2024-10-02 19:40:55');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuariosempresas`
--

DROP TABLE IF EXISTS `usuariosempresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuariosempresas` (
  `idUsuario` int NOT NULL,
  `idEmpresa` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idUsuario`,`idEmpresa`),
  UNIQUE KEY `UsuariosEmpresas_idEmpresa_idUsuario_unique` (`idUsuario`,`idEmpresa`),
  KEY `idEmpresa` (`idEmpresa`),
  CONSTRAINT `usuariosempresas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuariosempresas_ibfk_2` FOREIGN KEY (`idEmpresa`) REFERENCES `empresas` (`idEmpresa`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuariosempresas`
--

LOCK TABLES `usuariosempresas` WRITE;
/*!40000 ALTER TABLE `usuariosempresas` DISABLE KEYS */;
INSERT INTO `usuariosempresas` VALUES (36294647,2,'2024-10-08 16:33:27','2024-10-08 16:33:27'),(68894889,7,'2024-10-08 16:33:27','2024-10-08 16:33:27'),(87815991,6,'2024-10-08 16:33:27','2024-10-08 16:33:27'),(95059296,8,'2024-10-08 16:33:27','2024-10-08 16:33:27'),(100075021,1,'2024-10-08 16:33:27','2024-10-08 16:33:27'),(130460720,4,'2024-10-08 16:33:27','2024-10-08 16:33:27'),(146595987,5,'2024-10-08 16:33:27','2024-10-08 16:33:27'),(152601821,3,'2024-10-08 16:33:27','2024-10-08 16:33:27');
/*!40000 ALTER TABLE `usuariosempresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuariosevaluaciones`
--

DROP TABLE IF EXISTS `usuariosevaluaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuariosevaluaciones` (
  `idUsuario` int NOT NULL,
  `idEvaluacion` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idUsuario`,`idEvaluacion`),
  UNIQUE KEY `UsuariosEvaluaciones_idEvaluacion_idUsuario_unique` (`idUsuario`,`idEvaluacion`),
  KEY `idEvaluacion` (`idEvaluacion`),
  CONSTRAINT `usuariosevaluaciones_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuariosevaluaciones_ibfk_2` FOREIGN KEY (`idEvaluacion`) REFERENCES `evaluaciones` (`idEvaluacion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuariosevaluaciones`
--

LOCK TABLES `usuariosevaluaciones` WRITE;
/*!40000 ALTER TABLE `usuariosevaluaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuariosevaluaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuariosevaluadores`
--

DROP TABLE IF EXISTS `usuariosevaluadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuariosevaluadores` (
  `idEvaluador` int NOT NULL,
  `idUsuario` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idEvaluador`,`idUsuario`),
  UNIQUE KEY `usuariosEvaluadores_idEvaluador_idUsuario_unique` (`idEvaluador`,`idUsuario`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `usuariosevaluadores_ibfk_1` FOREIGN KEY (`idEvaluador`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuariosevaluadores_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuariosevaluadores`
--

LOCK TABLES `usuariosevaluadores` WRITE;
/*!40000 ALTER TABLE `usuariosevaluadores` DISABLE KEYS */;
INSERT INTO `usuariosevaluadores` VALUES (100075021,36294647,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(100075021,68894889,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(100075021,87815991,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(100075021,95059296,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(100075021,100075021,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(100075021,130460720,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(100075021,146595987,'2024-10-02 23:12:49','2024-10-02 23:12:49'),(100075021,152601821,'2024-10-02 23:12:49','2024-10-02 23:12:49');
/*!40000 ALTER TABLE `usuariosevaluadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuariossedes`
--

DROP TABLE IF EXISTS `usuariossedes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuariossedes` (
  `idUsuario` int NOT NULL,
  `idSede` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idUsuario`,`idSede`),
  UNIQUE KEY `UsuariosSedes_idSede_idUsuario_unique` (`idUsuario`,`idSede`),
  KEY `idSede` (`idSede`),
  CONSTRAINT `usuariossedes_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuariossedes_ibfk_2` FOREIGN KEY (`idSede`) REFERENCES `sedes` (`idSede`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuariossedes`
--

LOCK TABLES `usuariossedes` WRITE;
/*!40000 ALTER TABLE `usuariossedes` DISABLE KEYS */;
INSERT INTO `usuariossedes` VALUES (36294647,11,'2024-10-08 16:33:27','2024-10-08 16:33:27'),(68894889,16,'2024-10-08 16:33:27','2024-10-08 16:33:27'),(87815991,15,'2024-10-08 16:33:27','2024-10-08 16:33:27'),(95059296,17,'2024-10-08 16:33:27','2024-10-08 16:33:27'),(100075021,14,'2024-10-08 16:33:27','2024-10-08 16:33:27'),(130460720,13,'2024-10-08 16:33:27','2024-10-08 16:33:27'),(146595987,14,'2024-10-08 16:33:27','2024-10-08 16:33:27'),(152601821,12,'2024-10-08 16:33:27','2024-10-08 16:33:27');
/*!40000 ALTER TABLE `usuariossedes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dbtalentpro'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-18 14:12:43

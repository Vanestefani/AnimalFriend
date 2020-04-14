/*eslint-disable*/
import React from "react";

import { Button, Container, Modal, ModalBody, Row, Col } from "reactstrap";

function ModalPoliticas() {
  const [modalPoliticas, setModal1] = React.useState(false);
  return (
    <>
      <a onClick={() => setModal1(true)}>Políticas</a>

      <Modal isOpen={modalPoliticas} toggle={() => setModal1(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal1(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h2 className="title title-up">
            Política de privacidad y protección de datos personales
          </h2>
        </div>
        <ModalBody>
          <p className="text-justify">
            AnimalFriend reconoce la importancia de la seguridad, privacidad y
            confidencialidad de los datos personales de sus clientes, usuarios y
            en general de todos sus grupos de interés respecto de los cuales
            ejerce tratamiento de información personal, por lo que, en
            cumplimiento de las disposiciones constitucionales y legales, adoptó
            la presente POLÍTICA PARA EL TRATAMIENTO DE DATOS PERSONALES.
          </p>

          <h3>Definiciones</h3>
          <ul>
            <li>
              <p className="text-justify">
                <b>Autorización: </b>
                Consentimiento previo, expreso e informado del Titular para
                llevar a cabo el Tratamiento de datos personales.
              </p>
            </li>
            <li>
              <p className="text-justify">
                <b>Aviso de privacidad: </b>
                Comunicación verbal o escrita generada por el responsable,
                dirigida al Titular para el Tratamiento de sus datos personales,
                mediante la cual se le informa acerca de la existencia de las
                políticas de Tratamiento de información que le serán aplicables,
                la forma de acceder a las mismas y las finalidades del
                Tratamiento que se pretende dar a los datos personales.
              </p>
            </li>
            <li>
              <p className="text-justify">
                <b>Base de datos: </b>
                Conjunto organizado de datos personales que sea objeto de
                Tratamiento.
              </p>
            </li>
            <li>
              <p className="text-justify">
                <b>Dato personal: </b>
                Cualquier información vinculada o que pueda asociarse a una o
                varias personas naturales determinadas o determinables.
              </p>
            </li>
            <li>
              <p className="text-justify">
                <b>Dato público: </b>
                Es el dato que no sea semiprivado, privado o sensible. Son
                considerados datos públicos, entre otros, los datos relativos al
                estado civil de las personas, a su profesión u oficio y a su
                calidad de comerciante o de servidor público. Por su naturaleza,
                los datos públicos pueden estar contenidos, entre otros, en
                registros públicos, documentos públicos, gacetas y boletines
                oficiales y sentencias judiciales debidamente ejecutoriadas que
                no estén sometidas a reserva.
              </p>
            </li>
            <li>
              <p className="text-justify">
                <b>Datos sensibles: </b>
                Se entiende por datos sensibles aquellos que afectan la
                intimidad del Titular o cuyo uso indebido puede generar su
                discriminación, tales como aquellos que revelen el origen racial
                o étnico, la orientación política, las convicciones religiosas o
                filosóficas, la pertenencia a sindicatos, organizaciones
                sociales, de derechos humanos o que promueva intereses de
                cualquier partido político o que garanticen los derechos y
                garantías de partidos políticos de oposición, así´ como los
                datos relativos a la salud, a la vida sexual, y los datos
                biométricos.
              </p>
            </li>
            <li>
              <p className="text-justify">
                <b>Encargado del Tratamiento: </b> Persona natural o jurídica,
                pública o privada, que por sí misma o en asocio con otros,
                realice el Tratamiento de datos personales por cuenta del
                responsable del Tratamiento.
              </p>
            </li>
            <li>
              <p className="text-justify">
                <b>Responsable del Tratamiento: </b>Persona natural o jurídica,
                pública o privada, que por sí misma o en asocio con otros,
                decida sobre la base de datos y/o el Tratamiento de los datos.
              </p>
            </li>
            <li>
              <p className="text-justify">
                <b>Titular: </b>Persona natural cuyos datos personales sean
                objeto de Tratamiento.
              </p>
            </li>
            <li>
              <p className="text-justify">
                <b>Transferencia: </b> La transferencia de datos tiene lugar
                cuando el responsable y/o Encargado del Tratamiento de datos
                personales, ubicado en Colombia, envía la información o los
                datos personales a un receptor, que a su vez es Responsable del
                Tratamiento y se encuentra dentro o fuera del país. Persona
                natural cuyos datos personales sean objeto de Tratamiento.
              </p>
            </li>
            <li>
              <p className="text-justify">
                <b>Tratamiento: </b>Cualquier operación o conjunto de
                operaciones sobre datos personales, tales como la recolección,
                almacenamiento, uso, circulación o supresión.
              </p>
            </li>
          </ul>
          <h3>¿Qué información recopilamos?</h3>
          <p className="text-justify">
            Tenemos que procesar tus datos cuando esto es necesario para
            proporcionarte los servicios que ofrece AnimalFriend tanto a los
            usuarios como a los usuarios de negocios: para crear tu página como
            usuario, agregar la página de tu mascota o para crear tu página de
            negocio. Solamente te pedimos los datos necesarios para que puedas
            interactuar con la página y utilizar nuestros servicios: nombre de
            usuario, correo electrónico de contacto, que ha de ser único en el
            ámbito de AnimalFriend -, ciudad, nombre de tu mascota, su edad…
          </p>
          <p className="text-justify">
            En el caso de los usuarios profesionales, una dirección de correo
            válida, igualmente única en el ámbito de AnimalFriend, así como
            todos los datos pertinentes para que su página de negocio quede
            correctamente situada en el mapa y correctamente identificada en su
            categoría de negocio.
          </p>
          <p className="text-justify">
            Al aceptar nuestros términos y condiciones de uso, confirmas que has
            leído y entiendes esta política, incluyendo cómo y por qué usamos tu
            información. Si no quieres que recopilemos ni procesemos tu
            información personal de las formas que describimos en esta política,
            no deberás usar los servicios de AnimalFriend.
          </p>
          <p className="text-justify">
            En cualquier momento puedes dar de baja tu perfil personal o tu
            página negocios de AnimalFriend y todos tus datos quedarían
            eliminados. Si no encuentras cómo hacerlo, no tienes más que
            enviarnos un correo electrónico a socialanimalfriend@gmail.com y
            nosotros nos ocupamos de hacerlo.
          </p>
          <p className="text-justify">
            En AnimalFriend queremos que en todo momento tengas claro por qué te
            pedimos algún dato, sabiendo que nos importa la privacidad y la
            intimidad de nuestros usuarios, protegiendo la confidencialidad de
            sus datos de acuerdo con la normativa aplicable. Los datos recogidos
            son almacenados bajo la confidencialidad y las medidas de seguridad
            legalmente establecidas y no serán cedidos ni compartidos con
            empresas ni entidades ajenas al responsable legal de la web.
            AnimalFriend podrá revelar cualquier información que considere
            necesaria, incluyendo datos de carácter personal, para dar
            cumplimiento a las obligaciones legales.
          </p>
          <h4>
            <b>Cómo utilizamos tu información personal</b>
          </h4>
          <p className="text-justify">
            Para poder ser usuario de AnimalFriend y tener un perfil público es
            necesario leer y aceptar la Política de Privacidad y Protección de
            Datos Personales y dar el consentimiento explícito a la misma
            marcando de la casilla que aparece en el formulario de registro.
          </p>
          <p className="text-justify">
            Es necesario ser usuario registrado de AnimalFriend para poder crear
            un perfil de usuario, dar de alta a una mascota o un animal
            perdido/encontrado. También es necesario ser usuario registrado para
            valorar y comentar los establecimientos, lugares, servicios o
            negocios que forman parte de la web, algo que es de enorme utilidad
            para toda la comunidad.
          </p>
          <p className="text-justify">
            Si creas una página para tu mascota te pediremos el dato de su fecha
            de nacimiento para poder enviarte una felicitación cuando llegue su
            cumpleaños.
          </p>
          <p className="text-justify">
            Y en caso de querer recibir nuestro boletín, te pediremos una
            dirección de correo electrónico válida.
          </p>
          <p className="text-justify">
            En el caso de los perfiles de negocio, es necesario el registro para
            dar de alta un negocio o para reclamar como propio un negocio que ya
            esté dado de alta en AnimalFriend.
          </p>
          <p className="text-justify">
            Los datos obligatorios para crear una página de negocio son: una
            dirección física –que puede ser aproximada para aquellos que
            trabajan a domicilio- una foto, que debe ser real y la dirección de
            correo electrónico. Y se ha de marcar al menos una categoría de
            negocio. Los demás datos (horario, enlaces a redes sociales, etc.)
            son útiles para los usuarios que puedan consultar tu página, pero no
            son obligatorios.
          </p>
          <p className="text-justify">
            Los comentarios, fotos, valoraciones y otros contenidos que el
            usuario publique en AnimalFriend se entienden de consumo público.
          </p>
          <p>
            Conservamos tu información solamente durante el tiempo que sea
            necesario para los fines establecidos en esta política, durante el
            tiempo que tu cuenta esté activa tal como se describe en esta
            política o según se necesite para proporcionarte los Servicios.
          </p>
          <p className="text-justify">
            Puedes cerrar tu cuenta cuando quieras, en cuanto decidas que no
            quieres que podamos usar tu información para prestarte los servicios
            disponibles en AnimalFriend.
          </p>
          <h4>
            <b>Terceras partes</b>
          </h4>
          <p className="text-justify">
            No alquilamos, compartimos, vendemos o negociamos con información
            personalmente identificable con terceras partes para sus propósitos
            de publicidad directa. Dicho lo cual, sí que hay información de
            terceras partes en AnimalFriend.
          </p>
          <p className="text-justify">
            <b>Enlaces:</b> AnimalFriend puede contener enlaces a páginas web de
            terceras partes no afiliadas. No compartimos información personal
            con ellos, y no somos responsables de sus prácticas de privacidad.
          </p>
          <h4>
            <b>Otros datos automáticos recogidos</b>
          </h4>
          <p className="text-justify">
            AnimalFriend recoge datos sobre los usuarios y sus visitas. Estos
            datos, tales como áreas más visitadas, servicios permitidos, rutas
            de navegación, etc. son de carácter puramente estadístico y sirven
            para un posterior estudio y análisis.
          </p>
          <h3>Responsable del tratamiento</h3>
          <p className="text-justify">
            En cumplimiento de lo establecido por el artículo 15 de la
            Constitución Política, la Ley 1266 de 2008, Ley 1581 de 2012 y demás
            decretos reglamentarios, se informa que AnimalFriend, identificado
            con el NIT xxxxxx, con domicilio en la dirección xxxxx, Bogotá,
            Colombia, La dirección de correo electrónico de contacto con
            AnimalFriend es xxxxxx
          </p>
          <h3>Derechos del titular</h3>
          <p className="text-justify">
            Los titulares de la información que es objeto de tratamiento por
            ANIMALFRIEND podrán:
          </p>
          <p className="text-justify">
            (1) Conocer, actualizar, rectificar, suprimir o revocar sus datos
            personales y ser informados del tratamiento que ANIMALFRIEND realiza
            sobre los datos personales. (2) Solicitar la portabilidad de sus
            datos personales cuando la misma sea procedente. (3) Presentar
            solicitudes y reclamos relacionados con la regulación vigente en
            materia de Protección de Datos Personales. (4) Solicitar revocatoria
            de la autorización y/o supresión de un dato personal en el caso de
            determinarse que ANIMALFRIEND presenta una conducta contraria a la
            regulación vigente. La solicitud de supresión o revocatoria no
            procederá cuando los titulares tengan el deber legal o contractual
            de permanecer en la base de datos de AnimalFriend.
          </p>
          <p className="text-justify">
            En concordancia con el art. 20 del Decreto 1377 de 2013, el
            ejercicio de los derechos anteriormente mencionados podrá ejercerse
            por las siguientes personas:
          </p>
          <p className="text-justify">
            (1) Por el titular, quien deberá acreditar su identidad en forma
            suficiente por los distintos medios que le ponga a disposición el
            responsable. (2) Por sus causahabientes, quienes deberán acreditar
            tal calidad. (3) Por el representante y/o apoderado del titular,
            previa acreditación de la representación o apoderamiento. (4) Por
            estipulación a favor de otro o para otro.
          </p>
          <h2>Política de cookies</h2>
          <p className="text-justify">
            Durante la navegación a través de la Web es posible que recopilemos
            información relativa al flujo del tráfico, patrones de visita de las
            diferentes páginas de la Web, idioma preferido, etc. Dicha
            información será tratada a través de cookies.
          </p>
          <p className="text-justify">
            Una cookie es un pequeño archivo de texto que un servidor puede
            colocar en el disco duro de tu ordenador, Tablet, teléfono móvil o,
            en definitiva, del dispositivo que utilices para navegar a través de
            Internet y que contiene información sobre tu visita a la Web, tus
            preferencias de navegación, la información que más te interesa,
            idioma, etc.
          </p>
          <p className="text-justify">
            En función de su naturaleza, las cookies pueden clasificarse en:
          </p>
          <p className="text-justify">
            Cookies de sesión y Cookies permanentes: las primeras son eliminadas
            al cerrar el navegador, mientras que las segundas permanecen en el
            equipo informático.
          </p>
          <p className="text-justify">
            Cookies propias y Cookies de terceros: en función de si pertenecen
            al titular de la web, o a un tercero.
          </p>
          <p className="text-justify">
            Las cookies pueden ser utilizadas para recopilar información
            específica durante tu visita a la Web. El objetivo de la utilización
            de las Cookies es mejorarte la navegación y sus condiciones de
            funcionalidad, pues esta nos ayuda a asegurar que la Web se ajuste
            lo más posible a tus necesidades y preferencias.
          </p>
          <p className="text-justify">
            En nuestro caso, las cookies que utilizamos en nuestra web no
            recopilan información que te identifique de forma personal.
          </p>
          <h3>Por qué utilizamos cookies?</h3>
          <p>
            Las cookies nos ayudan a proporcionar, proteger y mejorar los
            Productos de AnimalFriend, ya que nos permiten personalizar el
            contenido, adaptar los anuncios y medir su rendimiento, y brindar
            una experiencia más segura. Si bien las cookies pueden cambiar de
            vez en cuando a medida que mejoramos y actualizamos los Productos de
            AnimalFriend, las utilizamos con los fines que se detallan a
            continuación:
            <h4>
              <b>Autenticación</b>
            </h4>
          </p>
          <p className="text-justify">
            Utilizamos cookies para verificar tu cuenta y determinar cuándo
            inicias sesión. De este modo, podemos ayudarte a acceder a los
            Productos de AnimalFriend con mayor facilidad y mostrarte la
            experiencia y las funciones correspondientes.
          </p>
          <h4>
            <b>Seguridad e integridad de los sitios y productos</b>
          </h4>
          <p className="text-justify">
            Utilizamos cookies para proteger tu cuenta, tus datos y los
            Productos de AnimalFriend.
          </p>
          <p className="text-justify">
            También utilizamos cookies para luchar contra actividades que
            infringen nuestras políticas o afectan de otro modo nuestra
            capacidad de proporcionar los Productos de AnimalFriend.
          </p>
          <h3>Publicidad, recomendaciones, estadísticas y medición</h3>
          <p className="text-justify">
            Utilizamos cookies para mostrar anuncios y hacer recomendaciones de
            negocios y otras organizaciones a personas que pueden estar
            interesadas en los productos, los servicios o las causas que
            promocionan, para medir el rendimiento de las campañas publicitarias
            de negocios que usan los Productos de AnimalFriend. Nos ayudan medir
            la frecuencia con la que se realizan determinadas acciones, como
            hacer clic en un anuncio o verlo, ayudan a mostrar y medir anuncios
            en diferentes navegadores y dispositivos utilizados por la misma
            persona, también nos permiten proporcionar estadísticas sobre las
            personas que utilizan los Productos de AnimalFriend y sobre las
            personas que interactúan con los anuncios, los sitios web y las
            aplicaciones de nuestros anunciantes y de los negocios que usan
            dichos Productos, además los utilizamos para ayudarte a indicar que
            no quieres ver anuncios de AnimalFriend en función de tu actividad
            en sitios web de terceros.
          </p>
          <h3>Funciones y servicios del sitio</h3>
          <p className="text-justify">
            Utilizamos cookies para activar las funciones que nos ayudan a
            proporcionar los Productos de AnimalFriend y para ofrecerte
            contenido relevante para tu configuración regional.
          </p>
          <h3>Rendimiento</h3>
          <p className="text-justify">
            Utilizamos cookies para dirigir el tráfico entre los servidores y
            conocer con qué rapidez se cargan los Productos de AnimalFriend para
            cada persona. También nos ayudan a registrar la relación de aspecto
            y las dimensiones de tu pantalla y tus ventanas, y a saber si tienes
            activado el modo de contraste alto, para que podamos mostrar
            correctamente nuestros sitios y aplicaciones.
          </p>
          <h3>Análisis e investigación</h3>
          <p className="text-justify">
            Utilizamos cookies para conocer mejor cómo se utilizan los Productos
            de AnimalFriend con el fin de mejorarlos.
          </p>
          <h3>¿Dónde utilizamos las cookies?</h3>
          <p className="text-justify">
            Podemos colocar cookies en tu computadora o dispositivo, y recibir
            información almacenada en ellas cuando utilizas o visitas
            AnimalFriend
          </p>
          <p className="text-justify">
            Estas cookies sólo nos proporcionan información estadística anónima
            sobre la navegación en nuestra página web; no obstante, puede
            deshabilitarlas directamente configurando su navegador web, pero ten
            en cuenta que si las deshabilitas determinadas partes de la web
            pueden no funcionar correctamente.
          </p>
          <p className="text-justify">
            Puedes configurar tu navegador para aceptar o rechazar la
            instalación de todas, o algún tipo de cookie, o para solicitar que
            se te notifique cuándo se coloca una cookie.
          </p>
        </ModalBody>
        <div className="modal-footer">

          <Button color="danger" type="button" onClick={() => setModal1(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}
export default ModalPoliticas;

import { useState, useRef } from 'react';
import { Container, Row, Col, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { toPng } from 'html-to-image';
import format from 'date-fns/format';
import 'bootstrap/dist/css/bootstrap.css';
import ModalEdicion from './ModalEdicion';
import Tarjeta from './Tarjeta';

const Tablero = ({ recursos, setRecursos }) => {
    const [mostrarModal, setMostrarModal] = useState(false); //Mostrar u ocultar el modal de creación
    const [unidades, setUnidades] = useState(1); //Cuantas unidades incremente o decrementan los puntos
    const [mostrarOpc, setMostrarOpc] = useState(false); //Mostrar u ócultar las opciones del botón
    const [recEditado, setRecEditado] = useState(null); //Recurso que se va a editar en el modal

    const refFileInput = useRef(); //Referencia para poder acceder a los eventos del file input
    const refRecursos = useRef(null); //Referencia al elemento html que contiene a los recursos

    //En caso de querer descargar la imagen en vez de copiarla, descomenta esto
    //const getFileName = fileType => `${format(new Date(), "'Imagen-CC-'HH-mm-ss")}.${fileType}`;

    //Elimina al recurso (tarjeta) indicado
    const borrarRecurso = (idBorrar) => {
        var respuesta = window.confirm("¿Quieres borrar este recurso?");
        if (!respuesta) return;

        setRecursos(recursos.filter((rec) => rec.id !== idBorrar));
    }

    //Elimina a todos los recursos
    const borrarTodo = () => {
        var respuesta = window.confirm("¿Quieres borrar todos los recursos?");
        if (!respuesta) return;

        setRecursos([]);
    }

    //Descarga un archivo txt con los recursos
    const descargarRecursos = () => {
        //Convierte la lista en una cadena de texto
        let contenido = "";
        for (const recurso of recursos) {
            contenido += "id:=" + recurso.id + "\n";
            contenido += "nombre:=" + recurso.nombre + "\n";
            contenido += "color:=" + recurso.color + "\n";
            contenido += "imagen:=" + recurso.imagen + "\n";
            contenido += "puntos:=" + recurso.puntos + "\n\n";
        }
        contenido = contenido.substring(0, contenido.length - 2);

        //Crea un elemento desde el cuál descargar el archivo
        const element = document.createElement("a");
        const file = new Blob([contenido], { type: 'text/plain' });

        element.href = URL.createObjectURL(file);
        element.download = "recursos.txt";
        document.body.appendChild(element); //Para firefox
        element.click(); //Inicia la descarga
    }

    //Carga los datos de un archivo txt
    const cargarRecursos = async (e) => {
        e.preventDefault();

        if (e.target.files.length == 0) {
            return; //Si no hay archivos
        }

        if (recursos.length > 0) {
            const respuesta = window.confirm("Ya hay datos de recursos. ¿Quiere sobreescribirlos?");
            if (!respuesta) {
                e.target.value = ""; //Limpia el fileInput
                return;
            }
        }

        setRecursos([]);
        let listaRecursos = [];

        //Código a ejecutar cuando se lee el archivo
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result);
            const grupos = text.split("\n\n"); //Separa el texto en grupos; cada uno representa un recurso

            for (const grupo of grupos) {
                const filas = grupo.split("\n"); //Separa el grupo en filas; cada una representa una propiedad
                let nuevoRecurso = {
                    id: 0,
                    nombre: "",
                    color: "#000000",
                    puntos: 0,
                    ptsPositivos: 0
                };

                for (const fila of filas) {
                    const propiedades = fila.split(":="); //Separa la fila en propiedades (nombre y valor)

                    if (propiedades.length === 2) {
                        //Busca la propiedad con ese nombre y le asigna el valor correspondiente
                        switch (propiedades[0]) {
                            case "id":
                                nuevoRecurso.id = Number(propiedades[1]);
                                break;
                            case "nombre":
                                nuevoRecurso.nombre = propiedades[1];
                                break;
                            case "color":
                                nuevoRecurso.color = propiedades[1];
                                break;
                            case "imagen":
                                nuevoRecurso.imagen = propiedades[1];
                                break;
                            case "puntos":
                                const misPuntos = Number(propiedades[1]);
                                nuevoRecurso.puntos = misPuntos;
                                nuevoRecurso.ptsPositivos = misPuntos > 0 ? misPuntos : 0;
                                break;
                        };
                    }
                }

                //Inserta el nuevo recurso en la lista
                listaRecursos.push(nuevoRecurso);
            }

            setRecursos(listaRecursos);
        };
        
        //Lee el contenido del archivo
        reader.readAsText(e.target.files[0]);

        //Por último, limpia el FileInput
        e.target.value = "";
    }

    //Toma una captura de pantalla de la página y la descarga
    const guardarImagen = async (e) => {
        if (refRecursos.current === null) {
            return
        }
        //Convierte la zona de recursos en un archivo png
        toPng(refRecursos.current, { cacheBust: true, })
            .then(async (dataUrl) => {
                //Descargar imagen
                //const link = document.createElement('a');
                //link.download = `${getFileName('png')}`;
                //link.href = dataUrl;
                //link.click();

                const copiedImage = await fetch(dataUrl); //Obtiene la imagen de la url
                const blobData = await copiedImage.blob(); //La convierte en un objeto blob (datos brutos)
                const clipboardItemInput = new ClipboardItem({ 'image/png': blobData });
                navigator.clipboard.write([clipboardItemInput]); //Copia la imagen en el portapapeles
            })
            .catch((err) => {
                console.error(err)
            })
    };

    //Abre el modal para agregar un recurso
    const abrirModoCreacion = () => {
        setRecEditado(null);
        setMostrarModal(true);
    }

    //Abre el modal, pasando la información de un recurso
    const abrirModoEdicion = (recTarjeta) => {
        setRecEditado(recTarjeta);
        setMostrarModal(true);
    }

    return (
        <Container className="margen-superior">
            <Row>
                <Col xs="6"><Input type="number" name="aumento" title="aumento" value={unidades} onChange={(e) => setUnidades(e.target.value)} /></Col>
                <Col xs="3"><Button color="primary" size="sm" onClick={() => abrirModoCreacion()}>Nuevo</Button></Col>
                <Col xs="3">
                    <ButtonDropdown isOpen={mostrarOpc} toggle={() => setMostrarOpc(!mostrarOpc)}>
                        <DropdownToggle caret>
                            Opciones
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Materiales</DropdownItem>
                            <DropdownItem onClick={() => refFileInput.current.click()}>Subir</DropdownItem>
                            <DropdownItem disabled={recursos.length == 0} onClick={() => descargarRecursos()}>Descargar</DropdownItem>
                            <DropdownItem disabled={recursos.length == 0} onClick={guardarImagen}>Copiar imagen</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem disabled={recursos.length == 0} onClick={() => borrarTodo()}>Borrar</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </Col>
                <Col xs="12"><input type='file' title='' ref={refFileInput} multiple={false} onChange={(e) => cargarRecursos(e)} accept=".txt" placeholder='nada' hidden /></Col>
            </Row>

            <ModalEdicion
                mostrar={mostrarModal}
                setMostrar={setMostrarModal}
                recursos={recursos}
                setRecursos={setRecursos}
                recursoAEditar={recEditado}
            />

            <div ref={refRecursos}>
                <Row>
                    {recursos.map((obj) => (
                        <Col xs="6" key={obj.id}>
                            <Tarjeta
                                recursoPrev={obj}
                                recursos={recursos}
                                setRecursos={setRecursos}
                                unidades={unidades}
                                borrarRecurso={borrarRecurso}
                                editarRecurso={abrirModoEdicion}
                            />
                        </Col>
                    ))}
                </Row>
            </div>

        </Container>
    );
}

export default Tablero;
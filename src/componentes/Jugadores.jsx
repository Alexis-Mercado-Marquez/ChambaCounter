//import React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Container, Row, Col, Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { toPng } from 'html-to-image';
import format from 'date-fns/format';
import 'bootstrap/dist/css/bootstrap.css';
import ModalNuevo from './ModalNuevo';
import Tarjeta from './Tarjeta';

const Jugadores = ({ jugadores, setJugadores }) => {
    const [mostrarModal, setMostrarModal] = useState(false); //Mostrar u ocultar el modal de creación
    const [cuenta, setCuenta] = useState(0); //Cuenta usada para crear los id únicos
    const [unidades, setUnidades] = useState(1); //Cuantas unidades incremente o decrementan los puntos
    const [mostrarOpc, setMostrarOpc] = useState(false); //Mostrar u ócultar las opciones del botón

    const fileInputRef = useRef(); //Referencia para poder acceder a los eventos del file input
    const playersRef = useRef(null); //Referencia al elemento html que contiene a los jugadores

    /*useEffect(() => {
        console.log(jugadores);
    }, [jugadores]);*/

    const getFileName = fileType => `${format(new Date(), "'SomeName-'HH-mm-ss")}.${fileType}`;

    const borrarJugador = (idBorrar) => {
        var respuesta = window.confirm("¿Quieres borrar a este jugador?");
        if (!respuesta) return;

        setJugadores(jugadores.filter((jug) => jug.id !== idBorrar));
    }

    const borrarTodo = () => {
        var respuesta = window.confirm("¿Quieres borrar a todos los jugadores?");
        if (!respuesta) return;

        setJugadores([]);
    }

    const descargarJugadores = () => {
        //Convierte la lista en una cadena de texto
        let contenido = "";
        for (const jugador of jugadores) {
            contenido += "id:=" + jugador.id + "\n";
            contenido += "nombre:=" + jugador.nombre + "\n";
            contenido += "color:=" + jugador.color + "\n";
            contenido += "puntos:=" + jugador.puntos + "\n\n";
        }
        contenido = contenido.substring(0, contenido.length - 2);

        //Crea un elemento desde el cuál descargar el archivo
        const element = document.createElement("a");
        const file = new Blob([contenido], { type: 'text/plain' });

        element.href = URL.createObjectURL(file);
        element.download = "jugadores.txt";
        document.body.appendChild(element); //Para firefox
        element.click(); //Inicia la descarga
    }

    const cargarJugadores = async (e) => {
        e.preventDefault();

        if (e.target.files.length == 0) {
            return; //Si no hay archivos
        }

        if (jugadores.length > 0) {
            const respuesta = window.confirm("Ya hay datos de jugadores. ¿Quiere sobreescribirlos?");
            if (!respuesta) {
                e.target.value = ""; //Limpia el fileInput
                return;
            }
        }

        setJugadores([]);
        let listaJugadores = [];

        //Código a ejecutar cuando se lee el archivo
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result);
            const grupos = text.split("\n\n"); //Separa el texto en grupos; cada uno representa un jugador

            for (const grupo of grupos) {
                const filas = grupo.split("\n"); //Separa el grupo en filas; cada una representa una propiedad
                let nuevoJugador = {
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
                                nuevoJugador.id = Number(propiedades[1]);
                                break;
                            case "nombre":
                                nuevoJugador.nombre = propiedades[1];
                                break;
                            case "color":
                                nuevoJugador.color = propiedades[1];
                                break;
                            case "puntos":
                                const misPuntos = Number(propiedades[1]);
                                nuevoJugador.puntos = misPuntos;
                                nuevoJugador.ptsPositivos = misPuntos > 0 ? misPuntos : 0;
                                break;
                        };
                    }
                }

                //Inserta el nuevo jugador en la lista
                listaJugadores.push(nuevoJugador);
            }

            setJugadores(listaJugadores);

            //Le asigna a la cuenta el valor del id más alto mas uno
            const ultimo = listaJugadores.reduce((prev, actual) => (prev && prev.id > actual.id) ? prev : actual);
            setCuenta(ultimo.id + 1);
        };
        
        //Lee el contenido del archivo
        reader.readAsText(e.target.files[0]);

        //Por último, limpia el FileInput
        e.target.value = "";
    }

    const guardarImagen = async (e) => {
        if (playersRef.current === null) {
            return
        }
        //Convierte la zona de jugadores en un archivo png
        toPng(playersRef.current, { cacheBust: true, })
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

    return (
        <Container className="margen-superior">
            <Row>
                <Col xs="6"><Input type="number" name="aumento" value={unidades} onChange={(e) => setUnidades(e.target.value)} /></Col>
                <Col xs="3"><Button color="primary" size="sm" onClick={() => setMostrarModal(true)}>Nuevo</Button></Col>
                <Col xs="3">
                    <ButtonDropdown isOpen={mostrarOpc} toggle={() => setMostrarOpc(!mostrarOpc)}>
                        <DropdownToggle caret>
                            Opciones
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Jugadores</DropdownItem>
                            <DropdownItem onClick={() => fileInputRef.current.click()}>Subir</DropdownItem>
                            <DropdownItem disabled={jugadores.length == 0} onClick={() => descargarJugadores()}>Descargar</DropdownItem>
                            <DropdownItem disabled={jugadores.length == 0} onClick={guardarImagen}>Copiar imagen</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem disabled={jugadores.length == 0} onClick={() => borrarTodo()}>Borrar</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </Col>
                <Col xs="12"><input type='file' ref={fileInputRef} multiple={false} onChange={(e) => cargarJugadores(e)} hidden /></Col>
            </Row>

            <ModalNuevo
                mostrar={mostrarModal}
                setMostrar={setMostrarModal}
                jugadores={jugadores}
                setJugadores={setJugadores}
                cuenta={cuenta}
                setCuenta={setCuenta}
            />

            <div ref={playersRef}>
                <Row>
                    {jugadores.map((obj) => (
                        <Col xs="6" key={obj.id}>
                            <Tarjeta
                                jugadorPrev={obj}
                                jugadores={jugadores}
                                setJugadores={setJugadores}
                                unidades={unidades}
                                borrarJugador={borrarJugador}
                            />
                        </Col>
                    ))}
                </Row>
            </div>

        </Container>
    );
}

export default Jugadores;
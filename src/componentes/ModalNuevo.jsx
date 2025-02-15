import React from 'react';
import Form from 'react-bootstrap/Form';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, Label, Button } from 'reactstrap';
import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const ModalNuevo = ({ mostrar, setMostrar, jugadores, setJugadores, jugadorAEditar }) => {
    const colorBase = "#aabbcc";
    const [nombre, setNombre] = useState(""); //Nombre de la tarjeta
    const [color, setColor] = useState(colorBase); //Color asociado al jugador
    const [hex, setHex] = useState(colorBase); //Color en el campo de texto
    const [imagen, setImagen] = useState({}); //Imagen seleccionada
    const reg = /^#([0-9a-f]{3}){1,2}$/i; //Regex para verificar que el código este bien escrito

    let imagenes = [];
    let idImg = 0;

    //Obtiene todas las imagenes de la carpeta
    Object.values(import.meta.glob('../assets/imagenes/*.jpeg', { eager: true })).forEach(
        ({ default: ruta }) => {
            const url = new URL(ruta, import.meta.url); //Primero obtiene la ruta
            const segmentos = url.pathname.split("/"); //Luego la separa por carpetas
            let soloNombre = segmentos[segmentos.length - 1]; //Toma la sección con el nombre

            const data = {
                id: idImg,
                ruta: url.pathname,
                nombre: soloNombre.split(".")[0]
            };
            imagenes.push(data);

            idImg++;
        }
    );

    //Carga los valores por defecto de los controles
    useEffect(() => {
        setNombre("");
        setColor(colorBase);
        setHex(colorBase);
        setImagen(imagenes[0]);

        if (jugadorAEditar == null || jugadorAEditar == undefined) {
            console.log("Esta vacío");
        }
        else {
            console.log(jugadorAEditar);
        }

        const originalConsoleError = console.error;

        //Evita que aparezca un mensaje de error relativo a la obsolecencia de las "defaultProps"
        console.error = (...args) => {
            if (typeof args[0] === "string" && /defaultProps/.test(args[0])) {
                return;
            }

            originalConsoleError(...args);
        };

        return () => {
            console.error = originalConsoleError;
        };
    }, [mostrar]);

    //Actualiza el color si 'hex' es un código válido
    useEffect(() => {
        if (reg.test(hex)) {
            setColor(hex);
        }
        else {
            setColor('#FFFFFF');
        }
    }, [hex]);

    //Actualiza 'hex' si 'color' no tiene su valor por defecto
    useEffect(() => {
        if (color != '#FFFFFF') {
            setHex(color);
        }
    }, [color]);

    //Crea un jugador con los datos seleccionados y lo agrega a la lista
    const agregarJugador = () => {
        //Obtiene el id mas alto de la lista de jugadores
        const idMaximo = jugadores.map(j => j.id).reduce(
            (idMax, idActual) => idActual > idMax ? idActual : idMax, 0
        );

        const nuevoJugador = {
            id: idMaximo + 1,
            nombre: nombre,
            color: color,
            imagen: imagen.ruta,
            puntos: 0,
            ptsPositivos: 0
        };
        setJugadores(
            [...jugadores, nuevoJugador]
        );
        
        setMostrar(false);
    }

    //Le asigna al select la imagen con el nombre igual al de la opción seleccionada
    const cambioSelect = (e) => {
        const objeto = imagenes.find((img) => img.nombre == e.target.value);
        setImagen(objeto);
    };

    const cerrarModal = () => {
        setMostrar(false);
    }

    return (
        <Modal isOpen={mostrar}>
            <ModalHeader>Agregar jugador</ModalHeader>
            <ModalBody>
                <Row>
                    <Col sm="6" xs="6">
                        <Label>Nombre</Label>
                        <Input name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} /><br />
                        <Label>Color</Label>
                        <Input name="color" value={hex} onChange={(e) => setHex(e.target.value)} />
                    </Col>
                    <Col sm="6" xs="6">
                        <HexColorPicker color={color} onChange={setColor} />
                    </Col>
                </Row>
                <Row>
                    <Col sm="6" xs="6">
                        <Label>Imagen</Label>
                        <Form.Select value={imagen.nombre} onChange={cambioSelect}>
                            {imagenes.map((img) => (
                                <option key={img.id} value={img.nombre}>
                                    {img.nombre}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col sm="6" xs="6" align="center">
                        <br/><img width="128" src={imagen.ruta} alt="Material" />
                    </Col>
                </Row>
            </ModalBody>

            <ModalFooter>
                <Button color="danger" size="sm" onClick={() => cerrarModal()}>Cerrar</Button>
                <Button color="primary" size="sm" onClick={() => agregarJugador()}>Agregar</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalNuevo;
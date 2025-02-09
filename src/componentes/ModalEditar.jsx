import React from 'react';
import Form from 'react-bootstrap/Form';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, Label, Button } from 'reactstrap';
import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const ModalEditar = ({ mostrar, setMostrar, jugadores, setJugadores, jugador }) => {
    const [nombre, setNombre] = useState(jugador.nombre); //Nombre del jugador
    const [color, setColor] = useState(jugador.color); //Color asociado al jugador
    const [cambiar, setCambiar] = useState(true); //Indica si se puede actualizar el color
    const [imagen, setImagen] = useState({}); //Imagen seleccionada
    const [hex, setHex] = useState(jugador.color); //Color en el campo de texto
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
        setNombre(jugador.nombre);
        setColor(jugador.color);
        setHex(jugador.color);

        if (imagenes.length > 0) {
            const objeto = imagenes.find((img) => img.ruta == jugador.imagen);
            setImagen(objeto);
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
        if (color != '#FFFFFF' && cambiar == true) {
            setCambiar(false);
            setHex(color);
            setCambiar(true);
        }
    }, [color]);

    //Modifica el jugador y refresca la lista global
    const actualizarJugador = () => {
        const nuevoEstado = jugadores.map(obj => {
            //Si el id coincide, actualiza el nombre y el color
            if (obj.id === jugador.id) {
                return { ...obj, nombre: nombre, color: color, imagen: imagen.ruta };
            }

            //De otro modo, devuelve el objeto sin cambios
            return obj;
        });

        setJugadores(nuevoEstado);
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
            <ModalHeader>Editar jugador</ModalHeader>
            <ModalBody>
                <Row>
                    <Col sm="6" xs="6">
                        <Label>Nombre</Label>
                        <Input name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} /><br/>
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
                        <br /><img width="128" src={imagen.ruta} alt="Material" />
                    </Col>
                </Row>
            </ModalBody>

            <ModalFooter>
                <Button color="danger" size="sm" onClick={() => cerrarModal()}>Cerrar</Button>
                <Button color="primary" size="sm" onClick={() => actualizarJugador()}>Guardar</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalEditar;
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const ModalEditar = ({ mostrar, setMostrar, jugadores, setJugadores, jugador }) => {
    const [nombre, setNombre] = useState(jugador.nombre);
    const [color, setColor] = useState(jugador.color);

    useEffect(() => {
        setNombre(jugador.nombre);
        setColor(jugador.color);

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

    const actualizarJugador = () => {
        const nuevoEstado = jugadores.map(obj => {
            //Si el id coincide, actualiza el nombre y el color
            if (obj.id === jugador.id) {
                return { ...obj, nombre: nombre, color: color };
            }

            //De otro modo, devuelve el objeto sin cambios
            return obj;
        });

        setJugadores(nuevoEstado);
        setMostrar(false);
    }

    const cerrarModal = () => {
        setMostrar(false);
    }

    const modificarColor = () => {
        ;
    }

    return (
        <Modal isOpen={mostrar}>
            <ModalHeader>Agregar jugador</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Color</Label>
                        <HexColorPicker color={color} onChange={setColor} />
                        <Input name="color" value={color} onChange={modificarColor} />
                    </FormGroup>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button color="danger" size="sm" onClick={() => cerrarModal()}>Cerrar</Button>
                <Button color="primary" size="sm" onClick={() => actualizarJugador()}>Guardar</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalEditar;
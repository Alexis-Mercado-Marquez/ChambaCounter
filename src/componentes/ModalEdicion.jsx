import React from 'react';
import Form from 'react-bootstrap/Form';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, Label, Button } from 'reactstrap';
import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const ModalEdicion = ({ mostrar, setMostrar, recursos, setRecursos, recursoAEditar }) => {
    const colorBase = "#aabbcc";
    const [nombre, setNombre] = useState(""); //Nombre de la tarjeta
    const [color, setColor] = useState(colorBase); //Color asociado al recurso
    const [hex, setHex] = useState(colorBase); //Color en el campo de texto
    const [imagen, setImagen] = useState({}); //Imagen seleccionada
    const reg = /^#([0-9a-f]{3}){1,2}$/i; //Regex para verificar que el código este bien escrito

    const [modo, setModo] = useState("Agregar"); //¿El modal es para agregar o editar un recurso?

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

    //Carga los valores de los controles
    useEffect(() => {
        if (recursoAEditar == null || recursoAEditar == undefined) {
            //Si no se recibe un recurso, se le asignan valores por defecto
            setNombre("");
            setColor(colorBase);
            setHex(colorBase);
            setImagen(imagenes[0]);
            setModo("Agregar");
        }
        else {
            //Si se recibe un recurso, se le asignan sus valores
            setNombre(recursoAEditar.nombre);
            setColor(recursoAEditar.color);
            setHex(recursoAEditar.color);

            if (imagenes.length > 0) {
                const objeto = imagenes.find((img) => img.ruta == recursoAEditar.imagen);
                setImagen(objeto);
            }
            setModo("Editar");
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
            console.log("Hola");
            setColor(hex);
        }
        else {
            setColor('#FFFFFF');
        }
    }, [hex]);

    //Actualiza 'hex' si 'color' no tiene su valor por defecto
    useEffect(() => {
        if (color != '#FFFFFF') {
            console.log("Mundo");
            setHex(color);
        }
    }, [color]);

    //Crea un recurso con los datos seleccionados y lo agrega a la lista
    const agregarRecurso = () => {
        //Obtiene el id mas alto de la lista de recursos
        const idMaximo = recursos.map(rec => rec.id).reduce(
            (idMax, idActual) => idActual > idMax ? idActual : idMax, 0
        );

        const nuevoRecurso = {
            id: idMaximo + 1,
            nombre: nombre,
            color: color,
            imagen: imagen.ruta,
            puntos: 0,
            ptsPositivos: 0
        };
        setRecursos(
            [...recursos, nuevoRecurso]
        );
        
        setMostrar(false);
    }

    //Modifica el recurso y refresca la lista global
    const actualizarRecurso = () => {
        const nuevoEstado = recursos.map(obj => {
            //Si el id coincide, actualiza el nombre y el color
            if (obj.id === recursoAEditar.id) {
                return { ...obj, nombre: nombre, color: color, imagen: imagen.ruta };
            }

            //De otro modo, devuelve el objeto sin cambios
            return obj;
        });

        setRecursos(nuevoEstado);
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
            <ModalHeader>{modo} recurso</ModalHeader>
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
                        <br/><img width="128" src={imagen.ruta} alt="Recurso" />
                    </Col>
                </Row>
            </ModalBody>

            <ModalFooter>
                <Button color="danger" size="sm" onClick={() => cerrarModal()}>Cerrar</Button>
                {
                    modo == "Agregar" ?
                    <Button color="primary" size="sm" onClick={() => agregarRecurso()}>Agregar</Button> :
                    <Button color="primary" size="sm" onClick={() => actualizarRecurso()}>Actualizar</Button>
                }
            </ModalFooter>
        </Modal>
    );
}

export default ModalEdicion;
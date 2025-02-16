import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Card, CardBody, CardImg, Row, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const Tarjeta = ({ recursoPrev, recursos, setRecursos, unidades, borrarRecurso, editarRecurso }) => {
	const [puntos, setPuntos] = useState(recursoPrev.puntos); //Cuantos puntos tiene el recurso
	const [mostrarOpc, setMostrarOpc] = useState(false); //Mostrar u ócultar las opciones del botón

	useEffect(() => {
		actualizarRecursos();
	}, [puntos]);

	const actualizarRecursos = () => {
		const ptsPositivos = puntos > 0 ? puntos : 0;

		const recursoActual = {
			id: recursoPrev.id,
			color: recursoPrev.color,
			nombre: recursoPrev.nombre,
			imagen: recursoPrev.imagen,
			puntos: puntos,
			ptsPositivos: ptsPositivos
		};

		const listaRecursos = recursos.map((rec) =>
			rec.id === recursoActual.id ? recursoActual : rec
		);

		setRecursos(listaRecursos);
	}

	const incrementar = () => {
		setPuntos(puntos => puntos + Number(unidades));
	};

	const decrementar = () => {
		setPuntos(puntos => puntos - Number(unidades));
	};

    return (
		<Container className="div-tarjeta">
			<Card>
				<CardBody style={{ backgroundColor: `${recursoPrev.color}`, borderColor: `${recursoPrev.color}` }}>
					<Row>
						<Col sm="2" xs="2">
							<Row>
								<Col xs="12">
									<ButtonDropdown isOpen={mostrarOpc} toggle={() => setMostrarOpc(!mostrarOpc)}
										className="margen-superior">
										<DropdownToggle caret>

										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem onClick={() => editarRecurso(recursoPrev)}>Editar</DropdownItem>
											<DropdownItem onClick={() => borrarRecurso(recursoPrev.id)}>Borrar</DropdownItem>
										</DropdownMenu>
									</ButtonDropdown>
								</Col>
							</Row>
							<Row>
								<Col xs="12"><button type="button" className="boton boton-tarjeta margen-superior" onClick={incrementar}><b>+</b></button></Col>
							</Row>
							<Row>
								<Col xs="12"><button type="button" className="boton boton-tarjeta margen-superior" onClick={decrementar}><b>-</b></button></Col>
							</Row>
						</Col>
						<Col sm="6" xs="6">
							<Row>
								<Col xs="12"><h1 className="texto-grande izquierda">{recursoPrev.nombre}</h1></Col>
							</Row>
							<Row>
								<Col xs="12"><h1 className="texto-grande izquierda">{puntos}</h1></Col>
							</Row>
						</Col>
						<Col sm="4" xs="4">
							<span className="apoyo"></span>
							<CardImg top width="100%" src={recursoPrev.imagen} alt="Recurso" />
						</Col>
					</Row>
				</CardBody>
			</Card>
		</Container>
    );
}

export default Tarjeta;
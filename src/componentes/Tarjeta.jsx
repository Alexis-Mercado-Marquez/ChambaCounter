import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Card, CardBody, Row, Col, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const Tarjeta = ({ jugadorPrev, jugadores, setJugadores, unidades, borrarJugador }) => {
	const [puntos, setPuntos] = useState(0);

	useEffect(() => {
		actualizarJugadores();
	}, [puntos]);

	const actualizarJugadores = () => {
		const jugadorActual = {
			id: jugadorPrev.id,
			nombre: jugadorPrev.nombre,
			color: jugadorPrev.color,
			puntos: puntos
		};

		const listaJugadores = jugadores.map((jug) =>
			jug.id === jugadorActual.id ? jugadorActual : jug
		);

		setJugadores(listaJugadores);
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
				<CardBody style={{ backgroundColor: `${jugadorPrev.color}`, borderColor: `${jugadorPrev.color}` }}>
					<Row>
						<Col xs="6"><h3>{jugadorPrev.nombre}</h3></Col>
						<Col xs="6"><h2>{puntos}</h2></Col>
					</Row>
					<Row>
						<Col xs="6"><Button outline onClick={() => borrarJugador(jugadorPrev.id)}>Quitar</Button></Col>
						<Col xs="3"><Button outline onClick={decrementar}>-</Button></Col>
						<Col xs="3"><Button outline onClick={incrementar}>+</Button></Col>
					</Row>
				</CardBody>
			</Card>
		</Container>
    );
}

export default Tarjeta;
import './App.css';
import { useState } from 'react';
import Jugadores from './componentes/Jugadores';
import Grafica from './componentes/Grafica';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

function App() {
    const [jugadores, setJugadores] = useState([]); //Lista de jugadores (cada uno con una tarjeta)
    const [tabActiva, setTabActiva] = useState("1"); //Pestaña seleccionada (jugadores o gráfico)

    return (
        <Container>
            <h2>Chamba Counter</h2>
            <Nav tabs>
                <NavItem className="nav-tab">
                    <NavLink active={tabActiva == "1"}
                        onClick={() => setTabActiva("1")}>
                        Jugadores
                    </NavLink>
                </NavItem>
                <NavItem className="nav-tab">
                    <NavLink active={tabActiva == "2"}
                        onClick={() => setTabActiva("2")}>
                        Grafica
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={tabActiva}>
                <TabPane tabId="1">
                    <Jugadores
                        jugadores={jugadores}
                        setJugadores={setJugadores} />
                </TabPane>
                <TabPane tabId="2">
                    <Grafica />
                </TabPane>
            </TabContent>
        </Container>
    )
}

export default App

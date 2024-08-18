import './App.css';
import Jugadores from './componentes/Jugadores';
import { Container } from 'reactstrap';

function App() {
    return (
        <Container>
            <h2>Chamba Counter</h2>
            <Jugadores />
        </Container>
    )
}

export default App

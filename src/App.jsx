import { useState, useEffect } from "react"
import Filtros from "./components/Filtros";
import Header from "./components/Header"
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { generarID } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg"

const App = () => {
    
    const [presupuesto, setPresupuesto] = useState( Number(localStorage.getItem('presupuesto')) ?? 0 );
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [filtro, setFiltro] = useState('');
    const [gastosFiltrados, setGastosFiltrados] = useState([]);

    const [gastos, setGastos] = useState(
        localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    );
    const [gastoEditar, setGastoEditar] = useState({});

    useEffect( () => {
        if (Object.keys(gastoEditar).length > 0) {
            setModal(true);

            setTimeout(() => {
                setAnimarModal(true)
            }, 500);
        }
    }, [gastoEditar] );

    useEffect( () => {
        localStorage.setItem('presupuesto', presupuesto ?? 0)
    }, [presupuesto]);

    useEffect( () => {
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
    }, [gastos] );

    useEffect( () => {
        if (filtro) {
            //filtrar gastos por categorias
            const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro);
            setGastosFiltrados(gastosFiltrados);
        }
    }, [filtro])

    useEffect( () => {
        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

        if (presupuestoLS) {
            setIsValidPresupuesto(true);
        }

    }, []);

    const handleNuevoGasto = () => {
        setModal(true);
        setGastoEditar({});

        setTimeout(() => {
            setAnimarModal(true)
        }, 500);
    }

    const guardarGasto = (gasto) => {
        
        if (gasto.id) {
            const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState );
            setGastos(gastosActualizados);
            setGastoEditar({});
        }else{
            gasto.id = generarID();
            gasto.fecha = Date.now();
            setGastos([gasto, ...gastos]);
        }

        setAnimarModal(false);

        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const eliminarGasto = (id) => {
        const gastosActualizados = gastos.filter( gasto => gasto.id !== id );
        setGastos(gastosActualizados);
    }

    return (
        <div className={ modal ? 'fijar' : '' }>
            <Header
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto} 
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
                gastos={gastos}
                setGastos={setGastos}
            />

            { isValidPresupuesto && (
                <>
                    <main>
                        <Filtros 
                            filtro={filtro}
                            setFiltro={setFiltro}
                        />

                        <ListadoGastos 
                            gastos={gastos}
                            setGastoEditar={setGastoEditar} 
                            eliminarGasto={eliminarGasto}
                            filtro={filtro}
                            gastosFiltrados={gastosFiltrados}
                        />
                    </main>

                    <div className="nuevo-gasto">
                        <img 
                            src={IconoNuevoGasto} 
                            onClick={ handleNuevoGasto }
                            alt="Icono nuevo gasto" 
                        />
                    </div>
                </>
            ) }

            {
                modal && <Modal 
                            setModal={setModal} 
                            animarModal={animarModal}
                            setAnimarModal={setAnimarModal}
                            guardarGasto={guardarGasto}
                            gastoEditar={gastoEditar}
                            setGastoEditar={setGastoEditar}
                        />
            }
            
        </div>
    )
}

export default App
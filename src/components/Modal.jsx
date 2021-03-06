import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import IconoCerrarModal from '../img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar}) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');
    const [error, setError] = useState(false);

    useEffect( () => {
        if ( Object.keys(gastoEditar).length > 0 ) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
        }
    }, []);

    const ocultarModal = () => {
        
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([nombre, cantidad, categoria].includes('')) {
            setError(true);
            console.log('error');

            setTimeout(() => {
                setError(false);
            }, 3000);

            return;
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha});
 
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={ IconoCerrarModal } 
                    alt="Icono Cerrar modal"
                    onClick={ ocultarModal }
                />
            </div>

            <form onSubmit={ handleSubmit } className={ `formulario ${animarModal ? "animar" : "cerrar"}` }>
                <legend>{ gastoEditar.id ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>

                { 
                    error && <Mensaje
                                mensaje="Los campos son obligatorios."
                                tipo="error" 
                            /> 
                }

                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                        id='nombre'
                        type="text" 
                        placeholder='Ingrese el nombre del gasto...'
                        value={ nombre }
                        onChange={ e => setNombre(e.target.value) }
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        id='cantidad'
                        type="number" 
                        placeholder='Ingrese la cantidad...'
                        value={cantidad}
                        onChange={ e => setCantidad(Number(e.target.value)) }
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">Categor??a</label>
                    <select 
                        id="categoria"
                        value={categoria}
                        onChange={ e => setCategoria(e.target.value) }
                    >
                        <option value="">--Seleccione la categor??a--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocios</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input 
                    type="submit"
                    value={ gastoEditar.id ? 'Actualizar Gasto' : 'A??adir Gasto' }
                />

                
            </form>
        </div>
    )
}

export default Modal
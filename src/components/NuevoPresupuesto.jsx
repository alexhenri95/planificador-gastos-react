import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!presupuesto || presupuesto < 0) {
            setError(true);
            return;
        }

        setError(false);
        
        setIsValidPresupuesto(true);
        
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">

            <form onSubmit={ handleSubmit } className="formulario">

                <div className="campo">
                    <label htmlFor="">Definir Presupuesto</label>
                    <input 
                        type="number" 
                        className="nuevo-presupuesto"
                        placeholder="Ingresa tu presupuesto"
                        value={presupuesto}
                        onChange={ e => setPresupuesto(Number(e.target.value)) }
                    />
                </div>

                <input 
                    type="submit"
                    value="Agregar"
                />

                { error && <Mensaje mensaje="No es un presupuesto válido" tipo="error" /> }
            </form>
        </div>
    )
}

export default NuevoPresupuesto
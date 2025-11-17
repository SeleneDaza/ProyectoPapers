// components/SaleForm.jsx
import React from 'react';
import Layout from './Layout.jsx'; // Asumiendo que usas Layout

function SaleForm() {
    return (
        <Layout>
            <div className="sale-form-container">
                <h1>Registrar Nueva Venta</h1>
                <p>Aquí irá el formulario para registrar ventas.</p>
                {/* Aquí iría tu formulario real con campos para cliente, productos, cantidades, precios, etc. */}
                {/* <form>
                    <label>Cliente:</label>
                    <input type="text" />
                    <label>Fecha:</label>
                    <input type="date" />
                    <button type="submit">Guardar Venta</button>
                </form> */}
            </div>
        </Layout>
    );
}

export default SaleForm;
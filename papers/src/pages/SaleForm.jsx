import React, { useState, useEffect } from 'react';
import Layout from './Layout.jsx'; // Asegúrate de que la ruta a Layout sea correcta
import api from '../hooks/api.js'; // Asegúrate de que la ruta a tu instancia de Axios sea correcta
import { useNavigate } from 'react-router-dom';

function SaleForm() {
    const navigate = useNavigate();

    // --- Estados para los Dropdowns ---
    const [clients, setClients] = useState([]); // Clientes (usuarios con rol CLIENTE)
    const [products, setProducts] = useState([]);   

    // --- Estados del Formulario Principal ---
    const [selectedClient, setSelectedClient] = useState(''); // Identificación del cliente (String)
    const [saleDetails, setSaleDetails] = useState([]); // Lista de objetos de detalle de venta

    // --- Estados para la línea de detalle (el producto que se está añadiendo al formulario) ---
    const [currentProduct, setCurrentProduct] = useState(''); // ID del producto seleccionado (String)
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const [currentPrice, setCurrentPrice] = useState(0); // Precio de VENTA del producto

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // --- 1. Cargar Clientes y Productos al montar el componente ---
    useEffect(() => {
        const loadData = async () => {
            try {
                // Obtener clientes (usuarios con rol CLIENTE)
                const clientResponse = await api.get('/usuarios/rol/CLIENTE');
                setClients(clientResponse.data);

                // Obtener productos
                const productResponse = await api.get('/productos');
                setProducts(productResponse.data);

            } catch (err) {
                setError('Error al cargar clientes o productos.');
                console.error('Error fetching data:', err);
            }
        };
        loadData();
    }, []);

    // 2. LÓGICA: Auto-cargar el precio de venta al seleccionar un producto
    useEffect(() => {
        if (currentProduct) {
            const product = products.find(p => p.id.toString() === currentProduct);
            
            // Asumiendo que tu DTO de producto en el frontend tiene un campo 'salePrice' o 'price'
            if (product && product.salePrice !== undefined) { 
                setCurrentPrice(parseFloat(product.salePrice)); 
            } else if (product && product.price !== undefined) { // Fallback a 'price' si no hay 'salePrice'
                setCurrentPrice(parseFloat(product.price));
            } else {
                setCurrentPrice(0); 
            }
        } else {
            setCurrentPrice(0);
        }
    }, [currentProduct, products]); 

    // --- 3. Lógica para añadir un producto a la lista de detalles de la venta ---
    const handleAddDetail = () => {
        if (!currentProduct || currentQuantity <= 0 || currentPrice <= 0) {
            alert("Por favor, complete los detalles del producto con valores válidos (producto, cantidad > 0, precio > 0).");
            return;
        }

        const product = products.find(p => p.id.toString() === currentProduct);
        if (!product) {
            alert("Producto no encontrado o seleccionado inválido.");
            return;
        }

        // Verificar el stock disponible antes de añadir
        // Asumiendo que tu Product DTO en el frontend tiene 'actualStock' o 'stock'
        if (product.actualStock < currentQuantity) { // O product.stock
            alert(`Stock insuficiente para ${product.name}. Disponible: ${product.actualStock || product.stock}`);
            return;
        }

        const subtotal = currentQuantity * currentPrice;

        const newDetail = {
            productId: product.id,
            productName: product.name, // Esto se usa solo en el frontend para mostrar
            quantity: parseInt(currentQuantity, 10),
            unitPrice: parseFloat(currentPrice),
            subtotal: subtotal
        };

        setSaleDetails([...saleDetails, newDetail]);

        // Limpiar campos para el siguiente producto
        setCurrentProduct('');
        setCurrentQuantity(1);
        setCurrentPrice(0); 
    };

    // --- Función para eliminar un detalle de la venta ---
    const handleRemoveDetail = (indexToRemove) => {
        setSaleDetails(saleDetails.filter((_, index) => index !== indexToRemove));
    };

    // --- 4. Lógica para calcular el valor total de la venta ---
    const calculateTotal = () => {
        return saleDetails.reduce((acc, detail) => acc + detail.subtotal, 0);
    };
    const totalValue = calculateTotal();

    // --- 5. Lógica para Enviar el Formulario de Venta al Backend ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!selectedClient) {
            setError("Debe seleccionar un cliente.");
            setLoading(false);
            return;
        }
        if (saleDetails.length === 0) {
            setError("Debe añadir al menos un producto a la venta.");
            setLoading(false);
            return;
        }

        // Preparar el DTO para enviar al backend (SaleDTO)
        const saleData = { 
            userId: selectedClient, // Aquí va la IDENTIFICACIÓN del cliente (String)
            date: new Date().toISOString().slice(0, 19), // Fecha y hora actual en formato ISO para LocalDateTime
            taxes: 0.0, // Puedes añadir un campo para esto en el formulario si es necesario
            discounts: 0.0, // Puedes añadir un campo para esto en el formulario si es necesario
            totalValue: totalValue,
            details: saleDetails.map(d => ({
                productId: d.productId,
                quantity: d.quantity,
                unitPrice: d.unitPrice,
                subtotal: d.subtotal
            }))
        };

        try {
            await api.post('/ventas', saleData); // 👈 Endpoint POST para registrar ventas

            alert('¡Venta registrada exitosamente!');
            navigate('/ventas'); // 💡 Redirigir a la página de documentos de venta (la tabla de ventas)

        } catch (err) {
            // Manejo de errores detallado
            let errorMessage = `Error al registrar la venta: ${err.message}`;
            if (err.response) {
                if (err.response.status === 404) {
                    errorMessage = `Error: Cliente o producto no encontrado. (${err.response.data || err.response.statusText})`;
                } else if (err.response.status === 400) {
                    errorMessage = `Error de validación: ${err.response.data?.message || JSON.stringify(err.response.data) || err.response.statusText}`;
                } else {
                    errorMessage = `Error del servidor: ${err.response.data?.message || err.response.statusText}`;
                }
            }
            setError(errorMessage);
            console.error('Error al enviar la venta:', err.response || err);
        } finally {
            setLoading(false);
        }
    };

    // --- Renderizado del Formulario ---
    return (
        <Layout>
            <div className="sale-form-container">
                <h1>Registrar Nueva Venta</h1>
                
                <form onSubmit={handleSubmit}>
                    
                    {/* --- Sección del Cliente --- */}
                    <fieldset>
                        <legend>Datos de la Factura</legend>
                        <label>
                            Cliente:
                            <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} required>
                                <option value="">Seleccione un cliente...</option>
                                {clients.map(cli => (
                                    // Asumiendo que tu DTO de User en el frontend tiene 'identificacion', 'nombres', 'apellidos'
                                    <option key={cli.identificacion} value={cli.identificacion}>
                                        {cli.nombres} {cli.apellidos} (ID: {cli.identificacion})
                                    </option>
                                ))}
                            </select>
                        </label>
                        {/* La fecha se generará automáticamente en el backend */}
                    </fieldset>

                    {/* --- Sección para Añadir Productos al Detalle --- */}
                    <fieldset>
                        <legend>Añadir Producto</legend>
                        <label>
                            Producto:
                            <select value={currentProduct} onChange={(e) => setCurrentProduct(e.target.value)}>
                                <option value="">Seleccione un producto...</option>
                                {products.map(prod => (
                                    // Asumiendo que tu DTO de Product en el frontend tiene 'id', 'name', 'reference', 'actualStock' (o 'stock')
                                    <option key={prod.id} value={prod.id}>
                                        {prod.name} (Ref: {prod.reference}) - Stock: {prod.actualStock || prod.stock}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Cantidad:
                            <input 
                                type="number" 
                                value={currentQuantity} 
                                onChange={(e) => setCurrentQuantity(e.target.value)} 
                                min="1" 
                                required 
                            />
                        </label>
                        <label>
                            Precio (Venta):
                            <input 
                                type="number" 
                                value={currentPrice} 
                                onChange={(e) => setCurrentPrice(e.target.value)} 
                                min="0" 
                                step="0.01" 
                                required 
                            />
                        </label>
                        <button type="button" onClick={handleAddDetail}>Añadir Producto</button>
                    </fieldset>

                    {/* --- Sección de Detalles de la Venta (tabla) --- */}
                    <h3>Detalles de la Venta</h3>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Vlr. Unitario</th>
                                <th>Subtotal</th>
                                <th>Acciones</th> {/* Columna para eliminar */}
                            </tr>
                        </thead>
                        <tbody>
                            {saleDetails.length === 0 ? (
                                <tr>
                                    <td colSpan="5">No hay productos añadidos a la venta.</td>
                                </tr>
                            ) : (
                                saleDetails.map((detail, index) => (
                                    <tr key={index}>
                                        <td>{detail.productName}</td>
                                        <td>{detail.quantity}</td>
                                        <td>{`$ ${detail.unitPrice.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`}</td>
                                        <td>{`$ ${detail.subtotal.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`}</td>
                                        <td>
                                            <button 
                                                type="button" 
                                                onClick={() => handleRemoveDetail(index)}
                                                className="delete-button" // Puedes añadir una clase CSS para estilo
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3">TOTAL:</td>
                                <td>{`$ ${totalValue.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`}</td>
                                <td></td> {/* Celda vacía para acciones */}
                            </tr>
                        </tfoot>
                    </table>

                    {/* --- Botón de Guardar --- */}
                    <br/>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrar Venta'}
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default SaleForm;
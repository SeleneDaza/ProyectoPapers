// components/PurchaseForm.jsx
import React, { useState, useEffect } from 'react';
import Layout from './Layout.jsx';
import api from '../hooks/api.js'; 
import '../components/PurchaseForm.css';
import { useNavigate } from 'react-router-dom';

function PurchaseForm() {
    const navigate = useNavigate();

    // --- Estados para los Dropdowns ---
    const [suppliers, setSuppliers] = useState([]); 
    const [products, setProducts] = useState([]);   

    // --- Estados del Formulario ---
    const [selectedSupplier, setSelectedSupplier] = useState('');
    // Inicializa la fecha como 'YYYY-MM-DD' (ej. 2025-11-17)
    const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]); 
    const [purchaseDetails, setPurchaseDetails] = useState([]); 

    // --- Estados para la línea de detalle (el producto que se está añadiendo) ---
    const [currentProduct, setCurrentProduct] = useState('');
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const [currentPrice, setCurrentPrice] = useState(0); 

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // --- 1. Cargar Proveedores y Productos al montar ---
    useEffect(() => {
        const loadData = async () => {
            try {
                // Asegúrate de que este endpoint devuelve el ID/Identificacion que usas para el proveedor
                const supplierResponse = await api.get('/usuarios/rol/PROVEEDOR');
                setSuppliers(supplierResponse.data);

                // Este endpoint ya devuelve ProductDetailDTO con purchasePrice
                const productResponse = await api.get('/productos');
                setProducts(productResponse.data);

            } catch (err) {
                setError('Error al cargar proveedores o productos.');
                console.error(err);
            }
        };
        loadData();
    }, []);

    // 2. LÓGICA: Auto-cargar el precio de compra al seleccionar un producto
    useEffect(() => {
        if (currentProduct) {
            const product = products.find(p => p.id.toString() === currentProduct);
            
            if (product && product.purchasePrice !== undefined) {
                // Setea el precio de compra. Aseguramos que sea un número.
                setCurrentPrice(parseFloat(product.purchasePrice)); 
            }
        } else {
            setCurrentPrice(0);
        }
    }, [currentProduct, products]); 

    // --- 3. Lógica para añadir un producto al detalle ---
    const handleAddDetail = () => {
        if (!currentProduct || currentQuantity <= 0 || currentPrice <= 0) {
            alert("Por favor, complete los detalles del producto con valores válidos.");
            return;
        }

        const product = products.find(p => p.id.toString() === currentProduct);
        const subtotal = currentQuantity * currentPrice;

        const newDetail = {
            productId: product.id,
            productName: product.name, // Extra para mostrar en la tabla
            quantity: parseInt(currentQuantity, 10),
            unitPrice: parseFloat(currentPrice),
            subtotal: subtotal
        };

        setPurchaseDetails([...purchaseDetails, newDetail]);

        // Limpiar campos para el siguiente producto
        setCurrentProduct('');
        setCurrentQuantity(1);
        setCurrentPrice(0); 
    };

    // --- 4. Lógica para calcular el total ---
    const calculateTotal = () => {
        return purchaseDetails.reduce((acc, detail) => acc + detail.subtotal, 0);
    };
    const totalValue = calculateTotal();

    // --- 5. Lógica para Enviar el Formulario ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!selectedSupplier || purchaseDetails.length === 0) {
            setError("Debe seleccionar un proveedor y añadir al menos un producto.");
            setLoading(false);
            return;
        }

        // El DTO para enviar al backend (SavePurchaseRequest)
        const purchaseDTO = {
            supplierId: selectedSupplier, 
            // 💡 CORRECCIÓN CRUCIAL: Enviamos solo la cadena 'YYYY-MM-DD'
            date: purchaseDate, 
            taxes: 0.0, 
            discounts: 0.0, 
            totalValue: totalValue,
            details: purchaseDetails.map(d => ({
                // Solo incluimos los campos que el backend espera en DetailPurchaseDTO
                productId: d.productId,
                quantity: d.quantity,
                unitPrice: d.unitPrice,
                subtotal: d.subtotal
            }))
        };

        try {
            await api.post('/compras', purchaseDTO); // 👈 Endpoint configurado

            alert('¡Compra registrada exitosamente!');
            // Opcional: limpiar el formulario o redirigir
            navigate('/compras'); 

        } catch (err) {
            setError(`Error al guardar la compra: ${err.response?.data?.message || err.message}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // ... (El return/JSX se mantiene igual)

    return (
        <Layout>
            <div className="purchase-form-container">
                <h1>Registrar Nueva Compra o Gasto</h1>
                
                <form onSubmit={handleSubmit}>
                    
                    {/* --- Sección del Proveedor y Fecha --- */}
                    <fieldset>
                        <legend>Datos de la Factura</legend>
                        <label>
                            Proveedor:
                            <select value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)} required>
                                <option value="">Seleccione un proveedor...</option>
                                {suppliers.map(sup => (
                                    <option key={sup.identificacion} value={sup.identificacion}>
                                        {sup.nombres} ({sup.identificacion})
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Fecha:
                            <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} required />
                        </label>
                    </fieldset>

                    {/* --- Sección para Añadir Productos --- */}
                    <fieldset>
                        <legend>Añadir Producto</legend>
                        <label>
                            Producto:
                            <select value={currentProduct} onChange={(e) => setCurrentProduct(e.target.value)}>
                                <option value="">Seleccione un producto...</option>
                                {products.map(prod => (
                                    <option key={prod.id} value={prod.id}>
                                        {prod.name} (Ref: {prod.reference})
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Cantidad:
                            <input type="number" value={currentQuantity} onChange={(e) => setCurrentQuantity(e.target.value)} min="1" />
                        </label>
                        <label>
                            Precio (Costo):
                            <input type="number" value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} min="0" step="0.01" />
                        </label>
                        <button type="button" onClick={handleAddDetail}>Añadir Producto</button>
                    </fieldset>

                    {/* --- Sección de Detalles (la tabla) --- */}
                    <h3>Detalles de la Compra</h3>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Vlr. Unitario</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchaseDetails.map((detail, index) => (
                                <tr key={index}>
                                    <td>{detail.productName}</td>
                                    <td>{detail.quantity}</td>
                                    <td>{`$ ${detail.unitPrice.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`}</td>
                                    <td>{`$ ${detail.subtotal.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3">TOTAL:</td>
                                <td>{`$ ${totalValue.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`}</td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* --- Botón de Guardar --- */}
                    <br/>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Guardando...' : 'Guardar Compra'}
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default PurchaseForm;
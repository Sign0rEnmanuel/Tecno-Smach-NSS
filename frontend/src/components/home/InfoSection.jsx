import Lorry from "../../assets/home/info/lorry.svg";
import MCPay from "../../assets/home/info/mcpay.svg";
import Security from "../../assets/home/info/security.svg";
import Trust from "../../assets/home/info/trust.svg";
import "../../styles/components/home/InfoSection.css";

export default function InfoSection() {
    return (
        <section className="info-section">
            <div className="info-section-content">
                <div className="box">
                    <div className="box-icon">
                        <img src={Lorry} alt="lorry" className="box-icon-img" />
                    </div>
                    <div className="box-text">
                        <h2>Envío rápido a todo el país</h2>
                        <p>Recibe tu pedido en la comodidad de tu hogar</p>
                    </div>
                </div>
                <div className="box">
                    <div className="box-icon">
                        <img src={MCPay} alt="mcpay" className="box-icon-img" />
                    </div>
                    <div className="box-text">
                        <h2>Compra con confianza</h2>
                        <p>Realiza tus compras con Mercado Pago</p>
                    </div>
                </div>
                <div className="box">
                    <div className="box-icon">
                        <img
                            src={Security}
                            alt="security"
                            className="box-icon-img"
                        />
                    </div>
                    <div className="box-text">
                        <h2>Buena garantia</h2>
                        <p>Compra productos con garantia de fabrica</p>
                    </div>
                </div>
                <div className="box">
                    <div className="box-icon">
                        <img src={Trust} alt="trust" className="box-icon-img" />
                    </div>
                    <div className="box-text">
                        <h2>Estamos contigo</h2>
                        <p>Estamos aqui para ayudarte en lo que necesites</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

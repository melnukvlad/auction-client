
import { useEffect, useState } from 'react';


import { auth } from "./firebase";
import { io } from 'socket.io-client';

const socket = io('https://auction-server12-production.up.railway.app');

function App() {
    const [auction, setAuction] = useState(null);
    const [name, setName] = useState('');
    const [bid, setBid] = useState('');
    const [currentImage, setCurrentImage] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    
    
  
    

    

    const images = [
        '/cars/car1.jpg',
        '/cars/car2.jpg',
        '/cars/car3.jpg',
        '/cars/car4.jpg',
        '/cars/car5.jpg',
        '/cars/car6.jpg',
        '/cars/car7.jpg',
        '/cars/car8.jpg',
        '/cars/car9.jpg',
        '/cars/car10.jpg',
        '/cars/car11.jpg',
        '/cars/car12.jpg',
        '/cars/car13.jpg',
        '/cars/car14.jpg',
    ];

    useEffect(() => {
        socket.on('auction_update', (data) => {
            setAuction(data);
        });
    }, []);

    const nextImage = () => {
        setCurrentImage((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImage((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const placeBid = () => {
        if (!name || !bid) return;

        socket.emit('place_bid', {
            user: name,
            amount: Number(bid),
        });

        setBid('');
    };

    if (!auction)
        return (
            <h1 style={{ color: 'white', padding: 40 }}>
                Loading...
            </h1>
        );

    return (
        <div style={styles.page}>
            <div style={styles.overlay}>
                <div style={styles.card}>
                    <div style={styles.imageWrapper}>
                        <img
                            src={images[currentImage]}
                            alt=""
                            style={styles.image}
                            onClick={() => setIsOpen(true)}
                        />

                        <button
                            style={{
                                ...styles.arrow,
                                left: 20,
                            }}
                            onClick={prevImage}
                        >
                            ←
                        </button>

                        <button
                            style={{
                                ...styles.arrow,
                                right: 20,
                            }}
                            onClick={nextImage}
                        >
                            →
                        </button>

                        <div style={styles.counter}>
                            {currentImage + 1} / {images.length}
                        </div>
                    </div>

                    <div style={styles.content}>
                        <h1 style={styles.title}>
                            Volkswagen Jetta 2016
                        </h1>

                        
                        <div style={styles.priceBlock}>
                            <div style={styles.priceLabel}>
                                Поточна ставка
                            </div>

                            <div style={styles.price}>
                                {auction.currentBid.toLocaleString()} ₴
                            </div>
                        </div>

                        <div style={styles.lastBid}>
                            Остання ставка:
                            <span style={{ color: '#00ffae' }}>
                                {' '}
                                {auction.lastUser}
                            </span>
                        </div>

                        <div style={styles.inputs}>
                            {!user ? (
  <button
    onClick={login}
    style={styles.button}
  >
    Увійти через Google
  </button>
) : (
  <div
    style={{
      color: "#00ffae",
      marginBottom: "20px",
    }}
  >
    {user.email}
  </div>
)}
                            <input
                                placeholder="Ваше прізвище та ім'я"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                style={styles.input}
                            />

                            <input
                                placeholder="Ваша ставка"
                                type="number"
                                value={bid}
                                onChange={(e) =>
                                    setBid(e.target.value)
                                }
                                style={styles.input}
                            />

                            <button
  onClick={placeBid}
  style={styles.button}
>
  Зробити ставку
</button>
                        </div>
                    </div>
                </div>
<div style={styles.infoCard}>
    <h2 style={styles.infoTitle}>
        Інформація про автомобіль
    </h2>

    <div style={styles.infoGrid}>

        <div style={styles.infoItem}>
            <span style={styles.label}>Марка:</span>
            <span>Volkswagen Jetta</span>
        </div>

        <div style={styles.infoItem}>
            <span style={styles.label}>Рік:</span>
            <span>2016</span>
        </div>

        <div style={styles.infoItem}>
            <span style={styles.label}>VIN:</span>
            <span>WVWZZZ16ZGM012066</span>
        </div>

        <div style={styles.infoItem}>
            <span style={styles.label}>Номер:</span>
            <span>AA8066PA</span>
        </div>

        <div style={styles.infoItem}>
            <span style={styles.label}>Двигун:</span>
            <span>1.6 Diesel</span>
        </div>

        <div style={styles.infoItem}>
            <span style={styles.label}>Пробіг:</span>
            <span>302 559 км</span>
        </div>

    </div>

    <div style={styles.description}>
        Даний автомобіль справний і регулярно
        проходить дилерське ТО у ТОВ
        «Автомобільний дім Атлант».

        <br />
        <br />

        На автомобілі фарбоване праве заднє
        крило, а також підфарбовували передній
        і задній бампери.

        <br />
        <br />

        Автомобіль можна оглянути в підземному
        паркінгу БЦ «Флора Парк» на місці A12.

        <br />
        <br />

        2 комплекти ключів знаходяться у
        відповідальної особи (Шолом Ігор).
    </div>
</div>
                <div style={styles.historyCard}>
                    <h2>История ставок</h2>

                    <div style={styles.history}>
                        {auction.history.map((item, index) => (
                            <div
                                key={index}
                                style={styles.bidItem}
                            >
                                <div>
                                    <strong>{item.user}</strong>
                                </div>

                                <div>
                                    {item.amount.toLocaleString()} ₴
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    style={styles.modal}
                    onClick={() => setIsOpen(false)}
                >
                    <img
                        src={images[currentImage]}
                        alt=""
                        style={styles.modalImage}
                    />
                </div>
            )}
        </div>
    );
}

const styles = {
    page: {
    minHeight: '100vh',
    width: '100%',
    background:
        'linear-gradient(135deg, #020617, #0f172a)',
    fontFamily: 'Arial',
    color: 'white',
    overflowX: 'hidden',
},

    overlay: {
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    padding: '0 30px',
},

    card: {
    width: '100%',
    height: '72vh',
    display: 'grid',
    gridTemplateColumns: '1.45fr 0.75fr',
    background: 'rgba(17,24,39,0.96)',
    overflow: 'hidden',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
},

    imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '72vh',
},

    image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    cursor: 'pointer',
},

    arrow: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '55px',
        height: '55px',
        borderRadius: '50%',
        border: 'none',
        background: 'rgba(0,0,0,0.5)',
        color: 'white',
        fontSize: '28px',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
    },

    counter: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        background: 'rgba(0,0,0,0.6)',
        padding: '8px 14px',
        borderRadius: '12px',
        fontSize: '14px',
    },

    content: {
    padding: '30px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
},

    title: {
    fontSize: '52px',
    marginBottom: '5px',
    color: 'white',
    lineHeight: 1,
    fontWeight: '700',
},

    subtitle: {
    color: '#94a3b8',
    marginBottom: '50px',
    fontSize: '18px',
},

    priceBlock: {
        marginBottom: '20px',
    },

    priceLabel: {
        color: '#94a3b8',
        marginBottom: '10px',
    },

    price: {
    fontSize: '64px',
    fontWeight: '800',
    color: '#00ffae',
    letterSpacing: '-2px',
},

    lastBid: {
        marginBottom: '25px',
        fontSize: '18px',
    },

    inputs: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },

    input: {
        padding: '18px',
        borderRadius: '14px',
        border: 'none',
        fontSize: '16px',
        background: '#1e293b',
        color: 'white',
    },

    button: {
        padding: '20px',
        borderRadius: '14px',
        border: 'none',
        background: '#00ffae',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '20px',
        cursor: 'pointer',
    },

    historyCard: {
        marginTop: '30px',
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '30px',
        border: '1px solid rgba(255,255,255,0.1)',
    },

    history: {
        marginTop: '20px',
    },

    bidItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px 0',
        borderBottom:
            '1px solid rgba(255,255,255,0.08)',
    },

    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.95)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },

    modalImage: {
    width: '90%',
    maxHeight: '90%',
    objectFit: 'contain',
},

infoCard: {
    marginTop: '25px',
    background: 'rgba(17,24,39,0.96)',
    padding: '35px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
},

infoTitle: {
    fontSize: '32px',
    marginBottom: '30px',
    color: 'white',
},

infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '30px',
},

infoItem: {
    background: 'rgba(255,255,255,0.04)',
    padding: '20px',
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
},

label: {
    color: '#94a3b8',
    fontSize: '14px',
},

description: {
    color: '#d1d5db',
    lineHeight: 1.8,
    fontSize: '17px',
},

};

export default App;

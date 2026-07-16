
import { useEffect, useState } from 'react';

import Admin from './Admin';

import { io } from 'socket.io-client';

const socket = io('https://auction-server12-production.up.railway.app');

function App() {
    const [auction, setAuction] = useState(null);
    const [name, setName] = useState(
    localStorage.getItem("auctionUser") || ""
);
    const allowedUsers = [
    "Oleg Zaharchenko",
    "Oleksandr Zubok",
    "Olexandr Vashchenko",
    "Olga Khoreva",
    "Olga Cherniaieva",
    "Anna Kyselova",
    "Anna Gres",
    "Anton Shulha",
    "Viktor Korobkov",
    "Anastasiia Zakharova (Kiriienko)",
    "Kostiantyn Virchenko",
    "Maryna Ishchanova",
    "Yurii Chernysh",
    "Sergii Sushchenko",
    "Denys Migunov",
    "Yevhenii Konovalov",
    "Sergii Kharkov",
    "Tetiana Petrenko",
    "Oleksandr Dykukha",
    "Kyryl Kozlov",
    "Ihor Ferenets",
    "Dmytro Hubar",
    "Pavlo Anoshkin",
    "Anastasiia Udovychenko",
    "Elena Koliadenko",
    "Vitaliy Gardyuto",
    "Andrii Smetaniuk",
    "Yevhenii Tarasov",
    "Serhii Nikolaiev",
    "Oleksii Subbotin",
    "Viktoriia Klymchuk",
    "Yaroslav Plakhtyna",
    "Ihor Sivachenko",
    "Serhii Bhan",
    "Oleksii Shchuka",
    "Oleg Levytskyi",
    "Andrii Glushko",
    "Oleksandr Berezhnyi",
    "Yana Stupnyk",
    "Oleksandr Kysil",
    "Nataliia Vozna",
    "Stanislav Shabelskyy",
    "Yevhenii Riabov",
    "Oleksii Minchenko",
    "Anastasiia Rusova",
    "Tetiana Vachi",
    "Igor Sholom",
    "Valentyna Andrieieva",
    "Dmytro Zelman",
    "Nina Chystyak",
    "Kateryna Chaplinska",
    "Ryta Ruzhyn",
    "Serhii Maistruk",
    "Yevgenia Galat",
    "Andrii Sukhin",
    "Vadym Mukhyn",
    "Nataliia Kovalenko",
    "Maksym Ihnatchenko",
    "Nataliia Balymova",
    "Olena Kobryn",
    "Iryna Shenenko",
    "Iryna Kyrylenko",
    "Ihor Yashkir",
    "Nataliia Yuzefovych",
    "Vadym Podkolzin",
    "Olexandr Korostii",
    "Andrii Slyvka",
    "Volodymyr Stupnikov",
    "Anna Veretskaya",
    "Serhii Stefanovskyi",
    "Danylo Smozhanyk",
    "Elena Stupakova",
    "Iryna Radchenko",
    "Syed Ali",
    "Iaroslav Levchenko",
    "Tetiana Derkach",
    "Dmytro Hihiniak",
    "Tetiana Pyvovarova",
    "Roman Lipetskyi",
    "Alona Manchenko",
    "Yana Stavska",
    "Halyna Kolomiets",
    "Oksana Mytianska",
    "Ivan Malyuta",
    "Maryna Sorochynska",
    "Kateryna Cherniavska",
    "Andrii Irodenko",
    "Kateryna Shestopal",
    "Oleksandr Krasin",
    "Olena Pliuta",
    "Mykola Mokosii",
    "Roman Voronin",
    "Iuliia Shovkuta",
    "Alina Danyliuk",
    "Iryna Postelha",
    "Mykola Krasovskyi",
    "Olha Bazavluk",
    "Olha Shydlovska",
    "Natalia Filaretova",
    "Anastasiia Zinchuk",
    "Maksym Rivasovskyi",
    "Olena Huzhvii",
    "Daria Ivanova",
    "Anastasiia Iaroslavtseva",
    "Anastasiia Horbenko",
    "Nataliia Osadcha",
    "Dmytro Drobot",
    "Viktoriia Kokorieva",
    "Svitlana Tsyba",
    "Yuliya Marchenko",
    "Oleksandra Horobets",
    "Andrii Brytsun",
    "Serhii Pavlenko",
    "Oleh Hapon",
    "Bohdan Pidhainyi",
    "Oleksandr Sudeikin",
    "Kateryna Borodavko",
    "Oleksandra Surova",
    "Oleksandr Bilous",
    "Dmytro Kostiantynov",
    "Ihor Lapka",
    "Iryna Kostina",
    "Taras Kotlovyanov",
    "Nikita Butyrskyi",
    "Denys Kapliuk",
    "Kostiantyn Bohachov",
    "Anastasiia Skolets",
    "Yevhen Rekhteta",
    "Andrii Stadnik",
    "Liliia Ivasyshyna",
    "Yuliia Ponochovna",
    "Andrii Burenok",
    "Andrii Tumka",
    "Tetiana Holovach",
    "Dmytro Romaniuk",
    "Liliia Budovich",
    "Yuliya Makarenko",
    "Khrystyna Vysochanska",
    "Pavlo Martynenko",
    "Taras Yukhym",
    "Viktoriia Tsymbal",
    "Nataliia Shevaha",
    "Nataliia Myronenko",
    "Mariana Birchyn",
    "Serhii Skolets",
    "Oleksandr Dronko",
    "Karina Makanyk",
    "Anton Marinov",
    "Anton Kapitanets",
    "Serhii Ushakov",
    "Volodymyr Holub",
    "Vasyl Osadchuk",
    "Vladyslav Matskevych",
    "Yevhenii Khudenko",
    "Mariia Bokach",
    "Dmytro Mykhalskyi",
    "Inna Kavun",
    "Oleksandr Moroz",
    "NOC Duty Engineer",
    "Mariia Martemianova",
    "Michael Korennyi",
    "Oleksii Nikolaiev",
    "Dmytro Ihnatiev",
    "Vitalii Zaitsev",
    "Yulia Goryachaya",
    "Vladyslav Manchenko",
    "Serhii Rudenko",
    "Nataliia Omelianenko",
    "Liubov Markutsia",
    "Oleh Osadchyi",
    "Tamara Shydlovska",
    "Nataliia Konievtsova",
    "Nataliia Kushnirchuk",
    "Liudmyla Chekhivska",
    "Khrystyna Kholiavko",
    "Oleksandr Klymenko",
    "Volodymyr Khymych",
    "Sergii Bazulin",
    "Mykola Vasylyshyn",
    "Mariia Shulha",
    "Valerii Lohvinenko",
    "Mykola Putkalo",
    "Olena Hubelit",
    "Dmytro Melnychuk",
    "Illia Budnikov",
    "Maryna Perevera",
    "Maksym Solodovskyi",
    "Alona Pylypenko",
    "Vitalii Naida",
    "Vladyslav Melnyk",
    "Mykola Viatkin",
    "Artur Voitovych",
    "Anastasiia Zelena",
    "Yana Myroniuk",
    "Anna Yefremova",
    "Olha Tulchynska",
    "Inna Prochan",
    "Anna Antonenko",
    "Mariia Lysiuk",
    "Bohdana Ivanova",
    "Anastasiia Bida",
    "Elizaveta Perepelytsia",
    "Oksana Skorozinska",
    "Yuliia Semeniuk",
    "Alla Akbash",
    "Borys Remezovskyi",
    "Yevhenii Hordishevskyi",
    "Illia Denysenko",
    "Myla Arseniuk",
    "Tetiana Syvokon",
    "Andrii Khaviuk",
    "Vira Bohdan",
    "Vladyslav Borysov",
    "Oleksandra Biliavska"
];
    const [bid, setBid] = useState('');
    const [currentImage, setCurrentImage] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');
    if (window.location.pathname === '/admin') {
    return <Admin />;
}
  
    

    

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
        '/cars/car15.jpg',
        '/cars/car16.jpg',
        '/cars/car17.jpg',
        '/cars/car18.jpg',
        '/cars/car19.jpg',
        '/cars/car20.jpg',
        '/cars/car21.jpg',
        '/cars/car22.jpg',
        '/cars/car23.jpg',
        '/cars/car24.jpg',
        '/cars/car25.jpg',
        '/cars/car26.jpg',
        '/cars/car27.jpg',
        '/cars/car28.jpg',
        '/cars/car29.jpg',
        '/cars/car30.jpg',
        '/cars/car31.jpg',
        '/cars/car32.jpg',
        '/cars/car33.jpg',
        '/cars/car34.jpg',
        '/cars/car35.jpg',
        '/cars/car36.jpg',
        '/cars/car37.jpg',
        '/cars/car38.jpg',
        '/cars/car39.jpg',
    ];

    useEffect(() => {
        socket.on('auction_update', (data) => {
            setAuction(data);
        });
    }, []);

    useEffect(() => {
    const interval = setInterval(() => {
    if (
        auction?.status === "active" &&
        auction?.endTime
    ) {
        const diff = auction.endTime - Date.now();

        if (diff <= 0) {
            setTimeLeft("00:00:00");
            return;
        }

        const totalSeconds = Math.floor(diff / 1000);

        const days = Math.floor(totalSeconds / 86400);

        const hours = Math.floor(
            (totalSeconds % 86400) / 3600
        );

        const minutes = Math.floor(
            (totalSeconds % 3600) / 60
        );

        const seconds = totalSeconds % 60;

        if (days > 0) {
            setTimeLeft(
                `${days}д ${String(hours).padStart(
                    2,
                    "0"
                )}:${String(minutes).padStart(
                    2,
                    "0"
                )}:${String(seconds).padStart(
                    2,
                    "0"
                )}`
            );
        } else {
            setTimeLeft(
                `${String(hours).padStart(
                    2,
                    "0"
                )}:${String(minutes).padStart(
                    2,
                    "0"
                )}:${String(seconds).padStart(
                    2,
                    "0"
                )}`
            );
        }
    }
}, 1000);

return () => clearInterval(interval);
}, [auction]);

useEffect(() => {
    const handleKeyDown = (e) => {
        if (!isOpen) return

        if (e.key === 'ArrowLeft') {
            prevImage()
        }

        if (e.key === 'ArrowRight') {
            nextImage()
        }

        if (e.key === 'Escape') {
            setIsOpen(false)
        }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
        window.removeEventListener(
            'keydown',
            handleKeyDown
        )
    }
}, [isOpen])

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
        if (!name) {
    alert("Оберіть своє ім'я");
    return;
}
    if (!name) return;

    if (auction.status !== 'active') {
        alert('Аукціон ще не активний');
        return;
    }

    socket.emit('place_bid', {
        user: name,
        amount: auction.currentBid + 4000,
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
                <div style={styles.auctionHeader}>
    <div>
        <div style={styles.auctionStatus}>
            {auction.status === 'active'
                ? '🟢 Аукціон активний'
                : auction.status === 'finished'
                ? '🔴 Аукціон завершено'
                : '🟡 Очікує запуску'}
        </div>

        <h1 style={styles.headerTitle}>
            Volkswagen Jetta 2016
        </h1>
    </div>

    <div>
        <div style={styles.headerLabel}>
            Поточна ставка
        </div>

        <div style={styles.headerPrice}>
            {auction.currentBid.toLocaleString()} ₴
        </div>

        {auction.status === 'active' && (
            <div style={styles.headerTimer}>
                ⏱ {timeLeft}
            </div>
        )}
    </div>
</div>
                <div className="auction-card" style={styles.card}>
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
                        

                        
                        
{auction.status === 'waiting' && (
    <div
        style={{
            color: '#facc15',
            marginTop: 10,
            fontWeight: 'bold',
        }}
    >
        Аукціон ще не розпочато
    </div>
)}

{auction.status === 'active' && (
    <div
        style={{
            color: '#00ffae',
            marginTop: 10,
            fontSize: 24,
            fontWeight: 'bold',
        }}
    >
        До завершення: {timeLeft}
    </div>
)}

{auction.status === 'finished' && (
    <div
        style={{
            color: '#ef4444',
            marginTop: 10,
            fontSize: 24,
            fontWeight: 'bold',
        }}
    >
        Аукціон завершено
    </div>
)}
                        <div style={styles.lastBid}>
                            Остання ставка:
                            <span style={{ color: '#00ffae' }}>
                                {' '}
                                {auction.lastUser}
                            </span>
                        </div>
                        <div
    style={{
        color: '#94a3b8',
        marginBottom: '20px',
        fontSize: '14px',
    }}
>
    Мінімальний крок ставки: 4000 грн
</div>
                        <div style={styles.inputs}>
                            
                            {name ? (
    <div
        style={{
            width: "100%",
            color: "white",
            marginBottom: "15px",
            fontWeight: "bold",
            textAlign: "center"
        }}
    >
        👤 {name}
        <br />

        <button
            onClick={() => {
                localStorage.removeItem("auctionUser");
                setName("");
            }}
            style={{
                marginTop: "10px",
                padding: "6px 12px",
                cursor: "pointer"
            }}
        >
            Змінити користувача
        </button>
    </div>
) : (
    <select
        value=""
        onChange={(e) => {
            setName(e.target.value);
            localStorage.setItem(
                "auctionUser",
                e.target.value
            );
        }}
        style={styles.input}
    >
        <option value="">
            Оберіть своє ім'я
        </option>

        {allowedUsers.map((user) => (
            <option key={user} value={user}>
                {user}
            </option>
        ))}
    </select>
)}

                            

                            <button
  onClick={placeBid}
  style={styles.button}
>
  Підвищити ставку на 4000 грн
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
    🚗 <strong>Volkswagen Jetta 2016 р.</strong>

    <br />
    <br />

    <strong>VIN:</strong> WVWZZZ16ZGM012066
    <br />
    <strong>Двигун:</strong> 1.6 TDI CAYC, 77 кВт (105 к.с.), МКПП
    <br />
    <strong>Пробіг:</strong> 302 559 км

    <br />
    <br />

    📋 <strong>Стан та особливості</strong>

    <br />
    • Автомобіль на ходу, але плавають оберти холостого ходу
    <br />
    • Салон потребує хімчистки
    <br />
    • Фарбоване праве заднє крило та двері
    <br />
    • Підфарбовані передній та задній бампери
    <br />
    • Кондиціонер працює
    <br />
    • Зчеплення в нормальному стані
    <br />
    • Присутнє пошкодження водійської дверцяти, експлуатаційні пошкодження ЛФП

    <br />
    <br />

    🛠 <strong>Обслуговування</strong>

    <br />
    • Авто офіційне
    <br />
    • Регулярне дилерське ТО у ТОВ «Автомобільний дім Атлант»

    <br />
    <br />

    🎁 <strong>Комплектація</strong>

    <br />
    • Додатково комплект зимової гуми 2022 року
</div>
</div>
                <div style={styles.historyCard}>
                    <h2>Історія ставок</h2>

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
    style={{
        ...styles.modal,
        position: 'fixed',
    }}
    onClick={() => setIsOpen(false)}
>
    <button
    style={styles.closeButton}
    onClick={() => setIsOpen(false)}
>
    ✕
</button>
    <div
    style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}
    onClick={(e) => e.stopPropagation()}
>
    </div>
        <button
    style={{
        ...styles.modalArrow,
        left: '20px',
    }}
            onClick={(e) => {
                e.stopPropagation()
                prevImage()
            }}
        >
            ←
        </button>

        <img
            src={images[currentImage]}
            alt=""
            style={styles.modalImage}
            onClick={(e) => e.stopPropagation()}
        />

        <button
    style={{
        ...styles.modalArrow,
        right: '20px',
    }}
            onClick={(e) => {
                e.stopPropagation()
                nextImage()
            }}
        >
            →
        </button>
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
    maxWidth: '1600px',
    margin: '0 auto',
    padding: '20px',
},

auctionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '25px 35px',
    marginBottom: '20px',
    background: 'rgba(17,24,39,0.96)',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.08)',
},

auctionStatus: {
    color: '#00ffae',
    fontSize: '15px',
    marginBottom: '10px',
    fontWeight: 'bold',
},

headerTitle: {
    margin: 0,
    fontSize: 'clamp(28px, 3vw, 42px)',
},

headerLabel: {
    color: '#94a3b8',
    marginBottom: '5px',
    textAlign: 'right',
},

headerPrice: {
    fontSize: 'clamp(36px, 4vw, 56px)',
    fontWeight: '800',
    color: '#00ffae',
    textAlign: 'right',
},

headerTimer: {
    marginTop: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'right',
},

    card: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1.3fr 0.9fr',
    background: 'rgba(17,24,39,0.96)',
    overflow: 'hidden',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.08)',
},

    imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '60vh',
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
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
},

    title: {
    fontSize: 'clamp(28px, 3vw, 42px)',
    marginBottom: '0',
    color: 'white',
    lineHeight: 1.1,
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
    fontSize: 'clamp(36px, 4vw, 54px)',
    fontWeight: '800',
    color: '#00ffae',
    letterSpacing: '-1px',
},

    lastBid: {
    marginBottom: '10px',
    fontSize: '16px',
},

    inputs: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },

    input: {
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '15px',
    background: '#1e293b',
    color: 'white',
},

    button: {
    padding: '16px',
    borderRadius: '12px',
    border: 'none',
    background: '#00ffae',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '18px',
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

closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '50px',
    height: '50px',
    border: 'none',
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    fontSize: '30px',
    cursor: 'pointer',
    zIndex: 10001,
},

modalArrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(0,0,0,0.55)',
    color: '#fff',
    fontSize: '42px',
    fontWeight: 'bold',
    cursor: 'pointer',
    zIndex: 10000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

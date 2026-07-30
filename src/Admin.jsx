import { useState } from 'react'

export default function Admin() {
    const [password, setPassword] = useState('')

    const [days, setDays] = useState(3)

    const [hours, setHours] = useState(0)

    const [minutes, setMinutes] = useState(0)

    const [startPrice, setStartPrice] =
        useState(220000)

    // НОВОЕ
    const [endDate, setEndDate] =
        useState('')

    const startAuction = async () => {
        try {
            const response = await fetch(
                'https://auction-server12-production.up.railway.app/admin/start',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':
                            'application/json',
                    },
                    body: JSON.stringify({
                        password,
                        days,
                        hours,
                        minutes,
                        startPrice,
                    }),
                }
            )

            const data =
                await response.json()

            alert(
                data.message ||
                    'Аукціон запущено'
            )
        } catch (error) {
            console.log(error)
        }
    }

    const finishAuction = async () => {
        try {
            const response = await fetch(
                'https://auction-server12-production.up.railway.app/admin/finish',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':
                            'application/json',
                    },
                    body: JSON.stringify({
                        password,
                    }),
                }
            )

            const data =
                await response.json()

            alert(
                data.message ||
                    'Аукціон завершено'
            )
        } catch (error) {
            console.log(error)
        }
    }

    const resetAuction = async () => {
        try {
            const response = await fetch(
                'https://auction-server12-production.up.railway.app/admin/reset',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':
                            'application/json',
                    },
                    body: JSON.stringify({
                        password,
                    }),
                }
            )

            const data =
                await response.json()

            alert(
                data.message ||
                    'Аукціон скинуто'
            )
        } catch (error) {
            console.log(error)
        }
    }

    // НОВА ФУНКЦІЯ
    const changeEndTime = async () => {
        try {
            const response = await fetch(
                'https://auction-server12-production.up.railway.app/admin/change-end-time',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':
                            'application/json',
                    },
                    body: JSON.stringify({
                        password,
                        endTime: endDate,
                    }),
                }
            )

            const data =
                await response.json()

            alert(
                data.message ||
                    'Час завершення змінено'
            )
        } catch (error) {
            console.log(error)
        }
    }
    return (
    <div
        style={{
            padding: '40px',
            maxWidth: '700px',
            margin: '0 auto',
        }}
    >
        <h1>Адмін панель</h1>

        <input
            type="password"
            placeholder="Пароль адміністратора"
            value={password}
            onChange={(e) =>
                setPassword(e.target.value)
            }
            style={{
                width: '100%',
                padding: '12px',
                marginBottom: '20px',
            }}
        />

        <h3>Тривалість аукціону</h3>

        <div
            style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px',
            }}
        >
            <input
                type="number"
                value={days}
                onChange={(e) =>
                    setDays(e.target.value)
                }
                placeholder="Дні"
            />

            <input
                type="number"
                value={hours}
                onChange={(e) =>
                    setHours(e.target.value)
                }
                placeholder="Години"
            />

            <input
                type="number"
                value={minutes}
                onChange={(e) =>
                    setMinutes(e.target.value)
                }
                placeholder="Хвилини"
            />
        </div>

        <h3>Стартова ціна</h3>

        <input
            type="number"
            value={startPrice}
            onChange={(e) =>
                setStartPrice(e.target.value)
            }
            style={{
                width: '100%',
                padding: '12px',
                marginBottom: '25px',
            }}
        />

        <h3>Змінити дату завершення</h3>

        <input
            type="datetime-local"
            value={endDate}
            onChange={(e) =>
                setEndDate(e.target.value)
            }
            style={{
                width: '100%',
                padding: '12px',
                marginBottom: '20px',
            }}
        />

        <button
            onClick={changeEndTime}
            style={{
                padding: '12px 20px',
                marginBottom: '25px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
            }}
        >
            Змінити дату завершення
        </button>

        <br />

        <button
            onClick={startAuction}
            style={{
                padding: '12px 20px',
                marginRight: '10px',
            }}
        >
            Запустити аукціон
        </button>

        <button
            onClick={finishAuction}
            style={{
                padding: '12px 20px',
                marginRight: '10px',
            }}
        >
            Завершити аукціон
        </button>

        <button
            onClick={resetAuction}
            style={{
                padding: '12px 20px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
            }}
        >
            Скинути аукціон
        </button>
    </div>
)
}
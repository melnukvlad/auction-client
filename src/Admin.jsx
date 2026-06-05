import { useState } from 'react'

export default function Admin() {
    const [password, setPassword] = useState('')

    const startAuction = async () => {
        try {
            const response = await fetch(
                'https://auction-server12-production.up.railway.app/admin/start',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password,
                    }),
                }
            )

            const data = await response.json()

            alert(data.message || 'Аукціон запущено')
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
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password,
                    }),
                }
            )

            const data = await response.json()

            alert(data.message || 'Аукціон завершено')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            style={{
                padding: '40px',
                maxWidth: '600px',
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
                }}
            >
                Завершити аукціон
            </button>
        </div>
    )
}
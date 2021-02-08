import React from 'react'
import { Message } from 'semantic-ui-react'

export default function Countdown({ targetDate, header, timesUp }) {
    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft())

    React.useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
        return () => clearInterval(timer)
    }, [])

    function calculateTimeLeft() {
        const difference = targetDate.getTime() - Date.now()

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
        }
        return {}
    }

    const timerComponents = []

    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval]) {
            return
        }

        timerComponents.push(
            <span key={interval}>
                {timeLeft[interval]} {interval}{' '}
            </span>
        )
    })

    return (
        <Message style={{ textAlign: 'center' }}>
            <Message.Header>{header}</Message.Header>
            {timerComponents.length ? (
                <>
                    <span key={'ends in'}>Ends in: </span> {timerComponents}
                </>
            ) : (
                <span>{timesUp}</span>
            )}
        </Message>
    )
}

import React from 'react'
import confetti from 'canvas-confetti'

const ConfettiButton = () => {
  const handleButtonClick = () => {
    // canvas-confetti 호출
    confetti({
      particleCount: 100, // 파티클 개수
      spread: 70, // 퍼지는 각도
      origin: { y: 0.6 }, // 시작 위치 조정
    })
  }

  return <button onClick={handleButtonClick}>축하합니다!</button>
}

export default ConfettiButton

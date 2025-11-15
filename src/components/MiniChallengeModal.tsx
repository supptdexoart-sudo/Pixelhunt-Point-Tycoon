import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface MiniChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (didWin: boolean) => void;
}

const WIN_SCORE = 5;

export const MiniChallengeModal: React.FC<MiniChallengeModalProps> = ({ isOpen, onClose, onComplete }) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [targetPos, setTargetPos] = useState({ top: '50%', left: '50%' });
  const [isFinished, setIsFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isConfirmingClose, setConfirmingClose] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const moveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const moveTarget = useCallback(() => {
    const top = `${Math.random() * 80 + 10}%`;
    const left = `${Math.random() * 80 + 10}%`;
    setTargetPos({ top, left });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Reset game
    setIsFinished(false);
    setTimeLeft(10);
    setScore(0);
    moveTarget();
    setIsPaused(false);
    setConfirmingClose(false);

  }, [isOpen, moveTarget]);
  
  useEffect(() => {
    if (isOpen && !isPaused && !isFinished) {
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setIsFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        moveIntervalRef.current = setInterval(moveTarget, 800);
    } else {
        if(timerRef.current) clearInterval(timerRef.current);
        if(moveIntervalRef.current) clearInterval(moveIntervalRef.current);
    }

    return () => {
      if(timerRef.current) clearInterval(timerRef.current);
      if(moveIntervalRef.current) clearInterval(moveIntervalRef.current);
    };
  }, [isOpen, isPaused, isFinished, moveTarget]);


  useEffect(() => {
    if (isFinished) {
      onComplete(score >= WIN_SCORE);
    }
  }, [isFinished, onComplete, score]);


  const handleTargetClick = () => {
    if (isFinished || isPaused) return;
    setScore(s => s + 1);
    moveTarget();
  };
  
  const handleCloseRequest = () => {
      if (isFinished) {
          onClose();
      } else {
          setIsPaused(true);
          setConfirmingClose(true);
      }
  };

  const handleForfeit = () => {
      onComplete(false); // Signal a loss
      onClose();
  };

  const handleCancelClose = () => {
      setConfirmingClose(false);
      setIsPaused(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="pixel-box p-6 w-full max-w-lg h-[80vh] flex flex-col text-center relative text-white">
        <button onClick={handleCloseRequest} className="absolute top-2 right-2 pixel-button bg-red-700 text-lg px-3 py-1 z-10" aria-label={t('close_button')}>&times;</button>
        <h2 className="text-xl sm:text-2xl text-shadow-hard text-yellow-300 mb-4">{t('mini_challenge_pixel_hunt_title')}</h2>
        <p className="text-sm text-gray-400 mb-4">{t('mini_challenge_pixel_hunt_desc', { count: WIN_SCORE })}</p>

        <div className="flex justify-between items-center text-lg mb-4">
          <div>{t('mini_challenge_score')}: <span className="text-green-400 font-bold">{score}</span></div>
          <div>{t('mini_challenge_time')}: <span className="text-red-500 font-bold">{timeLeft}s</span></div>
        </div>

        <div className="flex-grow w-full bg-gray-900/50 border-2 border-gray-900 relative overflow-hidden">
            {!isFinished ? (
                <button
                    onClick={handleTargetClick}
                    className="absolute w-12 h-12 bg-cyan-400 hover:bg-cyan-300 pixel-button transition-all duration-200"
                    style={{ top: targetPos.top, left: targetPos.left, transform: 'translate(-50%, -50%)' }}
                    aria-label="Clickable target"
                >
                    🎯
                </button>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <p className="text-2xl font-bold">{score >= WIN_SCORE ? t('mini_challenge_win') : t('mini_challenge_lose')}</p>
                </div>
            )}
        </div>
        
        <button onClick={handleCloseRequest} className="pixel-button bg-gray-700 mt-4 p-2">{t('close_button')}</button>
      </div>

      {isConfirmingClose && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
              <div className="pixel-box p-6 text-center max-w-sm w-full">
                  <h3 className="text-xl text-yellow-300 mb-2 text-shadow-hard">{t('mini_challenge_quit_confirm_title')}</h3>
                  <p className="text-sm text-gray-300 mb-6 leading-normal">{t('mini_challenge_quit_confirm_desc')}</p>
                  <div className="flex justify-center gap-4">
                      <button onClick={handleCancelClose} className="pixel-button bg-gray-600 hover:bg-gray-500 px-6 py-2">
                          {t('mini_challenge_quit_confirm_cancel')}
                      </button>
                      <button onClick={handleForfeit} className="pixel-button bg-red-700 hover:bg-red-600 px-6 py-2">
                          {t('mini_challenge_quit_confirm_forfeit')}
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};